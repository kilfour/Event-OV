module Helmsman exposing (..)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Lib.Effect as Effect
import Pages.Home as Home
import Pages.InvoiceInfo as InvoiceInfo
import Pages.OrderTickets as OrderTickets
import Pages.OrderTicketsTemp as OrderTicketsTemp
import Pages.Payment as Payment
import Pages.PaymentSuccess as PaymentSuccess
import Pages.TeesAndCees as TeesAndCees
import Pages.Tickets as Tickets
import Shared



-- import Pages.AAA as AAA


type Model
    = NotFound
    | SplashPage
    | HomePage Home.Model
    | OrderTicketsPage OrderTickets.Model
    | PaymentSuccessPage PaymentSuccess.Model
    | PaymentPage Payment.Model
    | TeesAndCeesPage TeesAndCees.Model
    | InvoiceInfoPage InvoiceInfo.Model
    | TicketsPage Tickets.Model
    | OrderTicketsTempPage OrderTicketsTemp.Model



-- | AAAPage AAA.Model


init : Model
init =
    SplashPage


subscriptions : Model -> Sub Msg
subscriptions model =
    case model of
        PaymentPage page ->
            Sub.map PaymentMsg (Payment.subscriptions page)

        _ ->
            Sub.none


type Msg
    = HomeMsg Home.Msg
    | OrderTicketsMsg OrderTickets.Msg
    | PaymentSuccessMsg PaymentSuccess.Msg
    | PaymentMsg Payment.Msg
    | TeesAndCeesMsg TeesAndCees.Msg
    | InvoiceInfoMsg InvoiceInfo.Msg
    | TicketsMsg Tickets.Msg
    | OrderTicketsTempMsg OrderTicketsTemp.Msg



-- | AAAMsg AAA.Msg


update : Msg -> Shared.Model -> Model -> ( Model, Effect.Effect Shared.Msg Msg )
update msg shared model =
    case ( msg, model ) of
        ( HomeMsg pageMsg, HomePage page ) ->
            let
                ( updatedPage, effect ) =
                    Home.update pageMsg shared page
            in
            ( HomePage updatedPage, Effect.map HomeMsg effect )

        ( OrderTicketsMsg pageMsg, OrderTicketsPage page ) ->
            let
                ( updatedPage, effect ) =
                    OrderTickets.update pageMsg shared page
            in
            ( OrderTicketsPage updatedPage, Effect.map OrderTicketsMsg effect )

        ( PaymentSuccessMsg pageMsg, PaymentSuccessPage page ) ->
            let
                ( updatedPage, effect ) =
                    PaymentSuccess.update pageMsg shared page
            in
            ( PaymentSuccessPage updatedPage, Effect.map PaymentSuccessMsg effect )

        ( PaymentMsg pageMsg, PaymentPage page ) ->
            let
                ( updatedPage, effect ) =
                    Payment.update pageMsg shared page
            in
            ( PaymentPage updatedPage, Effect.map PaymentMsg effect )

        ( TeesAndCeesMsg pageMsg, TeesAndCeesPage page ) ->
            let
                ( updatedPage, effect ) =
                    TeesAndCees.update pageMsg shared page
            in
            ( TeesAndCeesPage updatedPage, Effect.map TeesAndCeesMsg effect )

        ( InvoiceInfoMsg pageMsg, InvoiceInfoPage page ) ->
            let
                ( updatedPage, effect ) =
                    InvoiceInfo.update pageMsg shared page
            in
            ( InvoiceInfoPage updatedPage, Effect.map InvoiceInfoMsg effect )

        ( TicketsMsg pageMsg, TicketsPage page ) ->
            let
                ( updatedPage, effect ) =
                    Tickets.update pageMsg shared page
            in
            ( TicketsPage updatedPage, Effect.map TicketsMsg effect )

        ( OrderTicketsTempMsg pageMsg, OrderTicketsTempPage page ) ->
            let
                ( updatedPage, effect ) =
                    OrderTicketsTemp.update pageMsg shared page
            in
            ( OrderTicketsTempPage updatedPage, Effect.map OrderTicketsTempMsg effect )

        -- ( AAAMsg pageMsg, AAAPage page ) ->
        --     let
        --         ( updatedPage, effect ) =
        --             AAA.update pageMsg shared page
        --     in
        --     ( AAAPage updatedPage, Effect.map AAAMsg effect )
        ( _, _ ) ->
            --Debug.todo "message arrived for the wrong page"
            --Disregard messages that arrived for the wrong page.
            ( model, Effect.none )


view : Shared.Model -> Model -> Html Msg
view shared model =
    case model of
        NotFound ->
            h1 [] [ text "404 : Page Not Found" ]

        SplashPage ->
            h1 [] [ text "Loading Data" ]

        HomePage page ->
            Html.Styled.map HomeMsg <| Home.view shared page

        OrderTicketsPage page ->
            Html.Styled.map OrderTicketsMsg <| OrderTickets.view shared page

        PaymentSuccessPage page ->
            Html.Styled.map PaymentSuccessMsg <| PaymentSuccess.view shared page

        PaymentPage page ->
            Html.Styled.map PaymentMsg <| Payment.view shared page

        TeesAndCeesPage page ->
            Html.Styled.map TeesAndCeesMsg <| TeesAndCees.view shared page

        InvoiceInfoPage page ->
            Html.Styled.map InvoiceInfoMsg <| InvoiceInfo.view shared page

        TicketsPage page ->
            Html.Styled.map TicketsMsg <| Tickets.view shared page

        OrderTicketsTempPage page ->
            Html.Styled.map OrderTicketsTempMsg <| OrderTicketsTemp.view shared page



-- AAAPage page ->
--     Html.Styled.map AAAMsg <| AAA.view shared page
