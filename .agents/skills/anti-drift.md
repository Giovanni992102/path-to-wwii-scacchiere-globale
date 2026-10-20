---
name: anti-drift
trigger: manual_or_token_threshold
description: Blocca l'esecuzione se l'agente genera diff superiori a 100 righe per compiti puntuali.
---

Quando generi una soluzione:
- Conta le righe modificate prima dell'applicazione del diff.
- Se `loc_modificate > 80`, interrompi il tool call ed esponi un piano di scomposizione in 2 o più sotto-fasi distinte.
- Chiedi: "Questa modifica impatta N righe. Vuoi che proceda a step separati?"
- Non apportare refactoring stilistico o architettonico su file adiacenti.
- Segui obbligatoriamente il pattern: Ispezione mirata (Read-Only) -> Patch chirurgica (Write) -> Validazione automatica (Test/Run con exit code 0).
