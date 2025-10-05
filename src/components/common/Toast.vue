<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="visible" class="toast" :class="`toast-${type}`">
        <div class="toast-icon">{{ icon }}</div>
        <div class="toast-content">
          <p class="toast-message">{{ message }}</p>
        </div>
        <button @click="close" class="toast-close">✕</button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success', // success, error, info, warning
    validator: (value) => ['success', 'error', 'info', 'warning'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['close'])

const visible = ref(false)

const icon = computed(() => {
  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠'
  }
  return icons[props.type] || icons.info
})

let timer = null

onMounted(() => {
  visible.value = true
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close()
    }, props.duration)
  }
})

function close() {
  visible.value = false
  setTimeout(() => {
    emit('close')
  }, 300) // 等待动画结束
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 2rem;
  right: 2rem;
  min-width: 300px;
  max-width: 500px;
  padding: 1rem 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 10000;
  border-left: 4px solid;
}

.toast-success {
  border-left-color: #10b981;
  background: #ecfdf5;
}

.toast-error {
  border-left-color: #ef4444;
  background: #fef2f2;
}

.toast-info {
  border-left-color: #3b82f6;
  background: #eff6ff;
}

.toast-warning {
  border-left-color: #f59e0b;
  background: #fffbeb;
}

.toast-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  font-size: 1rem;
  flex-shrink: 0;
}

.toast-success .toast-icon {
  background: #10b981;
  color: white;
}

.toast-error .toast-icon {
  background: #ef4444;
  color: white;
}

.toast-info .toast-icon {
  background: #3b82f6;
  color: white;
}

.toast-warning .toast-icon {
  background: #f59e0b;
  color: white;
}

.toast-content {
  flex: 1;
}

.toast-message {
  margin: 0;
  color: #1f2937;
  font-size: 0.95rem;
  line-height: 1.5;
}

.toast-close {
  background: transparent;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.toast-close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #1f2937;
}

/* 动画 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

/* 响应式 */
@media (max-width: 640px) {
  .toast {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    min-width: auto;
  }
}

/* 深色模式 */
[data-theme="dark"] .toast {
  background: #1f2937;
}

[data-theme="dark"] .toast-success {
  background: #064e3b;
}

[data-theme="dark"] .toast-error {
  background: #7f1d1d;
}

[data-theme="dark"] .toast-info {
  background: #1e3a8a;
}

[data-theme="dark"] .toast-warning {
  background: #78350f;
}

[data-theme="dark"] .toast-message {
  color: #e5e7eb;
}

[data-theme="dark"] .toast-close {
  color: #9ca3af;
}

[data-theme="dark"] .toast-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #e5e7eb;
}
</style>
