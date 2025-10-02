<template>
  <div class="home">
    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1>你好，我是<span class="highlight">刘浩洋</span></h1>
          <p class="hero-description">
            一名热爱技术与创新的开发者，专注于前端开发和用户体验设计
          </p>
          <div class="hero-buttons">
            <a href="#projects" class="btn btn-primary">查看作品</a>
            <router-link to="/blog" class="btn btn-secondary">阅读博客</router-link>
            <router-link to="/resume" class="btn btn-secondary">查看简历</router-link>
          </div>
        </div>
        <div class="hero-image">
          <div class="avatar">
            <img src="https://via.placeholder.com/300x300/4F46E5/FFFFFF?text=LHY" alt="刘浩洋" loading="lazy">
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
      <div class="container">
        <div class="section-header">
          <h2>关于我</h2>
          <p>了解我的背景和技能</p>
        </div>
        <div class="about-content">
          <div class="about-text">
            <p>我是一名充满激情的开发者，致力于创造优秀的数字体验。我相信技术的力量能够改变世界，并通过代码来实现创意和想法。</p>
            <div class="skills">
              <h3>技能专长</h3>
              <div class="skill-tags">
                <span class="skill-tag">MPC</span>
                <span class="skill-tag">Rust</span>
                <span class="skill-tag">Python</span>
                <span class="skill-tag">Mathematica</span>
                <span class="skill-tag">LaTeX</span>
                <span class="skill-tag">Docker</span>
                <span class="skill-tag">Git</span>
                <span class="skill-tag">Linux</span>
              </div>
              <div style="margin-top: 2rem; text-align: center;">
                <router-link to="/resume" class="btn btn-primary">查看简历</router-link>
                <router-link to="/blog" class="btn btn-outline" style="margin-left: 1rem;">技术博客</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects">
      <div class="container">
        <div class="section-header">
          <h2>项目作品</h2>
          <p>我的一些精选项目</p>
        </div>
        <div class="projects-grid">
          <div class="project-card" v-for="project in projects" :key="project.id">
            <div class="project-image">
              <img :src="project.image" :alt="project.title">
            </div>
            <div class="project-content">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="project-tags">
                <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
              </div>
              <div class="project-links">
                <a href="#" class="btn btn-sm">演示</a>
                <a href="#" class="btn btn-sm btn-outline">代码</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
      <div class="container">
        <div class="section-header">
          <h2>联系我</h2>
          <p>让我们一起创造amazing的东西</p>
        </div>
        <div class="contact-content">
          <div class="contact-info">
            <div class="contact-item">
              <div class="contact-icon">📧</div>
              <div class="contact-text">
                <h3>邮箱</h3>
                <p>lhy200415@icloud.com</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">🐙</div>
              <div class="contact-text">
                <h3>GitHub</h3>
                <p>github.com/LHY-in-universe</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">💼</div>
              <div class="contact-text">
                <h3>LinkedIn</h3>
                <p>linkedin.com/in/yourprofile</p>
              </div>
            </div>
          </div>
          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">姓名</label>
              <input type="text" id="name" v-model="form.name" required>
            </div>
            <div class="form-group">
              <label for="email">邮箱</label>
              <input type="email" id="email" v-model="form.email" required>
            </div>
            <div class="form-group">
              <label for="message">消息</label>
              <textarea id="message" v-model="form.message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">发送消息</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    id: 1,
    title: '项目名称 1',
    description: '这是一个示例项目的描述，展示了我在前端开发方面的能力。',
    image: 'https://via.placeholder.com/400x250/6366F1/FFFFFF?text=Project+1',
    tags: ['React', 'CSS3']
  },
  {
    id: 2,
    title: '项目名称 2',
    description: '另一个展示我技术能力的项目，使用了现代化的开发技术栈。',
    image: 'https://via.placeholder.com/400x250/8B5CF6/FFFFFF?text=Project+2',
    tags: ['Vue.js', 'JavaScript']
  },
  {
    id: 3,
    title: '项目名称 3',
    description: '一个全栈应用项目，展示了我在后端开发方面的技能。',
    image: 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=Project+3',
    tags: ['Node.js', 'MongoDB']
  }
])

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  console.log('Form submitted:', form.value)
  alert('感谢您的留言！我会尽快回复您。')
  form.value = { name: '', email: '', message: '' }
}
</script>

<style scoped>
.home {
  padding-top: 70px;
}

.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.highlight {
  color: #FFD700;
}

.hero-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.avatar {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #4F46E5;
  margin-bottom: 0.5rem;
}

.about, .projects, .contact {
  padding: 4rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;
}

.skill-tag {
  background: #4F46E5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
}

.project-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.project-content {
  padding: 1.5rem;
}

.project-tags {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tag {
  background: #e5e7eb;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
}

.contact-icon {
  font-size: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  padding: 0.8rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-family: inherit;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  display: inline-block;
}

.btn-primary {
  background: #4F46E5;
  color: white;
}

.btn-primary:hover {
  background: #4338CA;
}

.btn-secondary {
  background: white;
  color: #4F46E5;
}

.btn-outline {
  background: transparent;
  border: 2px solid #4F46E5;
  color: #4F46E5;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .hero-content,
  .contact-content {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .avatar {
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }
}

[data-theme="dark"] .project-card {
  background: #1f2937;
  color: #e5e7eb;
}

[data-theme="dark"] .section-header h2 {
  color: #7C3AED;
}

[data-theme="dark"] .form-group input,
[data-theme="dark"] .form-group textarea {
  background: #374151;
  border-color: #4b5563;
  color: #e5e7eb;
}
</style>
