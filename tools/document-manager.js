#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 文档管理工具
 * 帮助添加、更新和管理网站中的文档资源
 */

// 配置
const CONFIG = {
    documentsDir: './public/documents',
    documentsJson: './public/documents/documents.json',
    supportedFormats: ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.md', '.txt'],
    categories: {
        'resume': {
            title: '简历文档',
            titleEn: 'Resume Documents',
            description: '个人简历和相关文档',
            descriptionEn: 'Personal resume and related documents',
            icon: '📄'
        },
        'presentations': {
            title: '演讲稿',
            titleEn: 'Presentations',
            description: '学术演讲和技术分享',
            descriptionEn: 'Academic presentations and technical talks',
            icon: '📊'
        },
        'academic': {
            title: '学术论文',
            titleEn: 'Academic Papers',
            description: '研究论文和学术文章',
            descriptionEn: 'Research papers and academic articles',
            icon: '🎓'
        },
        'blog': {
            title: '博客文章',
            titleEn: 'Blog Articles',
            description: '技术博客和个人思考',
            descriptionEn: 'Technical blogs and personal thoughts',
            icon: '📝'
        }
    }
};

class DocumentManager {
    constructor() {
        this.documents = [];
        this.categories = CONFIG.categories;
        this.init();
    }
    
    init() {
        this.ensureDirectories();
        this.loadDocuments();
    }
    
