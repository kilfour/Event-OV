module Api.GetFreeTicketsAvailable exposing (..)

import Http
import Json.Decode
import Json.Decode.Pipeline


type alias Response =
    { amount : Int }


decoder : Json.Decode.Decoder Response
decoder =
    Json.Decode.succeed Response
        |> Json.Decode.Pipeline.required "amount" Json.Decode.int


dispatch : String -> (Result Http.Error Response -> msg) -> Cmd msg
dispatch baseApiUrl msg =
    let
        request =
            Http.request
                { method = "POST"
                , headers = []
                , url = baseApiUrl ++ "get-free-tickets-available"
                , body = Http.emptyBody
                , expect = Http.expectJson msg decoder
                , timeout = Nothing
                , tracker = Nothing
                }
    in
    request
