#!/usr/bin/env node

/**
 * 自动生成博客配置脚本
 * 扫描 public/blog-posts/ 目录下的 Markdown 文件
 * 读取 frontmatter 元数据并生成 blog-posts.ts 配置
 */

const fs = require('fs')
const path = require('path')

// 配置
const BLOG_DIR = path.join(__dirname, '../public/blog-posts')
const OUTPUT_FILE = path.join(__dirname, '../src/config/blog-posts.ts')
const BACKUP_FILE = path.join(__dirname, '../src/config/blog-posts.ts.backup')

/**
 * 解析 Markdown frontmatter
 * @param {string} content - Markdown 文件内容
 * @returns {object} - 解析后的元数据
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return null
  }

  const frontmatterText = match[1]
  const metadata = {}

  // 解析 YAML 格式的 frontmatter
  const lines = frontmatterText.split('\n')
  let currentKey = null
  let arrayMode = false

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) continue

    // 处理数组项
    if (trimmed.startsWith('-') && arrayMode) {
      const value = trimmed.substring(1).trim().replace(/^['"]|['"]$/g, '')
      metadata[currentKey].push(value)
      continue
    }

    // 处理键值对
    const colonIndex = trimmed.indexOf(':')
    if (colonIndex > 0) {
      const key = trimmed.substring(0, colonIndex).trim()
      let value = trimmed.substring(colonIndex + 1).trim()

      // 移除引号
      value = value.replace(/^['"]|['"]$/g, '')

      // 检查是否是数组
      if (value === '' || value === '[]') {
        metadata[key] = []
        currentKey = key
        arrayMode = true
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // 处理内联数组 [item1, item2]
        const items = value
          .substring(1, value.length - 1)
          .split(',')
          .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
        metadata[key] = items
        arrayMode = false
      } else {
        metadata[key] = value
        arrayMode = false
      }

      currentKey = key
    }
  }

  return metadata
}

/**
 * 从文件名生成 ID
 * @param {string} filename - 文件名
 * @returns {string} - 生成的 ID
 */
function generateId(filename) {
  return filename.replace(/\.md$/, '').replace(/[^a-z0-9-]/gi, '-').toLowerCase()
}

/**
 * 估算阅读时间
 * @param {string} content - Markdown 内容
 * @returns {number} - 预估阅读时间（分钟）
 */
function estimateReadTime(content) {
  // 移除 frontmatter
  const contentWithoutFrontmatter = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')

  // 统计字数（中文按字符，英文按单词）
  const chineseChars = (contentWithoutFrontmatter.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishWords = contentWithoutFrontmatter
    .replace(/[\u4e00-\u9fa5]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 0).length

  // 中文：250 字/分钟，英文：200 词/分钟
  const readTime = Math.ceil(chineseChars / 250 + englishWords / 200)
  return Math.max(1, readTime) // 至少 1 分钟
}

/**
 * 生成文章摘要
 * @param {string} content - Markdown 内容
 * @returns {string} - 摘要
 */
function generateExcerpt(content) {
  // 移除 frontmatter 和标题
  let text = content
    .replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')
    .replace(/^#.*$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\$\$[\s\S]*?\$\$/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .trim()

  // 取前 150 个字符
  if (text.length > 150) {
    text = text.substring(0, 150) + '...'
  }

  return text || '暂无描述'
}

/**
 * 扫描博客目录
 * @returns {Array} - 博客文章配置数组
 */
function scanBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`❌ 博客目录不存在: ${BLOG_DIR}`)
    process.exit(1)
  }

  const posts = []
  const files = fs.readdirSync(BLOG_DIR, { withFileTypes: true })

  for (const file of files) {
    if (file.isDirectory()) {
      // 递归扫描子目录
      const subFiles = fs.readdirSync(path.join(BLOG_DIR, file.name))
      for (const subFile of subFiles) {
        if (subFile.endsWith('.md')) {
          const filePath = path.join(BLOG_DIR, file.name, subFile)
          const relativePath = path.join(file.name, subFile)
          posts.push(processMarkdownFile(filePath, relativePath))
        }
      }
    } else if (file.name.endsWith('.md')) {
      const filePath = path.join(BLOG_DIR, file.name)
      posts.push(processMarkdownFile(filePath, file.name))
    }
  }

  // 按日期降序排序
  posts.sort((a, b) => new Date(b.date) - new Date(a.date))

  return posts
}

