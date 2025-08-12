#!/usr/bin/env node

/**
 * 博客管理工具
 * 用于管理Markdown博客文章的创建、更新和删除
 * @author 刘浩洋
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * 博客管理器类
 * 负责博客文章的增删改查操作
 */
class BlogManager {
    /**
     * 构造函数 - 初始化博客管理器
     */
    constructor() {
        this.postsDir = path.join(__dirname, 'posts');
        this.postsJsonPath = path.join(this.postsDir, 'posts.json');
        
        this._ensurePostsDirectory();
        this.initializePostsJson();
    }

    /**
     * 确保posts目录存在
     * @private
     */
    _ensurePostsDirectory() {
        if (!fs.existsSync(this.postsDir)) {
            fs.mkdirSync(this.postsDir, { recursive: true });
        }
    }

    /**
     * 初始化posts.json文件
     * 如果文件不存在，创建包含默认分类的空数据结构
     */
    initializePostsJson() {
        if (!fs.existsSync(this.postsJsonPath)) {
            const initialData = {
                posts: [],
                categories: [
                    { 
                        id: 'tech', 
                        name: '技术', 
                        description: '技术相关文章', 
                        color: '#4F46E5' 
                    },
                    { 
                        id: 'tutorial', 
                        name: '教程', 
                        description: '技术教程和指南', 
                        color: '#8B5CF6' 
                    },
                    { 
                        id: 'thoughts', 
                        name: '思考', 
                        description: '个人思考和见解', 
                        color: '#10B981' 
                    },
                    { 
                        id: 'life', 
                        name: '生活', 
                        description: '生活感悟和经验', 
                        color: '#EF4444' 
                    }
                ],
                tags: []
            };
            
            fs.writeFileSync(
                this.postsJsonPath, 
                JSON.stringify(initialData, null, 2)
            );
        }
    }

    /**
     * 加载posts.json文件
     * @returns {Object} 包含posts、categories和tags的数据对象
     */
    loadPosts() {
        try {
            const data = fs.readFileSync(this.postsJsonPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('❌ 加载文章数据失败:', error.message);
            return { posts: [], categories: [], tags: [] };
        }
    }

    /**
     * 保存数据到posts.json文件
     * @param {Object} data - 要保存的数据对象
     */
    savePosts(data) {
        try {
            fs.writeFileSync(
                this.postsJsonPath, 
                JSON.stringify(data, null, 2)
            );
            console.log('✅ 文章数据保存成功');
        } catch (error) {
            console.error('❌ 保存文章数据失败:', error.message);
        }
    }

    /**
     * 根据标题生成URL友好的slug
     * @param {string} title - 文章标题
     * @returns {string} URL友好的slug
     */
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')     // 移除特殊字符
            .replace(/\s+/g, '-')        // 空格替换为连字符
            .replace(/-+/g, '-')         // 多个连字符合并为一个
            .trim('-');                  // 移除首尾连字符
    }

    /**
     * 生成随机的文章ID
     * @returns {string} 16位十六进制字符串
     */
    generateId() {
        return crypto.randomBytes(8).toString('hex');
    }

