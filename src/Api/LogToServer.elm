module Api.LogToServer exposing (..)

import Http
import Json.Decode
import Json.Decode.Pipeline
import Json.Encode


requestEncoder : String -> Json.Encode.Value
requestEncoder message =
    Json.Encode.object
        [ ( "message", Json.Encode.string message ) ]


type alias Response =
    { success : Bool }


responseDecoder : Json.Decode.Decoder Response
responseDecoder =
    Json.Decode.succeed Response
        |> Json.Decode.Pipeline.required "success" Json.Decode.bool


dispatch : String -> String -> (Result Http.Error Response -> msg) -> Cmd msg
dispatch baseApiUrl message msg =
    let
        jsonPayload : String
        jsonPayload =
            Json.Encode.encode 0 (requestEncoder message)

        request =
            Http.request
                { method = "POST"
                , headers = []
                , url = baseApiUrl ++ "log-to-server"
                , body = Http.stringBody "application/json" jsonPayload
                , expect = Http.expectJson msg responseDecoder
                , timeout = Nothing
                , tracker = Nothing
                }
    in
    request
