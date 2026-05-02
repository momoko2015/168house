# ============================================================
# 88Loft Deploy Script — PythonAnywhere API Upload
# ============================================================
param(
    [Parameter(Mandatory=$true)]
    [string]$ApiToken
)

$USERNAME  = "hkproperty"
$DOMAIN    = "www.88loft.com"
$SITE_DIR  = "/home/hkproperty/88loft"
$BASE_URL  = "https://www.pythonanywhere.com/api/v0/user/$USERNAME"
$HEADERS   = @{ Authorization = "Token $ApiToken" }
$LOCAL_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path

$FILES = @(
    "flask_app.py",
    "utils.js",
    "districts.js",
    "map.html",
    "index.html",
    "login.html",
    "edit.html",
    "admin.html",
    "add.html",
    "payment.html",
    "style.css",
    "app.js",
    "hk.html",
    "jp.html",
    "usa.html",
    "cn.html",
    "wanted.html",
    "404.html",
    "sw.js",
    "compare.html"
)

Write-Host "Uploading files..."
$success = 0
$failed  = 0

foreach ($f in $FILES) {
    $localPath = Join-Path $LOCAL_DIR $f
    if (-not (Test-Path $localPath)) {
        Write-Host "  SKIP: $f"
        continue
    }

    $remotePath = "$SITE_DIR/$f"
    $uploadUrl  = "$BASE_URL/files/path$remotePath"

    try {
        $bytes    = [System.IO.File]::ReadAllBytes($localPath)
        $boundary = [System.Guid]::NewGuid().ToString()
        $LF       = "`r`n"

        $bodyLines = (
            "--$boundary",
            "Content-Disposition: form-data; name=`"content`"; filename=`"$f`"",
            "Content-Type: application/octet-stream",
            "",
            [System.Text.Encoding]::UTF8.GetString($bytes),
            "--$boundary--"
        ) -join $LF

        $uploadHeaders = $HEADERS.Clone()
        $uploadHeaders["Content-Type"] = "multipart/form-data; boundary=$boundary"

        $response = Invoke-WebRequest -Uri $uploadUrl -Method POST -Headers $uploadHeaders -Body $bodyLines -ErrorAction Stop

        if ($response.StatusCode -in 200, 201) {
            Write-Host "  OK  $f"
            $success++
        }
    } catch {
        Write-Host "  FAIL $f : $($_.Exception.Message)"
        $failed++
    }
}

Write-Host "Reloading..."
try {
    $reloadUrl = "$BASE_URL/webapps/$DOMAIN/reload/"
    $response  = Invoke-WebRequest -Uri $reloadUrl -Method POST -Headers $HEADERS -ErrorAction Stop
    Write-Host "  Reloaded!"
} catch {
    Write-Host "  Reload failed: $($_.Exception.Message)"
}
