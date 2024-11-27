module Pages.OrderTickets exposing (..)

import Api.GetFreeTicketsAvailable as GetFreeTicketsAvailable
import Css
import Domain.Event exposing (..)
import Email
import Html.Styled as Html exposing (Html)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Http
import Lib.Effect as Effect exposing (Effect)
import Lib.ViewHelpers as UI
import Pages.ViewParts.Banner as Banner
import Pages.ViewParts.BottomFixedButton as BottomFixedButton
import Pages.ViewParts.HeaderAndButton as HeaderAndButton
import Round
import Shared exposing (Device(..))
import Style
import UI.DivTable as DivTable


type alias TicketInfo =
    { id : String
    , description : String
    , price : Float
    , numberOfTickets : Int
    }


type alias Model =
    { christianName : String
    , christianNameExists : Bool
    , lastName : String
    , lastNameExists : Bool
    , email : String
    , emailExists : Bool
    , emailIsValid : Bool
    , confirmEmail : String
    , confirmEmailExists : Bool
    , emailMatches : Bool
    , memberTicketInfo : TicketInfo
    , nonMemberTicketInfo : TicketInfo
    , freeTicketInfo : TicketInfo
    , freeTicketCode : String
    , freeTicketCodeMatches : Bool
    , hasTickets : Bool
    , freeTicketsAvailable : Int
    }



-- init : Shared.Model -> ( Model, Cmd Msg )
-- init shared =
--     ( { christianName = "a@a.aa"
--       , christianNameExists = True
--       , lastName = "a@a.aa"
--       , lastNameExists = True
--       , email = "a@a.aa"
--       , emailExists = True
--       , emailIsValid = True
--       , confirmEmail = "a@a.aa"
--       , confirmEmailExists = True
--       , emailMatches = True
--       , memberTicketInfo = { id = "LID", description = "Leden", price = 1, numberOfTickets = 0 }
--       , nonMemberTicketInfo = { id = "N-LID", description = "Niet-Leden", price = 60, numberOfTickets = 0 }
--       , freeTicketInfo = { id = "GR", description = "Gratis", price = 0, numberOfTickets = 0 }
--       , freeTicketCode = "MMOKT0724"
--       , freeTicketCodeMatches = True
--       , hasTickets = True
--       , freeTicketsAvailable = 0
--       }
--     , GetFreeTicketsAvailable.dispatch shared.baseApiUrl FreeTicketsAvailableReceived
--     )


init : Shared.Model -> ( Model, Cmd Msg )
init shared =
    ( { christianName = ""
      , christianNameExists = True
      , lastName = ""
      , lastNameExists = True
      , email = ""
      , emailExists = True
      , emailIsValid = True
      , confirmEmail = ""
      , confirmEmailExists = True
      , emailMatches = True
      , memberTicketInfo = { id = "LID", description = "Leden", price = 40, numberOfTickets = 0 }
      , nonMemberTicketInfo = { id = "N-LID", description = "Niet-Leden", price = 60, numberOfTickets = 0 }
      , freeTicketInfo = { id = "GR", description = "Gratis", price = 0, numberOfTickets = 0 }
      , freeTicketCode = ""
      , freeTicketCodeMatches = True
      , hasTickets = True
      , freeTicketsAvailable = 0
      }
    , Cmd.none
    )


totalAmount : Model -> Float
totalAmount model =
    let
        memberTotal =
            toFloat model.memberTicketInfo.numberOfTickets * model.memberTicketInfo.price

        nonMemberTotal =
            toFloat model.nonMemberTicketInfo.numberOfTickets * model.nonMemberTicketInfo.price
    in
    memberTotal + nonMemberTotal


type Msg
    = NoOp
    | FreeTicketsAvailableReceived (Result Http.Error GetFreeTicketsAvailable.Response)
    | UpdateChristianName String
    | UpdateLastName String
    | UpdateEmail String
    | UpdateConfirmEmail String
    | UpdateFreeTicketCode String
    | AddMemberTicket
    | RemoveMemberTicket
    | AddNonMemberTicket
    | RemoveNonMemberTicket
    | AddFreeTicket
    | RemoveFreeTicket
    | GotoPayment


