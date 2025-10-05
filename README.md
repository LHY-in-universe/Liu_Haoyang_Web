# 刘浩洋的个人网站

基于 Vue 3 + TypeScript + Vite 构建的现代化个人网站，包含完整的博客系统。

🌐 **在线访问**: https://lhy-in-universe.github.io/Liu_Haoyang_Web/

## ✨ 功能特性

### 🎨 核心功能
- ✅ 响应式设计，完美适配移动端和桌面端
- ✅ 深色/浅色主题切换
- ✅ 平滑的页面过渡动画
- ✅ 全局错误处理和边界组件

### 📝 博客系统
- ✅ **Markdown 文章支持**
  - 代码语法高亮（100+ 语言）
  - LaTeX 数学公式渲染
  - 自动生成目录导航
  - 阅读进度条
- ✅ **PDF 文档支持**
  - 嵌入式 PDF 预览
  - 下载和新窗口打开
- ✅ **智能搜索和筛选**
  - 分类筛选
  - 关键词搜索
  - 标签系统
- ✅ **优质用户体验**
  - Toast 通知系统
  - 骨架屏加载
  - 图片懒加载
  - SEO 优化

### 🎮 特色功能
- ✅ Canvas 粒子特效系统
- ✅ 找猫咪小游戏
- ✅ 多语言支持（中文/英文）

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173/Liu_Haoyang_Web/

### 构建生产版本

```bash
npm run build
```

### 类型检查

```bash
npm run type-check
```

### 部署到 GitHub Pages

```bash
npm run deploy
```

详细部署说明请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📦 技术栈

- **前端框架**: Vue 3 (Composition API)
- **开发语言**: TypeScript
- **构建工具**: Vite 7
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **Markdown**: Marked + DOMPurify
- **代码高亮**: Highlight.js
- **数学公式**: KaTeX
- **工具库**: @vueuse/core, @vueuse/head

## 📁 项目结构

```
Liu_Haoyang_Web/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署
├── public/
│   ├── blog-posts/             # Markdown 博客文章
│   ├── documents/              # PDF 文档
│   ├── images/                 # 图片资源
│   └── 404.html                # SPA 路由处理
├── src/
│   ├── components/
│   │   ├── blog/              # 博客组件
│   │   │   ├── BlogPost.vue
│   │   │   ├── BlogSkeleton.vue
│   │   │   ├── MarkdownRenderer.vue
│   │   │   ├── PdfViewer.vue
│   │   │   ├── ReadingProgress.vue
│   │   │   └── TableOfContents.vue
│   │   └── common/            # 通用组件
│   │       ├── ErrorBoundary.vue
│   │       ├── Footer.vue
│   │       ├── LazyImage.vue
│   │       ├── Navbar.vue
│   │       ├── ThemeToggle.vue
│   │       └── Toast.vue
│   ├── composables/           # 组合式函数
│   ├── config/                # 配置文件
│   │   └── blog-posts.ts     # 博客配置
│   ├── stores/               # Pinia 状态管理
│   ├── styles/               # 全局样式
│   └── views/                # 页面组件
├── BLOG_IMPROVEMENTS.md      # 博客优化文档
├── DEPLOYMENT.md             # 部署指南
└── vite.config.js           # Vite 配置
```

## 📝 博客使用

### 添加 Markdown 文章

1. 在 `public/blog-posts/` 创建 `.md` 文件
2. 在 `src/config/blog-posts.ts` 添加文章配置

详细使用说明请查看 [BLOG_USAGE.md](./BLOG_USAGE.md)

## 🎯 部署

### GitHub Pages（推荐）

**自动部署**:
1. 推送代码到 GitHub
2. GitHub Actions 自动构建和部署
3. 访问 https://lhy-in-universe.github.io/Liu_Haoyang_Web/

**手动部署**:
```bash
npm run deploy
```

详细步骤查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📊 性能优化

- ✅ 代码分割（按路由和库）
- ✅ 图片懒加载
- ✅ Canvas 渲染优化
- ✅ 骨架屏加载提示
- ✅ 资源预加载

## 🌐 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 📖 文档

- [博客系统使用指南](./BLOG_USAGE.md)
- [博客优化文档](./BLOG_IMPROVEMENTS.md)
- [部署指南](./DEPLOYMENT.md)
- [快速开始](./QUICK_START.md)
- [升级说明](./UPGRADE_NOTES.md)

## 👤 作者

**刘浩洋**
- GitHub: [@LHY-in-universe](https://github.com/LHY-in-universe)
- Email: lhy200415@icloud.com

## 📄 License

MIT License

---

⭐ 如果觉得这个项目有帮助，欢迎 Star！
