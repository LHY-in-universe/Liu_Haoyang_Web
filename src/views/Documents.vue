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
    title: 'DSMC 研究论文',
    description: 'Direct Simulation Monte Carlo 方法研究',
    date: '2024-12-19',
    category: '学术论文',
    url: '/Liu_Haoyang_Web/documents/academic/DSMC.pdf'
  },
  {
    id: 2,
    title: 'DSMC 修订版',
    description: 'DSMC 研究论文修订版本',
    date: '2024-12-20',
    category: '学术论文',
    url: '/Liu_Haoyang_Web/documents/academic/DSMC_re.pdf'
  },
  {
    id: 3,
    title: 'MLQM 研究',
    description: '机器学习与量子力学交叉研究',
    date: '2024-10-20',
    category: '学术论文',
    url: '/Liu_Haoyang_Web/documents/academic/MLQM.pdf'
  },
  {
    id: 4,
    title: 'PhD Review',
    description: '博士研究综述文档',
    date: '2024-11-10',
    category: '学术论文',
    url: '/Liu_Haoyang_Web/documents/academic/phdreview.pdf'
  },
  {
    id: 5,
    title: 'QMC 研究',
    description: '量子蒙特卡洛方法研究',
    date: '2024-11-15',
    category: '学术论文',
    url: '/Liu_Haoyang_Web/documents/academic/QMC.pdf'
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
  border-radius: 0 0 32px 32px;
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
  border-radius: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.document-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(79, 70, 229, 0.15);
  border-color: #4f46e5;
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
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #4f46e5;
  color: white;
}

.btn-primary:hover {
  background: #4338ca;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

[data-theme='dark'] .document-card {
  background: #1f2937;
  color: #e5e7eb;
  border-color: #374151;
}

[data-theme='dark'] .document-card:hover {
  border-color: #7c3aed;
}
</style>
