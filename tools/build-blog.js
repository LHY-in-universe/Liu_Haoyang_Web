#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

/**
 * 自动化博客构建系统
 * 通过添加Markdown文件自动生成HTML文章并更新博客列表
 * 
 * 功能特点：
 * - 支持Markdown前言（Front Matter）解析
 * - 自动生成HTML文章页面
 * - 支持中英文双语
 * - 图片路径处理和优化
 * - 自动更新博客列表页面
 * - 响应式设计支持
 * 
 * @author 刘浩洋
 * @version 2.0.0
 */

/**
 * ============================================
 * 配置常量
 * ============================================
 */
const CONFIG = {
    // 目录配置
    postsDir: './posts',
    articlesDir: './articles', 
    templatesDir: './templates',
    imagesDir: './public/images',
    
    // 博客页面配置
    blogPages: {
        zh: './src/pages/blog.html',
        en: './src/pages/blog-en.html'
    },
    
    // 文件编码
    outputEncoding: 'utf8',
    
    // 支持的图片格式
    imageExtensions: [
        '.jpg', '.jpeg', '.png', '.gif', 
        '.webp', '.svg', '.avif'
    ],
    
    // 图片尺寸配置
    supportedImageSizes: {
        thumbnail: { width: 600, height: 300 },
        cover: { width: 1200, height: 630 },
        content: { maxWidth: 1200 }
    }
};

/**
 * ============================================
 * 工具函数集合
 * ============================================
 */
