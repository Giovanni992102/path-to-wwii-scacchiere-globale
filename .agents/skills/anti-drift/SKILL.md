---
name: anti-drift
trigger: manual_or_token_threshold
description: Blocca l'esecuzione se l'agente genera diff superiori a 80-100 righe o tenta refactoring non richiesti su task puntuali.
---

# Anti-Drift Execution Protocol & Boundary Guard

Questa skill si attiva come supervisore e guardrail imperativo ogni volta che un agente o subagente opera sul codice di questo progetto.

## Regole di Contenimento Rigoroso

1. **Soglia di Complessità Diff**:
   - Conta mentalmente le righe modificate prima dell'applicazione del diff.
   - Se `loc_modificate > 80`, interrompi il tool call ed esponi all'utente un piano di scomposizione in 2 o più sotto-fasi distinte.
   - Chiedi: *"Questa modifica impatta N righe. Vuoi che proceda a step separati?"*

2. **Divieto di Over-Planning**:
   - Limita l'analisi preliminare a un massimo di **3 punti elenco sintetici** prima di eseguire il primo tool call o ispezione.

3. **Pattern a 3 Stati Finiti**:
   - **Step 1: Ispezione (Read-Only)** -> Identifica solo la riga o funzione precisa.
   - **Step 2: Patch (Write)** -> Applica la diff atomica minima indispensabile.
   - **Step 3: Validazione (Run/Test)** -> Esegui il test/build di verifica (exit code 0).

4. **Zero Refactoring Collaterale**:
   - Non modificare formattazione, spaziature o logica di file adiacenti non direttamente responsabili del task.
