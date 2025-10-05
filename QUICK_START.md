# 🚀 博客系统快速开始

## ✅ 已完成的配置

我已经为你创建了完整的 Markdown + PDF 博客系统！

### 📦 已创建的组件

1. **MarkdownRenderer.vue** - Markdown 渲染器
2. **PdfViewer.vue** - PDF 查看器
3. **BlogPost.vue** - 博客文章详情页
4. **BlogList.vue** - 博客列表页（新版）

### 📁 已创建的文件

- `public/blog-posts/example.md` - 示例 Markdown 文章
- `src/config/blog-posts.js` - 文章配置管理
- 路由已自动配置 ✅

## 🎯 立即使用

### 方法 1：查看示例文章

1. 访问 http://localhost:5173/Liu_Haoyang_Web/blog
2. 点击任意文章卡片查看

### 方法 2：使用新的博客列表页

更新 `src/router/index.js`，将 Blog 路由改为：

```javascript
{
  path: '/blog',
  name: 'Blog',
  component: () => import('../views/BlogList.vue')  // 使用新列表页
},
```

### 方法 3：在任何组件中使用

#### 渲染 Markdown：

```vue
<template>
  <MarkdownRenderer 
    source="/blog-posts/my-post.md" 
    :is-file-path="true"
  />
</template>

<script setup>
import MarkdownRenderer from '@/components/blog/MarkdownRenderer.vue'
</script>
```

#### 显示 PDF：

```vue
<template>
  <PdfViewer 
    pdf-url="/documents/academic/paper.pdf"
    title="我的论文"
    height="800px"
  />
</template>

<script setup>
import PdfViewer from '@/components/blog/PdfViewer.vue'
</script>
```

## 📝 添加新文章（3步）

### 步骤 1：创建 Markdown 文件

在 `public/blog-posts/` 创建 `my-new-post.md`：

```markdown
# 我的新文章

这是文章内容...
```

### 步骤 2：添加到配置

编辑 `src/config/blog-posts.js`：

```javascript
export const blogPosts = [
  {
    id: 'my-new-post',
    title: '我的新文章',
    date: '2025-02-07',
    readTime: 5,
    author: '刘昊阳',
    category: '技术',
    tags: ['Vue.js', 'Web开发'],
    type: 'markdown',
    content: '/blog-posts/my-new-post.md',
    isFilePath: true,
    excerpt: '这是一篇关于...'
  },
  // 其他文章...
]
```

### 步骤 3：刷新页面

访问 http://localhost:5173/Liu_Haoyang_Web/blog/my-new-post

## 📄 添加 PDF 文档

### 步骤 1：放置 PDF 文件

将 PDF 放入 `public/documents/` 目录

### 步骤 2：在配置中添加

```javascript
{
  id: 'my-paper',
  title: '我的论文',
  type: 'pdf',  // 类型改为 pdf
  content: '/documents/my-paper.pdf',
  // ...其他配置
}
```

## 🎨 可选增强

### 安装 DOMPurify（推荐）

提高 HTML 安全性：

```bash
npm install dompurify
```

### 安装代码高亮

```bash
npm install highlight.js
```

然后在 `MarkdownRenderer.vue` 中配置。

### 安装数学公式支持

```bash
npm install katex marked-katex-extension
```

## 📖 完整文档

查看 `BLOG_USAGE.md` 获取完整使用指南。

## 🐛 常见问题

**Q: Markdown 文件不显示？**
A: 确保文件在 `public/` 目录下，路径以 `/` 开头

**Q: PDF 显示空白？**
A: 某些浏览器阻止 iframe，点击"新窗口打开"

**Q: 如何自定义样式？**
A: 编辑各个组件的 `<style>` 部分

## 🎉 开始创作吧！

现在你可以：
- ✍️ 用 Markdown 写博客
- 📄 展示 PDF 学术论文
- 🏷️ 分类和标签管理
- 🔍 搜索功能
- 🌙 自动适配深色模式

祝你使用愉快！


