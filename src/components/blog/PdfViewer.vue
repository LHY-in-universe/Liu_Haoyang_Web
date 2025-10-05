<template>
  <div class="pdf-viewer">
    <div class="pdf-toolbar">
      <h3>{{ title || 'PDF 文档' }}</h3>
      <div class="toolbar-actions">
        <a :href="pdfUrl" download class="btn btn-sm">
          📥 下载
        </a>
        <a :href="pdfUrl" target="_blank" class="btn btn-sm btn-primary">
          🔗 新窗口打开
        </a>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>加载 PDF 中...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>❌ {{ error }}</p>
      <a :href="pdfUrl" target="_blank" class="btn btn-primary">
        在新窗口中打开
      </a>
    </div>

    <div v-else class="pdf-container">
      <iframe
        :src="embedUrl"
        class="pdf-frame"
        @load="onLoad"
        @error="onError"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  // PDF 文件路径
  pdfUrl: {
    type: String,
    required: true
  },
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 高度
  height: {
    type: String,
    default: '800px'
  }
})

const loading = ref(true)
const error = ref(null)

// 生成嵌入 URL
const embedUrl = computed(() => {
  // 使用 PDF.js viewer 或直接嵌入
  return `${props.pdfUrl}#view=FitH`
})

function onLoad() {
  loading.value = false
}

function onError() {
  loading.value = false
  error.value = '无法加载 PDF 文件'
}

onMounted(() => {
  // 检查 PDF 是否存在
  fetch(props.pdfUrl, { method: 'HEAD' })
    .then(response => {
      if (!response.ok) {
        throw new Error('PDF 文件不存在')
      }
    })
    .catch(err => {
      error.value = err.message
      loading.value = false
    })
})
</script>

<style scoped>
.pdf-viewer {
  width: 100%;
  background: var(--bg-white);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.pdf-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--bg-gradient-primary);
  color: white;
  flex-wrap: wrap;
  gap: 1rem;
}

.pdf-toolbar h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.toolbar-actions {
  display: flex;
  gap: 0.75rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-sm {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-sm:hover {
  background: rgba(255, 255, 255, 0.3);
}

.btn-primary {
  background: white;
  color: var(--primary-color);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  min-height: 400px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  color: #ef4444;
}

.error-state .btn {
  margin-top: 1rem;
}

.pdf-container {
  width: 100%;
  height: v-bind(height);
  position: relative;
}

.pdf-frame {
  width: 100%;
  height: 100%;
  border: none;
}

@media (max-width: 768px) {
  .pdf-toolbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .toolbar-actions {
    width: 100%;
    justify-content: space-between;
  }

  .pdf-container {
    height: 600px;
  }
}

[data-theme="dark"] .pdf-viewer {
  background: var(--bg-light);
}
</style>


