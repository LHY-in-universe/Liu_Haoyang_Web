<template>
  <div id="app">
    <Navbar />
    <ErrorBoundary>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </ErrorBoundary>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from './components/common/Navbar.vue'
import Footer from './components/common/Footer.vue'
import ErrorBoundary from './components/common/ErrorBoundary.vue'

// 全局错误处理
onMounted(() => {
  // 捕获全局未处理的错误
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error)
    // 可以在这里发送错误日志到服务器
  })

  // 捕获未处理的 Promise 拒绝
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
    // 可以在这里发送错误日志到服务器
  })
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
