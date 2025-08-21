# 📝 自动化博客系统使用指南

这是一个强大的自动化博客系统，让您可以通过简单地添加Markdown文件来自动生成完整的HTML博客文章并更新相关路径。

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 创建新文章
```bash
npm run new "您的文章标题"
```

### 3. 编辑文章
在`posts/`目录下找到生成的Markdown文件，编辑您的内容。

### 4. 构建网站
```bash
npm run build
```

### 5. 预览网站
```bash
npm run serve
```

然后在浏览器中访问 `http://localhost:8000`

## 📁 目录结构

```
Liu_Haoyang_Web/
├── posts/                     # 📝 Markdown文件存放目录
│   ├── 2024-12-19-post.md    # 物理学文章示例
│   ├── 2025-02-07-post.md    # 实验技术文章示例
│   ├── posts.json            # 文章索引（自动生成）
│   └── ...
├── articles/                 # 📄 生成的HTML文章页面
│   ├── berry-phase.html      # 生成的HTML文章
│   ├── optically-detected-magnetic-resonance.html
│   └── ...
├── templates/                # 📝 HTML模板文件
│   ├── article-zh.html       # 中文文章模板
│   └── article-en.html       # 英文文章模板
├── public/images/            # 🖼️ 图片资源管理系统
│   ├── posts/                # 📂 文章图片（按文章分组）
│   │   ├── berry-phase/      # 特定文章的图片目录
│   │   └── optically-detected-magnetic-resonance/
│   ├── articles/             # 🎨 封面和缩略图
│   │   ├── covers/           # 封面图片 (1200×630px)
│   │   ├── thumbnails/    # 缩略图 (600×300px)
│   │   └── banners/       # 横幅图片
│   └── common/            # 🌟 通用图片资源
│       ├── avatars/       # 头像图片
│       ├── icons/         # 图标文件
│       ├── logos/         # 网站Logo
│       └── backgrounds/   # 背景图片
├── templates/             # 🎨 HTML模板文件（可选）
│   ├── article-zh.html    # 中文文章模板
│   └── article-en.html    # 英文文章模板
├── build-blog.js         # 🔧 构建脚本
├── image-manager.js       # 🖼️ 图片管理工具
├── package.json          # 📦 项目配置
├── blog.html            # 📋 中文博客列表页
├── blog-en.html         # 📋 英文博客列表页
└── README-BLOG.md       # 📖 本使用说明
```

## 📋 可用命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `npm run new` | 创建新文章模板 | `npm run new "React性能优化"` |
| `npm run build` | 构建所有文章 | `npm run build` |
| `npm run serve` | 启动本地服务器 | `npm run serve` |
| `npm run watch` | 监听文件变化自动构建 | `npm run watch` |
| `npm run clean` | 清理生成的HTML文件 | `npm run clean` |
| `npm run dev` | 构建并启动服务器 | `npm run dev` |

## ✍️ 文章编写规范

### Front Matter 配置

每个Markdown文件必须以Front Matter开头：

```markdown
---
title: 文章标题
date: 2024-08-11
category: tech
tags: [标签1, 标签2, 标签3]
author: 刘浩洋
language: zh
excerpt: 文章简要描述（可选，不提供会自动生成）
---

# 文章标题

您的文章内容...
```

### 字段说明

| 字段 | 必需 | 说明 | 可选值 |
|------|------|------|--------|
| `title` | ✅ | 文章标题 | 任意字符串 |
| `date` | ✅ | 发布日期 | YYYY-MM-DD格式 |
| `category` | ✅ | 文章分类 | `tech`, `tutorial`, `life`, `thoughts` |
| `tags` | ✅ | 文章标签 | 字符串数组，如 `[React, JavaScript]` |
| `author` | ❌ | 作者名称 | 默认为"刘浩洋" |
| `language` | ❌ | 语言 | `zh`(中文) 或 `en`(英文)，默认为`zh` |
| `excerpt` | ❌ | 文章摘要 | 不提供会从正文自动生成 |

### 支持的分类

- `tech` - 技术文章
- `tutorial` - 教程指南  
- `life` - 生活感悟
- `thoughts` - 思考随笔

### 双语支持

