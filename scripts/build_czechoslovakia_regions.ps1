# Build Precision Historical Czechoslovak Regional Features (1936-1940)
# Cartographic surgical precision matching G. Freytag & Berndt 1938

$nutsRaw = [System.IO.File]::ReadAllText('public/data/nuts_10m.json')
$json = ConvertFrom-Json $nutsRaw
$scale = $json.transform.scale
$translate = $json.transform.translate
$arcs = $json.arcs

function Decode-Arc($arcIndex) {
    $rev = $false
    if ($arcIndex -lt 0) {
        $arcIndex = -($arcIndex + 1)
        $rev = $true
    }
    $raw = $arcs[$arcIndex]
    $pts = [System.Collections.Generic.List[object]]::new()
    $x = 0; $y = 0
    foreach ($pt in $raw) {
        $x += $pt[0]; $y += $pt[1]
        $lon = [Math]::Round($x * $scale[0] + $translate[0], 6)
        $lat = [Math]::Round($y * $scale[1] + $translate[1], 6)
        $pts.Add(@($lon, $lat))
    }
    if ($rev) { $pts.Reverse() }
    return $pts
}

function Decode-Ring($ringArcs) {
    $ring = [System.Collections.Generic.List[object]]::new()
    foreach ($a in $ringArcs) {
        $arcPts = Decode-Arc $a
        $startIdx = if ($ring.Count -gt 0) { 1 } else { 0 }
        for ($i = $startIdx; $i -lt $arcPts.Count; $i++) {
            $ring.Add($arcPts[$i])
        }
    }
    return $ring
}

function Decode-Polygon($polyArcs) {
    # Returns outer ring
    return Decode-Ring $polyArcs[0]
}

# Sutherland-Hodgman Polygon Clipper
function Clip-Polygon-HalfPlane($poly, [double]$nx, [double]$ny, [double]$c) {
    $out = [System.Collections.Generic.List[object]]::new()
    $len = $poly.Count
    if ($len -lt 3) { return $out }

    $isClosed = ($poly[0][0] -eq $poly[$len-1][0] -and $poly[0][1] -eq $poly[$len-1][1])
    $count = if ($isClosed) { $len - 1 } else { $len }

    for ($i = 0; $i -lt $count; $i++) {
        $curr = $poly[$i]
        $prev = if ($i -eq 0) { $poly[$count - 1] } else { $poly[$i - 1] }

        $currVal = $nx * $curr[0] + $ny * $curr[1] + $c
        $prevVal = $nx * $prev[0] + $ny * $prev[1] + $c

        $currIn = ($currVal -ge -1e-9)
        $prevIn = ($prevVal -ge -1e-9)

        if ($currIn) {
            if (-not $prevIn) {
                $t = $prevVal / ($prevVal - $currVal)
                $ix = [Math]::Round($prev[0] + $t * ($curr[0] - $prev[0]), 6)
                $iy = [Math]::Round($prev[1] + $t * ($curr[1] - $prev[1]), 6)
                $out.Add(@($ix, $iy))
            }
            $out.Add(@([Math]::Round($curr[0], 6), [Math]::Round($curr[1], 6)))
        } elseif ($prevIn) {
            $t = $prevVal / ($prevVal - $currVal)
            $ix = [Math]::Round($prev[0] + $t * ($curr[0] - $prev[0]), 6)
            $iy = [Math]::Round($prev[1] + $t * ($curr[1] - $prev[1]), 6)
            $out.Add(@($ix, $iy))
        }
    }

    if ($out.Count -gt 0) {
        $first = $out[0]
        $last = $out[$out.Count - 1]
        if ($first[0] -ne $last[0] -or $first[1] -ne $last[1]) {
            $out.Add(@($first[0], $first[1]))
        }
    }
    return $out
}

# 1. Load NUTS geometries
$obj = $json.objects.NUTS_RG_10M_2021_4326
$nutsMap = @{}
foreach ($g in $obj.geometries) {
    $nid = $g.properties.NUTS_ID
    if ($nid -and ($nid.StartsWith('CZ') -or $nid.StartsWith('SK'))) {
        $ring = if ($g.type -eq 'Polygon') { Decode-Polygon $g.arcs } else { Decode-Polygon $g.arcs[0] }
        $nutsMap[$nid] = $ring
    }
}
Write-Host "Loaded $($nutsMap.Count) NUTS regions from nuts_10m.json"

# 2. Load Carpathian Ruthenia from historicalBorders.ts
$hbFile = [System.IO.File]::ReadAllText('src/data/historicalBorders.ts')
$rutheniaMatch = [regex]::Match($hbFile, 'export const CARPATHIAN_RUTHENIA_FEATURE: any = \{[\s\S]*?coordinates:\s*\[\s*\[([\s\S]*?)\]\s*\]')
$ruthPts = [System.Collections.Generic.List[object]]::new()
if ($rutheniaMatch.Success) {
    $ptMatches = [regex]::Matches($rutheniaMatch.Groups[1].Value, '\[\s*([0-9\.]+)\s*,\s*([0-9\.]+)\s*\]')
    foreach ($pm in $ptMatches) {
        $ruthPts.Add(@([double]$pm.Groups[1].Value, [double]$pm.Groups[2].Value))
    }
}
Write-Host "Loaded Carpathian Ruthenia: $($ruthPts.Count) vertices"

# Features collection
$features = [System.Collections.Generic.List[object]]::new()

function Add-HistoricalFeature {
    param(
        [string]$Id,
        [string]$Name,
        [string]$NameIt,
        [string]$NameDe,
        [string]$Admin,
        [string]$Kind,
        [string]$Note,
        $Poly,
        [string]$ResolveFn
    )
    if ($Poly.Count -lt 4) {
        Write-Warning "Skipping $Id : too few vertices ($($Poly.Count))"
        return
    }
    $features.Add([PSCustomObject]@{
        Id = $Id
        Name = $Name
        NameIt = $NameIt
        NameDe = $NameDe
        Admin = $Admin
        Kind = $Kind
        Note = $Note
        Poly = $Poly
        Resolve = $ResolveFn
    })
    Write-Host "  [OK] Added $Id ($Name): $($Poly.Count) vertices"
}

