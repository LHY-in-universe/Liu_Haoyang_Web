<template>
  <div class="blog">
    <section class="page-header">
      <div class="container">
        <div class="page-header-content">
          <h1>我的博客</h1>
          <p>分享技术见解、学习心得和生活感悟</p>
          <div class="breadcrumb">
            <router-link to="/">首页</router-link> / <span>博客</span>
          </div>
          <div class="page-header-actions">
            <router-link to="/documents" class="btn btn-primary">📝 访问文档系统</router-link>
            <router-link to="/resume" class="btn btn-outline" style="margin-left: 1rem;">查看简历</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="blog-section">
      <div class="container">
        <div class="blog-layout">
          <div class="blog-content">
            <div class="blog-info-card">
              <h2>🔄 博客系统已更新</h2>
              <p>我们的博客内容现已整合到全新的文档管理系统中，提供更好的阅读体验和搜索功能。</p>
              <div class="blog-stats">
                <div class="stat-item">
                  <span class="stat-number">{{ blogStats.blogCount }}</span>
                  <span class="stat-label">篇博客文章</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">{{ blogStats.academicCount }}</span>
                  <span class="stat-label">篇学术论文</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">{{ blogStats.totalPosts }}</span>
                  <span class="stat-label">篇文章总数</span>
                </div>
              </div>
              <router-link to="/documents" class="cta-button">
                🚀 立即访问新文档系统
              </router-link>
            </div>

            <div class="blog-preview">
              <h3>📝 最新博客文章预览</h3>

              <article class="blog-preview-item" v-for="post in posts" :key="post.id">
                <div class="preview-header">
                  <h4>{{ post.title }}</h4>
                  <span class="preview-date">{{ post.date }}</span>
                </div>
                <p class="preview-excerpt">{{ post.excerpt }}</p>
                <div class="preview-tags">
                  <span class="tag" v-for="tag in post.tags" :key="tag">{{ tag }}</span>
                </div>
                <router-link :to="`/documents#${post.id}`" class="preview-link">
                  在文档系统中查看 →
                </router-link>
              </article>
            </div>

            <div v-if="paginatedPosts.length > 0" class="blog-posts">
              <article class="blog-post" v-for="post in paginatedPosts" :key="post.id">
                <div class="post-image">
                  <img :src="post.image" :alt="post.title">
                  <div class="post-category">{{ post.category }}</div>
                </div>
                <div class="post-content">
                  <div class="post-meta">
                    <span class="post-date">{{ post.date }}</span>
                    <span class="post-read-time">{{ post.readTime }}</span>
                  </div>
                  <h2>{{ post.title }}</h2>
                  <p class="post-excerpt">{{ post.excerpt }}</p>
                  <div class="post-tags">
                    <span class="tag" v-for="tag in post.tags" :key="tag">{{ tag }}</span>
                  </div>
                </div>
              </article>
            </div>

            <div v-if="totalPages > 1" class="pagination">
              <button class="pagination-btn" @click="prevPage" :disabled="currentPage === 1">上一页</button>
              <div class="pagination-numbers">
                <button
                  v-for="page in totalPages"
                  :key="page"
                  class="pagination-number"
                  :class="{ active: page === currentPage }"
                  @click="goToPage(page)"
                >
                  {{ page }}
                </button>
              </div>
              <button class="pagination-btn" @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
            </div>
          </div>

          <aside class="blog-sidebar">
            <div class="sidebar-widget">
              <h3>关于博客</h3>
              <p>这里分享我在技术学习和工作中的心得体会，希望能够帮助到更多的开发者朋友。</p>
            </div>

            <div class="sidebar-widget">
              <h3>快速导航</h3>
              <div class="quick-nav">
                <router-link to="/" class="quick-nav-item">
                  <span class="nav-icon">🏠</span>
                  <span>返回主页</span>
                </router-link>
                <router-link to="/#about" class="quick-nav-item">
                  <span class="nav-icon">👤</span>
                  <span>关于我</span>
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

const blogStats = ref({
  blogCount: 2,
  academicCount: 2,
  totalPosts: 4
})

const posts = ref([
  {
    id: 'berry-phase-theory',
    title: 'Berry相位理论研究',
    date: '2024-12-19',
    excerpt: '关于Berry相位的理论研究，包括拓扑绝缘体和拓扑超导体的基础理论，探讨Berry连接和Berry曲率的物理意义...',
    tags: ['Berry相位', '拓扑物理', '量子力学']
  },
  {
    id: 'odmr-diamond-tracking',
    title: '光学探测磁共振技术研究',
    date: '2025-02-07',
    excerpt: '关于光学探测磁共振(ODMR)技术在钻石粒子运动检测中的应用研究，包括NV中心的量子传感应用和布朗运动分析...',
    tags: ['ODMR', 'NV中心', '量子传感']
  }
])

const allPosts = ref([])
const currentPage = ref(1)
const postsPerPage = ref(5)

const totalPages = computed(() => Math.ceil(allPosts.value.length / postsPerPage.value))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage.value
  const end = start + postsPerPage.value
  return allPosts.value.slice(start, end)
})

const goToPage = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.blog {
  padding-top: 70px;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
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

.page-header-actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.blog-section {
  padding: 3rem 2rem;
}

.blog-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

.blog-info-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 3rem;
}

.blog-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 2rem 0;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: #FFD700;
}

.stat-label {
  font-size: 0.9rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-3px) scale(1.05);
}

.blog-preview-item {
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.blog-preview-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(79, 70, 229, 0.1);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.preview-date {
  background: linear-gradient(45deg, #4F46E5, #7C3AED);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

.preview-tags {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tag {
  background: #f8f9fa;
  color: #4F46E5;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.preview-link {
  color: #4F46E5;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.preview-link:hover {
  color: #7C3AED;
}

.blog-post {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.post-image {
  position: relative;
}

.post-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.post-category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #4F46E5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.post-content {
  padding: 2rem;
}

.post-meta {
  display: flex;
  gap: 1rem;
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #4F46E5;
  color: white;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-number {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-number.active {
  background: #4F46E5;
  color: white;
  border-color: #4F46E5;
}

.sidebar-widget {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.sidebar-widget h3 {
  color: #4F46E5;
  margin-bottom: 1rem;
}

.quick-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.quick-nav-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
}

.quick-nav-item:hover {
  background: #f3f4f6;
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .blog-layout {
    grid-template-columns: 1fr;
  }

  .blog-stats {
    flex-direction: column;
    gap: 1rem;
  }
}

[data-theme="dark"] .blog-preview-item,
[data-theme="dark"] .blog-post,
[data-theme="dark"] .sidebar-widget {
  background: #1f2937;
  color: #e5e7eb;
}

[data-theme="dark"] .pagination-btn,
[data-theme="dark"] .pagination-number {
  background: #374151;
  color: #e5e7eb;
  border-color: #4b5563;
}
</style>