update : Msg -> Shared.Model -> Model -> ( Model, Effect Shared.Msg Msg )
update msg _ model =
    case msg of
        NoOp ->
            ( model
            , Effect.None
            )

        FreeTicketsAvailableReceived (Ok response) ->
            ( { model | freeTicketsAvailable = response.amount }
            , Effect.none
            )

        FreeTicketsAvailableReceived (Err error) ->
            ( model, Effect.Shared <| Shared.Error error )

        UpdateChristianName str ->
            ( { model | christianName = str, christianNameExists = not <| String.isEmpty str }
            , Effect.None
            )

        UpdateLastName str ->
            ( { model | lastName = str, lastNameExists = not <| String.isEmpty str }
            , Effect.None
            )

        UpdateEmail str ->
            ( { model | email = str, emailExists = not <| String.isEmpty str, emailIsValid = True }
            , Effect.None
            )

        UpdateConfirmEmail str ->
            ( { model | confirmEmail = str, confirmEmailExists = not <| String.isEmpty str }
            , Effect.None
            )

        UpdateFreeTicketCode str ->
            ( { model | freeTicketCode = str, freeTicketCodeMatches = not <| String.isEmpty str }
            , Effect.None
            )

        GotoPayment ->
            let
                totalNumberOfTickets =
                    model.memberTicketInfo.numberOfTickets
                        + model.nonMemberTicketInfo.numberOfTickets
                        + model.freeTicketInfo.numberOfTickets

                updatedModel =
                    { model
                        | christianNameExists = not <| String.isEmpty model.christianName
                        , lastNameExists = not <| String.isEmpty model.lastName
                        , emailExists = not <| String.isEmpty model.email
                        , emailIsValid =
                            case Email.fromString model.email of
                                Just _ ->
                                    True

                                Nothing ->
                                    False
                        , confirmEmailExists = not <| String.isEmpty model.confirmEmail
                        , emailMatches = model.email == model.confirmEmail
                        , hasTickets = totalNumberOfTickets > 0
                    }

                isValid =
                    updatedModel.christianNameExists
                        && updatedModel.lastNameExists
                        && updatedModel.emailExists
                        && updatedModel.emailIsValid
                        && updatedModel.confirmEmailExists
                        && updatedModel.emailMatches
                        && updatedModel.hasTickets

                effect =
                    if isValid then
                        Effect.Shared <|
                            Shared.OrderInfoEntered
                                { christianName = model.christianName
                                , lastName = model.lastName
                                , email = model.email
                                , ticketsInfo = [ model.memberTicketInfo, model.nonMemberTicketInfo, model.freeTicketInfo ]
                                }
                                (totalAmount model)

                    else
                        Effect.None
            in
            ( updatedModel
            , effect
            )

        AddMemberTicket ->
            let
                info =
                    model.memberTicketInfo
            in
            ( { model | memberTicketInfo = { info | numberOfTickets = info.numberOfTickets + 1 }, hasTickets = True }
            , Effect.None
            )

        RemoveMemberTicket ->
            let
                info =
                    model.memberTicketInfo
            in
            ( { model | memberTicketInfo = { info | numberOfTickets = Basics.max 0 (info.numberOfTickets - 1) } }
            , Effect.None
            )

        AddNonMemberTicket ->
            let
                info =
                    model.nonMemberTicketInfo
            in
            ( { model | nonMemberTicketInfo = { info | numberOfTickets = info.numberOfTickets + 1 }, hasTickets = True }
            , Effect.None
            )

        RemoveNonMemberTicket ->
            let
                info =
                    model.nonMemberTicketInfo
            in
            ( { model | nonMemberTicketInfo = { info | numberOfTickets = Basics.max 0 (info.numberOfTickets - 1) } }
            , Effect.None
            )

        AddFreeTicket ->
            let
                info =
                    model.freeTicketInfo

                freeTicketCodeMatches =
                    model.freeTicketCode == "MMOKT0724"

                freeTicketMax =
                    Basics.min model.freeTicketsAvailable 2
            in
            if freeTicketCodeMatches then
                ( { model | freeTicketInfo = { info | numberOfTickets = Basics.min freeTicketMax (info.numberOfTickets + 1) }, hasTickets = True }
                , Effect.None
                )

            else
                ( { model | freeTicketCodeMatches = False }
                , Effect.none
                )

        RemoveFreeTicket ->
            let
                info =
                    model.freeTicketInfo
            in
            ( { model | freeTicketInfo = { info | numberOfTickets = Basics.max 0 (info.numberOfTickets - 1) } }
            , Effect.None
            )


