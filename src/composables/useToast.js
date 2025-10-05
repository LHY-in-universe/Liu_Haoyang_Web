import { h, render } from 'vue'
import Toast from '../components/common/Toast.vue'

let toastContainer = null

function ensureContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.id = 'toast-container'
    document.body.appendChild(toastContainer)
  }
  return toastContainer
}

export function useToast() {
  const show = (message, type = 'success', duration = 3000) => {
    const container = ensureContainer()

    // 创建一个容器 div
    const toastWrapper = document.createElement('div')
    container.appendChild(toastWrapper)

    // 创建 Toast 组件实例
    const vnode = h(Toast, {
      message,
      type,
      duration,
      onClose: () => {
        // 移除组件
        render(null, toastWrapper)
        container.removeChild(toastWrapper)
      }
    })

    // 渲染组件
    render(vnode, toastWrapper)
  }

  const success = (message, duration) => show(message, 'success', duration)
  const error = (message, duration) => show(message, 'error', duration)
  const info = (message, duration) => show(message, 'info', duration)
  const warning = (message, duration) => show(message, 'warning', duration)

  return {
    show,
    success,
    error,
    info,
    warning
  }
}
