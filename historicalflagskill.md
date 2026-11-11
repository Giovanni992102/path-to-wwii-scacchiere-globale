# Historical Flag Resolution & Verification Protocol (`historicalflagskill.md`)

historical-flag-resolver
Risolve, verifica cronologicamente ed estrae le bandiere storiche e le insegne di stato corrette per qualsiasi entità geopolitica a una data esatta (YYYY-MM-DD), interrogando fonti aperte autorevoli (Wikimedia Commons, Wikidata, FOTW) con vincoli temporali rigorosi contro anacronismi e allucinazioni araldiche.

## Instructions
Fornire in modo deterministico e verificabile l'asset vettoriale (SVG) o raster ad alta risoluzione (PNG) della bandiera corretta per qualsiasi entità statale, protettorato, governo d'occupazione o fazione belligerante a una data precisa $T$ ($T = \text{YYYY-MM-DD}$), garantendo che:
1. La bandiera sia formalmente o *de facto* in vigore alla data $T$ (né il giorno prima dell'adozione legale, né il giorno dopo l'abrogazione).
2. Sia selezionata la variante corretta tra **Bandiera di Stato / Guerra** (con stemma/aquila/fascio/stella) e **Bandiera Civile / Mercantile** (pulita), in base alla convenzione cartografica adottata.
3. L'URL dell'asset provenga direttamente da repository aperti e stabili (**Wikimedia Commons** / **Wikidata**).

## When to Use
- Quando l'utente richiede la bandiera storica di uno stato o territorio per una data specifica della timeline.
- Quando una nuova tappa storica della mappa dinamica richiede l'aggiornamento degli asset visivi.
- Prima di implementare o aggiornare file SVG o componenti araldici nella directory `src/data/flags/` o `src/data/historicalFlags.tsx`.

---

## Gerarchia delle Fonti Autorevoli
Non accettare mai asset grafici da blog generici, social network o mockup non verificati. Seguire tassativamente questa gerarchia di verifica:
1. **Livello 1 — Wikidata + Wikimedia Commons (Machine-Readable):**
   * Proprietà Wikidata dell'entità storica: `P41` (immagine della bandiera) o `P163` (bandiera).
   * Qualificatori temporali obbligatori: `P580` (data di inizio / *start time*) e `P582` (data di fine / *end time*).
   * File SVG sorgente hostato su `commons.wikimedia.org`.
2. **Livello 2 — Flags of the World (FOTW - crwflags.com):**
   * Il più autorevole archivio mondiale per l'analisi legislativa dei decreti di adozione, proporzioni di pezza, varianti d'uso civile/militare e date di transizione *de facto*.
