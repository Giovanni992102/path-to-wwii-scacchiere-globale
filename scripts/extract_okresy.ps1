$content = [System.IO.File]::ReadAllText('C:\Users\ziani\.gemini\antigravity-ide\brain\90ba5e70-ad56-4227-a7fe-4f4b69d1c55d\.system_generated\steps\447\content.md')
$idx = $content.IndexOf('{"type": "FeatureCollection"')
if ($idx -ge 0) {
    $json = $content.Substring($idx).Trim()
    $outPath = Join-Path (Get-Location) 'scripts\czech_okresy.json'
    [System.IO.File]::WriteAllText($outPath, $json, [System.Text.Encoding]::UTF8)
    Write-Host "Saved $outPath! Length: $($json.Length)"
} else {
    Write-Host "Could not find json start"
}
