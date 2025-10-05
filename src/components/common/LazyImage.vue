<template>
  <div class="lazy-image-wrapper" :class="{ loaded: isLoaded, error: hasError }">
    <!-- 占位符 -->
    <div v-if="!isLoaded && !hasError" class="placeholder">
      <div class="spinner"></div>
    </div>

    <!-- 实际图片 -->
    <img
      v-show="isLoaded"
      ref="imgRef"
      :src="currentSrc"
      :alt="alt"
      :class="imageClass"
      @load="onLoad"
      @error="onError"
    />

    <!-- 错误状态 -->
    <div v-if="hasError" class="error-placeholder" @click="retry">
      <div class="error-icon">📷</div>
      <p>{{ errorMessage }}</p>
      <button class="retry-btn">点击重试</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  // 图片源
  src: {
    type: String,
    required: true
  },
  // 占位图（可选）
  placeholder: {
    type: String,
    default: ''
  },
  // Alt 文本
  alt: {
    type: String,
    default: ''
  },
  // 图片类名
  imageClass: {
    type: String,
    default: ''
  },
  // 根元素边距（Intersection Observer）
  rootMargin: {
    type: String,
    default: '50px'
  },
  // 错误重试次数
  maxRetries: {
    type: Number,
    default: 3
  }
})

const imgRef = ref(null)
const isLoaded = ref(false)
const hasError = ref(false)
const currentSrc = ref(props.placeholder || '')
const errorMessage = ref('图片加载失败')
const retryCount = ref(0)
let observer = null

// 加载图片
function loadImage() {
  currentSrc.value = props.src
}

// 图片加载成功
function onLoad() {
  isLoaded.value = true
  hasError.value = false
}

// 图片加载失败
function onError() {
  if (retryCount.value < props.maxRetries) {
    // 自动重试
    retryCount.value++
    setTimeout(() => {
      currentSrc.value = `${props.src}?retry=${retryCount.value}`
    }, 1000 * retryCount.value)
  } else {
    hasError.value = true
    errorMessage.value = `图片加载失败 (已重试 ${props.maxRetries} 次)`
  }
}

// 手动重试
function retry() {
  retryCount.value = 0
  hasError.value = false
  isLoaded.value = false
  loadImage()
}

onMounted(() => {
  // 使用 Intersection Observer 实现懒加载
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage()
            if (observer && imgRef.value) {
              observer.unobserve(imgRef.value)
            }
          }
        })
      },
      {
        rootMargin: props.rootMargin
      }
    )

    if (imgRef.value) {
      observer.observe(imgRef.value)
    }
  } else {
    // 不支持 Intersection Observer，直接加载
    loadImage()
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.lazy-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--bg-lighter, #f3f4f6);
}

.placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    90deg,
    #f3f4f6 25%,
    #e5e7eb 50%,
    #f3f4f6 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color, #e5e7eb);
  border-top-color: var(--primary-color, #4f46e5);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.lazy-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lazy-image-wrapper.loaded img {
  opacity: 1;
}

.error-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: var(--bg-light, #f9fafb);
  color: var(--text-light, #6b7280);
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.error-placeholder:hover {
  background: var(--bg-lighter, #f3f4f6);
}

.error-icon {
  font-size: 3rem;
  opacity: 0.5;
}

.error-placeholder p {
  font-size: 0.875rem;
  margin: 0;
}

.retry-btn {
  padding: 0.5rem 1rem;
  background: var(--primary-color, #4f46e5);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

/* 深色模式 */
[data-theme="dark"] .placeholder {
  background: linear-gradient(
    90deg,
    #374151 25%,
    #4b5563 50%,
    #374151 75%
  );
}

[data-theme="dark"] .error-placeholder {
  background: var(--bg-white, #1f2937);
  color: var(--text-light, #d1d5db);
}

[data-theme="dark"] .error-placeholder:hover {
  background: var(--bg-light, #374151);
}
</style>