创建英文文章时：
1. 文件名添加`-en`后缀，如：`my-article-en.md`
2. Front Matter中设置 `language: en`
3. 使用英文标签，如 `tags: [React, JavaScript, Frontend]`

## 🔧 系统工作原理

### 1. 文件处理流程
```
Markdown文件 → 解析Front Matter → 转换为HTML → 生成文章页面
                     ↓
              更新博客列表页面 ← 更新posts.json索引
```

### 2. 自动化功能

- ✅ **自动生成HTML**: 将Markdown转换为格式化的HTML页面
- ✅ **自动更新列表**: 在博客列表页面中自动添加新文章
- ✅ **自动生成摘要**: 从文章内容中提取前200字作为摘要
- ✅ **自动计算阅读时间**: 基于文字数量估算阅读时间
- ✅ **自动生成统计**: 随机生成阅读数、评论数、点赞数
- ✅ **响应式导航**: 自动生成面包屑导航和侧边栏
- ✅ **双语支持**: 中英文文章自动分类到对应页面

### 3. HTML模板系统

系统使用内置模板生成文章页面，您也可以自定义模板：

1. 在`templates/`目录创建模板文件
2. 使用`{{变量名}}`作为占位符
3. 系统会自动替换为实际内容

可用变量：
- `{{title}}` - 文章标题
- `{{content}}` - 文章HTML内容
- `{{date}}` - 格式化日期
- `{{tags}}` - 标签HTML
- `{{excerpt}}` - 文章摘要
- `{{readTime}}` - 阅读时间
- `{{views}}` - 阅读数
- `{{comments}}` - 评论数
- `{{likes}}` - 点赞数

## 🎨 自定义配置

### 修改配置

编辑`build-blog.js`中的`CONFIG`对象：

```javascript
const CONFIG = {
    postsDir: './posts',        // Markdown文件目录
    articlesDir: './articles',  // 生成的HTML目录
    templatesDir: './templates', // 模板目录
    blogPages: {
        zh: './blog.html',      // 中文博客页面
        en: './blog-en.html'    // 英文博客页面
    },
    outputEncoding: 'utf8'      // 文件编码
};
```

### 自定义样式

文章页面使用与主站相同的CSS样式文件(`styles.css`)，您可以：

1. 直接修改`styles.css`
2. 添加文章特定的CSS类
3. 自定义代码高亮主题

## 🚀 部署到GitHub Pages

### 自动部署设置

1. **更新GitHub Actions配置**
   
   编辑`.github/workflows/deploy.yml`，添加构建步骤：
   
   ```yaml
   - name: Install dependencies
     run: npm install
   
   - name: Build blog
     run: npm run build
   ```

2. **手动部署步骤**
   
   ```bash
   # 1. 构建网站
   npm run build
   
   # 2. 提交更改
   git add .
   git commit -m "Update blog articles"
   git push origin master
   ```

### 域名配置

如果使用自定义域名，在根目录创建`CNAME`文件：
```
yourdomain.com
```

## 📊 性能优化

### 图片优化
- 使用现代图片格式（WebP, AVIF）
- 添加`loading="lazy"`属性
- 使用适当的图片尺寸

### SEO优化
- 每篇文章自动生成meta标签
- 使用语义化HTML结构
- 自动生成sitemap（可扩展功能）

## ❓ 常见问题

### 构建相关

**Q: 运行`npm run build`时出错？**
A: 
1. 确保安装了所有依赖：`npm install`
2. 检查Markdown文件的Front Matter格式
3. 确保`posts/`目录存在

**Q: 文章没有出现在博客列表中？**
A: 
1. 确认文章的`language`字段设置正确
2. 重新运行构建命令：`npm run build`
3. 检查文章分类是否在允许列表中

**Q: 代码高亮不显示？**
A: 
1. 确保代码块使用正确的语言标识符
2. 检查CSS样式是否正确加载

### 内容相关

**Q: 如何添加图片？**
A: 系统提供了完整的图片管理功能，详见下方"图片管理系统"章节。
```markdown
![图片描述](../images/posts/article-slug/image.jpg)
```

**Q: 如何创建链接？**
A:
```markdown
[链接文字](https://example.com)
[内部链接](../other-article.html)
```

