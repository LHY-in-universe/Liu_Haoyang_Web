# 🚀 部署指南

本文档详细介绍如何将个人网站部署到各种平台。

## 📋 目录

- [GitHub Pages 部署](#github-pages-部署)
- [Netlify 部署](#netlify-部署)
- [Vercel 部署](#vercel-部署)
- [自定义服务器部署](#自定义服务器部署)
- [域名配置](#域名配置)
- [HTTPS 配置](#https-配置)

## 🌐 GitHub Pages 部署

### 自动部署（推荐）

1. **配置 GitHub Actions**
   
   项目已包含 `.github/workflows/deploy.yml` 配置文件。

2. **推送代码**
   ```bash
   git add .
   git commit -m "部署更新"
   git push origin master
   ```

3. **访问网站**
   ```
   https://LHY-in-universe.github.io/Liu_Haoyang_Web/
   ```

### 手动配置 GitHub Pages

1. 进入 GitHub 仓库设置
2. 滚动到 "Pages" 部分
3. 选择 Source: "Deploy from a branch"
4. 选择分支: `master` 或 `main`
5. 选择文件夹: `/ (root)`

## ⚡ Netlify 部署

### 1. 连接 GitHub 仓库

1. 登录 [Netlify](https://netlify.com)
2. 点击 "New site from Git"
3. 选择 GitHub 并授权
4. 选择你的仓库

### 2. 配置构建设置

```yaml
# netlify.toml
[build]
  publish = "."
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. 部署
- 推送代码到 GitHub，Netlify 会自动部署
- 或在 Netlify 控制台手动触发部署

## ▲ Vercel 部署

### 1. 连接项目

1. 登录 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 导入 GitHub 仓库

### 2. 配置项目

```json
// vercel.json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "."
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

### 3. 环境变量

在 Vercel 控制台设置必要的环境变量。

## 🖥️ 自定义服务器部署

### 使用 Nginx

1. **安装 Nginx**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nginx
   
   # CentOS/RHEL
   sudo yum install nginx
   ```

2. **配置 Nginx**
   ```nginx
   # /etc/nginx/sites-available/your-domain.com
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;
       root /var/www/your-site;
       index index.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
       
       # 缓存静态文件
       location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
       
       # 压缩
       gzip on;
       gzip_types text/plain text/css application/javascript;
   }
   ```

3. **启用站点**
   ```bash
   sudo ln -s /etc/nginx/sites-available/your-domain.com /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### 使用 Apache

1. **安装 Apache**
   ```bash
   # Ubuntu/Debian
   sudo apt install apache2
   
   # CentOS/RHEL
   sudo yum install httpd
   ```

2. **配置虚拟主机**
   ```apache
   # /etc/apache2/sites-available/your-domain.com.conf
   <VirtualHost *:80>
       ServerName your-domain.com
       ServerAlias www.your-domain.com
       DocumentRoot /var/www/your-site
       
       <Directory /var/www/your-site>
           Options -Indexes +FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
       
       # 启用压缩
       LoadModule deflate_module modules/mod_deflate.so
       <Location />
           SetOutputFilter DEFLATE
       </Location>
   </VirtualHost>
   ```

3. **启用站点**
   ```bash
   sudo a2ensite your-domain.com
   sudo systemctl restart apache2
   ```

## 🌍 域名配置

### DNS 配置

1. **A 记录配置**
   ```
   类型: A
   名称: @
   值: 你的服务器IP地址
   TTL: 3600
   ```

2. **CNAME 记录配置**
   ```
   类型: CNAME
   名称: www
   值: your-domain.com
   TTL: 3600
   ```

### GitHub Pages 自定义域名

1. 在仓库根目录创建 `CNAME` 文件：
   ```
   your-domain.com
   ```

2. 配置 DNS A 记录指向：
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

## 🔒 HTTPS 配置

### Let's Encrypt (推荐)

1. **安装 Certbot**
   ```bash
   # Ubuntu/Debian
   sudo apt install certbot python3-certbot-nginx
   
   # CentOS/RHEL
   sudo yum install certbot python3-certbot-nginx
   ```

2. **获取证书**
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

3. **自动续期**
   ```bash
   sudo crontab -e
   # 添加以下行
   0 12 * * * /usr/bin/certbot renew --quiet
   ```

### Cloudflare (简单方式)

1. 将域名 DNS 指向 Cloudflare
2. 在 Cloudflare 控制台启用 SSL/TLS
3. 设置 SSL/TLS 模式为 "Full" 或 "Full (strict)"

## 📊 性能优化

### 1. 启用压缩

**Nginx:**
```nginx
gzip on;
gzip_vary on;
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/javascript
    application/xml+rss;
```

**Apache:**
```apache
LoadModule deflate_module modules/mod_deflate.so
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
</IfModule>
```

### 2. 配置缓存

**Nginx:**
```nginx
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

**Apache:**
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

### 3. CDN 配置

推荐使用的 CDN 服务：
- Cloudflare (免费)
- AWS CloudFront
- Azure CDN
- Google Cloud CDN

## 🔍 监控与分析

### 1. 网站监控

- **Uptime Robot**: 免费网站监控
- **Pingdom**: 性能监控
- **StatusCake**: 多地区监控

### 2. 性能分析

- **Google PageSpeed Insights**
- **GTmetrix**
- **WebPageTest**

### 3. 访问统计

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## ❗ 常见问题

### Q: GitHub Pages 部署后看不到更新？

A: 检查以下几点：
1. GitHub Actions 是否运行成功
2. 浏览器缓存，尝试强制刷新 (Ctrl+F5)
3. 检查 CNAME 文件是否正确

### Q: 自定义域名不工作？

A: 确保：
1. DNS 配置正确
2. DNS 传播完成（可能需要24-48小时）
3. CNAME 文件内容正确

### Q: HTTPS 证书错误？

A: 检查：
1. 证书是否正确安装
2. 证书是否过期
3. 域名是否匹配证书

### Q: 网站访问很慢？

A: 优化建议：
1. 启用 gzip 压缩
2. 配置浏览器缓存
3. 使用 CDN
4. 优化图片大小

## 📝 部署检查清单

- [ ] 代码推送到 GitHub
- [ ] GitHub Actions 运行成功
- [ ] DNS 配置正确
- [ ] HTTPS 证书配置
- [ ] 性能优化配置
- [ ] 监控工具配置
- [ ] 备份策略制定

---

**🎉 恭喜！你的个人网站现在已经成功部署并可以访问了！**