# 🎓 个人照片目录

## 📁 目录说明

此目录用于存放毕业照、生活照等个人照片。

## 📋 文件命名规范

- `graduation.jpg` - 毕业照
- `graduation-ceremony.jpg` - 毕业典礼照片
- `academic-photo.jpg` - 学术照片
- `professional-photo.jpg` - 职业照片

## 🎯 使用场景

- **毕业照** - 简历页面、关于页面展示
- **学术照片** - 学术成就展示区域
- **职业照片** - 工作经历展示

## 📐 推荐规格

- **格式**: JPG, PNG, WebP
- **尺寸**: 横向 16:9 或 4:3 比例
- **分辨率**: 最小1200x800px
- **文件大小**: 小于1MB

## 📝 添加步骤

1. 将照片文件复制到此目录
2. 按照命名规范重命名文件
3. 运行 `npm run image-optimize` 进行优化
4. 在相关页面中引用图片路径

## 🖼️ 页面集成

### 简历页面添加毕业照
```html
<div class="graduation-photo">
    <img src="../images/common/personal/graduation.jpg" alt="毕业照" loading="lazy">
</div>
```

### 关于页面添加个人照片
```html
<div class="personal-gallery">
    <img src="../images/common/personal/academic-photo.jpg" alt="学术照片" loading="lazy">
</div>
```