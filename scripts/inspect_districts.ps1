# Inspect Czech okresy
$czText = [System.IO.File]::ReadAllText((Join-Path (Get-Location) 'scripts\czech_okresy.json'))
$czMatches = [regex]::Matches($czText, '"name":\s*"([^"]+)"')
$czNames = @()
foreach ($m in $czMatches) { $czNames += $m.Groups[1].Value }
Write-Host "=== CZECH DISTRICTS ($($czNames.Count)) ==="
Write-Host ($czNames -join ', ')

# Inspect Slovak okresy
$skText = [System.IO.File]::ReadAllText((Join-Path (Get-Location) 'scripts\slovakia_okresy.json'))
$skMatches = [regex]::Matches($skText, '"NM3":\s*"([^"]+)"')
$skNames = @()
foreach ($m in $skMatches) { $skNames += $m.Groups[1].Value }
Write-Host "`n=== SLOVAK DISTRICTS ($($skNames.Count)) ==="
Write-Host ($skNames -join ', ')
