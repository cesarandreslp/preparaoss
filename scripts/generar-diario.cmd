@echo off
REM Backfill diario de bancos con los 4 proveedores en paralelo (free tier).
REM Corre hasta agotar la cuota diaria de cada uno; el resto se hace manana.
REM Tarea programada de Windows: PreparaOSS-Generar.
cd /d C:\projects\preparaoss
set GEN_PROVIDERS=gemini,groq,zhipu,mistral
set GEN_MAX=6000
set GEN_PAUSA_MS=4000
echo ================================================= >> "C:\projects\preparaoss\generar-paralelo.log"
echo [%date% %time%] Iniciando generacion diaria (paralelo) >> "C:\projects\preparaoss\generar-paralelo.log"
call npx ts-node --transpile-only --project tsconfig.scripts.json scripts/generar-paralelo.ts >> "C:\projects\preparaoss\generar-paralelo.log" 2>&1
echo [%date% %time%] Fin generacion (exit %errorlevel%) >> "C:\projects\preparaoss\generar-paralelo.log"
