#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

/**
 * 自动化博客构建系统
 * 通过添加Markdown文件自动生成HTML文章并更新博客列表
 */

// 配置文件
const CONFIG = {
    postsDir: './posts',
    articlesDir: './articles', 
    templatesDir: './templates',
    blogPages: {
        zh: './blog.html',
        en: './blog-en.html'
    },
    outputEncoding: 'utf8'
};

// 工具函数
const utils = {
    // 读取文件
    readFile: (filePath) => {
        try {
            return fs.readFileSync(filePath, CONFIG.outputEncoding);
        } catch (error) {
            console.error(`读取文件失败: ${filePath}`, error.message);
            return null;
        }
    },

    // 写入文件
    writeFile: (filePath, content) => {
        try {
            // 确保目录存在
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(filePath, content, CONFIG.outputEncoding);
            console.log(`✅ 文件已生成: ${filePath}`);
            return true;
        } catch (error) {
            console.error(`写入文件失败: ${filePath}`, error.message);
            return false;
        }
    },

    // 获取文件列表
    getMarkdownFiles: (dir) => {
        try {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                return [];
            }
            return fs.readdirSync(dir)
                .filter(file => file.endsWith('.md'))
                .map(file => path.join(dir, file));
        } catch (error) {
            console.error(`读取目录失败: ${dir}`, error.message);
            return [];
        }
    },

    // 解析Markdown前言 (Front Matter)
    parseFrontMatter: (content) => {
        const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = content.match(frontMatterRegex);
        
        if (!match) {
            return {
                metadata: {},
                content: content
            };
        }

        const frontMatter = match[1];
        const markdownContent = match[2];
        const metadata = {};

        // 解析YAML格式的前言
        frontMatter.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
                
                // 处理数组格式 (如tags)
                if (value.startsWith('[') && value.endsWith(']')) {
                    metadata[key.trim()] = value.slice(1, -1).split(',').map(item => item.trim().replace(/^["']|["']$/g, ''));
                } else {
                    metadata[key.trim()] = value;
                }
            }
        });

        return {
            metadata,
            content: markdownContent
        };
    },

    // 生成文章摘要
    generateExcerpt: (content, maxLength = 200) => {
        // 移除Markdown标记
        const plainText = content
            .replace(/#+\s/g, '') // 移除标题标记
            .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体标记
            .replace(/\*(.*?)\*/g, '$1') // 移除斜体标记
            .replace(/`(.*?)`/g, '$1') // 移除行内代码标记
            .replace(/```[\s\S]*?```/g, '') // 移除代码块
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接，保留文本
            .replace(/\n+/g, ' ') // 替换换行为空格
            .trim();

        return plainText.length > maxLength 
            ? plainText.substring(0, maxLength) + '...' 
            : plainText;
    },

    // 生成唯一ID
    generateSlug: (title) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // 移除特殊字符
            .replace(/[\s_-]+/g, '-') // 替换空格和下划线为连字符
            .replace(/^-+|-+$/g, ''); // 移除首尾连字符
    },

    // 计算阅读时间
    calculateReadTime: (content, wordsPerMinute = 200) => {
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return minutes;
    }
};

// Markdown处理器
class MarkdownProcessor {
    constructor() {
        // 配置marked选项
        marked.setOptions({
            highlight: function(code, lang) {
                // 简单的语法高亮包装
                return `<code class="language-${lang || 'text'}">${code}</code>`;
            },
            breaks: true,
            gfm: true
        });
    }

    // 处理单个Markdown文件
    processMarkdownFile(filePath) {
        const content = utils.readFile(filePath);
        if (!content) return null;

        const { metadata, content: markdownContent } = utils.parseFrontMatter(content);
        const fileName = path.basename(filePath, '.md');
        
        // 默认元数据
        const defaultMetadata = {
            title: fileName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            date: new Date().toISOString().split('T')[0],
            category: 'tech',
            tags: ['技术'],
            author: '刘浩洋',
            language: fileName.includes('-en') ? 'en' : 'zh',
            slug: utils.generateSlug(metadata.title || fileName),
            excerpt: '',
            readTime: 0,
            views: Math.floor(Math.random() * 2000) + 100,
            comments: Math.floor(Math.random() * 50) + 1,
            likes: Math.floor(Math.random() * 100) + 5
        };

        // 合并元数据
        const articleData = { ...defaultMetadata, ...metadata };
        
        // 生成摘要和阅读时间
        articleData.excerpt = articleData.excerpt || utils.generateExcerpt(markdownContent);
        articleData.readTime = utils.calculateReadTime(markdownContent);

        // 转换Markdown为HTML
        const htmlContent = marked(markdownContent);

        return {
            ...articleData,
            fileName,
            htmlContent,
            filePath
        };
    }

