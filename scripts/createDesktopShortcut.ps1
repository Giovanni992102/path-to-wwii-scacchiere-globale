$desktop = [Environment]::GetFolderPath('Desktop')
$currentDir = (Get-Item -Path ".").FullName

$wshell = New-Object -ComObject WScript.Shell

# 1. Collegamento Avvio
$lnkStart = Join-Path $desktop "PATH TO WWII - Scacchiere Globale.lnk"
$scStart = $wshell.CreateShortcut($lnkStart)
$scStart.TargetPath = Join-Path $currentDir "Avvia_Scacchiere_Globale.bat"
$scStart.WorkingDirectory = $currentDir
$scStart.Description = "Avvia PATH TO WWII - Scacchiere Globale e apre il browser"
$scStart.IconLocation = "shell32.dll,14"
$scStart.WindowStyle = 7
$scStart.Save()

# 2. Collegamento Arresto
$lnkStop = Join-Path $desktop "Arresta Scacchiere Globale.lnk"
$scStop = $wshell.CreateShortcut($lnkStop)
$scStop.TargetPath = Join-Path $currentDir "Arresta_Server.bat"
$scStop.WorkingDirectory = $currentDir
$scStop.Description = "Arresta il server di PATH TO WWII"
$scStop.IconLocation = "shell32.dll,27"
$scStop.WindowStyle = 7
$scStop.Save()

# 3. Collegamento Ricompilazione
$lnkRebuild = Join-Path $desktop "Ricompila Scacchiere Globale.lnk"
$scRebuild = $wshell.CreateShortcut($lnkRebuild)
$scRebuild.TargetPath = Join-Path $currentDir "Ricompila_Applicazione.bat"
$scRebuild.WorkingDirectory = $currentDir
$scRebuild.Description = "Ricompila l'applicazione con le ultime modifiche e avvia"
$scRebuild.IconLocation = "shell32.dll,238"
$scRebuild.WindowStyle = 1
$scRebuild.Save()

Write-Host "Collegamenti creati con successo sul Desktop:"
Get-Item (Join-Path $desktop "*Scacchiere*.lnk") | Select-Object -Property Name, Length, LastWriteTime
