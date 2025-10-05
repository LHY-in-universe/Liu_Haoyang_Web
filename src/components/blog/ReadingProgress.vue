<template>
  <div class="reading-progress-wrapper">
    <div class="reading-progress-bar" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

function updateProgress() {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  const scrolled = (scrollTop / (documentHeight - windowHeight)) * 100
  progress.value = Math.min(Math.max(scrolled, 0), 100)
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
  updateProgress() // 初始化
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<style scoped>
.reading-progress-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: transparent;
  z-index: 9999;
}

.reading-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.1s ease-out;
  box-shadow: 0 2px 10px rgba(102, 126, 234, 0.5);
}

/* 深色模式 */
[data-theme="dark"] .reading-progress-bar {
  background: linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%);
  box-shadow: 0 2px 10px rgba(139, 92, 246, 0.5);
}
</style>