**Q: 支持哪些Markdown语法？**
A: 支持标准Markdown语法，包括：
- 标题 (`#`, `##`, `###`)
- 列表 (`-`, `1.`)
- 代码块 (`\`\`\``)
- 表格 (`|`)
- 链接和图片
- 粗体和斜体

## 🖼️ 图片管理系统

系统提供了完整的图片管理功能，支持自动化的图片处理、优化和组织。

### 🚀 快速开始图片管理

#### 1. 创建文章图片目录
```bash
npm run image-create my-article-slug
```

#### 2. 移动图片到正确位置
```bash
npm run image-move ./my-image.jpg my-article-slug hero-image.jpg
```

#### 3. 在Markdown中引用图片
```markdown
![图片描述](../images/posts/my-article-slug/hero-image.jpg "可选标题")
```

### 📊 图片管理命令

| 命令 | 功能 | 示例 |
|------|------|------|
| `npm run image-scan` | 生成图片使用报告 | `npm run image-scan` |
| `npm run image-check` | 检查图片使用情况 | `npm run image-check` |
| `npm run image-cleanup` | 清理未使用图片 | `npm run image-cleanup --confirm` |
| `npm run image-create` | 创建文章图片目录 | `npm run image-create react-guide` |
| `npm run image-move` | 移动图片到文章目录 | `npm run image-move ./img.jpg react-guide` |
| `npm run image-optimize` | 优化图片大小和质量 | `npm run image-optimize react-guide 80` |
| `npm run image-help` | 显示详细帮助 | `npm run image-help` |

### 📁 图片目录结构

```
images/
├── posts/              # 📂 文章图片（按文章分组）
│   ├── react-guide/    # 文章slug目录
│   │   ├── hero.jpg    # 文章内图片
│   │   ├── diagram.png
│   │   └── README.md   # 自动生成的说明
│   └── vue-tutorial/
├── articles/           # 🎨 封面和缩略图
│   ├── covers/         # 封面图片 (1200×630px)
│   ├── thumbnails/     # 缩略图 (600×300px)
│   └── banners/        # 横幅图片
└── common/             # 🌟 通用图片资源
    ├── avatars/        # 头像图片
    ├── icons/          # 图标文件
    ├── logos/          # 网站Logo
    └── backgrounds/    # 背景图片
```

### 🎨 Markdown中的图片语法

#### 基础语法
```markdown
![图片描述](../images/posts/article-slug/image.jpg)
![图片描述](../images/posts/article-slug/image.jpg "图片标题")
```

#### 特殊效果（通过alt文本控制）
```markdown
![居中显示的图片 center](../images/posts/article/hero.jpg)
![小尺寸图片 small](../images/posts/article/icon.png)
![大尺寸图片 large](../images/posts/article/banner.jpg)
![左浮动图片 float-left](../images/posts/article/side.jpg)
![右浮动图片 float-right](../images/posts/article/aside.jpg)
```

#### 带标题的图片（自动包装为figure）
```markdown
![图片描述](../images/posts/article/chart.jpg "这是图表的详细说明")
```
生成的HTML：
```html
<figure class="image-figure">
    <img src="../images/posts/article/chart.jpg" alt="图片描述" class="article-image">
    <figcaption>这是图表的详细说明</figcaption>
</figure>
```

### 🔧 图片优化

系统支持自动图片优化（需要安装Sharp）：

```bash
# 安装Sharp（可选，用于图片优化）
npm install sharp

# 优化所有图片
npm run image-optimize

# 优化特定文章的图片
npm run image-optimize react-guide

# 设置优化质量（1-100）
npm run image-optimize react-guide 90
```

**优化功能：**
- ✅ JPEG/PNG/WebP 压缩
- ✅ 自动调整过大图片尺寸（>1920px）
- ✅ 渐进式JPEG
- ✅ 智能质量控制
- ✅ 备份原始文件

### 📊 图片使用报告

运行图片扫描获取详细报告：
```bash
npm run image-scan
```

**报告内容：**
- 📈 总体统计（总数、已使用、未使用）
- 📁 按目录分类统计
- 💾 存储空间使用情况
- 📏 最大文件列表
- 🗑️ 未使用图片检测

### 🧹 自动清理

清理未使用的图片：
```bash
# 预览模式（不实际删除）
npm run image-cleanup

# 确认删除（会备份到 .backup 目录）
npm run image-cleanup --confirm
```

