<template>
  <div class="blog-post-page">
    <div class="post-header">
      <div class="container">
        <button class="back-button" @click="goBack">← 返回博客列表</button>

        <h1 class="post-title">{{ post.title }}</h1>

        <div class="post-meta">
          <span class="meta-item"> 📅 {{ post.date }} </span>
          <span class="meta-item"> ⏱️ {{ post.readTime }} 分钟阅读 </span>
          <span class="meta-item"> 👤 {{ post.author }} </span>
        </div>

        <div class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <div class="post-body">
      <div class="container">
        <div class="post-content-wrapper">
          <!-- Markdown 内容 -->
          <MarkdownRenderer
            v-if="post.type === 'markdown'"
            :source="post.content"
            :is-file-path="post.isFilePath !== false"
          />

          <!-- PDF 内容 -->
          <PdfViewer v-else-if="post.type === 'pdf'" :pdf-url="post.content" :title="post.title" />

          <!-- 默认 HTML 内容 -->
          <div v-else class="html-content" v-html="post.content"></div>
        </div>

        <!-- 文章底部信息 -->
        <div class="post-footer">
          <div class="post-share">
            <h3>分享这篇文章</h3>
            <div class="share-buttons">
              <button class="share-btn" @click="shareToTwitter">🐦 Twitter</button>
              <button class="share-btn" @click="copyLink">🔗 复制链接</button>
            </div>
          </div>

          <div class="post-navigation">
            <router-link v-if="prevPost" :to="`/blog/${prevPost.id}`" class="nav-link prev">
              ← {{ prevPost.title }}
            </router-link>
            <router-link v-if="nextPost" :to="`/blog/${nextPost.id}`" class="nav-link next">
              {{ nextPost.title }} →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import MarkdownRenderer from './MarkdownRenderer.vue'
import PdfViewer from './PdfViewer.vue'
import { blogPosts } from '@/config/blog-posts'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const toast = useToast()

const props = defineProps({
  postId: {
    type: String,
    required: true
  }
})

// 从配置文件获取文章数据
const allPosts = ref(blogPosts)

const post = computed(() => {
  return allPosts.value.find((p) => p.id === props.postId) || {}
})

const currentIndex = computed(() => {
  return allPosts.value.findIndex((p) => p.id === props.postId)
})

const prevPost = computed(() => {
  return currentIndex.value > 0 ? allPosts.value[currentIndex.value - 1] : null
})

const nextPost = computed(() => {
  return currentIndex.value < allPosts.value.length - 1
    ? allPosts.value[currentIndex.value + 1]
    : null
})

function goBack() {
  router.push('/blog')
}

function shareToTwitter() {
  const url = window.location.href
  const text = post.value.title
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  )
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    toast.success('链接已复制到剪贴板！')
  } catch (err) {
    console.error('复制失败:', err)
    toast.error('复制链接失败，请手动复制')
  }
}

// 动态设置 SEO meta 标签
useHead({
  title: computed(() => (post.value.title ? `${post.value.title} | 刘浩洋的博客` : '刘浩洋的博客')),
  meta: computed(() => [
    {
      name: 'description',
      content: post.value.excerpt || '刘浩洋的个人博客，分享技术见解和学术研究'
    },
    {
      name: 'keywords',
      content: post.value.tags ? post.value.tags.join(', ') : '博客,技术,学术'
    },
    {
      property: 'og:title',
      content: post.value.title || '刘浩洋的博客'
    },
    {
      property: 'og:description',
      content: post.value.excerpt || '刘浩洋的个人博客'
    },
    {
      property: 'og:type',
      content: 'article'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: post.value.title || '刘浩洋的博客'
    },
    {
      name: 'twitter:description',
      content: post.value.excerpt || '刘浩洋的个人博客'
    }
  ])
})

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped>
.blog-post-page {
  min-height: 100vh;
  padding-top: 80px;
  background: var(--bg-light);
}

.post-header {
  background: var(--bg-gradient-primary);
  color: white;
  padding: 3rem 2rem;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.back-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.post-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.post-meta {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  opacity: 0.9;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.post-tags {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.post-body {
  padding: 3rem 2rem;
}

.post-content-wrapper {
  background: var(--bg-white);
  padding: 3rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  margin-bottom: 3rem;
}

.html-content {
  line-height: 1.8;
  color: var(--text-dark);
}

.post-footer {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 2px solid var(--border-color);
}

.post-share {
  margin-bottom: 3rem;
}

.post-share h3 {
  color: var(--text-dark);
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.share-buttons {
  display: flex;
  gap: 1rem;
}

.share-btn {
  padding: 0.75rem 1.5rem;
  background: var(--bg-gradient-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.post-navigation {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.nav-link {
  flex: 1;
  padding: 1.5rem;
  background: var(--bg-white);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--text-dark);
  border: 2px solid var(--border-color);
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  border-color: var(--primary-color);
  transform: translateX(0);
  box-shadow: var(--shadow);
}

.nav-link.prev:hover {
  transform: translateX(-5px);
}

.nav-link.next {
  text-align: right;
}

.nav-link.next:hover {
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .post-title {
    font-size: 2rem;
  }

  .post-meta {
    gap: 1rem;
  }

  .post-content-wrapper {
    padding: 1.5rem;
  }

  .post-navigation {
    flex-direction: column;
  }

  .nav-link.next {
    text-align: left;
  }
}

[data-theme='dark'] .post-content-wrapper {
  background: var(--bg-white);
}
</style>
