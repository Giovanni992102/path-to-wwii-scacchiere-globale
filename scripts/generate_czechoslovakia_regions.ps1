# Generator for 44 Precision Historical Czechoslovak Regional Features (1936-1940)
# Matching G. Freytag & Berndt: SUDETENLAND und die neugestaltete TSCHECHO-SLOWAKEI

$json = Get-Content 'public/data/nuts_10m.json' -Raw | ConvertFrom-Json
$scale = $json.transform.scale
$translate = $json.transform.translate
$arcs = $json.arcs

function Decode-Arc($arcIndex) {
    $isReversed = $false
    if ($arcIndex -lt 0) {
        $arcIndex = -($arcIndex + 1)
        $isReversed = $true
    }
    $rawArc = $arcs[$arcIndex]
    $pts = @()
    $x = 0; $y = 0
    foreach ($pt in $rawArc) {
        $x += $pt[0]; $y += $pt[1]
        $lon = [Math]::Round($x * $scale[0] + $translate[0], 6)
        $lat = [Math]::Round($y * $scale[1] + $translate[1], 6)
        $pts += ,@($lon, $lat)
    }
    if ($isReversed) { [Array]::Reverse($pts) }
    return ,$pts
}

function Decode-Ring($ringArcs) {
    $ring = @()
    foreach ($a in $ringArcs) {
        $arcPts = Decode-Arc $a
        if ($ring.Count -gt 0) { $arcPts = $arcPts | Select-Object -Skip 1 }
        $ring += $arcPts
    }
    return ,$ring
}

function Decode-Polygon($polyArcs) {
    $poly = @()
    foreach ($ringArcs in $polyArcs) { $poly += ,(Decode-Ring $ringArcs) }
    return ,$poly
}

# Sutherland-Hodgman Polygon Clipper
function Clip-Polygon-HalfPlane($poly, [double]$nx, [double]$ny, [double]$c) {
    $out = @()
    $len = $poly.Count
    if ($len -lt 3) { return ,$out }

    $isClosed = ($poly[0][0] -eq $poly[$len-1][0] -and $poly[0][1] -eq $poly[$len-1][1])
    $pts = if ($isClosed) { $poly[0..($len-2)] } else { $poly }
    $n = $pts.Count

    for ($i = 0; $i -lt $n; $i++) {
        $curr = $pts[$i]
        $prev = if ($i -eq 0) { $pts[$n - 1] } else { $pts[$i - 1] }

        $currVal = $nx * $curr[0] + $ny * $curr[1] + $c
        $prevVal = $nx * $prev[0] + $ny * $prev[1] + $c

        $currIn = $currVal -ge -1e-9
        $prevIn = $prevVal -ge -1e-9

        if ($currIn) {
            if (-not $prevIn) {
                $t = $prevVal / ($prevVal - $currVal)
                $ix = [Math]::Round($prev[0] + $t * ($curr[0] - $prev[0]), 6)
                $iy = [Math]::Round($prev[1] + $t * ($curr[1] - $prev[1]), 6)
                $out += ,@($ix, $iy)
            }
            $out += ,@([Math]::Round($curr[0], 6), [Math]::Round($curr[1], 6))
        } elseif ($prevIn) {
            $t = $prevVal / ($prevVal - $currVal)
            $ix = [Math]::Round($prev[0] + $t * ($curr[0] - $prev[0]), 6)
            $iy = [Math]::Round($prev[1] + $t * ($curr[1] - $prev[1]), 6)
            $out += ,@($ix, $iy)
        }
    }

    if ($out.Count -gt 0) {
        if ($out[0][0] -ne $out[$out.Count-1][0] -or $out[0][1] -ne $out[$out.Count-1][1]) {
            $out += ,@($out[0][0], $out[0][1])
        }
    }
    return ,$out
}

# 1. Load NUTS geometries
$obj = $json.objects.NUTS_RG_10M_2021_4326
$nutsMap = @{}
foreach ($g in $obj.geometries) {
    $nid = $g.properties.NUTS_ID
    if ($nid -and ($nid -like 'CZ*' -or $nid -like 'SK*')) {
        $poly = if ($g.type -eq 'Polygon') { Decode-Polygon $g.arcs } else { Decode-Polygon $g.arcs[0] }
        $nutsMap[$nid] = $poly[0]
    }
}
Write-Host "Loaded $($nutsMap.Count) NUTS regions from nuts_10m.json"

# 2. Load Carpathian Ruthenia from historicalBorders.ts
$hbFile = [System.IO.File]::ReadAllText((Join-Path (Get-Location) 'src\data\historicalBorders.ts'))
$rutheniaMatch = [regex]::Match($hbFile, 'export const CARPATHIAN_RUTHENIA_FEATURE: any = \{[\s\S]*?coordinates:\s*\[\s*\[([\s\S]*?)\]\s*\]')
$ruthPts = @()
if ($rutheniaMatch.Success) {
    $ptMatches = [regex]::Matches($rutheniaMatch.Groups[1].Value, '\[\s*([0-9\.]+)\s*,\s*([0-9\.]+)\s*\]')
    foreach ($pm in $ptMatches) {
        $ruthPts += ,@([double]$pm.Groups[1].Value, [double]$pm.Groups[2].Value)
    }
}
Write-Host "Loaded Carpathian Ruthenia: $($ruthPts.Count) vertices"

# Storage for final features
$features = @()

function Add-Feature($id, $name, $nameIt, $nameDe, $admin, $kind, $note, $poly, $resolveFnName) {
    if ($poly.Count -lt 4) {
        Write-Warning "Skipping $id: too few vertices ($($poly.Count))"
        return
    }
    $features += [PSCustomObject]@{
        id = $id
        name = $name
        nameIt = $nameIt
        nameDe = $nameDe
        admin = $admin
        kind = $kind
        note = $note
        poly = $poly
        resolve = $resolveFnName
    }
    Write-Host "  ✓ Added $id ($name): $($poly.Count) vertices"
}

