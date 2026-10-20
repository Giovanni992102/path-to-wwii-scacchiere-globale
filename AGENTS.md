# Agent Execution Rules & Boundaries

## Scope Constraint (Strict)
- Modifica esclusivamente i file esplicitamente citati nel prompt o direttamente responsabili del bug/feature.
- Divieto assoluto di eseguire refactoring stilistico o architettonico su file adiacenti non richiesti.
- Se una modifica richiede il tocco di piu' di 3 file non previsti, FERMATI e chiedi conferma prima di procedere.

## Anti-Wandering & Execution Protocol
1. **NO over-planning**: limita l'analisi preliminare a un massimo di 3 punti elenco prima di invocare il primo tool o modificare codice.
2. **Diff minimali**: non riscrivere file interi. Usa modifiche mirate e atomiche.
3. **Zero dipendenze non autorizzate**: nessuna introduzione di nuove librerie o dipendenze senza esplicita autorizzazione dell'utente.
4. **Verifica immediata**: ogni azione sul file system deve essere seguita immediatamente da una verifica di compilazione o test.

## Atomic Step & Feedback Loop (Finite State Machine)
Per evitare deviazioni in task complessi, l'agente segue rigorosamente questa macchina a stati finiti:

- **Step 1: Ispezione mirata (Read-Only)**
  - L'agente individua la linea esatta o la funzione responsabile.
  - *Verifica*: l'output della console mostra solo il traceback o il blocco di codice incriminato, senza proposte di riscrittura architetturale.
- **Step 2: Patch chirurgica (Write)**
  - L'agente applica la diff minima indispensabile per superare l'errore o aggiungere il campo richiesto.
  - *Verifica*: il diff generato mostra modifiche localizzate all'interno di una singola funzione o componente, senza modifiche collaterali di formattazione al resto del file.
- **Step 3: Validazione automatica (Test/Run)**
  - L'agente lancia il comando di test/build specifico (es. `npm run build`, `scripts/verifyWatertightAllBorders.ps1`, ecc.) prima di dichiarare il task concluso.
  - *Verifica*: exit code 0 nel terminale integrato. Se il test fallisce, l'agente ha il vincolo di correggere solo la patch appena inserita, non di inventare un'architettura alternativa.

## Gestione del Contesto e Prevenzione Rumore
- **Pulisci il contesto dopo ogni feature**: non riutilizzare la stessa sessione di chat dopo aver chiuso un task importante. La presenza di vecchi stack trace e discussioni pregresse nel context window spinge l'agente a considerare rilevanti file e log ormai superati.
- **Usa `/reset` o avvia un nuovo thread**: mantieni ogni sessione focalizzata su una singola unità di lavoro per prevenire allucinazioni e regressioni.

## Regola Obbligatoria Modifiche GeoJSON e Confini Storici (geojsonskill.md)
- Per qualsiasi modifica, adattamento, taglio, divisione o unione di confini di province o entità GeoJSON storiche, l'agente DEVE seguire rigorosamente i principi e i pattern definiti in `geojsonskill.md` (`historical-geojson-border-aligner`).
- Divieto assoluto di stimare o inventare coordinate a mano nel testo: usare split-and-merge topologico deterministico (cut lines prolungate, waypoints verificati, fiumi/OSM, snap, split e unary_union con validazione d'area e watertight).