/**
 * 处理单个 Markdown 文件
 * @param {string} filePath - 文件路径
 * @param {string} relativePath - 相对路径
 * @returns {object} - 博客配置对象
 */
function processMarkdownFile(filePath, relativePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const metadata = parseFrontmatter(content)
  const filename = path.basename(relativePath)

  // 如果没有 frontmatter，使用默认值
  const post = {
    id: metadata?.id || generateId(filename),
    title: metadata?.title || filename.replace('.md', ''),
    date: metadata?.date || new Date().toISOString().split('T')[0],
    readTime: metadata?.readTime ? parseInt(metadata.readTime) : estimateReadTime(content),
    author: metadata?.author || '刘昊阳',
    category: metadata?.category || '未分类',
    tags: metadata?.tags || [],
    type: 'markdown',
    content: `/blog-posts/${relativePath}`,
    isFilePath: true,
    excerpt: metadata?.excerpt || generateExcerpt(content)
  }

  if (metadata?.cover) {
    post.cover = metadata.cover
  }

  return post
}

/**
 * 生成 TypeScript 配置文件
 * @param {Array} posts - 博客文章数组
 */
function generateConfigFile(posts) {
  // 备份现有文件
  if (fs.existsSync(OUTPUT_FILE)) {
    fs.copyFileSync(OUTPUT_FILE, BACKUP_FILE)
    console.log(`📦 已备份原配置文件到: ${path.basename(BACKUP_FILE)}`)
  }

  const template = `/**
 * 博客文章配置文件
 * ⚠️ 此文件由 scripts/generate-blog-config.js 自动生成
 * 请勿直接编辑，如需修改请编辑 Markdown 文件的 frontmatter
 *
 * 生成时间: ${new Date().toLocaleString('zh-CN')}
 */

// 文章类型定义
export interface BlogPost {
  id: string
  title: string
  date: string
  readTime: number
  author: string
  category: string
  tags: string[]
  type: 'markdown' | 'pdf'
  content: string
  isFilePath?: boolean
  excerpt: string
  cover?: string
}

export const blogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)}

/**
 * 根据分类筛选文章
 */
export function getPostsByCategory(category: string): BlogPost[] {
  if (!category || category === 'all') {
    return blogPosts
  }
  return blogPosts.filter((post) => post.category === category)
}

/**
 * 根据标签筛选文章
 */
export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag))
}

/**
 * 根据 ID 获取文章
 */
export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id)
}

/**
 * 获取最新文章
 */
export function getRecentPosts(limit: number = 5): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

/**
 * 获取所有分类
 */
export function getAllCategories(): string[] {
  const categories = new Set(blogPosts.map((post) => post.category))
  return Array.from(categories)
}

/**
 * 获取所有标签
 */
export function getAllTags(): string[] {
  const tags = new Set(blogPosts.flatMap((post) => post.tags))
  return Array.from(tags)
}

/**
 * 搜索文章
 */
export function searchPosts(keyword: string): BlogPost[] {
  const lowerKeyword = keyword.toLowerCase()
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerKeyword) ||
      post.excerpt.toLowerCase().includes(lowerKeyword) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))
  )
}
`

  fs.writeFileSync(OUTPUT_FILE, template, 'utf-8')
  console.log(`✅ 已生成配置文件: ${path.basename(OUTPUT_FILE)}`)
}

/**
 * 主函数
 */
function main() {
  console.log('\n🚀 开始扫描博客文章...\n')

  const posts = scanBlogPosts()

  console.log(`\n📊 扫描结果:`)
  console.log(`   找到 ${posts.length} 篇文章\n`)

  posts.forEach((post, index) => {
    console.log(`   ${index + 1}. ${post.title}`)
    console.log(`      ID: ${post.id}`)
    console.log(`      日期: ${post.date}`)
    console.log(`      分类: ${post.category}`)
    console.log(`      标签: ${post.tags.join(', ')}`)
    console.log(`      阅读时间: ${post.readTime} 分钟`)
    console.log('')
  })

  generateConfigFile(posts)

  console.log('\n✨ 完成！\n')
  console.log('💡 提示:')
  console.log('   - 如果配置有误，可从备份恢复: blog-posts.ts.backup')
  console.log('   - 建议在 Markdown 文件开头添加 frontmatter 元数据')
  console.log('   - 运行 npm run dev 查看效果\n')
}

// 运行脚本
main()
