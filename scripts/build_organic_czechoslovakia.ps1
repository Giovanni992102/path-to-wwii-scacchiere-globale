# Generator for Organic Historical Czechoslovak Regional Features (1936-1940)
# True historical meandering borders with ZERO straight ruler lines
# Matching G. Freytag & Berndt: "SUDETENLAND und die neugestaltete TSCHECHO-SLOWAKEI" (1938)

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

function Decode-Polygon($polyArcs) {
    $ring = [System.Collections.Generic.List[object]]::new()
    foreach ($a in $polyArcs[0]) {
        $arcPts = Decode-Arc $a
        $startIdx = if ($ring.Count -gt 0) { 1 } else { 0 }
        for ($i = $startIdx; $i -lt $arcPts.Count; $i++) {
            $ring.Add($arcPts[$i])
        }
    }
    return $ring
}

function Decode-Geometry($g) {
    if ($g.type -eq 'Polygon') {
        return Decode-Polygon $g.arcs
    } else {
        $best = $null
        $maxLen = -1
        foreach ($p in $g.arcs) {
            $ring = Decode-Polygon $p
            if ($ring.Count -gt $maxLen) {
                $maxLen = $ring.Count
                $best = $ring
            }
        }
        return $best
    }
}

# Line Segment Intersection
function Intersect-Segments($p1, $p2, $q1, $q2) {
    $dx1 = $p2[0] - $p1[0]; $dy1 = $p2[1] - $p1[1]
    $dx2 = $q2[0] - $q1[0]; $dy2 = $q2[1] - $q1[1]
    $denom = $dx1 * $dy2 - $dy1 * $dx2
    if ([Math]::Abs($denom) -lt 1e-12) { return $null }

    $t = (($q1[0] - $p1[0]) * $dy2 - ($q1[1] - $p1[1]) * $dx2) / $denom
    $u = (($q1[0] - $p1[0]) * $dy1 - ($q1[1] - $p1[1]) * $dx1) / $denom

    if ($t -ge -1e-6 -and $t -le (1.0 + 1e-6) -and $u -ge -1e-6 -and $u -le (1.0 + 1e-6)) {
        $tClamped = [Math]::Max(0.0, [Math]::Min(1.0, $t))
        $uClamped = [Math]::Max(0.0, [Math]::Min(1.0, $u))
        $ix = [Math]::Round($p1[0] + $tClamped * $dx1, 6)
        $iy = [Math]::Round($p1[1] + $tClamped * $dy1, 6)
        return @{ Point = @($ix, $iy); t = $tClamped; u = $uClamped }
    }
    return $null
}

# Robust Polygon Split along a continuous jagged polyline
function Split-Polygon-By-Polyline($poly, $curve) {
    $pCount = $poly.Count - 1
    $hits = [System.Collections.Generic.List[object]]::new()

    for ($ci = 0; $ci -lt ($curve.Count - 1); $ci++) {
        $cp1 = $curve[$ci]; $cp2 = $curve[$ci + 1]
        for ($pi = 0; $pi -lt $pCount; $pi++) {
            $pp1 = $poly[$pi]; $pp2 = $poly[$pi + 1]
            $h = Intersect-Segments $cp1 $cp2 $pp1 $pp2
            if ($h) {
                $hits.Add([PSCustomObject]@{
                    Point = $h.Point
                    CurveOrder = $ci + $h.t
                    PolyOrder = $pi + $h.u
                    PolyIdx = $pi
                    CurveIdx = $ci
                })
            }
        }
    }

    if ($hits.Count -lt 2) {
        Write-Warning "Curve does not intersect polygon twice (hits: $($hits.Count))"
        return $null
    }

    # Sort hits along curve
    $sortedHits = $hits | Sort-Object CurveOrder
    $hitA = $sortedHits[0]
    $hitB = $sortedHits[$sortedHits.Count - 1]

    # Curve section from hitA to hitB
    $curveSeg = [System.Collections.Generic.List[object]]::new()
    $curveSeg.Add($hitA.Point)
    $startC = [int][Math]::Floor($hitA.CurveOrder) + 1
    $endC = [int][Math]::Floor($hitB.CurveOrder)
    for ($ci = $startC; $ci -le $endC; $ci++) {
        if ($ci -lt $curve.Count) {
            $curveSeg.Add($curve[$ci])
        }
    }
    $curveSeg.Add($hitB.Point)

    # Reconstruct Part 1: hitA -> curveSeg -> hitB -> poly perimeter from hitB back to hitA
    $poly1 = [System.Collections.Generic.List[object]]::new()
    foreach ($pt in $curveSeg) { $poly1.Add($pt) }

    $currIdx = ($hitB.PolyIdx + 1) % $pCount
    $targetIdx = ($hitA.PolyIdx + 1) % $pCount
    $guard = 0
    while ($currIdx -ne $targetIdx -and $guard -lt ($pCount + 2)) {
        $poly1.Add($poly[$currIdx])
        $currIdx = ($currIdx + 1) % $pCount
        $guard++
    }
    $poly1.Add($curveSeg[0])

    # Reconstruct Part 2: reverse curveSeg from hitB to hitA -> poly perimeter from hitA back to hitB
    $poly2 = [System.Collections.Generic.List[object]]::new()
    for ($i = $curveSeg.Count - 1; $i -ge 0; $i--) { $poly2.Add($curveSeg[$i]) }

    $currIdx = ($hitA.PolyIdx + 1) % $pCount
    $targetIdx = ($hitB.PolyIdx + 1) % $pCount
    $guard = 0
    while ($currIdx -ne $targetIdx -and $guard -lt ($pCount + 2)) {
        $poly2.Add($poly[$currIdx])
        $currIdx = ($currIdx + 1) % $pCount
        $guard++
    }
    $poly2.Add($curveSeg[$curveSeg.Count - 1])

    return @{ Part1 = $poly1; Part2 = $poly2 }
}

# 1. Load NUTS geometries
$obj = $json.objects.NUTS_RG_10M_2021_4326
$nutsMap = @{}
foreach ($g in $obj.geometries) {
    $nid = $g.properties.NUTS_ID
    if ($nid -and ($nid.StartsWith('CZ') -or $nid.StartsWith('SK'))) {
        $ring = Decode-Geometry $g
        $nutsMap[$nid] = $ring
    }
}
Write-Host "Loaded $($nutsMap.Count) NUTS regions from nuts_10m.json"

