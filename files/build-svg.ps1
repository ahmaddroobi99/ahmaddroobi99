# build-svg.ps1
$ErrorActionPreference = "Stop"

# 1) TeX -> PDF
& pdflatex -interaction=nonstopmode -halt-on-error -shell-escape figure.tex

if (!(Test-Path "figure.pdf")) {
  throw "PDF not created. Check LaTeX errors in the terminal output."
}

# 2) PDF -> SVG
& dvisvgm --pdf --page=1 --no-fonts --exact --precision=4 -o figure.svg figure.pdf

Write-Host "`n✓ Done: figure.svg created" -ForegroundColor Green
