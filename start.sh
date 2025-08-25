#!/bin/bash

# 简化的启动脚本 - 调用scripts目录中的详细脚本
echo "🚀 启动刘浩洋个人网站预览服务器..."
echo ""

# 检查scripts目录是否存在
if [ ! -f "./scripts/start-server.sh" ]; then
    echo "❌ 找不到启动脚本，请确保项目文件完整"
    exit 1
fi

# 调用详细的启动脚本
chmod +x ./scripts/start-server.sh
exec ./scripts/start-server.sh "$@"