Write-Host "--- 1. Partitioning Sudetenland & West Bohemia ---"
$cz041 = $nutsMap['CZ041']
$eger = Clip-Polygon-HalfPlane $cz041 (-1) 0 12.80
$karlsbad = Clip-Polygon-HalfPlane $cz041 1 0 (-12.80)
Add-HistoricalFeature -Id 'CZE_SUD_EGER' -Name 'Egerland (Cheb / As)' -NameIt 'Egerland - Cheb e As' -NameDe 'Egerland (Eger / Asch)' -Admin 'Reichsgau Sudetenland (Reg.-Bez. Eger)' -Kind 'SUDETENLAND' -Note 'Regione dell Egerland (Cheb, As, Kraslice, Sokolov). Territorio dei Sudeti ceduto al Reich tedesco con gli Accordi di Monaco (ottobre 1938).' -Poly $eger -ResolveFn 'resolveSudetenland'
Add-HistoricalFeature -Id 'CZE_SUD_KARLSBAD' -Name 'Karlsbad (Karlovy Vary)' -NameIt 'Karlovy Vary (Karlsbad)' -NameDe 'Karlsbad und Marienbad' -Admin 'Reichsgau Sudetenland (Reg.-Bez. Eger)' -Kind 'SUDETENLAND' -Note 'Distretto termale di Karlovy Vary (Karlsbad), Marianske Lazne (Marienbad) e monti Metalliferi occidentali (Jachymov). Annesso al Reich nel 1938.' -Poly $karlsbad -ResolveFn 'resolveSudetenland'

$cz032 = $nutsMap['CZ032']
$sudBoehmerwald = Clip-Polygon-HalfPlane $cz032 (-1) 0 12.95
$plzenCore = Clip-Polygon-HalfPlane $cz032 1 0 (-12.95)
Add-HistoricalFeature -Id 'CZE_SUD_BOEHMERWALD' -Name 'Sudetenland - Boehmerwald (Tachau / Tachov)' -NameIt 'Selva Boema Occidentale - Tachov e Horsovsky Tyn' -NameDe 'Boehmerwaldgau (Tachau und Bischofteinitz)' -Admin 'Bayerische Ostmark / Sudetenland' -Kind 'SUDETENLAND' -Note 'Fascia montana di confine della Selva Boema (Tachov, Horsovsky Tyn, Zelezna Ruda). Ceduta al Reich tedesco con gli Accordi di Monaco (1938).' -Poly $sudBoehmerwald -ResolveFn 'resolveSudetenland'
Add-HistoricalFeature -Id 'CZE_PLZEN' -Name 'Plzensko (Plzen)' -NameIt 'Plzen e Boemia Occidentale' -NameDe 'Pilsen und Westboehmen' -Admin 'Boemia (Protettorato dal 1939)' -Kind 'REST_TSCHECHEI' -Note 'Pilsen (Plzen) - Grande centro industriale e sede dei celebri stabilimenti metalmeccanici e armamenti Skoda. Rimasta cecoslovacca nel 1938, occupata come Protettorato nel marzo 1939.' -Poly $plzenCore -ResolveFn 'resolveRestTschechei'

Write-Host "--- 2. North Bohemia & Erzgebirge ---"
$cz042 = $nutsMap['CZ042']
Add-HistoricalFeature -Id 'CZE_SUD_ERZGEBIRGE' -Name 'Erzgebirge & Aussig (Usti nad Labem)' -NameIt 'Monti Metalliferi - Usti nad Labem e Teplice' -NameDe 'Erzgebirge (Aussig, Teplitz, Bruex)' -Admin 'Reichsgau Sudetenland (Reg.-Bez. Aussig)' -Kind 'SUDETENLAND' -Note 'Bacino industriale dei monti Metalliferi e corso dell Elba (Usti nad Labem, Teplice, Most, Chomutov, Decin, Litomerice). Ceduto al Reich nel 1938.' -Poly $cz042 -ResolveFn 'resolveSudetenland'

$cz051 = $nutsMap['CZ051']
Add-HistoricalFeature -Id 'CZE_SUD_REICHENBERG' -Name 'Reichenberg (Liberec)' -NameIt 'Liberec - Reichenberg e Monti Iser' -NameDe 'Reichenberg (Hauptstadt Reichsgau Sudetenland)' -Admin 'Reichsgau Sudetenland (Capitale)' -Kind 'SUDETENLAND' -Note 'Liberec (Reichenberg) - Capitale del Reichsgau Sudetenland e quartier generale di Konrad Henlein. Include Jablonec nad Nisou, Ceska Lipa e Rumburk.' -Poly $cz051 -ResolveFn 'resolveSudetenland'

Write-Host "--- 3. East Bohemia & Riesengebirge ---"
$cz052 = $nutsMap['CZ052']
$trautenau = Clip-Polygon-HalfPlane $cz052 0 1 (-50.48)
$hradec = Clip-Polygon-HalfPlane $cz052 0 (-1) 50.48
Add-HistoricalFeature -Id 'CZE_SUD_TRAUTENAU' -Name 'Sudetenland - Riesengebirge (Trutnov / Trautenau)' -NameIt 'Monti dei Giganti - Trutnov e Broumov' -NameDe 'Riesengebirge (Trautenau und Braunau)' -Admin 'Reichsgau Sudetenland (Reg.-Bez. Aussig)' -Kind 'SUDETENLAND' -Note 'Cresta dei Monti dei Giganti (Krkonose) e sperone di Broumov (Trutnov, Vrchlabi, Broumov). Linea delle fortificazioni pesanti cecoslovacche ceduta a Monaco.' -Poly $trautenau -ResolveFn 'resolveSudetenland'
Add-HistoricalFeature -Id 'CZE_HRADEC_KRALOVE' -Name 'Kralovehradecko (Hradec Kralove)' -NameIt 'Hradec Kralove e Boemia Orientale' -NameDe 'Koeniggraetz und Ostboehmen' -Admin 'Boemia (Protettorato dal 1939)' -Kind 'REST_TSCHECHEI' -Note 'Hradec Kralove (Koeniggraetz), Nachod, Jicin e valle dell Elba. Cuore ceco della Boemia orientale rimasto alla Seconda Repubblica Cecoslovacca nel 1938, occupato nel marzo 1939.' -Poly $hradec -ResolveFn 'resolveRestTschechei'

