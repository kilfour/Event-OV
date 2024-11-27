module Api.SendMail exposing (..)

import Http
import Json.Decode
import Json.Decode.Pipeline
import Json.Encode


type alias Payload =
    { email : String
    , orderId : String
    , total : Float
    , url : String
    }


encoder : Payload -> Json.Encode.Value
encoder payload =
    Json.Encode.object
        [ ( "email", Json.Encode.string payload.email )
        , ( "orderId", Json.Encode.string payload.orderId )
        , ( "total", Json.Encode.float payload.total )
        , ( "url", Json.Encode.string payload.url )
        ]


type alias MailResult =
    { success : Bool }


decoder : Json.Decode.Decoder MailResult
decoder =
    Json.Decode.succeed MailResult
        |> Json.Decode.Pipeline.required "success" Json.Decode.bool


dispatch : String -> Payload -> (Result Http.Error MailResult -> msg) -> Cmd msg
dispatch baseApiUrl payload msg =
    let
        jsonPayload : String
        jsonPayload =
            Json.Encode.encode 0 (encoder payload)

        request =
            Http.request
                { method = "POST"
                , headers = []
                , url = baseApiUrl ++ "send-mail"
                , body = Http.stringBody "application/json" jsonPayload
                , expect = Http.expectJson msg decoder
                , timeout = Nothing
                , tracker = Nothing
                }
    in
    request
