<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <p>
          &copy; 2024 刘浩洋. 保留所有权利.
          <router-link to="/zhang-haoyan" class="hidden-cat-btn" title="🐱">🐱</router-link>
        </p>
        <div class="social-links">
          <a href="https://github.com/LHY-in-universe" aria-label="GitHub" target="_blank">🐙</a>
          <a href="#" aria-label="LinkedIn">💼</a>
          <a href="mailto:lhy200415@icloud.com" aria-label="Email">📧</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 0;
  margin-top: 4rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-links a {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
  text-decoration: none;
}

.social-links a:hover {
  transform: translateY(-3px);
}

.hidden-cat-btn {
  opacity: 0.3;
  transition: opacity 0.3s ease;
  text-decoration: none;
  margin-left: 0.5rem;
}

.hidden-cat-btn:hover {
  opacity: 1;
  transform: scale(1.2);
  display: inline-block;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>