    // 批量处理Markdown文件
    processAllMarkdowns() {
        const markdownFiles = utils.getMarkdownFiles(CONFIG.postsDir);
        const articles = [];

        console.log(`📚 发现 ${markdownFiles.length} 个Markdown文件`);

        markdownFiles.forEach(filePath => {
            const article = this.processMarkdownFile(filePath);
            if (article) {
                articles.push(article);
                console.log(`✅ 处理完成: ${article.title}`);
            }
        });

        return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
}

// HTML生成器
class HTMLGenerator {
    constructor() {
        this.templates = this.loadTemplates();
    }

    // 加载模板文件
    loadTemplates() {
        const templates = {};
        const templateFiles = ['article-zh.html', 'article-en.html'];
        
        templateFiles.forEach(file => {
            const filePath = path.join(CONFIG.templatesDir, file);
            const content = utils.readFile(filePath);
            if (content) {
                templates[file.replace('.html', '')] = content;
            }
        });

        // 如果模板不存在，使用默认模板
        if (!templates['article-zh']) {
            templates['article-zh'] = this.getDefaultTemplate('zh');
        }
        if (!templates['article-en']) {
            templates['article-en'] = this.getDefaultTemplate('en');
        }

        return templates;
    }

    // 获取默认模板
    getDefaultTemplate(lang) {
        const isEn = lang === 'en';
        return `<!DOCTYPE html>
<html lang="${isEn ? 'en' : 'zh-CN'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}} - ${isEn ? 'Liu Haoyang' : '刘浩洋'}</title>
    <link rel="stylesheet" href="../styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="../${isEn ? 'index-en.html' : 'index.html'}">${isEn ? 'Liu Haoyang' : '刘浩洋'}</a>
            </div>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="../${isEn ? 'index-en.html' : 'index.html'}" class="nav-link">${isEn ? 'Home' : '首页'}</a>
                </li>
                <li class="nav-item">
                    <a href="../${isEn ? 'index-en.html#about' : 'index.html#about'}" class="nav-link">${isEn ? 'About' : '关于我'}</a>
                </li>
                <li class="nav-item">
                    <a href="../${isEn ? 'index-en.html#projects' : 'index.html#projects'}" class="nav-link">${isEn ? 'Projects' : '项目作品'}</a>
                </li>
                <li class="nav-item">
                    <a href="../${isEn ? 'blog-en.html' : 'blog.html'}" class="nav-link active">${isEn ? 'Blog' : '博客'}</a>
                </li>
                <li class="nav-item">
                    <a href="../${isEn ? 'resume-en.html' : 'resume.html'}" class="nav-link">${isEn ? 'Resume' : '简历'}</a>
                </li>
                <li class="nav-item">
                    <a href="../${isEn ? 'index-en.html#contact' : 'index.html#contact'}" class="nav-link">${isEn ? 'Contact' : '联系我'}</a>
                </li>
            </ul>
            <div class="language-switcher">
                <button class="lang-btn ${isEn ? '' : 'active'}" data-lang="zh" title="切换到中文">中</button>
                <button class="lang-btn ${isEn ? 'active' : ''}" data-lang="en" title="Switch to English">EN</button>
            </div>
            <div class="nav-toggle" id="mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>

    <main class="main-content">
        <section class="page-header">
            <div class="container">
                <div class="page-header-content">
                    <h1>{{title}}</h1>
                    <p>{{excerpt}}</p>
                    <div class="breadcrumb">
                        <a href="../${isEn ? 'index-en.html' : 'index.html'}">${isEn ? 'Home' : '首页'}</a> / <a href="../${isEn ? 'blog-en.html' : 'blog.html'}">${isEn ? 'Blog' : '博客'}</a> / <span>{{title}}</span>
                    </div>
                    <div class="article-meta" style="margin-top: 1.5rem; text-align: center;">
                        <span style="color: var(--text-light); margin-right: 2rem;">📅 {{date}}</span>
                        <span style="color: var(--text-light); margin-right: 2rem;">⏱️ {{readTime}} ${isEn ? 'min read' : '分钟阅读'}</span>
                        <span style="color: var(--text-light);">👁️ {{views}} ${isEn ? 'views' : '阅读'}</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="article-section" style="padding: 4rem 0; background: var(--bg-white);">
            <div class="container">
                <div class="article-layout" style="display: grid; grid-template-columns: 3fr 1fr; gap: 3rem;">
                    <article class="article-content" style="background: var(--bg-white); padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow);">
                        <div class="article-tags" style="margin-bottom: 2rem;">
                            {{tags}}
                        </div>

                        <div class="article-body" style="line-height: 1.8; font-size: 1.125rem;">
                            {{content}}
                        </div>

                        <div class="article-footer" style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                                <div class="article-stats">
                                    <span style="margin-right: 1rem;">👁️ {{views}}</span>
                                    <span style="margin-right: 1rem;">💬 {{comments}}</span>
                                    <span>❤️ {{likes}}</span>
                                </div>
                                <div class="article-share">
                                    <span style="color: var(--text-light); margin-right: 1rem;">${isEn ? 'Share:' : '分享：'}</span>
                                    <button class="btn btn-sm btn-outline">${isEn ? 'Twitter' : '微信'}</button>
                                    <button class="btn btn-sm btn-outline" style="margin-left: 0.5rem;">${isEn ? 'LinkedIn' : '微博'}</button>
                                </div>
                            </div>
                        </div>
                    </article>

                    <aside class="article-sidebar">
                        <div class="sidebar-widget" style="background: var(--bg-light); padding: 1.5rem; border-radius: 1rem; margin-bottom: 2rem;">
                            <h3>${isEn ? 'Back to Navigation' : '返回导航'}</h3>
                            <div class="quick-nav">
                                <a href="../${isEn ? 'blog-en.html' : 'blog.html'}" class="quick-nav-item">
                                    <span class="nav-icon">📝</span>
                                    <span>${isEn ? 'Blog Home' : '博客首页'}</span>
                                </a>
                                <a href="../${isEn ? 'index-en.html' : 'index.html'}" class="quick-nav-item">
                                    <span class="nav-icon">🏠</span>
                                    <span>${isEn ? 'Back Home' : '返回主页'}</span>
                                </a>
                                <a href="../${isEn ? 'resume-en.html' : 'resume.html'}" class="quick-nav-item">
                                    <span class="nav-icon">📋</span>
                                    <span>${isEn ? 'Resume' : '个人简历'}</span>
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <p>&copy; 2024 ${isEn ? 'Liu Haoyang. All rights reserved.' : '刘浩洋. 保留所有权利.'}</p>
                <div class="social-links">
                    <a href="#" aria-label="GitHub">🐙</a>
                    <a href="#" aria-label="LinkedIn">💼</a>
                    <a href="#" aria-label="Email">📧</a>
                </div>
            </div>
        </div>
    </footer>

    <script src="../script.js"></script>
</body>
</html>`;
    }

