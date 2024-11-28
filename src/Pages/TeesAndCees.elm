module Pages.TeesAndCees exposing (..)

import Browser.Navigation as Nav
import Domain.Event exposing (..)
import Html.Styled as Html exposing (Html)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Lib.Effect as Effect exposing (Effect)
import Markdown
import Shared exposing (Device(..))
import Style


type alias Model =
    String


init : Model
init =
    """# Algemene Voorwaarden

## 1. Inleiding

Welkom bij Pequivents (de "Website"). Deze Algemene Voorwaarden zijn van toepassing op uw gebruik van de Website en de aankoop van tickets via de Website. Door toegang te krijgen tot of gebruik te maken van de Website, gaat u akkoord met deze Voorwaarden. Als u niet akkoord gaat met deze Voorwaarden, mag u de Website niet gebruiken.

## 2. Definities

- **"Wij," "Ons," "Onze"** verwijst naar Cook & Taste, de eigenaar en exploitant van de Website.
- **"U," "Uw"** verwijst naar de persoon of entiteit die toegang heeft tot of gebruik maakt van de Website.
- **"Evenement"** verwijst naar het evenement waarvoor tickets worden verkocht via de Website.
- **"Ticket"** verwijst naar de licentie om een Evenement bij te wonen, gekocht via de Website.

## 3. Gebruik van de Website

### 3.1 Geschiktheid

Door gebruik te maken van de Website, verklaart u dat u ten minste 18 jaar oud bent of de toestemming van een wettelijke voogd heeft.

### 3.2 Account Aanmaken

Om tickets te kopen, moet u mogelijk een account aanmaken op de Website. U stemt ermee in om nauwkeurige en volledige informatie te verstrekken tijdens de registratie en om uw accountinformatie up-to-date te houden.

### 3.3 Verboden Activiteiten

U stemt ermee in de Website niet te gebruiken voor enig onwettig doel of op een manier die ons, andere gebruikers of de Evenementorganisatoren zou kunnen schaden. Dit omvat, maar is niet beperkt tot, het doorverkopen van tickets, het gebruik van bots om tickets te kopen, of het deelnemen aan frauduleuze activiteiten.

## 4. Ticket Aankoop

### 4.1 Prijzen en Beschikbaarheid

Ticketprijzen zijn zoals vermeld op de Website. We behouden ons het recht voor om prijzen op elk moment zonder voorafgaande kennisgeving te wijzigen. Tickets zijn onder voorbehoud van beschikbaarheid, en we garanderen niet dat tickets op elk moment beschikbaar zullen zijn voor aankoop.

### 4.2 Betaling

Alle ticketaankopen moeten volledig worden betaald op het moment van aankoop. We accepteren betaalmethoden zoals vermeld op de Website. Door betalingsinformatie te verstrekken, verklaart en garandeert u dat u wettelijk recht hebt om de betaalmethode te gebruiken.

### 4.3 Orderbevestiging

Zodra uw bestelling succesvol is geplaatst, ontvangt u een orderbevestiging via e-mail. Controleer uw spam- of ongewenste e-mailmap als u de bevestiging niet ontvangt.

### 4.4 Ticketlevering

Tickets worden elektronisch geleverd naar het e-mailadres dat tijdens de aankoop is opgegeven of beschikbaar gesteld voor download in uw accountdashboard.

## 5. Restituties en Ruilingen

### 5.1 Geen Restituties

Alle ticketverkopen zijn definitief, en we bieden geen restituties of ruilingen aan, tenzij het Evenement wordt geannuleerd, uitgesteld of verplaatst door de Evenementorganisator.

### 5.2 Annulering van het Evenement

In geval van annulering, uitstel, of significante wijziging van het Evenement, zullen we proberen u zo snel mogelijk op de hoogte te stellen. Restituties of ruilingen voor geannuleerde of verplaatste Evenementen worden aangeboden in overeenstemming met het beleid van de Evenementorganisator.

## 6. Toegang tot het Evenement

### 6.1 Toelatingsvereisten

U moet een geldig ticket tonen om toegang te krijgen tot het Evenement. De Evenementorganisator behoudt zich het recht voor om elke persoon zonder restitutie de toegang te weigeren.

### 6.2 Gedrag op het Evenement

U stemt ermee in om alle regels en voorschriften van het Evenement na te leven, inclusief die met betrekking tot gedrag, veiligheid en beveiliging. Het niet naleven van deze regels kan resulteren in uw verwijdering van het Evenement zonder restitutie.

## 7. Intellectueel Eigendom

### 7.1 Website Inhoud

Alle inhoud op de Website, inclusief tekst, afbeeldingen, logo's en afbeeldingen, is eigendom van Cook & Taste of haar licentiegevers en is beschermd door intellectuele eigendomswetten.

### 7.2 Beperkte Licentie

U krijgt een beperkte, niet-exclusieve, niet-overdraagbare licentie om toegang te krijgen tot en gebruik te maken van de Website voor persoonlijke, niet-commerciële doeleinden.

## 8. Afwijzing van Garanties

De Website en alle via de Website verkochte tickets worden geleverd "zoals ze zijn" en "zoals beschikbaar" zonder enige vorm van garanties, expliciet of impliciet. We garanderen niet dat de Website foutloos, veilig of vrij van virussen zal zijn.

## 9. Beperking van Aansprakelijkheid

Voor zover maximaal toegestaan door de wet, zullen Cook & Taste en haar gelieerde ondernemingen niet aansprakelijk zijn voor enige indirecte, incidentele, speciale, gevolg- of bestraffende schade voortvloeiend uit of gerelateerd aan uw gebruik van de Website of uw deelname aan een Evenement.

## 10. Vrijwaring

U stemt ermee in Cook & Taste en haar gelieerde ondernemingen te vrijwaren en schadeloos te stellen van enige claims, verliezen, schade, aansprakelijkheden, inclusief juridische kosten, voortvloeiend uit uw gebruik van de Website of schending van deze Voorwaarden.

## 11. Toepasselijk Recht

Deze Voorwaarden en eventuele geschillen voortvloeiend uit uw gebruik van de Website worden beheerst door en geïnterpreteerd in overeenstemming met de wetten van de europese unie, zonder rekening te houden met conflicten van rechtsprincipes.

## 12. Wijzigingen in de Voorwaarden

We behouden ons het recht voor om deze Voorwaarden op elk moment te wijzigen. Wijzigingen worden onmiddellijk van kracht na plaatsing op de Website. Uw voortgezet gebruik van de Website na plaatsing van wijzigingen houdt in dat u akkoord gaat met de gewijzigde Voorwaarden.

## 13. Contactinformatie

Als u vragen heeft over deze Voorwaarden, kunt u contact met ons opnemen via: kilfour@gmail.com

Cook & Taste BV
Hemelshoek 235 B-2590 Berlaar (Belgium)
BTW BE 0800.315.029
Tel +32 3 366 21 00 
GSM +32 498 10 38 88 
"""


type Msg
    = Back


update : Msg -> Shared.Model -> Model -> ( Model, Effect Shared.Msg Msg )
update msg shared model =
    case msg of
        Back ->
            ( model
            , Effect.Cmd <| Nav.back shared.navKey 1
            )


view : Shared.Model -> Model -> Html Msg
view _ model =
    Html.div []
        [ Html.styled Html.div Style.container [] <|
            [ Html.styled Html.a [ Style.hyperLink ] [ onClick Back ] [ Html.text "Terug" ]
            , Html.fromUnstyled <| Markdown.toHtml [] model
            ]
        ]
