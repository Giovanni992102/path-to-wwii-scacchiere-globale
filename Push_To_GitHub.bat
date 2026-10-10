@echo off
title Push su GitHub - PATH TO WWII
cd /d "%~dp0"
echo ========================================================
echo   PUSH SU GITHUB - SCACCHIERE GLOBALE
echo   Repository: https://github.com/Giovanni992102/path-to-wwii-scacchiere-globale.git
echo   Branch: main
echo ========================================================
echo.
echo NOTA: Assicurati di aver creato il repository vuoto su:
echo https://github.com/new con il nome:
echo path-to-wwii-scacchiere-globale
echo.
echo Avvio del push...
git push -u origin main
echo.
echo ========================================================
pause
