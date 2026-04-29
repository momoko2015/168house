# ============================================================
# 88Loft Deploy Script — PythonAnywhere API Upload
# ============================================================
# USAGE: Run this script in PowerShell from the property_app directory
# It will upload all changed files and reload www.88loft.com

param(
    [Parameter(Mandatory=$true)]
    [string]$ApiToken
)

$USERNAME  = "hkproperty"
$DOMAIN    = "www.88loft.com"
$SITE_DIR  = "/home/hkproperty/mysite"
$BASE_URL  = "https://www.pythonanywhere.com/api/v0/user/$USERNAME"
$HEADERS   = @{ Authorization = "Token $ApiToken" }
$LOCAL_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path

# Files to deploy
$FILES = @(
    "flask_app.py",
    "utils.js",
    "map.html",
    "index.html",
    "login.html",
    "edit.html",
    "admin.html",
    "add.html",
    "payment.html",
    "style.css",
    "app.js"
)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  88Loft Deploy to PythonAnywhere" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# --- STEP 1: Upload each file ---
Write-Host "[1/2] Uploading files..." -ForegroundColor Yellow

$success = 0
$failed  = 0

foreach ($file in $FILES) {
    $localPath = Join-Path $LOCAL_DIR $file
    if (-not (Test-Path $localPath)) {
        Write-Host "  SKIP (not found): $file" -ForegroundColor DarkGray
        continue
    }

    $remotePath = "$SITE_DIR/$file"
    $uploadUrl  = "$BASE_URL/files/path$remotePath"

    try {
        $bytes    = [System.IO.File]::ReadAllBytes($localPath)
        $boundary = [System.Guid]::NewGuid().ToString()
        $LF       = "`r`n"

        $bodyLines = (
            "--$boundary",
            "Content-Disposition: form-data; name=`"content`"; filename=`"$file`"",
            "Content-Type: application/octet-stream",
            "",
            [System.Text.Encoding]::UTF8.GetString($bytes),
            "--$boundary--"
        ) -join $LF

        $uploadHeaders = $HEADERS.Clone()
        $uploadHeaders["Content-Type"] = "multipart/form-data; boundary=$boundary"

        $response = Invoke-WebRequest -Uri $uploadUrl `
            -Method POST `
            -Headers $uploadHeaders `
            -Body $bodyLines `
            -ErrorAction Stop

        if ($response.StatusCode -in 200, 201) {
            Write-Host "  OK  $file" -ForegroundColor Green
            $success++
        } else {
            Write-Host "  WARN $file — HTTP $($response.StatusCode)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "  FAIL $file — $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

Write-Host "`n  Uploaded: $success files  |  Failed: $failed files" -ForegroundColor Cyan

# --- STEP 2: Reload web app ---
Write-Host "`n[2/2] Reloading www.88loft.com..." -ForegroundColor Yellow

try {
    $reloadUrl = "$BASE_URL/webapps/$DOMAIN/reload/"
    $response  = Invoke-WebRequest -Uri $reloadUrl `
        -Method POST `
        -Headers $HEADERS `
        -ErrorAction Stop

    if ($response.StatusCode -eq 200) {
        Write-Host "  Web app reloaded successfully!" -ForegroundColor Green
    } else {
        Write-Host "  Reload returned HTTP $($response.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "  Reload failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "  Try manually: Web tab → Reload button" -ForegroundColor Yellow
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Deploy complete! Check www.88loft.com" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan
