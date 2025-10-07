<template>
  <div
    class="theme-toggle"
    @click="toggleThemeWithAnimation"
    :title="isDark ? '切换到浅色主题' : '切换到深色主题'"
  >
    <span class="theme-toggle-icon">{{ isDark ? '☀️' : '🌙' }}</span>
  </div>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'theme', // 使用与 theme.js 相同的 localStorage 键
  listenToStorageChanges: true, // 监听其他标签页的变化
  initialValue: 'light', // 默认为浅色主题
  disableTransition: false,
  onChanged: (dark) => {
    // 强制应用主题,覆盖系统偏好
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }
})

const toggleDark = useToggle(isDark)

const toggleThemeWithAnimation = async (event) => {
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  // 兼容性处理
  if (!document.startViewTransition) {
    toggleDark()
    return
  }

  const transition = document.startViewTransition(() => {
    toggleDark()
  })

  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]

    document.documentElement.animate(
      {
        clipPath: clipPath
      },
      {
        duration: 400,
        easing: 'ease-in',
        // 始终对新状态应用 clipPath 动画，让新主题从点击位置扩散出来
        pseudoElement: '::view-transition-new(root)'
      }
    )
  })
}
</script>

<style scoped>
.theme-toggle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  cursor: pointer;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.theme-toggle::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.theme-toggle::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
  transition: all 0.4s ease;
}

/* 浅色主题样式 */
[data-theme='light'] .theme-toggle {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

/* 深色主题样式 */
[data-theme='dark'] .theme-toggle {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  box-shadow:
    0 4px 15px rgba(240, 147, 251, 0.5),
    0 0 30px rgba(240, 147, 251, 0.3);
}

[data-theme='dark'] .theme-toggle::after {
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.98) 0%, rgba(31, 41, 55, 0.95) 100%);
}

[data-theme='dark'] .theme-toggle-icon {
  filter: drop-shadow(0 2px 6px rgba(255, 255, 255, 0.3));
}

.theme-toggle:hover {
  transform: scale(1.1) translateY(-2px);
  box-shadow:
    0 8px 25px rgba(102, 126, 234, 0.5),
    0 0 40px rgba(102, 126, 234, 0.3);
}

[data-theme='dark'] .theme-toggle:hover {
  box-shadow:
    0 8px 25px rgba(240, 147, 251, 0.5),
    0 0 40px rgba(240, 147, 251, 0.3);
}

.theme-toggle:hover::before {
  opacity: 1;
  animation: rotate 3s linear infinite;
}

.theme-toggle:active {
  transform: scale(0.95);
}

.theme-toggle-icon {
  position: relative;
  z-index: 1;
  font-size: 1.6rem;
  line-height: 1;
  display: block;
  text-align: center;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  -webkit-user-select: none;
}

.theme-toggle:hover .theme-toggle-icon {
  transform: rotate(180deg) scale(1.1);
}

.theme-toggle:active .theme-toggle-icon {
  transform: rotate(180deg) scale(0.9);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 添加脉冲动画效果 */
@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.theme-toggle:focus {
  outline: none;
}

.theme-toggle:focus-visible {
  box-shadow:
    0 0 0 4px rgba(102, 126, 234, 0.3),
    0 4px 15px rgba(102, 126, 234, 0.4);
}

[data-theme='dark'] .theme-toggle:focus-visible {
  box-shadow:
    0 0 0 4px rgba(240, 147, 251, 0.3),
    0 4px 15px rgba(240, 147, 251, 0.4);
}
</style>
