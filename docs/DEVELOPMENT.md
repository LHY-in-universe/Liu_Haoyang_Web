# 🛠️ 开发指南

本文档为开发者提供项目开发、自定义和扩展的详细指南。

## 📋 目录

- [开发环境设置](#开发环境设置)
- [项目架构](#项目架构)
- [核心功能详解](#核心功能详解)
- [自定义开发](#自定义开发)
- [API 文档](#api-文档)
- [贡献指南](#贡献指南)

## 💻 开发环境设置

### 1. 系统要求

- **Node.js**: >= 14.0.0
- **npm**: >= 6.0.0
- **Python**: >= 3.6 (用于本地服务器)
- **Git**: 最新版本

### 2. 克隆项目

```bash
git clone https://github.com/LHY-in-universe/Liu_Haoyang_Web.git
cd Liu_Haoyang_Web
```

### 3. 安装依赖

```bash
npm install
```

### 4. 开发命令

```bash
# 创建新文章
npm run new "文章标题"

# 构建网站
npm run build

# 启动开发服务器
npm run dev

# 启动本地服务器
npm run serve

# 监听文件变化自动构建
npm run watch

# 清理生成的文件
npm run clean

# 查看帮助
npm run help
```

## 🏗️ 项目架构

### 目录结构

```
Liu_Haoyang_Web/
├── 📁 docs/                    # 项目文档
│   ├── BLOG-SYSTEM.md          # 博客系统文档
│   ├── IMAGE-MANAGEMENT.md     # 图片管理文档
│   ├── DEPLOYMENT.md           # 部署指南
│   └── DEVELOPMENT.md          # 开发指南
├── 📁 posts/                   # Markdown 文章
│   ├── posts.json              # 文章索引
│   └── *.md                    # 文章文件
├── 📁 articles/                # 生成的 HTML 文章
├── 📁 images/                  # 图片资源
│   ├── posts/                  # 文章图片
│   ├── articles/               # 文章封面
│   └── common/                 # 通用图片
├── 📁 .github/workflows/       # GitHub Actions
│   └── deploy.yml              # 自动部署配置
├── 📄 index.html               # 主页
├── 📄 blog.html                # 中文博客页面
├── 📄 blog-en.html             # 英文博客页面
├── 📄 resume.html              # 中文简历页面
├── 📄 resume-en.html           # 英文简历页面
├── 🎨 styles.css               # 主样式文件
├── ⚡ script.js                # 主脚本文件
├── 🔧 build-blog.js            # 博客构建工具
├── 🖼️ image-manager.js         # 图片管理工具
├── 📦 package.json             # 项目配置
└── 📖 README.md                # 项目说明
```

### 核心模块

1. **build-blog.js** - 博客构建引擎
2. **image-manager.js** - 图片管理系统
3. **script.js** - 前端交互逻辑
4. **styles.css** - 响应式样式系统

## 🔧 核心功能详解

### 1. 博客构建系统 (build-blog.js)

#### 主要功能

- Markdown 转 HTML
- 文章索引管理
- 模板渲染
- 双语支持

#### 核心方法

```javascript
// 构建所有文章
async function buildAllArticles() {
    // 扫描 posts 目录
    // 解析 Front Matter
    // 转换 Markdown 为 HTML
    // 更新文章索引
    // 生成 HTML 文件
}

// 创建新文章
function createNewArticle(title, category, tags) {
    // 生成文件名
    // 创建模板
    // 设置 Front Matter
}
```

#### 配置选项

```javascript
const CONFIG = {
    postsDir: './posts',         // Markdown 文件目录
    articlesDir: './articles',   // HTML 输出目录
    templatesDir: './templates', // 模板目录
    blogPages: {
        zh: './blog.html',       // 中文博客页面
        en: './blog-en.html'     // 英文博客页面
    },
    defaultAuthor: '刘浩洋',
    outputEncoding: 'utf8'
};
```

### 2. 图片管理系统 (image-manager.js)

#### 主要功能

- 图片使用分析
- 自动优化压缩
- 目录管理
- 清理未使用图片

#### 核心方法

```javascript
// 扫描图片使用情况
function scanImages() {
    // 扫描所有图片文件
    // 检查图片引用
    // 生成使用报告
}

// 优化图片
function optimizeImages(directory, quality = 80) {
    // 使用 Sharp 压缩图片
    // 调整过大图片尺寸
    // 生成优化报告
}
```

### 3. 前端交互系统 (script.js)

#### 主要功能

- 博客筛选和搜索
- 响应式导航
- 平滑滚动
- 主题切换

#### 核心功能

```javascript
// 博客筛选
function filterPosts(category, language) {
    // 根据分类和语言筛选文章
    // 更新显示状态
    // 平滑动画效果
}

// 搜索功能
function searchPosts(keyword) {
    // 全文搜索
    // 高亮关键词
    // 实时结果更新
}
```

## 🎨 自定义开发

### 1. 添加新的文章分类

1. **更新配置**
   ```javascript
   // 在 build-blog.js 中添加新分类
   const CATEGORIES = {
       'tech': '技术',
       'tutorial': '教程',
       'life': '生活',
       'thoughts': '思考',
       'new-category': '新分类' // 添加新分类
   };
   ```

2. **更新样式**
   ```css
   /* 在 styles.css 中添加新分类样式 */
   .category-new-category {
       background: #your-color;
       color: white;
   }
   ```

3. **更新前端筛选**
   ```html
   <!-- 在 blog.html 中添加新筛选按钮 -->
   <button class="filter-btn" data-category="new-category">新分类</button>
   ```

### 2. 自定义文章模板

1. **创建模板目录**
   ```bash
   mkdir templates
   ```

2. **创建模板文件**
   ```html
   <!-- templates/article-zh.html -->
   <!DOCTYPE html>
   <html lang="zh-CN">
   <head>
       <meta charset="UTF-8">
       <title>{{title}}</title>
       <!-- 其他 meta 标签 -->
   </head>
   <body>
       <article>
           <header>
               <h1>{{title}}</h1>
               <div class="meta">
                   <time>{{date}}</time>
                   <span class="author">{{author}}</span>
               </div>
           </header>
           <main>{{content}}</main>
       </article>
   </body>
   </html>
   ```

3. **模板变量**
   - `{{title}}` - 文章标题
   - `{{content}}` - 文章内容
   - `{{date}}` - 格式化日期
   - `{{author}}` - 作者名称
   - `{{tags}}` - 标签 HTML
   - `{{excerpt}}` - 文章摘要
   - `{{readTime}}` - 阅读时间
   - `{{views}}` - 阅读数
   - `{{comments}}` - 评论数
   - `{{likes}}` - 点赞数

### 3. 扩展图片处理功能

```javascript
// 在 image-manager.js 中添加新功能
async function generateThumbnails(imagePath) {
    const sharp = require('sharp');
    
    await sharp(imagePath)
        .resize(300, 200, {
            fit: 'cover',
            position: 'center'
        })
        .jpeg({ quality: 80 })
        .toFile(thumbnailPath);
}

// 添加水印
async function addWatermark(imagePath, watermarkPath) {
    await sharp(imagePath)
        .composite([{
            input: watermarkPath,
            gravity: 'southeast'
        }])
        .toFile(outputPath);
}
```

### 4. 添加新的构建命令

```javascript
// 在 package.json 中添加新命令
{
    "scripts": {
        "custom-build": "node build-blog.js custom",
        "stats": "node build-blog.js stats",
        "backup": "node build-blog.js backup"
    }
}
```

```javascript
// 在 build-blog.js 中实现新命令
function handleCustomBuild() {
    // 自定义构建逻辑
}

function showStats() {
    // 显示统计信息
}

function backupPosts() {
    // 备份文章
}
```

## 📚 API 文档

### BuildBlog 类

```javascript
class BuildBlog {
    constructor(config) {}
    
    // 构建所有文章
    async buildAll() {}
    
    // 构建单篇文章
    async buildArticle(filePath) {}
    
    // 创建新文章
    createNew(title, category, tags) {}
    
    // 更新索引
    updateIndex() {}
}
```

### ImageManager 类

```javascript
class ImageManager {
    constructor(baseDir) {}
    
    // 扫描图片
    scan() {}
    
    // 优化图片
    optimize(directory, quality) {}
    
    // 清理未使用图片
    cleanup(confirm) {}
    
    // 创建文章图片目录
    createPostDir(slug) {}
}
```

## 🧪 测试

### 单元测试

```bash
# 安装测试依赖
npm install --save-dev jest

# 运行测试
npm test
```

### 测试文件示例

```javascript
// tests/build-blog.test.js
const BuildBlog = require('../build-blog');

describe('BuildBlog', () => {
    test('should create new article', () => {
        const builder = new BuildBlog();
        const result = builder.createNew('Test Article', 'tech', ['test']);
        expect(result).toBeTruthy();
    });
});
```

### 端到端测试

```bash
# 使用 Playwright 进行 E2E 测试
npm install --save-dev @playwright/test

# 运行 E2E 测试
npx playwright test
```

## 📈 性能优化

### 1. 构建性能优化

```javascript
// 并行处理文章
const articles = await Promise.all(
    markdownFiles.map(file => processArticle(file))
);

// 缓存已处理的文章
const cache = new Map();
if (cache.has(filePath)) {
    return cache.get(filePath);
}
```

### 2. 图片处理优化

```javascript
// 使用 Worker 线程处理图片
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
    const worker = new Worker(__filename);
    worker.postMessage(imagePath);
} else {
    parentPort.on('message', (imagePath) => {
        // 处理图片
    });
}
```

### 3. 前端性能优化

```javascript
// 图片懒加载
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
        }
    });
});

// 防抖搜索
const debouncedSearch = debounce(searchPosts, 300);
```

## 🐛 调试技巧

### 1. 启用调试模式

```bash
# 设置环境变量
export DEBUG=blog:*

# 运行命令
npm run build
```

### 2. 日志记录

```javascript
// 在 build-blog.js 中添加日志
const debug = require('debug')('blog:build');

debug('Processing file: %s', filePath);
debug('Generated HTML: %d characters', html.length);
```

### 3. 错误处理

```javascript
try {
    await buildArticle(file);
} catch (error) {
    console.error(`Error building ${file}:`, error);
    process.exit(1);
}
```

## 🤝 贡献指南

### 1. 开发流程

1. **Fork 项目**
2. **创建特性分支**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **提交更改**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **推送分支**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **创建 Pull Request**

### 2. 代码规范

- 使用 ESLint 检查代码
- 遵循 JavaScript Standard Style
- 添加适当的注释
- 编写测试用例

### 3. 提交规范

```
type(scope): description

[optional body]

[optional footer]
```

类型：
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 添加测试
- `chore`: 构建过程或辅助工具的变动

### 4. 问题报告

使用 GitHub Issues 报告问题，请包含：
- 问题描述
- 重现步骤
- 预期行为
- 实际行为
- 环境信息

---

**🎯 准备好开始开发了吗？查看 [BLOG-SYSTEM.md](BLOG-SYSTEM.md) 了解博客系统的详细使用方法！**