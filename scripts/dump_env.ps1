$env:PATH -split ';' | ForEach-Object { Write-Host $_ }
Get-Process | Where-Object { $_.ProcessName -match 'node' } | ForEach-Object { Write-Host "$($_.Id): $($_.Path)" }
