# Vue项目部署指南

## 📦 部署到GitHub Pages

### 方法一: 手动部署

1. **构建项目**
```bash
npm run build
```

2. **提交dist目录**
```bash
git add dist -f
git commit -m "Deploy: Build Vue app"
```

3. **推送到gh-pages分支**
```bash
git subtree push --prefix dist origin gh-pages
```

### 方法二: GitHub Actions自动部署

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy Vue App

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          cd vue-app
          npm ci

      - name: Build
        run: |
          cd vue-app
          npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./vue-app/dist
          publish_branch: gh-pages
```

### 方法三: 使用gh-pages包

1. **安装gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **添加部署脚本到package.json**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. **执行部署**
```bash
npm run deploy
```

## 🔧 配置说明

### vite.config.js配置
```javascript
export default defineConfig({
  base: '/Liu_Haoyang_Web/',  // GitHub仓库名
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
```

### 路由配置
确保router使用正确的base URL:
```javascript
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
```

## 🌐 自定义域名

如果使用自定义域名:

1. **更新vite.config.js**
```javascript
export default defineConfig({
  base: '/',  // 改为根路径
  // ...
})
```

2. **添加CNAME文件**
在public目录创建CNAME文件:
```
yourdomain.com
```

3. **配置DNS**
添加CNAME记录指向: `yourusername.github.io`

## ✅ 部署检查清单

- [ ] 确认vite.config.js中base配置正确
- [ ] 确认所有图片和静态资源路径正确
- [ ] 测试构建版本: `npm run build && npm run preview`
- [ ] 检查控制台无错误
- [ ] 测试所有路由页面
- [ ] 测试主题切换功能
- [ ] 测试语言切换功能
- [ ] 移动端响应式测试

## 🐛 常见问题

### 1. 页面刷新404
**原因**: SPA路由与GitHub Pages冲突

**解决**:
- 使用Hash模式路由
- 或添加404.html重定向

### 2. 资源加载失败
**原因**: base路径配置不正确

**解决**:
检查vite.config.js中base值与GitHub仓库名一致

### 3. 样式丢失
**原因**: CSS路径问题

**解决**:
使用相对路径或确保base配置正确

## 🚀 性能优化建议

1. **启用Gzip压缩**
2. **使用CDN加载第三方库**
3. **图片懒加载**
4. **代码分割优化**
5. **Service Worker缓存**

## 📊 部署后验证

访问以下URL测试:
- https://yourusername.github.io/Liu_Haoyang_Web/
- https://yourusername.github.io/Liu_Haoyang_Web/#/blog
- https://yourusername.github.io/Liu_Haoyang_Web/#/documents
- https://yourusername.github.io/Liu_Haoyang_Web/#/resume

---

部署成功后,您的Vue应用将可通过GitHub Pages访问! 🎉