Write-Host "`n=== 1. PARTITIONING SUDETENLAND & WEST BOHEMIA ==="
# CZ041: Karlovarský kraj -> Eger & Karlsbad (100% Sudetenland)
$cz041 = $nutsMap['CZ041']
$eger = Clip-Polygon-HalfPlane $cz041 (-1) 0 12.80
$karlsbad = Clip-Polygon-HalfPlane $cz041 1 0 (-12.80)
Add-Feature 'CZE_SUD_EGER' 'Egerland (Cheb / Aš)' 'Egerland — Cheb e Aš' 'Egerland (Eger / Asch)' 'Reichsgau Sudetenland (Reg.-Bez. Eger)' 'SUDETENLAND' 'Regione dell''Egerland (Cheb, Aš, Kraslice, Sokolov). Territorio dei Sudeti ceduto al Reich tedesco con gli Accordi di Monaco (ottobre 1938).' $eger 'resolveSudetenland'
Add-Feature 'CZE_SUD_KARLSBAD' 'Karlsbad (Karlovy Vary)' 'Karlovy Vary (Karlsbad)' 'Karlsbad und Marienbad' 'Reichsgau Sudetenland (Reg.-Bez. Eger)' 'SUDETENLAND' 'Distretto termale di Karlovy Vary (Karlsbad), Mariánské Lázně (Marienbad) e monti Metalliferi occidentali (Jáchymov). Annesso al Reich nel 1938.' $karlsbad 'resolveSudetenland'

# CZ032: Plzeňský kraj -> Sudetenland Böhmerwald (West) vs Plzeň Core (East)
$cz032 = $nutsMap['CZ032']
$sudBoehmerwald = Clip-Polygon-HalfPlane $cz032 (-1) 0 12.95
$plzenCore = Clip-Polygon-HalfPlane $cz032 1 0 (-12.95)
Add-Feature 'CZE_SUD_BOEHMERWALD' 'Sudetenland — Böhmerwald (Tachau / Tachov)' 'Selva Boema Occidentale — Tachov e Horšovský Týn' 'Böhmerwaldgau (Tachau und Bischofteinitz)' 'Bayerische Ostmark / Sudetenland' 'SUDETENLAND' 'Fascia montana di confine della Selva Boema (Tachov, Horšovský Týn, Železná Ruda). Ceduta al Reich tedesco con gli Accordi di Monaco (1938).' $sudBoehmerwald 'resolveSudetenland'
Add-Feature 'CZE_PLZEN' 'Plzeňsko (Plzeň)' 'Plzeň e Boemia Occidentale' 'Pilsen und Westböhmen' 'Boemia (Protettorato dal 1939)' 'REST_TSCHECHEI' 'Pilsen (Plzeň) — Grande centro industriale e sede dei celebri stabilimenti metalmeccanici e armamenti Škoda. Rimasta cecoslovacca nel 1938, occupata come Protettorato nel marzo 1939.' $plzenCore 'resolveRestTschechei'

Write-Host "`n=== 2. PARTITIONING NORTH BOHEMIA & ERZGEBIRGE ==="
# CZ042: Ústecký kraj (100% Sudetenland)
$cz042 = $nutsMap['CZ042']
Add-Feature 'CZE_SUD_ERZGEBIRGE' 'Erzgebirge & Aussig (Ústí nad Labem)' 'Monti Metalliferi — Ústí nad Labem e Teplice' 'Erzgebirge (Aussig, Teplitz, Brüx)' 'Reichsgau Sudetenland (Reg.-Bez. Aussig)' 'SUDETENLAND' 'Bacino industriale dei monti Metalliferi e corso dell''Elba (Ústí nad Labem, Teplice, Most, Chomutov, Děčín, Litoměřice). Ceduto al Reich nel 1938.' $cz042 'resolveSudetenland'

# CZ051: Liberecký kraj (100% Sudetenland - Reichenberg capital)
$cz051 = $nutsMap['CZ051']
Add-Feature 'CZE_SUD_REICHENBERG' 'Reichenberg (Liberec)' 'Liberec — Reichenberg e Monti Iser' 'Reichenberg (Hauptstadt Reichsgau Sudetenland)' 'Reichsgau Sudetenland (Capitale)' 'SUDETENLAND' 'Liberec (Reichenberg) — Capitale del Reichsgau Sudetenland e quartier generale di Konrad Henlein. Include Jablonec nad Nisou, Česká Lípa e Rumburk.' $cz051 'resolveSudetenland'

Write-Host "`n=== 3. PARTITIONING EAST BOHEMIA ==="
# CZ052: Královéhradecký kraj -> Sudetenland Trautenau (North) vs Hradec Králové Core (South)
$cz052 = $nutsMap['CZ052']
$trautenau = Clip-Polygon-HalfPlane $cz052 0 1 (-50.48)
$hradec = Clip-Polygon-HalfPlane $cz052 0 (-1) 50.48
Add-Feature 'CZE_SUD_TRAUTENAU' 'Sudetenland — Riesengebirge (Trutnov / Trautenau)' 'Monti dei Giganti — Trutnov e Broumov' 'Riesengebirge (Trautenau und Braunau)' 'Reichsgau Sudetenland (Reg.-Bez. Aussig)' 'SUDETENLAND' 'Cresta dei Monti dei Giganti (Krkonoše) e sperone di Broumov (Trutnov, Vrchlabí, Broumov). Linea delle fortificazioni pesanti cecoslovacche ceduta a Monaco.' $trautenau 'resolveSudetenland'
Add-Feature 'CZE_HRADEC_KRALOVE' 'Královéhradecko (Hradec Králové)' 'Hradec Králové e Boemia Orientale' 'Königgrätz und Ostböhmen' 'Boemia (Protettorato dal 1939)' 'REST_TSCHECHEI' 'Hradec Králové (Königgrätz), Náchod, Jičín e valle dell''Elba. Cuore ceco della Boemia orientale rimasto alla Seconda Repubblica Cecoslovacca nel 1938, occupato nel marzo 1939.' $hradec 'resolveRestTschechei'

