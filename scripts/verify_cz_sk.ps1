$json = Get-Content 'public/data/nuts_10m.json' -Raw | ConvertFrom-Json
$obj = $json.objects.NUTS_RG_10M_2021_4326
$cz = $obj.geometries | Where-Object { $_.properties.NUTS_ID -like 'CZ*' }
$sk = $obj.geometries | Where-Object { $_.properties.NUTS_ID -like 'SK*' }

Write-Host "Found $($cz.Count) CZ and $($sk.Count) SK geometries in nuts_10m.json"