view : Shared.Model -> Model -> Html Msg
view shared model =
    let
        evt =
            theEvent

        totalString =
            "€" ++ Round.round 2 (totalAmount model)

        formTableStyle =
            DivTable.emptyStyle
                |> DivTable.customizeTableStyle [ Css.marginTop (Css.em 0.25) ]
                |> DivTable.customizeCellStyle [ Css.padding2 (Css.em 0.375) (Css.em 0.5) ]

        ticketTableStyle =
            DivTable.emptyStyle
                |> DivTable.customizeTableStyle [ Css.paddingLeft (Css.em 0.75) ]
                |> DivTable.customizeCellStyle [ Css.paddingLeft (Css.em 0.5), Css.paddingTop (Css.em 0.25) ]

        dateTimeRow =
            case shared.device of
                Phone ->
                    Html.styled Html.h3 Style.pageHeader [] [ Html.text (dateTimeString evt) ]

                Desktop ->
                    HeaderAndButton.view (dateTimeString evt) GotoPayment "Tickets Aankopen"

        renderInput labelText val action pred validationMessage =
            [ Html.styled Html.div Style.inputLabelContainer [] <|
                [ Html.styled Html.input Style.input [ value val, required True, onInput action ] []
                , Html.styled Html.label Style.label [] [ Html.text labelText ]
                ]
            , UI.showIfNot pred <| Html.styled Html.div Style.validation [] [ Html.text validationMessage ]
            ]

        infoForm =
            let
                christianNameInput =
                    renderInput "Voornaam" model.christianName UpdateChristianName model.christianNameExists "Voornaam is verplicht."

                lastNameInput =
                    renderInput "Achternaam" model.lastName UpdateLastName model.lastNameExists "Achternaam is verplicht."

                emailInput =
                    renderInput "E-mailadres" model.email UpdateEmail (model.emailExists && model.emailIsValid) "Geef een geldig e-mailadres."

                confirmEmailInput =
                    renderInput "E-mail Bevestigen" model.confirmEmail UpdateConfirmEmail (model.confirmEmailExists && model.emailMatches) "E-mailadressen komen niet overeen."
            in
            case shared.device of
                Phone ->
                    DivTable.renderBody formTableStyle
                        [ [ christianNameInput ], [ lastNameInput ], [ emailInput ], [ confirmEmailInput ] ]

                Desktop ->
                    DivTable.renderBody formTableStyle
                        [ [ christianNameInput, lastNameInput ], [ emailInput, confirmEmailInput ] ]

        maybeMargin =
            case shared.device of
                Phone ->
                    Html.styled Html.div [ Css.marginBottom (Css.em 6) ] [] [ Html.text "" ]

                Desktop ->
                    Html.text ""

        maybeBottomButton =
            case shared.device of
                Phone ->
                    BottomFixedButton.view GotoPayment "Tickets Aankopen"

                Desktop ->
                    Html.text ""

        ticketForm ticketInfo add remove =
            [ [ Html.text (ticketInfo.description ++ " - €" ++ Round.round 2 ticketInfo.price) ]
            , [ Html.styled Html.button Style.symbolButton [ onClick <| remove ] [ Html.text "-" ] ]
            , [ Html.styled Html.div [ Css.width (Css.em 1.5), Css.textAlign Css.center ] [] [ Html.text <| String.fromInt ticketInfo.numberOfTickets ] ]
            , [ Html.styled Html.button Style.symbolButton [ onClick <| add ] [ Html.text "+" ] ]
            ]

        maxFreeTickets =
            String.fromInt <| Basics.min model.freeTicketsAvailable 2
    in
    Html.div [] <|
        [ Banner.view shared.device
        , Html.styled Html.div Style.container [] <|
            [ Html.styled Html.h1 Style.pageHeader [] [ Html.text evt.name ]
            , Html.styled Html.h3 Style.pageHeader [] [ Html.text (dateTimeString evt) ]
            , Html.styled Html.h2 (Css.marginBottom (Css.em 0.375) :: Style.pageHeader) [] [ Html.text "Gegevens" ]
            , infoForm
            , Html.styled Html.h2 Style.pageHeader [] [ Html.text "Tickets" ]
            , DivTable.renderBody ticketTableStyle
                [ [ [ Html.text "Totaal: " ]
                  , [ Html.div [] [ Html.text totalString ] ]
                  ]
                ]
            , Html.br [] []
            , UI.showIfNot model.hasTickets <|
                Html.styled Html.div Style.validation [] [ Html.text "Gelieve minstens één ticket te selecteren." ]
            , DivTable.renderBody ticketTableStyle <|
                [ ticketForm model.memberTicketInfo AddMemberTicket RemoveMemberTicket
                , ticketForm model.nonMemberTicketInfo AddNonMemberTicket RemoveNonMemberTicket
                ]
            , UI.showIf (model.freeTicketsAvailable > 0)
                (Html.styled Html.div [ Css.padding2 (Css.em 0.5) Css.zero ] [] [ Html.text <| "Voer uw code in voor gratis tickets (max " ++ maxFreeTickets ++ ")" ])
            , UI.showIf (model.freeTicketsAvailable > 0)
                (DivTable.renderBody ticketTableStyle <|
                    [ [ [ Html.styled Html.div [ Css.paddingRight (Css.em 0.5) ] [] <|
                            renderInput "Code" model.freeTicketCode UpdateFreeTicketCode model.freeTicketCodeMatches "Onbekende code."
                        ]
                      , [ Html.styled Html.button Style.symbolButton [ onClick <| RemoveFreeTicket ] [ Html.text "-" ] ]
                      , [ Html.styled Html.div [ Css.width (Css.em 1.5), Css.textAlign Css.center ] [] [ Html.text <| String.fromInt model.freeTicketInfo.numberOfTickets ] ]
                      , [ Html.styled Html.button Style.symbolButton [ onClick <| AddFreeTicket ] [ Html.text "+" ] ]
                      ]
                    ]
                )
            , UI.showIf (model.freeTicketsAvailable <= 0)
                (Html.styled Html.div [ Css.padding2 (Css.em 0.5) (Css.em 1) ] [] [ Html.text "De tickets met code zijn niet meer beschikbaar." ])
            , maybeMargin
            ]
        ]