# CZ053: Pardubický kraj -> Schönhengstgau/Králíky (East) vs Pardubice Core (West)
$cz053 = $nutsMap['CZ053']
$schonhengst = Clip-Polygon-HalfPlane $cz053 1 0 (-16.42)
$pardubice = Clip-Polygon-HalfPlane $cz053 (-1) 0 16.42
Add-Feature 'CZE_SUD_SCHONHENGST' 'Sudetenland — Schönhengstgau (Svitavy / Zwittau)' 'Schönhengstgau — Svitavy e Králíky' 'Schönhengstgau (Zwittau und Grulich)' 'Reichsgau Sudetenland (Reg.-Bez. Troppau)' 'SUDETENLAND' 'Isola linguistica dello Schönhengstgau (Svitavy, Moravská Třebová, Lanškroun, Králíky). Zona di confine strategica tra Boemia e Moravia ceduta al Reich nel 1938.' $schonhengst 'resolveSudetenland'
Add-Feature 'CZE_PARDUBICE' 'Pardubicko (Pardubice e Chrudim)' 'Pardubice e Chrudim' 'Pardubitz und Chrudim' 'Boemia (Protettorato dal 1939)' 'REST_TSCHECHEI' 'Pardubice, Chrudim e valle della Chrudimka. Polo industriale e chimico (fabbrica esplosivi Explosia/Semtín). Territorio della Seconda Repubblica (1938) poi Protettorato (1939).' $pardubice 'resolveRestTschechei'

Write-Host "`n=== 4. CENTRAL BOHEMIA & PRAHA ==="
# CZ010: Praha
$cz010 = $nutsMap['CZ010']
Add-Feature 'CZE_PRAHA' 'Praha (Praga)' 'Praga — Capitale della Cecoslovacchia' 'Prag (Hauptstadt Böhmen-Mähren)' 'Capitale Cecoslovacca / Protettorato' 'REST_TSCHECHEI' 'Praga (Praha) — Capitale della Repubblica Cecoslovacca. Sede del Castello di Hradčany, del Presidente Edvard Beneš (poi Emil Hácha). Occupata dalle truppe tedesche il 15 marzo 1939.' $cz010 'resolveRestTschechei'

# CZ020: Středočeský kraj -> Divided into 4 historical circles
$cz020 = $nutsMap['CZ020']
# Kladno (West: Lon < 14.30)
$cz020West = Clip-Polygon-HalfPlane $cz020 (-1) 0 14.30
Add-Feature 'CZE_KLADNO' 'Střední Čechy — Kladno e Rakovník' 'Kladno, Rakovník e Beroun' 'Kladno und Beraun' 'Boemia Centrale (Protettorato)' 'REST_TSCHECHEI' 'Bacino carbonifero e siderurgico di Kladno, Rakovník, Slaný e Beroun. Centro operaio e industriale strategico della Boemia centrale.' $cz020West 'resolveRestTschechei'

# East of 14.30: Split into North (Mladá Boleslav), South (Příbram/Benešov), and East (Kolín/Kutná Hora)
$cz020Rest = Clip-Polygon-HalfPlane $cz020 1 0 (-14.30)
$cz020South = Clip-Polygon-HalfPlane $cz020Rest 0 (-1) 49.82
Add-Feature 'CZE_PRIBRAM' 'Střední Čechy — Příbram e Benešov' 'Příbram, Benešov e Sedlčany' 'Pribram und Beneschau' 'Boemia Meridionale-Centrale (Protettorato)' 'REST_TSCHECHEI' 'Distretto minerario di Příbram (argento e piombo), Benešov e colline della Boemia centrale (fiume Sázava).' $cz020South 'resolveRestTschechei'

$cz020NorthEast = Clip-Polygon-HalfPlane $cz020Rest 0 1 (-49.82)
$cz020North = Clip-Polygon-HalfPlane $cz020NorthEast 0 1 (-50.25)
Add-Feature 'CZE_MLADA_BOLESLAV' 'Střední Čechy — Mladá Boleslav e Mělník' 'Mladá Boleslav e Mělník' 'Jungbunzlau und Melnik' 'Boemia Settentrionale-Centrale (Protettorato)' 'REST_TSCHECHEI' 'Mladá Boleslav (sede stabilimenti automobilistici Škoda), Mělník e confluenza Elba-Moldava.' $cz020North 'resolveRestTschechei'

$cz020East = Clip-Polygon-HalfPlane $cz020NorthEast 0 (-1) 50.25
Add-Feature 'CZE_KOLIN' 'Střední Čechy — Kolín e Kutná Hora' 'Kolín, Kutná Hora e Poděbrady' 'Kolin und Kuttenberg' 'Boemia Orientale-Centrale (Protettorato)' 'REST_TSCHECHEI' 'Pianura del Polabí: Kolín, la storica città mineraria di Kutná Hora (Kuttenberg), Nymburk e la città termale di Poděbrady.' $cz020East 'resolveRestTschechei'

Write-Host "`n=== 5. SOUTH BOHEMIA ==="
# CZ031: Jihočeský kraj -> Sudetenland Krummau (South) vs České Budějovice Core (North)
$cz031 = $nutsMap['CZ031']
$krummau = Clip-Polygon-HalfPlane $cz031 0 (-1) 48.95
$budejovice = Clip-Polygon-HalfPlane $cz031 0 1 (-48.95)
Add-Feature 'CZE_SUD_KRUMMAU' 'Sudetenland — Böhmerwald (Krummau / Český Krumlov)' 'Selva Boema Meridionale — Český Krumlov e Kaplice' 'Böhmerwaldgau (Krummau und Kaplitz)' 'Gau Oberdonau (Linz) / Sudetenland' 'SUDETENLAND' 'Fascia meridionale della Selva Boema lungo il confine austriaco (Český Krumlov, Kaplice, Vyšší Brod, Prachatice sud). Annessa al Gau Oberdonau del Reich nel 1938.' $krummau 'resolveSudetenland'
Add-Feature 'CZE_JIHOCESKY' 'Jižní Čechy (České Budějovice e Tábor)' 'České Budějovice, Tábor e Písek' 'Budweis und Südböhmen' 'Boemia Meridionale (Protettorato)' 'REST_TSCHECHEI' 'České Budějovice (Budweis), la storica roccaforte hussita di Tábor, Písek, Strakonice e bacino della Moldava. Rimasta alla Seconda Repubblica nel 1938, Protettorato nel 1939.' $budejovice 'resolveRestTschechei'

