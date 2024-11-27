module Api.OrderInfoEntered exposing (..)

import Api.Helpers.ObjectId exposing (..)
import Http
import Json.Encode


type alias OrderInfo =
    { christianName : String
    , lastName : String
    , email : String
    , ticketsInfo : List TicketInfo
    }


type alias TicketInfo =
    { id : String
    , description : String
    , price : Float
    , numberOfTickets : Int
    }


ticketEncoder : TicketInfo -> Json.Encode.Value
ticketEncoder ticketInfo =
    Json.Encode.object
        [ ( "id", Json.Encode.string ticketInfo.id )
        , ( "description", Json.Encode.string ticketInfo.description )
        , ( "price", Json.Encode.float ticketInfo.price )
        , ( "numberOfTickets", Json.Encode.int ticketInfo.numberOfTickets )
        ]


encoder : OrderInfo -> Json.Encode.Value
encoder orderInfo =
    Json.Encode.object
        [ ( "christianName", Json.Encode.string orderInfo.christianName )
        , ( "lastName", Json.Encode.string orderInfo.lastName )
        , ( "email", Json.Encode.string orderInfo.email )
        , ( "ticketsInfo", Json.Encode.list ticketEncoder orderInfo.ticketsInfo )
        ]


dispatch : String -> OrderInfo -> (Result Http.Error Id -> msg) -> Cmd msg
dispatch baseApiUrl evt msg =
    let
        jsonPayload : String
        jsonPayload =
            Json.Encode.encode 0 (encoder evt)

        request =
            Http.request
                { method = "POST"
                , headers = []
                , url = baseApiUrl ++ "order-info-entered"
                , body = Http.stringBody "application/json" jsonPayload
                , expect = Http.expectJson msg objectIdDecoder
                , timeout = Nothing
                , tracker = Nothing
                }
    in
    request
