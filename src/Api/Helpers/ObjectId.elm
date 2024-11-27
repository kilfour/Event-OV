module Api.Helpers.ObjectId exposing (..)

import Json.Decode
import Json.Decode.Pipeline
import Json.Encode


type alias Id =
    { id : String
    }


objectIdEncoder : String -> Json.Encode.Value
objectIdEncoder id =
    Json.Encode.object
        [ ( "id", Json.Encode.string id ) ]


objectIdDecoder : Json.Decode.Decoder Id
objectIdDecoder =
    Json.Decode.succeed Id
        |> Json.Decode.Pipeline.required "id" Json.Decode.string
