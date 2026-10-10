$txt = [System.IO.File]::ReadAllText((Join-Path (Get-Location) 'scripts\czech_okresy.json'))
Write-Host "Length: $($txt.Length)"
Write-Host "Last 200 chars:"
Write-Host $txt.Substring($txt.Length - 200)
