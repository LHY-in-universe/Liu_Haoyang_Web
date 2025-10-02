<template>
  <div
    class="theme-toggle"
    @click="toggleTheme"
    :title="theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'"
  >
    <div class="theme-toggle-slider">
      <span class="theme-toggle-icon">{{ theme === 'dark' ? '☀️' : '🌙' }}</span>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useThemeStore } from '../../stores/theme'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const { toggleTheme } = themeStore
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: rgba(79, 70, 229, 0.1);
  transform: scale(1.1);
}

.theme-toggle:active {
  transform: scale(0.9);
}

.theme-toggle-slider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle-icon {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.theme-toggle:hover .theme-toggle-icon {
  transform: rotate(20deg);
}
</style>
