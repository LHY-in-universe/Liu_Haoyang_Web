<template>
  <div class="language-switcher">
    <button
      class="lang-btn"
      :class="{ active: currentLang === 'zh' }"
      @click="setLanguage('zh')"
      title="切换到中文"
    >
      中
    </button>
    <button
      class="lang-btn"
      :class="{ active: currentLang === 'en' }"
      @click="setLanguage('en')"
      title="Switch to English"
    >
      EN
    </button>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useLanguageStore } from '../../stores/language'

const languageStore = useLanguageStore()
const { currentLang } = storeToRefs(languageStore)
const { setLanguage } = languageStore
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.lang-btn {
  background: transparent;
  border: 2px solid #e5e7eb;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.3s ease;
}

.lang-btn:hover {
  border-color: #4F46E5;
  color: #4F46E5;
}

.lang-btn.active {
  background: #4F46E5;
  border-color: #4F46E5;
  color: white;
}

[data-theme="dark"] .lang-btn {
  border-color: #4b5563;
  color: #9ca3af;
}

[data-theme="dark"] .lang-btn:hover {
  border-color: #7C3AED;
  color: #7C3AED;
}

[data-theme="dark"] .lang-btn.active {
  background: #7C3AED;
  border-color: #7C3AED;
}
</style>
