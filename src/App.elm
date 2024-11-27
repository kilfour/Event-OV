module App exposing (..)

import Browser
import Browser.Navigation as Nav
import Css
import Helmsman
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Http exposing (Error(..))
import Json.Decode as Json
import Lib.Effect as Effect
import Lib.ListHelpers exposing (..)
import Routes
import Shared
import Style
import Url exposing (Url)



--------------------------------------------------------------
-- Model
--------------------------------------------------------------


type alias Model =
    { shared : Shared.Model
    , helmsman : Helmsman.Model
    }



--------------------------------------------------------------
-- Main
--------------------------------------------------------------


main : Program String Model Msg
main =
    Browser.application
        { init = init
        , view = \model -> { title = "Events", body = [ toUnstyled (view model) ] }
        , update = update
        , subscriptions =
            \m ->
                Sub.batch
                    [ Sub.map SharedMsg (Shared.subscriptions m.shared)
                    , Sub.map HelmsmanMsg (Helmsman.subscriptions m.helmsman)
                    ]
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }


init : String -> Url -> Nav.Key -> ( Model, Cmd Msg )
init baseApiUrl url key =
    let
        ( shared, sharedCmd ) =
            Shared.init baseApiUrl key

        ( model, helmsmanCmd ) =
            Routes.changeRouteToFromUrl url { shared = shared, helmsman = Helmsman.init }
    in
    ( model
    , Cmd.batch
        [ Cmd.map HelmsmanMsg helmsmanCmd
        , Cmd.map SharedMsg sharedCmd
        ]
    )



--------------------------------------------------------------
-- Update
--------------------------------------------------------------


type Msg
    = SharedMsg Shared.Msg
    | HelmsmanMsg Helmsman.Msg
    | LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url


applyEffect : Effect.Effect Shared.Msg Helmsman.Msg -> Shared.Model -> ( Shared.Model, Cmd Msg )
applyEffect effect model =
    let
        ( sharedMsgList, otherEffect ) =
            Effect.extractShared effect

        ( newModel, cmd ) =
            sharedMsgList
                |> List.foldl
                    (\sharedMsg ( prevModel, prevCmd ) ->
                        let
                            ( nextModel, nextCmd ) =
                                Shared.update sharedMsg prevModel
                        in
                        ( nextModel, nextCmd :: prevCmd )
                    )
                    ( model, [] )
    in
    ( newModel
    , Cmd.batch (Effect.toCmd ( SharedMsg, HelmsmanMsg ) otherEffect :: List.map (Cmd.map SharedMsg) cmd)
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SharedMsg sharedMsg ->
            let
                ( shared, cmd ) =
                    Shared.update sharedMsg model.shared
            in
            ( { model | shared = shared }, Cmd.map SharedMsg cmd )

        HelmsmanMsg helmsmanMsg ->
            let
                ( helmsman, effect ) =
                    Helmsman.update helmsmanMsg model.shared model.helmsman

                ( shared, cmd ) =
                    applyEffect effect model.shared
            in
            ( { model | shared = shared, helmsman = helmsman }, cmd )

        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.shared.navKey (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            let
                ( model_, helmsmanCmd ) =
                    Routes.changeRouteToFromUrl url model
            in
            ( model_, Cmd.map HelmsmanMsg helmsmanCmd )



--------------------------------------------------------------
-- VIEW
--------------------------------------------------------------


parseError : String -> Maybe String
parseError =
    Json.decodeString (Json.field "error" Json.string) >> Result.toMaybe


errorToString : Http.Error -> String
errorToString err =
    case err of
        Timeout ->
            "Timeout exceeded"

        NetworkError ->
            "Network error"

        BadStatus status ->
            "Bad Status" ++ String.fromInt status

        BadBody text ->
            "Unexpected response from api: " ++ text

        BadUrl url ->
            "Malformed url: " ++ url


view : Model -> Html Msg
view model =
    let
        mainFont : List Css.Style
        mainFont =
            let
                fontSize =
                    case model.shared.device of
                        Shared.Phone ->
                            Css.px 16

                        Shared.Desktop ->
                            Css.px 16
            in
            [ Css.fontFamilies Style.theme.fontFamilies
            , Css.fontSize fontSize
            , Css.fontWeight Css.normal
            ]
    in
    case model.shared.error of
        Nothing ->
            styled div mainFont [] [ Html.Styled.map HelmsmanMsg <| Helmsman.view model.shared model.helmsman ]

        Just err ->
            text <| errorToString err
