module Lib.ListHelpers exposing (..)

import Html exposing (a)


emptyIf : Bool -> List a -> List a
emptyIf predicate l =
    if predicate then
        []

    else
        l


unique : List a -> List a
unique l =
    let
        incUnique : a -> List a -> List a
        incUnique elem lst =
            if List.member elem lst then
                lst

            else
                lst ++ [ elem ]
    in
    List.foldl incUnique [] l


getByIndex : Int -> List a -> Maybe a
getByIndex id items =
    items
        |> List.drop id
        |> List.head


updateItemsByIndex : (a -> a) -> Int -> List a -> List a
updateItemsByIndex func id items =
    let
        updateItemByIndex idx item =
            if idx == id then
                func item

            else
                item
    in
    List.indexedMap updateItemByIndex items


dropItemWithIndex : Int -> List a -> List a
dropItemWithIndex id items =
    List.take id items ++ List.drop (id + 1) items


getById : a -> List { b | id : a } -> Maybe { b | id : a }
getById id items =
    items
        |> List.filter (\x -> x.id == id)
        |> List.head


updateItemsById : ({ a | id : b } -> { a | id : b }) -> b -> List { a | id : b } -> List { a | id : b }
updateItemsById func id items =
    let
        updateItemById : { a | id : b } -> { a | id : b }
        updateItemById item =
            if item.id == id then
                func item

            else
                item
    in
    List.map updateItemById items


dropItemWithId : a -> List { b | id : a } -> List { b | id : a }
dropItemWithId id items =
    List.filter (\x -> x.id /= id) items


moveUpByIndex : Int -> List a -> List a
moveUpByIndex id items =
    let
        itemUp =
            items
                |> List.drop id
                |> List.take 1

        itemDown =
            items
                |> List.drop (id - 1)
                |> List.take 1
    in
    List.take (id - 1) items ++ itemUp ++ itemDown ++ List.drop (id + 1) items


moveDownByIndex : Int -> List a -> List a
moveDownByIndex id items =
    let
        itemUp =
            items
                |> List.drop (id + 1)
                |> List.take 1

        itemDown =
            items
                |> List.drop id
                |> List.take 1
    in
    List.take id items ++ itemUp ++ itemDown ++ List.drop (id + 2) items


mapFML : ( a -> b, a -> b, a -> b ) -> List a -> List b
mapFML ( first, middle, last ) items =
    let
        mapItem nrOfItems index item =
            if index == 0 then
                first item

            else if index == nrOfItems then
                last item

            else
                middle item
    in
    List.indexedMap (mapItem (List.length items - 1)) items


mapML : ( a -> b, a -> b ) -> List a -> List b
mapML ( middle, last ) items =
    let
        mapItem nrOfItems index item =
            if index == nrOfItems then
                last item

            else
                middle item
    in
    List.indexedMap (mapItem (List.length items - 1)) items
