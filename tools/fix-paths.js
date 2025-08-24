#!/usr/bin/env node

/**
 * 路径修复和验证工具
 * 用于检查和修复网站中的所有文件路径问题
 */

const fs = require('fs');
const path = require('path');

class PathFixer {
    constructor(rootDir) {
        this.rootDir = rootDir;
        this.issues = [];
        this.fixed = [];
        
        // 定义正确的路径映射
        this.pathMappings = {
            // 从 src/pages/ 到其他目录的正确路径
            'src/pages/': {
                css: '../css/',
                js: '../js/',
                images: '../../public/images/',
                favicon: '../../public/favicon/',
                documents: '../../public/documents/',
                posts: '../../posts/'
            },
            // 从根目录到其他目录的正确路径
            'root': {
                css: 'src/css/',
                js: 'src/js/',
                images: 'public/images/',
                favicon: 'public/favicon/',
                documents: 'public/documents/',
                posts: 'posts/'
            }
        };
    }

    // 检查文件是否存在
    checkFileExists(filePath) {
        try {
            return fs.existsSync(path.join(this.rootDir, filePath));
        } catch (error) {
            return false;
        }
    }

    // 扫描HTML文件中的路径
    scanHTMLFile(filePath) {
        console.log(`🔍 扫描文件: ${filePath}`);
        
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const issues = [];
            
            // 检查CSS链接
            const cssRegex = /<link[^>]*href=['"]([^'"]*\.css)['"][^>]*>/g;
            let match;
            while ((match = cssRegex.exec(content)) !== null) {
                const cssPath = match[1];
                const fullPath = this.resolveRelativePath(filePath, cssPath);
                
                if (!this.checkFileExists(fullPath)) {
                    issues.push({
                        type: 'css',
                        line: this.getLineNumber(content, match.index),
                        found: cssPath,
                        fullPath: fullPath,
                        exists: false
                    });
                }
            }
            
            // 检查JavaScript文件
            const jsRegex = /<script[^>]*src=['"]([^'"]*\.js)['"][^>]*>/g;
            while ((match = jsRegex.exec(content)) !== null) {
                const jsPath = match[1];
                if (!jsPath.startsWith('http')) {
                    const fullPath = this.resolveRelativePath(filePath, jsPath);
                    
                    if (!this.checkFileExists(fullPath)) {
                        issues.push({
                            type: 'js',
                            line: this.getLineNumber(content, match.index),
                            found: jsPath,
                            fullPath: fullPath,
                            exists: false
                        });
                    }
                }
            }
            
            // 检查图片文件
            const imgRegex = /<img[^>]*src=['"]([^'"]*\.(jpg|jpeg|png|gif|svg|webp))['"][^>]*>/gi;
            while ((match = imgRegex.exec(content)) !== null) {
                const imgPath = match[1];
                if (!imgPath.startsWith('http') && !imgPath.startsWith('data:')) {
                    const fullPath = this.resolveRelativePath(filePath, imgPath);
                    
                    if (!this.checkFileExists(fullPath)) {
                        issues.push({
                            type: 'image',
                            line: this.getLineNumber(content, match.index),
                            found: imgPath,
                            fullPath: fullPath,
                            exists: false
                        });
                    }
                }
            }
            
            // 检查favicon
            const faviconRegex = /<link[^>]*rel=['"](?:icon|apple-touch-icon)['"][^>]*href=['"]([^'"]*)['"][^>]*>/g;
            while ((match = faviconRegex.exec(content)) !== null) {
                const faviconPath = match[1];
                if (!faviconPath.startsWith('http')) {
                    const fullPath = this.resolveRelativePath(filePath, faviconPath);
                    
                    if (!this.checkFileExists(fullPath)) {
                        issues.push({
                            type: 'favicon',
                            line: this.getLineNumber(content, match.index),
                            found: faviconPath,
                            fullPath: fullPath,
                            exists: false
                        });
                    }
                }
            }
            
            // 检查fetch调用中的JSON文件
            const fetchRegex = /fetch\s*\(\s*['"]([^'"]*\.json)['"][\s\S]*?\)/g;
            while ((match = fetchRegex.exec(content)) !== null) {
                const jsonPath = match[1];
                if (!jsonPath.startsWith('http')) {
                    const fullPath = this.resolveRelativePath(filePath, jsonPath);
                    
                    if (!this.checkFileExists(fullPath)) {
                        issues.push({
                            type: 'json',
                            line: this.getLineNumber(content, match.index),
                            found: jsonPath,
                            fullPath: fullPath,
                            exists: false
                        });
                    }
                }
            }
            
            return issues;
            
        } catch (error) {
            console.error(`❌ 读取文件失败: ${filePath}`, error.message);
            return [];
        }
    }

    // 解析相对路径到绝对路径
    resolveRelativePath(basePath, relativePath) {
        const baseDir = path.dirname(path.relative(this.rootDir, basePath));
        return path.normalize(path.join(baseDir, relativePath));
    }

    // 获取行号
    getLineNumber(content, index) {
        return content.substring(0, index).split('\\n').length;
    }

    // 扫描所有HTML文件
    scanAllFiles() {
        console.log('🚀 开始扫描所有HTML文件...');
        
        const htmlFiles = this.findHTMLFiles(this.rootDir);
        const allIssues = [];
        
        htmlFiles.forEach(file => {
            const issues = this.scanHTMLFile(file);
            if (issues.length > 0) {
                allIssues.push({
                    file: path.relative(this.rootDir, file),
                    issues: issues
                });
            }
        });
        
        return allIssues;
    }

    // 查找所有HTML文件
    findHTMLFiles(dir, htmlFiles = []) {
        const files = fs.readdirSync(dir);
        
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
                this.findHTMLFiles(fullPath, htmlFiles);
            } else if (file.endsWith('.html')) {
                htmlFiles.push(fullPath);
            }
        });
        
        return htmlFiles;
    }

    // 生成修复建议
    generateFixSuggestions(issues) {
        console.log('\\n📋 修复建议:');
        
        issues.forEach(fileIssue => {
            console.log(`\\n📄 文件: ${fileIssue.file}`);
            
            fileIssue.issues.forEach(issue => {
                console.log(`  ❌ 第${issue.line}行 [${issue.type}]: ${issue.found}`);
                console.log(`     完整路径: ${issue.fullPath}`);
                
                // 生成修复建议
                const suggestion = this.suggestFix(fileIssue.file, issue);
                if (suggestion) {
                    console.log(`     建议修复: ${suggestion}`);
                }
            });
        });
    }

    // 建议修复方案
    suggestFix(filePath, issue) {
        const fileDir = path.dirname(filePath);
        
        // 根据文件位置和资源类型建议正确路径
        if (fileDir.startsWith('src/pages/')) {
            const mapping = this.pathMappings['src/pages/'];
            
            switch (issue.type) {
                case 'css':
                    return mapping.css + 'styles.css';
                case 'js':
                    if (issue.found.includes('script.js')) {
                        return mapping.js + 'script.js';
                    }
                    break;
                case 'image':
                    if (issue.found.includes('avatar')) {
                        return mapping.images + 'common/avatars/avatar.jpg';
                    } else if (issue.found.includes('zhang-haoyan')) {
                        return mapping.images + 'personal/zhang-haoyan.jpg';
                    }
                    break;
                case 'favicon':
                    if (issue.found.includes('favicon.svg')) {
                        return mapping.favicon + 'favicon.svg';
                    } else if (issue.found.includes('apple-touch-icon')) {
                        return mapping.favicon + 'apple-touch-icon.svg';
                    }
                    break;
                case 'json':
                    if (issue.found.includes('posts.json')) {
                        return mapping.posts + 'posts.json';
                    } else if (issue.found.includes('documents.json')) {
                        return mapping.documents + 'documents.json';
                    }
                    break;
            }
        }
        
        return null;
    }

    // 运行完整检查
    run() {
        console.log('🔧 网站路径检查和修复工具');
        console.log('================================');
        
        const issues = this.scanAllFiles();
        
        if (issues.length === 0) {
            console.log('✅ 所有文件路径都正确！');
            return;
        }
        
        console.log(`\\n⚠️  发现 ${issues.length} 个文件存在路径问题`);
        this.generateFixSuggestions(issues);
        
        console.log('\\n💡 提示:');
        console.log('- 检查文件是否存在于预期位置');
        console.log('- 验证相对路径是否正确');
        console.log('- 确保所有资源文件都已正确部署');
    }
}

// 运行检查
const rootDir = process.argv[2] || __dirname + '/..';
const fixer = new PathFixer(rootDir);
fixer.run();