$lines = [System.IO.File]::ReadAllLines('C:\Users\ziani\.gemini\antigravity-ide\brain\90ba5e70-ad56-4227-a7fe-4f4b69d1c55d\.system_generated\steps\516\content.md')
$jsonLines = @()
$found = $false
foreach ($line in $lines) {
    if ($line.Trim() -eq '{') {
        $found = $true
    }
    if ($found) {
        $jsonLines += $line
    }
}
$jsonStr = $jsonLines -join "`n"
$outPath = Join-Path (Get-Location) 'scripts\slovakia_okresy.json'
[System.IO.File]::WriteAllText($outPath, $jsonStr, [System.Text.Encoding]::UTF8)
Write-Host "Saved $outPath! Lines: $($jsonLines.Count), Chars: $($jsonStr.Length)"
