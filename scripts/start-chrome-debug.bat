@echo off
set "CHROME_EXE=C:\Program Files\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME_EXE%" (
    set "CHROME_EXE=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
)
if not exist "%CHROME_EXE%" (
    set "CHROME_EXE=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
)

set "USER_DATA=%LOCALAPPDATA%\Google\Chrome\User Data Debug"

echo Starting Google Chrome with Remote Debugging enabled on port 9222...
start "" "%CHROME_EXE%" --remote-debugging-port=9222 --user-data-dir="%USER_DATA%" http://localhost:3000
