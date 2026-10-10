$raw = Get-Content 'C:\Users\ziani\.gemini\antigravity-ide\brain\90ba5e70-ad56-4227-a7fe-4f4b69d1c55d\.system_generated\steps\447\content.md' -Raw
# Strip markdown header
$jsonStart = $raw.IndexOf('{"type": "FeatureCollection"')
$jsonStr = $raw.Substring($jsonStart)
$json = $jsonStr | ConvertFrom-Json

Write-Host "Total okresy: $($json.features.Count)"
$json.features | ForEach-Object {
    Write-Host "$($_.id) | $($_.name) | $($_.nationalCode)"
}