$cz053 = $nutsMap['CZ053']
$schonhengst = Clip-Polygon-HalfPlane $cz053 1 0 (-16.42)
$pardubice = Clip-Polygon-HalfPlane $cz053 (-1) 0 16.42
Add-HistoricalFeature -Id 'CZE_SUD_SCHONHENGST' -Name 'Sudetenland - Schoenhengstgau (Svitavy / Zwittau)' -NameIt 'Schoenhengstgau - Svitavy e Kraliky' -NameDe 'Schoenhengstgau (Zwittau und Grulich)' -Admin 'Reichsgau Sudetenland (Reg.-Bez. Troppau)' -Kind 'SUDETENLAND' -Note 'Isola linguistica dello Schoenhengstgau (Svitavy, Moravska Trebova, Lanskroun, Kraliky). Zona di confine strategica tra Boemia e Moravia ceduta al Reich nel 1938.' -Poly $schonhengst -ResolveFn 'resolveSudetenland'
Add-HistoricalFeature -Id 'CZE_PARDUBICE' -Name 'Pardubicko (Pardubice e Chrudim)' -NameIt 'Pardubice e Chrudim' -NameDe 'Pardubitz und Chrudim' -Admin 'Boemia (Protettorato dal 1939)' -Kind 'REST_TSCHECHEI' -Note 'Pardubice, Chrudim e valle della Chrudimka. Polo industriale e chimico. Territorio della Seconda Repubblica (1938) poi Protettorato (1939).' -Poly $pardubice -ResolveFn 'resolveRestTschechei'

Write-Host "--- 4. Central Bohemia & Praha ---"
$cz010 = $nutsMap['CZ010']
Add-HistoricalFeature -Id 'CZE_PRAHA' -Name 'Praha (Praga)' -NameIt 'Praga - Capitale della Cecoslovacchia' -NameDe 'Prag (Hauptstadt Boehmen-Maehren)' -Admin 'Capitale Cecoslovacca / Protettorato' -Kind 'REST_TSCHECHEI' -Note 'Praga (Praha) - Capitale della Repubblica Cecoslovacca. Sede del Castello di Hradcany, del Presidente Edvard Benes (poi Emil Hacha). Occupata dalle truppe tedesche il 15 marzo 1939.' -Poly $cz010 -ResolveFn 'resolveRestTschechei'

$cz020 = $nutsMap['CZ020']
$cz020West = Clip-Polygon-HalfPlane $cz020 (-1) 0 14.30
Add-HistoricalFeature -Id 'CZE_KLADNO' -Name 'Stredni Cechy - Kladno e Rakovnik' -NameIt 'Kladno, Rakovnik e Beroun' -NameDe 'Kladno und Beraun' -Admin 'Boemia Centrale (Protettorato)' -Kind 'REST_TSCHECHEI' -Note 'Bacino carbonifero e siderurgico di Kladno, Rakovnik, Slany e Beroun. Centro operaio e industriale strategico della Boemia centrale.' -Poly $cz020West -ResolveFn 'resolveRestTschechei'

$cz020Rest = Clip-Polygon-HalfPlane $cz020 1 0 (-14.30)
$cz020South = Clip-Polygon-HalfPlane $cz020Rest 0 (-1) 49.82
Add-HistoricalFeature -Id 'CZE_PRIBRAM' -Name 'Stredni Cechy - Pribram e Benesov' -NameIt 'Pribram, Benesov e Sedlcany' -NameDe 'Pribram und Beneschau' -Admin 'Boemia Meridionale-Centrale (Protettorato)' -Kind 'REST_TSCHECHEI' -Note 'Distretto minerario di Pribram (argento e piombo), Benesov e colline della Boemia centrale (fiume Sazava).' -Poly $cz020South -ResolveFn 'resolveRestTschechei'

$cz020NorthEast = Clip-Polygon-HalfPlane $cz020Rest 0 1 (-49.82)
$cz020North = Clip-Polygon-HalfPlane $cz020NorthEast 0 1 (-50.25)
Add-HistoricalFeature -Id 'CZE_MLADA_BOLESLAV' -Name 'Stredni Cechy - Mlada Boleslav e Melnik' -NameIt 'Mlada Boleslav e Melnik' -NameDe 'Jungbunzlau und Melnik' -Admin 'Boemia Settentrionale-Centrale (Protettorato)' -Kind 'REST_TSCHECHEI' -Note 'Mlada Boleslav (sede stabilimenti automobilistici Skoda), Melnik e confluenza Elba-Moldava.' -Poly $cz020North -ResolveFn 'resolveRestTschechei'

$cz020East = Clip-Polygon-HalfPlane $cz020NorthEast 0 (-1) 50.25
Add-HistoricalFeature -Id 'CZE_KOLIN' -Name 'Stredni Cechy - Kolin e Kutna Hora' -NameIt 'Kolin, Kutna Hora e Podebrady' -NameDe 'Kolin und Kuttenberg' -Admin 'Boemia Orientale-Centrale (Protettorato)' -Kind 'REST_TSCHECHEI' -Note 'Pianura del Polabi: Kolin, la storica citta mineraria di Kutna Hora (Kuttenberg), Nymburk e la citta termale di Podebrady.' -Poly $cz020East -ResolveFn 'resolveRestTschechei'

