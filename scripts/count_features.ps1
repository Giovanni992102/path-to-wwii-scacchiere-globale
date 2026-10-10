# Check features in czech_okresy.json
$czText = [System.IO.File]::ReadAllText((Join-Path (Get-Location) 'scripts\czech_okresy.json'))
$czCount = ([regex]::Matches($czText, '\{\s*"type":\s*"Feature"')).Count
Write-Host "CZ feature count: $czCount"

# Check features in slovakia_okresy.json
$skText = [System.IO.File]::ReadAllText((Join-Path (Get-Location) 'scripts\slovakia_okresy.json'))
$skCount = ([regex]::Matches($skText, '\{\s*"type":\s*"Feature"')).Count
Write-Host "SK feature count: $skCount"
