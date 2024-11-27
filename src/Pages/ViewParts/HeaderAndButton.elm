module Pages.ViewParts.HeaderAndButton exposing (..)

import Css
import Domain.Event exposing (..)
import Html.Styled as Html exposing (Html)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Shared exposing (Device(..))
import Style
import UI.DivTable as DivTable
import UI.UI as UI


view : String -> a -> String -> Html a
view headerText action buttonText =
    let
        tableStyle =
            DivTable.emptyStyle |> DivTable.customizeTableStyle [ Css.width (Css.pct 100) ]
    in
    DivTable.renderBody tableStyle
        [ [ [ Html.styled Html.h3 Style.pageHeader [] [ Html.text headerText ] ]
          , [ Html.styled Html.div [ Css.textAlign Css.right ] [] [ UI.button Style.textButton action buttonText ] ]
          ]
        ]
