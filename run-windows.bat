@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>&1
if not errorlevel 1 goto usepy
where python >nul 2>&1
if not errorlevel 1 goto usepython
echo Python was not found. Install Python 3 or open index.html directly for basic local use.
pause
exit /b 1

:usepy
start "Khaksar Typing" cmd /c "timeout /t 2 /nobreak ^>nul ^& start http://localhost:8000"
py -m http.server 8000
exit /b

:usepython
start "Khaksar Typing" cmd /c "timeout /t 2 /nobreak ^>nul ^& start http://localhost:8000"
python -m http.server 8000
exit /b
