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

$obj = $json.objects.NUTS_RG_10M_2021_4326
$cz = $obj.geometries | Where-Object { $_.properties.NUTS_ID -like 'CZ*' }
Write-Host "Decoding CZ010..."
$cz010 = $cz | Where-Object { $_.properties.NUTS_ID -eq 'CZ010' }
$ring0 = Decode-Ring $cz010.arcs[0]
Write-Host "CZ010 decoded successfully! Vertex count: $($ring0.Count)"
Write-Host "First 3 vertices: $($ring0[0][0]),$($ring0[0][1]) | $($ring0[1][0]),$($ring0[1][1]) | $($ring0[2][0]),$($ring0[2][1])"
