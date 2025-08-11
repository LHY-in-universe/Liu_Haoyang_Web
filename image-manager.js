#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 图片管理工具
 * 帮助管理博客系统中的图片资源
 */

// 配置
const CONFIG = {
    imagesDir: './images',
    postsDir: './posts',
    articlesDir: './articles',
    supportedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'],
    imagesSizes: {
        thumbnail: { width: 600, height: 300, suffix: '-thumb' },
        cover: { width: 1200, height: 630, suffix: '-cover' },
        medium: { width: 800, height: 'auto', suffix: '-medium' }
    }
};

class ImageManager {
    constructor() {
        this.initializeDirectories();
    }

    // 初始化目录结构
    initializeDirectories() {
        const dirs = [
            path.join(CONFIG.imagesDir, 'posts'),
            path.join(CONFIG.imagesDir, 'articles', 'covers'),
            path.join(CONFIG.imagesDir, 'articles', 'thumbnails'),
            path.join(CONFIG.imagesDir, 'articles', 'banners'),
            path.join(CONFIG.imagesDir, 'common', 'avatars'),
            path.join(CONFIG.imagesDir, 'common', 'icons'),
            path.join(CONFIG.imagesDir, 'common', 'logos'),
            path.join(CONFIG.imagesDir, 'common', 'backgrounds')
        ];

        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`📁 创建目录: ${dir}`);
            }
        });
    }

    // 扫描所有图片
    scanAllImages() {
        const images = {
            posts: {},
            articles: { covers: [], thumbnails: [], banners: [] },
            common: { avatars: [], icons: [], logos: [], backgrounds: [] },
            orphaned: [] // 孤儿图片（没有被引用的图片）
        };

        try {
            // 扫描posts图片
            const postsDir = path.join(CONFIG.imagesDir, 'posts');
            if (fs.existsSync(postsDir)) {
                const postDirs = fs.readdirSync(postsDir, { withFileTypes: true })
                    .filter(dirent => dirent.isDirectory())
                    .map(dirent => dirent.name);

                postDirs.forEach(dirName => {
                    const dirPath = path.join(postsDir, dirName);
                    images.posts[dirName] = this.getImagesInDirectory(dirPath);
                });
            }

            // 扫描文章相关图片
            ['covers', 'thumbnails', 'banners'].forEach(type => {
                const dirPath = path.join(CONFIG.imagesDir, 'articles', type);
                if (fs.existsSync(dirPath)) {
                    images.articles[type] = this.getImagesInDirectory(dirPath);
                }
            });

            // 扫描通用图片
            ['avatars', 'icons', 'logos', 'backgrounds'].forEach(type => {
                const dirPath = path.join(CONFIG.imagesDir, 'common', type);
                if (fs.existsSync(dirPath)) {
                    images.common[type] = this.getImagesInDirectory(dirPath);
                }
            });

        } catch (error) {
            console.error('扫描图片时出错:', error.message);
        }

        return images;
    }

    // 获取目录中的图片文件
    getImagesInDirectory(dirPath) {
        const images = [];
        try {
            const files = fs.readdirSync(dirPath);
            files.forEach(file => {
                const filePath = path.join(dirPath, file);
                const ext = path.extname(file).toLowerCase();
                
                if (CONFIG.supportedExtensions.includes(ext)) {
                    const stats = fs.statSync(filePath);
                    images.push({
                        name: file,
                        path: filePath,
                        size: stats.size,
                        extension: ext,
                        lastModified: stats.mtime,
                        sizeFormatted: this.formatFileSize(stats.size)
                    });
                }
            });
        } catch (error) {
            console.error(`读取目录失败: ${dirPath}`, error.message);
        }
        
        return images.sort((a, b) => b.lastModified - a.lastModified);
    }

    // 格式化文件大小
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 检查图片使用情况
    checkImageUsage() {
        console.log('🔍 检查图片使用情况...\n');
        
        const allImages = this.scanAllImages();
        const markdownFiles = this.getMarkdownFiles();
        const usedImages = new Set();
        const unusedImages = [];

        // 分析Markdown文件中引用的图片
        markdownFiles.forEach(filePath => {
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const imageMatches = content.match(/!\[.*?\]\(([^)]+)\)/g);
                
                if (imageMatches) {
                    imageMatches.forEach(match => {
                        const pathMatch = match.match(/!\[.*?\]\(([^)]+)\)/);
                        if (pathMatch) {
                            const imagePath = pathMatch[1].trim();
                            // 转换为实际文件路径
                            let realPath = imagePath;
                            if (imagePath.startsWith('../images/')) {
                                realPath = imagePath.replace('../images/', './images/');
                            }
                            usedImages.add(realPath);
                        }
                    });
                }
            } catch (error) {
                console.warn(`读取Markdown文件失败: ${filePath}`);
            }
        });

        // 检查未使用的图片
        const allImagePaths = [];
        
        // 收集所有图片路径
        Object.values(allImages.posts).forEach(images => {
            images.forEach(img => {
                allImagePaths.push(img.path);
            });
        });

        Object.values(allImages.articles).forEach(images => {
            images.forEach(img => {
                allImagePaths.push(img.path);
            });
        });

        Object.values(allImages.common).forEach(images => {
            images.forEach(img => {
                allImagePaths.push(img.path);
            });
        });

        // 找出未使用的图片
        allImagePaths.forEach(imagePath => {
            if (!usedImages.has(imagePath)) {
                unusedImages.push(imagePath);
            }
        });

        return {
            total: allImagePaths.length,
            used: usedImages.size,
            unused: unusedImages.length,
            unusedPaths: unusedImages,
            usedPaths: Array.from(usedImages)
        };
    }

    // 获取所有Markdown文件
    getMarkdownFiles() {
        const files = [];
        try {
            if (fs.existsSync(CONFIG.postsDir)) {
                const markdownFiles = fs.readdirSync(CONFIG.postsDir)
                    .filter(file => file.endsWith('.md'))
                    .map(file => path.join(CONFIG.postsDir, file));
                files.push(...markdownFiles);
            }
        } catch (error) {
            console.error('获取Markdown文件失败:', error.message);
        }
        return files;
    }

    // 创建文章图片目录
    createPostImageDirectory(articleSlug) {
        const dirPath = path.join(CONFIG.imagesDir, 'posts', articleSlug);
        
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`✅ 创建文章图片目录: ${dirPath}`);
            
            // 创建README文件
            const readmeContent = `# ${articleSlug} 文章图片

这个目录存放文章 "${articleSlug}" 的相关图片。

## 使用方法

在Markdown中引用图片：
\`\`\`markdown
![图片描述](../images/posts/${articleSlug}/your-image.jpg)
\`\`\`

## 图片规范

- 格式: JPG, PNG, WebP, SVG
- 建议大小: < 1MB
- 建议宽度: ≤ 1200px
- 使用描述性文件名

## 当前图片列表

(运行 \`npm run image-scan\` 查看详细列表)
`;
            fs.writeFileSync(path.join(dirPath, 'README.md'), readmeContent);
        } else {
            console.log(`📁 目录已存在: ${dirPath}`);
        }

        return dirPath;
    }

    // 移动图片到正确位置
    moveImageToPost(imagePath, articleSlug, newName = null) {
        const targetDir = this.createPostImageDirectory(articleSlug);
        const fileName = newName || path.basename(imagePath);
        const targetPath = path.join(targetDir, fileName);

        try {
            if (!fs.existsSync(imagePath)) {
                throw new Error(`源文件不存在: ${imagePath}`);
            }

            if (fs.existsSync(targetPath)) {
                throw new Error(`目标文件已存在: ${targetPath}`);
            }

            fs.copyFileSync(imagePath, targetPath);
            console.log(`✅ 图片已移动: ${imagePath} → ${targetPath}`);
            console.log(`📝 在Markdown中使用: ![描述](../images/posts/${articleSlug}/${fileName})`);
            
            return {
                success: true,
                targetPath,
                markdownRef: `../images/posts/${articleSlug}/${fileName}`
            };
        } catch (error) {
            console.error(`❌ 移动图片失败: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    // 清理未使用的图片
    cleanupUnusedImages(confirm = false) {
        const usage = this.checkImageUsage();
        
        if (usage.unused === 0) {
            console.log('✅ 没有发现未使用的图片');
            return;
        }

        console.log(`🗑️  发现 ${usage.unused} 个未使用的图片:`);
        usage.unusedPaths.forEach((path, index) => {
            console.log(`   ${index + 1}. ${path}`);
        });

        if (!confirm) {
            console.log('\n⚠️  预览模式：如要实际删除，请运行:');
            console.log('   npm run image-cleanup -- --confirm');
            return;
        }

        // 创建备份目录
        const backupDir = path.join(CONFIG.imagesDir, '.backup', new Date().toISOString().split('T')[0]);
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        let deletedCount = 0;
        usage.unusedPaths.forEach(imagePath => {
            try {
                const fileName = path.basename(imagePath);
                const backupPath = path.join(backupDir, fileName);
                
                // 备份后删除
                fs.copyFileSync(imagePath, backupPath);
                fs.unlinkSync(imagePath);
                
                deletedCount++;
                console.log(`🗑️  已删除: ${imagePath} (已备份到 ${backupPath})`);
            } catch (error) {
                console.error(`❌ 删除失败: ${imagePath} - ${error.message}`);
            }
        });

        console.log(`\n✅ 已删除 ${deletedCount} 个未使用的图片`);
        console.log(`📦 备份位置: ${backupDir}`);
    }

    // 生成图片使用报告
    generateReport() {
        console.log('📊 生成图片使用报告...\n');
        
        const allImages = this.scanAllImages();
        const usage = this.checkImageUsage();
        
        console.log('='.repeat(60));
        console.log('📸 图片资源报告');
        console.log('='.repeat(60));
        
        // 总体统计
        console.log('\n📈 总体统计:');
        console.log(`   总图片数: ${usage.total}`);
        console.log(`   已使用: ${usage.used} (${((usage.used / usage.total) * 100).toFixed(1)}%)`);
        console.log(`   未使用: ${usage.unused} (${((usage.unused / usage.total) * 100).toFixed(1)}%)`);
        
        // 按目录统计
        console.log('\n📁 按目录统计:');
        
        let totalSize = 0;
        
        // Posts图片统计
        const postsCount = Object.keys(allImages.posts).length;
        const postsImagesCount = Object.values(allImages.posts).reduce((sum, images) => sum + images.length, 0);
        console.log(`   posts/: ${postsImagesCount} 张图片 (${postsCount} 个目录)`);
        
        Object.values(allImages.posts).forEach(images => {
            images.forEach(img => totalSize += img.size);
        });
        
        // Articles图片统计
        Object.entries(allImages.articles).forEach(([type, images]) => {
            if (images.length > 0) {
                console.log(`   articles/${type}/: ${images.length} 张图片`);
                images.forEach(img => totalSize += img.size);
            }
        });
        
        // Common图片统计
        Object.entries(allImages.common).forEach(([type, images]) => {
            if (images.length > 0) {
                console.log(`   common/${type}/: ${images.length} 张图片`);
                images.forEach(img => totalSize += img.size);
            }
        });
        
        console.log(`\n💾 总存储空间: ${this.formatFileSize(totalSize)}`);
        
        // 最大的图片文件
        console.log('\n📏 最大的图片文件:');
        const allImagesList = [];
        Object.values(allImages.posts).forEach(images => allImagesList.push(...images));
        Object.values(allImages.articles).forEach(images => allImagesList.push(...images));
        Object.values(allImages.common).forEach(images => allImagesList.push(...images));
        
        const largestImages = allImagesList
            .sort((a, b) => b.size - a.size)
            .slice(0, 5);
            
        largestImages.forEach((img, index) => {
            console.log(`   ${index + 1}. ${img.name} - ${img.sizeFormatted}`);
        });
        
        console.log('\n='.repeat(60));
        
        return {
            summary: {
                total: usage.total,
                used: usage.used,
                unused: usage.unused,
                totalSize,
                totalSizeFormatted: this.formatFileSize(totalSize)
            },
            details: allImages,
            usage
        };
    }

    // 图片优化功能
    async optimizeImages(articleSlug = null, quality = 80) {
        let sharp;
        try {
            sharp = require('sharp');
        } catch (error) {
            console.log('⚠️  Sharp未安装，将跳过图片优化');
            console.log('   安装命令: npm install sharp');
            return;
        }

        console.log('🔧 开始图片优化...\n');
        
        const optimizeDirectory = async (dirPath, targetDir = null) => {
            if (!fs.existsSync(dirPath)) return;
            
            const files = fs.readdirSync(dirPath);
            let optimizedCount = 0;
            let savedSpace = 0;
            
            for (const file of files) {
                const filePath = path.join(dirPath, file);
                const ext = path.extname(file).toLowerCase();
                
                if (CONFIG.supportedExtensions.includes(ext) && ext !== '.svg') {
                    try {
                        const originalStats = fs.statSync(filePath);
                        const originalSize = originalStats.size;
                        
                        // 创建优化后的文件路径
                        const optimizedDir = targetDir || dirPath;
                        const optimizedPath = path.join(optimizedDir, file);
                        
                        // 如果目标目录不存在，创建它
                        if (targetDir && !fs.existsSync(targetDir)) {
                            fs.mkdirSync(targetDir, { recursive: true });
                        }
                        
                        // 优化图片
                        let sharpInstance = sharp(filePath);
                        
                        // 获取图片元数据
                        const metadata = await sharpInstance.metadata();
                        
                        // 根据文件类型进行优化
                        if (ext === '.jpg' || ext === '.jpeg') {
                            sharpInstance = sharpInstance.jpeg({ 
                                quality: quality,
                                progressive: true,
                                mozjpeg: true
                            });
                        } else if (ext === '.png') {
                            sharpInstance = sharpInstance.png({ 
                                quality: quality,
                                progressive: true,
                                compressionLevel: 9
                            });
                        } else if (ext === '.webp') {
                            sharpInstance = sharpInstance.webp({ 
                                quality: quality 
                            });
                        } else if (ext === '.avif') {
                            sharpInstance = sharpInstance.avif({ 
                                quality: quality 
                            });
                        }
                        
                        // 如果图片过大，进行缩放
                        if (metadata.width > 1920) {
                            sharpInstance = sharpInstance.resize(1920, null, {
                                withoutEnlargement: true
                            });
                        }
                        
                        // 保存优化后的图片
                        await sharpInstance.toFile(optimizedPath + '.temp');
                        
                        // 检查优化效果
                        const optimizedStats = fs.statSync(optimizedPath + '.temp');
                        const optimizedSize = optimizedStats.size;
                        
                        if (optimizedSize < originalSize) {
                            // 优化有效，替换原文件
                            fs.renameSync(optimizedPath + '.temp', optimizedPath);
                            const saved = originalSize - optimizedSize;
                            savedSpace += saved;
                            optimizedCount++;
                            
                            const savedPercent = ((saved / originalSize) * 100).toFixed(1);
                            console.log(`✅ ${file}: ${this.formatFileSize(originalSize)} → ${this.formatFileSize(optimizedSize)} (节省 ${savedPercent}%)`);
                        } else {
                            // 优化无效，删除临时文件
                            fs.unlinkSync(optimizedPath + '.temp');
                            console.log(`ℹ️  ${file}: 已是最佳大小，跳过优化`);
                        }
                        
                    } catch (error) {
                        console.error(`❌ 优化失败 ${file}:`, error.message);
                        // 清理可能的临时文件
                        const tempPath = path.join(targetDir || dirPath, file + '.temp');
                        if (fs.existsSync(tempPath)) {
                            fs.unlinkSync(tempPath);
                        }
                    }
                }
            }
            
            return { optimizedCount, savedSpace };
        };
        
        let totalOptimized = 0;
        let totalSaved = 0;
        
        if (articleSlug) {
            // 优化特定文章的图片
            const articleDir = path.join(CONFIG.imagesDir, 'posts', articleSlug);
            console.log(`📂 优化文章图片: ${articleSlug}`);
            const result = await optimizeDirectory(articleDir);
            totalOptimized += result.optimizedCount;
            totalSaved += result.savedSpace;
        } else {
            // 优化所有图片
            console.log('📂 优化所有图片...');
            
            // 优化posts图片
            const postsDir = path.join(CONFIG.imagesDir, 'posts');
            if (fs.existsSync(postsDir)) {
                const postDirs = fs.readdirSync(postsDir, { withFileTypes: true })
                    .filter(dirent => dirent.isDirectory())
                    .map(dirent => dirent.name);
                    
                for (const dirName of postDirs) {
                    console.log(`  📁 ${dirName}/`);
                    const result = await optimizeDirectory(path.join(postsDir, dirName));
                    totalOptimized += result.optimizedCount;
                    totalSaved += result.savedSpace;
                }
            }
            
            // 优化articles图片
            ['covers', 'thumbnails', 'banners'].forEach(async (type) => {
                const dirPath = path.join(CONFIG.imagesDir, 'articles', type);
                if (fs.existsSync(dirPath)) {
                    console.log(`  📁 articles/${type}/`);
                    const result = await optimizeDirectory(dirPath);
                    totalOptimized += result.optimizedCount;
                    totalSaved += result.savedSpace;
                }
            });
            
            // 优化common图片
            ['avatars', 'icons', 'logos', 'backgrounds'].forEach(async (type) => {
                const dirPath = path.join(CONFIG.imagesDir, 'common', type);
                if (fs.existsSync(dirPath)) {
                    console.log(`  📁 common/${type}/`);
                    const result = await optimizeDirectory(dirPath);
                    totalOptimized += result.optimizedCount;
                    totalSaved += result.savedSpace;
                }
            });
        }
        
        console.log('\n='.repeat(60));
        console.log('🎉 图片优化完成!');
        console.log(`✅ 优化了 ${totalOptimized} 张图片`);
        console.log(`💾 节省空间: ${this.formatFileSize(totalSaved)}`);
        console.log('='.repeat(60));
    }
}

// 命令行接口
class ImageCLI {
    constructor() {
        this.manager = new ImageManager();
    }

    run() {
        const args = process.argv.slice(2);
        const command = args[0];
        
        switch (command) {
            case 'scan':
                this.manager.generateReport();
                break;
                
            case 'check':
                const usage = this.manager.checkImageUsage();
                console.log(`📊 图片使用情况: ${usage.used}/${usage.total} 已使用`);
                if (usage.unused > 0) {
                    console.log(`🗑️  ${usage.unused} 个图片未被使用`);
                }
                break;
                
            case 'cleanup':
                const confirm = args.includes('--confirm');
                this.manager.cleanupUnusedImages(confirm);
                break;
                
            case 'create':
                const articleSlug = args[1];
                if (!articleSlug) {
                    console.error('❌ 请提供文章slug');
                    console.log('用法: npm run image-create <article-slug>');
                    return;
                }
                this.manager.createPostImageDirectory(articleSlug);
                break;
                
            case 'move':
                const [, sourcePath, targetSlug, newName] = args;
                if (!sourcePath || !targetSlug) {
                    console.error('❌ 参数不完整');
                    console.log('用法: npm run image-move <source-path> <article-slug> [new-name]');
                    return;
                }
                this.manager.moveImageToPost(sourcePath, targetSlug, newName);
                break;
                
            case 'optimize':
                const optimizeSlug = args[1];
                const quality = parseInt(args[2]) || 80;
                this.manager.optimizeImages(optimizeSlug, quality);
                break;
                
            case 'help':
            default:
                this.showHelp();
        }
    }

    showHelp() {
        console.log(`
🖼️  图片管理工具

用法:
  npm run image-scan                           # 生成图片使用报告
  npm run image-check                          # 检查图片使用情况
  npm run image-cleanup [--confirm]           # 清理未使用图片
  npm run image-create <article-slug>         # 创建文章图片目录
  npm run image-move <path> <slug> [name]     # 移动图片到文章目录
  npm run image-optimize [slug] [quality]     # 优化图片 (需安装sharp)

示例:
  npm run image-scan
  npm run image-create react-hooks-guide
  npm run image-move ./my-image.jpg react-hooks-guide hero-image.jpg
  npm run image-cleanup --confirm
  npm run image-optimize                       # 优化所有图片 (质量80%)
  npm run image-optimize react-guide           # 优化特定文章图片
  npm run image-optimize react-guide 90       # 优化特定文章图片 (质量90%)

图片功能:
  📊 扫描和报告图片使用情况
  🗑️  自动清理未使用的图片
  📁 自动创建和管理文章图片目录
  🔧 图片压缩和优化 (WebP, JPEG, PNG)
  📏 自动调整过大图片尺寸

目录结构:
  images/
  ├── posts/          # 文章图片 (按文章分组)
  ├── articles/       # 封面和缩略图
  └── common/         # 通用图片资源

在Markdown中使用图片:
  ![图片描述](../images/posts/article-slug/image.jpg "可选标题")
  ![居中图片 center](../images/posts/article/hero.jpg)
  ![小图片 small](../images/posts/article/icon.png)
  ![大图片 large](../images/posts/article/banner.jpg)
  ![左浮动 float-left](../images/posts/article/side.jpg)
`);
    }
}

// 如果作为脚本直接运行
if (require.main === module) {
    const cli = new ImageCLI();
    cli.run();
}

module.exports = { ImageManager, ImageCLI };