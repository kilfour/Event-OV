module Pages.PaymentSuccess exposing (..)

import Api.GetOrderInfo as GetOrderInfo exposing (Order)
import Api.SendMail as SendMail
import Browser.Navigation as Nav
import Css
import Domain.Event exposing (..)
import Html.Styled as Html exposing (Html)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Http
import Lib.Effect as Effect exposing (Effect)
import Pages.ViewParts.Banner as Banner
import Shared
import Style


type alias Model =
    { orderInfo : Maybe Order
    }


emptyModel : Model
emptyModel =
    { orderInfo = Nothing
    }


init : Shared.Model -> String -> ( Model, Cmd Msg )
init shared orderId =
    ( emptyModel
    , GetOrderInfo.dispatch shared.baseApiUrl orderId OrderInfoLoaded
    )


type Msg
    = NoOp
    | OrderInfoLoaded (Result Http.Error Order)
    | MailSend (Result Http.Error SendMail.MailResult)


update : Msg -> Shared.Model -> Model -> ( Model, Effect Shared.Msg Msg )
update msg shared model =
    case msg of
        NoOp ->
            ( model
            , Effect.None
            )

        OrderInfoLoaded (Ok orderInfo) ->
            ( { model | orderInfo = Just orderInfo }
            , Effect.Cmd <|
                SendMail.dispatch shared.baseApiUrl
                    { email = orderInfo.email
                    , orderId = orderInfo.id
                    , total = totalAmount orderInfo
                    , url = "https://pequivents.netlify.app/tickets/" ++ orderInfo.id ++ "-" ++ orderInfo.code
                    }
                    MailSend
            )

        OrderInfoLoaded (Err error) ->
            ( model, Effect.Shared <| Shared.Error error )

        MailSend (Ok _) ->
            ( model, Effect.none )

        MailSend (Err error) ->
            ( model, Effect.Shared <| Shared.Error error )


totalAmount : Order -> Float
totalAmount orderInfo =
    orderInfo.tickets |> List.map (\a -> a.price) |> List.sum


view : Shared.Model -> Model -> Html Msg
view shared model =
    case model.orderInfo of
        Nothing ->
            Html.div [] <|
                [ Banner.view shared.device
                ]

        Just orderInfo ->
            let
                invoiceInfoLink =
                    [ Html.div [] <|
                        [ Html.text "Indien u een faktuur vereist, gelieve uw bedrijfs informatie in te geven via het volgende formulier :" ]
                    , Html.div [] <|
                        [ Html.styled Html.a [ Style.hyperLink, Css.fontSize (Css.em 1.25) ] [ href "/invoice-info" ] [ Html.text "Fakturatie gegevens" ] ]
                    , Html.br [] []
                    ]

                ticketHref =
                    "/tickets/" ++ orderInfo.id ++ "-" ++ orderInfo.code
            in
            Html.div [] <|
                [ Banner.view shared.device
                , Html.styled Html.div Style.container [] <|
                    [ Html.styled Html.h2 ([ Css.marginBottom (Css.em 0.375), Css.paddingBottom (Css.em 0.5) ] ++ Style.pageHeader) [] [ Html.text "Tickets Aangekocht" ]
                    , Html.styled Html.div [ Css.paddingLeft (Css.em 1), Css.paddingBottom (Css.em 1.5) ] [] <|
                        -- invoiceInfoLink ++
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
