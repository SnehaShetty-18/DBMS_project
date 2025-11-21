@echo off
echo Checking MySQL Installation and Status
echo ===================================

echo.
echo 1. Checking if MySQL is in PATH...
mysql --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ MySQL is installed and in PATH
) else (
    echo ✗ MySQL is not found in PATH
    echo   Please install MySQL and add it to your system PATH
    goto :end
)

echo.
echo 2. Checking if MySQL service is running...
sc query mysql >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ MySQL service is installed
    for /f "tokens=4" %%s in ('sc query mysql ^| findstr STATE') do set mysql_state=%%s
    if "%mysql_state%"=="RUNNING" (
        echo ✓ MySQL service is running
    ) else (
        echo ✗ MySQL service is not running
        echo   Please start the MySQL service from Services (services.msc)
    )
) else (
    sc query mysql80 >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✓ MySQL80 service is installed
        for /f "tokens=4" %%s in ('sc query mysql80 ^| findstr STATE') do set mysql_state=%%s
        if "%mysql_state%"=="RUNNING" (
            echo ✓ MySQL80 service is running
        ) else (
            echo ✗ MySQL80 service is not running
            echo   Please start the MySQL80 service from Services (services.msc)
        )
    ) else (
        echo ✗ MySQL service is not installed
        echo   Please install MySQL Server
    )
)

echo.
echo 3. Testing database connection...
cd backend >nul 2>&1
node -e "const sequelize = require('./config/db'); sequelize.authenticate().then(() => {console.log('✓ Database connection successful'); process.exit(0);}).catch(() => {console.log('✗ Database connection failed'); process.exit(1);});" 2>nul
if %errorlevel% equ 0 (
    echo Database is accessible
) else (
    echo Database connection failed
    echo Please check:
    echo  - MySQL service is running
    echo  - Database credentials in backend/.env are correct
    echo  - alumni_network database exists
)

:end
echo.
echo Press any key to exit...
pause >nul