Write-Host "--- 5. South Bohemia ---"
$cz031 = $nutsMap['CZ031']
$krummau = Clip-Polygon-HalfPlane $cz031 0 (-1) 48.95
$budejovice = Clip-Polygon-HalfPlane $cz031 0 1 (-48.95)
Add-HistoricalFeature -Id 'CZE_SUD_KRUMMAU' -Name 'Sudetenland - Boehmerwald (Krummau / Cesky Krumlov)' -NameIt 'Selva Boema Meridionale - Cesky Krumlov e Kaplice' -NameDe 'Boehmerwaldgau (Krummau und Kaplitz)' -Admin 'Gau Oberdonau (Linz) / Sudetenland' -Kind 'SUDETENLAND' -Note 'Fascia meridionale della Selva Boema lungo il confine austriaco (Cesky Krumlov, Kaplice, Vyssi Brod, Prachatice sud). Annessa al Gau Oberdonau del Reich nel 1938.' -Poly $krummau -ResolveFn 'resolveSudetenland'
Add-HistoricalFeature -Id 'CZE_JIHOCESKY' -Name 'Jizni Cechy (Ceske Budejovice e Tabor)' -NameIt 'Ceske Budejovice, Tabor e Pisek' -NameDe 'Budweis und Suedboehmen' -Admin 'Boemia Meridionale (Protettorato)' -Kind 'REST_TSCHECHEI' -Note 'Ceske Budejovice (Budweis), la storica roccaforte hussita di Tabor, Pisek, Strakonice e bacino della Moldava. Rimasta alla Seconda Repubblica nel 1938, Protettorato nel 1939.' -Poly $budejovice -ResolveFn 'resolveRestTschechei'

Write-Host "--- 6. South Moravia & Brno ---"
$cz064 = $nutsMap['CZ064']
$suedmaehren = Clip-Polygon-HalfPlane $cz064 0 (-1) 48.98
$brno = Clip-Polygon-HalfPlane $cz064 0 1 (-48.98)
Add-HistoricalFeature -Id 'CZE_SUD_SUEDMAEHREN' -Name 'Sudetenland - Suedmaehren (Znojmo / Znaim)' -NameIt 'Moravia Meridionale - Znojmo, Mikulov e Breclav' -NameDe 'Suedmaehren (Znaim und Nikolsburg)' -Admin 'Gau Niederdonau (Wien) / Sudetenland' -Kind 'SUDETENLAND' -Note 'Fascia di confine sud-morava (Znojmo, Mikulov, Breclav, Valtice). Importante regione vitivinicola e nodo ferroviario verso Vienna annesso al Gau Niederdonau nel 1938.' -Poly $suedmaehren -ResolveFn 'resolveSudetenland'
Add-HistoricalFeature -Id 'CZE_BRNO' -Name 'Brnensko (Brno / Bruenn)' -NameIt 'Brno e Moravia Centrale' -NameDe 'Bruenn und Mittelmaehren' -Admin 'Moravia (Protettorato dal 1939)' -Kind 'REST_TSCHECHEI' -Note 'Brno (Bruenn) - Capitale storica della Moravia e colosso industriale militare (Zbrojovka Brno, fucili Mauser e mitragliatrici Bren). Protettorato nel marzo 1939.' -Poly $brno -ResolveFn 'resolveRestTschechei'

$cz063 = $nutsMap['CZ063']
Add-HistoricalFeature -Id 'CZE_VYSOCINA' -Name 'Vysocina (Jihlava / Iglau)' -NameIt 'Altopiano di Jihlava e Pelhrimov' -NameDe 'Iglauer Bergland (Iglau und Deutschbrod)' -Admin 'Moravia-Boemia (Protettorato)' -Kind 'REST_TSCHECHEI' -Note 'Altopiano Boemo-Moravo (Ceskomoravska vrchovina): Jihlava (storica Sprachinsel tedesca di Iglau), Havlickuv Brod, Pelhrimov e Zdar nad Sazavou.' -Poly $cz063 -ResolveFn 'resolveRestTschechei'

Write-Host "--- 7. North Moravia, Silesia & Zaolzie ---"
$cz071 = $nutsMap['CZ071']
$altvater = Clip-Polygon-HalfPlane $cz071 0 1 (-49.82)
$olomouc = Clip-Polygon-HalfPlane $cz071 0 (-1) 49.82
Add-HistoricalFeature -Id 'CZE_SUD_ALTVATER' -Name 'Sudetenland - Altvatergebirge (Jesenik / Freiwaldau)' -NameIt 'Monti Hruby Jesenik - Jesenik e Sumperk' -NameDe 'Altvatergebirge (Freiwaldau und Maehrisch Schoenberg)' -Admin 'Reichsgau Sudetenland (Reg.-Bez. Troppau)' -Kind 'SUDETENLAND' -Note 'Massiccio dell Altvater (Hruby Jesenik): Jesenik (Freiwaldau), Sumperk (Maehrisch Schoenberg), Rymarov e Bruntal ovest. Fortificazioni montane cedute al Reich nel 1938.' -Poly $altvater -ResolveFn 'resolveSudetenland'
Add-HistoricalFeature -Id 'CZE_OLOMOUC' -Name 'Hana (Olomouc / Olmuetz)' -NameIt 'Olomouc, Prostejov e Hana' -NameDe 'Olmuetz und Hanna-Ebene' -Admin 'Moravia (Protettorato dal 1939)' -Kind 'REST_TSCHECHEI' -Note 'Olomouc (Olmuetz - sede arcivescovile e fortezza), Prostejov e la fertile pianura della Hana. Cuore agricolo e culturale della Moravia centro-settentrionale.' -Poly $olomouc -ResolveFn 'resolveRestTschechei'

$cz080 = $nutsMap['CZ080']
$troppau = Clip-Polygon-HalfPlane $cz080 (-1) 0 18.08
Add-HistoricalFeature -Id 'CZE_SUD_TROPPAU' -Name 'Sudetenschlesien - Troppau (Opava)' -NameIt 'Slesia dei Sudeti - Opava e Krnov' -NameDe 'Sudetenschlesien (Troppau und Jaegerndorf)' -Admin 'Reichsgau Sudetenland (Reg.-Bez. Troppau)' -Kind 'SUDETENLAND' -Note 'Opava (Troppau - capitale della Slesia austriaca), Krnov (Jaegerndorf) e Hlucinsko. Centro nevralgico della linea fortificata cecoslovacca annesso al Reich nel 1938.' -Poly $troppau -ResolveFn 'resolveSudetenland'