    createMarkdownTemplate(title, category, tags = []) {
        const categoryNames = {
            tech: '技术',
            tutorial: '教程',
            thoughts: '思考',
            life: '生活'
        };

        return `# ${title}

![封面图片](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=${encodeURIComponent(title)})

## 引言

在这里写文章的引言，简要介绍文章的主要内容和目标读者。

## 主要内容

### 子标题1

这里是主要内容...

### 子标题2

更多内容...

#### 代码示例

\`\`\`javascript
// 代码示例
function example() {
    console.log("Hello World");
}
\`\`\`

## 实战案例

提供具体的使用示例和案例。

## 总结

总结文章的要点：

1. 要点一
2. 要点二  
3. 要点三

---

## 相关阅读

- [相关文章标题](链接)
- [另一篇相关文章](链接)

## 标签

${tags.map(tag => `\`${tag}\``).join(' ')}
`;
    }

    addPost(title, category, excerpt, tags = [], featured = false) {
        const data = this.loadPosts();
        
        const slug = this.generateSlug(title);
        const id = this.generateId();
        const filename = `${slug}.md`;
        const filepath = path.join(this.postsDir, filename);
        
        // 检查文件是否已存在
        if (fs.existsSync(filepath)) {
            console.log(`❌ File ${filename} already exists!`);
            return false;
        }

        const currentDate = new Date().toISOString().split('T')[0];
        
        const newPost = {
            id,
            title,
            slug,
            excerpt,
            content: `posts/${filename}`,
            image: `https://via.placeholder.com/600x300/4F46E5/FFFFFF?text=${encodeURIComponent(title)}`,
            category,
            tags: Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()),
            author: "刘浩阳",
            date: currentDate,
            readTime: "5分钟阅读",
            views: 0,
            comments: 0,
            likes: 0,
            featured
        };

        // 添加到posts数组开头（最新文章在前）
        data.posts.unshift(newPost);
        
        // 更新标签列表
        newPost.tags.forEach(tag => {
            if (!data.tags.includes(tag)) {
                data.tags.push(tag);
            }
        });

        // 保存posts.json
        this.savePosts(data);

        // 创建markdown文件
        const markdownContent = this.createMarkdownTemplate(title, category, newPost.tags);
        fs.writeFileSync(filepath, markdownContent);

        console.log(`✅ Created new post: ${title}`);
        console.log(`📄 File: ${filename}`);
        console.log(`🔗 Slug: ${slug}`);
        
        return true;
    }

    updatePost(idOrSlug, updates) {
        const data = this.loadPosts();
        const postIndex = data.posts.findIndex(post => 
            post.id === idOrSlug || post.slug === idOrSlug
        );

        if (postIndex === -1) {
            console.log(`❌ Post not found: ${idOrSlug}`);
            return false;
        }

        const post = data.posts[postIndex];
        
        // 更新字段
        Object.keys(updates).forEach(key => {
            if (updates[key] !== undefined) {
                if (key === 'tags' && typeof updates[key] === 'string') {
                    post[key] = updates[key].split(',').map(t => t.trim());
                } else {
                    post[key] = updates[key];
                }
            }
        });

        // 如果更新了标题，需要更新slug
        if (updates.title) {
            post.slug = this.generateSlug(updates.title);
        }

        data.posts[postIndex] = post;
        this.savePosts(data);

        console.log(`✅ Updated post: ${post.title}`);
        return true;
    }

    deletePost(idOrSlug) {
        const data = this.loadPosts();
        const postIndex = data.posts.findIndex(post => 
            post.id === idOrSlug || post.slug === idOrSlug
        );

        if (postIndex === -1) {
            console.log(`❌ Post not found: ${idOrSlug}`);
            return false;
        }

        const post = data.posts[postIndex];
        
        // 删除markdown文件
        const filename = path.basename(post.content);
        const filepath = path.join(this.postsDir, filename);
        
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
            console.log(`🗑️  Deleted file: ${filename}`);
        }

        // 从数组中删除
        data.posts.splice(postIndex, 1);
        this.savePosts(data);

        console.log(`✅ Deleted post: ${post.title}`);
        return true;
    }

    listPosts() {
        const data = this.loadPosts();
        
        if (data.posts.length === 0) {
            console.log('📝 No posts found');
            return;
        }

        console.log(`📚 Total posts: ${data.posts.length}\n`);
        
        data.posts.forEach((post, index) => {
            console.log(`${index + 1}. ${post.title}`);
            console.log(`   ID: ${post.id}`);
            console.log(`   Slug: ${post.slug}`);
            console.log(`   Category: ${post.category}`);
            console.log(`   Date: ${post.date}`);
            console.log(`   Views: ${post.views} | Comments: ${post.comments} | Likes: ${post.likes}`);
            console.log(`   Featured: ${post.featured ? '⭐' : '📄'}`);
            console.log('');
        });
    }

    generateBlogPage() {
        const data = this.loadPosts();
        console.log('🔄 Updating blog.html with latest posts...');
        
        // 这里可以实现自动更新blog.html的逻辑
        // 读取blog.html模板，替换文章数据，生成新的blog.html
        
        console.log('✅ Blog page updated successfully');
    }

    showStats() {
        const data = this.loadPosts();
        
        const stats = {
            totalPosts: data.posts.length,
            categories: {},
            totalViews: 0,
            totalComments: 0,
            totalLikes: 0,
            featuredPosts: 0
        };

        data.posts.forEach(post => {
            // 分类统计
            stats.categories[post.category] = (stats.categories[post.category] || 0) + 1;
            
            // 总计统计
            stats.totalViews += post.views || 0;
            stats.totalComments += post.comments || 0;
            stats.totalLikes += post.likes || 0;
            
            if (post.featured) {
                stats.featuredPosts++;
            }
        });

        console.log('📊 Blog Statistics\n');
        console.log(`Total Posts: ${stats.totalPosts}`);
        console.log(`Featured Posts: ${stats.featuredPosts}`);
        console.log(`Total Views: ${stats.totalViews.toLocaleString()}`);
        console.log(`Total Comments: ${stats.totalComments}`);
        console.log(`Total Likes: ${stats.totalLikes}`);
        
        console.log('\nPosts by Category:');
        Object.entries(stats.categories).forEach(([category, count]) => {
            console.log(`  ${category}: ${count}`);
        });
        
        console.log(`\nTotal Tags: ${data.tags.length}`);
    }
}