    // 生成单个文章HTML
    generateArticleHTML(article) {
        const templateKey = article.language === 'en' ? 'article-en' : 'article-zh';
        let template = this.templates[templateKey];

        // 生成标签HTML
        const tagsHTML = article.tags.map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');

        // 替换模板变量
        const replacements = {
            '{{title}}': article.title,
            '{{excerpt}}': article.excerpt,
            '{{date}}': this.formatDate(article.date, article.language),
            '{{readTime}}': article.readTime,
            '{{views}}': article.views,
            '{{comments}}': article.comments,
            '{{likes}}': article.likes,
            '{{tags}}': tagsHTML,
            '{{content}}': article.htmlContent
        };

        Object.entries(replacements).forEach(([key, value]) => {
            template = template.replace(new RegExp(key.replace(/[{}]/g, '\\$&'), 'g'), value);
        });

        return template;
    }

    // 格式化日期
    formatDate(dateString, language) {
        const date = new Date(dateString);
        if (language === 'en') {
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        } else {
            return date.toLocaleDateString('zh-CN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }).replace(/年|月/g, match => match + ' ').replace(/日/, '');
        }
    }

    // 生成所有文章HTML
    generateAllArticles(articles) {
        const generatedFiles = [];

        articles.forEach(article => {
            const html = this.generateArticleHTML(article);
            const fileName = `${article.slug}.html`;
            const filePath = path.join(CONFIG.articlesDir, fileName);
            
            if (utils.writeFile(filePath, html)) {
                generatedFiles.push({
                    ...article,
                    fileName,
                    filePath,
                    url: `articles/${fileName}`
                });
            }
        });

        return generatedFiles;
    }
}

// 博客列表更新器
class BlogListUpdater {
    constructor() {
        this.blogTemplates = this.loadBlogTemplates();
    }