$cz080East = Clip-Polygon-HalfPlane $cz080 1 0 (-18.08)
$zaolzie = Clip-Polygon-HalfPlane $cz080East 1 0 (-18.42)
$ostrava = Clip-Polygon-HalfPlane $cz080East (-1) 0 18.42
Add-HistoricalFeature -Id 'CZE_ZAOLZIE' -Name 'Zaolzie - Slask Cieszynski (Cieszyn / Tesin)' -NameIt 'Zaolzie - Slesia di Cieszyn (Cieszyn, Bohumin, Karvina)' -NameDe 'Teschener Schlesien (Oderberg und Karwin)' -Admin 'Rzeczpospolita Polska (dal 2 ott 1938) / Reich (1939)' -Kind 'ZAOLZIE' -Note 'Territorio d Oltreolza (Zaolzie): Cesky Tesin (Cieszyn Zachodni), Bohumin (Bogumin), Karvina e Frystat. Annesso militarmente dalla Polonia nell ottobre 1938, poi occupato dalla Wehrmacht nel settembre 1939.' -Poly $zaolzie -ResolveFn 'resolveZaolzie'
Add-HistoricalFeature -Id 'CZE_OSTRAVA' -Name 'Ostravsko (Moravska Ostrava)' -NameIt 'Moravska Ostrava e Frydek-Mistek' -NameDe 'Maehrisch Ostrau und Friedek' -Admin 'Moravia (Protettorato dal 1939)' -Kind 'REST_TSCHECHEI' -Note 'Bacino carbonifero e siderurgico di Moravska Ostrava (stabilimenti Vitkovice) e Frydek-Mistek. Uno dei massimi complessi metallurgici d Europa.' -Poly $ostrava -ResolveFn 'resolveRestTschechei'

$cz072 = $nutsMap['CZ072']
Add-HistoricalFeature -Id 'CZE_ZLIN' -Name 'Slovacko e Valassko (Zlin)' -NameIt 'Zlin, Uherske Hradiste e Valacchia Morava' -NameDe 'Zlin und Maehrische Walachei' -Admin 'Moravia (Protettorato dal 1939)' -Kind 'REST_TSCHECHEI' -Note 'Zlin (citta industriale d avanguardia e sede mondiale delle calzature Bata), Uherske Hradiste, Kromeriz e le valli della Morava e dei Carpati Bianchi.' -Poly $cz072 -ResolveFn 'resolveRestTschechei'

Write-Host "--- 8. Slovakia & Felvidek (First Vienna Award) ---"
$sk010 = $nutsMap['SK010']
$zahorie = Clip-Polygon-HalfPlane $sk010 0 1 (-48.32)
$bratislava = Clip-Polygon-HalfPlane $sk010 0 (-1) 48.32
Add-HistoricalFeature -Id 'CZE_SLO_BRATISLAVA' -Name 'Bratislava (Presburgo)' -NameIt 'Bratislava - Capitale della Slovacchia' -NameDe 'Pressburg (Hauptstadt der Slowakei)' -Admin 'Capitale Slovacca (Slovacchia Autonoma / Repubblica Slovacca)' -Kind 'SLOVAKIA_CORE' -Note 'Bratislava (Pressburg / Pozsony) - Capitale della Slovacchia autonoma (1938) e della Prima Repubblica Slovacca sotto Jozef Tiso (marzo 1939). Sede del governo e del parlamento slovacco.' -Poly $bratislava -ResolveFn 'resolveSlovakia'
Add-HistoricalFeature -Id 'CZE_SLO_ZAHORIE' -Name 'Zahorie (Malacky e Senica)' -NameIt 'Zahorie - Malacky, Senica e Skalica' -NameDe 'Zahorie (Malatzka und Holitsch)' -Admin 'Slovacchia Occidentale' -Kind 'SLOVAKIA_CORE' -Note 'Pianura dello Zahorie lungo il corso della Morava (Malacky, Senica, Skalica, Holic). Regione strategica al confine con l Austria e la Moravia.' -Poly $zahorie -ResolveFn 'resolveSlovakia'

$sk021 = $nutsMap['SK021']
$csallokoz = Clip-Polygon-HalfPlane $sk021 0 (-1) 48.12
$trnava = Clip-Polygon-HalfPlane $sk021 0 1 (-48.12)
Add-HistoricalFeature -Id 'CZE_FEL_CSALLOKOZ' -Name 'Felvidek - Csallokoz (Dunajska Streda / Dunaszerdahely)' -NameIt 'Csallokoz / Zitny ostrov - Dunajska Streda e Komarno' -NameDe 'Grosse Schuettinsel (Dunaszerdahely und Komorn)' -Admin 'Regno d Ungheria (Primo Arbitrato di Vienna, nov 1938)' -Kind 'FELVIDEK' -Note 'Isola di Csallokoz (Zitny ostrov) e pianura alluvionale del Danubio (Dunajska Streda, Velky Meder). Territorio a netta maggioranza magiara ceduto all Ungheria col Primo Arbitrato di Vienna (2 nov 1938).' -Poly $csallokoz -ResolveFn 'resolveFelvidek'
Add-HistoricalFeature -Id 'CZE_SLO_TRNAVA' -Name 'Trnavsko (Trnava e Piestany)' -NameIt 'Trnava e Basso Vah' -NameDe 'Tyrnau und Pistyan' -Admin 'Slovacchia Occidentale' -Kind 'SLOVAKIA_CORE' -Note 'Trnava (la "Roma slovacca" per le numerose chiese e la cattedrale arcivescovile), la rinomata stazione termale di Piestany e Hlohovec lungo la valle del Vah.' -Poly $trnava -ResolveFn 'resolveSlovakia'

$sk023 = $nutsMap['SK023']
$felNoveZamky = Clip-Polygon-HalfPlane $sk023 0 (-1) 48.24
$nitraNord = Clip-Polygon-HalfPlane $sk023 0 1 (-48.24)
Add-HistoricalFeature -Id 'CZE_FEL_NOVE_ZAMKY' -Name 'Felvidek - Nove Zamky e Komarno (Ersekujvar)' -NameIt 'Nove Zamky, Komarno e Levice' -NameDe 'Neuhaeusel, Komorn und Lewenz (Oberungarn)' -Admin 'Regno d Ungheria (Primo Arbitrato di Vienna, nov 1938)' -Kind 'FELVIDEK' -Note 'Fascia pianeggiante del sud slovacco: Komarno (Komarom), Nove Zamky (Ersekujvar), Sturovo (Parkany), Levice (Leva) e Zeliezovce. Ceduta all Ungheria di Horthy nel novembre 1938.' -Poly $felNoveZamky -ResolveFn 'resolveFelvidek'
Add-HistoricalFeature -Id 'CZE_SLO_NITRA_NORD' -Name 'Nitriansko Nord (Nitra e Topolcany)' -NameIt 'Nitra e Topolcany' -NameDe 'Neutra und Topoltschan' -Admin 'Slovacchia Centrale-Occidentale' -Kind 'SLOVAKIA_CORE' -Note 'Citta storica e vescovile di Nitra (il cui castello e centro rimasero entro la frontiera slovacca), Topolcany, Banovce nad Bebravou e Zlate Moravce.' -Poly $nitraNord -ResolveFn 'resolveSlovakia'

