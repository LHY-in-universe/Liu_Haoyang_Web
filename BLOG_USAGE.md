# 📝 博客系统使用指南

## 🎯 功能概述

这个博客系统支持：
- ✅ **Markdown 文章** - 使用 `.md` 文件编写博客
- ✅ **PDF 文档** - 嵌入式 PDF 预览
- ✅ **代码高亮** - 支持多种编程语言
- ✅ **响应式设计** - 完美适配移动端
- ✅ **深色模式** - 自动适配主题
- ✅ **分类标签** - 文章分类和标签管理

## 📁 文件结构

```
Liu_Haoyang_Web/
├── public/
│   ├── blog-posts/          # Markdown 文章目录
│   │   └── example.md
│   └── documents/           # PDF 文档目录
│       └── academic/
├── src/
│   ├── components/blog/
│   │   ├── MarkdownRenderer.vue  # Markdown 渲染组件
│   │   ├── PdfViewer.vue         # PDF 查看器组件
│   │   └── BlogPost.vue          # 单篇文章页面
│   ├── config/
│   │   └── blog-posts.js         # 文章配置文件
│   └── views/
│       └── Blog.vue              # 博客列表页面
```

## 🚀 快速开始

### 1. 安装依赖（可选）

```bash
cd Liu_Haoyang_Web
npm install dompurify  # 用于 HTML 安全处理（推荐但非必需）
```

### 2. 创建 Markdown 文章

在 `public/blog-posts/` 目录下创建新的 `.md` 文件：

```markdown
# 文章标题

这是文章内容...

## 二级标题

- 列表项 1
- 列表项 2

\`\`\`javascript
// 代码示例
console.log('Hello World');
\`\`\`
```

### 3. 在配置文件中添加文章

编辑 `src/config/blog-posts.js`：

```javascript
export const blogPosts = [
  {
    id: 'my-new-post',                    // 唯一 ID
    title: '我的新文章',                  // 标题
    date: '2025-02-07',                   // 日期
    readTime: 5,                          // 阅读时长（分钟）
    author: '刘昊阳',                     // 作者
    category: '技术',                     // 分类
    tags: ['Vue.js', 'JavaScript'],      // 标签
    type: 'markdown',                     // 类型：markdown 或 pdf
    content: '/blog-posts/my-new-post.md', // 文件路径
    isFilePath: true,                     // 是否是文件路径
    excerpt: '这是文章摘要...'            // 摘要
  },
  // 更多文章...
]
```

### 4. 配置路由

在 `src/router/index.js` 中添加博客路由：

```javascript
import BlogPost from '@/components/blog/BlogPost.vue'

const routes = [
  // ... 其他路由
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPost,
    props: route => ({ postId: route.params.id })
  }
]
```

### 5. 在博客列表中使用

更新 `src/views/Blog.vue`：

```vue
<script setup>
import { blogPosts, getRecentPosts } from '@/config/blog-posts'

const posts = ref(getRecentPosts())
</script>

<template>
  <div v-for="post in posts" :key="post.id">
    <router-link :to="`/blog/${post.id}`">
      {{ post.title }}
    </router-link>
  </div>
</template>
```

## 📖 Markdown 语法支持

### 基础语法
- **粗体**: `**文本**`
- *斜体*: `*文本*`
- ~~删除线~~: `~~文本~~`
- `行内代码`: `` `代码` ``

### 标题
```markdown
# H1 标题
## H2 标题
### H3 标题
```

### 列表
```markdown
- 无序列表
- 项目 2

1. 有序列表
2. 项目 2
```

### 代码块
````markdown
```javascript
const greeting = 'Hello World';
console.log(greeting);
```
````

### 引用
```markdown
> 这是引用文本
> 可以多行
```

### 表格
```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
```

### 链接和图片
```markdown
[链接文本](https://example.com)
![图片说明](图片URL)
```

## 📄 添加 PDF 文档

### 1. 放置 PDF 文件
将 PDF 文件放入 `public/documents/` 目录

### 2. 在配置中添加
```javascript
{
  id: 'my-paper',
  title: '我的论文',
  type: 'pdf',
  content: '/documents/my-paper.pdf',
  // ... 其他配置
}
```

## 🎨 自定义样式

### 修改 Markdown 样式
编辑 `MarkdownRenderer.vue` 中的 `<style>` 部分

### 修改 PDF 查看器
编辑 `PdfViewer.vue` 中的样式

## 🔧 高级功能

### 1. 添加数学公式支持

安装 KaTeX：
```bash
npm install katex marked-katex-extension
```

在 `MarkdownRenderer.vue` 中配置：
```javascript
import katex from 'marked-katex-extension'

marked.use(katex({
  throwOnError: false
}))
```

### 2. 添加代码高亮

安装 Highlight.js：
```bash
npm install highlight.js
```

在 `MarkdownRenderer.vue` 中使用：
```javascript
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

// 高亮所有代码块
onMounted(() => {
  document.querySelectorAll('pre code').forEach(block => {
    hljs.highlightElement(block)
  })
})
```

### 3. 添加目录（TOC）

创建 TOC 组件自动提取标题生成目录

### 4. 评论系统

集成 Gitalk、Disqus 或 Giscus

## 📱 响应式设计

所有组件都支持响应式设计，自动适配：
- 📱 移动端
- 💻 平板
- 🖥️ 桌面端

## 🌙 深色模式

组件自动适配深色模式，无需额外配置

## 🐛 故障排除

### Markdown 不显示
- 检查文件路径是否正确
- 确保 `.md` 文件在 `public/` 目录下
- 检查浏览器控制台是否有错误

### PDF 无法加载
- 检查 PDF 文件路径
- 确保 PDF 文件在 `public/` 目录下
- 某些浏览器可能阻止 iframe，尝试"新窗口打开"

### 样式问题
- 确保 CSS 变量在 `global.css` 中正确定义
- 检查深色模式主题配置

## 📚 参考资源

- [Marked.js 文档](https://marked.js.org/)
- [Markdown 语法指南](https://www.markdownguide.org/)
- [Vue.js 文档](https://vuejs.org/)

## 💡 最佳实践

1. **文件命名**: 使用小写和连字符，如 `my-blog-post.md`
2. **图片优化**: 使用适当的图片大小和格式
3. **SEO优化**: 为每篇文章添加适当的标题和描述
4. **性能**: 对于大型 PDF，考虑提供下载而不是预览
5. **可访问性**: 为图片添加 alt 文本

## 🤝 贡献

欢迎提交问题和改进建议！

---

祝你使用愉快！ 🎉

