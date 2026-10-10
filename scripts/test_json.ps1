Add-Type -AssemblyName System.Web.Extensions
$serializer = New-Object System.Web.Script.Serialization.JavaScriptSerializer
$serializer.MaxJsonLength = [int]::MaxValue
$serializer.RecursionLimit = 2000

$lines = Get-Content 'C:\Users\ziani\.gemini\antigravity-ide\brain\90ba5e70-ad56-4227-a7fe-4f4b69d1c55d\.system_generated\steps\447\content.md'
$jsonLine = $lines | Where-Object { $_ -like '{"type": "FeatureCollection"*' } | Select-Object -First 1

try {
    $data = $serializer.DeserializeObject($jsonLine)
    Write-Host "Success! Total features: $($data['features'].Length)"
    $names = @()
    foreach ($f in $data['features']) {
        $names += "$($f['name']) ($($f['id']))"
    }
    Write-Host "Districts ($($names.Count)): $($names -join ', ')"
} catch {
    Write-Host "Error: $_"
}
