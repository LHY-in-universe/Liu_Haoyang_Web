@echo off
chcp 65001 > nul
title 刘浩洋个人网站 - 本地预览服务器

echo 🚀 刘浩洋个人网站 - 本地预览服务器
echo ==================================
echo.

:: 检查Python是否可用
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ 检测到 Python
    set SERVER_CMD=python -m http.server
    set SERVER_TYPE=Python HTTP Server
    goto :start_server
)

python3 --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ 检测到 Python3
    set SERVER_CMD=python3 -m http.server
    set SERVER_TYPE=Python3 HTTP Server
    goto :start_server
)

:: 检查Node.js和http-server
where node >nul 2>&1
if %errorlevel% == 0 (
    npm list -g http-server >nul 2>&1
    if %errorlevel% == 0 (
        echo ✅ 检测到 http-server
        set SERVER_CMD=http-server
        set SERVER_TYPE=Node.js HTTP Server
        goto :start_server
    )
)

echo ❌ 未找到可用的HTTP服务器
echo.
echo 请安装以下任意一个:
echo 1. Python: https://python.org
echo 2. Node.js + http-server: npm install -g http-server
echo.
pause
exit /b 1

:start_server
set PORT=8080

:: 检查端口是否被占用
netstat -an | findstr :8080 >nul
if %errorlevel% == 0 (
    echo ⚠️  端口 8080 已被占用，尝试使用端口 8081
    set PORT=8081
    netstat -an | findstr :8081 >nul
    if %errorlevel% == 0 (
        echo ❌ 端口 8081 也被占用
        echo 请手动关闭占用端口的程序或指定其他端口
        pause
        exit /b 1
    )
)

echo 📡 服务器类型: %SERVER_TYPE%
echo 🌐 服务器端口: %PORT%
echo 📂 网站目录: %CD%
echo.

echo 🌟 访问链接:
echo    主页: http://localhost:%PORT%
echo    博客: http://localhost:%PORT%/src/pages/blog.html
echo    文档: http://localhost:%PORT%/src/pages/documents.html
echo    简历: http://localhost:%PORT%/src/pages/resume.html
echo    张昊岩: http://localhost:%PORT%/src/pages/zhang-haoyan.html
echo.
echo 🔧 调试页面: http://localhost:%PORT%/path-debug.html
echo.

echo 💡 操作提示:
echo    - 按 Ctrl+C 停止服务器
echo    - 修改文件后刷新浏览器即可看到效果
echo    - 建议使用 Ctrl+Shift+R 强制刷新
echo.

echo 🖥️  正在打开浏览器...
start "" "http://localhost:%PORT%"

echo.
echo 🚀 启动服务器...
echo ==================================

:: 启动服务器
if "%SERVER_CMD%" == "http-server" (
    %SERVER_CMD% -p %PORT%
) else (
    %SERVER_CMD% %PORT% --bind 127.0.0.1
)