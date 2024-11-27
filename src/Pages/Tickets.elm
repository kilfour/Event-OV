module Pages.Tickets exposing (..)

import Api.GetOrderInfo as GetOrderInfo exposing (Order, Ticket)
import Css
import Domain.Event exposing (..)
import Html.Styled as Html exposing (Html)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Http
import Lib.DivTable as DivTable
import Lib.Effect as Effect exposing (Effect)
import QRCode
import Round
import Shared
import Style
import Svg.Attributes as SvgA


type alias Model =
    { id : String
    , code : String
    , orderInfo : Maybe Order
    , isValid : Bool
    }


init : Shared.Model -> String -> ( Model, Cmd Msg )
init shared info =
    let
        split =
            String.split "-" info

        id : String
        id =
            List.head split |> Maybe.withDefault ""

        code =
            split
                |> List.drop 1
                |> List.head
                |> Maybe.withDefault ""
    in
    ( { id = id, code = code, orderInfo = Nothing, isValid = True }
    , GetOrderInfo.dispatch shared.baseApiUrl id OrderInfoLoaded
    )


type Msg
    = NoOp
    | OrderInfoLoaded (Result Http.Error Order)


update : Msg -> Shared.Model -> Model -> ( Model, Effect Shared.Msg Msg )
update msg _ model =
    case msg of
        NoOp ->
            ( model
            , Effect.None
            )

        OrderInfoLoaded (Ok orderInfo) ->
            ( { model | orderInfo = Just orderInfo, isValid = orderInfo.code == model.code }
            , Effect.none
            )

        OrderInfoLoaded (Err error) ->
            ( model, Effect.Shared <| Shared.Error error )


view : Shared.Model -> Model -> Html Msg
view shared model =
    case model.orderInfo of
        Nothing ->
            Html.text ""

        Just orderInfo ->
            if not model.isValid then
                Html.h1 [] [ Html.text "404 : Page Not Found" ]

            else
                Html.div [] <|
                    [ Html.styled Html.div Style.container [] <|
                        ticketsView shared.device (orderInfo.christianName ++ " " ++ orderInfo.lastName) orderInfo.id orderInfo.tickets
                    ]


ticketsView : Shared.Device -> String -> String -> List Ticket -> List (Html msg)
ticketsView device name orderNr tickets =
    List.indexedMap (ticketView device name orderNr) tickets


ticketView : Shared.Device -> String -> String -> Int -> Ticket -> Html msg
ticketView device name orderNr index ticket =
    let
        evt =
            theEvent

        numberString =
            orderNr ++ "-" ++ ticket.id
    in
    case device of
        Shared.Desktop ->
            DivTable.renderBody
                (DivTable.emptyStyle
                    |> DivTable.customizeTableStyle
                        ([ Css.width (Css.vw 80)
                         , Css.maxWidth (Css.vw 80)
                         , Css.margin Css.auto
                         , Css.whiteSpace Css.noWrap
                         , Css.borderBottom3 (Css.em 0.1) Css.dashed (Css.hex "000")
                         , Css.borderCollapse Css.collapse
                         ]
                            ++ (if index == 0 then
                                    [ Css.borderTop3 (Css.em 0.1) Css.dashed (Css.hex "000") ]

                                else
                                    []
                               )
                        )
                    |> DivTable.customizeCellStyle [ Css.width (Css.pct 100) ]
                )
                [ [ DivTable.Cell
                        [ DivTable.renderBody DivTable.emptyStyle
                            [ [ DivTable.Cell [ Html.h1 [] [ Html.text evt.name ] ] ]
                            , [ DivTable.Cell [ Html.styled Html.h3 [ Css.marginBottom (Css.em 0.25) ] [] [ Html.text (dateTimeString evt) ] ] ]
                            , [ DivTable.Cell [ Html.text evt.address ] ]
                            , [ DivTable.StyledCell [ Css.paddingTop (Css.em 1.75), Css.paddingBottom (Css.em 0.735) ] [ Html.text name ] ]
                            ]
                        ]
                  , DivTable.Cell
                        [ DivTable.renderBody
                            (DivTable.emptyStyle
                                |> DivTable.customizeTableStyle [ Css.textAlign Css.right ]
                            )
                            [ [ DivTable.StyledCell [ Css.paddingRight (Css.em 1.25) ] [ Html.text (ticket.description ++ " - €" ++ Round.round 2 ticket.price) ] ]
                            , [ DivTable.Cell [ qrCodeView numberString ] ]
                            , [ DivTable.StyledCell [ Css.paddingRight (Css.em 1.25) ] [ Html.text numberString ] ]
                            ]
                        ]
                  ]
                ]

        Shared.Phone ->
            DivTable.renderBody
                (DivTable.emptyStyle
                    |> DivTable.customizeTableStyle
                        ([ Css.width (Css.vw 80)
                         , Css.maxWidth (Css.vw 80)
                         , Css.margin Css.auto
                         , Css.whiteSpace Css.noWrap
                         , Css.borderBottom3 (Css.em 0.1) Css.dashed (Css.hex "000")
                         , Css.borderCollapse Css.collapse
                         ]
                            ++ (if index == 0 then
                                    [ Css.borderTop3 (Css.em 0.1) Css.dashed (Css.hex "000") ]

                                else
                                    []
                               )
                        )
                    |> DivTable.customizeCellStyle [ Css.width (Css.pct 100) ]
                )
                [ [ DivTable.Cell
                        [ DivTable.renderBody DivTable.emptyStyle
                            [ [ DivTable.Cell [ Html.h1 [] [ Html.text evt.name ] ] ]
                            , [ DivTable.Cell [ Html.styled Html.h3 [ Css.marginBottom (Css.em 0.25) ] [] [ Html.text (dateTimeString evt) ] ] ] --[ Html.text "date - time" ] ]
                            , [ DivTable.Cell [ Html.text evt.address ] ]
                            , [ DivTable.StyledCell [ Css.paddingTop (Css.em 1.75), Css.paddingBottom (Css.em 0.735) ] [ Html.text name ] ]
                            ]
                        ]
                  ]
                , [ DivTable.Cell
                        [ DivTable.renderBody
                            (DivTable.emptyStyle
                                |> DivTable.customizeTableStyle [ Css.textAlign Css.center, Css.margin2 Css.zero Css.auto ]
                            )
                            [ [ DivTable.StyledCell [ Css.paddingRight (Css.em 1.25) ] [ Html.text (ticket.description ++ " - €" ++ Round.round 2 ticket.price) ] ]
                            , [ DivTable.Cell [ qrCodeView numberString ] ]
                            , [ DivTable.StyledCell [ Css.paddingRight (Css.em 1.25) ] [ Html.text numberString ] ]
                            ]
                        ]
                  ]
                ]


qrCodeView : String -> Html msg
qrCodeView message =
    QRCode.fromString message
        |> Result.map
            (\a ->
                QRCode.toSvg
                    [ SvgA.width "6.25em"
                    , SvgA.height "6.25em"
                    ]
                    a
                    |> Html.fromUnstyled
            )
        |> Result.withDefault (Html.text "Error while encoding to QRCode.")