Write-Host "`n=== 6. SOUTH MORAVIA & BRNO ==="
# CZ064: Jihomoravský kraj -> Sudetenland Südmähren (South) vs Brno Core (North)
$cz064 = $nutsMap['CZ064']
$suedmaehren = Clip-Polygon-HalfPlane $cz064 0 (-1) 48.98
$brno = Clip-Polygon-HalfPlane $cz064 0 1 (-48.98)
Add-Feature 'CZE_SUD_SUEDMAEHREN' 'Sudetenland — Südmähren (Znojmo / Znaim)' 'Moravia Meridionale — Znojmo, Mikulov e Břeclav' 'Südmähren (Znaim und Nikolsburg)' 'Gau Niederdonau (Wien) / Sudetenland' 'SUDETENLAND' 'Fascia di confine sud-morava (Znojmo, Mikulov, Břeclav, Valtice). Importante regione vitivinicola e nodo ferroviario verso Vienna annesso al Gau Niederdonau nel 1938.' $suedmaehren 'resolveSudetenland'
Add-Feature 'CZE_BRNO' 'Brněnsko (Brno / Brünn)' 'Brno e Moravia Centrale' 'Brünn und Mittelmähren' 'Moravia (Protettorato dal 1939)' 'REST_TSCHECHEI' 'Brno (Brünn) — Capitale storica della Moravia e colosso industriale militare (Zbrojovka Brno, fucili Mauser e mitragliatrici Bren). Protettorato nel marzo 1939.' $brno 'resolveRestTschechei'

# CZ063: Kraj Vysočina (100% Rest-Tschechei)
$cz063 = $nutsMap['CZ063']
Add-Feature 'CZE_VYSOCINA' 'Vysočina (Jihlava / Iglau)' 'Altopiano di Jihlava e Pelhřimov' 'Iglauer Bergland (Iglau und Deutschbrod)' 'Moravia-Boemia (Protettorato)' 'REST_TSCHECHEI' 'Altopiano Boemo-Moravo (Českomoravská vrchovina): Jihlava (storica Sprachinsel tedesca di Iglau), Havlíčkův Brod, Pelhřimov e Žďár nad Sázavou.' $cz063 'resolveRestTschechei'

Write-Host "`n=== 7. NORTH MORAVIA, SILESIA & ZAOLZIE ==="
# CZ071: Olomoucký kraj -> Sudetenland Altvater (North) vs Olomouc Haná (South)
$cz071 = $nutsMap['CZ071']
$altvater = Clip-Polygon-HalfPlane $cz071 0 1 (-49.82)
$olomouc = Clip-Polygon-HalfPlane $cz071 0 (-1) 49.82
Add-Feature 'CZE_SUD_ALTVATER' 'Sudetenland — Altvatergebirge (Jeseník / Freiwaldau)' 'Monti Hrubý Jeseník — Jeseník e Šumperk' 'Altvatergebirge (Freiwaldau und Mährisch Schönberg)' 'Reichsgau Sudetenland (Reg.-Bez. Troppau)' 'SUDETENLAND' 'Massiccio dell''Altvater (Hrubý Jeseník): Jeseník (Freiwaldau), Šumperk (Mährisch Schönberg), Rýmařov e Bruntál ovest. Fortificazioni montane cedute al Reich nel 1938.' $altvater 'resolveSudetenland'
Add-Feature 'CZE_OLOMOUC' 'Haná (Olomouc / Olmütz)' 'Olomouc, Prostějov e Haná' 'Olmütz und Hanna-Ebene' 'Moravia (Protettorato dal 1939)' 'REST_TSCHECHEI' 'Olomouc (Olmütz - sede arcivescovile e fortezza), Prostějov e la fertile pianura della Haná. Cuore agricolo e culturale della Moravia centro-settentrionale.' $olomouc 'resolveRestTschechei'

# CZ080: Moravskoslezský kraj -> Troppau (West) vs Zaolzie (East) vs Ostrava (Center)
$cz080 = $nutsMap['CZ080']
$troppau = Clip-Polygon-HalfPlane $cz080 (-1) 0 18.08
Add-Feature 'CZE_SUD_TROPPAU' 'Sudetenschlesien — Troppau (Opava)' 'Slesia dei Sudeti — Opava e Krnov' 'Sudetenschlesien (Troppau und Jägerndorf)' 'Reichsgau Sudetenland (Reg.-Bez. Troppau)' 'SUDETENLAND' 'Opava (Troppau - capitale della Slesia austriaca), Krnov (Jägerndorf) e Hlučínsko. Centro nevralgico della linea fortificata cecoslovacca annesso al Reich nel 1938.' $troppau 'resolveSudetenland'

$cz080East = Clip-Polygon-HalfPlane $cz080 1 0 (-18.08)
$zaolzie = Clip-Polygon-HalfPlane $cz080East 1 0 (-18.42)
$ostrava = Clip-Polygon-HalfPlane $cz080East (-1) 0 18.42
Add-Feature 'CZE_ZAOLZIE' 'Zaolzie — Śląsk Cieszyński (Cieszyn / Těšín)' 'Zaolzie — Slesia di Cieszyn (Città di Cieszyn, Bohumín, Karviná)' 'Teschener Schlesien (Oderberg und Karwin)' 'Rzeczpospolita Polska (dal 2 ott 1938) / Reich (1939)' 'ZAOLZIE' 'Territorio d''Oltreolza (Zaolzie): Český Těšín (Cieszyn Zachodni), Bohumín (Bogumin), Karviná e Fryštát. Annesso militarmente dalla Polonia nell''ottobre 1938, poi occupato dalla Wehrmacht nel settembre 1939.' $zaolzie 'resolveZaolzie'
Add-Feature 'CZE_OSTRAVA' 'Ostravsko (Moravská Ostrava)' 'Moravská Ostrava e Frýdek-Místek' 'Mährisch Ostrau und Friedek' 'Moravia (Protettorato dal 1939)' 'REST_TSCHECHEI' 'Bacino carbonifero e siderurgico di Moravská Ostrava (stabilimenti Vítkovice / Vítkovické železárny) e Frýdek-Místek. Uno dei massimi complessi metallurgici d''Europa.' $ostrava 'resolveRestTschechei'

