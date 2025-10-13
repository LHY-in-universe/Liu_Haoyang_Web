# 🤖 博客自动化配置指南

本文档介绍如何使用自动化工具快速添加和管理博客文章。

---

## 🎯 核心优势

### ❌ 传统方式（手动）
1. 创建 Markdown 文件
2. 手动编辑 `src/config/blog-posts.ts`
3. 手动填写所有配置（id、title、date、tags 等）
4. 容易出错、重复劳动

### ✅ 自动化方式（推荐）
1. 创建带 frontmatter 的 Markdown 文件
2. 运行 `npm run generate-blog`
3. **自动生成配置** ✨
4. 立即开始写作！

---

## 🚀 快速开始

### 方式 1: 使用模板（推荐）

```bash
# 1. 复制模板
cp public/blog-posts/TEMPLATE.md public/blog-posts/my-new-post.md

# 2. 编辑文章（修改 frontmatter 和内容）
vim public/blog-posts/my-new-post.md

# 3. 自动生成配置并启动开发服务器
npm run blog
```

### 方式 2: 从零开始

```bash
# 1. 创建新文件
touch public/blog-posts/my-article.md

# 2. 添加 frontmatter 和内容
cat > public/blog-posts/my-article.md << 'EOF'
---
id: my-article
title: 我的文章标题
date: 2025-10-13
author: 刘昊阳
category: 技术
tags:
  - Vue.js
  - TypeScript
excerpt: 这是文章的简短描述...
---

# 我的文章标题

文章内容...
EOF

# 3. 生成配置
npm run generate-blog

# 4. 启动开发服务器
npm run dev
```

---

## 📝 Frontmatter 格式

在 Markdown 文件顶部添加 frontmatter（用 `---` 包围）：

```markdown
---
id: unique-post-id
title: 文章标题
date: 2025-10-13
readTime: 5
author: 刘昊阳
category: 技术
tags:
  - Vue.js
  - Web开发
  - TypeScript
excerpt: 文章的简短描述，会显示在列表页...
cover: /images/posts/cover.jpg
---

# 文章标题

正文内容从这里开始...
```

### 字段说明

| 字段 | 必填 | 类型 | 说明 | 示例 |
|------|------|------|------|------|
| `id` | ✅ | string | 唯一标识（用于URL） | `my-first-post` |
| `title` | ✅ | string | 文章标题 | `Vue 3 入门指南` |
| `date` | ✅ | string | 发布日期 | `2025-10-13` |
| `author` | ✅ | string | 作者名称 | `刘昊阳` |
| `category` | ✅ | string | 分类 | `技术` |
| `tags` | ✅ | array | 标签列表 | `['Vue', 'Web']` |
| `excerpt` | ✅ | string | 摘要 | `简短描述...` |
| `readTime` | ❌ | number | 阅读时间（分钟）<br>*不填会自动计算* | `5` |
| `cover` | ❌ | string | 封面图片 | `/images/cover.jpg` |

### 注意事项

✅ **正确的 tags 格式**:
```yaml
tags:
  - Vue.js
  - TypeScript
  - Web开发
```

或者使用内联数组：
```yaml
tags: [Vue.js, TypeScript, Web开发]
```

❌ **错误的格式**:
```yaml
tags: Vue.js, TypeScript  # 错误！
```

---

## 🛠️ 可用命令

### 1. 生成配置
```bash
npm run generate-blog
```

**功能**：
- 扫描 `public/blog-posts/` 目录
- 读取所有 `.md` 文件的 frontmatter
- 自动生成 `src/config/blog-posts.ts`
- 备份原配置到 `.backup` 文件

**输出示例**：
```
🚀 开始扫描博客文章...

📊 扫描结果:
   找到 3 篇文章

   1. 欢迎来到我的个人博客
      ID: welcome-post
      日期: 2025-10-13
      分类: 公告
      标签: 博客, Vue.js, Web开发, 个人介绍
      阅读时间: 8 分钟

   2. Markdown 博客系统使用示例
      ID: example-markdown
      日期: 2025-02-07
      分类: 教程
      标签: Vue.js, Markdown, 博客系统, 示例
      阅读时间: 5 分钟

   3. 博客文章模板
      ID: template-post
      日期: 2025-10-13
      分类: 教程
      标签: 模板, 示例, Markdown
      阅读时间: 5 分钟

📦 已备份原配置文件到: blog-posts.ts.backup
✅ 已生成配置文件: blog-posts.ts

✨ 完成！
```

