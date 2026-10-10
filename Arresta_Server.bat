@echo off
title Arresta Server - Scacchiere Globale
cd /d "%~dp0"

echo [INFO] Arresto del server Scacchiere Globale sulla porta 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr /R /C:":3000 .*LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
    echo [OK] Processo PID %%a terminato.
)
echo [OK] Server arrestato con successo.
ping -n 2 127.0.0.1 >nul
exit /b 0
