# 📄 文档管理系统使用指南

现代化的文档管理系统，支持多种文档类型的分类展示、搜索和下载，具备渐进式加载和响应式设计。

## 🚀 系统特性

### ✨ 核心功能
- 📂 **多类别管理** - 支持简历、学术论文、演讲稿等分类
- 🔍 **智能搜索** - 标题、描述、标签全文搜索
- 📱 **响应式设计** - 完美适配所有设备
- ⚡ **渐进式加载** - 骨架屏加载，优秀的用户体验
- 🌐 **双语支持** - 中英文双语界面
- 📊 **文档统计** - 文件大小、下载次数等信息

### 🎨 用户体验
- 🖼️ **现代化界面** - 卡片式布局，美观简洁
- 🏷️ **标签系统** - 可视化标签管理
- 📋 **批量操作** - 支持批量下载和管理
- 🔗 **智能链接** - 自动生成下载链接

## 📁 系统架构

```
public/documents/
├── documents.json          # 📋 文档索引配置文件
├── academic/              # 🎓 学术论文目录
│   ├── DSMC.pdf           # DSMC方法研究
│   ├── DSMC_re.pdf        # DSMC方法研究(修订版)
│   ├── QMC.pdf            # 量子蒙特卡洛方法研究
│   ├── MLQM.pdf           # 机器学习与量子力学交叉研究
│   └── phdreview.pdf      # 博士研究进展报告
├── presentations/         # 🎤 演讲稿目录
│   └── PHYS/              # 物理学相关演讲
├── resume/                # 📝 简历目录
│   └── main.pdf           # 个人简历
└── README.md              # 说明文档
```

## ⚙️ 配置文件详解

### documents.json 结构

```json
{
  "categories": {
    "resume": {
      "title": "简历文档",
      "titleEn": "Resume Documents",
      "description": "个人简历和相关文档",
      "descriptionEn": "Personal resume and related documents"
    },
    "academic": {
      "title": "学术论文",
      "titleEn": "Academic Papers", 
      "description": "研究论文和学术文章",
      "descriptionEn": "Research papers and academic articles"
    },
    "presentations": {
      "title": "演讲稿",
      "titleEn": "Presentations",
      "description": "学术演讲和技术分享",
      "descriptionEn": "Academic presentations and technical talks"
    }
  },
  "documents": [
    {
      "id": "unique-document-id",
      "category": "academic",
      "title": "文档标题",
      "titleEn": "Document Title",
      "filename": "document.pdf",
      "path": "public/documents/academic/document.pdf",
      "description": "文档描述",
      "descriptionEn": "Document description",
      "author": "作者姓名",
      "authorEn": "Author Name",
      "date": "2024-01-01",
      "tags": ["标签1", "标签2"],
      "tagsEn": ["tag1", "tag2"],
      "language": "zh",
      "fileSize": "1.2 MB",
      "downloadUrl": "public/documents/academic/document.pdf",
      "previewUrl": null,
      "featured": true
    }
  ]
}
```

## 📝 添加新文档

### 1. 上传文档文件

将文档文件放入对应的分类目录：

```bash
# 学术论文
public/documents/academic/your-paper.pdf

# 演讲稿
public/documents/presentations/your-presentation.pdf

# 简历
public/documents/resume/your-resume.pdf
```

### 2. 更新配置文件

在 `documents.json` 的 `documents` 数组中添加新条目：

```json
{
  "id": "your-paper-id",
  "category": "academic",
  "title": "您的论文标题",
  "titleEn": "Your Paper Title",
  "filename": "your-paper.pdf",
  "path": "public/documents/academic/your-paper.pdf",
  "description": "论文简要描述",
  "descriptionEn": "Brief description of the paper",
  "author": "您的姓名",
  "authorEn": "Your Name",
  "date": "2024-01-01",
  "tags": ["研究", "论文"],
  "tagsEn": ["research", "paper"],
  "language": "zh",
  "fileSize": "2.5 MB",
  "downloadUrl": "public/documents/academic/your-paper.pdf",
  "previewUrl": null,
  "featured": false
}
```

### 3. 使用CLI工具（推荐）

```bash
# 添加新文档
npm run doc-add

# 列出所有文档
npm run doc-list

# 删除文档
npm run doc-remove <document-id>

# 查看帮助
npm run doc-help
```

## 🎨 前端集成

### 页面文件
- `src/pages/documents.html` - 中文文档页面
- `src/pages/documents-en.html` - 英文文档页面

### JavaScript功能
- **DocumentsManager类** - 核心管理逻辑
- **渐进式加载** - 骨架屏和异步数据加载
- **搜索筛选** - 实时搜索和分类筛选
- **响应式交互** - 移动端优化

### CSS样式
- **现代化卡片布局** - 阴影和圆角设计
- **标签系统样式** - 彩色标签展示
- **加载动画** - 骨架屏和过渡效果
- **响应式布局** - 移动端适配

## 🚀 部署和维护

### 自动部署

项目配置了 GitHub Actions 自动部署，推送代码即可：

```bash
git add public/documents/
git commit -m "添加新文档"
git push origin master
```

### 手动部署

```bash
# 检查文档配置
npm run doc-list

# 构建项目
npm run build

# 部署到服务器
npm run deploy
```

## 🔍 最佳实践

### 文档命名规范
- 使用有意义的文件名：`quantum-mechanics-paper.pdf`
- 避免中文文件名和特殊字符
- 包含日期信息：`2024-research-report.pdf`

### 配置管理
- 定期备份 `documents.json` 配置文件
- 使用版本控制管理文档变更
- 保持文档信息的准确性和完整性

### 性能优化
- 压缩大型PDF文件
- 使用适当的文件格式
- 设置合理的缓存策略

## 🛠️ 开发指南

### 本地开发

```bash
# 启动开发服务器
npm run dev

# 访问文档页面
http://localhost:8000/src/pages/documents.html
```

### 扩展功能

可以通过修改以下文件来扩展功能：

- `tools/document-manager.js` - CLI工具逻辑
- `src/pages/documents.html` - 前端界面
- `public/documents/documents.json` - 数据配置

## 📞 技术支持

如有问题或建议，请：

1. 查看项目文档
2. 提交 Issue 到 GitHub
3. 联系开发者

---

<div align="center">

**📄 文档管理系统 - 让文档管理更简单**

Made with ❤️ by [刘浩洋](https://github.com/LHY-in-universe)

</div>