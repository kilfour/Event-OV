module Routes exposing (..)

import Helmsman
import Pages.Home as Home
import Pages.InvoiceInfo as InvoiceInfo
import Pages.OrderTickets as OrderTickets
import Pages.OrderTicketsTemp as OrderTicketsTemp
import Pages.Payment as Payment
import Pages.PaymentSuccess as PaymentSuccess
import Pages.TeesAndCees as TeesAndCees
import Pages.Tickets as Tickets
import Shared
import Url
import Url.Parser as Parser exposing ((</>), Parser, oneOf)


type Route
    = NotFound
    | Splash
    | Home
    | OrderTickets
    | OrderTicketsTemp
    | Payment
    | PaymentSuccess
    | TeesAndCees
    | InvoiceInfo
    | Tickets String


parser : Parser (Route -> a) a
parser =
    oneOf
        [ Parser.map Home Parser.top
        , Parser.map Home (Parser.s "home")
        , Parser.map OrderTickets (Parser.s "order-tickets")
        , Parser.map OrderTicketsTemp (Parser.s "order-tickets-temp")
        , Parser.map Payment (Parser.s "payment")
        , Parser.map PaymentSuccess (Parser.s "payment-success")
        , Parser.map TeesAndCees (Parser.s "tees-and-cees")
        , Parser.map InvoiceInfo (Parser.s "invoice-info")
        , Parser.map Tickets (Parser.s "tickets" </> Parser.string)
        ]


fromUrl : Url.Url -> Route
fromUrl url =
    Maybe.withDefault NotFound (Parser.parse parser url)


type alias MainModel =
    { helmsman : Helmsman.Model, shared : Shared.Model }


changeRouteTo : Route -> MainModel -> ( MainModel, Cmd Helmsman.Msg )
changeRouteTo route model =
    case route of
        NotFound ->
            ( { model | helmsman = Helmsman.NotFound }, Cmd.none )

        Splash ->
            ( { model | helmsman = Helmsman.SplashPage }, Cmd.none )

        Home ->
            ( { model | helmsman = Helmsman.HomePage Home.init }, Cmd.none )

        OrderTickets ->
            let
                ( page, cmd ) =
                    OrderTickets.init model.shared
            in
            ( { model | helmsman = Helmsman.OrderTicketsPage page }, Cmd.map Helmsman.OrderTicketsMsg cmd )

        OrderTicketsTemp ->
            let
                ( page, cmd ) =
                    OrderTicketsTemp.init model.shared
            in
            ( { model | helmsman = Helmsman.OrderTicketsTempPage page }, Cmd.map Helmsman.OrderTicketsTempMsg cmd )

        Payment ->
            let
                ( page, cmd ) =
                    Payment.init model.shared
            in
            ( { model | helmsman = Helmsman.PaymentPage page }, Cmd.map Helmsman.PaymentMsg cmd )

        PaymentSuccess ->
            let
                ( page, cmd ) =
                    PaymentSuccess.init model.shared
            in
            ( { model | helmsman = Helmsman.PaymentSuccessPage page }, Cmd.map Helmsman.PaymentSuccessMsg cmd )

        TeesAndCees ->
            ( { model | helmsman = Helmsman.TeesAndCeesPage TeesAndCees.init }, Cmd.none )

        InvoiceInfo ->
            ( { model | helmsman = Helmsman.InvoiceInfoPage InvoiceInfo.init }, Cmd.none )

        Tickets info ->
            let
                ( page, cmd ) =
                    Tickets.init model.shared info
            in
            ( { model | helmsman = Helmsman.TicketsPage page }, Cmd.map Helmsman.TicketsMsg cmd )


changeRouteToFromUrl : Url.Url -> MainModel -> ( MainModel, Cmd Helmsman.Msg )
changeRouteToFromUrl =
    changeRouteTo << fromUrl
