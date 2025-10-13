# 🚀 添加博客快速入门

## 两步添加新博客

### 📝 步骤 1: 创建 Markdown 文件

在 `public/blog-posts/` 目录创建 `.md` 文件：

```bash
# 示例：创建一个名为 my-blog.md 的文件
touch public/blog-posts/my-blog.md
```

编辑文件，写入内容：
```markdown
# 我的博客标题

这是博客内容...

## 章节 1
...

## 章节 2
...
```

---

### ⚙️ 步骤 2: 注册配置

编辑 `src/config/blog-posts.ts`，在 `blogPosts` 数组开头添加：

```typescript
export const blogPosts: BlogPost[] = [
  {
    id: 'my-blog',                        // URL 标识符
    title: '我的博客标题',                 // 显示标题
    date: '2025-10-13',                   // 发布日期
    readTime: 5,                          // 阅读时长(分钟)
    author: '刘昊阳',                      // 作者
    category: '技术',                     // 分类
    tags: ['Vue', 'Web'],                 // 标签
    type: 'markdown',                     // 类型
    content: '/blog-posts/my-blog.md',   // 文件路径
    isFilePath: true,                     // 必须 true
    excerpt: '博客摘要...'                 // 简短描述
  },
  // 其他文章...
]
```

---

## ✅ 完成！

运行开发服务器查看：
```bash
npm run dev
```

访问: http://localhost:5173/Liu_Haoyang_Web/blog

---

## 📚 详细文档

查看完整指南：[HOW_TO_ADD_BLOG.md](./HOW_TO_ADD_BLOG.md)

## 🎯 示例

已为您创建了一个示例博客：
- 文件：`public/blog-posts/welcome-post.md`
- 配置：已添加到 `src/config/blog-posts.ts`

---

**就这么简单！** 🎉
