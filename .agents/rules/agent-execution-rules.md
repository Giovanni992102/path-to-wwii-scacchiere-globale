# Agent Execution Rules & Boundaries

## Scope Constraint (Strict)
- Modifica esclusivamente i file esplicitamente citati nel prompt o direttamente responsabili del bug/feature.
- Divieto assoluto di eseguire refactoring stilistico o architettonico su file adiacenti non richiesti.
- Se una modifica richiede il tocco di piu' di 3 file non previsti, FERMATI e chiedi conferma prima di procedere.

## Anti-Wandering & Execution Protocol
1. **NO over-planning**: limita l'analisi preliminare a un massimo di 3 punti elenco prima di invocare il primo tool o modificare codice.
2. **Diff minimali**: non riscrivere file interi. Usa modifiche mirate e atomiche.
3. **Nessuna introduzione di nuove librerie o dipendenze** senza esplicita autorizzazione dell'utente.
4. **Ogni azione sul file system deve essere seguita immediatamente da una verifica di compilazione o test**.

## Pattern "Atomic Step & Feedback Loop"
Macchina a stati finiti obbligatoria:
1. **Step 1: Ispezione mirata (Read-Only)**: individua la linea esatta o la funzione responsabile. Nessuna proposta di riscrittura architetturale.
2. **Step 2: Patch chirurgica (Write)**: applica la diff minima indispensabile per superare l'errore o aggiungere il campo. Modifiche localizzate e chirurgiche.
3. **Step 3: Validazione automatica (Test/Run)**: lancia il comando di test specifico prima di dichiarare il task concluso. Verifica exit code 0 nel terminale. Se fallisce, correggi solo la patch appena inserita.
