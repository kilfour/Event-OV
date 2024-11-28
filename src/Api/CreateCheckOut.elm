module Api.CreateCheckOut exposing (..)

import Api.Helpers.ObjectId exposing (..)
import Http
import Json.Encode
import Round


encoder : String -> Float -> Json.Encode.Value
encoder orderId amount =
    Json.Encode.object
        [ ( "orderId", Json.Encode.string orderId )
        , ( "amount", Json.Encode.string (Round.round 2 amount) )
        ]


dispatch : String -> String -> Float -> (Result Http.Error String -> msg) -> Cmd msg
dispatch baseApiUrl id amount msg =
    let
        jsonPayload : String
        jsonPayload =
            Json.Encode.encode 0 (encoder id amount)

        request =
            Http.request
                { method = "POST"
                , headers = []
                , url = baseApiUrl ++ "create-checkout"
                , body = Http.stringBody "application/json" jsonPayload
                , expect = Http.expectString msg
                , timeout = Nothing
                , tracker = Nothing
                }
    in
    request