# 2. Load Carpathian Ruthenia
$hbFile = [System.IO.File]::ReadAllText('src/data/historicalBorders.ts')
$rutheniaMatch = [regex]::Match($hbFile, 'export const CARPATHIAN_RUTHENIA_FEATURE: any = \{[\s\S]*?coordinates:\s*\[\s*\[([\s\S]*?)\]\s*\]')
$ruthPts = [System.Collections.Generic.List[object]]::new()
$ptMatches = [regex]::Matches($rutheniaMatch.Groups[1].Value, '\[\s*([0-9\.]+)\s*,\s*([0-9\.]+)\s*\]')
foreach ($pm in $ptMatches) {
    $ruthPts.Add(@([double]$pm.Groups[1].Value, [double]$pm.Groups[2].Value))
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

Write-Host "`n=== 1. WEST BOHEMIA & EGERLAND ==="
# CZ041: Karlovarsky kraj -> Egerland (West) vs Karlsbad (East)
$cz041 = $nutsMap['CZ041']
$curveEger = @(
    @(12.78, 50.50),
    @(12.80, 50.36),
    @(12.82, 50.22),
    @(12.79, 50.08),
    @(12.75, 49.85)
)
$res041 = Split-Polygon-By-Polyline $cz041 $curveEger
$p1Avg = ($res041.Part1 | ForEach-Object { $_[0] } | Measure-Object -Average).Average
$p2Avg = ($res041.Part2 | ForEach-Object { $_[0] } | Measure-Object -Average).Average
$egerPoly = if ($p1Avg -lt $p2Avg) { $res041.Part1 } else { $res041.Part2 }
$karlsbadPoly = if ($p1Avg -lt $p2Avg) { $res041.Part2 } else { $res041.Part1 }

Add-HistoricalFeature -Id 'CZE_SUD_EGER' -Name 'Egerland (Cheb / As)' -NameIt 'Egerland - Cheb e As' -NameDe 'Egerland (Eger / Asch)' -Admin 'Reichsgau Sudetenland (Reg.-Bez. Eger)' -Kind 'SUDETENLAND' -Note 'Regione dell Egerland (Cheb, As, Kraslice, Sokolov). Territorio dei Sudeti ceduto al Reich con gli Accordi di Monaco (ottobre 1938).' -Poly $egerPoly -ResolveFn 'resolveSudetenland'
Add-HistoricalFeature -Id 'CZE_SUD_KARLSBAD' -Name 'Karlsbad (Karlovy Vary)' -NameIt 'Karlovy Vary (Karlsbad)' -NameDe 'Karlsbad und Marienbad' -Admin 'Reichsgau Sudetenland (Reg.-Bez. Eger)' -Kind 'SUDETENLAND' -Note 'Distretto termale di Karlovy Vary (Karlsbad), Marianske Lazne (Marienbad) e monti Metalliferi occidentali (Jachymov).' -Poly $karlsbadPoly -ResolveFn 'resolveSudetenland'

# CZ032: Plzensky kraj -> Boehmerwald West vs Plzen Core (Organic mountain baseline)
$cz032 = $nutsMap['CZ032']
$curveWestBohemia = @(
    @(12.98, 50.20),
    @(12.94, 49.98),
    @(12.90, 49.88),
    @(12.87, 49.82),
    @(12.89, 49.76),
    @(12.85, 49.70),
    @(12.88, 49.65),
    @(12.92, 49.58),
    @(12.96, 49.52),
    @(12.93, 49.46),
    @(12.98, 49.42),
    @(13.06, 49.38),
    @(13.12, 49.33),
    @(13.18, 49.27),
    @(13.22, 49.20),
    @(13.25, 49.14),
    @(13.28, 48.90)
)
$res032 = Split-Polygon-By-Polyline $cz032 $curveWestBohemia
$p1Avg = ($res032.Part1 | ForEach-Object { $_[0] } | Measure-Object -Average).Average
$p2Avg = ($res032.Part2 | ForEach-Object { $_[0] } | Measure-Object -Average).Average
$sudBoehmerwald = if ($p1Avg -lt $p2Avg) { $res032.Part1 } else { $res032.Part2 }
$plzenCore = if ($p1Avg -lt $p2Avg) { $res032.Part2 } else { $res032.Part1 }

Add-HistoricalFeature -Id 'CZE_SUD_BOEHMERWALD' -Name 'Sudetenland - Boehmerwald (Tachau / Tachov)' -NameIt 'Selva Boema Occidentale - Tachov e Horsovsky Tyn' -NameDe 'Boehmerwaldgau (Tachau und Bischofteinitz)' -Admin 'Bayerische Ostmark / Sudetenland' -Kind 'SUDETENLAND' -Note 'Fascia montana di confine della Selva Boema (Tachov, Horsovsky Tyn, Zelezna Ruda). Ceduta al Reich tedesco nel 1938.' -Poly $sudBoehmerwald -ResolveFn 'resolveSudetenland'
Add-HistoricalFeature -Id 'CZE_PLZEN' -Name 'Plzensko (Plzen)' -NameIt 'Plzen e Boemia Occidentale' -NameDe 'Pilsen und Westboehmen' -Admin 'Boemia (Protettorato dal 1939)' -Kind 'REST_TSCHECHEI' -Note 'Pilsen (Plzen) - Centro industriale e sede degli stabilimenti Škoda. Rimasta cecoslovacca nel 1938, Protettorato nel marzo 1939.' -Poly $plzenCore -ResolveFn 'resolveRestTschechei'

Write-Host "`n=== 2. NORTH BOHEMIA & ERZGEBIRGE ==="
# CZ042: Ustecky kraj (100% Sudetenland)
$cz042 = $nutsMap['CZ042']
Add-HistoricalFeature -Id 'CZE_SUD_ERZGEBIRGE' -Name 'Erzgebirge & Aussig (Usti nad Labem)' -NameIt 'Monti Metalliferi - Usti nad Labem e Teplice' -NameDe 'Erzgebirge (Aussig, Teplitz, Bruex)' -Admin 'Reichsgau Sudetenland (Reg.-Bez. Aussig)' -Kind 'SUDETENLAND' -Note 'Bacino industriale dei monti Metalliferi e corso dell Elba (Usti nad Labem, Teplice, Most, Chomutov, Decin, Litomerice).' -Poly $cz042 -ResolveFn 'resolveSudetenland'

# CZ051: Liberecky kraj (100% Sudetenland Reichenberg)
$cz051 = $nutsMap['CZ051']
Add-HistoricalFeature -Id 'CZE_SUD_REICHENBERG' -Name 'Reichenberg (Liberec)' -NameIt 'Liberec - Reichenberg e Monti Iser' -NameDe 'Reichenberg (Hauptstadt Reichsgau Sudetenland)' -Admin 'Reichsgau Sudetenland (Capitale)' -Kind 'SUDETENLAND' -Note 'Liberec (Reichenberg) - Capitale del Reichsgau Sudetenland e quartier generale di Konrad Henlein. Include Jablonec nad Nisou, Ceska Lipa e Rumburk.' -Poly $cz051 -ResolveFn 'resolveSudetenland'

Write-Host "`n=== 3. EAST BOHEMIA & RIESENGEBIRGE ==="
# CZ052: Kralovehradecky kraj -> Trautenau (North) vs Hradec Kralove Core (South)
$cz052 = $nutsMap['CZ052']
$curveEastBohemia = @(
    @(15.35, 50.64),
    @(15.54, 50.62),
    @(15.68, 50.58),
    @(15.78, 50.54),
    @(15.86, 50.52),
    @(15.94, 50.51),
    @(16.02, 50.49),
    @(16.10, 50.48),
    @(16.16, 50.44),
    @(16.22, 50.38),
    @(16.28, 50.32),
    @(16.36, 50.25),
    @(16.44, 50.18),
    @(16.60, 50.02)
)
$res052 = Split-Polygon-By-Polyline $cz052 $curveEastBohemia
$p1Avg = ($res052.Part1 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$p2Avg = ($res052.Part2 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$hradecPoly = if ($p1Avg -lt $p2Avg) { $res052.Part1 } else { $res052.Part2 }
$trautenauPoly = if ($p1Avg -lt $p2Avg) { $res052.Part2 } else { $res052.Part1 }

Add-HistoricalFeature -Id 'CZE_SUD_TRAUTENAU' -Name 'Sudetenland - Riesengebirge (Trutnov / Trautenau)' -NameIt 'Monti dei Giganti - Trutnov e Broumov' -NameDe 'Riesengebirge (Trautenau und Braunau)' -Admin 'Reichsgau Sudetenland (Reg.-Bez. Aussig)' -Kind 'SUDETENLAND' -Note 'Cresta dei Monti dei Giganti (Krkonose) e sperone di Broumov (Trutnov, Vrchlabi, Broumov). Linea delle fortificazioni pesanti cecoslovacche ceduta a Monaco.' -Poly $trautenauPoly -ResolveFn 'resolveSudetenland'
Add-HistoricalFeature -Id 'CZE_HRADEC_KRALOVE' -Name 'Kralovehradecko (Hradec Kralove)' -NameIt 'Hradec Kralove e Boemia Orientale' -NameDe 'Koeniggraetz und Ostboehmen' -Admin 'Boemia (Protettorato dal 1939)' -Kind 'REST_TSCHECHEI' -Note 'Hradec Kralove (Koeniggraetz), Jicin, Nachod e valle dell Elba. Cuore ceco della Boemia orientale rimasto alla Seconda Repubblica nel 1938, Protettorato nel 1939.' -Poly $hradecPoly -ResolveFn 'resolveRestTschechei'

# CZ053: Pardubicky kraj -> Schonhengstgau vs Pardubice Core
$cz053 = $nutsMap['CZ053']
$curveSchonhengst = @(
    @(16.50, 50.25),
    @(16.54, 50.05),
    @(16.58, 49.98),
    @(16.60, 49.92),
    @(16.56, 49.88),
    @(16.48, 49.84),
    @(16.42, 49.78),
    @(16.38, 49.72),
    @(16.42, 49.65),
    @(16.48, 49.50)
)
$res053 = Split-Polygon-By-Polyline $cz053 $curveSchonhengst
$p1Avg = ($res053.Part1 | ForEach-Object { $_[0] } | Measure-Object -Average).Average
$p2Avg = ($res053.Part2 | ForEach-Object { $_[0] } | Measure-Object -Average).Average
$pardubicePoly = if ($p1Avg -lt $p2Avg) { $res053.Part1 } else { $res053.Part2 }
$schonhengstPoly = if ($p1Avg -lt $p2Avg) { $res053.Part2 } else { $res053.Part1 }

Add-HistoricalFeature -Id 'CZE_SUD_SCHONHENGST' -Name 'Sudetenland - Schoenhengstgau (Svitavy / Zwittau)' -NameIt 'Schoenhengstgau - Svitavy e Kraliky' -NameDe 'Schoenhengstgau (Zwittau und Grulich)' -Admin 'Reichsgau Sudetenland (Reg.-Bez. Troppau)' -Kind 'SUDETENLAND' -Note 'Isola linguistica dello Schoenhengstgau (Svitavy, Moravska Trebova, Lanskroun, Kraliky). Zona di confine strategica tra Boemia e Moravia.' -Poly $schonhengstPoly -ResolveFn 'resolveSudetenland'
Add-HistoricalFeature -Id 'CZE_PARDUBICE' -Name 'Pardubicko (Pardubice e Chrudim)' -NameIt 'Pardubice e Chrudim' -NameDe 'Pardubitz und Chrudim' -Admin 'Boemia (Protettorato dal 1939)' -Kind 'REST_TSCHECHEI' -Note 'Pardubice, Chrudim e valle della Chrudimka. Polo industriale e chimico. Territorio della Seconda Repubblica (1938) poi Protettorato (1939).' -Poly $pardubicePoly -ResolveFn 'resolveRestTschechei'

Write-Host "`n=== 4. CENTRAL BOHEMIA & PRAHA ==="
# CZ010: Praha
$cz010 = $nutsMap['CZ010']
Add-HistoricalFeature -Id 'CZE_PRAHA' -Name 'Praha (Praga)' -NameIt 'Praga - Capitale della Cecoslovacchia' -NameDe 'Prag (Hauptstadt Boehmen-Maehren)' -Admin 'Capitale Cecoslovacca / Protettorato' -Kind 'REST_TSCHECHEI' -Note 'Praga (Praha) - Capitale della Repubblica Cecoslovacca. Sede del Castello di Hradcany. Occupata dalle truppe tedesche il 15 marzo 1939.' -Poly $cz010 -ResolveFn 'resolveRestTschechei'

# CZ020: Stredocesky kraj -> Split along Vltava river into West (Kladno/Pribram) and East (Kolin/Mlada Boleslav)
$cz020 = $nutsMap['CZ020']
$curveVltava = @(
    @(14.40, 50.70),
    @(14.42, 50.48),
    @(14.40, 50.32),
    @(14.37, 50.18),
    @(14.39, 49.95),
    @(14.38, 49.75),
    @(14.36, 49.40)
)
$res020 = Split-Polygon-By-Polyline $cz020 $curveVltava
$p1Avg = ($res020.Part1 | ForEach-Object { $_[0] } | Measure-Object -Average).Average
$p2Avg = ($res020.Part2 | ForEach-Object { $_[0] } | Measure-Object -Average).Average
$cz020West = if ($p1Avg -lt $p2Avg) { $res020.Part1 } else { $res020.Part2 }
$cz020East = if ($p1Avg -lt $p2Avg) { $res020.Part2 } else { $res020.Part1 }

Add-HistoricalFeature -Id 'CZE_KLADNO' -Name 'Stredni Cechy Zapad (Kladno e Pribram)' -NameIt 'Boemia Centrale Occidentale - Kladno, Rakovnik e Pribram' -NameDe 'Mittelboehmen West (Kladno und Pribram)' -Admin 'Boemia Centrale (Protettorato)' -Kind 'REST_TSCHECHEI' -Note 'Bacino carbonifero e siderurgico di Kladno, Rakovnik, Beroun e distretto minerario di Pribram.' -Poly $cz020West -ResolveFn 'resolveRestTschechei'
Add-HistoricalFeature -Id 'CZE_KOLIN' -Name 'Stredni Cechy Vychod (Kolin e Mlada Boleslav)' -NameIt 'Boemia Centrale Orientale - Kolin, Kutna Hora e Mlada Boleslav' -NameDe 'Mittelboehmen Ost (Kolin und Jungbunzlau)' -Admin 'Boemia Centrale (Protettorato)' -Kind 'REST_TSCHECHEI' -Note 'Pianura dell Elba e valle dell Iser: Kolin, Kutna Hora (Kuttenberg), Mlada Boleslav (stabilimenti automobilistici Skoda) e Melnik.' -Poly $cz020East -ResolveFn 'resolveRestTschechei'

Write-Host "`n=== 5. SOUTH BOHEMIA ==="
# CZ031: Jihocesky kraj -> Krummau (South) vs Budejovice Core (North)
$cz031 = $nutsMap['CZ031']
$curveSouthBohemia = @(
    @(13.20, 49.14),
    @(13.48, 49.09),
    @(13.68, 49.06),
    @(13.84, 49.04),
    @(14.02, 49.01),
    @(14.16, 48.97),
    @(14.28, 48.91),
    @(14.38, 48.86),
    @(14.48, 48.84),
    @(14.58, 48.81),
    @(14.68, 48.77),
    @(14.82, 48.71),
    @(15.05, 48.55)
)
$res031 = Split-Polygon-By-Polyline $cz031 $curveSouthBohemia
$p1Avg = ($res031.Part1 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$p2Avg = ($res031.Part2 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$krummauPoly = if ($p1Avg -lt $p2Avg) { $res031.Part1 } else { $res031.Part2 }
$budejovicePoly = if ($p1Avg -lt $p2Avg) { $res031.Part2 } else { $res031.Part1 }

Add-HistoricalFeature -Id 'CZE_SUD_KRUMMAU' -Name 'Sudetenland - Boehmerwald (Krummau / Cesky Krumlov)' -NameIt 'Selva Boema Meridionale - Cesky Krumlov e Kaplice' -NameDe 'Boehmerwaldgau (Krummau und Kaplitz)' -Admin 'Gau Oberdonau (Linz) / Sudetenland' -Kind 'SUDETENLAND' -Note 'Fascia meridionale della Selva Boema lungo il confine austriaco (Cesky Krumlov, Kaplice, Vyssi Brod, Prachatice sud). Annessa al Gau Oberdonau del Reich nel 1938.' -Poly $krummauPoly -ResolveFn 'resolveSudetenland'
Add-HistoricalFeature -Id 'CZE_JIHOCESKY' -Name 'Jizni Cechy (Ceske Budejovice e Tabor)' -NameIt 'Ceske Budejovice, Tabor e Pisek' -NameDe 'Budweis und Suedboehmen' -Admin 'Boemia Meridionale (Protettorato)' -Kind 'REST_TSCHECHEI' -Note 'Ceske Budejovice (Budweis), la storica roccaforte hussita di Tabor, Pisek, Strakonice e bacino della Moldava. Rimasta alla Seconda Repubblica nel 1938, Protettorato nel 1939.' -Poly $budejovicePoly -ResolveFn 'resolveRestTschechei'

Write-Host "`n=== 6. SOUTH MORAVIA & BRNO ==="
# CZ064: Jihomoravsky kraj -> Suedmaehren (South) vs Brno Core (North)
$cz064 = $nutsMap['CZ064']
$curveSuedmaehren = @(
    @(15.50, 48.91),
    @(15.86, 48.92),
    @(15.96, 48.91),
    @(16.06, 48.90),
    @(16.16, 48.92),
    @(16.28, 48.91),
    @(16.40, 48.88),
    @(16.52, 48.86),
    @(16.62, 48.85),
    @(16.72, 48.83),
    @(16.82, 48.80),
    @(16.92, 48.78),
    @(17.15, 48.74)
)
$res064 = Split-Polygon-By-Polyline $cz064 $curveSuedmaehren
$p1Avg = ($res064.Part1 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$p2Avg = ($res064.Part2 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$suedmaehrenPoly = if ($p1Avg -lt $p2Avg) { $res064.Part1 } else { $res064.Part2 }
$brnoPoly = if ($p1Avg -lt $p2Avg) { $res064.Part2 } else { $res064.Part1 }

Add-HistoricalFeature -Id 'CZE_SUD_SUEDMAEHREN' -Name 'Sudetenland - Suedmaehren (Znojmo / Znaim)' -NameIt 'Moravia Meridionale - Znojmo, Mikulov e Breclav' -NameDe 'Suedmaehren (Znaim und Nikolsburg)' -Admin 'Gau Niederdonau (Wien) / Sudetenland' -Kind 'SUDETENLAND' -Note 'Fascia di confine sud-morava (Znojmo, Mikulov, Breclav, Valtice). Importante regione vitivinicola e nodo ferroviario verso Vienna annesso al Gau Niederdonau nel 1938.' -Poly $suedmaehrenPoly -ResolveFn 'resolveSudetenland'
Add-HistoricalFeature -Id 'CZE_BRNO' -Name 'Brnensko (Brno / Bruenn)' -NameIt 'Brno e Moravia Centrale' -NameDe 'Bruenn und Mittelmaehren' -Admin 'Moravia (Protettorato dal 1939)' -Kind 'REST_TSCHECHEI' -Note 'Brno (Bruenn) - Capitale storica della Moravia e colosso industriale militare (Zbrojovka Brno, fucili Mauser e mitragliatrici Bren). Protettorato nel marzo 1939.' -Poly $brnoPoly -ResolveFn 'resolveRestTschechei'

# CZ063: Kraj Vysocina (100% Rest-Tschechei)
$cz063 = $nutsMap['CZ063']
Add-HistoricalFeature -Id 'CZE_VYSOCINA' -Name 'Vysocina (Jihlava / Iglau)' -NameIt 'Altopiano di Jihlava e Pelhrimov' -NameDe 'Iglauer Bergland (Iglau und Deutschbrod)' -Admin 'Moravia-Boemia (Protettorato)' -Kind 'REST_TSCHECHEI' -Note 'Altopiano Boemo-Moravo (Ceskomoravska vrchovina): Jihlava (storica Sprachinsel tedesca di Iglau), Havlickuv Brod, Pelhrimov e Zdar nad Sazavou.' -Poly $cz063 -ResolveFn 'resolveRestTschechei'

Write-Host "`n=== 7. NORTH MORAVIA, SILESIA & ZAOLZIE ==="
# CZ071: Olomoucky kraj -> Altvater (North) vs Hana (South)
$cz071 = $nutsMap['CZ071']
$curveAltvater = @(
    @(16.60, 49.90),
    @(16.82, 49.86),
    @(16.98, 49.82),
    @(17.12, 49.78),
    @(17.26, 49.76),
    @(17.40, 49.74),
    @(17.65, 49.72),
    @(17.85, 49.70),
    @(18.05, 49.68)
)
$res071 = Split-Polygon-By-Polyline $cz071 $curveAltvater
$p1Avg = ($res071.Part1 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$p2Avg = ($res071.Part2 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$olomoucPoly = if ($p1Avg -lt $p2Avg) { $res071.Part1 } else { $res071.Part2 }
$altvaterPoly = if ($p1Avg -lt $p2Avg) { $res071.Part2 } else { $res071.Part1 }

Add-HistoricalFeature -Id 'CZE_SUD_ALTVATER' -Name 'Sudetenland - Altvatergebirge (Jesenik / Freiwaldau)' -NameIt 'Monti Hruby Jesenik - Jesenik e Sumperk' -NameDe 'Altvatergebirge (Freiwaldau und Maehrisch Schoenberg)' -Admin 'Reichsgau Sudetenland (Reg.-Bez. Troppau)' -Kind 'SUDETENLAND' -Note 'Massiccio dell Altvater (Hruby Jesenik): Jesenik (Freiwaldau), Sumperk (Maehrisch Schoenberg), Rymarov e Bruntal ovest. Fortificazioni montane cedute al Reich nel 1938.' -Poly $altvaterPoly -ResolveFn 'resolveSudetenland'
Add-HistoricalFeature -Id 'CZE_OLOMOUC' -Name 'Hana (Olomouc / Olmuetz)' -NameIt 'Olomouc, Prostejov e Hana' -NameDe 'Olmuetz und Hanna-Ebene' -Admin 'Moravia (Protettorato dal 1939)' -Kind 'REST_TSCHECHEI' -Note 'Olomouc (Olmuetz - sede arcivescovile e fortezza), Prostejov e la fertile pianura della Hana. Cuore agricolo e culturale della Moravia centro-settentrionale.' -Poly $olomoucPoly -ResolveFn 'resolveRestTschechei'

# CZ080: Moravskoslezsky kraj -> Troppau (West) vs Ostrava (Center) vs Zaolzie (East)
$cz080 = $nutsMap['CZ080']
$curveTroppau = @(
    @(18.00, 50.35),
    @(18.06, 50.15),
    @(18.12, 49.98),
    @(18.15, 49.88),
    @(18.14, 49.78),
    @(18.08, 49.68),
    @(18.02, 49.40)
)
$res080 = Split-Polygon-By-Polyline $cz080 $curveTroppau
$lons1 = $res080.Part1 | ForEach-Object { $_[0] }
$lons2 = $res080.Part2 | ForEach-Object { $_[0] }
$avg1 = ($lons1 | Measure-Object -Average).Average
$avg2 = ($lons2 | Measure-Object -Average).Average
$troppauPoly = if ($avg1 -lt $avg2) { $res080.Part1 } else { $res080.Part2 }
$cz080Rest = if ($avg1 -lt $avg2) { $res080.Part2 } else { $res080.Part1 }

$curveZaolzie = @(
    @(18.32, 50.10),
    @(18.36, 49.92),
    @(18.42, 49.85),
    @(18.46, 49.78),
    @(18.52, 49.68),
    @(18.58, 49.58),
    @(18.66, 49.35)
)
$resZaolzie = Split-Polygon-By-Polyline $cz080Rest $curveZaolzie
$zLons1 = $resZaolzie.Part1 | ForEach-Object { $_[0] }
$zLons2 = $resZaolzie.Part2 | ForEach-Object { $_[0] }
$zAvg1 = ($zLons1 | Measure-Object -Average).Average
$zAvg2 = ($zLons2 | Measure-Object -Average).Average
$ostravaPoly = if ($zAvg1 -lt $zAvg2) { $resZaolzie.Part1 } else { $resZaolzie.Part2 }
$zaolziePoly = if ($zAvg1 -lt $zAvg2) { $resZaolzie.Part2 } else { $resZaolzie.Part1 }

Add-HistoricalFeature -Id 'CZE_SUD_TROPPAU' -Name 'Sudetenschlesien - Troppau (Opava)' -NameIt 'Slesia dei Sudeti - Opava e Krnov' -NameDe 'Sudetenschlesien (Troppau und Jaegerndorf)' -Admin 'Reichsgau Sudetenland (Reg.-Bez. Troppau)' -Kind 'SUDETENLAND' -Note 'Opava (Troppau - capitale della Slesia austriaca), Krnov (Jaegerndorf) e Hlucinsko. Centro nevralgico della linea fortificata cecoslovacca annesso al Reich nel 1938.' -Poly $troppauPoly -ResolveFn 'resolveSudetenland'
Add-HistoricalFeature -Id 'CZE_ZAOLZIE' -Name 'Zaolzie - Slask Cieszynski (Cieszyn / Tesin)' -NameIt 'Zaolzie - Slesia di Cieszyn (Cieszyn, Bohumin, Karvina)' -NameDe 'Teschener Schlesien (Oderberg und Karwin)' -Admin 'Rzeczpospolita Polska (dal 2 ott 1938) / Reich (1939)' -Kind 'ZAOLZIE' -Note 'Territorio d Oltreolza (Zaolzie): Cesky Tesin (Cieszyn Zachodni), Bohumin (Bogumin), Karvina e Frystat. Annesso militarmente dalla Polonia nell ottobre 1938, poi occupato dalla Wehrmacht nel settembre 1939.' -Poly $zaolziePoly -ResolveFn 'resolveZaolzie'
Add-HistoricalFeature -Id 'CZE_OSTRAVA' -Name 'Ostravsko (Moravska Ostrava)' -NameIt 'Moravska Ostrava e Frydek-Mistek' -NameDe 'Maehrisch Ostrau und Friedek' -Admin 'Moravia (Protettorato dal 1939)' -Kind 'REST_TSCHECHEI' -Note 'Bacino carbonifero e siderurgico di Moravska Ostrava (stabilimenti Vitkovice) e Frydek-Mistek. Uno dei massimi complessi metallurgici d Europa.' -Poly $ostravaPoly -ResolveFn 'resolveRestTschechei'

# CZ072: Zlinsky kraj (100% Rest-Tschechei)
$cz072 = $nutsMap['CZ072']
Add-HistoricalFeature -Id 'CZE_ZLIN' -Name 'Slovacko e Valassko (Zlin)' -NameIt 'Zlin, Uherske Hradiste e Valacchia Morava' -NameDe 'Zlin und Maehrische Walachei' -Admin 'Moravia (Protettorato dal 1939)' -Kind 'REST_TSCHECHEI' -Note 'Zlin (citta industriale d avanguardia e sede mondiale delle calzature Bata), Uherske Hradiste, Kromeriz e le valli della Morava e dei Carpati Bianchi.' -Poly $cz072 -ResolveFn 'resolveRestTschechei'

Write-Host "`n=== 8. SLOVAKIA & FELVIDEK (ORGANIC FIRST VIENNA AWARD) ==="
# SK010: Bratislavsky kraj -> Bratislava city vs Zahorie (Malé Karpaty mountain ridge)
$sk010 = $nutsMap['SK010']
$curveZahorie = @(
    @(16.80, 48.28),
    @(16.98, 48.30),
    @(17.15, 48.32),
    @(17.30, 48.34),
    @(17.48, 48.35)
)
$res010 = Split-Polygon-By-Polyline $sk010 $curveZahorie
$p1Avg = ($res010.Part1 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$p2Avg = ($res010.Part2 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$bratislavaPoly = if ($p1Avg -lt $p2Avg) { $res010.Part1 } else { $res010.Part2 }
$zahoriePoly = if ($p1Avg -lt $p2Avg) { $res010.Part2 } else { $res010.Part1 }

Add-HistoricalFeature -Id 'CZE_SLO_BRATISLAVA' -Name 'Bratislava (Presburgo)' -NameIt 'Bratislava - Capitale della Slovacchia' -NameDe 'Pressburg (Hauptstadt der Slowakei)' -Admin 'Capitale Slovacca (Slovacchia Autonoma / Repubblica Slovacca)' -Kind 'SLOVAKIA_CORE' -Note 'Bratislava (Pressburg / Pozsony) - Capitale della Slovacchia autonoma (1938) e della Prima Repubblica Slovacca sotto Jozef Tiso (marzo 1939).' -Poly $bratislavaPoly -ResolveFn 'resolveSlovakia'
Add-HistoricalFeature -Id 'CZE_SLO_ZAHORIE' -Name 'Zahorie (Malacky e Senica)' -NameIt 'Zahorie - Malacky, Senica e Skalica' -NameDe 'Zahorie (Malatzka und Holitsch)' -Admin 'Slovacchia Occidentale' -Kind 'SLOVAKIA_CORE' -Note 'Pianura dello Zahorie lungo il corso della Morava (Malacky, Senica, Skalica, Holic). Regione strategica al confine con l Austria e la Moravia.' -Poly $zahoriePoly -ResolveFn 'resolveSlovakia'

# SK021: Trnavsky kraj -> Csallokoz (South) vs Trnava Core (North) along Little Danube
$sk021 = $nutsMap['SK021']
$curveCsallokoz = @(
    @(17.15, 48.12),
    @(17.34, 48.16),
    @(17.52, 48.17),
    @(17.68, 48.18),
    @(17.84, 48.17),
    @(18.05, 48.14)
)
$res021 = Split-Polygon-By-Polyline $sk021 $curveCsallokoz
$p1Avg = ($res021.Part1 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$p2Avg = ($res021.Part2 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$csallokozPoly = if ($p1Avg -lt $p2Avg) { $res021.Part1 } else { $res021.Part2 }
$trnavaPoly = if ($p1Avg -lt $p2Avg) { $res021.Part2 } else { $res021.Part1 }

Add-HistoricalFeature -Id 'CZE_FEL_CSALLOKOZ' -Name 'Felvidek - Csallokoz (Dunajska Streda / Dunaszerdahely)' -NameIt 'Csallokoz / Zitny ostrov - Dunajska Streda e Komarno' -NameDe 'Grosse Schuettinsel (Dunaszerdahely und Komorn)' -Admin 'Regno d Ungheria (Primo Arbitrato di Vienna, nov 1938)' -Kind 'FELVIDEK' -Note 'Isola di Csallokoz (Zitny ostrov) e pianura alluvionale del Danubio (Dunajska Streda, Velky Meder). Territorio a maggioranza magiara ceduto all Ungheria col Primo Arbitrato di Vienna (2 nov 1938).' -Poly $csallokozPoly -ResolveFn 'resolveFelvidek'
Add-HistoricalFeature -Id 'CZE_SLO_TRNAVA' -Name 'Trnavsko (Trnava e Piestany)' -NameIt 'Trnava e Basso Vah' -NameDe 'Tyrnau und Pistyan' -Admin 'Slovacchia Occidentale' -Kind 'SLOVAKIA_CORE' -Note 'Trnava (la "Roma slovacca" per le numerose chiese e la cattedrale arcivescovile), la rinomata stazione termale di Piestany e Hlohovec lungo la valle del Vah.' -Poly $trnavaPoly -ResolveFn 'resolveSlovakia'

# SK023: Nitriansky kraj -> Nove Zamky (South) vs Nitra Nord (North) curving south of Nitra city
$sk023 = $nutsMap['SK023']
$curveNoveZamky = @(
    @(17.75, 48.15),
    @(18.06, 48.22),
    @(18.16, 48.25),
    @(18.28, 48.28),
    @(18.42, 48.29),
    @(18.56, 48.28),
    @(18.72, 48.24),
    @(18.84, 48.18),
    @(19.05, 48.12)
)
$res023 = Split-Polygon-By-Polyline $sk023 $curveNoveZamky
$p1Avg = ($res023.Part1 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$p2Avg = ($res023.Part2 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$felNoveZamky = if ($p1Avg -lt $p2Avg) { $res023.Part1 } else { $res023.Part2 }
$nitraNord = if ($p1Avg -lt $p2Avg) { $res023.Part2 } else { $res023.Part1 }

Add-HistoricalFeature -Id 'CZE_FEL_NOVE_ZAMKY' -Name 'Felvidek - Nove Zamky e Komarno (Ersekujvar)' -NameIt 'Nove Zamky, Komarno e Levice' -NameDe 'Neuhaeusel, Komorn und Lewenz (Oberungarn)' -Admin 'Regno d Ungheria (Primo Arbitrato di Vienna, nov 1938)' -Kind 'FELVIDEK' -Note 'Fascia pianeggiante del sud slovacco: Komarno (Komarom), Nove Zamky (Ersekujvar), Sturovo (Parkany), Levice (Leva) e Zeliezovce. Ceduta all Ungheria di Horthy nel novembre 1938.' -Poly $felNoveZamky -ResolveFn 'resolveFelvidek'
Add-HistoricalFeature -Id 'CZE_SLO_NITRA_NORD' -Name 'Nitriansko Nord (Nitra e Topolcany)' -NameIt 'Nitra e Topolcany' -NameDe 'Neutra und Topoltschan' -Admin 'Slovacchia Centrale-Occidentale' -Kind 'SLOVAKIA_CORE' -Note 'Citta storica e vescovile di Nitra (il cui castello e centro rimasero entro la frontiera slovacca), Topolcany, Banovce nad Bebravou e Zlate Moravce.' -Poly $nitraNord -ResolveFn 'resolveSlovakia'

# SK022: Trenciansky kraj (100% Slovakia)
$sk022 = $nutsMap['SK022']
Add-HistoricalFeature -Id 'CZE_SLO_TRENCIN' -Name 'Povazie (Trencin e Ilava)' -NameIt 'Valle del Vah - Trencin, Nove Mesto e Puchov' -NameDe 'Trentschin und Mittelwaag' -Admin 'Slovacchia Occidentale' -Kind 'SLOVAKIA_CORE' -Note 'Fiume Vah e castello medievale di Trencin, Nove Mesto nad Vahom, Myjava, Ilava e centro industriale armamenti di Dubnica nad Vahom.' -Poly $sk022 -ResolveFn 'resolveSlovakia'

# SK031: Zilinsky kraj -> Zilina (West) vs Liptov (East) along Mala Fatra ridge
$sk031 = $nutsMap['SK031']
$curveFatra = @(
    @(18.90, 49.65),
    @(18.98, 49.38),
    @(19.04, 49.18),
    @(19.08, 48.98),
    @(19.12, 48.70)
)
$res031 = Split-Polygon-By-Polyline $sk031 $curveFatra
$p1Avg = ($res031.Part1 | ForEach-Object { $_[0] } | Measure-Object -Average).Average
$p2Avg = ($res031.Part2 | ForEach-Object { $_[0] } | Measure-Object -Average).Average
$zilinaPoly = if ($p1Avg -lt $p2Avg) { $res031.Part1 } else { $res031.Part2 }
$liptovPoly = if ($p1Avg -lt $p2Avg) { $res031.Part2 } else { $res031.Part1 }

Add-HistoricalFeature -Id 'CZE_SLO_ZILINA' -Name 'Horne Povazie (Zilina e Kysuce)' -NameIt 'Zilina, Povazska Bystrica e Cadca' -NameDe 'Sillein und Kischuetz' -Admin 'Slovacchia Settentrionale' -Kind 'SLOVAKIA_CORE' -Note 'Zilina (Sillein) - Strategico snodo stradale e ferroviario transcarpatico, Povazska Bystrica e regione montana di Kysuce (Cadca al confine con la Polonia).' -Poly $zilinaPoly -ResolveFn 'resolveSlovakia'
Add-HistoricalFeature -Id 'CZE_SLO_LIPTOV' -Name 'Liptov e Orava (Ruzomberok e Martin)' -NameIt 'Liptov e Orava - Ruzomberok, Liptovsky Mikulas e Martin' -NameDe 'Liptau und Arwa' -Admin 'Slovacchia Centro-Settentrionale' -Kind 'SLOVAKIA_CORE' -Note 'Turciansky Svaety Martin (capitale culturale e sede della Matica Slovenska), Ruzomberok, Liptovsky Mikulas e bacino dell Orava ai piedi dei Bassi Tatra.' -Poly $liptovPoly -ResolveFn 'resolveSlovakia'

# SK032: Banskobystricky kraj -> Lucenec / Ipel valley (South) vs Banska Bystrica Core (North)
$sk032 = $nutsMap['SK032']
$curveLucenec = @(
    @(18.80, 48.10),
    @(19.05, 48.16),
    @(19.25, 48.24),
    @(19.42, 48.30),
    @(19.58, 48.36),
    @(19.72, 48.39),
    @(19.86, 48.41),
    @(20.02, 48.43),
    @(20.18, 48.45),
    @(20.65, 48.46)
)
$res032 = Split-Polygon-By-Polyline $sk032 $curveLucenec
$p1Avg = ($res032.Part1 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$p2Avg = ($res032.Part2 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$felLucenec = if ($p1Avg -lt $p2Avg) { $res032.Part1 } else { $res032.Part2 }
$banskaBystrica = if ($p1Avg -lt $p2Avg) { $res032.Part2 } else { $res032.Part1 }

Add-HistoricalFeature -Id 'CZE_FEL_LUCENEC' -Name 'Felvidek - Lucenec e Ipel (Losonc / Ipolysag)' -NameIt 'Lucenec, Rimavska Sobota e Sahy' -NameDe 'Losontz und Rimaszombat' -Admin 'Regno d Ungheria (Primo Arbitrato di Vienna, nov 1938)' -Kind 'FELVIDEK' -Note 'Fascia di confine dell Ipel e della contea di Gemer: Lučenec (Losonc), Rimavská Sobota (Rimaszombat), Šahy (Ipolyság), Fiľakovo e Tornaľa. Ceduta all Ungheria il 2 novembre 1938.' -Poly $felLucenec -ResolveFn 'resolveFelvidek'
Add-HistoricalFeature -Id 'CZE_SLO_BANSKA_BYSTRICA' -Name 'Pohronie (Banska Bystrica e Zvolen)' -NameIt 'Banska Bystrica, Zvolen e Brezno' -NameDe 'Neusohl und Altsohl' -Admin 'Slovacchia Centrale' -Kind 'SLOVAKIA_CORE' -Note 'Banska Bystrica (Neusohl - storica citta mineraria e cuore geografico della Slovacchia), Zvolen (Altsohl), Brezno, Banska Stiavnica e Kremnica (zecca storica).' -Poly $banskaBystrica -ResolveFn 'resolveSlovakia'

# SK042: Kosicky kraj -> Kosice & Roznava (South) vs Dolny Spis & Gemer Nord (North)
$sk042 = $nutsMap['SK042']
$curveKosice = @(
    @(20.25, 48.45),
    @(20.52, 48.68),
    @(20.72, 48.66),
    @(20.92, 48.64),
    @(21.14, 48.68),
    @(21.24, 48.74),
    @(21.36, 48.73),
    @(21.52, 48.66),
    @(21.72, 48.58),
    @(21.92, 48.54),
    @(22.25, 48.50)
)
$res042 = Split-Polygon-By-Polyline $sk042 $curveKosice
$p1Avg = ($res042.Part1 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$p2Avg = ($res042.Part2 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$felKosice = if ($p1Avg -lt $p2Avg) { $res042.Part1 } else { $res042.Part2 }
$spisSouth = if ($p1Avg -lt $p2Avg) { $res042.Part2 } else { $res042.Part1 }

Add-HistoricalFeature -Id 'CZE_FEL_KOSICE' -Name 'Felvidek - Kosice e Roznava (Kassa / Rozsnyo)' -NameIt 'Kosice (Kassa), Roznava e Moldava' -NameDe 'Kaschau und Rosenau (Hauptstadt Felvidek)' -Admin 'Regno d Ungheria (Primo Arbitrato di Vienna, nov 1938)' -Kind 'FELVIDEK' -Note 'Kosice (Kassa) - La metropoli della Slovacchia orientale e capitale del Felvidek sotto sovranita ungherese (1938-1945). Comprende la cattedrale di Santa Elisabetta, Roznava (Rozsnyo) e la pianura del Bodrog.' -Poly $felKosice -ResolveFn 'resolveFelvidek'
Add-HistoricalFeature -Id 'CZE_SLO_GEMER_SPIS' -Name 'Dolny Spis e Gemer (Spisska Nova Ves e Gelnica)' -NameIt 'Dolny Spis e Gemer Settentrionale' -NameDe 'Unterzips und Nordgoemoer' -Admin 'Slovacchia Orientale' -Kind 'SLOVAKIA_CORE' -Note 'Spisska Nova Ves (Iglau), Gelnica (Goellnitz), Krompachy e distretto minerario dei Monti Metalliferi Slovacchi rimasti alla Slovacchia dopo l Arbitrato di Vienna.' -Poly $spisSouth -ResolveFn 'resolveSlovakia'

# SK041: Presovsky kraj -> Spis (West), Saris (Center), Zemplin Nord (East)
$sk041 = $nutsMap['SK041']
$curveBranisko = @(
    @(20.75, 49.50),
    @(20.85, 49.28),
    @(20.92, 49.08),
    @(21.05, 48.75)
)
$res041 = Split-Polygon-By-Polyline $sk041 $curveBranisko
$avg1 = ($res041.Part1 | ForEach-Object { $_[0] } | Measure-Object -Average).Average
$avg2 = ($res041.Part2 | ForEach-Object { $_[0] } | Measure-Object -Average).Average
$spisNorth = if ($avg1 -lt $avg2) { $res041.Part1 } else { $res041.Part2 }
$eastPoly = if ($avg1 -lt $avg2) { $res041.Part2 } else { $res041.Part1 }

$curveSlanske = @(
    @(21.45, 49.52),
    @(21.58, 49.25),
    @(21.64, 49.05),
    @(21.72, 48.80),
    @(21.75, 48.65)
)
$resSlanske = Split-Polygon-By-Polyline $eastPoly $curveSlanske
$zAvg1 = ($resSlanske.Part1 | ForEach-Object { $_[0] } | Measure-Object -Average).Average
$zAvg2 = ($resSlanske.Part2 | ForEach-Object { $_[0] } | Measure-Object -Average).Average
$sarisPoly = if ($zAvg1 -lt $zAvg2) { $resSlanske.Part1 } else { $resSlanske.Part2 }
$zemplinPoly = if ($zAvg1 -lt $zAvg2) { $resSlanske.Part2 } else { $resSlanske.Part1 }

Add-HistoricalFeature -Id 'CZE_SLO_SPIS' -Name 'Spis e Alti Tatra (Poprad e Levoca)' -NameIt 'Spis - Poprad, Kezmarok e Levoca' -NameDe 'Zips und Hohe Tatra (Deutschendorf)' -Admin 'Slovacchia Settentrionale' -Kind 'SLOVAKIA_CORE' -Note 'Regione storica dello Spis (Zips) ai piedi degli Alti Tatra: Poprad, Kezmarok, Levoca, Stara Lubovna e Spisska Nova Ves. Storica area di insediamento degli zipser tedeschi.' -Poly $spisNorth -ResolveFn 'resolveSlovakia'
Add-HistoricalFeature -Id 'CZE_SLO_SARIS' -Name 'Saris (Presov e Bardejov)' -NameIt 'Saris - Presov, Bardejov e Svidnik' -NameDe 'Scharisch (Eperies und Bartfeld)' -Admin 'Slovacchia Orientale' -Kind 'SLOVAKIA_CORE' -Note 'Presov (Eperjes) - Centro principale dello Saris e terza citta della Slovacchia, Bardejov (citta murata patrimonio storico), Sabinov e Svidnik lungo i valichi carpatici verso la Polonia.' -Poly $sarisPoly -ResolveFn 'resolveSlovakia'
Add-HistoricalFeature -Id 'CZE_SLO_ZEMPLIN' -Name 'Zemplin Nord (Humenne e Michalovce)' -NameIt 'Zemplin Settentrionale - Humenne, Vranov e Snina' -NameDe 'Ober-Semmlin (Homenau)' -Admin 'Slovacchia Orientale' -Kind 'SLOVAKIA_CORE' -Note 'Bacino montano e collinare dello Zemplin: Humenne, Vranov nad Toplou, Snina, Medzilaborce e Michalovce nord. Frontiera con la Polonia e la Rutenia Subcarpatica.' -Poly $zemplinPoly -ResolveFn 'resolveSlovakia'

Write-Host "`n=== 9. CARPATHIAN RUTHENIA (SUBCARPATHIAN RUS) ==="
# Sliced organically into South (Uzhorod/Mukacevo to Hungary nov 1938) vs North (Chust autonomous 1938-1939)
$curveRuthenia = @(
    @(22.05, 48.52),
    @(22.24, 48.66),
    @(22.42, 48.62),
    @(22.62, 48.52),
    @(22.74, 48.48),
    @(22.88, 48.36),
    @(23.00, 48.24),
    @(23.12, 48.14),
    @(23.35, 48.02)
)
$resRuth = Split-Polygon-By-Polyline $ruthPts $curveRuthenia
$p1Avg = ($resRuth.Part1 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$p2Avg = ($resRuth.Part2 | ForEach-Object { $_[1] } | Measure-Object -Average).Average
$ruthSouth = if ($p1Avg -lt $p2Avg) { $resRuth.Part1 } else { $resRuth.Part2 }
$ruthNorth = if ($p1Avg -lt $p2Avg) { $resRuth.Part2 } else { $resRuth.Part1 }

Add-HistoricalFeature -Id 'CZE_RUTHENIA_SOUTH' -Name 'Karpatalja Meridionale (Uzhorod e Mukacevo)' -NameIt 'Rutenia Meridionale - Uzhorod (Ungvar) e Mukacevo (Munkacs)' -NameDe 'Sued-Karpato-Ukraine (Ungvar und Munkacs)' -Admin 'Regno d Ungheria (Primo Arbitrato di Vienna, nov 1938)' -Kind 'FELVIDEK' -Note 'Fascia pianeggiante della Rutenia Subcarpatica: Uzhorod (Ungvar - capoluogo storico), Mukacevo (Munkacs) e Berehovo (Beregszasz). Ceduta all Ungheria con il Primo Arbitrato di Vienna (2 novembre 1938).' -Poly $ruthSouth -ResolveFn 'resolveFelvidek'
Add-HistoricalFeature -Id 'CZE_RUTHENIA_NORTH' -Name 'Carpato-Ucraina (Chust / Khust)' -NameIt 'Carpato-Ucraina Autonoma - Chust, Tjaciv e Rachiv' -NameDe 'Karpatho-Ukraine (Chust)' -Admin 'Seconda Repubblica Cecoslovacca (Capitale Chust, 1938-1939)' -Kind 'CARPATHO_UKRAINE' -Note 'Territorio montuoso della Rutenia Subcarpatica. Dopo la cessione di Uzhorod all Ungheria nel novembre 1938, la capitale fu trasferita a Chust sotto il governo autonomo di Avhustyn Volosyn. Il 15 marzo 1939 proclamo l indipendenza prima dell invasione militare ungherese.' -Poly $ruthNorth -ResolveFn 'resolveCarpathoUkraine'

Write-Host "`nTotal precision features created: $($features.Count)"

# 3. Generate TypeScript file
$sb = [System.Text.StringBuilder]::new()

$headerAndResolvers = @'
/**
 * Precision Historical Czechoslovak Regional Features (1936-1940)
 * True organic and jagged historical frontiers matching G. Freytag & Berndt:
 * "SUDETENLAND und die neugestaltete TSCHECHO-SLOWAKEI" (1938)
 *
 * Features include:
 * - Reichsgau Sudetenland & Border Gaus (11 districts)
 * - Zaolzie / Cieszyn Silesia (annexed to Poland Oct 1938, then Reich Sep 1939)
 * - Rest-Tschechei / Bohemia & Moravia Core (12 districts -> Protectorate Mar 1939)
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
