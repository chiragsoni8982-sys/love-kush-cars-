@echo off
title Love Kush Cars - Full Stack Launcher
echo ============================================================
echo Starting Love Kush Cars Backend API & Frontend...
echo ============================================================

echo [1/2] Launching Backend API (Port 8000)...
start "Love Kush Cars API (Port 8000)" cmd /k "cd /d D:\love-kush-cars-api && venv\Scripts\python.exe main.py"

echo [2/2] Launching Frontend (Port 5173)...
start "Love Kush Cars Frontend (Port 5173)" cmd /k "cd /d D:\love-kush-cars && npm run dev"

echo.
echo ============================================================
echo Both servers have been launched in separate windows!
echo - Backend API:      http://localhost:8000
echo - Admin Portal:     http://localhost:5173/admin
echo.
echo To STOP either server:
echo Click its terminal window and press Ctrl + C (or close the window).
echo ============================================================
pause
