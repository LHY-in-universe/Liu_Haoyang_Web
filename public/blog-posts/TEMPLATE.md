---
id: template-post
title: 博客文章模板
date: 2025-10-13
readTime: 5
author: 刘昊阳
category: 教程
tags:
  - 模板
  - 示例
  - Markdown
excerpt: 这是一个博客文章模板，展示了如何使用 frontmatter 元数据。复制此模板快速创建新文章！
cover: /images/posts/template-cover.jpg
---

# 博客文章模板

> 💡 **使用说明**:
> 1. 复制此模板创建新文章
> 2. 修改顶部的 frontmatter 元数据
> 3. 编写文章内容
> 4. 运行 `npm run generate-blog` 自动更新配置

---

## 关于 Frontmatter

文件顶部用 `---` 包围的部分是 **frontmatter**，用于定义文章的元数据。

### 支持的字段

| 字段 | 必填 | 类型 | 说明 |
|------|------|------|------|
| `id` | ✅ | string | 文章唯一标识（用于URL） |
| `title` | ✅ | string | 文章标题 |
| `date` | ✅ | string | 发布日期 (YYYY-MM-DD) |
| `author` | ✅ | string | 作者名称 |
| `category` | ✅ | string | 文章分类 |
| `tags` | ✅ | array | 标签列表 |
| `excerpt` | ✅ | string | 文章摘要 |
| `readTime` | ❌ | number | 阅读时间（可自动计算） |
| `cover` | ❌ | string | 封面图片路径 |

### Frontmatter 示例

```yaml
---
id: my-awesome-post
title: 我的精彩文章
date: 2025-10-13
readTime: 8
author: 刘昊阳
category: 技术
tags:
  - Vue.js
  - TypeScript
  - Web开发
excerpt: 这篇文章介绍了如何使用 Vue 3 和 TypeScript 构建现代化的 Web 应用。
cover: /images/posts/vue3-typescript.jpg
---
```

---

## 文章内容区域

在 frontmatter 之后，就可以自由编写 Markdown 内容了。

### 代码示例

```javascript
// 支持语法高亮
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('World');
```

```python
# Python 示例
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

### 数学公式

行内公式：$E = mc^2$

块级公式：
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### 表格

| 功能 | 支持 | 说明 |
|------|------|------|
| 代码高亮 | ✅ | 100+ 语言 |
| 数学公式 | ✅ | LaTeX 语法 |
| 表格 | ✅ | 完整支持 |

### 引用

> 💡 **提示**: 使用 frontmatter 可以让配置更加清晰和易于维护！

---

## 常用分类建议

- `技术` - 技术文章
- `教程` - 教程类
- `笔记` - 学习笔记
- `思考` - 个人思考
- `公告` - 网站公告

---

## 常用标签建议

### 技术类
- `Vue.js`, `React`, `JavaScript`, `TypeScript`
- `Python`, `Rust`, `Go`, `Java`
- `算法`, `数据结构`, `设计模式`

### 工具类
- `Git`, `Docker`, `Linux`, `VSCode`
- `Vim`, `Tmux`, `Shell`

### 领域类
- `Web开发`, `后端`, `前端`, `全栈`
- `机器学习`, `深度学习`, `AI`
- `密码学`, `区块链`, `量子计算`

---

## 使用流程

### 1. 创建新文章

```bash
# 复制模板
cp public/blog-posts/TEMPLATE.md public/blog-posts/my-new-post.md

# 编辑文章
vim public/blog-posts/my-new-post.md
```

### 2. 修改 frontmatter

更新文件顶部的元数据（id、title、date 等）

### 3. 编写内容

在 frontmatter 之后编写文章内容

### 4. 生成配置

```bash
npm run generate-blog
```

### 5. 预览

```bash
npm run dev
```

访问: http://localhost:5173/Liu_Haoyang_Web/blog

---

## 注意事项

### ✅ 推荐做法

- 使用描述性的 `id`（如 `vue3-composition-api`）
- 写清晰的 `title` 和 `excerpt`
- 选择合适的 `category` 和 `tags`
- 使用标准的日期格式 `YYYY-MM-DD`

### ❌ 避免

- `id` 中包含空格或特殊字符
- 使用过长的 `excerpt`（建议 100-200 字）
- 过多的标签（建议 3-5 个）
- frontmatter 格式错误（注意缩进）

---

## 完整示例

这个模板本身就是一个完整的示例！查看本文件的源码，了解如何编写带有 frontmatter 的博客文章。

---

**开始创作吧！** ✍️📝

如有问题，请查看文档或联系作者。
