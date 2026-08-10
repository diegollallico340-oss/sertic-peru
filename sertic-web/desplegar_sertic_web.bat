@echo off
title Desplegar Pagina Web SERTIC a Cloudflare Pages
color 0B
echo ========================================================
echo   DESPLEGANDO PAGINA WEB DE SERTIC EN CLOUDFLARE PAGES
echo ========================================================
echo.

cd /d "%~dp0"

echo Subiendo archivos estaticos a Cloudflare Pages...
call npx -y wrangler pages deploy . --project-name sertic-web

echo.
echo ========================================================
echo   ¡DESPLIEGUE COMPLETADO EN CLOUDFLARE PAGES!
echo ========================================================
pause
