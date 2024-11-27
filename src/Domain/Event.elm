module Domain.Event exposing (..)

import Round


type alias Event =
    { id : Maybe Int
    , name : String
    , address : String
    , date : String
    , time : String
    , extraInfo : String
    , ticketTypes : List TicketType
    }


type alias TicketType =
    { id : String, description : String, price : Float, info : String }


dateTimeString : { a | date : String, time : String } -> String
dateTimeString evt =
    evt.date ++ " om " ++ evt.time ++ " uur."


ticketsString : { a | price : Float } -> String
ticketsString evt =
    "VVK - €" ++ Round.round 2 evt.price



-- 60 € per persoon (drank en gerechtjes inbegrepen tot 21u30)
-- 500 € viptafel (6p tickets + fles Champagne) (drank en gerechtjes inbegrepen tot 21u30)
-- Maximum tickets in verkoop (gecombineerd) is een totaal van 300, verkoop tot 8 januari middernacht


theEvent : Event
theEvent =
    { id = Nothing
    , name = "Event Ondernemend Mechelen"
    , address = "Maneblusser City\nNora Tilleylaan 28\n2800 Mechelen"
    , date = "Donderdag 9 Januari 2025"
    , time = "18:30"
    , extraInfo = "Gratis parkeren.\nDrank en gerechtjes inbegrepen tot 21u30."
    , ticketTypes =
        [ { id = "VVK", description = "Standaard", price = 60, info = "" }
        , { id = "VIP", description = "Vip Tafel", price = 500, info = "Voor zes personen plus fles Champagne.\nSponsor logo getoond op afzonderlijke tafel en geprojecteerd op scherm." }
        ]
    }
