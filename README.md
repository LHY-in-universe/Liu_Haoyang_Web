# 🌟 刘浩洋个人网站

欢迎访问刘浩洋的个人网站！这是一个现代化的响应式网站，包含博客、文档、简历等多个功能模块。

## 📋 目录

- [功能特性](#-功能特性)
- [快速开始](#-快速开始)
- [项目结构](#-项目结构)
- [主要页面](#-主要页面)
- [技术栈](#-技术栈)
- [开发指南](#-开发指南)
- [部署说明](#-部署说明)
- [问题排查](#-问题排查)
- [更新日志](#-更新日志)

## ✨ 功能特性

### 🎨 界面设计
- ✅ 现代化响应式设计
- ✅ 深色/浅色主题切换
- ✅ 优雅的动画效果
- ✅ 移动端友好

### 🌐 多语言支持
- ✅ 中文/英文双语
- ✅ 语言切换功能
- ✅ 本地化内容

### 📱 功能模块
- ✅ 个人主页
- ✅ 技术博客系统
- ✅ 学术文档管理
- ✅ 在线简历
- ✅ 特色个人页面(张昊岩)

### ⚡ 性能优化
- ✅ 图片懒加载
- ✅ 资源预加载
- ✅ 性能监控
- ✅ SEO 优化

### 🎯 用户体验
- ✅ 无障碍访问支持
- ✅ 键盘导航
- ✅ 屏幕阅读器支持
- ✅ 渐进式增强

## 🚀 快速开始

### 方法一：一键启动（推荐）

#### macOS/Linux
```bash
# 进入项目目录
cd Liu_Haoyang_Web

# 运行启动脚本
./start.sh
```

#### Windows
```batch
# 进入项目目录
cd Liu_Haoyang_Web

# 运行启动脚本
start.bat
```

### 方法二：手动启动

#### 使用Python（推荐）
```bash
# Python 3
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

#### 使用Node.js
```bash
# 安装http-server
npm install -g http-server

# 启动服务器
http-server -p 8080
```

### 方法三：VS Code Live Server
1. 安装 Live Server 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

## 📋 目录

- [功能特性](#-功能特性)
- [快速开始](#-快速开始)
- [项目结构](#-项目结构)
- [文档](#-文档)
- [部署](#-部署)
- [贡献](#-贡献)
- [许可证](#-许可证)

## ✨ 功能特性

### 🎨 现代化设计
- 📱 完全响应式设计，适配所有设备
- 🌙 深色/浅色主题支持
- ⚡ 流畅的动画和交互效果
- 🎯 现代化的 UI/UX 设计

### 🏠 个人主页
- 👨‍💻 个人介绍和技能展示
- 💼 项目作品集展示
- 📧 联系方式和社交媒体链接
- 🚀 平滑滚动和视差效果

### 📝 智能博客系统
- ✍️ Markdown 文章支持
- 🏷️ 文章分类和标签系统
- 🔍 全文搜索功能
- 🌐 中英双语支持
- 📊 阅读统计和互动功能
- 🖼️ 完整的图片管理系统
- 🤖 自动化构建和发布

### 📄 专业简历
- 📑 在线简历展示
- 💯 技能可视化图表
- 🎓 教育背景和工作经历
- 🖨️ 打印优化和 PDF 导出
- 🏆 证书和荣誉展示

### 🔧 开发者功能
- 🛠️ 完整的 CLI 工具集
- 📸 智能图片管理和优化
- 🚀 自动化部署流程
- 📈 性能监控和分析

## 🚀 快速开始

### 1. 环境要求

- Node.js >= 14.0.0
- Python >= 3.6 (用于本地服务器)
- Git

### 2. 安装项目

```bash
# 克隆项目
git clone https://github.com/LHY-in-universe/Liu_Haoyang_Web.git
cd Liu_Haoyang_Web

# 安装依赖
npm install
```

### 3. 开发命令

```bash
# 构建博客
npm run build

# 启动开发服务器
npm run dev

# 创建新文章
npm run new "我的第一篇文章"

# 图片管理
npm run image-scan      # 扫描图片使用情况
npm run image-optimize  # 优化图片
```

### 4. 访问网站

打开浏览器访问 `http://localhost:8000`

## 📁 项目结构

```
Liu_Haoyang_Web/
├── 📄 index.html               # 🏠 主入口页面
├── 📄 start.sh / start.bat     # 🚀 快速启动脚本
├── 📄 README.md                # 📖 项目说明
├── 📄 package.json             # 📦 Node.js配置
├── 📄 sitemap.xml             # 🗺️ 网站地图
├── 📄 robots.txt              # 🤖 搜索引擎规则
├── 📄 404.html                # ❌ 404错误页面
├── 📄 _config.yml             # ⚙️ Jekyll配置
├── 📁 scripts/                 # 🔧 启动脚本
│   ├── start-server.sh         # 详细启动脚本(Linux/macOS)
│   └── start-server.bat        # 详细启动脚本(Windows)
├── 📁 dev/                     # 🛠️ 开发工具
│   ├── path-debug.html         # 路径调试页面
│   └── path-test.html          # 路径测试页面
├── 📁 docs/                    # 📚 项目文档
│   ├── BLOG-SYSTEM.md          # 博客系统使用指南
│   ├── IMAGE-MANAGEMENT.md     # 图片管理文档
│   ├── DOCUMENT-SYSTEM.md      # 文档管理系统指南
│   ├── DEPLOYMENT.md           # 部署指南
│   ├── DEVELOPMENT.md          # 开发指南
│   ├── DEPLOYMENT-CHECKLIST.md # 部署检查清单
│   └── TROUBLESHOOTING.md      # 问题排查指南
├── 📁 src/                     # 🎨 源代码文件
│   ├── css/                    # 样式文件
│   │   └── styles.css          # 主样式文件
│   ├── js/                     # JavaScript文件
│   │   ├── script.js           # 前端交互逻辑
│   │   └── pdf-preview.js      # PDF预览功能
│   └── pages/                  # 页面文件
│       ├── index.html          # 中文主页
│       ├── index-en.html       # 英文主页
│       ├── blog.html           # 中文博客页面
│       ├── blog-en.html        # 英文博客页面
│       ├── documents.html      # 中文文档页面
│       ├── documents-en.html   # 英文文档页面
│       ├── resume.html         # 中文简历页面
│       ├── resume-en.html      # 英文简历页面
│       └── zhang-haoyan.html   # 张昊岩个人页面
├── 📁 public/                  # 🌐 静态资源
│   ├── documents/              # 📄 文档管理系统
│   │   ├── documents.json      # 文档索引配置
│   │   ├── academic/           # 学术论文
│   │   ├── presentations/      # 演讲稿
│   │   └── resume/             # 简历文档
│   └── images/                 # 🖼️ 图片资源管理
│       ├── posts/              # 博客文章图片
│       ├── articles/           # 文章封面
│       ├── common/             # 通用图片
│       └── personal/           # 个人照片
├── 📁 tools/                   # 🔧 构建工具
│   ├── build-blog.js           # 博客构建工具
│   ├── image-manager.js        # 图片管理工具
│   ├── document-manager.js     # 文档管理工具
│   └── fix-paths.js            # 路径修复工具
├── 📁 templates/               # 📝 HTML模板
│   ├── article-zh.html         # 中文文章模板
│   └── article-en.html         # 英文文章模板
├── 📁 posts/                   # ✍️ Markdown 文章
│   ├── posts.json              # 文章索引
│   └── *.md                    # 博客文章文件
├── 📁 articles/                # 🌐 生成的 HTML 文章
└── 📁 .github/workflows/       # ⚙️ GitHub Actions
    └── deploy.yml              # 自动部署配置
```

## 📚 文档

- 📖 [博客系统使用指南](docs/BLOG-SYSTEM.md) - 详细的博客创建和管理教程
- 📄 [文档管理系统指南](docs/DOCUMENT-SYSTEM.md) - 完整的文档管理系统使用说明
- 🖼️ [图片管理文档](docs/IMAGE-MANAGEMENT.md) - 完整的图片管理系统使用说明
- 🚀 [部署指南](docs/DEPLOYMENT.md) - 各种部署平台的配置方法
- 🛠️ [开发指南](docs/DEVELOPMENT.md) - 项目开发和自定义扩展指南

## 🌐 部署

### GitHub Pages (推荐)

项目已配置自动部署，只需推送代码：

```bash
git add .
git commit -m "更新网站内容"
git push origin master
```

GitHub Actions 会自动构建并部署到 GitHub Pages。

### 其他平台

- 📘 **Netlify**: 导入 GitHub 仓库即可
- ▲ **Vercel**: 一键部署
- 🌊 **Surge.sh**: 适合快速预览
- 🖥️ **自定义服务器**: 查看[部署指南](docs/DEPLOYMENT.md)

## 🛠️ 核心技术

### 前端技术栈
- **HTML5/CSS3/JavaScript ES6+** - 现代化前端技术
- **CSS Grid/Flexbox** - 响应式布局
- **CSS Variables** - 主题系统
- **Intersection Observer API** - 性能优化

### 构建工具
- **Node.js** - 服务端运行时
- **Marked.js** - Markdown 解析
- **Sharp** - 图片处理和优化
- **GitHub Actions** - CI/CD 自动化

### 特色功能
- 🤖 **零配置** - 开箱即用的博客系统
- 📱 **PWA 就绪** - 支持离线访问
- 🔍 **SEO 优化** - 搜索引擎友好
- ⚡ **性能优化** - 快速加载和流畅体验

## 📊 使用统计

```bash
# 查看项目统计
npm run stats

# 检查网站性能
npm run performance-check

# 生成站点地图
npm run generate-sitemap
```

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](CONTRIBUTING.md)。

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 贡献者

感谢所有贡献者的支持！

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 📞 联系方式

- **GitHub**: [@LHY-in-universe](https://github.com/LHY-in-universe)
- **Email**: liuhaoyang@example.com  
- **Website**: https://lhy-in-universe.github.io/Liu_Haoyang_Web

## 🙏 致谢

- [Marked.js](https://github.com/markedjs/marked) - Markdown 解析器
- [Sharp](https://github.com/lovell/sharp) - 图片处理库
- [GitHub Pages](https://pages.github.com/) - 免费托管服务

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给一个 Star！**

[![Stars](https://img.shields.io/github/stars/LHY-in-universe/Liu_Haoyang_Web.svg?style=social&label=Star)](https://github.com/LHY-in-universe/Liu_Haoyang_Web/stargazers)
[![Forks](https://img.shields.io/github/forks/LHY-in-universe/Liu_Haoyang_Web.svg?style=social&label=Fork)](https://github.com/LHY-in-universe/Liu_Haoyang_Web/network/members)
[![Watchers](https://img.shields.io/github/watchers/LHY-in-universe/Liu_Haoyang_Web.svg?style=social&label=Watch)](https://github.com/LHY-in-universe/Liu_Haoyang_Web/watchers)

Made with ❤️ by [刘浩洋](https://github.com/LHY-in-universe)

</div>