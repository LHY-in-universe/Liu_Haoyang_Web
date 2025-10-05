<template>
  <div class="blog-list-page">
    <section class="page-header">
      <div class="container">
        <div class="page-header-content">
          <h1>📝 我的博客</h1>
          <p>分享技术见解、学习心得和学术研究</p>
          <div class="breadcrumb">
            <router-link to="/">首页</router-link> / <span>博客</span>
          </div>
        </div>
      </div>
    </section>

    <section class="blog-section">
      <div class="container">
        <div class="blog-layout">
          <!-- 主内容区 -->
          <div class="blog-content">
            <!-- 搜索和筛选 -->
            <div class="blog-filters">
              <input
                v-model="searchKeyword"
                type="text"
                placeholder="🔍 搜索文章..."
                class="search-input"
              />
              <div class="filter-buttons">
                <button
                  v-for="cat in categories"
                  :key="cat"
                  class="filter-btn"
                  :class="{ active: selectedCategory === cat }"
                  @click="selectedCategory = cat"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- 文章列表 -->
            <div class="posts-grid">
              <article
                v-for="post in filteredPosts"
                :key="post.id"
                class="post-card"
                @click="goToPost(post.id)"
              >
                <div class="post-type-badge" :class="`type-${post.type}`">
                  {{ post.type === 'markdown' ? '📝 Markdown' : '📄 PDF' }}
                </div>
                
                <div class="post-header">
                  <h2 class="post-title">{{ post.title }}</h2>
                  <div class="post-meta">
                    <span class="meta-item">📅 {{ post.date }}</span>
                    <span class="meta-item">⏱️ {{ post.readTime }}分钟</span>
                  </div>
                </div>

                <p class="post-excerpt">{{ post.excerpt }}</p>

                <div class="post-footer">
                  <div class="post-tags">
                    <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="tag">
                      {{ tag }}
                    </span>
                  </div>
                  <span class="read-more">阅读全文 →</span>
                </div>
              </article>
            </div>

            <!-- 空状态 -->
            <div v-if="filteredPosts.length === 0" class="empty-state">
              <p>😅 没有找到相关文章</p>
            </div>
          </div>

          <!-- 侧边栏 -->
          <aside class="blog-sidebar">
            <!-- 统计信息 -->
            <div class="sidebar-widget stats-widget">
              <h3>📊 博客统计</h3>
              <div class="stats-grid">
                <div class="stat-item">
                  <span class="stat-number">{{ allPosts.length }}</span>
                  <span class="stat-label">篇文章</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">{{ allCategories.length }}</span>
                  <span class="stat-label">个分类</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">{{ allTags.length }}</span>
                  <span class="stat-label">个标签</span>
                </div>
              </div>
            </div>

            <!-- 热门标签 -->
            <div class="sidebar-widget">
              <h3>🏷️ 热门标签</h3>
              <div class="tag-cloud">
                <span
                  v-for="tag in allTags"
                  :key="tag"
                  class="cloud-tag"
                  @click="searchKeyword = tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- 快速导航 -->
            <div class="sidebar-widget">
              <h3>🔗 快速导航</h3>
              <div class="quick-nav">
                <router-link to="/" class="quick-nav-item">
                  <span class="nav-icon">🏠</span>
                  <span>返回主页</span>
                </router-link>
                <router-link to="/documents" class="quick-nav-item">
                  <span class="nav-icon">📚</span>
                  <span>文档系统</span>
                </router-link>
                <router-link to="/resume" class="quick-nav-item">
                  <span class="nav-icon">📋</span>
                  <span>个人简历</span>
                </router-link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  blogPosts, 
  getAllCategories, 
  getAllTags,
  searchPosts,
  getPostsByCategory 
} from '@/config/blog-posts'

const router = useRouter()

const allPosts = ref(blogPosts)
const searchKeyword = ref('')
const selectedCategory = ref('全部')

const categories = computed(() => ['全部', ...getAllCategories()])
const allCategories = computed(() => getAllCategories())
const allTags = computed(() => getAllTags())

const filteredPosts = computed(() => {
  let posts = allPosts.value

  // 分类筛选
  if (selectedCategory.value !== '全部') {
    posts = posts.filter(post => post.category === selectedCategory.value)
  }

  // 搜索筛选（在分类筛选结果基础上进行）
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    posts = posts.filter(post =>
      post.title.toLowerCase().includes(keyword) ||
      post.excerpt.toLowerCase().includes(keyword) ||
      post.tags.some(tag => tag.toLowerCase().includes(keyword))
    )
  }

  return posts
})

function goToPost(id) {
  router.push(`/blog/${id}`)
}
</script>

<style scoped>
.blog-list-page {
  min-height: 100vh;
  padding-top: 80px;
  background: var(--bg-light);
}

.page-header {
  background: var(--bg-gradient-primary);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.page-header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.breadcrumb {
  margin-top: 1rem;
  opacity: 0.9;
}

.breadcrumb a {
  color: white;
  text-decoration: none;
}

.blog-section {
  padding: 3rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.blog-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

/* 搜索和筛选 */
.blog-filters {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid var(--border-color);
  border-radius: 50px;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  background: var(--bg-white);
  color: var(--text-dark);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.filter-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.6rem 1.5rem;
  background: var(--bg-white);
  border: 2px solid var(--border-color);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: var(--text-dark);
}

.filter-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.filter-btn.active {
  background: var(--bg-gradient-primary);
  border-color: transparent;
  color: white;
}

/* 文章网格 */
.posts-grid {
  display: grid;
  gap: 2rem;
}

.post-card {
  background: var(--bg-white);
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 2px solid transparent;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-color);
}

.post-type-badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.type-markdown {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.type-pdf {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
}

.post-header {
  margin-bottom: 1rem;
  padding-right: 120px;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-dark);
  line-height: 1.3;
}

.post-meta {
  display: flex;
  gap: 1.5rem;
  color: var(--text-light);
  font-size: 0.9rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.post-excerpt {
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: var(--bg-lighter);
  color: var(--primary-color);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.read-more {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 0.95rem;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-light);
  font-size: 1.1rem;
}

/* 侧边栏 */
.blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-widget {
  background: var(--bg-white);
  padding: 1.5rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow);
}

.sidebar-widget h3 {
  color: var(--text-dark);
  margin-bottom: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-light);
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cloud-tag {
  background: var(--bg-lighter);
  color: var(--text-dark);
  padding: 0.4rem 0.9rem;
  border-radius: 15px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.cloud-tag:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.quick-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.quick-nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-dark);
  transition: all 0.3s ease;
}

.quick-nav-item:hover {
  background: var(--bg-lighter);
  transform: translateX(5px);
}

.nav-icon {
  font-size: 1.25rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .blog-layout {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .post-header {
    padding-right: 0;
  }

  .post-type-badge {
    position: static;
    display: inline-block;
    margin-bottom: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

/* 深色模式 */
[data-theme="dark"] .search-input {
  background: var(--bg-white);
  border-color: var(--border-color);
}

[data-theme="dark"] .filter-btn {
  background: var(--bg-white);
  border-color: var(--border-color);
}

[data-theme="dark"] .post-card,
[data-theme="dark"] .sidebar-widget {
  background: var(--bg-white);
}
</style>


