@echo off
chcp 65001 > nul
title 刘浩洋个人网站启动器

echo 🚀 启动刘浩洋个人网站预览服务器...
echo.

REM 检查scripts目录是否存在
if not exist "scripts\start-server.bat" (
    echo ❌ 找不到启动脚本，请确保项目文件完整
    pause
    exit /b 1
)

REM 调用详细的启动脚本
call scripts\start-server.bat %*