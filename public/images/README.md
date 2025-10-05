# 图片资源目录说明

## 目录结构

```
images/
├── avatars/        # 头像图片
│   ├── avatar-main.jpg          # 主要头像（刘浩洋）
│   └── avatar-zhang-haoyan.jpg  # 张昊岩头像
├── posts/          # 博客文章封面图
│   ├── post-cover-1.jpg
│   ├── post-cover-2.jpg
│   └── ...
└── documents/      # 文档相关图片
    └── ...
```

## 使用说明

### 1. 添加图片
将图片文件放入对应的目录中。

### 2. 在组件中使用
使用 LazyImage 组件引用图片：

```vue
<LazyImage
  src="/images/avatars/avatar-main.jpg"
  alt="刘浩洋"
  class="avatar-image"
/>
```

### 3. 图片规格建议
- 头像图片：500x500 像素，正方形
- 文章封面：1200x630 像素（适合社交分享）
- 文档图片：根据实际需求

### 4. 图片优化
- 使用 WebP 格式以获得更好的压缩比
- 保持图片文件大小在 200KB 以下
- 使用 [TinyPNG](https://tinypng.com/) 或 [Squoosh](https://squoosh.app/) 压缩图片

## 当前占位图片
目前使用的是 placeholder 服务生成的临时图片。请替换为真实图片以获得更好的效果。

需要替换的图片路径：
- `/images/avatars/avatar-main.jpg` - 主头像
- `/images/avatars/avatar-zhang-haoyan.jpg` - 张昊岩头像
- `/images/posts/example-cover.jpg` - 示例文章封面
