<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-animation">
        <div class="number">4</div>
        <div class="ghost">
          <div class="ghost-body">👻</div>
          <div class="ghost-shadow"></div>
        </div>
        <div class="number">4</div>
      </div>

      <h1>页面走丢了</h1>
      <p class="error-description">
        {{ errorMessage }}
      </p>

      <div class="suggestions">
        <h3>您可以尝试：</h3>
        <ul>
          <li>检查URL是否正确</li>
          <li>返回首页重新开始</li>
          <li>或者查看我们的其他页面</li>
        </ul>
      </div>

      <div class="error-actions">
        <router-link to="/" class="btn btn-primary">
          🏠 返回首页
        </router-link>
        <router-link to="/blog" class="btn btn-secondary">
          📝 浏览博客
        </router-link>
        <button @click="goBack" class="btn btn-outline">
          ← 返回上一页
        </button>
      </div>

      <div class="quick-links">
        <h3>快速导航</h3>
        <div class="links-grid">
          <router-link to="/" class="quick-link">
            <span class="link-icon">🏠</span>
            <span class="link-text">首页</span>
          </router-link>
          <router-link to="/blog" class="quick-link">
            <span class="link-icon">📝</span>
            <span class="link-text">博客</span>
          </router-link>
          <router-link to="/documents" class="quick-link">
            <span class="link-icon">📚</span>
            <span class="link-text">文档</span>
          </router-link>
          <router-link to="/resume" class="quick-link">
            <span class="link-icon">📋</span>
            <span class="link-text">简历</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const errorMessage = ref('抱歉，您访问的页面不存在或已被移除。')

onMounted(() => {
  // 根据路由参数自定义错误信息
  if (route.query.reason === 'access-denied') {
    errorMessage.value = '您没有权限访问此页面。'
  } else if (route.query.reason === 'expired') {
    errorMessage.value = '此页面已过期或不再可用。'
  }
})

function goBack() {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.error-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%);
  pointer-events: none;
}

.error-container {
  background: var(--bg-white);
  padding: 3rem;
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-xl);
  max-width: 700px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
}

.error-animation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.number {
  font-size: 8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4F46E5, #7C3AED);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}

.ghost {
  position: relative;
  animation: float 3s ease-in-out infinite;
}

.ghost-body {
  font-size: 6rem;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
}

.ghost-shadow {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 10px;
  background: radial-gradient(ellipse, rgba(0,0,0,0.2), transparent);
  border-radius: 50%;
  animation: shadowPulse 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes shadowPulse {
  0%, 100% {
    transform: translateX(-50%) scale(1);
    opacity: 0.2;
  }
  50% {
    transform: translateX(-50%) scale(0.8);
    opacity: 0.3;
  }
}

.error-container h1 {
  font-size: 2.5rem;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.error-description {
  font-size: 1.125rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.suggestions {
  background: var(--bg-light);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
  text-align: left;
}

.suggestions h3 {
  font-size: 1.125rem;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.suggestions ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggestions li {
  padding: 0.5rem 0;
  color: var(--text-light);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.suggestions li::before {
  content: '→';
  color: var(--primary-color);
  font-weight: bold;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
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
  background: linear-gradient(135deg, #4F46E5, #7C3AED);
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

.quick-links {
  border-top: 2px solid var(--border-light);
  padding-top: 2rem;
  margin-top: 1rem;
}

.quick-links h3 {
  font-size: 1.125rem;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.quick-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--bg-light);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--text-dark);
  transition: all 0.3s ease;
}

.quick-link:hover {
  background: var(--bg-lighter);
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}

.link-icon {
  font-size: 2rem;
}

.link-text {
  font-size: 0.875rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .error-container {
    padding: 2rem 1.5rem;
  }

  .error-animation {
    gap: 1rem;
  }

  .number {
    font-size: 5rem;
  }

  .ghost-body {
    font-size: 4rem;
  }

  .error-container h1 {
    font-size: 2rem;
  }

  .error-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

[data-theme="dark"] .error-container {
  background: var(--bg-white);
}

[data-theme="dark"] .suggestions {
  background: var(--bg-lighter);
}

[data-theme="dark"] .quick-link {
  background: var(--bg-lighter);
}

[data-theme="dark"] .quick-link:hover {
  background: var(--bg-light);
}
</style>
