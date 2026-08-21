# Envia o music-art-pixel pro GitHub como madutiam.
# O login fica guardado na pasta .gh-madutiam (so deste projeto,
# nao mexe em nenhuma outra conta deste computador).

$env:GH_CONFIG_DIR = "$PSScriptRoot\.gh-madutiam"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "=== music-art-pixel -> GitHub (madutiam) ===" -ForegroundColor Cyan

gh auth status 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "PASSO 1: escolha 'Login with a web browser' (aperte Enter)" -ForegroundColor Yellow
    Write-Host "PASSO 2: COPIE o codigo que vai aparecer (XXXX-XXXX)" -ForegroundColor Yellow
    Write-Host "PASSO 3: no navegador, entre como MADUTIAM e digite o codigo" -ForegroundColor Yellow
    Write-Host "         (o link e: https://github.com/login/device)" -ForegroundColor Yellow
    Write-Host ""
    gh auth login --hostname github.com --git-protocol https
}

Write-Host ""
Write-Host "Enviando o site..." -ForegroundColor Cyan
git -c credential.helper="!gh auth git-credential" push origin main

Write-Host ""
Write-Host "Se apareceu 'main -> main' acima, DEU CERTO! Pode fechar." -ForegroundColor Green