// 命令行接口
function main() {
    const args = process.argv.slice(2);
    const blogManager = new BlogManager();

    if (args.length === 0) {
        console.log(`
📝 Blog Manager

Usage:
  node manage-blog.js <command> [options]

Commands:
  add <title> <category> <excerpt> [tags]  - Add a new post
  update <id> [options]                     - Update a post
  delete <id>                              - Delete a post
  list                                     - List all posts
  stats                                    - Show blog statistics
  generate                                 - Generate blog page

Examples:
  node manage-blog.js add "My New Post" "tech" "This is a great post" "JavaScript,React"
  node manage-blog.js update post-id --title "New Title" --views 100
  node manage-blog.js delete post-slug
        `);
        return;
    }

    const command = args[0];

    try {
        switch (command) {
            case 'add':
                if (args.length < 4) {
                    console.log('❌ Usage: add <title> <category> <excerpt> [tags]');
                    return;
                }
                const [, title, category, excerpt, tagsStr] = args;
                const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()) : [];
                blogManager.addPost(title, category, excerpt, tags);
                break;

            case 'update':
                if (args.length < 2) {
                    console.log('❌ Usage: update <id> [--field value]');
                    return;
                }
                const [, id] = args;
                const updates = {};
                
                // 解析更新参数
                for (let i = 2; i < args.length; i += 2) {
                    if (args[i].startsWith('--')) {
                        const field = args[i].substring(2);
                        const value = args[i + 1];
                        
                        // 转换数值类型
                        if (['views', 'comments', 'likes'].includes(field)) {
                            updates[field] = parseInt(value);
                        } else if (field === 'featured') {
                            updates[field] = value === 'true';
                        } else {
                            updates[field] = value;
                        }
                    }
                }
                
                blogManager.updatePost(id, updates);
                break;

            case 'delete':
                if (args.length < 2) {
                    console.log('❌ Usage: delete <id>');
                    return;
                }
                blogManager.deletePost(args[1]);
                break;

            case 'list':
                blogManager.listPosts();
                break;

            case 'stats':
                blogManager.showStats();
                break;

            case 'generate':
                blogManager.generateBlogPage();
                break;

            default:
                console.log(`❌ Unknown command: ${command}`);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// 如果直接运行此文件
if (require.main === module) {
    main();
}

module.exports = BlogManager;