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
    excerpt: '这是一个完整的 Markdown 博客系统示例，支持代码高亮、表格、图片等丰富功能。',
    cover: '/images/posts/markdown-cover.jpg' // 可选封面图
  },
  {
    id: 'berry-phase-pdf',
    title: 'Berry相位理论研究论文',
    date: '2024-12-19',
    readTime: 30,
    author: '刘昊阳',
    category: '学术',
    tags: ['Berry相位', '拓扑物理', '量子力学', 'PDF'],
    type: 'pdf',
    content: '/documents/academic/DSMC.pdf',
    excerpt: 'Berry相位理论的深入研究，包括拓扑绝缘体和拓扑超导体的理论分析。'
  },
  {
    id: 'qmc-research',
    title: '量子蒙特卡洛方法研究',
    date: '2024-11-15',
    readTime: 25,
    author: '刘昊阳',
    category: '学术',
    tags: ['量子计算', '蒙特卡洛', 'PDF'],
    type: 'pdf',
    content: '/documents/academic/QMC.pdf',
    excerpt: '量子蒙特卡洛方法在凝聚态物理中的应用研究。'
  },
  {
    id: 'mlqm-paper',
    title: '机器学习与量子力学交叉研究',
    date: '2024-10-20',
    readTime: 20,
    author: '刘昊阳',
    category: '学术',
    tags: ['机器学习', '量子力学', 'AI', 'PDF'],
    type: 'pdf',
    content: '/documents/academic/MLQM.pdf',
    excerpt: '探索机器学习算法在量子力学问题求解中的创新应用。'
  }
]

/**
 * 根据分类筛选文章
 */
export function getPostsByCategory(category: string): BlogPost[] {
  if (!category || category === 'all') {
    return blogPosts
  }
  return blogPosts.filter(post => post.category === category)
}

/**
 * 根据标签筛选文章
 */
export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag))
}

/**
 * 根据 ID 获取文章
 */
export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id)
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
  const categories = new Set(blogPosts.map(post => post.category))
  return Array.from(categories)
}

/**
 * 获取所有标签
 */
export function getAllTags(): string[] {
  const tags = new Set(blogPosts.flatMap(post => post.tags))
  return Array.from(tags)
}

/**
 * 搜索文章
 */
export function searchPosts(keyword: string): BlogPost[] {
  const lowerKeyword = keyword.toLowerCase()
  return blogPosts.filter(post =>
    post.title.toLowerCase().includes(lowerKeyword) ||
    post.excerpt.toLowerCase().includes(lowerKeyword) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
  )
}


