# Délègue à quiz-main (site payant) — les deux projets partagent les mêmes clés.
$quizMainScript = Join-Path (Split-Path $PSScriptRoot -Parent | Split-Path -Parent) "quiz-main\scripts\setup-sync-env.ps1"
$theSchoolRoot = Resolve-Path (Join-Path $PSScriptRoot "..") | Select-Object -ExpandProperty Path

if (-not (Test-Path $quizMainScript)) {
  $quizMainScript = "C:\xampp\htdocs\quiz-main\scripts\setup-sync-env.ps1"
}

& $quizMainScript @PSBoundParameters -TheSchoolRoot $theSchoolRoot
