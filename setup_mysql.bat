@echo off
echo MySQL Setup Helper Script
echo ========================

echo.
echo This script provides guidance for setting up MySQL for the Alumni Networking System.
echo.

echo 1. Download MySQL Community Server from: https://dev.mysql.com/downloads/mysql/
echo 2. During installation, select "Server only" or "Developer Default"
echo 3. When prompted, set the root password to: @suru4765910*
echo    (This matches the password in the .env file)
echo 4. Make sure to add MySQL to your system PATH during installation
echo.

echo After installing MySQL, please:
echo.
echo 1. Start the MySQL service:
echo    - On Windows, open Services (services.msc)
echo    - Find "MySQL" or "MySQL80" service
echo    - Right-click and select "Start"
echo.
echo 2. Create the database:
echo    - Open a command prompt
echo    - Run: mysql -u root -p
echo    - Enter the password: @suru4765910*
echo    - Run: CREATE DATABASE alumni_network;
echo    - Run: EXIT
echo.
echo 3. Then run the initializeDatabase.js script:
echo    - Navigate to the backend folder
echo    - Run: node initializeDatabase.js
echo.

echo Press any key to continue...
pause >nul