module Lib.ViewHelpers exposing (..)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Round


showIf : Bool -> Html a -> Html a
showIf predicate content =
    if predicate then
        content

    else
        text ""


showIfNot : Bool -> Html a -> Html a
showIfNot predicate content =
    showIf (not predicate) content


roundFloat : Float -> String
roundFloat f =
    Round.round 2 f
