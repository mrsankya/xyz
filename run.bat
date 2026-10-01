@echo off
setlocal

title Agrilogix - Agricultural Supply-Chain Intelligence Platform

:: Navigate to script directory
cd /d "%~dp0"

:: If package.json is in Agrilogix-main subdirectory, enter it
if not exist "package.json" (
    if exist "Agrilogix-main\package.json" (
        cd /d "%~dp0Agrilogix-main"
    )
)

echo ============================================================
echo           AGRILOGIX - SUPPLY CHAIN INTELLIGENCE
echo ============================================================
echo.

:: Check Node.js installation
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not found on your system PATH.
    echo Please install Node.js from https://nodejs.org/ and restart this script.
    echo.
    pause
    exit /b 1
)

echo [1/3] Node.js environment detected:
node -v
echo.

:: Check and install dependencies
if not exist "node_modules" goto :INSTALL_DEPS
if not exist "node_modules\@google\genai" goto :INSTALL_DEPS
goto :DEPS_OK

:INSTALL_DEPS
echo [2/3] Installing dependencies via npm install, please wait...
echo.
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to install dependencies.
    echo Please check your network connection and try again.
    pause
    exit /b %errorlevel%
)
echo.
echo [OK] Dependencies installed successfully.
echo.
goto :CHECK_ENV

:DEPS_OK
echo [2/3] Dependencies verified [node_modules exists].
echo.

:CHECK_ENV
:: Ensure .env.local exists if .env.example is present
if not exist ".env.local" (
    if exist ".env.example" (
        echo [NOTICE] Initializing .env.local from .env.example...
        copy ".env.example" ".env.local" >nul
    )
)

echo [3/3] Starting Agrilogix Development Server...
echo ============================================================
echo   Application URL: http://localhost:3000
echo   Network URL:     http://0.0.0.0:3000
echo   Press Ctrl+C to stop the server at any time.
echo ============================================================
echo.

:: Launch the Vite dev server
call npm run dev

if %errorlevel% neq 0 (
    echo.
    echo [NOTICE] Development server stopped with exit code %errorlevel%.
    pause
)
