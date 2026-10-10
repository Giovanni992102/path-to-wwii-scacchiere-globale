$json = Get-Content 'public/data/nuts_10m.json' -Raw | ConvertFrom-Json
$geoms = $json.objects.NUTS_RG_10M_2021_4326.geometries
$cz_sk = $geoms | Where-Object { $_.properties.CNTR_CODE -in 'CZ', 'SK' -or $_.properties.NUTS_ID -like 'CZ*' -or $_.properties.NUTS_ID -like 'SK*' }

Write-Host "Total CZ & SK geometries: $($cz_sk.Count)"
foreach ($g in $cz_sk) {
    Write-Host "$($g.properties.NUTS_ID) | $($g.properties.NAME_LATN) | $($g.type)"
}
