# 📝 如何添加新的博客文章

本指南详细说明如何在您的个人网站上添加新的博客文章。

---

## 🎯 快速开始

添加博客文章只需 **2 步**：

1. **创建 Markdown 文件** - 在 `public/blog-posts/` 目录下
2. **注册博客配置** - 在 `src/config/blog-posts.ts` 中添加配置

---

## 📖 详细步骤

### 步骤 1: 创建 Markdown 文件

在 `public/blog-posts/` 目录创建新的 `.md` 文件。

**文件命名建议**：
- 使用英文和短横线：`my-first-blog.md`
- 或使用日期前缀：`2025-01-15-my-blog.md`
- 避免使用空格和特殊字符

**示例文件位置**：
```
public/blog-posts/my-first-blog.md
```

**Markdown 文件示例**：
```markdown
# 我的第一篇博客

这是我的第一篇博客文章！

## 功能特点

### 代码高亮
支持多种编程语言的语法高亮：

\`\`\`javascript
function hello() {
  console.log('Hello World!');
}
\`\`\`

\`\`\`python
def hello():
    print("Hello World!")
\`\`\`

### 数学公式
支持 LaTeX 数学公式：

行内公式：$E = mc^2$

块级公式：
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### 表格
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |

### 列表
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2

### 引用
> 这是一个引用块
> 可以用来强调重要内容

### 链接和图片
[访问我的 GitHub](https://github.com)

![图片描述](/images/example.jpg)
```

---

### 步骤 2: 注册博客配置

编辑 `src/config/blog-posts.ts`，在 `blogPosts` 数组中添加新配置：

```typescript
export const blogPosts: BlogPost[] = [
  // 已有的文章...

  // 添加你的新文章
  {
    id: 'my-first-blog',              // 唯一标识符，用于 URL
    title: '我的第一篇博客',           // 文章标题
    date: '2025-10-13',               // 发布日期 (YYYY-MM-DD)
    readTime: 5,                      // 预计阅读时间（分钟）
    author: '刘昊阳',                  // 作者名称
    category: '技术',                 // 文章分类
    tags: ['Vue.js', 'Web开发'],      // 标签数组
    type: 'markdown',                 // 文章类型：'markdown' 或 'pdf'
    content: '/blog-posts/my-first-blog.md',  // Markdown 文件路径
    isFilePath: true,                 // 必须为 true（表示 content 是文件路径）
    excerpt: '这是我的第一篇博客文章，介绍如何使用这个博客系统。', // 文章摘要
    cover: '/images/posts/cover.jpg'  // 可选：封面图片
  }
]
```

---

## 🎨 完整示例

让我们添加一篇名为"Vue 3 入门指南"的博客：

### 1. 创建文件
**文件**: `public/blog-posts/vue3-guide.md`

```markdown
# Vue 3 入门指南

Vue 3 是一个渐进式的 JavaScript 框架...

## 为什么选择 Vue 3？

1. 性能更好
2. TypeScript 支持更完善
3. Composition API

## 快速开始

\`\`\`bash
npm create vue@latest
\`\`\`

## 核心概念

### Composition API
\`\`\`javascript
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const double = computed(() => count.value * 2)

    return { count, double }
  }
}
\`\`\`

## 总结
Vue 3 提供了更好的开发体验...
```

### 2. 添加配置
**文件**: `src/config/blog-posts.ts`

```typescript
export const blogPosts: BlogPost[] = [
  {
    id: 'vue3-guide',
    title: 'Vue 3 入门指南',
    date: '2025-10-13',
    readTime: 10,
    author: '刘昊阳',
    category: '前端开发',
    tags: ['Vue.js', 'JavaScript', 'Web开发', '教程'],
    type: 'markdown',
    content: '/blog-posts/vue3-guide.md',
    isFilePath: true,
    excerpt: '详细介绍 Vue 3 的核心特性、Composition API 和最佳实践，适合初学者快速入门。',
    cover: '/images/posts/vue3-cover.jpg'  // 如果有封面图
  },
  // 其他文章...
]
```

---

## 📄 添加 PDF 文章

如果要添加 PDF 文档作为博客：

### 1. 放置 PDF 文件
将 PDF 文件放在 `public/documents/` 目录：
```
public/documents/my-paper.pdf
```

### 2. 添加配置
```typescript
{
  id: 'research-paper',
  title: '我的研究论文',
  date: '2025-10-13',
  readTime: 20,
  author: '刘昊阳',
  category: '学术研究',
  tags: ['论文', '研究'],
  type: 'pdf',                           // 注意：类型是 'pdf'
  content: '/documents/my-paper.pdf',    // PDF 文件路径
  isFilePath: true,
  excerpt: '这是我的最新研究论文，探讨了...'
}
```

---

## 🏷️ 字段说明

### 必填字段

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `id` | string | 唯一标识符，用于 URL | `'my-blog-post'` |
| `title` | string | 文章标题 | `'我的博客标题'` |
| `date` | string | 发布日期 (YYYY-MM-DD) | `'2025-10-13'` |
| `readTime` | number | 阅读时间（分钟） | `5` |
| `author` | string | 作者名称 | `'刘昊阳'` |
| `category` | string | 文章分类 | `'技术'` |
| `tags` | string[] | 标签数组 | `['Vue', 'Web']` |
| `type` | 'markdown' \| 'pdf' | 文章类型 | `'markdown'` |
| `content` | string | 文件路径 | `'/blog-posts/xxx.md'` |
| `excerpt` | string | 文章摘要 | `'这是摘要...'` |

