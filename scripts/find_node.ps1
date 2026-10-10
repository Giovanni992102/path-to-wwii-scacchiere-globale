$candidates = @(
    "$env:LOCALAPPDATA\Programs\node\node.exe",
    "$env:LOCALAPPDATA\Programs\nodejs\node.exe",
    "$env:APPDATA\npm\node.exe",
    "$env:ProgramFiles\nodejs\node.exe",
    "${env:ProgramFiles(x86)}\nodejs\node.exe",
    "C:\ProgramData\chocolatey\bin\node.exe",
    "$env:USERPROFILE\.nvm\*\node.exe",
    "$env:USERPROFILE\.fnm\current\node.exe",
    "$env:USERPROFILE\.volta\bin\node.exe",
    "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\*\node.exe",
    "$env:LOCALAPPDATA\Programs\Antigravity IDE\resources\*\node.exe"
)

foreach ($c in $candidates) {
    $found = Resolve-Path $c -ErrorAction SilentlyContinue
    if ($found) {
        Write-Host "FOUND: $found"
    }
}