$sk022 = $nutsMap['SK022']
Add-HistoricalFeature -Id 'CZE_SLO_TRENCIN' -Name 'Povazie (Trencin e Ilava)' -NameIt 'Valle del Vah - Trencin, Nove Mesto e Puchov' -NameDe 'Trentschin und Mittelwaag' -Admin 'Slovacchia Occidentale' -Kind 'SLOVAKIA_CORE' -Note 'Fiume Vah e castello medievale di Trencin, Nove Mesto nad Vahom, Myjava, Ilava e centro industriale armamenti di Dubnica nad Vahom.' -Poly $sk022 -ResolveFn 'resolveSlovakia'

$sk031 = $nutsMap['SK031']
$zilina = Clip-Polygon-HalfPlane $sk031 (-1) 0 19.05
$liptov = Clip-Polygon-HalfPlane $sk031 1 0 (-19.05)
Add-HistoricalFeature -Id 'CZE_SLO_ZILINA' -Name 'Horne Povazie (Zilina e Kysuce)' -NameIt 'Zilina, Povazska Bystrica e Cadca' -NameDe 'Sillein und Kischuetz' -Admin 'Slovacchia Settentrionale' -Kind 'SLOVAKIA_CORE' -Note 'Zilina (Sillein) - Strategico snodo stradale e ferroviario transcarpatico, Povazska Bystrica e regione montana di Kysuce (Cadca al confine con la Polonia).' -Poly $zilina -ResolveFn 'resolveSlovakia'
Add-HistoricalFeature -Id 'CZE_SLO_LIPTOV' -Name 'Liptov e Orava (Ruzomberok e Martin)' -NameIt 'Liptov e Orava - Ruzomberok, Liptovsky Mikulas e Martin' -NameDe 'Liptau und Arwa' -Admin 'Slovacchia Centro-Settentrionale' -Kind 'SLOVAKIA_CORE' -Note 'Turciansky Svaety Martin (capitale culturale e sede della Matica Slovenska), Ruzomberok, Liptovsky Mikulas e bacino dell Orava ai piedi dei Bassi Tatra.' -Poly $liptov -ResolveFn 'resolveSlovakia'

$sk032 = $nutsMap['SK032']
$felLucenec = Clip-Polygon-HalfPlane $sk032 0 (-1) 48.42
$banskaBystrica = Clip-Polygon-HalfPlane $sk032 0 1 (-48.42)
Add-HistoricalFeature -Id 'CZE_FEL_LUCENEC' -Name 'Felvidek - Lucenec e Ipel (Losonc / Ipolysag)' -NameIt 'Lucenec, Rimavska Sobota e Sahy' -NameDe 'Losontz und Rimaszombat' -Admin 'Regno d Ungheria (Primo Arbitrato di Vienna, nov 1938)' -Kind 'FELVIDEK' -Note 'Fascia di confine dell Ipel e della contea di Gemer: Lucenec (Losonc), Rimavska Sobota (Rimaszombat), Sahy (Ipolysag), Filakovo e Tornala. Ceduta all Ungheria il 2 novembre 1938.' -Poly $felLucenec -ResolveFn 'resolveFelvidek'
Add-HistoricalFeature -Id 'CZE_SLO_BANSKA_BYSTRICA' -Name 'Pohronie (Banska Bystrica e Zvolen)' -NameIt 'Banska Bystrica, Zvolen e Brezno' -NameDe 'Neusohl und Altsohl' -Admin 'Slovacchia Centrale' -Kind 'SLOVAKIA_CORE' -Note 'Banska Bystrica (Neusohl - storica citta mineraria e cuore geografico della Slovacchia), Zvolen (Altsohl), Brezno, Banska Stiavnica e Kremnica (zecca storica).' -Poly $banskaBystrica -ResolveFn 'resolveSlovakia'

$sk042 = $nutsMap['SK042']
$felKosice = Clip-Polygon-HalfPlane $sk042 0 (-1) 48.78
$spisSouth = Clip-Polygon-HalfPlane $sk042 0 1 (-48.78)
Add-HistoricalFeature -Id 'CZE_FEL_KOSICE' -Name 'Felvidek - Kosice e Roznava (Kassa / Rozsnyo)' -NameIt 'Kosice (Kassa), Roznava e Moldava' -NameDe 'Kaschau und Rosenau (Hauptstadt Felvidek)' -Admin 'Regno d Ungheria (Primo Arbitrato di Vienna, nov 1938)' -Kind 'FELVIDEK' -Note 'Kosice (Kassa) - La metropoli della Slovacchia orientale e capitale del Felvidek sotto sovranita ungherese (1938-1945). Comprende la cattedrale di Santa Elisabetta, Roznava (Rozsnyo) e la pianura del Bodrog.' -Poly $felKosice -ResolveFn 'resolveFelvidek'
Add-HistoricalFeature -Id 'CZE_SLO_GEMER_SPIS' -Name 'Dolny Spis e Gemer (Spisska Nova Ves e Gelnica)' -NameIt 'Dolny Spis e Gemer Settentrionale' -NameDe 'Unterzips und Nordgoemoer' -Admin 'Slovacchia Orientale' -Kind 'SLOVAKIA_CORE' -Note 'Spisska Nova Ves (Iglau), Gelnica (Goellnitz), Krompachy e distretto minerario dei Monti Metalliferi Slovacchi rimasti alla Slovacchia dopo l Arbitrato di Vienna.' -Poly $spisSouth -ResolveFn 'resolveSlovakia'



