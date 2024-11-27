module UI.UI exposing (..)

import Css exposing (Style)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)


button : List Style -> a -> String -> Html a
button buttonStyle action label =
    styled Html.Styled.button buttonStyle [ onClick action ] [ text label ]
