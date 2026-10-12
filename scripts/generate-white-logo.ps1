Add-Type -AssemblyName System.Drawing

$rootDir = Split-Path $PSScriptRoot -Parent
$inputPath = Join-Path $rootDir "public\brand\logo.png"
$outputPath = Join-Path $rootDir "public\brand\logo-white-transparent.png"

Write-Output "Loading from: $inputPath"

$src = [System.Drawing.Image]::FromFile($inputPath)
$dst = New-Object System.Drawing.Bitmap($src.Width, $src.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$rect = New-Object System.Drawing.Rectangle(0, 0, $src.Width, $src.Height)
$srcBitmap = New-Object System.Drawing.Bitmap($src)
$srcData = $srcBitmap.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$dstData = $dst.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$bytes = [Math]::Abs($srcData.Stride) * $src.Height
$buffer = New-Object byte[] $bytes
[System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $buffer, 0, $bytes)

for ($i = 0; $i -lt $bytes; $i += 4) {
    $alpha = $buffer[$i + 3]
    if ($alpha -gt 0) {
        $buffer[$i] = 255     # B
        $buffer[$i + 1] = 255 # G
        $buffer[$i + 2] = 255 # R
        # alpha is preserved
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($buffer, 0, $dstData.Scan0, $bytes)
$srcBitmap.UnlockBits($srcData)
$dst.UnlockBits($dstData)
$srcBitmap.Dispose()
$src.Dispose()

$dst.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$dst.Dispose()

Write-Output "Successfully saved: $outputPath"
