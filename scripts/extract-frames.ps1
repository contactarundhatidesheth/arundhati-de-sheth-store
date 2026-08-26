# Extract video frames for scroll animation
# Requirements: ffmpeg binary at .\ffmpeg\bin\ffmpeg.exe
# Usage: npm run extract-frames

$videoPath = "lib\Media\Gems_of_different_shapes_sizes_202608180938.mp4"
$outputDir = "public\video-frames"
$fps = 30
$ffmpeg = ".\ffmpeg\ffmpeg-2026-08-17-git-426841da9d-full_build\bin\ffmpeg.exe"

# Verify ffmpeg exists
if (-not (Test-Path $ffmpeg)) {
    Write-Host "ERROR: ffmpeg not found at $ffmpeg"
    Write-Host "Download from https://www.gyan.dev/ffmpeg/builds/ and extract to .\ffmpeg\"
    exit 1
}

# Create output directory
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    Write-Host "Created directory: $outputDir"
}

Write-Host "Extracting frames from $videoPath at $fps fps..."

# Extract frames using ffmpeg
& $ffmpeg -i $videoPath -vf "fps=$fps,scale=1280:-1:flags=lanczos" "$outputDir\frame-%04d.png" -y

$frameCount = (Get-ChildItem "$outputDir\frame-*.png").Count
Write-Host "Extracted $frameCount frames to $outputDir"
Write-Host "Done! You can now use the ScrollVideoCanvas component."
