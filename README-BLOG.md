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
├── posts/                  # 📝 Markdown文件存放目录
│   ├── article-1.md       # 中文文章
│   ├── article-1-en.md    # 英文文章
│   ├── posts.json         # 文章索引（自动生成）
│   └── ...
├── articles/              # 📄 生成的HTML文章页面
│   ├── article-1.html
│   ├── article-1-en.html
│   └── ...
├── templates/             # 🎨 HTML模板文件（可选）
│   ├── article-zh.html    # 中文文章模板
│   └── article-en.html    # 英文文章模板
├── build-blog.js         # 🔧 构建脚本
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
A: 
```markdown
![图片描述](../images/your-image.jpg)
```
建议创建`images/`目录存放图片。

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

4. **清理重建**
   ```bash
   npm run clean
   npm run build
   ```

### 常见错误解决

- **文件编码问题**: 确保文件使用UTF-8编码保存
- **路径问题**: 使用相对路径引用资源
- **权限问题**: 确保有文件写入权限

## 🤝 贡献指南

欢迎提交改进建议！您可以：

1. 报告Bug
2. 建议新功能
3. 改进文档
4. 优化代码

## 📝 更新日志

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