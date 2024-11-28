module Pages.Payment exposing (..)

import Api.Helpers.ObjectId exposing (Id)
import Api.OrderConfirmed as OrderConfirmed
import Browser.Navigation as Nav
import Css
import Domain.Event exposing (..)
import Html.Styled as Html exposing (Html)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Http
import Lib.Effect as Effect exposing (Effect)
import Lib.ViewHelpers as UI
import Pages.ViewParts.Banner as Banner
import Shared exposing (Device(..), Msg(..))
import Style


type alias Model =
    { orderId : String }


init : Shared.Model -> String -> ( Model, Cmd Msg )
init shared orderId =
    ( { orderId = orderId }
    , OrderConfirmed.dispatch shared.baseApiUrl orderId OrderConfirmed
    )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


type Msg
    = NoOp
    | OrderConfirmed (Result Http.Error Id)


update : Msg -> Shared.Model -> Model -> ( Model, Effect Shared.Msg Msg )
update msg shared model =
    case msg of
        NoOp ->
            ( model
            , Effect.None
            )

        OrderConfirmed (Ok _) ->
            ( model, Effect.Cmd <| Nav.pushUrl shared.navKey ("/payment-success/" ++ model.orderId) )

        OrderConfirmed (Err err) ->
            ( model, Effect.none )


view : Shared.Model -> Model -> Html Msg
view shared model =
    let
        evt =
            theEvent

        maybeMargin =
            case shared.device of
                Phone ->
                    Html.styled Html.div [ Css.marginBottom (Css.em 6) ] [] [ Html.text "" ]

                Desktop ->
                    Html.text ""
    in
    Html.div [] <|
        [ Banner.view shared.device
        , Html.styled Html.div Style.container [] <|
            [ Html.styled Html.h1 Style.pageHeader [] [ Html.text evt.name ]
            , Html.text "Verificatie in behandeling."
            , maybeMargin
            ]
        ]
