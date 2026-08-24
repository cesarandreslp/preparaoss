@echo off
REM Backfill diario de bancos de preguntas con Groq (free tier).
REM Corre hasta agotar la cuota diaria; el resto se hace mañana.
REM Tarea programada de Windows: PreparaOSS-Generar.
cd /d C:\projects\preparaoss
set GEN_MAX=3000
set GEN_PAUSA_MS=10000
echo ================================================= >> "C:\projects\preparaoss\generar-lote.log"
echo [%date% %time%] Iniciando generacion diaria >> "C:\projects\preparaoss\generar-lote.log"
call npx ts-node --transpile-only --project tsconfig.scripts.json scripts/generar-lote.ts >> "C:\projects\preparaoss\generar-lote.log" 2>&1
echo [%date% %time%] Fin generacion (exit %errorlevel%) >> "C:\projects\preparaoss\generar-lote.log"
