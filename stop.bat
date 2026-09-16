@echo off
title Stop Love Kush Cars Servers
echo ============================================================
echo Stopping Love Kush Cars Backend API and Frontend...
echo ============================================================

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000 ^| findstr LISTENING') do (
    echo Stopping Backend API on port 8000 (PID %%a)...
    taskkill /F /T /PID %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173 ^| findstr LISTENING') do (
    echo Stopping Frontend on port 5173 (PID %%a)...
    taskkill /F /T /PID %%a >nul 2>&1
)

echo.
echo All Love Kush Cars servers have been stopped.
echo ============================================================
pause