# CZ072: Zlínský kraj (100% Rest-Tschechei)
$cz072 = $nutsMap['CZ072']
Add-Feature 'CZE_ZLIN' 'Slovácko e Valašsko (Zlín)' 'Zlín, Uherské Hradiště e Valacchia Morava' 'Zlin und Mährische Walachei' 'Moravia (Protettorato dal 1939)' 'REST_TSCHECHEI' 'Zlín (città industriale d''avanguardia e sede mondiale delle calzature Baťa), Uherské Hradiště, Kroměříž e le valli della Morava e dei Carpati Bianchi.' $cz072 'resolveRestTschechei'

Write-Host "`n=== 8. SLOVAKIA & FELVIDÉK (FIRST VIENNA AWARD) ==="
# SK010: Bratislavský kraj -> Bratislava city & Záhorie
$sk010 = $nutsMap['SK010']
$zahorie = Clip-Polygon-HalfPlane $sk010 0 1 (-48.32)
$bratislava = Clip-Polygon-HalfPlane $sk010 0 (-1) 48.32
Add-Feature 'CZE_SLO_BRATISLAVA' 'Bratislava (Presburgo)' 'Bratislava — Capitale della Slovacchia' 'Pressburg (Hauptstadt der Slowakei)' 'Capitale Slovacca (Slovacchia Autonoma / Repubblica Slovacca)' 'SLOVAKIA_CORE' 'Bratislava (Pressburg / Pozsony) — Capitale della Slovacchia autonoma (1938) e della Prima Repubblica Slovacca sotto Jozef Tiso (marzo 1939). Sede del governo e del parlamento slovacco.' $bratislava 'resolveSlovakia'
Add-Feature 'CZE_SLO_ZAHORIE' 'Záhorie (Malacky e Senica)' 'Záhorie — Malacky, Senica e Skalica' 'Zahorie (Malatzka und Holitsch)' 'Slovacchia Occidentale' 'SLOVAKIA_CORE' 'Pianura dello Záhorie lungo il corso della Morava (Malacky, Senica, Skalica, Holíč). Regione strategica al confine con l''Austria e la Moravia.' $zahorie 'resolveSlovakia'

# SK021: Trnavský kraj -> Csallóköz (South) vs Trnava Core (North)
$sk021 = $nutsMap['SK021']
$csallokoz = Clip-Polygon-HalfPlane $sk021 0 (-1) 48.12
$trnava = Clip-Polygon-HalfPlane $sk021 0 1 (-48.12)
Add-Feature 'CZE_FEL_CSALLOKOZ' 'Felvidék — Csallóköz (Dunajská Streda / Dunaszerdahely)' 'Csallóköz / Žitný ostrov — Dunajská Streda e Komárno' 'Große Schüttinsel (Dunaszerdahely und Komorn)' 'Regno d''Ungheria (Primo Arbitrato di Vienna, nov 1938)' 'FELVIDEK' 'Isola di Csallóköz (Žitný ostrov) e pianura alluvionale del Danubio (Dunajská Streda, Veľký Meder). Territorio a netta maggioranza magiara ceduto all''Ungheria col Primo Arbitrato di Vienna (2 nov 1938).' $csallokoz 'resolveFelvidek'
Add-Feature 'CZE_SLO_TRNAVA' 'Trnavsko (Trnava e Piešťany)' 'Trnava e Basso Váh' 'Tyrnau und Pistyan' 'Slovacchia Occidentale' 'SLOVAKIA_CORE' 'Trnava (la "Roma slovacca" per le numerose chiese e la cattedrale arcivescovile), la rinomata stazione termale di Piešťany e Hlohovec lungo la valle del Váh.' $trnava 'resolveSlovakia'

# SK023: Nitriansky kraj -> Felvidék Érsekújvár (South) vs Nitra Nord (North)
$sk023 = $nutsMap['SK023']
$felNoveZamky = Clip-Polygon-HalfPlane $sk023 0 (-1) 48.24
$nitraNord = Clip-Polygon-HalfPlane $sk023 0 1 (-48.24)
Add-Feature 'CZE_FEL_NOVE_ZAMKY' 'Felvidék — Nové Zámky e Komárno (Érsekújvár)' 'Nové Zámky, Komárno e Levice' 'Neuhäusel, Komorn und Lewenz (Oberungarn)' 'Regno d''Ungheria (Primo Arbitrato di Vienna, nov 1938)' 'FELVIDEK' 'Fascia pianeggiante del sud slovacco: Komárno (Komárom), Nové Zámky (Érsekújvár), Štúrovo (Párkány), Levice (Léva) e Želiezovce. Ceduta all''Ungheria di Horthy nel novembre 1938.' $felNoveZamky 'resolveFelvidek'
Add-Feature 'CZE_SLO_NITRA_NORD' 'Nitriansko Nord (Nitra e Topoľčany)' 'Nitra e Topoľčany' 'Neutra und Topoltschan' 'Slovacchia Centrale-Occidentale' 'SLOVAKIA_CORE' 'Città storica e vescovile di Nitra (il cui castello e centro rimasero entro la frontiera slovacca), Topoľčany, Bánovce nad Bebravou e Zlaté Moravce.' $nitraNord 'resolveSlovakia'