3. **Livello 3 — Gazzette Ufficiali e Costituzioni d'Epoca:**
   * Testi primari (es. *Gazzetta Ufficiale del Regno d'Italia*, *Reichsgesetzblatt*, *Vedomosti Verkhovnogo Soveta*).

---

## Protocollo di Risoluzione Temporale (Anti-Anacronismo)

Per ogni entità politica $E$ alla data $T$:

### Regola A: Il Principio dell'Entrata in Vigore Reale
* La proclamazione formale o il voto parlamentare non equivalgono all'adozione grafica, salvo specifica retroattività. Verificare la data di **pubblicazione in gazzetta** o di primo innalzamento ufficiale.
* *Esempio critico:* Un referendum abolisce la monarchia il 2-3 giugno 1946 (Italia); il tricolore privo di stemma sabaudo diviene ufficiale solo con il Decreto Presidenziale del 19 giugno 1946. Fino al 18 giugno 1946, la bandiera formale mantiene lo stemma sabaudo.

### Regola B: Il Paradosso dei Regimi di Transizione
* **Stati comunisti nascenti:** Non applicare simboli sovietici/socialisti prima che siano ratificati dalla Costituzione della Repubblica Popolare.
  * *Romania:* Regno fino al 30 dicembre 1947 (tricolore monarchico con corona); prima bandiera repubblicana con stemma solo a gennaio 1948.
  * *Ungheria:* Seconda Repubblica dal 1° febbraio 1946 (usa lo stemma di Kossuth); lo stemma comunista Rákosi compare solo il 20 agosto 1949.
  * *Corea del Nord:* Usa la bandiera tradizionale *Taegukgi* fino al 10 luglio 1948; la bandiera a banda rossa e stella socialista è istituita solo nel luglio/settembre 1948.
* **Governi fantoccio e occupazioni militari:**
  * Istituzioni di occupazione provvisoria prive di sovranità nazionale non usano la bandiera civile ordinaria del Paese occupante né quella del Paese soppresso (es. la Germania occupata tra il 1945 e il 1949 utilizza il gagliardetto marittimo *C-Pennant / C-Doppelstander* per evitare simboli nazisti o l'uso anticipato delle bandiere di Bonn/Berlino Est).

### Regola C: Standard Stato vs Civile
* Nei layer geopolitici di una mappa storica dinamica, la convenzione primaria per distinguere mutamenti di regime politico (es. monarchia vs repubblica, fascismo vs democrazia) è l'uso della **Bandiera di Stato (State Flag / War Flag)**.
* Se la bandiera nazionale civile non muta (es. Polonia comunista: bicolore bianco-rosso immutato), segnalare la variazione araldica di stato (l'Aquila polacca perde la corona nel 1944).

---

## Pipeline Operativa di Ricerca ed Estrazione (Step-by-Step)
```
[Input: Entità E, Data T]
       │
       ▼
[Passo 1: Identificazione Entità Giuridica Storica]
Identifica l'esatta entità statale valida a data T (es. "Regno d'Italia", non genericamente "Italia").
       │
       ▼
[Passo 2: Query di Verifica Temporale su Wikidata / Commons]
Cerca su Wikimedia Commons con stringa canonica:
"Flag of [Country/Entity] ([StartYear]-[EndYear])"
Verifica i metadati del file: Data di adozione <= T <= Data di cessazione.
       │
       ▼
[Passo 3: Risoluzione di Conflitti / Transizioni]
La data T cade in un mese di transizione costituzionale?
 ├─ SÌ: Consulta FOTW / Gazzetta per data esatta del decreto o cambio effettivo.
 └─ NO: Conferma l'asset storicamente consolidato.
       │
       ▼
[Passo 4: Estrazione URL Vettoriale Sicuro]
Recupera l'URL diretto Wikimedia Commons:
Formato SVG: https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_[...].svg
       │
       ▼
[Passo 5: Validazione di Coerenza]
Verifica visiva: ci sono anacronismi evidenti? (es. 50 stelle su bandiera USA pre-1959, corone sabaude post-1946, stemmi comunisti ante-costituzione).
       │
       ▼
[Output: Oggetto JSON strutturato]
```

---

## Schema Dati di Output (JSON per Engine Cartografico)
```json
{
  "entity_id": "IT_1947",
  "common_name": "Repubblica Italiana",
  "historical_name_at_date": "Repubblica Italiana",
  "query_date": "1947-09-30",
  "flag_status": "official",
  "flag_category": "state_and_national",
  "validity_window": {
    "valid_from": "1946-06-19",
    "valid_to": "2003-01-16"
  },
  "asset": {
    "file_name": "Flag_of_Italy.svg",
    "source_repository": "Wikimedia Commons",
    "direct_svg_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_Italy.svg",
    "commons_page": "https://commons.wikimedia.org/wiki/File:Flag_of_Italy.svg",
    "license": "Public Domain"
  },
  "historical_rationale": "Tricolore repubblicano a bande verticali privo dello stemma sabaudo, introdotto con Decreto Presidenziale del 19 giugno 1946 a seguito dell'esito del referendum del 2 giugno.",
  "flags_of_the_world_ref": "https://www.crwflags.com/fotw/flags/it-hist.html"
}
```

---

## Guardrail Negativi e Vincoli di Tolleranza Zero
1. **Divieto di Bandiere Generiche Moderne**: È vietato associare a date passate la bandiera contemporanea di uno stato se vi sono state modifiche di stemmi, proporzioni, tonalità di colore o simboli (es. mai usare la bandiera della Repubblica Popolare Cinese prima del 1° ottobre 1949; mai usare la bandiera russa moderna per il periodo sovietico).
2. **Divieto di SVG da Render Utopici / Fantastorici**: Assicurarsi che il file Commons non appartenga a categorie di Alternate History o User Concepts. Filtrare solo file categorizzati sotto Historical flags o legati a item Wikidata ufficiali.
3. **Controllo del Conteggio delle Stelle/Cantoni**: Per bandiere a geometria incrementale (es. Stati Uniti d'America, Brasile), il numero di stelle deve corrispondere al numero di stati legalmente ammessi alla data esatta $T$ (per gli USA le stelle aumentano sempre il 4 luglio successivo all'ammissione formale di un nuovo stato federale).