    ensureDirectories() {
        // 确保所有必要的目录存在
        const dirs = [
            CONFIG.documentsDir,
            path.join(CONFIG.documentsDir, 'resume'),
            path.join(CONFIG.documentsDir, 'presentations'),
            path.join(CONFIG.documentsDir, 'presentations/PHYS'),
            path.join(CONFIG.documentsDir, 'academic'),
            path.join(CONFIG.documentsDir, 'academic/PHYS'),
            path.join(CONFIG.documentsDir, 'blog')
        ];
        
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`✅ 创建目录: ${dir}`);
            }
        });
    }
    
    loadDocuments() {
        if (fs.existsSync(CONFIG.documentsJson)) {
            try {
                const data = fs.readFileSync(CONFIG.documentsJson, 'utf8');
                const parsed = JSON.parse(data);
                this.documents = parsed.documents || [];
                this.categories = { ...this.categories, ...parsed.categories };
            } catch (error) {
                console.error('❌ 加载文档配置失败:', error);
                this.documents = [];
            }
        }
    }
    
    saveDocuments() {
        const data = {
            categories: this.categories,
            documents: this.documents
        };
        
        try {
            fs.writeFileSync(CONFIG.documentsJson, JSON.stringify(data, null, 2), 'utf8');
            console.log('✅ 文档配置已保存');
        } catch (error) {
            console.error('❌ 保存文档配置失败:', error);
        }
    }
    
    addDocument(filePath, options = {}) {
        if (!fs.existsSync(filePath)) {
            console.error(`❌ 文件不存在: ${filePath}`);
            return false;
        }
        
        const fileName = path.basename(filePath);
        const ext = path.extname(fileName).toLowerCase();
        
        if (!CONFIG.supportedFormats.includes(ext)) {
            console.error(`❌ 不支持的文件格式: ${ext}`);
            console.log(`支持的格式: ${CONFIG.supportedFormats.join(', ')}`);
            return false;
        }
        
        // 生成文档ID
        const id = options.id || this.generateId(fileName);
        
        // 检查是否已存在
        const existing = this.documents.find(doc => doc.id === id);
        if (existing && !options.overwrite) {
            console.error(`❌ 文档ID已存在: ${id}，使用 --overwrite 强制覆盖`);
            return false;
        }
        
        // 确定分类
        const category = options.category || this.guessCategory(fileName);
        if (!this.categories[category]) {
            console.error(`❌ 未知分类: ${category}`);
            console.log(`可用分类: ${Object.keys(this.categories).join(', ')}`);
            return false;
        }
        
        // 复制文件到目标位置
        const targetDir = path.join(CONFIG.documentsDir, category);
        const targetPath = path.join(targetDir, fileName);
        
        try {
            fs.copyFileSync(filePath, targetPath);
            console.log(`✅ 文件已复制到: ${targetPath}`);
        } catch (error) {
            console.error(`❌ 复制文件失败:`, error);
            return false;
        }
        
        // 获取文件信息
        const stats = fs.statSync(targetPath);
        const fileSize = this.formatFileSize(stats.size);
        
        // 创建文档记录
        const document = {
            id,
            category,
            title: options.title || path.parse(fileName).name,
            titleEn: options.titleEn || options.title || path.parse(fileName).name,
            filename: fileName,
            path: `public/documents/${category}/${fileName}`,
            description: options.description || '暂无描述',
            descriptionEn: options.descriptionEn || options.description || 'No description available',
            author: options.author || '刘浩洋',
            authorEn: options.authorEn || options.author || 'Liu Haoyang',
            date: options.date || new Date().toISOString().split('T')[0],
            tags: options.tags || this.generateTags(fileName, category),
            tagsEn: options.tagsEn || options.tags || this.generateTagsEn(fileName, category),
            language: options.language || 'zh',
            fileSize,
            downloadUrl: `public/documents/${category}/${fileName}`,
            previewUrl: options.previewUrl || null,
            featured: options.featured || false
        };
        
        // 添加或更新文档
        if (existing) {
            const index = this.documents.findIndex(doc => doc.id === id);
            this.documents[index] = document;
            console.log(`✅ 文档已更新: ${document.title}`);
        } else {
            this.documents.push(document);
            console.log(`✅ 文档已添加: ${document.title}`);
        }
        
        this.saveDocuments();
        return true;
    }
    
    generateId(fileName) {
        const baseName = path.parse(fileName).name;
        return baseName.toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    
    guessCategory(fileName) {
        const name = fileName.toLowerCase();
        
        if (name.includes('resume') || name.includes('cv') || name.includes('简历')) {
            return 'resume';
        } else if (name.includes('presentation') || name.includes('slides') || name.includes('演讲')) {
            return 'presentations';
        } else if (name.includes('paper') || name.includes('research') || name.includes('论文')) {
            return 'academic';
        } else if (name.includes('blog') || name.includes('article') || name.includes('博客')) {
            return 'blog';
        }
        
        return 'academic'; // 默认分类
    }
    
    generateTags(fileName, category) {
        const baseTags = {
            'resume': ['简历', '个人'],
            'presentations': ['演讲', '幻灯片'],
            'academic': ['论文', '学术'],
            'blog': ['博客', '文章']
        };
        
        const tags = [...(baseTags[category] || [])];
        
        const name = fileName.toLowerCase();
        if (name.includes('phys')) tags.push('物理');
        if (name.includes('tech')) tags.push('技术');
        if (name.includes('research')) tags.push('研究');
        
        return tags;
    }
    
    generateTagsEn(fileName, category) {
        const baseTags = {
            'resume': ['resume', 'personal'],
            'presentations': ['presentation', 'slides'],
            'academic': ['paper', 'academic'],
            'blog': ['blog', 'article']
        };
        
        const tags = [...(baseTags[category] || [])];
        
        const name = fileName.toLowerCase();
        if (name.includes('phys')) tags.push('physics');
        if (name.includes('tech')) tags.push('technology');
        if (name.includes('research')) tags.push('research');
        
        return tags;
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    listDocuments(category = null) {
        let docs = this.documents;
        
        if (category) {
            docs = docs.filter(doc => doc.category === category);
        }
        
        if (docs.length === 0) {
            console.log('📄 暂无文档');
            return;
        }
        
        console.log(`\n📄 文档列表 (${docs.length} 个文档):\n`);
        
        docs.forEach((doc, index) => {
            console.log(`${index + 1}. ${doc.title}`);
            console.log(`   ID: ${doc.id}`);
            console.log(`   分类: ${this.categories[doc.category]?.title || doc.category}`);
            console.log(`   文件: ${doc.filename}`);
            console.log(`   大小: ${doc.fileSize}`);
            console.log(`   日期: ${doc.date}`);
            console.log(`   标签: ${doc.tags.join(', ')}`);
            console.log('');
        });
    }
    
    removeDocument(id) {
        const index = this.documents.findIndex(doc => doc.id === id);
        
        if (index === -1) {
            console.error(`❌ 未找到文档: ${id}`);
            return false;
        }
        
        const doc = this.documents[index];
        const filePath = path.join('./', doc.path);
        
        // 删除文件
        if (fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
                console.log(`✅ 已删除文件: ${filePath}`);
            } catch (error) {
                console.error(`❌ 删除文件失败:`, error);
            }
        }
        
        // 从记录中移除
        this.documents.splice(index, 1);
        this.saveDocuments();
        
        console.log(`✅ 已移除文档: ${doc.title}`);
        return true;
    }
    
    showHelp() {
        console.log(`
📄 文档管理工具 - 使用说明

命令格式:
  node tools/document-manager.js <command> [options]

可用命令:
  add <file>           添加文档
  list [category]      列出文档
  remove <id>          删除文档
  help                 显示帮助

添加文档选项:
  --title <title>      文档标题
  --title-en <title>   英文标题
  --description <desc> 文档描述
  --category <cat>     文档分类 (${Object.keys(this.categories).join(', ')})
  --tags <tags>        标签 (逗号分隔)
  --author <author>    作者
  --date <date>        日期 (YYYY-MM-DD)
  --overwrite          覆盖已存在的文档

示例:
  # 添加简历
  node tools/document-manager.js add ./main.pdf --category resume --title "个人简历"
  
  # 添加物理论文
  node tools/document-manager.js add ./paper.pdf --category academic --tags "物理,DSMC,论文"
  
  # 添加演讲稿
  node tools/document-manager.js add ./slides.pptx --category presentations --title "PHYS研究报告"
  
  # 列出所有文档
  node tools/document-manager.js list
  
  # 列出特定分类
  node tools/document-manager.js list academic
  
  # 删除文档
  node tools/document-manager.js remove document-id

文档分类:
${Object.entries(this.categories).map(([key, cat]) => `  ${key.padEnd(12)} - ${cat.title}`).join('\n')}
        `);
    }
}

