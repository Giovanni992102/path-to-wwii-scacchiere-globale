@echo off
chcp 65001 >nul
title PATH TO WWII - Scacchiere Globale
cd /d "%~dp0"

echo ========================================================
echo   PATH TO WWII - Scacchiere Globale (1936-1940)
echo ========================================================
echo.

rem Assicura che Node.js sia nel PATH
if exist "C:\Program Files\nodejs" set "PATH=C:\Program Files\nodejs;%PATH%"
if exist "%LOCALAPPDATA%\Programs\node" set "PATH=%LOCALAPPDATA%\Programs\node;%PATH%"
if exist "%APPDATA%\npm" set "PATH=%APPDATA%\npm;%PATH%"

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRORE] Node.js non e' stato trovato sul sistema!
    echo Installa Node.js da https://nodejs.org prima di avviare l'applicazione.
    echo.
    pause
    exit /b 1
)

rem 1. Rilevamento automatico intelligente delle modifiche nei sorgenti (src e public)
set NEED_BUILD=0
if "%1"=="--build" set NEED_BUILD=1
if "%1"=="--rebuild" set NEED_BUILD=1
if not exist "dist\index.html" set NEED_BUILD=1

if "%NEED_BUILD%"=="0" (
    powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\checkNeedsBuild.ps1" >nul 2>&1
    if errorlevel 1 set NEED_BUILD=1
)

if "%NEED_BUILD%"=="0" goto :skip_build

echo [RILEVAMENTO] Nuove modifiche rilevate nei file sorgente o prima compilazione necessaria.
echo [INFO] Arresto di eventuali server attivi sulla porta 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr /R /C:":3000 .*LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo [INFO] Compilazione in corso con Vite...
call node node_modules\vite\bin\vite.js build
if errorlevel 1 (
    echo.
    echo [ERRORE] La compilazione e' fallita!
    pause
    exit /b 1
)
echo [OK] Compilazione completata con successo!
echo.

:skip_build
rem 2. Verifica se il server e' gia' attivo sulla porta 3000
netstat -ano | findstr /R /C:":3000 .*LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Il server e' gia' attivo su http://localhost:3000
    echo [INFO] Apertura dell'applicazione nel browser predefinito...
    start http://localhost:3000
    ping -n 2 127.0.0.1 >nul
    exit /b 0
)

rem 3. Avvio del server su porta 3000
echo [INFO] Avvio del server desktop su porta 3000...
start "PATH TO WWII - Server" /MIN cmd /c "cd /d "%~dp0" && node server.cjs"

echo [INFO] In attesa che il server sia pronto...
set /a attempts=0
:check_port
netstat -ano | findstr /R /C:":3000 .*LISTENING" >nul 2>&1
if %errorlevel% equ 0 goto :server_ready
ping -n 1 -w 250 127.0.0.1 >nul
set /a attempts+=1
if %attempts% geq 20 goto :server_ready
goto :check_port

:server_ready
echo [OK] Server pronto!
echo [INFO] Apertura dell'applicazione nel browser...
start http://localhost:3000
echo.
echo ========================================================
echo   Applicazione avviata: http://localhost:3000
echo ========================================================
echo   La finestra del server e' attiva in background.
echo   Puoi chiudere questa finestra.
echo ========================================================
ping -n 3 127.0.0.1 >nul
exit /b 0
