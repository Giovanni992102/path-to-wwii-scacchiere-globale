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
    $x = 0
    $y = 0
    foreach ($pt in $rawArc) {
        $x += $pt[0]
        $y += $pt[1]
        $lon = [Math]::Round($x * $scale[0] + $translate[0], 6)
        $lat = [Math]::Round($y * $scale[1] + $translate[1], 6)
        $pts += ,@($lon, $lat)
    }
    if ($isReversed) {
        [Array]::Reverse($pts)
    }
    return ,$pts
}

function Decode-Ring($ringArcs) {
    $ring = @()
    foreach ($a in $ringArcs) {
        $arcPts = Decode-Arc $a
        if ($ring.Count -gt 0) {
            $arcPts = $arcPts | Select-Object -Skip 1
        }
        $ring += $arcPts
    }
    return ,$ring
}

function Decode-Polygon($polyArcs) {
    $poly = @()
    foreach ($ringArcs in $polyArcs) {
        $poly += ,(Decode-Ring $ringArcs)
    }
    return ,$poly
}

$obj = $json.objects.NUTS_RG_10M_2021_4326
$cz_sk = $obj.geometries | Where-Object { $_.properties.NUTS_ID -like 'CZ*' -or $_.properties.NUTS_ID -like 'SK*' }

Write-Host "Total regions: $($cz_sk.Count)"
foreach ($g in $cz_sk) {
    $type = $g.type
    $id = $g.properties.NUTS_ID
    $name = $g.properties.NAME_LATN
    if ($type -eq 'Polygon') {
        $poly = Decode-Polygon $g.arcs
        Write-Host "$id ($name): Polygon, $($poly[0].Count) vertices"
    } elseif ($type -eq 'MultiPolygon') {
        $mp = @()
        foreach ($polyArcs in $g.arcs) {
            $mp += ,(Decode-Polygon $polyArcs)
        }
        Write-Host "$id ($name): MultiPolygon, $($mp.Count) parts"
    }
}
