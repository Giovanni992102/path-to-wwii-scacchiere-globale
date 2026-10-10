$json = Get-Content 'public/data/nuts_10m.json' -Raw | ConvertFrom-Json
$objKey = $json.objects.psobject.properties.Name[0]
$geoms = $json.objects.$objKey.geometries
$cz = $geoms | Where-Object { $_.properties.NUTS_ID -like 'CZ*' }
$sk = $geoms | Where-Object { $_.properties.NUTS_ID -like 'SK*' }

Write-Host "CZ geometries: $($cz.Count)"
foreach ($g in $cz) {
    Write-Host "$($g.properties.NUTS_ID): $($g.arcs | ConvertTo-Json -Compress)"
}
