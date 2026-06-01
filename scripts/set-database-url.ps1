<#
.SYNOPSIS
  Configure DATABASE_URL / DIRECT_URL pour the-school (.env).

.EXAMPLE
  .\scripts\set-database-url.ps1
  # Saisie interactive de l'URL PostgreSQL

.EXAMPLE
  .\scripts\set-database-url.ps1 -FromQuizMainEnv
  # Copie les URLs depuis quiz-main/.env (DEV uniquement — même base Supabase)
#>

param(
  [switch]$FromQuizMainEnv,
  [string]$QuizMainEnvPath = "C:\xampp\htdocs\quiz-main\.env",
  [string]$TheSchoolEnvPath = (Join-Path (Split-Path $PSScriptRoot -Parent) ".env")
)

function Read-EnvValue([string]$path, [string]$key) {
  if (-not (Test-Path $path)) { return $null }
  foreach ($line in [System.IO.File]::ReadAllLines($path)) {
    if ($line -match "^\s*$([regex]::Escape($key))\s*=\s*(.+)\s*$") {
      return $Matches[1].Trim().Trim('"').Trim("'")
    }
  }
  return $null
}

function Set-EnvPair([string]$path, [string]$databaseUrl, [string]$directUrl) {
  $vars = @{
    DATABASE_URL = $databaseUrl
    DIRECT_URL   = $directUrl
  }
  $lines = New-Object System.Collections.Generic.List[string]
  if (Test-Path $path) {
    foreach ($l in [System.IO.File]::ReadAllLines($path)) { $lines.Add($l) }
  }
  foreach ($key in $vars.Keys) {
    $value = $vars[$key]
    $pattern = "^\s*$([regex]::Escape($key))\s*="
    $found = $false
    for ($i = 0; $i -lt $lines.Count; $i++) {
      if ($lines[$i] -match $pattern) {
        $lines[$i] = "$key=`"$value`""
        $found = $true
        break
      }
    }
    if (-not $found) {
      if ($lines.Count -gt 0 -and $lines[$lines.Count - 1] -ne "") { $lines.Add("") }
      $lines.Add("$key=`"$value`"")
    }
  }
  [System.IO.File]::WriteAllText($path, ($lines -join [Environment]::NewLine) + [Environment]::NewLine)
}

if ($FromQuizMainEnv) {
  $db = Read-EnvValue $QuizMainEnvPath "DATABASE_URL"
  $direct = Read-EnvValue $QuizMainEnvPath "DIRECT_URL"
  if (-not $db -or -not $direct) {
    Write-Error "DATABASE_URL ou DIRECT_URL introuvable dans $QuizMainEnvPath"
  }
  Write-Warning "ATTENTION DEV : the-school utilisera la MEME base que quiz-main."
  Set-EnvPair -path $TheSchoolEnvPath -databaseUrl $db -directUrl $direct
  Write-Host "Mis a jour : $TheSchoolEnvPath" -ForegroundColor Green
  Write-Host "Puis : npx prisma migrate deploy" -ForegroundColor Yellow
  exit 0
}

Write-Host "Collez l'URL PostgreSQL (Supabase / Neon / local) :" -ForegroundColor Cyan
$url = Read-Host "DATABASE_URL"
if (-not $url) { Write-Error "URL vide"; exit 1 }
$direct = Read-Host "DIRECT_URL (Entree = identique a DATABASE_URL)"
if (-not $direct) { $direct = $url }

Set-EnvPair -path $TheSchoolEnvPath -databaseUrl $url -directUrl $direct
Write-Host "Mis a jour : $TheSchoolEnvPath" -ForegroundColor Green
Write-Host "Test : npm run health:db" -ForegroundColor Yellow
