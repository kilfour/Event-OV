module Style exposing (..)

import Css exposing (..)
import Css.Global
import Css.Transitions as CT



-----------------------------------------------------------------------
-- MAINFONT DEFINED IN App.view
-----------------------------------------------------------------------


type alias ThemeDefinition =
    { primary : Color
    , headerTextColor : Color
    , backgroundColor : Color
    , placeHolderTextColor : Color
    , fontFamilies : List String
    }


theme : ThemeDefinition
theme =
    { primary = hex "e9eef3"
    , headerTextColor = hex "49586d"
    , backgroundColor = hex "fff"
    , placeHolderTextColor = hex "999"
    , fontFamilies = [ "Roboto" ] -- [ "Palatino Linotype", "Georgia", "serif" ]
    }


container : List Style
container =
    [ Css.maxWidth (Css.vw 80)
    , Css.width (Css.vw 80)
    , Css.margin2 Css.zero Css.auto
    ]


pageHeader : List Style
pageHeader =
    [ margin2 zero (Css.vw 1)
    , color (hex "222")
    , fontWeight normal
    ]


address : List Style
address =
    [ margin2 zero (Css.vw 1)
    , color (hex "222")
    , fontWeight normal
    , whiteSpace pre
    ]


validation : List Css.Style
validation =
    [ Css.fontSize (Css.em 0.75), Css.color (Css.hex "e00"), Css.paddingLeft (Css.em 0.25) ]


hyperLink : Style
hyperLink =
    Css.batch
        [ margin (Css.em 0.25)
        , textDecoration none
        , color theme.headerTextColor -- (hex "b22607")
        , boxShadow6 inset zero zero zero zero theme.headerTextColor -- (hex "b22607")
        , CT.transition [ CT.transform3 0 0 CT.easeIn, CT.boxShadow 500, CT.color 500 ]
        , hover [ color (hex "fff"), boxShadow6 inset (em 12) zero zero zero theme.placeHolderTextColor ] -- (hex "e5593a") ]
        , fontSize (Css.em 0.8)
        , Css.padding4 (Css.em 0) (Css.em 0.1) (Css.em 0.1) (Css.em 0.1)
        , Css.cursor Css.pointer
        ]



---------------------------------------------------------------------------------------------
-- THE FOLLOWING 3 STYLES GO TOGETHER, USE LIKE SO :
-- renderInput labelText val action pred validationMessage =
--     [ Html.styled Html.div Style.inputLabelContainer [] <|
--         [ Html.styled Html.input Style.input [ value val, required True, onInput action ] []
--         , Html.styled Html.label Style.label [] [ Html.text labelText ]
--         ]
--     ]
---------------------------------------------------------------------------------------------


inputLabelContainer : List Style
inputLabelContainer =
    [ Css.position Css.relative, Css.display Css.inlineBlock, Css.width (Css.em 16) ]


input : List Css.Style
input =
    let
        popoutLabelStyle : Css.Style
        popoutLabelStyle =
            Css.batch
                [ Css.borderColor theme.headerTextColor
                , Css.borderRadius (Css.em 0.75)
                , Css.color (Css.hex "000")
                , Css.Global.generalSiblings
                    [ Css.Global.typeSelector "label"
                        [ Css.transforms [ Css.translateY (Css.pct -50), Css.scale 0.9 ]
                        , Css.backgroundColor theme.backgroundColor
                        , Css.color theme.headerTextColor
                        , Css.top Css.zero
                        , Css.padding Css.zero
                        ]
                    ]
                , Css.fontSize (Css.em 1)
                ]
    in
    [ Css.borderStyle Css.solid
    , Css.color Css.transparent
    , Css.width (Css.pct 100)
    , Css.outline Css.none
    , Css.paddingTop (Css.em 0.5)
    , Css.paddingLeft (Css.em 0.25)
    , Css.paddingBottom (Css.em 0.375)
    , Css.borderRadius (Css.em 0.5)
    , CT.transition [ CT.borderColor3 150 0 (CT.cubicBezier 0.4 0 0.2 1), CT.borderRadius3 150 0 (CT.cubicBezier 0.4 0 0.2 1) ]
    , Css.focus [ popoutLabelStyle ]
    , Css.valid [ popoutLabelStyle ]
    , Css.fontSize (Css.em 1)
    ]


label : List Css.Style
label =
    [ Css.position Css.absolute
    , Css.top (Css.em 0.5)
    , Css.left (Css.em 0.5)
    , Css.color theme.placeHolderTextColor
    , Css.pointerEvents Css.none
    , CT.transition [ CT.transform3 150 0 (CT.cubicBezier 0.4 0 0.2 1) ]
    , Css.fontSize (Css.em 1)
    ]



---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------


textButton : List Style
textButton =
    [ Css.backgroundColor (Css.hex "d1410c")
    , Css.color (Css.hex "fff")
    , Css.fontWeight Css.bold
    , Css.fontSize (Css.em 1)
    , Css.padding2 (Css.em 0.75) (Css.em 4)
    , Css.borderRadius (Css.em 0.4)
    , Css.border Css.zero
    , Css.cursor Css.pointer
    ]


symbolButton : List Style
symbolButton =
    [ Css.backgroundColor (Css.hex "0c41d1")
    , Css.color (Css.hex "fff")
    , Css.fontWeight Css.bold
    , Css.fontSize (Css.em 1)
    , Css.padding2 (Css.em 0.6) (Css.em 1)
    , Css.borderRadius (Css.em 0.4)
    , Css.border Css.zero
    , Css.cursor Css.pointer
    ]