### 可选字段

| 字段 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `isFilePath` | boolean | 是否为文件路径 | `true` |
| `cover` | string | 封面图片路径 | 无 |

---

## 🎨 分类和标签建议

### 常用分类
- `技术` - 技术文章
- `教程` - 教程类文章
- `学术研究` - 学术论文
- `生活` - 生活随笔
- `思考` - 个人思考

### 常用标签
- 技术类：`Vue.js`, `React`, `TypeScript`, `Python`, `机器学习`
- 工具类：`Git`, `Docker`, `Linux`, `VSCode`
- 概念类：`算法`, `数据结构`, `设计模式`, `架构`

---

## ✨ Markdown 支持的功能

您的博客系统支持以下 Markdown 功能：

### 1. 基础语法
- ✅ 标题 (H1-H6)
- ✅ 段落和换行
- ✅ **粗体** 和 *斜体*
- ✅ 列表（有序和无序）
- ✅ 引用块
- ✅ 水平分割线
- ✅ 链接和图片

### 2. 代码高亮
支持 100+ 编程语言：
- JavaScript/TypeScript
- Python
- Java
- C/C++
- Rust
- Go
- SQL
- Bash
- 更多...

### 3. 数学公式 (LaTeX)
- ✅ 行内公式：`$E = mc^2$`
- ✅ 块级公式：`$$ ... $$`
- ✅ 支持复杂的数学符号和方程

### 4. 表格
- ✅ 完整的表格支持
- ✅ 对齐控制

### 5. 高级功能
- ✅ 自动生成目录
- ✅ 阅读进度条
- ✅ 代码复制按钮
- ✅ 响应式设计
- ✅ 深色模式支持

---

## 🚀 发布流程

### 本地预览
1. 创建 Markdown 文件
2. 添加配置到 `blog-posts.ts`
3. 运行开发服务器：
   ```bash
   npm run dev
   ```
4. 访问 `http://localhost:5173/Liu_Haoyang_Web/blog`
5. 查看新博客是否正常显示

### 部署到线上
```bash
# 1. 构建项目
npm run build

# 2. 提交到 Git
git add .
git commit -m "feat: 添加新博客文章"
git push

# 3. GitHub Actions 会自动部署
```

---

## 📚 示例模板

### 技术文章模板
```markdown
# 文章标题

## 概述
简要介绍文章主题...

## 问题背景
描述要解决的问题...

## 解决方案
详细说明解决方法...

\`\`\`javascript
// 代码示例
\`\`\`

## 最佳实践
总结最佳实践...

## 参考资料
- [链接1](url1)
- [链接2](url2)
```

### 教程模板
```markdown
# 教程标题

## 前置知识
你需要了解...

## 准备工作
安装以下工具...

## 步骤 1: ...
详细步骤说明...

## 步骤 2: ...
详细步骤说明...

## 完整代码
\`\`\`javascript
// 完整代码
\`\`\`

## 总结
学到了什么...

## 下一步
推荐阅读...
```

---

## 💡 提示和技巧

### 1. 图片使用
将图片放在 `public/images/` 目录：
```markdown
![图片描述](/images/my-image.jpg)
```

### 2. 阅读时间估算
大约每 200-250 个中文字 = 1 分钟阅读时间

### 3. SEO 优化
- 使用描述性的标题
- 写详细的 excerpt（摘要）
- 使用相关的标签
- 添加封面图片

### 4. 文件组织
建议使用子目录组织博客文章：
```
public/blog-posts/
├── 2025/
│   ├── 01-my-first-blog.md
│   └── 02-second-blog.md
└── 2024/
    └── 12-old-blog.md
```

配置中使用完整路径：
```typescript
content: '/blog-posts/2025/01-my-first-blog.md'
```

---

## ❓ 常见问题

### Q: 博客文章不显示？
**A**: 检查以下几点：
1. Markdown 文件是否在 `public/blog-posts/` 目录
2. 配置中的 `content` 路径是否正确
3. `isFilePath` 是否设置为 `true`
4. `id` 是否唯一

### Q: 数学公式不渲染？
**A**: 确保：
1. 行内公式使用单个 `$`：`$E = mc^2$`
2. 块级公式使用双个 `$$`，且独占一行
3. LaTeX 语法正确

### Q: 代码高亮不工作？
**A**: 确保：
1. 使用三个反引号和语言标识符
2. 语言名称正确（如 `javascript` 而不是 `js`）

### Q: 如何删除博客？
**A**:
1. 从 `blog-posts.ts` 中删除配置
2. （可选）删除 Markdown 文件

---

## 📞 需要帮助？

如果遇到问题：
1. 查看 `public/blog-posts/example.md` 作为参考
2. 检查浏览器控制台的错误信息
3. 确认 Markdown 语法正确

---

**祝您写作愉快！** ✨

最后更新：2025-10-13