### 2. 生成配置 + 启动开发
```bash
npm run blog
```

等同于：
```bash
npm run generate-blog && npm run dev
```

---

## 📂 项目结构

```
Liu_Haoyang_Web/
├── public/blog-posts/          # 📝 博客文章目录
│   ├── TEMPLATE.md            # 模板文件
│   ├── welcome-post.md        # 示例文章
│   └── my-article.md          # 你的文章
│
├── src/config/
│   ├── blog-posts.ts          # ⚙️ 自动生成的配置
│   └── blog-posts.ts.backup   # 🔒 配置备份
│
└── scripts/
    └── generate-blog-config.js # 🤖 自动化脚本
```

---

## 🎨 完整示例

### 示例 1: 技术文章

**文件**: `public/blog-posts/vue3-guide.md`

```markdown
---
id: vue3-composition-api-guide
title: Vue 3 Composition API 完全指南
date: 2025-10-13
readTime: 15
author: 刘昊阳
category: 前端开发
tags:
  - Vue.js
  - JavaScript
  - Composition API
  - 教程
excerpt: 深入浅出介绍 Vue 3 Composition API 的核心概念、使用方法和最佳实践，适合有 Vue 2 基础的开发者学习。
cover: /images/posts/vue3-composition.jpg
---

# Vue 3 Composition API 完全指南

## 什么是 Composition API？

Composition API 是 Vue 3 引入的新特性...

## 核心概念

### 1. reactive 和 ref

\`\`\`javascript
import { ref, reactive } from 'vue'

const count = ref(0)
const state = reactive({ name: 'Vue 3' })
\`\`\`

### 2. computed

\`\`\`javascript
const double = computed(() => count.value * 2)
\`\`\`

## 最佳实践

...
```

运行：
```bash
npm run generate-blog
```

### 示例 2: 学术论文

**文件**: `public/blog-posts/research-mpc.md`

```markdown
---
id: multi-party-computation-intro
title: 多方安全计算(MPC)入门
date: 2025-10-13
readTime: 20
author: 刘昊阳
category: 学术研究
tags:
  - MPC
  - 密码学
  - 隐私计算
  - 区块链
excerpt: 介绍多方安全计算的基本概念、核心协议和实际应用，包括秘密分享、混淆电路等经典技术。
---

# 多方安全计算(MPC)入门

## 什么是 MPC？

多方安全计算允许多方在不泄露各自输入的情况下...

## 核心协议

### 秘密分享

数学公式：

$$
s = s_1 + s_2 + ... + s_n \mod p
$$

...
```

---

## 🔄 工作流程

### 典型工作流

```
1. 创建/编辑 Markdown 文件
   └─> 添加 frontmatter 元数据

2. 运行 npm run generate-blog
   └─> 自动扫描文件
   └─> 解析 frontmatter
   └─> 生成配置文件
   └─> 备份旧配置

3. 运行 npm run dev
   └─> 启动开发服务器
   └─> 访问 localhost:5173

4. 预览效果
   └─> 检查显示是否正确
   └─> 调整 frontmatter（如需要）
   └─> 重新生成配置
```

---

## 💡 最佳实践

### 1. 文件命名

**推荐**：
- `vue3-composition-api.md`
- `2025-10-13-my-article.md`
- `mpc-introduction.md`

**避免**：
- `我的文章.md` ❌（使用中文）
- `my article.md` ❌（包含空格）
- `My_ARTICLE.md` ❌（大小写混乱）

### 2. ID 规范

**推荐**：
- `vue3-guide`
- `mpc-intro`
- `typescript-best-practices`

**避免**：
- `文章1` ❌（使用中文）
- `My Article` ❌（包含空格）
- `article_123` ❌（下划线不推荐）

### 3. 分类建议

