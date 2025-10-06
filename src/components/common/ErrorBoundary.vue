<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-content">
      <div class="error-icon">😕</div>
      <h2>哎呀，出错了！</h2>
      <p class="error-message">{{ errorMessage }}</p>

      <div class="error-details" v-if="showDetails && errorStack">
        <button @click="toggleDetails" class="details-toggle">
          {{ detailsExpanded ? '隐藏详情' : '查看详情' }}
        </button>
        <pre v-if="detailsExpanded" class="error-stack">{{ errorStack }}</pre>
      </div>

      <div class="error-actions">
        <button @click="handleRetry" class="btn btn-primary">🔄 重试</button>
        <router-link to="/" class="btn btn-secondary"> 🏠 返回首页 </router-link>
        <button @click="handleReport" class="btn btn-outline">📧 报告问题</button>
      </div>
    </div>
  </div>
  <slot v-else></slot>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'

const props = defineProps({
  // 是否在开发环境显示错误详情
  showDetails: {
    type: Boolean,
    default: import.meta.env.DEV
  },
  // 自定义错误处理函数
  onError: {
    type: Function,
    default: null
  }
})

const hasError = ref(false)
const errorMessage = ref('')
const errorStack = ref('')
const detailsExpanded = ref(false)
const errorInfo = ref(null)

// 捕获子组件错误
onErrorCaptured((err, instance, info) => {
  hasError.value = true
  errorMessage.value = err.message || '发生了一个未知错误'
  errorStack.value = err.stack || ''
  errorInfo.value = info

  // 调用自定义错误处理
  if (props.onError) {
    props.onError(err, instance, info)
  }

  // 记录错误到控制台
  console.error('ErrorBoundary 捕获到错误:', {
    error: err,
    instance,
    info
  })

  // 阻止错误继续向上传播
  return false
})

function toggleDetails() {
  detailsExpanded.value = !detailsExpanded.value
}

function handleRetry() {
  hasError.value = false
  errorMessage.value = ''
  errorStack.value = ''
  detailsExpanded.value = false
  errorInfo.value = null
}

function handleReport() {
  const subject = `错误报告: ${errorMessage.value}`
  const body = `
错误信息: ${errorMessage.value}

堆栈信息:
${errorStack.value}

浏览器: ${navigator.userAgent}
时间: ${new Date().toISOString()}
  `.trim()

  const mailto = `mailto:lhy200415@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = mailto
}
</script>

<style scoped>
.error-boundary {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.error-content {
  background: var(--bg-white);
  padding: 3rem;
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-xl);
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.error-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.error-content h2 {
  font-size: 2rem;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.error-message {
  font-size: 1.125rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.error-details {
  margin: 2rem 0;
  text-align: left;
}

.details-toggle {
  background: var(--bg-lighter);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--text-dark);
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.details-toggle:hover {
  background: var(--border-color);
}

.error-stack {
  background: var(--bg-lighter);
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.75rem;
  color: var(--text-light);
  overflow-x: auto;
  max-height: 200px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  white-space: pre-wrap;
  word-break: break-all;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: var(--bg-lighter);
  color: var(--text-dark);
}

.btn-secondary:hover {
  background: var(--border-color);
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--border-color);
  color: var(--text-dark);
}

.btn-outline:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .error-content {
    padding: 2rem 1.5rem;
  }

  .error-icon {
    font-size: 3rem;
  }

  .error-content h2 {
    font-size: 1.5rem;
  }

  .error-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}

[data-theme='dark'] .error-content {
  background: var(--bg-white);
}

[data-theme='dark'] .error-content h2 {
  color: var(--text-dark);
}

[data-theme='dark'] .error-stack {
  background: var(--bg-lighter);
  color: var(--text-light);
}
</style>
