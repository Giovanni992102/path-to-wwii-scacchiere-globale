Get-ChildItem -Path "$env:LOCALAPPDATA\Programs\Antigravity IDE" -Filter "*node*.exe" -Recurse -ErrorAction SilentlyContinue | ForEach-Object { Write-Host $_.FullName }
Get-ChildItem -Path "$env:LOCALAPPDATA" -Filter "*node*.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 10 | ForEach-Object { Write-Host $_.FullName }