const utils = {
    /**
     * 安全读取文件内容
     * @param {string} filePath - 文件路径
     * @returns {string|null} 文件内容或null
     */
    readFile: (filePath) => {
        try {
            return fs.readFileSync(filePath, CONFIG.outputEncoding);
        } catch (error) {
            console.error(`读取文件失败: ${filePath}`, error.message);
            return null;
        }
    },

    /**
     * 安全写入文件内容
     * @param {string} filePath - 文件路径
     * @param {string} content - 文件内容
     * @returns {boolean} 是否写入成功
     */
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

    /**
     * 获取目录下的所有Markdown文件
     * @param {string} dir - 目录路径
     * @returns {string[]} Markdown文件路径数组
     */
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

    /**
     * 解析Markdown前言（Front Matter）
     * @param {string} content - Markdown内容
     * @returns {Object} 包含元数据和内容的对象
     */
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
        const lines = frontMatter.split('\n');
        let currentKey = null;
        let currentArray = [];
        let inArray = false;

        lines.forEach(line => {
            const trimmed = line.trim();
            
            if (trimmed.startsWith('- ')) {
                // YAML数组项
                if (currentKey === 'tags' || inArray) {
                    currentArray.push(trimmed.substring(2).trim());
                    inArray = true;
                }
            } else if (trimmed.includes(':')) {
                // 完成上一个数组
                if (inArray && currentKey) {
                    metadata[currentKey] = currentArray;
                    currentArray = [];
                    inArray = false;
                }

                const [key, ...valueParts] = trimmed.split(':');
                const keyName = key.trim();
                const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
                
                if (keyName === 'tags' && value === '') {
                    // tags后面跟着数组
                    currentKey = 'tags';
                    inArray = true;
                } else if (value.startsWith('[') && value.endsWith(']')) {
                    // 内联数组格式
                    metadata[keyName] = value.slice(1, -1).split(',').map(item => item.trim().replace(/^["']|["']$/g, ''));
                } else if (value) {
                    metadata[keyName] = value;
                    currentKey = keyName;
                }
            }
        });

        // 处理最后一个数组
        if (inArray && currentKey) {
            metadata[currentKey] = currentArray;
        }

        return {
            metadata,
            content: markdownContent
        };
    },

    /**
     * 从Markdown内容生成摘要
     * @param {string} content - Markdown内容
     * @param {number} maxLength - 最大长度
     * @returns {string} 文章摘要
     */
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
    },

    // 检查图片是否存在
    checkImageExists: (imagePath) => {
        try {
            return fs.existsSync(imagePath);
        } catch (error) {
            return false;
        }
    },

    // 获取图片信息
    getImageInfo: (imagePath) => {
        if (!utils.checkImageExists(imagePath)) {
            return null;
        }
        
        const stats = fs.statSync(imagePath);
        const ext = path.extname(imagePath).toLowerCase();
        
        return {
            path: imagePath,
            size: stats.size,
            extension: ext,
            isSupported: CONFIG.imageExtensions.includes(ext),
            lastModified: stats.mtime
        };
    },

    // 处理图片路径
    processImagePath: (imagePath, articleSlug) => {
        // 如果是绝对路径或HTTP链接，直接返回
        if (imagePath.startsWith('http') || imagePath.startsWith('//')) {
            return imagePath;
        }

        // 处理相对路径
        if (imagePath.startsWith('../images/')) {
            const fullPath = imagePath.replace('../', './');
            return {
                src: imagePath, // 保持相对路径用于HTML
                fullPath: fullPath, // 用于检查文件是否存在
                exists: utils.checkImageExists(fullPath)
            };
        }

        // 如果只是图片文件名，假设在对应的posts目录下
        if (!imagePath.includes('/')) {
            const postsImagePath = `./images/posts/${articleSlug}/${imagePath}`;
            return {
                src: `../images/posts/${articleSlug}/${imagePath}`,
                fullPath: postsImagePath,
                exists: utils.checkImageExists(postsImagePath)
            };
        }

        return {
            src: imagePath,
            fullPath: imagePath,
            exists: utils.checkImageExists(imagePath)
        };
    },

    // 创建图片目录
    createImageDirectory: (articleSlug) => {
        const imageDir = path.join(CONFIG.imagesDir, 'posts', articleSlug);
        if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, { recursive: true });
            console.log(`📁 创建图片目录: ${imageDir}`);
        }
        return imageDir;
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
            likes: Math.floor(Math.random() * 100) + 5,
            cover: '',
            thumbnail: ''
        };

        // 合并元数据
        const articleData = { ...defaultMetadata, ...metadata };
        
        // 生成摘要和阅读时间
        articleData.excerpt = articleData.excerpt || utils.generateExcerpt(markdownContent);
        articleData.readTime = utils.calculateReadTime(markdownContent);

        // 创建文章对应的图片目录
        utils.createImageDirectory(articleData.slug);

        // 处理Markdown内容中的图片
        const processedContent = this.processImagesInMarkdown(markdownContent, articleData.slug);
        
        // 转换Markdown为HTML
        const htmlContent = marked(processedContent);

        // 检查和处理封面图片
        this.processCoverImages(articleData);

        return {
            ...articleData,
            fileName,
            htmlContent,
            filePath,
            processedContent
        };
    }

    // 处理Markdown中的图片
    processImagesInMarkdown(content, articleSlug) {
        // 匹配Markdown图片语法: ![alt](path "title")
        const imageRegex = /!\[([^\]]*)\]\(([^)]+)(?:\s+"([^"]*)")?\)/g;
        const missingImages = [];
        
        const processedContent = content.replace(imageRegex, (match, alt, imagePath, title) => {
            const imageInfo = utils.processImagePath(imagePath.trim(), articleSlug);
            
            if (typeof imageInfo === 'string') {
                // 外部链接，直接返回
                return match;
            }
            
            // 检查图片是否存在
            if (!imageInfo.exists) {
                missingImages.push({
                    original: imagePath,
                    expected: imageInfo.fullPath,
                    alt: alt
                });
                console.warn(`⚠️  图片不存在: ${imageInfo.fullPath}`);
            }
            
            // 分析alt文本中的特殊标记
            const altLower = alt.toLowerCase();
            let imgClass = 'article-image';
            let figureClass = 'image-figure';
            
            if (altLower.includes('center')) imgClass += ' center-image';
            if (altLower.includes('small')) imgClass += ' small-image';
            if (altLower.includes('large')) imgClass += ' large-image';
            if (altLower.includes('float-left')) imgClass += ' float-left';
            if (altLower.includes('float-right')) imgClass += ' float-right';
            
            // 生成优化的HTML
            const titleAttr = title ? ` title="${title}"` : '';
            const loadingAttr = ' loading="lazy"';
            const classAttr = ` class="${imgClass}"`;
            const decoding = ' decoding="async"';
            const fetchpriority = altLower.includes('priority') ? ' fetchpriority="high"' : '';
            
            // 如果有标题，包装在figure元素中
            if (title) {
                return `<figure class="${figureClass}">
    <img src="${imageInfo.src}" alt="${alt}"${titleAttr}${loadingAttr}${classAttr}${decoding}${fetchpriority}>
    <figcaption>${title}</figcaption>
</figure>`;
            }
            
            return `<img src="${imageInfo.src}" alt="${alt}"${titleAttr}${loadingAttr}${classAttr}${decoding}${fetchpriority}>`;
        });

        // 如果有缺失的图片，提供帮助信息
        if (missingImages.length > 0) {
            console.log(`\n📸 文章 "${articleSlug}" 中发现 ${missingImages.length} 个缺失的图片:`);
            missingImages.forEach(img => {
                console.log(`   • ${img.alt}: ${img.expected}`);
            });
            console.log(`\n💡 提示: 将图片放入对应目录，或使用完整的相对路径引用`);
        }

        return processedContent;
    }

    // 处理封面图片
    processCoverImages(articleData) {
        if (articleData.cover) {
            const coverInfo = utils.processImagePath(articleData.cover, articleData.slug);
            if (typeof coverInfo === 'object' && !coverInfo.exists) {
                console.warn(`⚠️  封面图片不存在: ${coverInfo.fullPath}`);
            }
        }

        if (articleData.thumbnail) {
            const thumbInfo = utils.processImagePath(articleData.thumbnail, articleData.slug);
            if (typeof thumbInfo === 'object' && !thumbInfo.exists) {
                console.warn(`⚠️  缩略图不存在: ${thumbInfo.fullPath}`);
            }
        }
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
                        
                        <style>
                            /* 基础图片样式 */
                            .article-body .article-image {
                                max-width: 100%;
                                height: auto;
                                border-radius: 8px;
                                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                                margin: 1.5rem 0;
                                display: block;
                                transition: transform 0.3s ease, box-shadow 0.3s ease;
                            }
                            
                            .article-body .article-image:hover {
                                transform: translateY(-2px);
                                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                            }
                            
                            /* 尺寸和位置类 */
                            .article-body .center-image {
                                margin: 1.5rem auto;
                            }
                            
                            .article-body .small-image {
                                max-width: 400px;
                                margin: 1rem auto;
                            }
                            
                            .article-body .large-image {
                                width: 100%;
                                max-width: none;
                                margin: 2rem 0;
                            }
                            
                            .article-body .float-left {
                                float: left;
                                margin: 0 1.5rem 1rem 0;
                                max-width: 300px;
                            }
                            
                            .article-body .float-right {
                                float: right;
                                margin: 0 0 1rem 1.5rem;
                                max-width: 300px;
                            }
                            
                            /* Figure和Caption样式 */
                            .article-body .image-figure {
                                margin: 2rem 0;
                                text-align: center;
                                background: var(--bg-white);
                                border-radius: 12px;
                                padding: 1rem;
                                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                            }
                            
                            .article-body figcaption {
                                margin-top: 0.75rem;
                                font-size: 0.875rem;
                                color: var(--text-light);
                                font-style: italic;
                                line-height: 1.4;
                            }
                            
                            /* 响应式设计 */
                            @media (max-width: 768px) {
                                .article-body .article-image {
                                    margin: 1rem 0;
                                }
                                
                                .article-body .float-left,
                                .article-body .float-right {
                                    float: none;
                                    margin: 1rem auto;
                                    max-width: 100%;
                                }
                                
                                .article-body .small-image {
                                    max-width: 100%;
                                }
                                
                                .article-body .image-figure {
                                    margin: 1.5rem 0;
                                    padding: 0.75rem;
                                }
                            }
                            
                            /* 图片加载状态 */
                            .article-body .article-image[loading="lazy"] {
                                opacity: 0;
                                animation: fadeInImage 0.5s ease forwards;
                            }
                            
                            @keyframes fadeInImage {
                                from { opacity: 0; transform: translateY(10px); }
                                to { opacity: 1; transform: translateY(0); }
                            }
                        </style>

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
        const tagsArray = Array.isArray(article.tags) ? article.tags : [];
        const tagsHTML = tagsArray.map(tag => 
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
        const tagsArray = Array.isArray(article.tags) ? article.tags : [];
        const tagsHTML = tagsArray.slice(0, 3).map(tag => 
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