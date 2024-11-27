module Pages.Home exposing (..)

import Browser.Navigation as Nav
import Css
import Domain.Event exposing (..)
import Html.Styled as Html exposing (Html)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Lib.Effect as Effect exposing (Effect)
import Pages.ViewParts.Banner as Banner
import Pages.ViewParts.BottomFixedButton as BottomFixedButton
import Pages.ViewParts.HeaderAndButton as HeaderAndButton
import Round
import Shared exposing (Device(..))
import Style


type alias Model =
    {}


init : Model
init =
    {}


type Msg
    = GotoTickets


update : Msg -> Shared.Model -> Model -> ( Model, Effect Shared.Msg Msg )
update msg shared model =
    case msg of
        GotoTickets ->
            ( model
            , Effect.Cmd <| Nav.pushUrl shared.navKey "/order-tickets/"
            )


view : Shared.Model -> Model -> Html Msg
view shared _ =
    let
        evt =
            theEvent

        dateTimeRow =
            case shared.device of
                Phone ->
                    Html.div []
                        [ Html.styled Html.h4 Style.pageHeader [] [ Html.text evt.date ]
                        , Html.styled Html.div [ Css.marginLeft (Css.em 1), Css.marginBottom (Css.em 1) ] [] [ Html.text (evt.time ++ " uur") ]
                        ]

                Desktop ->
                    HeaderAndButton.view (dateTimeString evt) GotoTickets "Tickets Bestellen"

        maybeMargin =
            case shared.device of
                Phone ->
                    Html.styled Html.div [ Css.marginBottom (Css.em 6) ] [] <|
                        [ Html.styled Html.a [ Style.hyperLink, Css.fontSize (Css.em 0.4) ] [ href "/tees-and-cees" ] [ Html.text "Algemene Voorwaarden" ] ]

                Desktop ->
                    Html.styled Html.a [ Style.hyperLink ] [ href "/tees-and-cees" ] [ Html.text "Algemene Voorwaarden" ]

        maybeBottomButton =
            case shared.device of
                Phone ->
                    BottomFixedButton.view GotoTickets "Tickets Bestellen"

                Desktop ->
                    Html.text ""

        ticketTypes : TicketType -> Html Msg
        ticketTypes ticketType =
            Html.div []
                [ Html.div [] [ Html.text <| ticketType.description ++ " - " ++ Round.round 2 ticketType.price ++ " €" ]
                , Html.styled Html.div [ Css.marginLeft (Css.em 1), Css.whiteSpace Css.pre, Css.fontSize (Css.em 0.85) ] [] [ Html.text <| ticketType.info ]
                ]
    in
    Html.div []
        [ Banner.view shared.device
        , Html.styled Html.div Style.container [] <|
            [ Html.styled Html.h1 (Style.pageHeader ++ [ Css.marginTop (Css.em 0.3) ]) [] [ Html.text evt.name ]
            , Html.div []
                [ Html.styled Html.h4 Style.pageHeader [] [ Html.text evt.date ]
                , Html.styled Html.div [ Css.marginLeft (Css.em 1), Css.marginBottom (Css.em 1) ] [] [ Html.text (evt.time ++ " uur") ]
                ]
            , Html.styled Html.h2 Style.pageHeader [] [ Html.text "Locatie" ]
            , Html.styled Html.div (Style.address ++ [ Css.marginLeft (Css.em 1), Css.marginBottom (Css.em 1) ]) [] [ Html.text evt.address ]
            , Html.styled Html.h2 Style.pageHeader [] [ Html.text "Extra Info" ]
            , Html.styled Html.div (Style.address ++ [ Css.marginLeft (Css.em 1), Css.marginBottom (Css.em 1) ]) [] [ Html.text evt.extraInfo ]
            , Html.styled Html.h2 Style.pageHeader [] [ Html.text "Tickets" ]
            , Html.styled Html.div [ Css.marginLeft (Css.em 1), Css.marginBottom (Css.em 1) ] [] <|
                List.map ticketTypes evt.ticketTypes
            , Html.br [] []
            , Html.br [] []
            , maybeMargin
            ]
        ]
