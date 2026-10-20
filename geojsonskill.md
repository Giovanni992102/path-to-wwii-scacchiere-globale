# Historical GeoJSON Border Aligner (`geojsonskill.md`)

historical-geojson-border-aligner
Modifica e riallinea i confini delle province in un dataset GeoJSON per farli combaciare con mappe e confini storici preservando la topologia. Usa questa skill quando l'utente chiede di modificare una provincia GeoJSON, adattare un poligono a un confine storico, dividere o unire territori tra province adiacenti, o estrarre confini naturali e amministrativi storici senza corrompere le geometrie.

## Instructions
### Historical GeoJSON Border Aligner
Questa skill guida la modifica chirurgica dei confini provinciali in file GeoJSON per allinearli a confini storici reali, delegando all'AI l'analisi topografica e la generazione di codice geospaziale (GeoPandas, Shapely, Overpass QL) ed evitando la scrittura manuale o stimata delle coordinate.

## When to Use
- L'utente chiede di modificare una o piu province di un file GeoJSON per farle combaciare con un confine storico o una mappa d'epoca.
- L'utente vuole dividere una provincia esistente (es. cedere una porzione di territorio a una provincia adiacente o creare una nuova provincia storica).
- L'utente fornisce una mappa storica o descrive un trattato/confine storico e vuole tradurlo in modifiche geometriche sul proprio dataset.
- L'utente deve allineare un bordo provinciale a un elemento naturale (fiume, spartiacque, linea di costa) o a confini amministrativi sub-provinciali (comuni, distretti, cantoni).

## Steps

### 1. Analisi Topografica e Semantica del Confine
Non indovinare ne generare mai array di coordinate [lon, lat] direttamente nel testo: gli LLM producono poligoni auto-intersecanti e rompono la topologia tra province adiacenti.

Identifica invece gli elementi geografici reali su cui poggia il confine storico richiesto:
- **Confini idrografici o orografici**: Fiumi, canali, laghi o crinali alpini/appenninici (es. "il confine segue il corso dell'Adige da Verona fino a Rovigo").
- **Aggregazioni amministrative inferiori**: Comuni, circondari o distretti moderni (LAU / GADM Level 2-3) il cui perimetro esterno ricalca l'antico confine.
- **Linee di taglio tra punti noti**: Tratti rettilinei o spezzate che collegano coordinate precise di insediamenti, fortezze o confluenze fluviali.

### 2. Acquisizione della Geometria di Taglio (Cut Line)
Scegli il metodo piu adatto per ottenere il vettore reale del nuovo confine:

- **Opzione A (Fiumi o confini da OpenStreetMap)**: Genera una query Overpass QL per scaricare la geometria esatta dell'elemento fisico o amministrativo in formato GeoJSON.
```overpass
[out:json][timeout:25];
(
  way["waterway"="river"]["name"="Po"](44.8,10.5,45.2,12.5);
  relation["waterway"="river"]["name"="Po"](44.8,10.5,45.2,12.5);
);
out geom;
```

- **Opzione B (Waypoints / Punti di controllo)**: Se il confine taglia attraverso punti storici specifici non legati a un singolo fiume, definisci una lista ordinata di tuple (lon, lat) corrispondenti a toponimi reali verificati per costruire una LineString di taglio che oltrepassi leggermente il bordo esterno della provincia target.

### 3. Esecuzione Topologica Split-and-Merge (Python + Shapely)
Qualsiasi modifica a una provincia A richiede l'aggiornamento simultaneo della provincia confinante B (o la creazione di una nuova provincia C) usando le stesse identiche geometrie risultanti dal taglio, per garantire zero sovrapposizioni (overlaps) e zero fessure (slivers).

Usa ed esegui (o fornisci all'utente) questo pattern deterministico con geopandas e shapely:

```python
import geopandas as gpd
from shapely.geometry import LineString, MultiPolygon, Polygon
from shapely.ops import split, snap, linemerge, unary_union
from shapely.validation import make_valid

def align_historical_border(
    geojson_path: str,
    output_path: str,
    id_field: str,
    source_prov_id,
    target_prov_id,
    cut_line: LineString,
    transfer_side: str = "smallest"
):
    gdf = gpd.read_file(geojson_path)
    if gdf.crs is None or gdf.crs.to_epsg() != 4326:
        gdf = gdf.to_crs(epsg=4326)

    src_idx = gdf[gdf[id_field] == source_prov_id].index[0]
    tgt_idx = gdf[gdf[id_field] == target_prov_id].index[0]

    src_geom = make_valid(gdf.loc[src_idx, "geometry"])
    tgt_geom = make_valid(gdf.loc[tgt_idx, "geometry"])

    # Snap della linea di taglio ai vertici della provincia per evitare micro-slivers
    snapped_line = snap(cut_line, src_geom, tolerance=1e-5)

    # Esegui lo split topologico
    fragments = list(split(src_geom, snapped_line).geoms)
    if len(fragments) < 2:
        raise ValueError("La linea di taglio non attraversa completamente il poligono della provincia sorgente.")

    # Seleziona il frammento da cedere (es. il piu piccolo o quello adiacente al target)
    if transfer_side == "adjacent":
        fragments.sort(key=lambda g: g.distance(tgt_geom))
    else:
        fragments.sort(key=lambda g: g.area)

    transferred_piece = fragments[0]
    remaining_pieces = fragments[1:]

    # Aggiorna la provincia sorgente e fonde il frammento nella provincia adiacente
    gdf.loc[src_idx, "geometry"] = make_valid(unary_union(remaining_pieces))
    gdf.loc[tgt_idx, "geometry"] = make_valid( unary_union([tgt_geom, transferred_piece]) )

    # Esporta con precisione decimale ottimizzata a 5 cifre
    gdf.to_file(output_path, driver="GeoJSON", coordinate_precision=5)
    print(f"Confine aggiornato con successo tra {source_prov_id} e {target_prov_id}.")
```

### 4. Validazione Geometrica e Controllo Qualita
Prima di considerare conclusa l'operazione, verifica sempre queste condizioni:
- **Validita topologica**: Controlla che `gdf.is_valid.all()` restituisca `True`.
- **Conservazione dell'area totale**: La somma delle aree di `source_prov_id` e `target_prov_id` prima e dopo l'operazione deve rimanere invariata (scarto inferiore a `1e-7`).
- **Sistema di coordinate**: Il file esportato deve essere in EPSG:4326 (WGS84) con longitudine e latitudine in ordine `[lon, lat]`.

## Gotchas
- **Mai generare poligoni a mano nel testo**: Anche un errore di 0.001 gradi crea buchi di oltre 100 metri lungo il confine tra due province. Usa sempre `split()` e `unary_union()` in Python.
- **Linee di taglio troppo corte**: `shapely.ops.split` fallisce silenziosamente restituendo il poligono originale se le estremita della `cut_line` si fermano anche di un solo millimetro dentro il poligono invece di intersecare o superare il perimetro esterno. Prolunga sempre i capi della `cut_line` oltre i bordi della provincia da tagliare, oppure usa `snap()`.
- **Fiumi composti da segmenti multipli**: Quando estrai un fiume da OpenStreetMap, spesso e diviso in decine di `LineString` separate o rami secondari. Usa `shapely.ops.linemerge()` per fonderli in un'unica linea continua prima di eseguire `split()`.
- **MultiPolygon e Isole**: Se una provincia storica comprende isole o enclavi (es. domini marittimi o feudi separati), assicurati di operare sul `MultiPolygon` o di filtrare il singolo `Polygon` continentale interessato dal taglio, ricomponendo poi il `MultiPolygon` finale.