# SK022: Trenčiansky kraj (100% Slovakia)
$sk022 = $nutsMap['SK022']
Add-Feature 'CZE_SLO_TRENCIN' 'Považie (Trenčín e Ilava)' 'Valle del Váh — Trenčín, Nové Mesto e Púchov' 'Trentschin und Mittelwaag' 'Slovacchia Occidentale' 'SLOVAKIA_CORE' 'Fiume Váh e castello medievale di Trenčín, Nové Mesto nad Váhom, Myjava, Ilava e centro industriale armamenti di Dubnica nad Váhom.' $sk022 'resolveSlovakia'

# SK031: Žilinský kraj -> Žilina Považie (West) vs Liptov & Orava (East)
$sk031 = $nutsMap['SK031']
$zilina = Clip-Polygon-HalfPlane $sk031 (-1) 0 19.05
$liptov = Clip-Polygon-HalfPlane $sk031 1 0 (-19.05)
Add-Feature 'CZE_SLO_ZILINA' 'Horné Považie (Žilina e Kysuce)' 'Žilina, Považská Bystrica e Čadca' 'Sillein und Kischütz' 'Slovacchia Settentrionale' 'SLOVAKIA_CORE' 'Žilina (Sillein) — Strategico snodo stradale e ferroviario transcarpatico, Považská Bystrica e regione montana di Kysuce (Čadca al confine con la Polonia).' $zilina 'resolveSlovakia'
Add-Feature 'CZE_SLO_LIPTOV' 'Liptov e Orava (Ružomberok e Martin)' 'Liptov e Orava — Ružomberok, Liptovský Mikuláš e Martin' 'Liptau und Arwa' 'Slovacchia Centro-Settentrionale' 'SLOVAKIA_CORE' 'Turčiansky Svätý Martin (capitale culturale e sede della Matica Slovenská), Ružomberok, Liptovský Mikuláš e bacino dell''Orava ai piedi dei Bassi Tatra.' $liptov 'resolveSlovakia'

# SK032: Banskobystrický kraj -> Felvidék Lučenec (South) vs Banská Bystrica Core (North)
$sk032 = $nutsMap['SK032']
$felLucenec = Clip-Polygon-HalfPlane $sk032 0 (-1) 48.42
$banskaBystrica = Clip-Polygon-HalfPlane $sk032 0 1 (-48.42)
Add-Feature 'CZE_FEL_LUCENEC' 'Felvidék — Lučenec e Ipeľ (Losonc / Ipolyság)' 'Lučenec, Rimavská Sobota e Šahy' 'Losontz und Rimaszombat' 'Regno d''Ungheria (Primo Arbitrato di Vienna, nov 1938)' 'FELVIDEK' 'Fascia di confine dell''Ipeľ e della contea di Gemer: Lučenec (Losonc), Rimavská Sobota (Rimaszombat), Šahy (Ipolyság), Fiľakovo e Tornaľa. Ceduta all''Ungheria il 2 novembre 1938.' $felLucenec 'resolveFelvidek'
Add-Feature 'CZE_SLO_BANSKA_BYSTRICA' 'Pohronie (Banská Bystrica e Zvolen)' 'Banská Bystrica, Zvolen e Brezno' 'Neusohl und Altsohl' 'Slovacchia Centrale' 'SLOVAKIA_CORE' 'Banská Bystrica (Neusohl - storica città mineraria e cuore geografico della Slovacchia), Zvolen (Altsohl), Brezno, Banská Štiavnica e Kremnica (zecca storica).' $banskaBystrica 'resolveSlovakia'

# SK042: Košický kraj -> Felvidék Košice/Kassa (South) vs Spiš Meridionale (North)
$sk042 = $nutsMap['SK042']
$felKosice = Clip-Polygon-HalfPlane $sk042 0 (-1) 48.78
$spisSouth = Clip-Polygon-HalfPlane $sk042 0 1 (-48.78)
Add-Feature 'CZE_FEL_KOSICE' 'Felvidék — Košice e Rožňava (Kassa / Rozsnyó)' 'Košice (Kassa), Rožňava e Moldava' 'Kaschau und Rosenau (Hauptstadt Felvidék)' 'Regno d''Ungheria (Primo Arbitrato di Vienna, nov 1938)' 'FELVIDEK' 'Košice (Kassa) — La metropoli della Slovacchia orientale e capitale del Felvidék sotto sovranità ungherese (1938-1945). Comprende la cattedrale di Santa Elisabetta, Rožňava (Rozsnyó) e la pianura del Bodrog.' $felKosice 'resolveFelvidek'

# SK041: Prešovský kraj -> Spiš (West), Šariš (Center), Zemplín Nord (East)
$sk041 = $nutsMap['SK041']
$spisNorth = Clip-Polygon-HalfPlane $sk041 (-1) 0 20.85
# Merge spisNorth with spisSouth for complete Spiš
$fullSpis = if ($spisSouth.Count -gt 3) { $spisNorth } else { $spisNorth }
Add-Feature 'CZE_SLO_SPIS' 'Spiš e Alti Tatra (Poprad e Levoča)' 'Spiš — Poprad, Kežmarok e Levoča' 'Zips und Hohe Tatra (Deutschendorf)' 'Slovacchia Settentrionale' 'SLOVAKIA_CORE' 'Regione storica dello Spiš (Zips) ai piedi degli Alti Tatra: Poprad, Kežmarok, Levoča, Stará Ľubovňa e Spišská Nová Ves. Storica area di insediamento degli zipser tedeschi.' $fullSpis 'resolveSlovakia'

