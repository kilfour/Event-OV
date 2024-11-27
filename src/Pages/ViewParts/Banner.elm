module Pages.ViewParts.Banner exposing (..)

import Css
import Domain.Event exposing (..)
import Html.Styled as Html exposing (Html)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Shared


view : Shared.Device -> Html msg
view device =
    let
        imgHeightPx =
            case device of
                Shared.Phone ->
                    Css.vh 15

                Shared.Desktop ->
                    Css.vh 35

        imgContainerStyle =
            [ Css.maxWidth (Css.vw 80)
            , Css.maxHeight imgHeightPx
            , Css.width (Css.pct 100)
            , Css.margin2 Css.zero Css.auto
            , Css.position Css.relative
            , Css.overflow Css.hidden
            , Css.borderRadius (Css.em 1.5)
            , Css.marginTop (Css.em 0.75)
            ]

        imgFrontStyle =
            [ Css.maxWidth (Css.vw 75)
            , Css.width Css.auto
            , Css.height imgHeightPx
            , Css.display Css.block
            , Css.margin2 Css.zero Css.auto
            , Css.property "aspect-ratio" "980 / 417"
            ]

        imgBackStyle =
            [ Css.maxWidth (Css.vw 80)
            , Css.height imgHeightPx
            , Css.margin2 Css.zero Css.auto
            , Css.position Css.absolute
            , Css.backgroundImage (Css.url "/event-back.jpg")
            , Css.width (Css.pct 100)
            , Css.backgroundPosition2 (Css.pct 50) Css.zero
            , Css.backgroundRepeat Css.noRepeat
            , Css.backgroundSize Css.cover
            , Css.property "filter" "blur(2vw) brightness(.9)"
            , Css.zIndex (Css.int -1)
            ]
    in
    Html.styled Html.div imgContainerStyle [] <|
        [ Html.styled Html.div imgBackStyle [] []
        , Html.styled Html.img imgFrontStyle [ src "/event-front.jpg" ] []
        , Html.styled Html.img imgFrontStyle [ src "" ] []
        ]
