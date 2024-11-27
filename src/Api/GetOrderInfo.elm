module Api.GetOrderInfo exposing (..)

import Api.Helpers.ObjectId exposing (..)
import Http
import Json.Decode
import Json.Decode.Pipeline
import Json.Encode


type alias Ticket =
    { id : String
    , description : String
    , price : Float
    }


type alias Order =
    { id : String
    , code : String
    , christianName : String
    , lastName : String
    , email : String
    , tickets : List Ticket
    }


decoder : Json.Decode.Decoder Order
decoder =
    Json.Decode.succeed Order
        |> Json.Decode.Pipeline.required "id" Json.Decode.string
        |> Json.Decode.Pipeline.required "code" Json.Decode.string
        |> Json.Decode.Pipeline.required "christianName" Json.Decode.string
        |> Json.Decode.Pipeline.required "lastName" Json.Decode.string
        |> Json.Decode.Pipeline.required "email" Json.Decode.string
        |> Json.Decode.Pipeline.required "tickets" (Json.Decode.list ticketDecoder)


ticketDecoder : Json.Decode.Decoder Ticket
ticketDecoder =
    Json.Decode.succeed Ticket
        |> Json.Decode.Pipeline.required "id" Json.Decode.string
        |> Json.Decode.Pipeline.required "description" Json.Decode.string
        |> Json.Decode.Pipeline.required "price" Json.Decode.float


dispatch : String -> String -> (Result Http.Error Order -> msg) -> Cmd msg
dispatch baseApiUrl id msg =
    let
        jsonPayload : String
        jsonPayload =
            Json.Encode.encode 0 (objectIdEncoder id)

        request =
            Http.request
                { method = "POST"
                , headers = []
                , url = baseApiUrl ++ "get-order-info"
                , body = Http.stringBody "application/json" jsonPayload
                , expect = Http.expectJson msg decoder
                , timeout = Nothing
                , tracker = Nothing
                }
    in
    request
