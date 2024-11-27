module UI.DivTable exposing
    ( TableStyleConfig
    , customizeCellStyle
    , customizeHeaderStyle
    , customizeRowStyle
    , customizeTableStyle
    , emptyStyle
    , fromBody
    , render
    , renderBody
    )

import Css
import Html.Styled as Html exposing (Html, div)


type alias Table msg =
    { header : List (List (Html msg))
    , body : List (List (List (Html msg)))
    }


fromBody : List (List (List (Html msg))) -> Table msg
fromBody bodyRows =
    { header = []
    , body = bodyRows
    }



---------------------------------------------------------------------------------
-- STYLING
---------------------------------------------------------------------------------


type alias TableStyleConfig =
    { table : Css.Style
    , headerRow : Css.Style
    , headerCell : Css.Style
    , row : Css.Style
    , cell : Css.Style
    }


emptyStyle : TableStyleConfig
emptyStyle =
    { table = Css.batch []
    , headerRow = Css.batch []
    , headerCell = Css.batch []
    , row = Css.batch []
    , cell = Css.batch []
    }


customizeTableStyle : List Css.Style -> TableStyleConfig -> TableStyleConfig
customizeTableStyle style cfg =
    let
        table =
            cfg.table
    in
    { cfg | table = Css.batch (table :: style) }


customizeHeaderStyle : Css.Style -> TableStyleConfig -> TableStyleConfig
customizeHeaderStyle style cfg =
    let
        headerRow =
            cfg.headerRow
    in
    { cfg | headerRow = Css.batch [ headerRow, style ] }


customizeRowStyle : List Css.Style -> TableStyleConfig -> TableStyleConfig
customizeRowStyle style cfg =
    let
        row =
            cfg.row
    in
    { cfg | row = Css.batch (row :: style) }


customizeCellStyle : List Css.Style -> TableStyleConfig -> TableStyleConfig
customizeCellStyle style cfg =
    let
        cell =
            cfg.cell
    in
    { cfg | cell = Css.batch (cell :: style) }



---------------------------------------------------------------------------------
-- Rendering
---------------------------------------------------------------------------------


render : TableStyleConfig -> Table msg -> Html msg
render tableStyleConfig table =
    let
        tableStyle =
            Css.batch [ Css.display Css.table, tableStyleConfig.table ]
    in
    Html.styled div [ tableStyle ] [] (renderHeader tableStyleConfig table.header :: renderBodyInternal tableStyleConfig table.body)


renderHeader : TableStyleConfig -> List (List (Html msg)) -> Html msg
renderHeader tableStyleConfig cells =
    let
        headerStyle =
            Css.batch [ Css.display Css.tableRow, tableStyleConfig.headerRow ]
    in
    case cells of
        [] ->
            Html.text ""

        _ ->
            Html.styled div [ headerStyle ] [] (List.map (renderHeaderCell tableStyleConfig) cells)


renderCell : TableStyleConfig -> List (Html msg) -> Html msg
renderCell tableStyleConfig content =
    let
        cellStyle =
            Css.batch [ Css.display Css.tableCell, tableStyleConfig.cell ]
    in
    Html.styled div [ cellStyle ] [] content


renderHeaderCell : TableStyleConfig -> List (Html msg) -> Html msg
renderHeaderCell tableStyleConfig content =
    let
        cellStyle =
            Css.batch [ Css.display Css.tableCell, tableStyleConfig.headerCell ]
    in
    Html.styled div [ cellStyle ] [] content


renderRow : TableStyleConfig -> List (List (Html msg)) -> Html msg
renderRow tableStyleConfig cells =
    let
        rowStyle =
            Css.batch [ Css.display Css.tableRow, tableStyleConfig.row ]
    in
    Html.styled div [ rowStyle ] [] (List.map (renderCell tableStyleConfig) cells)


renderBodyInternal : TableStyleConfig -> List (List (List (Html msg))) -> List (Html msg)
renderBodyInternal tableStyleConfig rows =
    List.map (renderRow tableStyleConfig) rows


renderBody : TableStyleConfig -> List (List (List (Html msg))) -> Html msg
renderBody tableStyleConfig body =
    render tableStyleConfig <| fromBody body
