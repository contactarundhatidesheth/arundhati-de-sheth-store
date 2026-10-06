# Launch Google Chrome with Remote Debugging enabled on port 9222
$chromePaths = @(
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
)

$chromeExe = $chromePaths | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $chromeExe) {
    Write-Error "Google Chrome executable was not found."
    exit 1
}

$userDataDir = "$env:LOCALAPPDATA\Google\Chrome\User Data Debug"
if (-not (Test-Path $userDataDir)) {
    New-Item -ItemType Directory -Path $userDataDir -Force | Out-Null
}

Write-Host "Launching Google Chrome with Remote Debugging on port 9222..." -ForegroundColor Green
Write-Host "Executable: $chromeExe" -ForegroundColor Cyan
Write-Host "Profile Dir: $userDataDir" -ForegroundColor Cyan

Start-Process -FilePath $chromeExe -ArgumentList @(
    "--remote-debugging-port=9222",
    "--user-data-dir=`"$userDataDir`"",
    "http://localhost:3000"
)
