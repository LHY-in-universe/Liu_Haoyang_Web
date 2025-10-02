# 从原HTML项目迁移到Vue 3指南

## 📋 迁移概述

本文档说明如何将原HTML/CSS/JS项目完全迁移到Vue 3版本。

## 🔄 架构对比

### 原项目结构
```
Liu_Haoyang_Web/
├── index.html          # 首页
├── blog.html           # 博客页
├── resume.html         # 简历页
├── styles.css          # 全局样式
├── script.js           # 全局脚本
└── public/            # 静态资源
```

### Vue项目结构
```
vue-app/
├── src/
│   ├── views/         # 页面组件
│   ├── components/    # 复用组件
│   ├── stores/        # 状态管理
│   ├── router/        # 路由配置
│   └── styles/        # 全局样式
└── public/           # 静态资源
```

## 🛠 核心功能迁移

### 1. 主题切换系统

**原实现** (script.js):
```javascript
class ThemeManager {
  toggleTheme() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }
}
```

**Vue实现** (stores/theme.js):
```javascript
export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('theme') || 'light')

  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return { theme, toggleTheme }
})
```

**使用方式**:
```vue
<script setup>
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
</script>

<template>
  <button @click="themeStore.toggleTheme">
    {{ themeStore.theme }}
  </button>
</template>
```

### 2. 语言切换系统

**原实现**:
```javascript
function initializeLanguageSwitcher() {
  languageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPage = languageMapping[currentPage][targetLang];
      window.location.href = targetPage;
    });
  });
}
```

**Vue实现** (stores/language.js):
```javascript
export const useLanguageStore = defineStore('language', () => {
  const currentLang = ref('zh')
  const t = (key) => translations[currentLang.value]?.[key]

  return { currentLang, setLanguage, t }
})
```

**使用方式**:
```vue
<script setup>
import { useLanguageStore } from '@/stores/language'
const { t } = useLanguageStore()
</script>

<template>
  <h1>{{ t('home') }}</h1>
</template>
```

### 3. 路由导航

**原实现**:
```javascript
// 直接使用<a>标签
<a href="blog.html">博客</a>

// 手动管理锚点滚动
document.querySelector(hash).scrollIntoView({
  behavior: 'smooth'
});
```

**Vue实现**:
```vue
<!-- 使用router-link -->
<router-link to="/blog">博客</router-link>

<!-- 锚点导航 -->
<router-link to="/#about">关于</router-link>
```

路由配置自动处理滚动:
```javascript
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
  }
})
```

### 4. 表单处理

**原实现**:
```javascript
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  // 处理表单数据
});
```

**Vue实现**:
```vue
<script setup>
const form = ref({ name: '', email: '', message: '' })

const submitForm = () => {
  console.log(form.value)
  // 处理表单
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <input v-model="form.name">
    <input v-model="form.email">
    <textarea v-model="form.message"></textarea>
    <button type="submit">提交</button>
  </form>
</template>
```

### 5. 博客分页

**原实现**:
```javascript
class BlogManager {
  renderCurrentPage() {
    const posts = this.allPosts.slice(startIndex, endIndex);
    const html = posts.map(post => this.renderPost(post)).join('');
    container.innerHTML = html;
  }
}
```

**Vue实现**:
```vue
<script setup>
const currentPage = ref(1)
const postsPerPage = ref(5)

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage.value
  return allPosts.value.slice(start, start + postsPerPage.value)
})
</script>

<template>
  <article v-for="post in paginatedPosts" :key="post.id">
    {{ post.title }}
  </article>
</template>
```

## 📊 数据管理对比

### 原项目 - 直接操作DOM
```javascript
document.getElementById('blogCount').textContent = blogCount;
```

### Vue - 响应式数据
```vue
<script setup>
const blogStats = ref({ blogCount: 0 })
// 数据变化自动更新UI
</script>

<template>
  <span>{{ blogStats.blogCount }}</span>
</template>
```

## 🎨 样式迁移

### CSS变量保持不变
原项目的CSS变量可直接复用:
```css
:root {
  --primary-color: #4F46E5;
  --text-dark: #1F2937;
}

[data-theme="dark"] {
  --text-dark: #F9FAFB;
}
```

### Scoped样式
Vue组件支持scoped样式:
```vue
<style scoped>
.hero {
  background: var(--primary-color);
}
</style>
```

## 🔌 第三方库集成

### Markdown渲染 (Marked.js)

**原实现**:
```javascript
const htmlContent = marked.parse(markdownText);
container.innerHTML = htmlContent;
```

**Vue实现**:
```vue
<script setup>
import { marked } from 'marked'
const htmlContent = ref('')

const renderMarkdown = async (text) => {
  htmlContent.value = marked.parse(text)
}
</script>

<template>
  <div v-html="htmlContent"></div>
</template>
```

### MathJax数学公式

原配置可直接在index.html中使用,或在组件中按需加载:
```javascript
const loadMathJax = () => {
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
  document.head.appendChild(script)
}
```

## 🚀 性能优化

### 代码分割
Vue自动实现路由级代码分割:
```javascript
{
  path: '/blog',
  component: () => import('./views/Blog.vue')  // 懒加载
}
```

### 组件复用
```vue
<!-- 可复用的博客卡片组件 -->
<BlogCard v-for="post in posts" :post="post" />
```

## 📝 迁移检查清单

- [x] 所有页面迁移到Vue组件
- [x] 导航系统改用Vue Router
- [x] 主题系统迁移到Pinia Store
- [x] 语言系统迁移到Pinia Store
- [x] 表单改用v-model双向绑定
- [x] 事件监听改用Vue指令(@click等)
- [x] DOM操作改用响应式数据
- [x] CSS样式复用
- [x] 第三方库集成
- [x] 构建配置完成

## 🎯 下一步

1. **数据API集成**: 连接后端API获取博客数据
2. **SEO优化**: 使用vue-meta或@vueuse/head
3. **PWA支持**: 添加Service Worker
4. **i18n增强**: 使用vue-i18n替代自定义方案
5. **TypeScript**: 增加类型支持

## 📚 参考资源

- [Vue 3文档](https://cn.vuejs.org/)
- [Vue Router](https://router.vuejs.org/zh/)
- [Pinia](https://pinia.vuejs.org/zh/)
- [Vite](https://cn.vitejs.dev/)

---

迁移完成后,您将拥有一个现代化、高性能、易维护的Vue 3应用! 🎉
