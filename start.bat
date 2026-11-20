@echo off
title EXCENIUS Studio Launcher
echo ==============================================
echo   EXCENIUS Digital Studio - Launching App
echo ==============================================
echo.

start "EXCENIUS Backend (FastAPI)" cmd /k "cd backend && python -m uvicorn main:app --reload --port 8001"
start "EXCENIUS Frontend (React Vite)" cmd /k "cd frontend && npm run dev"

echo Backend started on http://127.0.0.1:8001
echo Frontend started on http://localhost:5173
echo.
echo Opening browser...
timeout /t 2 >nul
start http://localhost:5173
pause
