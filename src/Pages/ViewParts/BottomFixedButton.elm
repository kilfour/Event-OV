module Pages.ViewParts.BottomFixedButton exposing (..)

import Css
import Domain.Event exposing (..)
import Html.Styled as Html exposing (Html)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Shared exposing (Device(..))
import Style
import UI.UI as UI


view : a -> String -> Html a
view action buttonText =
    let
        bottomFixedStyle =
            [ Css.position Css.fixed
            , Css.bottom (Css.em 0)
            , Css.width (Css.vw 80)
            , Css.backgroundColor (Css.hex "fff")
            ]

        buttonContainerStyle =
            [ Css.left (Css.pct 50)
            , Css.transform <| Css.translate2 (Css.pct -50) Css.zero
            , Css.padding (Css.em 1)
            , Css.border3 (Css.em 0.1) Css.solid (Css.hex "ccc")
            , Css.display Css.inlineBlock
            , Css.position Css.relative
            , Css.marginBottom (Css.em 1)
            ]
    in
    Html.styled Html.div bottomFixedStyle [] <|
        [ Html.styled Html.div buttonContainerStyle [] <|
            [ UI.button Style.textButton action buttonText ]
        ]
