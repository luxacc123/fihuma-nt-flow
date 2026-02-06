# Project: Fihuma NT QR Flow

## Doel
Een simpele, snelle onepage webflow voor QR-flyer leads.
Gebruikers beantwoorden enkele isolatie/subsidie-vragen en laten contactgegevens achter.
Data wordt opgeslagen in Supabase tabel `fihuma_nt_leads`.

## Stack
- Simple web app / onepage
- Geen zware frameworks tenzij echt nodig
- Mobile-first
- Supabase voor data-opslag
- Geen auth nodig
- Geen dashboard nodig (alleen insert)

## UX
- Modern, clean
- Weinig tekst
- Grote knoppen
- Stap-voor-stap vragen
- Conversiegericht
- Nederlands taalgebruik

## Design kleuren
- Donkergroen: #45595a
- Groen: #67ad59
- Blauw: #1d3259
- Licht / rustig achtergrondgebruik

## Form gedrag
- Stap-flow vragen
- Multiple choice waar mogelijk
- Zo min mogelijk vrije tekst
- Contactgegevens aan het einde
- Validatie op telefoon en email

## Data
Insert naar Supabase:
table: fihuma_nt_leads

Geen updates nodig.
Geen deletes nodig.
Alleen inserts.

## Niet doen
- Geen complexe architectuur
- Geen auth systeem
- Geen CMS
- Geen admin panel
- Geen PDF generatie
- Geen subsidie-berekeningen

Hou alles simpel en snel deploybaar.
