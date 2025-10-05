# 🚀 GitHub Pages 部署指南

本文档介绍如何将此项目部署到 GitHub Pages。

## 📋 前提条件

- ✅ GitHub 仓库已创建: `https://github.com/LHY-in-universe/Liu_Haoyang_Web`
- ✅ 项目已推送到 GitHub
- ✅ Node.js 和 npm 已安装

## 🎯 部署方式

本项目支持两种部署方式：

### 方式一：自动部署（推荐）⭐

**使用 GitHub Actions 自动部署**

#### 配置步骤：

1. **启用 GitHub Pages**
   - 访问仓库: https://github.com/LHY-in-universe/Liu_Haoyang_Web
   - 点击 `Settings` → `Pages`
   - Source 选择: `GitHub Actions`

2. **推送代码触发部署**
   ```bash
   git add .
   git commit -m "feat: 添加博客系统优化和 GitHub Pages 部署配置"
   git push origin main
   ```

3. **查看部署状态**
   - 访问 `Actions` 标签页
   - 查看 "Deploy to GitHub Pages" 工作流
   - 等待构建完成（约 2-3 分钟）

4. **访问网站**
   - 部署成功后访问: https://lhy-in-universe.github.io/Liu_Haoyang_Web/

#### 工作流说明：

文件位置: `.github/workflows/deploy.yml`

工作流会自动执行：
- ✅ 安装依赖
- ✅ TypeScript 类型检查
- ✅ 构建项目
- ✅ 部署到 GitHub Pages

每次推送到 `main` 分支都会自动触发部署。

### 方式二：手动部署

**使用 gh-pages 工具手动部署**

#### 部署命令：

```bash
# 一键部署（包含构建）
npm run deploy
```

这个命令会：
1. 运行 TypeScript 类型检查
2. 构建生产版本
3. 部署 `dist` 目录到 `gh-pages` 分支

#### 首次部署配置：

如果选择手动部署，需要配置 GitHub Pages：
- Settings → Pages
- Source: Deploy from a branch
- Branch: `gh-pages` / `root`

## 🛠️ 构建和预览

### 本地开发

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:5173/Liu_Haoyang_Web/
```

### 类型检查

```bash
# 运行 TypeScript 类型检查
npm run type-check
```

### 构建生产版本

```bash
# 构建
npm run build

# 预览构建结果
npm run preview
```

## 📁 重要配置说明

### 1. Base URL 配置

`vite.config.js`:
```javascript
export default defineConfig({
  base: '/Liu_Haoyang_Web/',  // 必须与仓库名一致
  // ...
})
```

### 2. 404 页面处理

`public/404.html` - 处理 Vue Router 客户端路由
- 所有 404 请求重定向到首页
- Vue Router 接管路由处理

### 3. GitHub Actions 权限

工作流需要以下权限：
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

## ✅ 部署验证清单

部署成功后，检查以下功能：

### 基础功能
- [ ] 首页正常加载
- [ ] 导航栏所有链接工作
- [ ] 页面路由切换正常

### 博客功能
- [ ] 博客列表页显示正常
- [ ] Markdown 文章打开正常
- [ ] 代码高亮正确显示
- [ ] 数学公式正确渲染
- [ ] PDF 文章加载正常
- [ ] 搜索和筛选功能正常
- [ ] Toast 通知正常弹出

### 样式和交互
- [ ] 所有 CSS 样式正确加载
- [ ] 图片资源正确显示
- [ ] 深色模式切换正常
- [ ] 移动端响应式正常
- [ ] 动画效果流畅

### SEO 和元数据
- [ ] 页面标题正确
- [ ] Meta 描述显示
- [ ] Open Graph 标签存在

## 🐛 常见问题

### 问题 1: 404 错误

**症状**: 刷新页面或直接访问子路由显示 404

**解决**:
- 确认 `public/404.html` 存在
- 检查 `index.html` 中的路由修复代码
- 清除浏览器缓存

### 问题 2: 资源加载失败

**症状**: CSS、JS 或图片 404

**解决**:
- 检查 `vite.config.js` 中 `base` 配置
- 确认与仓库名一致: `/Liu_Haoyang_Web/`
- 重新构建并部署

### 问题 3: GitHub Actions 失败

**症状**: 部署工作流失败

**解决**:
1. 检查 Actions 日志中的错误信息
2. 确认 GitHub Pages 设置为 "GitHub Actions"
3. 检查仓库权限设置
4. 验证 `package.json` 中依赖完整

### 问题 4: 类型检查失败

**症状**: 构建时 TypeScript 报错

**解决**:
```bash
# 本地运行类型检查
npm run type-check

# 修复类型错误后重新部署
```

## 🔄 更新网站

### 自动部署（推荐）

```bash
# 1. 修改代码
# 2. 提交更改
git add .
git commit -m "更新内容"
git push origin main

# 3. GitHub Actions 自动部署（无需其他操作）
```

### 手动部署

```bash
# 一键部署
npm run deploy
```

## 📊 性能优化建议

部署后可以进一步优化：

1. **图片优化**
   - 使用 WebP 格式
   - 压缩图片大小
   - 添加真实的封面图

2. **代码分割**
   - 已配置 `vue-vendor` chunk
   - 考虑按路由分割

3. **CDN 加速**
   - GitHub Pages 自带 CDN
   - 可考虑自定义域名

4. **SEO 优化**
   - 添加 sitemap.xml
   - 配置 robots.txt
   - Google Search Console 验证

## 🌐 自定义域名（可选）

如果有自己的域名：

1. **添加 CNAME 文件**
   ```bash
   echo "your-domain.com" > public/CNAME
   ```

2. **配置 DNS**
   - 添加 CNAME 记录指向: `lhy-in-universe.github.io`
   - 或添加 A 记录指向 GitHub Pages IP

3. **在 GitHub 设置自定义域名**
   - Settings → Pages → Custom domain

## 📈 网站分析（可选）

### 添加 Google Analytics

在 `index.html` 中添加：
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 📝 部署历史

查看部署历史：
- GitHub 仓库 → Actions 标签页
- 每次部署都有完整日志

## 💡 最佳实践

1. **版本管理**
   - 在 `package.json` 中更新版本号
   - 使用语义化版本

2. **分支策略**
   - `main` 分支自动部署
   - 开发使用 `dev` 分支
   - Pull Request 审查后合并

3. **测试**
   - 本地测试后再部署
   - 使用 `npm run preview` 预览构建结果

4. **备份**
   - 定期备份重要内容
   - 博客文章和配置文件

## 🎉 完成

恭喜！您的网站已成功部署到 GitHub Pages！

**访问地址**: https://lhy-in-universe.github.io/Liu_Haoyang_Web/

有问题请查看 GitHub Issues 或 Actions 日志。
