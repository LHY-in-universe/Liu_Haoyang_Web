# 🔧 预览和部署问题排查指南

如果您在预览网站时遇到文件地址报错或资源加载失败的问题，请按以下步骤进行排查：

## 📋 快速检查清单

### 1. 文件路径验证 ✅
- [x] 所有HTML文件路径正确
- [x] CSS和JS文件路径正确  
- [x] 图片文件路径正确
- [x] Favicon文件路径正确
- [x] JSON数据文件路径正确

### 2. 服务器设置检查

#### 使用本地HTTP服务器（推荐）
```bash
# 在项目根目录运行
python3 -m http.server 8080
# 然后访问 http://localhost:8080
```

#### 或使用Node.js服务器
```bash
# 全局安装http-server
npm install -g http-server

# 在项目根目录运行
http-server -p 8080
```

#### 或使用Live Server（VS Code扩展）
1. 安装Live Server扩展
2. 右键点击index.html
3. 选择"Open with Live Server"

### 3. 浏览器相关问题

#### 清除缓存
- Chrome: `Ctrl+Shift+R` (Windows) 或 `Cmd+Shift+R` (Mac)
- Firefox: `Ctrl+F5` 或 `Cmd+Shift+R`
- Safari: `Cmd+Option+R`

#### 检查控制台错误
1. 打开开发者工具 (F12)
2. 查看Console标签页
3. 查看Network标签页中的失败请求

### 4. 文件权限检查
```bash
# 确保文件有读取权限
find . -name "*.html" -exec chmod 644 {} \;
find . -name "*.css" -exec chmod 644 {} \;
find . -name "*.js" -exec chmod 644 {} \;
find . -name "*.jpg" -exec chmod 644 {} \;
find . -name "*.png" -exec chmod 644 {} \;
find . -name "*.svg" -exec chmod 644 {} \;
```

## 🛠️ 常见问题解决

### 问题1：页面样式丢失
**症状**: 页面显示但没有CSS样式
**解决方案**:
1. 检查CSS文件路径是否正确
2. 确认CSS文件存在且可读
3. 检查服务器MIME类型设置

### 问题2：图片无法显示
**症状**: 图片显示为破损图标
**解决方案**:
1. 验证图片文件路径
2. 检查图片文件是否存在
3. 确认图片文件格式支持

### 问题3：JavaScript功能失效
**症状**: 交互功能不工作
**解决方案**:
1. 检查浏览器控制台的JavaScript错误
2. 验证JS文件路径
3. 检查跨域政策(CORS)问题

### 问题4：字体加载失败
**症状**: 文字显示为系统默认字体
**解决方案**:
1. 检查网络连接
2. 确认Google Fonts可访问
3. 考虑使用本地字体备份

### 问题5：Favicon不显示
**症状**: 浏览器标签页没有图标
**解决方案**:
1. 清除浏览器缓存
2. 检查favicon文件路径和格式
3. 等待浏览器缓存更新(可能需要几分钟)

## 🔍 调试工具

### 1. 使用内置的路径调试页面
访问 `/path-debug.html` 页面，查看所有资源的加载状态。

### 2. 使用路径检查脚本
```bash
node tools/fix-paths.js
```

### 3. 手动测试资源
```bash
# 测试CSS文件
curl -I http://localhost:8080/src/css/styles.css

# 测试图片文件
curl -I http://localhost:8080/public/images/personal/zhang-haoyan.jpg

# 测试JSON数据
curl -I http://localhost:8080/posts/posts.json
```

## 📱 移动端调试

### iOS Safari
1. 在iOS设备上打开网站
2. 在Mac上打开Safari开发者菜单
3. 选择设备进行远程调试

### Android Chrome
1. 启用USB调试
2. 在Chrome中访问 `chrome://inspect`
3. 选择设备进行调试

## 🚀 部署前检查

### GitHub Pages部署
1. 确保所有文件都已提交
2. 检查GitHub Pages设置
3. 验证自定义域名配置(如果使用)

### 其他平台部署
1. 确认服务器支持静态文件服务
2. 检查文件上传完整性
3. 验证目录结构正确

## 📞 获取帮助

如果问题仍然存在，请提供以下信息：

1. **浏览器信息**: 名称和版本
2. **操作系统**: Windows/Mac/Linux版本
3. **错误信息**: 控制台中的具体错误
4. **访问方式**: 本地服务器/文件协议/部署平台
5. **问题页面**: 具体哪个页面出现问题

---

**最后更新**: 2024-12-07
**状态**: ✅ 所有已知路径问题已修复