**安全特性：**
- 🛡️ 预览模式防止误删
- 📦 自动备份删除的文件
- 📊 详细的删除报告

### 🎯 最佳实践

1. **图片命名**
   ```
   ✅ hero-image.jpg, user-interface.png, code-example.jpg
   ❌ IMG_001.jpg, 屏幕截图.png, image1.jpg
   ```

2. **目录组织**
   ```
   ✅ 每篇文章创建独立目录
   ✅ 使用描述性的文件名
   ✅ 定期运行图片扫描和清理
   ```

3. **性能优化**
   ```
   ✅ 定期运行图片优化
   ✅ 图片尺寸控制在合理范围
   ✅ 使用WebP格式（现代浏览器）
   ```

4. **Markdown引用**
   ```markdown
   ✅ ![清晰的描述](../images/posts/article/image.jpg)
   ✅ ![图表说明 center](../images/posts/article/chart.png "详细标题")
   ❌ ![](../images/posts/article/image.jpg)
   ```

### ⚡ 自动化工作流

建议的工作流程：
1. 创建新文章：`npm run new "文章标题"`
2. 创建图片目录：`npm run image-create article-slug`
3. 添加图片并在Markdown中引用
4. 构建前优化图片：`npm run image-optimize article-slug`
5. 构建网站：`npm run build`
6. 定期清理：`npm run image-cleanup --confirm`

## 🛠️ 故障排除

### 调试技巧

1. **查看详细日志**
   ```bash
   npm run build 2>&1 | tee build.log
   ```

2. **验证Markdown文件**
   使用在线Markdown编辑器验证语法

3. **检查生成的文件**
   查看`articles/`目录中生成的HTML文件

4. **图片问题排查**
   ```bash
   npm run image-scan       # 检查图片状态
   npm run image-check      # 验证图片引用
   ```

5. **清理重建**
   ```bash
   npm run clean
   npm run build
   ```

### 常见错误解决

- **文件编码问题**: 确保文件使用UTF-8编码保存
- **路径问题**: 使用相对路径引用资源
- **权限问题**: 确保有文件写入权限

### 图片相关问题

**Q: 图片无法显示？**
A: 
1. 检查图片路径是否正确：`../images/posts/article-slug/image.jpg`
2. 确认图片文件确实存在于对应目录
3. 运行`npm run image-check`检查图片使用情况
4. 检查图片文件扩展名是否受支持（.jpg, .png, .webp, .svg等）

**Q: 图片优化失败？**
A:
1. 安装Sharp：`npm install sharp`
2. 检查图片文件是否损坏或格式不支持
3. 确认有足够的磁盘空间进行优化
4. 查看控制台错误日志中的详细信息
5. SVG文件不支持优化，会自动跳过

**Q: 图片目录创建失败？**
A:
1. 检查文件系统写入权限
2. 确认文章slug名称有效（避免特殊字符）
3. 手动创建`images/posts/`基础目录结构
4. 运行`npm run image-help`查看完整帮助

**Q: 图片清理误删重要文件？**
A:
1. 检查`.backup`目录中的自动备份
2. 使用`npm run image-cleanup`（不加--confirm）预览删除列表
3. 建议定期备份整个`images/`目录

## 🤝 贡献指南

欢迎提交改进建议！您可以：

1. 报告Bug
2. 建议新功能
3. 改进文档
4. 优化代码

## 📝 更新日志

### v1.1.0 (2024-08-11)
- 🆕 完整的图片管理系统
- 🆕 自动图片优化和压缩
- 🆕 图片使用情况分析和清理
- 🆕 智能图片路径处理
- 🆕 响应式图片显示和特效
- ✅ 图片懒加载和性能优化
- ✅ 自动备份和安全删除

### v1.0.0 (2024-08-11)
- ✅ 基础Markdown转HTML功能
- ✅ 自动更新博客列表
- ✅ 双语支持
- ✅ 响应式设计
- ✅ 命令行工具

## 📞 获取帮助

如果遇到问题：

1. 查看本文档的常见问题部分
2. 检查GitHub Issues
3. 联系作者：liuhaoyang@example.com

---

**🎉 开始您的博客创作之旅吧！**