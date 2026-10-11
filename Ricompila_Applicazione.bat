@echo off
title Ricompilazione e Avvio - PATH TO WWII
cd /d "%~dp0"

echo ========================================================
echo   RICOMPILAZIONE APPLICAZIONE - PATH TO WWII
echo ========================================================
echo.

rem Assicura che Node.js sia nel PATH
if exist "C:\Program Files\nodejs" set "PATH=C:\Program Files\nodejs;%PATH%"
if exist "%LOCALAPPDATA%\Programs\node" set "PATH=%LOCALAPPDATA%\Programs\node;%PATH%"
if exist "%APPDATA%\npm" set "PATH=%APPDATA%\npm;%PATH%"

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRORE] Node.js non e' stato trovato sul sistema!
    echo Installa Node.js da https://nodejs.org prima di continuare.
    echo.
    pause
    exit /b 1
)

echo [INFO] Arresto di eventuali server attivi sulla porta 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr /R /C:":3000 .*LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo [INFO] Compilazione in corso con Vite (generazione nuovo dist/)...
call node node_modules\vite\bin\vite.js build

if %errorlevel% neq 0 (
    echo.
    echo [ERRORE] La compilazione e' fallita!
    pause
    exit /b 1
)

echo.
echo [OK] Compilazione completata con successo!
echo [INFO] Avvio del server e apertura del browser...
start "" "%~dp0Avvia_Scacchiere_Globale.bat"
exit /b 0