$sk041 = $nutsMap['SK041']
$spisNorth = Clip-Polygon-HalfPlane $sk041 (-1) 0 20.85
$fullSpis = $spisNorth
Add-HistoricalFeature -Id 'CZE_SLO_SPIS' -Name 'Spis e Alti Tatra (Poprad e Levoca)' -NameIt 'Spis - Poprad, Kezmarok e Levoca' -NameDe 'Zips und Hohe Tatra (Deutschendorf)' -Admin 'Slovacchia Settentrionale' -Kind 'SLOVAKIA_CORE' -Note 'Regione storica dello Spis (Zips) ai piedi degli Alti Tatra: Poprad, Kezmarok, Levoca, Stara Lubovna e Spisska Nova Ves. Storica area di insediamento degli zipser tedeschi.' -Poly $fullSpis -ResolveFn 'resolveSlovakia'

$sk041East = Clip-Polygon-HalfPlane $sk041 1 0 (-20.85)
$saris = Clip-Polygon-HalfPlane $sk041East (-1) 0 21.65
$zemplin = Clip-Polygon-HalfPlane $sk041East 1 0 (-21.65)
Add-HistoricalFeature -Id 'CZE_SLO_SARIS' -Name 'Saris (Presov e Bardejov)' -NameIt 'Saris - Presov, Bardejov e Svidnik' -NameDe 'Scharisch (Eperies und Bartfeld)' -Admin 'Slovacchia Orientale' -Kind 'SLOVAKIA_CORE' -Note 'Presov (Eperjes) - Centro principale dello Saris e terza citta della Slovacchia, Bardejov (citta murata patrimonio storico), Sabinov e Svidnik lungo i valichi carpatici verso la Polonia.' -Poly $saris -ResolveFn 'resolveSlovakia'
Add-HistoricalFeature -Id 'CZE_SLO_ZEMPLIN' -Name 'Zemplin Nord (Humenne e Michalovce)' -NameIt 'Zemplin Settentrionale - Humenne, Vranov e Snina' -NameDe 'Ober-Semmlin (Homenau)' -Admin 'Slovacchia Orientale' -Kind 'SLOVAKIA_CORE' -Note 'Bacino montano e collinare dello Zemplin: Humenne, Vranov nad Toplou, Snina, Medzilaborce e Michalovce nord. Frontiera con la Polonia e la Rutenia Subcarpatica.' -Poly $zemplin -ResolveFn 'resolveSlovakia'

Write-Host "--- 9. Carpathian Ruthenia (Subcarpathian Rus) ---"
$ruthSouth = Clip-Polygon-HalfPlane $ruthPts (-1) 0 22.95
$ruthNorth = Clip-Polygon-HalfPlane $ruthPts 1 0 (-22.95)
Add-HistoricalFeature -Id 'CZE_RUTHENIA_SOUTH' -Name 'Karpatalja Meridionale (Uzhorod e Mukacevo)' -NameIt 'Rutenia Meridionale - Uzhorod (Ungvar) e Mukacevo (Munkacs)' -NameDe 'Sued-Karpato-Ukraine (Ungvar und Munkacs)' -Admin 'Regno d Ungheria (Primo Arbitrato di Vienna, nov 1938)' -Kind 'FELVIDEK' -Note 'Fascia pianeggiante della Rutenia Subcarpatica: Uzhorod (Ungvar - capoluogo storico), Mukacevo (Munkacs) e Berehovo (Beregszasz). Ceduta all Ungheria con il Primo Arbitrato di Vienna (2 novembre 1938).' -Poly $ruthSouth -ResolveFn 'resolveFelvidek'
Add-HistoricalFeature -Id 'CZE_RUTHENIA_NORTH' -Name 'Carpato-Ucraina (Chust / Khust)' -NameIt 'Carpato-Ucraina Autonoma - Chust, Tjaciv e Rachiv' -NameDe 'Karpatho-Ukraine (Chust)' -Admin 'Seconda Repubblica Cecoslovacca (Capitale Chust, 1938-1939)' -Kind 'CARPATHO_UKRAINE' -Note 'Territorio montuoso della Rutenia Subcarpatica. Dopo la cessione di Uzhorod all Ungheria nel novembre 1938, la capitale fu trasferita a Chust sotto il governo autonomo di Avhustyn Volosyn. Il 15 marzo 1939 proclamo l indipendenza prima dell invasione militare ungherese.' -Poly $ruthNorth -ResolveFn 'resolveCarpathoUkraine'

Write-Host "`nTotal precision features created: $($features.Count)"

# 3. Generate TypeScript file
$sb = [System.Text.StringBuilder]::new()

$headerAndResolvers = @'
/**
 * Precision Historical Czechoslovak Regional Features (1936-1940)
 * Full 44-District Geopolitical System matching G. Freytag & Berndt:
 * "SUDETENLAND und die neugestaltete TSCHECHO-SLOWAKEI"
 *
 * Features include:
 * - Reichsgau Sudetenland & Border Gaus (11 districts)
 * - Zaolzie / Cieszyn Silesia (annexed to Poland Oct 1938, then Reich Sep 1939)
 * - Rest-Tschechei / Bohemia & Moravia Core (14 districts -> Protectorate Mar 1939)
 * - Autonomous Slovakia / First Slovak Republic under Tiso (12 districts)
 * - Felvidek Southern Border Strip (4 districts -> First Vienna Award to Hungary Nov 1938)
 * - Subcarpathian Ruthenia: South to Hungary (1938) & North / Chust (1939)
 */

import { makeResult } from './georesolver';
import { ResolvedTerritory } from '../types';

// --- Dynamic Historical Resolvers ---

// 1. Sudetenland: CZE (Step 0-1) -> GER (Step 2+)
export function resolveSudetenland(s: number, name: string, itName: string, deName: string, _note: string): ResolvedTerritory {
  if (s < 2) return makeResult('CZE', name, itName + ' (Repubblica Cecoslovacca)');
  return makeResult('GER', deName, itName + ' - Reichsgau Sudetenland (Patto di Monaco, ott 1938)', 'Asse');
}

