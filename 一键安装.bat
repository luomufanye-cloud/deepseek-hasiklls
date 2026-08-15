@echo off
chcp 65001 >nul
title DeepSeek Harness 一键安装
echo ================================================
echo   DeepSeek Harness 美化版一键安装
echo ================================================
echo.
echo 正在启动安装脚本，请稍候...
echo （若出现 Windows 安全警告，请选择"仍要运行"）
echo.

:: 自动以绕过执行策略的方式运行 setup.ps1
PowerShell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup.ps1"

echo.
echo 安装脚本已结束。
pause
