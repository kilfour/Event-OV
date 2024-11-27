module Api.SaveInvoiceInfo exposing (..)

import Api.Helpers.ObjectId exposing (..)
import Http
import Json.Encode


type alias InvoiceInfo =
    { orderId : String
    , companyName : String
    , vatNumber : String
    , address : String
    }


encoder : InvoiceInfo -> Json.Encode.Value
encoder invoiceInfo =
    Json.Encode.object
        [ ( "orderId", Json.Encode.string invoiceInfo.orderId )
        , ( "companyName", Json.Encode.string invoiceInfo.companyName )
        , ( "vatNumber", Json.Encode.string invoiceInfo.vatNumber )
        , ( "address", Json.Encode.string invoiceInfo.address )
        ]


dispatch : String -> InvoiceInfo -> (Result Http.Error Id -> msg) -> Cmd msg
dispatch baseApiUrl info msg =
    let
        jsonPayload : String
        jsonPayload =
            Json.Encode.encode 0 (encoder info)

        request =
            Http.request
                { method = "POST"
                , headers = []
                , url = baseApiUrl ++ "save-invoice-info"
                , body = Http.stringBody "application/json" jsonPayload
                , expect = Http.expectJson msg objectIdDecoder
                , timeout = Nothing
                , tracker = Nothing
                }
    in
    request
