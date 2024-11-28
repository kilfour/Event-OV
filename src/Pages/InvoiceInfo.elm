module Pages.InvoiceInfo exposing (..)

import Api.Helpers.ObjectId exposing (Id)
import Api.SaveInvoiceInfo as SaveInvoiceInfo
import Css
import Domain.Event exposing (..)
import Html.Styled as Html exposing (Html)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Http
import Lib.Effect as Effect exposing (Effect)
import Lib.ViewHelpers as UI
import Pages.ViewParts.Banner as Banner
import Pages.ViewParts.BottomFixedButton as BottomFixedButton
import Pages.ViewParts.HeaderAndButton as HeaderAndButton
import Shared exposing (Device(..))
import Style
import UI.DivTable as DivTable


type alias Model =
    { companyName : String
    , companyNameExists : Bool
    , vatNumber : String
    , vatNumberExists : Bool
    , address : String
    , addressExists : Bool
    , infoSaved : Bool
    }


init : Model
init =
    { companyName = ""
    , companyNameExists = True
    , vatNumber = ""
    , vatNumberExists = True
    , address = ""
    , addressExists = True
    , infoSaved = False
    }


type Msg
    = UpdateCompanyName String
    | UpdateAddress String
    | UpdateVatNumber String
    | SaveInfo
    | InvoiceInfoSaved (Result Http.Error Id)


update : Msg -> Shared.Model -> Model -> ( Model, Effect Shared.Msg Msg )
update msg shared model =
    case msg of
        UpdateCompanyName str ->
            ( { model | companyName = str, companyNameExists = not <| String.isEmpty str }
            , Effect.None
            )

        UpdateAddress str ->
            ( { model | address = str, addressExists = not <| String.isEmpty str }
            , Effect.None
            )

        UpdateVatNumber str ->
            ( { model | vatNumber = str, vatNumberExists = not <| String.isEmpty str }
            , Effect.None
            )

        SaveInfo ->
            let
                updatedModel =
                    { model
                        | companyNameExists = not <| String.isEmpty model.companyName
                        , addressExists = not <| String.isEmpty model.address
                        , vatNumberExists = not <| String.isEmpty model.vatNumber
                    }

                isValid =
                    updatedModel.companyNameExists
                        && updatedModel.addressExists
                        && updatedModel.vatNumberExists

                effect =
                    if isValid then
                        let
                            info =
                                { orderId = "TODO"
                                , companyName = model.companyName
                                , vatNumber = model.vatNumber
                                , address = model.address
                                }
                        in
                        Effect.Cmd <|
                            SaveInvoiceInfo.dispatch shared.baseApiUrl info InvoiceInfoSaved

                    else
                        Effect.None
            in
            ( updatedModel
            , effect
            )

        InvoiceInfoSaved (Ok _) ->
            ( { model | infoSaved = True }, Effect.none )

        InvoiceInfoSaved (Err err) ->
            ( model, Effect.Shared <| Shared.Error err )


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

        maybeTopButton =
            case shared.device of
                Phone ->
                    Html.text "Fakturatie Gegevens"

                Desktop ->
                    HeaderAndButton.view "Fakturatie Gegevens" SaveInfo "Opslaan"

        maybeBottomButton =
            case shared.device of
                Phone ->
                    BottomFixedButton.view SaveInfo "Opslaan"

                Desktop ->
                    Html.text ""

        formTableStyle =
            DivTable.emptyStyle
                |> DivTable.customizeTableStyle [ Css.marginTop (Css.em 0.25) ]
                |> DivTable.customizeCellStyle [ Css.padding2 (Css.em 0.375) (Css.em 0.5) ]

        renderInput labelText val action pred validationMessage =
            [ Html.styled Html.div Style.inputLabelContainer [] <|
                [ Html.styled Html.input Style.input [ value val, required True, onInput action ] []
                , Html.styled Html.label Style.label [] [ Html.text labelText ]
                ]
            , UI.showIfNot pred <| Html.styled Html.div Style.validation [] [ Html.text validationMessage ]
            ]

        renderTextArea labelText val action pred validationMessage =
            [ Html.styled Html.div Style.inputLabelContainer [] <|
                [ Html.styled Html.textarea Style.input [ value val, required True, onInput action, rows 4 ] []
                , Html.styled Html.label Style.label [] [ Html.text labelText ]
                ]
            , UI.showIfNot pred <| Html.styled Html.div Style.validation [] [ Html.text validationMessage ]
            ]

        infoForm =
            let
                companyNameInput =
                    renderInput "Bedrijfsnaam" model.companyName UpdateCompanyName model.companyNameExists "Bedrijfsnaam is verplicht."

                addressInput =
                    renderTextArea "Adres" model.address UpdateAddress model.addressExists "Adres is verplicht."

                vatNumberInput =
                    renderInput "BTW Nummer" model.vatNumber UpdateVatNumber model.vatNumberExists "BTW Nummer is verplicht."
            in
            DivTable.renderBody formTableStyle [ [ companyNameInput ], [ vatNumberInput ], [ addressInput ] ]

        ticketLink =
            Html.styled Html.a [ Style.hyperLink ] [ href "/payment-success" ] [ Html.text "Terug naar tickets." ]
    in
    if model.infoSaved then
        Html.div []
            [ Banner.view shared.device
            , Html.styled Html.div Style.container [] <|
                [ Html.styled Html.h1 (Style.pageHeader ++ [ Css.marginTop (Css.em 0.3) ]) [] [ Html.text evt.name ]
                , Html.styled Html.div [ Css.paddingLeft (Css.em 1) ] [] <|
                    [ Html.text "Uw gegevens werden opgeslagen. Uw ontvangt binnenkort uw factuur via email." ]
                , ticketLink
                ]
            ]

    else
        Html.div []
            [ Banner.view shared.device
            , Html.styled Html.div Style.container [] <|
                [ Html.styled Html.h1 (Style.pageHeader ++ [ Css.marginTop (Css.em 0.3) ]) [] [ Html.text evt.name ]
                , maybeTopButton
                , infoForm
                , ticketLink
                , maybeMargin
                , maybeBottomButton
                ]
            ]