常用分类：
- `技术` - 技术文章
- `教程` - 教程类
- `笔记` - 学习笔记
- `学术研究` - 学术论文
- `思考` - 个人思考
- `公告` - 网站公告

### 4. 标签建议

每篇文章 3-5 个标签为宜：

```yaml
# ✅ 好的标签
tags:
  - Vue.js
  - Composition API
  - 教程

# ❌ 太多标签
tags:
  - Vue
  - Vue.js
  - JavaScript
  - TypeScript
  - Web
  - 前端
  - 框架
  - SPA
  - ...
```

### 5. 摘要编写

**好的摘要**：
- 100-200 字
- 概括文章核心内容
- 包含关键词
- 吸引读者点击

**示例**：
```
深入浅出介绍 Vue 3 Composition API 的核心概念、使用方法和最佳实践，
适合有 Vue 2 基础的开发者学习。本文涵盖 ref、reactive、computed、
watch 等 API，并提供大量实战示例。
```

---

## ⚠️ 常见问题

### Q1: 运行脚本后配置没有更新？

**A**: 检查以下几点：
1. frontmatter 格式是否正确（用 `---` 包围）
2. YAML 语法是否正确（注意缩进）
3. 文件是否在 `public/blog-posts/` 目录
4. 是否有备份文件（说明脚本已运行）

### Q2: 阅读时间不准确？

**A**: 可以手动指定 `readTime` 字段：
```yaml
readTime: 10  # 强制设置为 10 分钟
```

### Q3: 文章不按日期排序？

**A**: 确保 `date` 格式正确：
```yaml
date: 2025-10-13  # ✅ 正确
date: 10/13/2025  # ❌ 错误
date: 2025-10-13T10:00:00  # ✅ 也可以
```

### Q4: 如何恢复旧配置？

**A**: 从备份恢复：
```bash
cp src/config/blog-posts.ts.backup src/config/blog-posts.ts
```

### Q5: 可以手动编辑配置吗？

**A**: 可以，但不推荐：
- ⚠️ 下次运行 `generate-blog` 会覆盖
- ✅ 建议修改 Markdown 文件的 frontmatter
- 💡 配置文件顶部有警告说明

---

## 🔧 高级用法

### 子目录组织

支持在 `blog-posts/` 下创建子目录：

```
public/blog-posts/
├── 2025/
│   ├── 01-january-post.md
│   └── 02-february-post.md
├── 2024/
│   └── 12-december-post.md
└── archives/
    └── old-post.md
```

脚本会自动递归扫描所有子目录。

### 条件过滤

可以修改脚本添加过滤逻辑，例如：
- 忽略草稿（文件名以 `_` 开头）
- 只发布未来日期的文章
- 根据 frontmatter 的 `published` 字段过滤

---

## 📊 对比：手动 vs 自动

| 操作 | 手动方式 | 自动化方式 |
|------|----------|-----------|
| 创建文章 | 编辑 2 个文件 | 编辑 1 个文件 |
| 配置时间 | 5-10 分钟 | 5 秒 |
| 出错概率 | 较高 | 极低 |
| 维护成本 | 高 | 低 |
| 阅读时间 | 手动估算 | 自动计算 |
| 摘要生成 | 手动编写 | 可自动提取 |
| 批量更新 | 困难 | 简单 |

---

## 🎉 总结

使用自动化工具的优势：

1. ✅ **节省时间** - 无需手动编辑配置
2. ✅ **减少错误** - 自动解析和验证
3. ✅ **易于维护** - 所有元数据集中在文件顶部
4. ✅ **便于管理** - 可以使用版本控制
5. ✅ **可扩展** - 脚本可以自定义功能

---

## 📚 相关文档

- [HOW_TO_ADD_BLOG.md](./HOW_TO_ADD_BLOG.md) - 完整的博客添加指南
- [QUICK_START_BLOG.md](./QUICK_START_BLOG.md) - 快速入门
- [TEMPLATE.md](./public/blog-posts/TEMPLATE.md) - 文章模板

---

**开始使用自动化工具，专注于内容创作！** ✍️🚀

最后更新：2025-10-13
