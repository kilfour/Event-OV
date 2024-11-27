module Lib.DateFormat exposing (addSevenDays, formatAsBelgianText, formatDate)

import Date
import Time


formatDate : Time.Posix -> String
formatDate posixTime =
    let
        year =
            Time.toYear Time.utc posixTime

        month =
            Time.toMonth Time.utc posixTime

        day =
            Time.toDay Time.utc posixTime
    in
    formatYear year
        ++ "-"
        ++ formatMonth month
        ++ "-"
        ++ formatDay day


formatYear : Int -> String
formatYear =
    String.fromInt


formatMonth : Time.Month -> String
formatMonth month =
    case month of
        Time.Jan ->
            "01"

        Time.Feb ->
            "02"

        Time.Mar ->
            "03"

        Time.Apr ->
            "04"

        Time.May ->
            "05"

        Time.Jun ->
            "06"

        Time.Jul ->
            "07"

        Time.Aug ->
            "08"

        Time.Sep ->
            "09"

        Time.Oct ->
            "10"

        Time.Nov ->
            "11"

        Time.Dec ->
            "12"


formatDay : Int -> String
formatDay =
    String.fromInt >> String.padLeft 2 '0'


formatMonthAsBelgiumText : String -> String
formatMonthAsBelgiumText month =
    case month of
        "01" ->
            "januari"

        "02" ->
            "februari"

        "03" ->
            "maart"

        "04" ->
            "april"

        "05" ->
            "mei"

        "06" ->
            "juni"

        "07" ->
            "juli"

        "08" ->
            "augustus"

        "09" ->
            "september"

        "10" ->
            "october"

        "11" ->
            "november"

        "12" ->
            "december"

        _ ->
            "januari"



-- incoming as yyyy-mm-dd


formatAsBelgianText : String -> String
formatAsBelgianText date =
    let
        list =
            String.split "-" date

        day =
            List.drop 2 list
                |> List.head
                |> Maybe.withDefault "01"
                |> String.toInt
                |> Maybe.withDefault 1
                |> String.fromInt

        month =
            List.drop 1 list |> List.head |> Maybe.withDefault "01" |> formatMonthAsBelgiumText

        year =
            List.head list |> Maybe.withDefault "1970"
    in
    day
        ++ " "
        ++ month
        ++ " "
        ++ year



-- incoming as yyyy-mm-dd


addSevenDays : String -> String
addSevenDays input =
    Date.fromIsoString input
        |> Result.map (Date.add Date.Days 7)
        |> Result.map Date.toIsoString
        |> Result.withDefault input