// 2. Zaolzie: CZE (Step 0-1) -> POL (Step 2-4) -> GER (Step 5+)
export function resolveZaolzie(s: number, _name: string, _itName: string, deName: string, _note: string): ResolvedTerritory {
  if (s < 2) return makeResult('CZE', 'Slesia di Cieszyn (Cesky Tesin)', 'Slesia di Cieszyn (Repubblica Cecoslovacca)');
  if (s < 5) return makeResult('POL', 'Zaolzie (Slask Cieszynski)', 'Rzeczpospolita Polska - Territorio d\'Oltreolza (annessione polacca, ott 1938)', 'Alleati');
  return makeResult('GER', deName, 'Landkreis Teschen (Gau Oberschlesien - invasione della Polonia)', 'Asse');
}

// 3. Rest-Tschechei (Bohemia & Moravia): CZE (Step 0-2) -> GER Protectorate (Step 3+)
export function resolveRestTschechei(s: number, name: string, itName: string, _deName: string, _note: string): ResolvedTerritory {
  if (s < 2) return makeResult('CZE', name, itName + ' (Repubblica Cecoslovacca)');
  if (s === 2) return makeResult('CZE', name, itName + ' (Seconda Repubblica Cecoslovacca - Terre Ceche)');
  return makeResult('GER', 'Protettorato di Boemia e Moravia (' + name + ')', 'Protektorat Boehmen und Maehren (occupazione tedesca, 15 marzo 1939)', 'Asse');
}

// 4. Slovakia Core: CZE (Step 0-1) -> Autonomous CZE (Step 2) -> SLO Tiso (Step 3+)
export function resolveSlovakia(s: number, name: string, itName: string, _deName: string, _note: string): ResolvedTerritory {
  if (s < 2) return makeResult('CZE', name, itName + ' (Krajina Slovenska - Cecoslovacchia)');
  if (s === 2) return makeResult('CZE', name, itName + ' (Slovacchia Autonoma - Seconda Repubblica)');
  return makeResult('SLO', 'Repubblica Slovacca - ' + name, 'Prima Repubblica Slovacca (Stato cliente del Reich, mar 1939)', 'Fantoccio');
}

// 5. Felvidek & South Ruthenia: CZE (Step 0-1) -> HUN (Step 2+)
export function resolveFelvidek(s: number, name: string, itName: string, _deName: string, _note: string): ResolvedTerritory {
  if (s < 2) return makeResult('CZE', name, itName + ' (Repubblica Cecoslovacca)');
  return makeResult('HUN', name, itName + ' - Felvidek (Primo Arbitrato di Vienna, 2 nov 1938)', 'Neutrale');
}

// 6. Carpatho-Ukraine (North / Chust): CZE (Step 0-1) -> Autonomous Chust (Step 2) -> HUN (Step 3+)
export function resolveCarpathoUkraine(s: number, _name: string, _itName: string, _deName: string, _note: string): ResolvedTerritory {
  if (s < 2) return makeResult('CZE', 'Rutenia Subcarpatica (Podkarpatska Rus)', 'Terra Autonoma della Repubblica Cecoslovacca');
  if (s === 2) return makeResult('CZE', 'Carpato-Ucraina Autonoma (Chust)', 'Seconda Repubblica Cecoslovacca - Governo Volosyn (capitale provvisoria a Chust)');
  return makeResult('HUN', 'Karpatalja (Rutenia Subcarpatica Ungherese)', 'Territorio Subcarpatico annesso dal Regno d\'Ungheria (15-18 marzo 1939)', 'Neutrale');
}

export const CZECHOSLOVAKIA_REGIONAL_FEATURES: any[] = [
'@

[void]$sb.AppendLine($headerAndResolvers)


foreach ($f in $features) {
    [void]$sb.AppendLine('  {')
    [void]$sb.AppendLine("    type: 'Feature',")
    [void]$sb.AppendLine("    id: '$($f.Id)',")
    [void]$sb.AppendLine('    properties: {')
    [void]$sb.AppendLine("      id: '$($f.Id)',")
    [void]$sb.AppendLine("      NUTS_ID: '$($f.Id)',")
    [void]$sb.AppendLine("      CNTR_CODE: 'CZ',")
    [void]$sb.AppendLine("      NAME: $($f.Name | ConvertTo-Json),")
    [void]$sb.AppendLine("      NUTS_NAME: $($f.NameIt | ConvertTo-Json),")
    [void]$sb.AppendLine("      NAME_ENGL: $($f.Name | ConvertTo-Json),")
    [void]$sb.AppendLine("      NAME_GERM: $($f.NameDe | ConvertTo-Json),")
    [void]$sb.AppendLine("      ADMIN: $($f.Admin | ConvertTo-Json),")
    [void]$sb.AppendLine("      REGION_KIND: '$($f.Kind)',")
    [void]$sb.AppendLine("      HISTORICAL_NOTE: $($f.Note | ConvertTo-Json),")
    [void]$sb.AppendLine('    },')
    
    $ptsJson = [System.Collections.Generic.List[string]]::new()
    foreach ($p in $f.Poly) {
        $ptsJson.Add("[$($p[0]), $($p[1])]")
    }
    $coordsStr = "[[`n        " + ($ptsJson -join ",`n        ") + "`n      ]]"
    [void]$sb.AppendLine('    geometry: {')
    [void]$sb.AppendLine("      type: 'Polygon',")
    [void]$sb.AppendLine("      coordinates: $coordsStr,")
    [void]$sb.AppendLine('    },')
    [void]$sb.AppendLine("    __layer: 'prov',")
    [void]$sb.AppendLine("    __kind: '$($f.Kind)',")
    [void]$sb.AppendLine("    __resolve: (s: number) => $($f.Resolve)(s, $($f.Name | ConvertTo-Json), $($f.NameIt | ConvertTo-Json), $($f.NameDe | ConvertTo-Json), $($f.Note | ConvertTo-Json)),")
    [void]$sb.AppendLine('  },')
}

[void]$sb.AppendLine('];')

$outTsPath = 'src/data/czechoslovakiaRegions.ts'
[System.IO.File]::WriteAllText($outTsPath, $sb.ToString(), [System.Text.Encoding]::UTF8)
Write-Host "`nSuccessfully wrote $outTsPath! Total length: $($sb.Length) characters"
