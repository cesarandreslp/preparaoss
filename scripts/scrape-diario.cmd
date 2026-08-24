@echo off
REM Scraper diario de SIMO desde este equipo (IP Colombia).
REM Vercel no sirve para esto: SIMO le bloquea la IP de US.
REM Registrado como tarea programada de Windows (ver README abajo).
cd /d C:\projects\preparaoss
echo ================================================= >> "C:\projects\preparaoss\scraper.log"
echo [%date% %time%] Iniciando scraper >> "C:\projects\preparaoss\scraper.log"
call npm run scraper >> "C:\projects\preparaoss\scraper.log" 2>&1
echo [%date% %time%] Fin scraper (exit %errorlevel%) >> "C:\projects\preparaoss\scraper.log"
