/**
 * 博客文章配置文件
 * 在这里管理所有博客文章
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

export const blogPosts: BlogPost[] = [
  {
    id: 'example-markdown',
    title: '欢迎来到我的 Markdown 博客',
    date: '2025-02-07',
    readTime: 5,
    author: '刘昊阳',
    category: '教程',
    tags: ['Vue.js', 'Markdown', '博客系统'],
    type: 'markdown',
    content: '/blog-posts/example.md',
    isFilePath: true,
    excerpt: '这是一个完整的 Markdown 博客系统示例，支持代码高亮、表格、数学公式等丰富功能。',
    cover: '/images/posts/markdown-cover.jpg' // 可选封面图
  }
]

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
