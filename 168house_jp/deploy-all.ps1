param(
    [string]$ProjectDir = ".",
    [string]$GitHubRepo = "",
    [string]$CloudflareProject = "168house-jp"
)

$ErrorActionPreference = "Stop"

function Write-Step($msg) {
    Write-Host ""
    Write-Host "==> $msg" -ForegroundColor Cyan
}

function Require-Tool($name) {
    if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
        throw "Missing required tool: $name"
    }
}

function Require-Env($name) {
    $value = [Environment]::GetEnvironmentVariable($name)
    if ([string]::IsNullOrWhiteSpace($value)) {
        throw "Missing environment variable: $name"
    }
    return $value
}

$root = Resolve-Path $ProjectDir
Set-Location $root

Write-Step "Checking required tools"
Require-Tool git
Require-Tool npm
Require-Tool npx

Write-Step "Checking project files"
if (-not (Test-Path ".\index.html")) {
    throw "index.html not found in $root"
}

Write-Step "Preparing npm cache"
npm cache verify | Out-Host

Write-Step "Reading environment variables"
$vercelToken = Require-Env "VERCEL_TOKEN"
$netlifyToken = Require-Env "NETLIFY_AUTH_TOKEN"
$cloudflareToken = Require-Env "CLOUDFLARE_API_TOKEN"

if ([string]::IsNullOrWhiteSpace($GitHubRepo)) {
    Write-Host "GitHub repo not provided. Skipping GitHub Pages." -ForegroundColor Yellow
} else {
    Write-Step "Deploying to GitHub Pages"
    $remoteExists = git remote get-url origin 2>$null
    if (-not $remoteExists) {
        git remote add origin $GitHubRepo
    } else {
        git remote set-url origin $GitHubRepo
    }

    $branch = git branch --show-current
    if ([string]::IsNullOrWhiteSpace($branch)) {
        git checkout -b main | Out-Host
        $branch = "main"
    }

    git add . | Out-Host
    $hasChanges = git status --porcelain
    if (-not [string]::IsNullOrWhiteSpace($hasChanges)) {
        git commit -m "Deploy website updates" | Out-Host
    } else {
        Write-Host "No new git changes to commit." -ForegroundColor Yellow
    }

    git push -u origin $branch | Out-Host
    Write-Host "GitHub push complete. Enable Pages in repo settings if needed." -ForegroundColor Green
}

Write-Step "Deploying to Vercel"
npx --yes vercel --prod --yes --token $vercelToken | Out-Host
Write-Host "Vercel deploy complete." -ForegroundColor Green

Write-Step "Deploying to Netlify"
npx --yes netlify-cli deploy --prod --dir . --auth $netlifyToken | Out-Host
Write-Host "Netlify deploy complete." -ForegroundColor Green

Write-Step "Deploying to Cloudflare Pages"
$env:CLOUDFLARE_API_TOKEN = $cloudflareToken
npx --yes wrangler pages deploy . --project-name $CloudflareProject | Out-Host
Write-Host "Cloudflare Pages deploy complete." -ForegroundColor Green

Write-Step "All deploy tasks finished"
Write-Host "Done." -ForegroundColor Green
