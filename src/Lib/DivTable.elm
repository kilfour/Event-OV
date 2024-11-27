module Lib.DivTable exposing
    ( Cell(..)
    , TableStyleConfig
    , customizeCellStyle
    , customizeHeaderStyle
    , customizeRowStyle
    , customizeTableStyle
    , emptyStyle
    , fromBody
    , render
    , renderBody
    , rounded
    , rounded4
    )

import Css
import Html.Styled exposing (Html, div, styled)
import Lib.ListHelpers as ListHelpers


type alias TableStyleConfig =
    { table : Css.Style
    , headerRow : Css.Style
    , headerCell : Css.Style
    , row : Css.Style
    , cell : Css.Style
    , rounded : Maybe { topLeft : Float, topRight : Float, bottomLeft : Float, bottomRight : Float }
    }


emptyStyle : TableStyleConfig
emptyStyle =
    { table = Css.batch []
    , headerRow = Css.batch []
    , headerCell = Css.batch []
    , row = Css.batch []
    , cell = Css.batch []
    , rounded = Nothing
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


rounded : Maybe Float -> TableStyleConfig -> TableStyleConfig
rounded maybeFloat cfg =
    let
        arg =
            maybeFloat |> Maybe.map (\x -> { topLeft = x, topRight = x, bottomLeft = x, bottomRight = x })
    in
    { cfg | rounded = arg }


rounded4 : Float -> Float -> Float -> Float -> TableStyleConfig -> TableStyleConfig
rounded4 topLeft topRight bottomLeft bottomRight cfg =
    { cfg | rounded = Just { topLeft = topLeft, topRight = topRight, bottomLeft = bottomLeft, bottomRight = bottomRight } }


renderCell : TableStyleConfig -> Cell msg -> Html msg
renderCell tableStyleConfig cell =
    let
        cellStyle =
            Css.batch [ Css.display Css.tableCell, tableStyleConfig.cell ]
    in
    case cell of
        Cell content ->
            styled div [ cellStyle ] [] content

        StyledCell style content ->
            styled div (cellStyle :: style) [] content


renderCellStyled : TableStyleConfig -> Css.Style -> Cell msg -> Html msg
renderCellStyled tableStyleConfig extraStyle cell =
    let
        cellStyle =
            Css.batch [ Css.display Css.tableCell, tableStyleConfig.cell ]
    in
    case cell of
        Cell content ->
            styled div [ cellStyle, extraStyle ] [] content

        StyledCell style content ->
            styled div ([ cellStyle, extraStyle ] ++ style) [] content


renderHeader : TableStyleConfig -> List (Cell msg) -> Html msg
renderHeader tableStyleConfig cells =
    let
        headerStyle =
            Css.batch [ Css.display Css.tableRow, tableStyleConfig.headerRow ]
    in
    case cells of
        [] ->
            Html.Styled.text ""

        _ ->
            case tableStyleConfig.rounded of
                Nothing ->
                    styled div [ headerStyle ] [] (List.map (renderHeaderCell tableStyleConfig) cells)

                Just x ->
                    styled div
                        [ headerStyle ]
                        []
                        (ListHelpers.mapFML
                            ( renderHeaderCellStyled tableStyleConfig (Css.borderRadius4 (Css.px x.topLeft) Css.zero Css.zero Css.zero)
                            , renderHeaderCell tableStyleConfig
                            , renderHeaderCellStyled tableStyleConfig (Css.borderRadius4 Css.zero (Css.px x.topRight) Css.zero Css.zero)
                            )
                            cells
                        )


renderHeaderCell : TableStyleConfig -> Cell msg -> Html msg
renderHeaderCell tableStyleConfig cell =
    let
        cellStyle =
            Css.batch [ Css.display Css.tableCell, tableStyleConfig.headerCell ]
    in
    case cell of
        Cell content ->
            styled div [ cellStyle ] [] content

        StyledCell style content ->
            styled div (cellStyle :: style) [] content


renderHeaderCellStyled : TableStyleConfig -> Css.Style -> Cell msg -> Html msg
renderHeaderCellStyled tableStyleConfig extraStyle cell =
    let
        cellStyle =
            Css.batch [ Css.display Css.tableCell, tableStyleConfig.headerCell ]
    in
    case cell of
        Cell content ->
            styled div [ cellStyle, extraStyle ] [] content

        StyledCell style content ->
            styled div ([ cellStyle, extraStyle ] ++ style) [] content


renderBodyInternal : Bool -> TableStyleConfig -> List (List (Cell msg)) -> List (Html msg)
renderBodyInternal withoutHeaders tableStyleConfig rows =
    case tableStyleConfig.rounded of
        Nothing ->
            List.map (renderRow tableStyleConfig) rows

        Just _ ->
            if withoutHeaders then
                ListHelpers.mapFML ( renderFirstRowRounded tableStyleConfig, renderRow tableStyleConfig, renderLastRowRounded tableStyleConfig ) rows

            else
                ListHelpers.mapML ( renderRow tableStyleConfig, renderLastRowRounded tableStyleConfig ) rows


renderRow : TableStyleConfig -> List (Cell msg) -> Html msg
renderRow tableStyleConfig cells =
    let
        rowStyle =
            Css.batch [ Css.display Css.tableRow, tableStyleConfig.row ]
    in
    styled div [ rowStyle ] [] (List.map (renderCell tableStyleConfig) cells)


renderFirstRowRounded : TableStyleConfig -> List (Cell msg) -> Html msg
renderFirstRowRounded tableStyleConfig cells =
    let
        rowStyle =
            Css.batch [ Css.display Css.tableRow, tableStyleConfig.row ]
    in
    case tableStyleConfig.rounded of
        Nothing ->
            styled div [ rowStyle ] [] (List.map (renderCell tableStyleConfig) cells)

        Just x ->
            styled div
                [ rowStyle ]
                []
                (ListHelpers.mapFML
                    ( renderCellStyled tableStyleConfig (Css.borderRadius4 (Css.px x.topLeft) Css.zero Css.zero Css.zero)
                    , renderCell tableStyleConfig
                    , renderCellStyled tableStyleConfig (Css.borderRadius4 Css.zero (Css.px x.topRight) Css.zero Css.zero)
                    )
                    cells
                )


renderLastRowRounded : TableStyleConfig -> List (Cell msg) -> Html msg
renderLastRowRounded tableStyleConfig cells =
    let
        rowStyle =
            Css.batch [ Css.display Css.tableRow, tableStyleConfig.row ]
    in
    case tableStyleConfig.rounded of
        Nothing ->
            styled div [ rowStyle ] [] (List.map (renderCell tableStyleConfig) cells)

        Just x ->
            styled div
                [ rowStyle ]
                []
                (ListHelpers.mapFML
                    ( renderCellStyled tableStyleConfig (Css.borderRadius4 Css.zero Css.zero Css.zero (Css.px x.bottomLeft))
                    , renderCell tableStyleConfig
                    , renderCellStyled tableStyleConfig (Css.borderRadius4 Css.zero Css.zero (Css.px x.bottomRight) Css.zero)
                    )
                    cells
                )


render : TableStyleConfig -> Table msg -> Html msg
render tableStyleConfig table =
    let
        tableStyle =
            Css.batch [ Css.display Css.table, tableStyleConfig.table ]

        withoutHeaders =
            List.isEmpty table.header
    in
    styled div [ tableStyle ] [] (renderHeader tableStyleConfig table.header :: renderBodyInternal withoutHeaders tableStyleConfig table.body)


renderBody : TableStyleConfig -> List (List (Cell msg)) -> Html msg
renderBody tableStyleConfig body =
    render tableStyleConfig <| fromBody body


type alias Table msg =
    { header : List (Cell msg)
    , body : List (List (Cell msg))
    }


fromBody : List (List (Cell msg)) -> Table msg
fromBody bodyRows =
    { header = []
    , body = bodyRows
    }


type Cell msg
    = Cell (List (Html msg))
    | StyledCell (List Css.Style) (List (Html msg))
