module Domain.Event exposing (..)

import Round


type alias Event =
    { id : Maybe Int
    , name : String
    , address : String
    , date : String
    , time : String
    , extraInfo : List String
    , ticketTypes : List TicketType
    }


type alias TicketType =
    { id : String, description : String, price : Float, info : List String }


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
    , name = "Nieuwjaarsdrink 2025"
    , address = "Maneblusser City\nNora Tilleylaan 28\n2800 Mechelen"
    , date = "Donderdag 9 Januari 2025"
    , time = "18:30"
    , extraInfo =
        [ "Gratis parkeren."
        , "Keynote spreker Rik Moons : 'Domme vragen bestaan wel'."
        , "Catering verzorgd door Cook & Taste."
        ]
    , ticketTypes =
        [ { id = "VVK", description = "Standaard", price = 60, info = [ "Drank en gerechtjes inbegrepen tot 21u30." ] }
        , { id = "VIP"
          , description = "Vip Tafel"
          , price = 500
          , info =
                [ "Voor zes personen plus fles Champagne."
                , "Sponsor logo getoond op afzonderlijke tafel en geprojecteerd op scherm."
                , "Drank en gerechtjes inbegrepen tot 21u30."
                ]
          }
        ]
    }
