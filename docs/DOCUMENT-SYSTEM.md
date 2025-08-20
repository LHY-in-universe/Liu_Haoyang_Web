# 📄 文档管理系统使用指南

本文档系统让你可以轻松管理和展示PDF文档、学术论文、演讲稿等文件。

## 🚀 快速开始

### 1. 添加你的main.pdf简历

```bash
# 将你的main.pdf文件放到合适的位置，然后运行：
npm run doc-add ./path/to/main.pdf --category resume --title "个人简历" --description "刘浩洋的个人简历，包含教育背景和项目经验"
```

### 2. 添加PHYS论文

```bash
# 添加物理相关论文
npm run doc-add ./path/to/physics-paper.pdf --category academic --title "DSMC方法研究" --tags "物理,DSMC,论文,数值模拟" --description "关于DSMC方法在稀薄气体动力学中的应用研究"
```

### 3. 添加演讲稿

```bash
# 添加演讲PPT
npm run doc-add ./path/to/presentation.pptx --category presentations --title "物理研究报告" --tags "演讲,物理,研究" --description "PHYS相关研究成果的演讲展示"
```

### 4. 添加博客文章

```bash
# 添加之前写的博客文章
npm run doc-add ./path/to/blog-article.md --category blog --title "前端技术分享" --tags "前端,JavaScript,技术" --description "关于前端开发的技术总结和心得分享"
```

## 📁 目录结构

文档会按类别自动组织：

```
public/documents/
├── resume/          # 简历文件
│   └── main.pdf     # 你的主简历
├── academic/        # 学术论文
│   ├── PHYS/       # 物理相关论文
│   └── ...
├── presentations/   # 演讲稿
│   ├── PHYS/       # 物理演讲
│   └── ...
└── blog/           # 博客文章
    └── ...
```

## 🎯 完整命令参考

### 添加文档
```bash
npm run doc-add <file_path> [options]

选项：
  --title <title>        文档标题
  --title-en <title>     英文标题
  --description <desc>   文档描述
  --category <category>  分类 (resume/academic/presentations/blog)
  --tags <tags>         标签，逗号分隔
  --author <author>     作者 (默认: 刘浩洋)
  --date <date>         日期 (YYYY-MM-DD格式)
  --overwrite           覆盖已存在文档
```

### 查看文档
```bash
# 查看所有文档
npm run doc-list

# 查看特定分类
npm run doc-list resume
npm run doc-list academic
npm run doc-list presentations
npm run doc-list blog
```

### 删除文档
```bash
npm run doc-remove <document-id>
```

### 获取帮助
```bash
npm run doc-help
```

## 📊 文档分类说明

### 📄 Resume (简历)
- 个人简历
- CV文档
- 求职相关材料

### 🎓 Academic (学术论文)
- 研究论文
- 学术文章
- 期刊投稿

### 📊 Presentations (演讲稿)
- PPT演示文稿
- 会议报告
- 学术演讲

### 📝 Blog (博客文章)
- 技术博客
- 学习心得
- 个人总结

## 🌐 网站展示

文档添加后会自动在以下页面显示：

1. **中文页面**: `/src/pages/documents.html`
2. **英文页面**: `/src/pages/documents-en.html`

### 功能特性
- ✅ **分类筛选** - 按文档类型筛选
- ✅ **搜索功能** - 全文搜索文档
- ✅ **在线预览** - PDF文档在线预览
- ✅ **一键下载** - 直接下载文档
- ✅ **响应式设计** - 适配移动设备
- ✅ **双语支持** - 中英文界面

## 📱 使用示例

### 建立完整的学术档案

1. **添加主简历**
```bash
npm run doc-add ./main.pdf --category resume --title "刘浩洋 - 个人简历" --description "包含教育背景、项目经验、技能总结"
```

2. **添加物理论文**
```bash
npm run doc-add ./dsmc-research.pdf --category academic --title "DSMC方法在稀薄气体中的应用" --tags "物理,DSMC,数值模拟,CFD" --description "基于DSMC方法的稀薄气体动力学数值研究"
```

3. **添加技术博客**
```bash
npm run doc-add ./frontend-guide.md --category blog --title "前端性能优化实践" --tags "前端,JavaScript,性能优化" --description "从实际项目中总结的前端性能优化经验和技巧"
```

4. **添加演讲材料**
```bash
npm run doc-add ./research-presentation.pptx --category presentations --title "物理研究成果汇报" --tags "演讲,研究,PHYS" --description "关于最新研究进展的学术报告"
```

## 🔧 高级功能

### 批量添加文档
可以创建脚本批量添加多个文档：

```bash
#!/bin/bash
# batch-add-docs.sh

# 添加所有PDF论文
for file in ./papers/*.pdf; do
    filename=$(basename "$file" .pdf)
    npm run doc-add "$file" --category academic --title "$filename" --tags "论文,学术"
done

# 添加所有演讲稿
for file in ./presentations/*.pptx; do
    filename=$(basename "$file" .pptx)
    npm run doc-add "$file" --category presentations --title "$filename" --tags "演讲,展示"
done
```

### 自定义预览URL
为某些文档设置在线预览：

```bash
npm run doc-add ./paper.pdf --category academic --title "研究论文" --preview-url "https://example.com/paper-preview"
```

## 🎨 自定义样式

文档页面使用与主站相同的CSS样式，你可以：

1. 修改 `src/css/styles.css` 调整整体风格
2. 在文档页面中添加特定样式
3. 自定义分类图标和颜色

## 📈 SEO优化

系统自动为每个文档生成：
- 结构化数据
- Meta标签
- 社交媒体分享信息
- 搜索引擎友好的URL

## 🔍 故障排除

### 常见问题

**Q: 添加文档后网页上看不到？**
A: 
1. 确认文档已成功添加：`npm run doc-list`
2. 检查浏览器缓存，强制刷新页面
3. 确认JSON配置文件格式正确

**Q: PDF预览不工作？**
A: 
1. 确认PDF文件完整且未损坏
2. 检查文件路径是否正确
3. 某些浏览器可能阻止PDF预览，尝试下载功能

**Q: 如何修改已添加的文档信息？**
A: 
1. 使用 `--overwrite` 参数重新添加
2. 或直接编辑 `public/documents/documents.json` 文件

## 📞 获取帮助

如果遇到问题，可以：
1. 查看 `npm run doc-help` 获取详细命令说明
2. 检查控制台错误信息
3. 参考本文档的故障排除部分

---

**🎉 现在你可以开始添加你的文档了！建议先从main.pdf简历开始，然后逐步添加其他资料。**