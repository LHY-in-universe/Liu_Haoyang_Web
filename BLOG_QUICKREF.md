# 📖 博客快速参考卡片

## 🎯 三种添加博客的方式

### 方式 1: 自动化（推荐）⭐

```bash
# 1. 复制模板
cp public/blog-posts/TEMPLATE.md public/blog-posts/my-post.md

# 2. 编辑文件（修改 frontmatter）
vim public/blog-posts/my-post.md

# 3. 自动生成配置
npm run generate-blog

# 4. 预览
npm run dev
```

### 方式 2: 一键启动

```bash
# 自动生成配置 + 启动开发服务器
npm run blog
```

### 方式 3: 手动（不推荐）

1. 创建 `.md` 文件
2. 手动编辑 `src/config/blog-posts.ts`

---

## 📝 Frontmatter 模板

```yaml
---
id: my-post-id
title: 文章标题
date: 2025-10-13
author: 刘昊阳
category: 技术
tags:
  - Tag1
  - Tag2
excerpt: 文章简短描述...
---

# 文章标题

正文内容...
```

---

## 🎨 常用分类

- `技术` - 技术文章
- `教程` - 教程类
- `笔记` - 学习笔记
- `学术研究` - 学术论文
- `思考` - 个人思考
- `公告` - 网站公告

---

## 🏷️ 常用标签

**技术类**: Vue.js, React, TypeScript, Python, Rust, Go

**工具类**: Git, Docker, Linux, VSCode

**领域类**: Web开发, 机器学习, 密码学, 区块链

---

## 🚀 可用命令

| 命令 | 功能 |
|------|------|
| `npm run generate-blog` | 扫描文件并生成配置 |
| `npm run blog` | 生成配置 + 启动开发 |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |

---

## 📚 相关文档

- **[BLOG_AUTOMATION.md](./BLOG_AUTOMATION.md)** - 完整的自动化指南
- **[HOW_TO_ADD_BLOG.md](./HOW_TO_ADD_BLOG.md)** - 详细的添加指南
- **[TEMPLATE.md](./public/blog-posts/TEMPLATE.md)** - 文章模板

---

**💡 提示**: 所有元数据写在 frontmatter 中，运行 `npm run generate-blog` 自动更新配置！
