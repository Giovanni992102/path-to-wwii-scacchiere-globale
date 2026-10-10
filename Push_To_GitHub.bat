@echo off
title Push su GitHub - PATH TO WWII
cd /d "%~dp0"

echo ========================================================
echo   PUSH SU GITHUB - SCACCHIERE GLOBALE
echo   Repository: https://github.com/Giovanni992102/path-to-wwii-scacchiere-globale.git
echo   Branch: main
echo ========================================================
echo.
echo GitHub richiede obbligatoriamente un Personal Access Token (PAT).
echo La normale password dell'account non e' piu' accettata da GitHub.
echo.
echo Se hai gia' un Token, incollalo qui sotto.
echo Se NON ce l'hai, creane uno in 20 secondi aprendo questo link:
echo https://github.com/settings/tokens/new?scopes=repo^&description=wwii-push
echo (Basta scorrere in fondo alla pagina e cliccare su 'Generate token')
echo.
set "GITHUB_TOKEN="
set /p "GITHUB_TOKEN=Incolla qui il tuo Personal Access Token (o premi INVIO per browser): "

if not "%GITHUB_TOKEN%"=="" (
    echo.
    echo [INFO] Esecuzione del push con autenticazione Token...
    git push https://%GITHUB_TOKEN%@github.com/Giovanni992102/path-to-wwii-scacchiere-globale.git main:main
    goto :fine
)

echo.
echo [INFO] Tentativo con Git Credential Manager...
git push -u origin main

:fine
echo.
echo ========================================================
if %errorlevel% equ 0 (
    echo [SUCCESSO] Push completato con successo su GitHub!
    echo Repository: https://github.com/Giovanni992102/path-to-wwii-scacchiere-globale
) else (
    echo [ATTENZIONE] Il push non e' riuscito.
    echo Verifica che il Token inserito sia valido e abbia il permesso 'repo'.
)
echo ========================================================
echo.
pause
