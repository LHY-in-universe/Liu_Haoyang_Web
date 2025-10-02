# 🚀 Vue个人网站 - 快速开始

## 立即使用

### 1️⃣ 安装依赖
```bash
cd vue-app
npm install
```

### 2️⃣ 启动开发服务器
```bash
npm run dev
```
访问: http://localhost:5173/Liu_Haoyang_Web/

### 3️⃣ 构建生产版本
```bash
npm run build
```

### 4️⃣ 预览构建结果
```bash
npm run preview
```
访问: http://localhost:4173/Liu_Haoyang_Web/

---

## 页面导航

| 页面 | 路由 | 描述 |
|------|------|------|
| 首页 | `/` | Hero + About + Projects + Contact |
| 博客 | `/blog` | 博客列表,分页功能 |
| 文档 | `/documents` | 文档管理系统 |
| 简历 | `/resume` | 个人简历,PDF下载 |
| **🐱彩蛋** | `/zhang-haoyan` | 张昊岩可爱页面(隐藏) |

---

## 核心功能

### 主题切换 🌙
- 深色/浅色模式
- localStorage自动保存
- 全局同步

### 语言切换 🌐
- 中文/English
- 导航栏右上角切换

### 彩蛋页面 🐱
- Footer中点击半透明🐱表情
- 或直接访问 `/zhang-haoyan`
- 15+互动特效等你发现!

---

## 项目结构

```
vue-app/
├── src/
│   ├── views/         # 5个页面组件
│   ├── components/    # 通用组件
│   ├── stores/        # Pinia状态管理
│   ├── composables/   # 组合式函数
│   └── router/        # 路由配置
├── dist/             # 构建产物
└── public/           # 静态资源
```

---

## 常用命令

```bash
# 开发
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览构建结果

# 部署
npm run deploy       # (可自定义)部署到GitHub Pages
```

---

## 环境要求

- Node.js >= 18
- npm >= 9

---

## 文档索引

| 文档 | 说明 |
|------|------|
| [README_ZH.md](README_ZH.md) | 完整项目说明 |
| [DEPLOYMENT.md](DEPLOYMENT.md) | 部署指南 |
| [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) | 迁移指南 |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | 项目总结 |
| [ZHANG_HAOYAN_PAGE.md](ZHANG_HAOYAN_PAGE.md) | 彩蛋页文档 |
| [FINAL_SUMMARY.md](FINAL_SUMMARY.md) | 最终总结 |

---

## 快速定制

### 修改个人信息
编辑: `src/stores/language.js`
```javascript
name: '你的名字'
```

### 修改主题色
编辑: `src/styles/global.css`
```css
--primary-color: #你的颜色;
```

### 添加新页面
1. 创建: `src/views/YourPage.vue`
2. 配置路由: `src/router/index.js`
3. 添加导航: `src/components/common/Navbar.vue`

---

## 快速部署

### GitHub Pages (推荐)
```bash
npm run build
git subtree push --prefix dist origin gh-pages
```

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
拖拽 `dist/` 文件夹到 Netlify

---

## 故障排查

### 端口被占用
```bash
# 修改端口
vite.config.js → server.port: 5174
```

### 路径错误
```bash
# 检查base配置
vite.config.js → base: '/你的仓库名/'
```

### 样式不生效
```bash
# 清除缓存重新构建
rm -rf dist node_modules
npm install
npm run build
```

---

## 技术支持

- 📧 Email: lhy200415@icloud.com
- 🐙 GitHub: [LHY-in-universe](https://github.com/LHY-in-universe)
- 📚 文档: 查看上方文档索引

---

## 下一步

1. ✅ 启动开发服务器
2. ✅ 访问 http://localhost:5173
3. ✅ 修改个人信息
4. ✅ 部署到线上
5. ✅ 分享给朋友!

---

**🎉 开始你的Vue之旅吧！**
