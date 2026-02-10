@echo off
echo ============================================
echo  LPU Smart Energy Monitor - Git Push Script
echo ============================================
echo.

set GIT_PATH="C:\Program Files\Git\cmd\git.exe"

REM Check if Git exists at the specific path
if not exist %GIT_PATH% (
    echo ERROR: Git not found at C:\Program Files\Git\cmd\git.exe
    echo.
    echo Please install Git and try again.
    pause
    exit /b 1
)

echo [1/7] Navigating to project directory...
cd /d "%~dp0"

echo [2/7] Initializing Git repository...
%GIT_PATH% init

echo [3/7] Adding all files...
%GIT_PATH% add .

echo [4/7] Creating commit...
%GIT_PATH% commit -m "feat: Complete LPU Smart Energy Monitor - Topcoder Hackathon Submission"

echo [5/7] Renaming branch to main...
%GIT_PATH% branch -M main

echo [6/7] Adding remote repository...
%GIT_PATH% remote remove origin >nul 2>&1
%GIT_PATH% remote add origin https://github.com/SANJANA208-bit/lpu-smart-energy-monitor.git

echo [7/7] Pushing to GitHub...
echo.
echo IMPORTANT: When asked for password, use your Personal Access Token
echo (NOT your GitHub password!)
echo.
echo Create token at: https://github.com/settings/tokens
echo.
%GIT_PATH% push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ============================================
    echo  SUCCESS! Code pushed to GitHub
    echo ============================================
    echo.
    echo View your repository at:
    echo https://github.com/SANJANA208-bit/lpu-smart-energy-monitor
    echo.
) else (
    echo.
    echo ============================================
    echo  Push failed - Authentication needed
    echo ============================================
    echo.
    echo Make sure you:
    echo 1. Created repository on GitHub first
    echo 2. Used Personal Access Token (not password)
    echo.
)

pause
