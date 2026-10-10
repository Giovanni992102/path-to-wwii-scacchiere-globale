@echo off
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

rem Se dist non esiste, compila
if not exist "dist\index.html" (
    echo [INFO] Compilazione applicazione in corso...
    call node node_modules\vite\bin\vite.js build
)

rem Verifica se il server e' gia' attivo sulla porta 3000
netstat -ano | findstr /R /C:":3000 .*LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Il server e' gia' attivo su http://localhost:3000
    echo [INFO] Apertura dell'applicazione nel browser predefinito...
    start http://localhost:3000
    ping -n 2 127.0.0.1 >nul
    exit /b 0
)

echo [INFO] Avvio ultra-rapido del server su porta 3000...
start "PATH TO WWII - Server" cmd /k node server.cjs

echo [INFO] In attesa che il server sia pronto...
set /a attempts=0
:check_port
ping -n 2 127.0.0.1 >nul
netstat -ano | findstr /R /C:":3000 .*LISTENING" >nul 2>&1
if %errorlevel% equ 0 goto :server_ready
set /a attempts+=1
if %attempts% geq 10 goto :server_ready
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
