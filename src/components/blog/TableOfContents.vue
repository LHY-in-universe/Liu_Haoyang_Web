<template>
  <div v-if="headings.length > 0" class="toc-container">
    <div class="toc-header">
      <h3>📑 目录</h3>
      <button @click="isCollapsed = !isCollapsed" class="toc-toggle">
        {{ isCollapsed ? '展开' : '收起' }}
      </button>
    </div>
    <Transition name="toc-expand">
      <nav v-show="!isCollapsed" class="toc-nav">
        <ul class="toc-list">
          <li
            v-for="heading in headings"
            :key="heading.id"
            :class="['toc-item', `toc-level-${heading.level}`, { active: activeId === heading.id }]"
          >
            <a
              :href="`#${heading.id}`"
              class="toc-link"
              @click.prevent="scrollToHeading(heading.id)"
            >
              {{ heading.text }}
            </a>
          </li>
        </ul>
      </nav>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const headings = ref([])
const activeId = ref('')
const isCollapsed = ref(false)

// 从内容中提取标题
function extractHeadings() {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = props.content

  const headingElements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')
  const result = []

  headingElements.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1))
    const text = heading.textContent.trim()
    let id = heading.id

    // 如果没有 id，生成一个
    if (!id) {
      id = `heading-${index}`
      heading.id = id
    }

    result.push({
      id,
      text,
      level
    })
  })

  headings.value = result
}

// 滚动到指定标题
function scrollToHeading(id) {
  const element = document.getElementById(id)
  if (element) {
    const offset = 100 // 导航栏高度
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })

    activeId.value = id
  }
}

// 监听滚动事件，更新当前活动的标题
let observer = null

onMounted(() => {
  extractHeadings()

  // 使用 Intersection Observer 检测当前可见的标题
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-100px 0px -80% 0px'
    }
  )

  // 观察所有标题元素
  setTimeout(() => {
    headings.value.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })
  }, 500) // 等待内容渲染完成
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

// 当内容变化时重新提取标题
watch(
  () => props.content,
  () => {
    if (observer) {
      observer.disconnect()
    }
    extractHeadings()
  }
)
</script>

<style scoped>
.toc-container {
  background: var(--bg-white);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.toc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border-color);
}

.toc-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-dark);
}

.toc-toggle {
  background: transparent;
  border: 1px solid var(--border-color);
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  color: var(--text-light);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.toc-toggle:hover {
  background: var(--bg-lighter);
  color: var(--text-dark);
}

.toc-nav {
  overflow: hidden;
}

.toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.toc-item {
  margin-bottom: 0.5rem;
}

.toc-link {
  display: block;
  color: var(--text-light);
  text-decoration: none;
  font-size: 0.9rem;
  line-height: 1.5;
  padding: 0.4rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.toc-link:hover {
  color: var(--primary-color);
  background: var(--bg-lighter);
}

.toc-item.active .toc-link {
  color: var(--primary-color);
  border-left-color: var(--primary-color);
  background: var(--bg-lighter);
  font-weight: 500;
}

/* 不同级别的标题缩进 */
.toc-level-1 .toc-link {
  padding-left: 0.5rem;
  font-weight: 600;
}

.toc-level-2 .toc-link {
  padding-left: 1.5rem;
}

.toc-level-3 .toc-link {
  padding-left: 2.5rem;
  font-size: 0.85rem;
}

.toc-level-4 .toc-link {
  padding-left: 3.5rem;
  font-size: 0.85rem;
}

.toc-level-5 .toc-link,
.toc-level-6 .toc-link {
  padding-left: 4.5rem;
  font-size: 0.8rem;
}

/* 展开/收起动画 */
.toc-expand-enter-active,
.toc-expand-leave-active {
  transition: all 0.3s ease;
}

.toc-expand-enter-from,
.toc-expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.toc-expand-enter-to,
.toc-expand-leave-from {
  opacity: 1;
  max-height: 1000px;
}

/* 自定义滚动条 */
.toc-container::-webkit-scrollbar {
  width: 6px;
}

.toc-container::-webkit-scrollbar-track {
  background: transparent;
}

.toc-container::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.toc-container::-webkit-scrollbar-thumb:hover {
  background: var(--text-light);
}

/* 深色模式 */
[data-theme='dark'] .toc-container {
  background: var(--bg-white);
}

[data-theme='dark'] .toc-header h3 {
  color: var(--text-dark);
}

[data-theme='dark'] .toc-toggle {
  border-color: var(--border-color);
  color: var(--text-light);
}

[data-theme='dark'] .toc-toggle:hover {
  background: var(--bg-lighter);
}

[data-theme='dark'] .toc-link {
  color: var(--text-light);
}

/* 响应式 */
@media (max-width: 1200px) {
  .toc-container {
    position: relative;
    top: 0;
    max-height: 400px;
    margin-bottom: 2rem;
  }
}
</style>
