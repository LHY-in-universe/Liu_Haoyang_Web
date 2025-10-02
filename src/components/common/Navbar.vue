<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo">
        <router-link to="/">{{ t('name') }}</router-link>
      </div>

      <ul class="nav-menu" :class="{ active: mobileMenuOpen }">
        <li class="nav-item">
          <router-link to="/" class="nav-link" @click="closeMobileMenu">
            {{ t('home') }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/blog" class="nav-link" @click="closeMobileMenu">
            {{ t('blog') }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/documents" class="nav-link" @click="closeMobileMenu">
            {{ t('documents') }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/resume" class="nav-link" @click="closeMobileMenu">
            {{ t('resume') }}
          </router-link>
        </li>
      </ul>

      <ThemeToggle />

      <div
        class="nav-toggle"
        :class="{ active: mobileMenuOpen }"
        @click="toggleMobileMenu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useLanguageStore } from '../../stores/language'
import ThemeToggle from './ThemeToggle.vue'

const languageStore = useLanguageStore()
const { t } = languageStore
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  padding: 1rem 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.nav-logo a {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4F46E5;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-logo a:hover {
  color: #7C3AED;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #4F46E5;
}

.nav-link.router-link-active {
  color: #4F46E5;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 2px;
  background: #4F46E5;
  border-radius: 2px;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  padding: 0.5rem;
}

.bar {
  width: 25px;
  height: 3px;
  background: #333;
  border-radius: 3px;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background: white;
    width: 100%;
    text-align: center;
    transition: left 0.3s ease;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding: 2rem 0;
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-toggle {
    display: flex;
  }

  .nav-toggle.active .bar:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
  }

  .nav-toggle.active .bar:nth-child(2) {
    opacity: 0;
  }

  .nav-toggle.active .bar:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
  }
}

[data-theme="dark"] .navbar {
  background: rgba(31, 41, 55, 0.95);
}

[data-theme="dark"] .nav-link {
  color: #e5e7eb;
}

[data-theme="dark"] .bar {
  background: #e5e7eb;
}

[data-theme="dark"] .nav-menu {
  background: #1f2937;
}
</style>
