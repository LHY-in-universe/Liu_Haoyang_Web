import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import './styles/global.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

// 全局错误处理器
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue error handler:', {
    error: err,
    component: instance?.$options?.name || 'Unknown',
    info
  })

  // 在生产环境可以将错误发送到错误追踪服务
  if (import.meta.env.PROD) {
    // 例如：sendToErrorTracking(err, instance, info)
  }
}

// 警告处理器（开发环境）
if (import.meta.env.DEV) {
  app.config.warnHandler = (msg, instance, trace) => {
    console.warn('Vue warning:', {
      message: msg,
      component: instance?.$options?.name || 'Unknown',
      trace
    })
  }
}

// 路由错误处理
router.onError((error) => {
  console.error('Router error:', error)
  // 可以导航到错误页面
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    window.location.reload() // 重新加载页面以解决动态导入失败
  }
})

app.use(pinia)
app.use(head)
app.use(router)
app.mount('#app')
