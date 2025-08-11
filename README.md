# 刘浩阳个人网站

一个现代化的个人网站，包含作品展示、博客系统和在线简历等功能。

![Website Preview](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Personal+Website)

## 🌟 功能特性

### 📱 响应式设计
- 完美适配桌面、平板和手机设备
- 现代化的 UI 设计和流畅的动画效果
- 深色/浅色主题支持

### 🏠 主页功能
- 个人介绍和技能展示
- 项目作品展示
- 联系方式和社交链接
- 平滑滚动和交互动画

### 📝 博客系统
- 文章分类筛选（技术、教程、生活、思考）
- 标签云和搜索功能
- 文章阅读统计
- 订阅功能
- Markdown 文章支持

### 📄 在线简历
- 专业的简历布局
- 技能可视化展示
- 工作经历和项目经验
- 打印优化和PDF导出
- 证书和荣誉展示

## 🛠 技术栈

- **前端框架**: HTML5, CSS3, JavaScript ES6+
- **样式系统**: CSS Variables, Flexbox, Grid
- **构建工具**: 原生开发，无需构建步骤
- **部署平台**: GitHub Pages
- **版本控制**: Git

## 📁 项目结构

```
Liu_Haoyang_Web/
├── index.html              # 主页
├── blog.html               # 博客页面
├── resume.html             # 简历页面
├── styles.css              # 主样式文件
├── script.js               # 主脚本文件
├── posts/                  # 博客文章目录
│   ├── posts.json          # 文章元数据
│   ├── react-hooks-deep-dive.md
│   ├── frontend-performance-guide.md
│   └── ...                 # 其他文章
├── .github/workflows/      # GitHub Actions 配置
│   └── deploy.yml          # 自动部署配置
├── _config.yml             # Jekyll 配置
├── manage-blog.js          # 博客管理脚本
└── README.md               # 项目说明
```

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/LHY-in-universe/Liu_Haoyang_Web.git
cd Liu_Haoyang_Web
```

### 2. 本地预览
```bash
# 使用Python简单服务器
python -m http.server 8000

# 或使用Live Server扩展（推荐）
# 访问 http://localhost:8000
```

### 3. 个人信息配置
更新以下文件中的个人信息：
- `index.html` - 修改姓名、介绍、联系方式
- `resume.html` - 更新简历内容
- `_config.yml` - 配置网站基本信息

## 📝 博客管理

### 使用管理脚本（推荐）
```bash
# 安装Node.js后使用以下命令：

# 添加新文章
node manage-blog.js add "文章标题" "tech" "文章简介" "标签1,标签2"

# 查看所有文章
node manage-blog.js list

# 更新文章统计
node manage-blog.js update "article-id" --views 100 --likes 50

# 查看统计信息
node manage-blog.js stats
```

### 手动添加文章
1. 在 `posts/` 目录创建 `.md` 文件
2. 在 `posts/posts.json` 中添加文章元数据
3. 按照已有文章格式编写内容

## 🌐 GitHub Pages 部署

### 自动部署（推荐）
1. 推送代码到GitHub仓库的 `master` 分支
2. GitHub Actions 会自动部署到 GitHub Pages
3. 访问 `https://LHY-in-universe.github.io/Liu_Haoyang_Web`

### 手动配置GitHub Pages
1. 进入GitHub仓库设置 → Pages
2. 选择 Source: GitHub Actions
3. 等待部署完成

## ⚙️ 自定义配置

### 样式主题
修改 `styles.css` 中的CSS变量：
```css
:root {
    --primary-color: #4F46E5;      /* 主色调 */
    --secondary-color: #7C3AED;    /* 辅助色 */
    --accent-color: #06B6D4;       /* 强调色 */
}
```

### 域名配置
1. 创建 `CNAME` 文件
2. 添加你的域名
3. 在域名商配置DNS指向GitHub Pages

## 📊 功能特色

- ✅ **响应式设计** - 完美适配各种设备
- ✅ **现代化UI** - 流畅动画和交互效果
- ✅ **博客系统** - 完整的文章管理功能
- ✅ **在线简历** - 专业的简历展示
- ✅ **SEO优化** - 搜索引擎友好
- ✅ **GitHub Actions** - 自动化部署
- ✅ **性能优化** - 快速加载和流畅体验

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- **GitHub**: [@LHY-in-universe](https://github.com/LHY-in-universe)
- **邮箱**: your.email@example.com
- **网站**: https://LHY-in-universe.github.io/Liu_Haoyang_Web

---

⭐ 如果这个项目对你有帮助，请给一个 Star！