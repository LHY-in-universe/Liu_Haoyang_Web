# 📸 图片资源管理

本目录用于存放博客网站的所有图片资源。

## 📁 目录结构

```
images/
├── posts/          # 博客文章相关图片
│   ├── article1/   # 按文章分组的图片
│   ├── article2/
│   └── ...
├── articles/       # 文章封面图片
│   ├── covers/     # 文章封面
│   ├── thumbnails/ # 缩略图
│   └── banners/    # 横幅图片
├── common/         # 通用图片
│   ├── avatars/    # 头像图片
│   ├── icons/      # 图标文件
│   ├── logos/      # 网站Logo
│   └── backgrounds/# 背景图片
└── README.md       # 本说明文件
```

## 🎯 使用规范

### 在Markdown文章中引用图片

#### 1. 文章内容图片
```markdown
![图片描述](../images/posts/article-name/image.jpg)
```

#### 2. 文章封面图片
```markdown
![文章封面](../images/articles/covers/article-cover.jpg)
```

#### 3. 通用图片
```markdown
![Logo](../images/common/logos/site-logo.png)
```

### Front Matter中设置封面图片

```yaml
---
title: 文章标题
cover: ../images/articles/covers/my-article-cover.jpg
thumbnail: ../images/articles/thumbnails/my-article-thumb.jpg
---
```

## 📐 图片规格建议

### 文章封面图片
- **尺寸**: 1200×630px (适合社交媒体分享)
- **格式**: JPG/PNG/WebP
- **大小**: < 500KB

### 文章缩略图
- **尺寸**: 600×300px
- **格式**: JPG/PNG/WebP  
- **大小**: < 200KB

### 文章内容图片
- **最大宽度**: 1200px
- **格式**: JPG/PNG/WebP/SVG
- **大小**: < 1MB

### 头像图片
- **尺寸**: 200×200px (正方形)
- **格式**: JPG/PNG/WebP
- **大小**: < 100KB

## 🔧 命名规范

### 文件命名
- 使用小写字母
- 用连字符`-`分隔单词
- 包含有意义的描述

**✅ 好的命名:**
```
react-hooks-diagram.png
performance-chart.jpg
css-grid-example.svg
```

**❌ 避免的命名:**
```
IMG_001.jpg
屏幕截图.png
图片1.jpeg
```

### 目录命名
- 与文章slug保持一致
- 使用连字符分隔

**示例:**
```
posts/react-hooks-deep-dive/
posts/frontend-performance-guide/
posts/css-grid-tutorial/
```

## 🚀 图片优化

### 自动优化工具
使用以下npm命令进行图片优化：

```bash
# 压缩所有图片
npm run optimize-images

# 生成不同尺寸的图片
npm run generate-thumbnails

# 转换为现代格式
npm run convert-to-webp
```

### 手动优化建议

1. **使用现代格式**: WebP > AVIF > JPEG/PNG
2. **适当压缩**: 质量80-90%通常足够
3. **响应式图片**: 提供多个尺寸版本
4. **懒加载**: 为图片添加`loading="lazy"`属性

## 📝 在构建系统中使用

### 自动处理图片路径
构建系统会自动：
- 检查图片是否存在
- 优化图片路径
- 生成响应式图片代码
- 添加懒加载属性

### Markdown中的图片语法增强

#### 基础语法
```markdown
![alt文字](../images/posts/article/image.jpg)
```

#### 带标题的图片
```markdown
![alt文字](../images/posts/article/image.jpg "图片标题")
```

#### 带尺寸的图片
```markdown
![alt文字](../images/posts/article/image.jpg){width=800 height=400}
```

#### 图片组合
```markdown
<!-- 并排显示的图片 -->
<div class="image-row">
![图片1](../images/posts/article/img1.jpg)
![图片2](../images/posts/article/img2.jpg)
</div>
```

## 🔒 版权注意事项

1. **自有图片**: 可自由使用
2. **第三方图片**: 确保有使用权限
3. **开源图片**: 注明来源和许可
4. **商业图片**: 购买适当许可

### 推荐的免费图片来源
- [Unsplash](https://unsplash.com/)
- [Pexels](https://www.pexels.com/)
- [Pixabay](https://pixabay.com/)
- [Freepik](https://www.freepik.com/) (需注明来源)

## 📋 图片清单模板

为每篇文章创建图片清单：

```markdown
# 文章标题 - 图片清单

## 封面图片
- [ ] 主封面 (1200×630px)
- [ ] 缩略图 (600×300px) 
- [ ] 社交媒体图片 (1200×630px)

## 内容图片
- [ ] 配图1: 概念图解
- [ ] 配图2: 代码截图
- [ ] 配图3: 流程图表

## 图片来源
- 图片1: 自制/来源链接
- 图片2: Unsplash/摄影师名称
```

## 🛠️ 维护建议

### 定期检查
- 清理未使用的图片
- 检查损坏的图片链接
- 优化大文件图片
- 更新过时的截图

### 备份策略
- 定期备份原始高质量图片
- 使用Git LFS管理大文件
- 考虑使用CDN服务

---

**💡 提示**: 良好的图片管理是优秀博客的重要组成部分。遵循这些规范，让您的博客更加专业和美观！