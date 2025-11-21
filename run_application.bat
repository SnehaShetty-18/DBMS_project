@echo off
echo Alumni Networking & Mentorship System - Startup Script
echo ======================================================

echo.
echo Step 1: Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed.

echo.
echo Step 2: Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install backend dependencies.
    pause
    exit /b 1
)

echo.
echo Step 3: Installing frontend dependencies...
cd ../frontend
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install frontend dependencies.
    pause
    exit /b 1
)

echo.
echo Step 4: Starting backend server...
cd ../backend
start "Backend Server" cmd /k "node server.js"

echo.
echo Step 5: Starting frontend server...
cd ../frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Both servers started successfully!
echo Frontend will be available at: http://localhost:3000
echo Backend API will be available at: http://localhost:5000
echo.
echo Note: Please ensure MySQL is installed and running with the correct credentials.
echo Press any key to exit...
pause >nul