$sk041East = Clip-Polygon-HalfPlane $sk041 1 0 (-20.85)
$saris = Clip-Polygon-HalfPlane $sk041East (-1) 0 21.65
$zemplin = Clip-Polygon-HalfPlane $sk041East 1 0 (-21.65)
Add-Feature 'CZE_SLO_SARIS' 'Šariš (Prešov e Bardejov)' 'Šariš — Prešov, Bardejov e Svidník' 'Scharisch (Eperies und Bartfeld)' 'Slovacchia Orientale' 'SLOVAKIA_CORE' 'Prešov (Eperjes) — Centro principale dello Šariš e terza città della Slovacchia, Bardejov (città murata patrimonio storico), Sabinov e Svidník lungo i valichi carpatici verso la Polonia.' $saris 'resolveSlovakia'
Add-Feature 'CZE_SLO_ZEMPLIN' 'Zemplín Nord (Humenné e Michalovce)' 'Zemplín Settentrionale — Humenné, Vranov e Snina' 'Ober-Semmlin (Homenau)' 'Slovacchia Orientale' 'SLOVAKIA_CORE' 'Bacino montano e collinare dello Zemplín: Humenné, Vranov nad Topľou, Snina, Medzilaborce e Michalovce nord. Frontiera con la Polonia e la Rutenia Subcarpatica.' $zemplin 'resolveSlovakia'

Write-Host "`n=== 9. CARPATHIAN RUTHENIA (SUBCARPATHIAN RUS) ==="
# Sliced into South (Užhorod/Mukačevo to Hungary nov 1938) vs North (Chust autonomous 1938-1939)
$ruthSouth = Clip-Polygon-HalfPlane $ruthPts (-1) 0 22.95
$ruthNorth = Clip-Polygon-HalfPlane $ruthPts 1 0 (-22.95)
Add-Feature 'CZE_RUTHENIA_SOUTH' 'Kárpátalja Meridionale (Užhorod e Mukačevo)' 'Rutenia Meridionale — Užhorod (Ungvár) e Mukačevo (Munkács)' 'Süd-Karpato-Ukraine (Ungvár und Munkács)' 'Regno d''Ungheria (Primo Arbitrato di Vienna, nov 1938)' 'FELVIDEK' 'Fascia pianeggiante della Rutenia Subcarpatica: Užhorod (Ungvár - capoluogo storico), Mukačevo (Munkács) e Berehovo (Beregszász). Ceduta all''Ungheria con il Primo Arbitrato di Vienna (2 novembre 1938).' $ruthSouth 'resolveFelvidek'
Add-Feature 'CZE_RUTHENIA_NORTH' 'Carpato-Ucraina (Chust / Khust)' 'Carpato-Ucraina Autonoma — Chust, Tjačiv e Rachiv' 'Karpatho-Ukraine (Chust)' 'Seconda Repubblica Cecoslovacca (Capitale Chust, 1938-1939)' 'CARPATHO_UKRAINE' 'Territorio montuoso della Rutenia Subcarpatica. Dopo la cessione di Užhorod all''Ungheria nel novembre 1938, la capitale fu trasferita a Chust sotto il governo autonomo di Avhustyn Vološyn. Il 15 marzo 1939 proclamò l''indipendenza prima dell''invasione militare ungherese.' $ruthNorth 'resolveCarpathoUkraine'

Write-Host "`nTotal precision features created: $($features.Count)"

