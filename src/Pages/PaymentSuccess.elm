module Pages.PaymentSuccess exposing (..)

import Api.GetOrderInfo as GetOrderInfo exposing (Order)
import Browser.Navigation as Nav
import Css
import Domain.Event exposing (..)
import Html.Styled as Html exposing (Html)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Http
import Lib.Effect as Effect exposing (Effect)
import Pages.ViewParts.Banner as Banner
import Process
import Shared
import Style
import Task


type alias Model =
    { orderId : String
    , numberOfTries : Int
    , orderInfo : Maybe Order
    }


init : Shared.Model -> String -> ( Model, Cmd Msg )
init shared orderId =
    ( { orderId = orderId, numberOfTries = 2, orderInfo = Nothing }
    , GetOrderInfo.dispatch shared.baseApiUrl orderId OrderInfoLoaded
    )


type Msg
    = NoOp
    | OrderInfoLoaded (Result Http.Error Order)
    | CheckOrderInfo


update : Msg -> Shared.Model -> Model -> ( Model, Effect Shared.Msg Msg )
update msg shared model =
    case msg of
        NoOp ->
            ( model
            , Effect.None
            )

        OrderInfoLoaded (Ok orderInfo) ->
            let
                cmd =
                    if orderInfo.code == "PROCESSING" && model.numberOfTries <= 25 then
                        Task.perform (always <| CheckOrderInfo) (Process.sleep (toFloat model.numberOfTries * 1000))

                    else
                        Cmd.none
            in
            ( { model | orderInfo = Just orderInfo, numberOfTries = model.numberOfTries + 1 }
            , Effect.Cmd cmd
            )

        CheckOrderInfo ->
            ( model, Effect.Cmd <| GetOrderInfo.dispatch shared.baseApiUrl model.orderId OrderInfoLoaded )

        OrderInfoLoaded (Err error) ->
            ( model, Effect.Shared <| Shared.Error error )


totalAmount : Order -> Float
totalAmount orderInfo =
    orderInfo.tickets |> List.map (\a -> a.price) |> List.sum


view : Shared.Model -> Model -> Html Msg
view shared model =
    let
        verificatieView =
            Html.div [] <|
                [ Banner.view shared.device
                , Html.styled Html.div Style.container [] <|
                    [ Html.styled Html.h2 ([ Css.marginBottom (Css.em 0.375), Css.paddingBottom (Css.em 0.5) ] ++ Style.pageHeader) [] [ Html.text "Verificatie in behandeling." ]
                    , Html.styled Html.div [ Css.paddingLeft (Css.em 1), Css.paddingBottom (Css.em 1.5) ] [] <|
                        [ Html.div [] <|
                            [ Html.text
                                ("We wachten op confirmatie van de betalings provider. Dit kan potentiëel wel enkele minuten duren onder niet ideale omstandigheden."
                                    ++ "U ontvangt zowiezo een mail met uw tickets ook als u deze site verlaat."
                                )
                            ]
                        , Html.br [] []
                        , Html.br [] []
                        , Html.h3 [] <|
                            [ Html.text <| String.repeat (model.numberOfTries - 2) "."
                            ]
                        ]
                    ]
                ]
    in
    case model.orderInfo of
        Nothing ->
            verificatieView

        Just orderInfo ->
            if orderInfo.code == "PROCESSING" then
                verificatieView

            else if orderInfo.code == "FAILED" then
                Html.div [] <|
                    [ Banner.view shared.device
                    , Html.styled Html.div Style.container [] <|
                        [ Html.styled Html.h2 ([ Css.marginBottom (Css.em 0.375), Css.paddingBottom (Css.em 0.5) ] ++ Style.pageHeader) [] [ Html.text "Betaling Mislukt" ]
                        , Html.styled Html.div [ Css.paddingLeft (Css.em 1), Css.paddingBottom (Css.em 1.5) ] [] <|
                            [ Html.div [] <|
                                [ Html.text
                                    "De betalings provider heeft u betaling geweigerd. Gebruik onderstaande link om terug te gaan naar de start pagina. "
                                ]
                            , Html.br [] []
                            , Html.div [] <|
                                [ Html.styled Html.a [ Style.hyperLink, Css.fontSize (Css.em 1.25) ] [ href "/" ] [ Html.text "Terug naar start pagina" ] ]
                            ]
                        ]
                    ]

            else
                let
                    ticketHref =
                        "/tickets/" ++ orderInfo.id ++ "-" ++ orderInfo.code
                in
                Html.div [] <|
                    [ Banner.view shared.device
                    , Html.styled Html.div Style.container [] <|
                        [ Html.styled Html.h2 ([ Css.marginBottom (Css.em 0.375), Css.paddingBottom (Css.em 0.5) ] ++ Style.pageHeader) [] [ Html.text "Tickets Aangekocht" ]
                        , Html.styled Html.div [ Css.paddingLeft (Css.em 1), Css.paddingBottom (Css.em 1.5) ] [] <|
                            [ Html.div [] <|
                                [ Html.text
                                    ("Hieronder vind u een link naar de aangekochte tickets. "
                                        ++ "U kan deze afdrukken, bewaren als pdf (via 'Print to Pdf'), of u kan ook deze pagina rechtstreeks gebruiken als toegang op het event."
                                    )
                                ]
                            , Html.br [] []
                            , Html.div [] <|
                                [ Html.text
                                    ("Een kopie van deze informatie inclusief link naar afdrukbare pagina is naar "
                                        ++ orderInfo.email
                                        ++ " verstuurd."
                                    )
                                ]
                            , Html.br [] []
                            , Html.div [] <|
                                [ Html.styled Html.a [ Style.hyperLink, Css.fontSize (Css.em 1.25) ] [ href ticketHref ] [ Html.text "Tickets Weergeven" ] ]
                            ]
                        ]
                    ]