    // 加载博客页面模板
    loadBlogTemplates() {
        const templates = {};
        
        Object.entries(CONFIG.blogPages).forEach(([lang, filePath]) => {
            const content = utils.readFile(filePath);
            if (content) {
                templates[lang] = content;
            }
        });

        return templates;
    }

    // 生成文章卡片HTML
    generateArticleCard(article, language) {
        const isEn = language === 'en';
        const tagsHTML = article.tags.slice(0, 3).map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');

        const categoryMap = {
            zh: { tech: '技术', tutorial: '教程', life: '生活', thoughts: '思考' },
            en: { tech: 'Tech', tutorial: 'Tutorial', life: 'Life', thoughts: 'Thoughts' }
        };

        const category = categoryMap[language][article.category] || article.category;
        const readMoreText = isEn ? 'Read More' : '阅读全文';
        const viewsText = isEn ? 'views' : '阅读';
        const minReadText = isEn ? 'min read' : '分钟阅读';

        return `
                            <article class="blog-post" data-category="${article.category}">
                                <div class="post-image">
                                    <img src="https://via.placeholder.com/600x300/4F46E5/FFFFFF?text=${encodeURIComponent(article.title.substring(0, 20))}" alt="${article.title}">
                                    <div class="post-category">${category}</div>
                                </div>
                                <div class="post-content">
                                    <div class="post-meta">
                                        <span class="post-date">${this.formatDate(article.date, language)}</span>
                                        <span class="post-read-time">${article.readTime}${minReadText}</span>
                                    </div>
                                    <h2><a href="${article.url}" class="post-title">${article.title}</a></h2>
                                    <p class="post-excerpt">
                                        ${article.excerpt}
                                    </p>
                                    <div class="post-tags">
                                        ${tagsHTML}
                                    </div>
                                    <div class="post-actions">
                                        <a href="${article.url}" class="read-more">${readMoreText}</a>
                                        <div class="post-stats">
                                            <span>👁️ ${article.views}</span>
                                            <span>💬 ${article.comments}</span>
                                            <span>❤️ ${article.likes}</span>
                                        </div>
                                    </div>
                                </div>
                            </article>`;
    }

    // 格式化日期
    formatDate(dateString, language) {
        const date = new Date(dateString);
        if (language === 'en') {
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        } else {
            return date.toLocaleDateString('zh-CN').replace(/\//g, '年').replace(/年(\d+)年/, '年$1月') + '日';
        }
    }

    // 更新博客页面
    updateBlogPages(articles) {
        Object.entries(this.blogTemplates).forEach(([language, template]) => {
            // 按语言过滤文章
            const languageArticles = articles.filter(article => 
                article.language === language || 
                (language === 'zh' && !article.language)
            );

            // 生成文章列表HTML
            const articlesHTML = languageArticles.map(article => 
                this.generateArticleCard(article, language)
            ).join('\n');

            // 查找并替换文章列表区域
            const postsRegex = /(<div class="blog-posts">)([\s\S]*?)(<\/div>\s*<div class="pagination">)/;
            const updatedTemplate = template.replace(postsRegex, 
                `$1\n${articlesHTML}\n                        $3`
            );

            // 更新热门文章列表
            const popularArticles = languageArticles
                .sort((a, b) => b.views - a.views)
                .slice(0, 4);

            const popularHTML = popularArticles.map(article => `
                                <li>
                                    <a href="${article.url}">${article.title}</a>
                                    <span class="post-views">${article.views} ${language === 'en' ? 'views' : '阅读'}</span>
                                </li>`).join('');

            const popularRegex = /(<ul class="popular-posts">)([\s\S]*?)(<\/ul>)/;
            const finalTemplate = updatedTemplate.replace(popularRegex, 
                `$1${popularHTML}\n                            $3`
            );

            // 写入更新后的文件
            const outputPath = CONFIG.blogPages[language];
            utils.writeFile(outputPath, finalTemplate);
        });
    }
}

// 主构建类
class BlogBuilder {
    constructor() {
        this.processor = new MarkdownProcessor();
        this.generator = new HTMLGenerator();
        this.updater = new BlogListUpdater();
    }

