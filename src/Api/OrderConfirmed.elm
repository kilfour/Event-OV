module Api.OrderConfirmed exposing (..)

import Api.Helpers.ObjectId exposing (..)
import Http
import Json.Encode


dispatch : String -> String -> (Result Http.Error Id -> msg) -> Cmd msg
dispatch baseApiUrl id msg =
    let
        jsonPayload : String
        jsonPayload =
            Json.Encode.encode 0 (objectIdEncoder id)

        request =
            Http.request
                { method = "POST"
                , headers = []
                , url = baseApiUrl ++ "confirm-order"
                , body = Http.stringBody "application/json" jsonPayload
                , expect = Http.expectJson msg objectIdDecoder
                , timeout = Nothing
                , tracker = Nothing
                }
    in
    request
