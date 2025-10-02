# 刘浩洋个人网站 - Vue 3 版本

这是使用 Vue 3 + Vite 重构的个人网站项目。

## 🚀 技术栈

- **Vue 3** - 渐进式JavaScript框架
- **Vite** - 下一代前端构建工具
- **Vue Router** - 官方路由管理器
- **Pinia** - 新一代状态管理工具
- **Marked.js** - Markdown解析器

## 📦 项目结构

```
vue-app/
├── src/
│   ├── assets/          # 静态资源
│   ├── components/      # 可复用组件
│   │   ├── common/      # 通用组件(Navbar, Footer, ThemeToggle)
│   │   ├── home/        # 首页组件
│   │   ├── blog/        # 博客组件
│   │   └── resume/      # 简历组件
│   ├── views/           # 页面级组件
│   │   ├── Home.vue
│   │   ├── Blog.vue
│   │   ├── Documents.vue
│   │   └── Resume.vue
│   ├── router/          # 路由配置
│   ├── stores/          # Pinia状态管理
│   │   ├── theme.js     # 主题管理
│   │   └── language.js  # 语言管理
│   ├── composables/     # 组合式函数
│   ├── utils/           # 工具函数
│   ├── styles/          # 全局样式
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── public/              # 公共静态资源
├── vite.config.js       # Vite配置
└── package.json
```

## ⚙️ 开发

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## ✨ 主要功能

- ✅ 响应式设计
- ✅ 深色/浅色主题切换
- ✅ 中英文双语支持
- ✅ 路由懒加载
- ✅ 代码分割优化
- ✅ Markdown文章渲染
- ✅ 动态页面过渡动画

## 🎨 核心组件

### 通用组件
- **Navbar** - 导航栏,支持响应式和移动端菜单
- **Footer** - 页脚,包含社交链接
- **ThemeToggle** - 主题切换按钮
- **LanguageSwitcher** - 语言切换器

### 页面组件
- **Home.vue** - 首页(Hero, About, Projects, Contact)
- **Blog.vue** - 博客列表页(分页、筛选)
- **Documents.vue** - 文档管理页
- **Resume.vue** - 个人简历页

## 🔧 配置

### Vite配置
- Base URL: `/Liu_Haoyang_Web/`
- 输出目录: `dist`
- 代码分割: Vue相关包独立chunk

### 路由配置
- History模式
- 懒加载所有页面组件
- 支持锚点平滑滚动

## 📝 状态管理

### Theme Store
- 管理深色/浅色主题
- 自动保存用户偏好到 localStorage
- 监听系统主题变化

### Language Store
- 管理中英文切换
- 提供翻译函数 `t(key)`
- 持久化语言偏好

## 🚀 部署

项目配置为部署到 GitHub Pages:

1. 构建项目:
```bash
npm run build
```

2. dist目录即为部署文件

3. GitHub Pages 配置:
   - Base URL: `/Liu_Haoyang_Web/`
   - 部署分支: 根据原项目配置

## 📄 从原项目迁移

本Vue版本保留了原HTML/CSS/JS项目的所有功能:

- ✅ 所有页面(首页、博客、文档、简历)
- ✅ 主题系统(深色/浅色模式)
- ✅ 语言切换(中英文)
- ✅ Markdown渲染
- ✅ 响应式布局
- ✅ 动画效果

### 优势
- 🚀 更好的性能(代码分割、懒加载)
- 📦 组件化架构(更易维护)
- 🔄 响应式数据流(Pinia状态管理)
- 🛠 更好的开发体验(HMR、TypeScript支持)
- 📱 SPA体验(无刷新页面切换)

## 📞 联系方式

- GitHub: [LHY-in-universe](https://github.com/LHY-in-universe)
- Email: lhy200415@icloud.com

---

© 2024 刘浩洋. 保留所有权利.