    // 执行完整构建
    async build() {
        console.log('🚀 开始构建博客系统...\n');

        try {
            // 1. 处理所有Markdown文件
            console.log('📝 处理Markdown文件...');
            const articles = this.processor.processAllMarkdowns();
            
            if (articles.length === 0) {
                console.log('⚠️  没有找到Markdown文件');
                return;
            }

            // 2. 生成HTML文章页面
            console.log('\n🔨 生成HTML文章页面...');
            const generatedArticles = this.generator.generateAllArticles(articles);

            // 3. 更新博客列表页面
            console.log('\n📋 更新博客列表页面...');
            this.updater.updateBlogPages(generatedArticles);

            // 4. 更新posts.json文件
            console.log('\n💾 更新posts.json...');
            this.updatePostsJson(generatedArticles);

            console.log(`\n✅ 构建完成！共处理 ${generatedArticles.length} 篇文章`);
            
            // 显示构建结果
            this.showBuildSummary(generatedArticles);

        } catch (error) {
            console.error('❌ 构建失败:', error.message);
            console.error(error.stack);
        }
    }

    // 更新posts.json
    updatePostsJson(articles) {
        const postsData = articles.map(article => ({
            id: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            date: article.date,
            category: article.category,
            tags: article.tags,
            author: article.author,
            language: article.language,
            readTime: article.readTime,
            views: article.views,
            comments: article.comments,
            likes: article.likes,
            url: article.url,
            fileName: article.fileName
        }));

        const postsJsonPath = path.join(CONFIG.postsDir, 'posts.json');
        const jsonContent = JSON.stringify(postsData, null, 2);
        utils.writeFile(postsJsonPath, jsonContent);
    }

    // 显示构建摘要
    showBuildSummary(articles) {
        console.log('\n📊 构建摘要:');
        console.log('─'.repeat(50));
        
        const stats = {
            total: articles.length,
            zh: articles.filter(a => a.language === 'zh' || !a.language).length,
            en: articles.filter(a => a.language === 'en').length,
            categories: [...new Set(articles.map(a => a.category))]
        };

        console.log(`总文章数: ${stats.total}`);
        console.log(`中文文章: ${stats.zh}`);
        console.log(`英文文章: ${stats.en}`);
        console.log(`文章分类: ${stats.categories.join(', ')}`);
        console.log('─'.repeat(50));
        
        articles.forEach((article, index) => {
            console.log(`${index + 1}. ${article.title} (${article.language || 'zh'})`);
            console.log(`   📁 ${article.url}`);
        });
    }
}

// 命令行接口
class CLI {
    constructor() {
        this.builder = new BlogBuilder();
    }

    // 显示帮助信息
    showHelp() {
        console.log(`
🔨 博客自动化构建工具

用法:
  node build-blog.js [命令]

命令:
  build, -b          构建所有博客文章
  new <title>        创建新的Markdown模板
  help, -h           显示此帮助信息

示例:
  node build-blog.js build
  node build-blog.js new "我的新文章"

目录结构:
  posts/            - Markdown文件目录
  articles/         - 生成的HTML文章目录
  templates/        - HTML模板目录
`);
    }

    // 创建新文章模板
    createNewPost(title) {
        if (!title) {
            console.error('❌ 请提供文章标题');
            return;
        }

        const slug = utils.generateSlug(title);
        const date = new Date().toISOString().split('T')[0];
        
        const template = `---
title: ${title}
date: ${date}
category: tech
tags: [技术, 前端]
author: 刘浩洋
language: zh
excerpt: ${title}的简要描述
---

# ${title}

在这里开始写您的文章内容...

## 第一个标题

您的内容...

## 总结

文章总结...
`;

        const filePath = path.join(CONFIG.postsDir, `${slug}.md`);
        
        if (fs.existsSync(filePath)) {
            console.error(`❌ 文件已存在: ${filePath}`);
            return;
        }

        if (utils.writeFile(filePath, template)) {
            console.log(`✅ 新文章模板已创建: ${filePath}`);
            console.log(`\n编辑完成后运行以下命令构建:`);
            console.log(`node build-blog.js build`);
        }
    }

    // 运行CLI
    run() {
        const args = process.argv.slice(2);
        const command = args[0];

        switch (command) {
            case 'build':
            case '-b':
                this.builder.build();
                break;
            
            case 'new':
                const title = args.slice(1).join(' ');
                this.createNewPost(title);
                break;
            
            case 'help':
            case '-h':
            case undefined:
                this.showHelp();
                break;
            
            default:
                console.error(`❌ 未知命令: ${command}`);
                this.showHelp();
        }
    }
}

// 如果作为脚本直接运行
if (require.main === module) {
    const cli = new CLI();
    cli.run();
}

module.exports = {
    BlogBuilder,
    MarkdownProcessor,
    HTMLGenerator,
    BlogListUpdater,
    utils
};