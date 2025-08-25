#!/bin/bash

# 网站预览服务器启动脚本
# 用于快速启动本地HTTP服务器预览网站

echo "🚀 刘浩洋个人网站 - 本地预览服务器"
echo "=================================="
echo ""

# 检查Python是否可用
if command -v python3 &> /dev/null; then
    echo "✅ 检测到 Python3"
    SERVER_CMD="python3 -m http.server"
    SERVER_TYPE="Python3 HTTP Server"
elif command -v python &> /dev/null; then
    echo "✅ 检测到 Python"
    SERVER_CMD="python -m SimpleHTTPServer"
    SERVER_TYPE="Python HTTP Server"
elif command -v node &> /dev/null && npm list -g http-server &> /dev/null; then
    echo "✅ 检测到 http-server"
    SERVER_CMD="http-server"
    SERVER_TYPE="Node.js HTTP Server"
else
    echo "❌ 未找到可用的HTTP服务器"
    echo ""
    echo "请安装以下任意一个："
    echo "1. Python3: https://python.org"
    echo "2. Node.js + http-server: npm install -g http-server"
    echo ""
    exit 1
fi

# 检查端口是否可用
PORT=8080
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  端口 $PORT 已被占用，尝试使用端口 8081"
    PORT=8081
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
        echo "❌ 端口 $PORT 也被占用，请手动指定端口"
        echo "使用方法: $0 [端口号]"
        exit 1
    fi
fi

# 用户指定端口
if [ ! -z "$1" ]; then
    PORT=$1
    echo "🔧 使用指定端口: $PORT"
fi

echo "📡 启动服务器类型: $SERVER_TYPE"
echo "🌐 服务器端口: $PORT"
echo "📂 网站目录: $(pwd)"
echo ""

# 显示访问链接
echo "🌟 访问链接:"
echo "   主页: http://localhost:$PORT"
echo "   博客: http://localhost:$PORT/src/pages/blog.html"
echo "   文档: http://localhost:$PORT/src/pages/documents.html"
echo "   简历: http://localhost:$PORT/src/pages/resume.html"
echo "   张昊岩: http://localhost:$PORT/src/pages/zhang-haoyan.html"
echo ""
echo "🔧 调试页面: http://localhost:$PORT/path-debug.html"
echo ""

# 显示操作提示
echo "💡 操作提示:"
echo "   - 按 Ctrl+C 停止服务器"
echo "   - 修改文件后刷新浏览器即可看到效果"
echo "   - 建议使用 Ctrl+Shift+R 强制刷新"
echo ""

# 尝试自动打开浏览器
if command -v open &> /dev/null; then
    echo "🖥️  正在打开浏览器..."
    open "http://localhost:$PORT" &
elif command -v xdg-open &> /dev/null; then
    echo "🖥️  正在打开浏览器..."
    xdg-open "http://localhost:$PORT" &
elif command -v start &> /dev/null; then
    echo "🖥️  正在打开浏览器..."
    start "http://localhost:$PORT" &
else
    echo "🌐 请手动打开浏览器访问: http://localhost:$PORT"
fi

echo ""
echo "🚀 启动服务器..."
echo "=================================="

# 启动服务器
if [[ $SERVER_CMD == *"SimpleHTTPServer"* ]]; then
    $SERVER_CMD $PORT
else
    $SERVER_CMD $PORT --bind 127.0.0.1
fi