---
title: 如何使用自动化博客系统
date: 2024-08-11
category: tutorial
tags: [博客系统, Markdown, 自动化]
author: 刘浩洋
language: zh
excerpt: 详细介绍如何使用这个自动化博客系统，从创建Markdown文件到自动生成HTML页面的完整流程。
---

# 如何使用自动化博客系统

欢迎使用这个强大的自动化博客系统！这个系统可以让您轻松地通过创建Markdown文件来自动生成完整的HTML博客文章。

## 系统特性

### 🚀 自动化构建
- 自动将Markdown文件转换为HTML文章页面
- 自动更新博客列表页面
- 自动生成文章摘要和阅读时间
- 支持中英文双语系统

### 📝 Markdown支持
- 完整的Markdown语法支持
- 代码语法高亮
- Front Matter元数据支持
- 自动生成目录和导航

### 🎨 美观的界面
- 响应式设计
- 现代化的UI风格
- 暗色/亮色主题支持
- 移动端友好

## 使用方法

### 1. 创建新文章
```bash
npm run new "文章标题"
```

这将在`posts/`目录下创建一个新的Markdown文件模板。

### 2. 编辑文章内容
编辑生成的Markdown文件，添加您的内容：

```markdown
---
title: 我的新文章
date: 2024-08-11
category: tech
tags: [技术, 前端, React]
author: 刘浩洋
language: zh
excerpt: 这是文章的简要描述
---

# 文章标题

您的文章内容...
```

### 3. 构建网站
```bash
npm run build
```

系统将自动：
- 生成HTML文章页面
- 更新博客列表
- 生成文章索引

### 4. 预览网站
```bash
npm run serve
```

在浏览器中访问 `http://localhost:8000` 预览您的网站。

## Front Matter 配置

每个Markdown文件开头的Front Matter支持以下字段：

| 字段 | 必需 | 说明 | 示例 |
|------|------|------|------|
| `title` | ✅ | 文章标题 | `"React Hooks深度解析"` |
| `date` | ✅ | 发布日期 | `2024-08-11` |
| `category` | ✅ | 文章分类 | `tech`, `tutorial`, `life`, `thoughts` |
| `tags` | ✅ | 文章标签 | `[React, JavaScript, 前端]` |
| `author` | ❌ | 作者名称 | `"刘浩洋"` |
| `language` | ❌ | 语言标识 | `zh` 或 `en` |
| `excerpt` | ❌ | 文章摘要 | 如不提供将自动生成 |

## 目录结构

```
Liu_Haoyang_Web/
├── posts/              # Markdown文件目录
│   ├── article-1.md
│   ├── article-2.md
│   └── posts.json      # 文章索引（自动生成）
├── articles/           # HTML文章页面（自动生成）
│   ├── article-1.html
│   └── article-2.html
├── templates/          # HTML模板文件
├── build-blog.js       # 构建脚本
├── blog.html           # 中文博客列表页
├── blog-en.html        # 英文博客列表页
└── package.json        # 项目配置
```

## 高级功能

### 自动监听文件变化
开发时可以使用以下命令自动构建：

```bash
npm run watch
```

当Markdown文件发生变化时，系统会自动重新构建。

### 清理生成的文件
```bash
npm run clean
```

### 双语支持
创建英文文章时，文件名添加`-en`后缀：
```markdown
---
title: How to Use This Blog System
language: en
---
```

## 自定义模板

您可以在`templates/`目录下创建自定义HTML模板：
- `article-zh.html` - 中文文章模板
- `article-en.html` - 英文文章模板

## 部署到GitHub Pages

1. 构建网站：`npm run build`
2. 提交所有文件到GitHub
3. 在仓库设置中启用GitHub Pages
4. 选择`master`分支作为源码分支

## 故障排除

### 常见问题

**Q: 文章没有出现在博客列表中？**
A: 检查Markdown文件的Front Matter格式是否正确，确保运行了`npm run build`。

**Q: 代码高亮不工作？**
A: 确保代码块使用了正确的语言标识符，例如：\`\`\`javascript

**Q: 图片显示不正常？**
A: 使用相对路径引用图片，建议将图片放在`images/`目录下。

### 获取帮助

如果遇到问题，可以：
1. 查看构建日志输出
2. 检查Markdown语法
3. 验证Front Matter格式
4. 确认文件路径正确

## 总结

这个自动化博客系统大大简化了博客文章的创建和管理流程。您只需要专注于内容创作，系统会自动处理所有的技术细节。

开始您的博客写作之旅吧！🎉