// 主程序
function main() {
    const args = process.argv.slice(2);
    const manager = new DocumentManager();
    
    if (args.length === 0 || args[0] === 'help') {
        manager.showHelp();
        return;
    }
    
    const command = args[0];
    
    switch (command) {
        case 'add': {
            if (args.length < 2) {
                console.error('❌ 请指定要添加的文件');
                return;
            }
            
            const filePath = args[1];
            const options = {};
            
            // 解析选项
            for (let i = 2; i < args.length; i += 2) {
                const option = args[i];
                const value = args[i + 1];
                
                switch (option) {
                    case '--title':
                        options.title = value;
                        break;
                    case '--title-en':
                        options.titleEn = value;
                        break;
                    case '--description':
                        options.description = value;
                        break;
                    case '--category':
                        options.category = value;
                        break;
                    case '--tags':
                        options.tags = value.split(',').map(tag => tag.trim());
                        break;
                    case '--author':
                        options.author = value;
                        break;
                    case '--date':
                        options.date = value;
                        break;
                    case '--overwrite':
                        options.overwrite = true;
                        i--; // 这个选项没有值
                        break;
                }
            }
            
            manager.addDocument(filePath, options);
            break;
        }
        
        case 'list': {
            const category = args[1] || null;
            manager.listDocuments(category);
            break;
        }
        
        case 'remove': {
            if (args.length < 2) {
                console.error('❌ 请指定要删除的文档ID');
                return;
            }
            
            const id = args[1];
            manager.removeDocument(id);
            break;
        }
        
        default:
            console.error(`❌ 未知命令: ${command}`);
            manager.showHelp();
    }
}

if (require.main === module) {
    main();
}

module.exports = DocumentManager;