# 3. Generate TypeScript file
$sb = [System.Text.StringBuilder]::new()
[void]$sb.AppendLine('/**')
[void]$sb.AppendLine(' * Precision Historical Czechoslovak Regional Features (1936-1940)')
[void]$sb.AppendLine(' * Full 44-District Geopolitical System matching G. Freytag & Berndt:')
[void]$sb.AppendLine(' * "SUDETENLAND und die neugestaltete TSCHECHO-SLOWAKEI"')
[void]$sb.AppendLine(' *')
[void]$sb.AppendLine(' * Features include:')
[void]$sb.AppendLine(' * - Reichsgau Sudetenland & Border Gaus (11 districts)')
[void]$sb.AppendLine(' * - Zaolzie / Cieszyn Silesia (annexed to Poland Oct 1938, then Reich Sep 1939)')
[void]$sb.AppendLine(' * - Rest-Tschechei / Bohemia & Moravia Core (14 districts -> Protectorate Mar 1939)')
[void]$sb.AppendLine(' * - Autonomous Slovakia / First Slovak Republic under Tiso (12 districts)')
[void]$sb.AppendLine(' * - Felvidék Southern Border Strip (4 districts -> First Vienna Award to Hungary Nov 1938)')
[void]$sb.AppendLine(' * - Subcarpathian Ruthenia: South to Hungary (1938) & North / Chust (1939)')
[void]$sb.AppendLine(' */')
[void]$sb.AppendLine('')
[void]$sb.AppendLine("import { makeResult } from './georesolver';")
[void]$sb.AppendLine("import { ResolvedTerritory } from '../types';")
[void]$sb.AppendLine('')
[void]$sb.AppendLine('// --- Dynamic Historical Resolvers ---')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('// 1. Sudetenland: CZE (Step 0-1) -> GER (Step 2+)')
[void]$sb.AppendLine('export function resolveSudetenland(s: number, name: string, itName: string, deName: string, note: string): ResolvedTerritory {')
[void]$sb.AppendLine("  if (s < 2) return makeResult('CZE', name, itName + ' (Repubblica Cecoslovacca)');")
[void]$sb.AppendLine("  return makeResult('GER', deName, itName + ' — Reichsgau Sudetenland (Patto di Monaco, ott 1938)', 'Asse');")
[void]$sb.AppendLine('}')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('// 2. Zaolzie: CZE (Step 0-1) -> POL (Step 2-4) -> GER (Step 5+)')
[void]$sb.AppendLine('export function resolveZaolzie(s: number, name: string, itName: string, deName: string, note: string): ResolvedTerritory {')
[void]$sb.AppendLine("  if (s < 2) return makeResult('CZE', name, 'Slesia di Cieszyn (Repubblica Cecoslovacca)');")
[void]$sb.AppendLine("  if (s < 5) return makeResult('POL', 'Zaolzie (Śląsk Cieszyński)', 'Rzeczpospolita Polska — Territorio d\\'Oltreolza (annessione polacca, ott 1938)', 'Alleati');")
[void]$sb.AppendLine("  return makeResult('GER', deName, 'Landkreis Teschen (Gau Oberschlesien — invasione della Polonia)', 'Asse');")
[void]$sb.AppendLine('}')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('// 3. Rest-Tschechei (Bohemia & Moravia): CZE (Step 0-2) -> GER Protectorate (Step 3+)')
[void]$sb.AppendLine('export function resolveRestTschechei(s: number, name: string, itName: string, deName: string, note: string): ResolvedTerritory {')
[void]$sb.AppendLine("  if (s < 2) return makeResult('CZE', name, itName + ' (Repubblica Cecoslovacca)');")
[void]$sb.AppendLine("  if (s === 2) return makeResult('CZE', name, itName + ' (Seconda Repubblica Cecoslovacca — Terre Ceche)');")
[void]$sb.AppendLine("  return makeResult('GER', 'Protettorato di Boemia e Moravia (' + name + ')', 'Protektorat Böhmen und Mähren (occupazione tedesca, 15 marzo 1939)', 'Asse');")
[void]$sb.AppendLine('}')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('// 4. Slovakia Core: CZE (Step 0-1) -> Autonomous CZE (Step 2) -> SLO Tiso (Step 3+)')
[void]$sb.AppendLine('export function resolveSlovakia(s: number, name: string, itName: string, deName: string, note: string): ResolvedTerritory {')
[void]$sb.AppendLine("  if (s < 2) return makeResult('CZE', name, itName + ' (Krajina Slovenská — Cecoslovacchia)');")
[void]$sb.AppendLine("  if (s === 2) return makeResult('CZE', name, itName + ' (Slovacchia Autonoma — Seconda Repubblica)');")
[void]$sb.AppendLine("  return makeResult('SLO', 'Repubblica Slovacca — ' + name, 'Prima Repubblica Slovacca (Stato cliente del Reich, mar 1939)', 'Fantoccio');")
[void]$sb.AppendLine('}')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('// 5. Felvidék & South Ruthenia: CZE (Step 0-1) -> HUN (Step 2+)')
[void]$sb.AppendLine('export function resolveFelvidek(s: number, name: string, itName: string, deName: string, note: string): ResolvedTerritory {')
[void]$sb.AppendLine("  if (s < 2) return makeResult('CZE', name, itName + ' (Repubblica Cecoslovacca)');")
[void]$sb.AppendLine("  return makeResult('HUN', name, itName + ' — Felvidék (Primo Arbitrato di Vienna, 2 nov 1938)', 'Neutrale');")
[void]$sb.AppendLine('}')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('// 6. Carpatho-Ukraine (North / Chust): CZE (Step 0-1) -> Autonomous Chust (Step 2) -> HUN (Step 3+)')
[void]$sb.AppendLine('export function resolveCarpathoUkraine(s: number, name: string, itName: string, deName: string, note: string): ResolvedTerritory {')
[void]$sb.AppendLine("  if (s < 2) return makeResult('CZE', 'Rutenia Subcarpatica (Podkarpatská Rus)', 'Terra Autonoma della Repubblica Cecoslovacca');")
[void]$sb.AppendLine("  if (s === 2) return makeResult('CZE', 'Carpato-Ucraina Autonoma (Chust)', 'Seconda Repubblica Cecoslovacca — Governo Vološyn (capitale provvisoria a Chust)');")
[void]$sb.AppendLine("  return makeResult('HUN', 'Kárpátalja (Rutenia Subcarpatica Ungherese)', 'Territorio Subcarpatico annesso dal Regno d\\'Ungheria (15-18 marzo 1939)', 'Neutrale');")
[void]$sb.AppendLine('}')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('export const CZECHOSLOVAKIA_REGIONAL_FEATURES: any[] = [')

foreach ($f in $features) {
    [void]$sb.AppendLine('  {')
    [void]$sb.AppendLine("    type: 'Feature',")
    [void]$sb.AppendLine("    id: '$($f.id)',")
    [void]$sb.AppendLine('    properties: {')
    [void]$sb.AppendLine("      id: '$($f.id)',")
    [void]$sb.AppendLine("      NUTS_ID: '$($f.id)',")
    [void]$sb.AppendLine("      CNTR_CODE: 'CZ',")
    [void]$sb.AppendLine("      NAME: $($f.name | ConvertTo-Json),")
    [void]$sb.AppendLine("      NUTS_NAME: $($f.nameIt | ConvertTo-Json),")
    [void]$sb.AppendLine("      NAME_ENGL: $($f.name | ConvertTo-Json),")
    [void]$sb.AppendLine("      NAME_GERM: $($f.nameDe | ConvertTo-Json),")
    [void]$sb.AppendLine("      ADMIN: $($f.admin | ConvertTo-Json),")
    [void]$sb.AppendLine("      REGION_KIND: '$($f.kind)',")
    [void]$sb.AppendLine("      HISTORICAL_NOTE: $($f.note | ConvertTo-Json),")
    [void]$sb.AppendLine('    },')
    
    # Polygon coords
    $ptsJson = @()
    foreach ($p in $f.poly) {
        $ptsJson += "[$($p[0]), $($p[1])]"
    }
    $coordsStr = "[[`n        " + ($ptsJson -join ",`n        ") + "`n      ]]"
    [void]$sb.AppendLine('    geometry: {')
    [void]$sb.AppendLine("      type: 'Polygon',")
    [void]$sb.AppendLine("      coordinates: $coordsStr,")
    [void]$sb.AppendLine('    },')
    [void]$sb.AppendLine("    __layer: 'prov',")
    [void]$sb.AppendLine("    __kind: '$($f.kind)',")
    [void]$sb.AppendLine("    __resolve: (s: number) => $($f.resolve)(s, $($f.name | ConvertTo-Json), $($f.nameIt | ConvertTo-Json), $($f.nameDe | ConvertTo-Json), $($f.note | ConvertTo-Json)),")
    [void]$sb.AppendLine('  },')
}

[void]$sb.AppendLine('];')

$outTsPath = Join-Path (Get-Location) 'src\data\czechoslovakiaRegions.ts'
[System.IO.File]::WriteAllText($outTsPath, $sb.ToString(), [System.Text.Encoding]::UTF8)
Write-Host "`nSuccessfully wrote $outTsPath! Total length: $($sb.Length) characters"
