<template>
  <div class="documents">
    <section class="page-header">
      <div class="container">
        <h1>文档管理系统</h1>
        <p>学术论文、技术博客与研究文档</p>
      </div>
    </section>

    <section class="documents-section">
      <div class="container">
        <div class="documents-grid">
          <div class="document-card" v-for="doc in documents" :key="doc.id">
            <div class="document-icon">📄</div>
            <h3>{{ doc.title }}</h3>
            <p>{{ doc.description }}</p>
            <div class="document-meta">
              <span>{{ doc.date }}</span>
              <span>{{ doc.category }}</span>
            </div>
            <a :href="doc.url" class="btn btn-primary" target="_blank">查看文档</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const documents = ref([
  {
    id: 1,
    title: 'Berry相位理论研究',
    description: '关于Berry相位的理论研究文档',
    date: '2024-12-19',
    category: 'academic',
    url: '#'
  },
  {
    id: 2,
    title: '光学探测磁共振技术',
    description: 'ODMR技术应用研究',
    date: '2025-02-07',
    category: 'academic',
    url: '#'
  }
])
</script>

<style scoped>
.documents {
  padding-top: 70px;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.documents-section {
  padding: 3rem 2rem;
}

.documents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.document-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.document-card:hover {
  transform: translateY(-10px);
}

.document-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.document-meta {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #4F46E5;
  color: white;
}

.btn-primary:hover {
  background: #4338CA;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

[data-theme="dark"] .document-card {
  background: #1f2937;
  color: #e5e7eb;
}
</style>
