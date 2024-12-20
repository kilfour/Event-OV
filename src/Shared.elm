module Shared exposing (..)

import Api.CreateCheckOut as CreateCheckOut
import Api.Helpers.ObjectId exposing (Id)
import Api.OrderInfoEntered as OrderInfoEntered
import Browser.Dom
import Browser.Events
import Browser.Navigation as Nav
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Http
import Task


type Device
    = Phone
    | Desktop


getDevice : Int -> Int -> Device
getDevice width height =
    if width < height then
        Phone

    else
        Desktop


type alias Model =
    { baseApiUrl : String
    , navKey : Nav.Key
    , device : Device
    , error : Maybe Http.Error
    , currentOrderAmount : Float
    , paid : Bool
    }


init : String -> Nav.Key -> ( Model, Cmd Msg )
init baseApiUrl navKey =
    ( { baseApiUrl = baseApiUrl
      , navKey = navKey
      , device = Desktop
      , error = Nothing
      , currentOrderAmount = 0
      , paid = False
      }
    , Cmd.batch [ Task.perform GotViewport Browser.Dom.getViewport ]
    )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onResize (\w h -> OnResize w h)


type Msg
    = GotViewport Browser.Dom.Viewport
    | OnResize Int Int
    | Error Http.Error
    | OrderInfoEntered OrderInfoEntered.OrderInfo Float
    | OrderInfoEnteredSaved (Result Http.Error Id)
    | CheckOutCreated (Result Http.Error String)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotViewport viewport ->
            ( { model | device = getDevice (round viewport.viewport.width) (round viewport.viewport.height) }, Cmd.none )

        OnResize w h ->
            ( { model | device = getDevice w h }, Cmd.none )

        Error err ->
            ( { model | error = Just err }, Cmd.none )

        OrderInfoEntered evt total ->
            ( { model | currentOrderAmount = total }
            , OrderInfoEntered.dispatch model.baseApiUrl evt OrderInfoEnteredSaved
            )

        OrderInfoEnteredSaved (Ok objectId) ->
            ( model
            , CreateCheckOut.dispatch model.baseApiUrl objectId.id model.currentOrderAmount CheckOutCreated
            )

        OrderInfoEnteredSaved (Err error) ->
            ( { model | error = Just error }, Cmd.none )

        CheckOutCreated (Ok url) ->
            ( model, Nav.load url )

        CheckOutCreated (Err err) ->
            ( { model | error = Just err }, Cmd.none )
