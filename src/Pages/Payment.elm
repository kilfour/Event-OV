port module Pages.Payment exposing (..)

import Browser.Navigation as Nav
import Css
import Domain.Event exposing (..)
import Html.Styled as Html exposing (Html)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Lib.Effect as Effect exposing (Effect)
import Lib.ViewHelpers as UI
import Pages.ViewParts.Banner as Banner
import Shared exposing (Device(..), Msg(..))
import Style


port showSumUpWidget : String -> Cmd msg


port widgetMounted : (Bool -> msg) -> Sub msg


port sumUpFailure : (SumUpFailure -> msg) -> Sub msg


port sumUpBodyStatusOk : (Bool -> msg) -> Sub msg


type alias SumUpFailure =
    { failureType : String
    , body : String
    }


type alias Model =
    { sumUpFailed : Bool
    , retried : Int
    }


init : Shared.Model -> ( Model, Cmd Msg )
init shared =
    if shared.currentOrder == "" then
        ( { sumUpFailed = False, retried = 0 }
        , Nav.pushUrl shared.navKey "/order-tickets/"
        )

    else
        ( { sumUpFailed = False, retried = 0 }
        , showSumUpWidget shared.currentCheckOut
        )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ widgetMounted WidgetMounted
        , sumUpBodyStatusOk SumUpBodyStatusOk
        , sumUpFailure SumUpFailed
        ]


type Msg
    = NoOp
    | WidgetMounted Bool
    | SumUpBodyStatusOk Bool
    | SumUpFailed SumUpFailure


update : Msg -> Shared.Model -> Model -> ( Model, Effect Shared.Msg Msg )
update msg shared model =
    case msg of
        NoOp ->
            ( model
            , Effect.None
            )

        WidgetMounted succes ->
            if succes then
                ( model
                , --Effect.none )
                  Effect.Shared <| Shared.LogToServer "Widget Mounted."
                )

            else
                let
                    retried =
                        model.retried

                    effect =
                        if retried < 3 then
                            Effect.Batch <|
                                [ Effect.Shared <| Shared.LogToServer "Sumup failed to mount, retrying."
                                , Effect.Cmd <| showSumUpWidget shared.currentCheckOut
                                ]

                        else
                            Effect.none
                in
                ( { model | retried = retried + 1 }
                , effect
                )

        SumUpBodyStatusOk succes ->
            if succes then
                ( model, Effect.Shared ConfirmOrder )

            else
                ( { model | sumUpFailed = True }, Effect.none )

        SumUpFailed failure ->
            ( { model | sumUpFailed = True }
            , Effect.Shared <| Shared.LogToServer (failure.failureType ++ " :  " ++ failure.body)
            )


view : Shared.Model -> Model -> Html Msg
view shared model =
    let
        evt =
            theEvent

        maybeMargin =
            case shared.device of
                Phone ->
                    Html.styled Html.div [ Css.marginBottom (Css.em 6) ] [] [ Html.text "" ]

                Desktop ->
                    Html.text ""
    in
    Html.div [] <|
        [ Banner.view shared.device
        , Html.styled Html.div Style.container [] <|
            [ Html.styled Html.h1 Style.pageHeader [] [ Html.text evt.name ]
            , UI.showIf model.sumUpFailed <|
                Html.styled Html.div (Style.validation ++ [ Css.fontSize (Css.em 1.25), Css.paddingLeft (Css.em 2) ]) [] <|
                    [ Html.text "Uw kaart informatie kon niet geverifiëerd worden. Gelieve de gegevens te controleren." ]
            , Html.styled Html.div [ Css.fontSize (Css.em 1.25), Css.paddingLeft (Css.em 2) ] [] <|
                [ Html.text "Opgelet SumUp ondersteunt enkel deze onderstaande kaarten." ]
            , Html.div [ id "sumup-card" ] []
            , maybeMargin
            ]
        ]
