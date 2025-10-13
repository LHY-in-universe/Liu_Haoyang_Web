<template>
  <div class="resume">
    <!-- Hero Header -->
    <section class="hero-header">
      <div class="container">
        <h1 class="name-title">LIU HAOYANG</h1>
        <p class="subtitle">刘浩洋 · 物理学研究者</p>

        <!-- Contact Info -->
        <div class="contact-bar">
          <a href="tel:+8613305340115" class="contact-item">
            <span class="icon">📱</span>
            <span>+86 133 0534 0115</span>
          </a>
          <a href="mailto:lhy200415@icloud.com" class="contact-item">
            <span class="icon">✉️</span>
            <span>lhy200415@icloud.com</span>
          </a>
          <a href="https://github.com/LHY-in-universe" target="_blank" class="contact-item">
            <span class="icon">💻</span>
            <span>GitHub</span>
          </a>
          <div class="contact-item">
            <span class="icon">📍</span>
            <span>深圳，中国</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <a :href="resumePdfUrl" download class="btn btn-download">
            <span class="btn-icon">📥</span>
            下载简历
          </a>
          <a :href="resumePdfUrl" target="_blank" class="btn btn-view">
            <span class="btn-icon">👁️</span>
            查看PDF
          </a>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="resume-content">
      <div class="container">
        <!-- Summary -->
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon">👤</span>
            个人简介
          </h2>
          <div class="card">
            <p class="summary-text">
              香港中文大学物理系硕士研究生，专注于计算物理与机器学习交叉领域研究。具有丰富的物理系统数值模拟经验，熟练使用Python、C、Linux进行科学计算。自学机器学习与强化学习相关算法，可以使用PyTorch等深度学习框架。预计硕士期间进行机器学习与固体物理方面的交叉研究。
            </p>
          </div>
        </section>

        <!-- Education -->
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon">🎓</span>
            教育经历
          </h2>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content card">
                <div class="timeline-header">
                  <div class="timeline-left">
                    <h3 class="degree-title">物理学硕士</h3>
                    <p class="institution">香港中文大学 · 香港，中国</p>
                  </div>
                  <div class="timeline-date">09/2025 - 目前</div>
                </div>
                <ul class="course-list">
                  <li>预计相关课程：机器学习与人工智能、高等统计力学</li>
                </ul>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content card">
                <div class="timeline-header">
                  <div class="timeline-left">
                    <h3 class="degree-title">理学学士 (物理学)</h3>
                    <p class="institution">香港中文大学 · 香港，中国</p>
                  </div>
                  <div class="timeline-date">09/2021 - 06/2025</div>
                </div>
                <ul class="course-list">
                  <li>核心课程：高等固体物理、计算物理、高等量子力学、统计力学、量子力学</li>
                  <li>数学与计算：数值分析、偏微分方程、线性代数、复变函数</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Skills -->
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon">💻</span>
            专业技能
          </h2>
          <div class="skills-grid">
            <div class="skill-card card">
              <h3 class="skill-category-title">
                <span class="category-icon">⚡</span>
                编程语言
              </h3>
              <div class="skill-group">
                <p class="skill-level">精通</p>
                <div class="skill-tags">
                  <span class="skill-tag primary">Python</span>
                  <span class="skill-tag primary">C</span>
                  <span class="skill-tag primary">LaTeX</span>
                  <span class="skill-tag primary">Markdown</span>
                </div>
              </div>
              <div class="skill-group">
                <p class="skill-level">熟悉</p>
                <div class="skill-tags">
                  <span class="skill-tag secondary">R</span>
                  <span class="skill-tag secondary">Java</span>
                  <span class="skill-tag secondary">SQL</span>
                  <span class="skill-tag secondary">Julia</span>
                </div>
              </div>
            </div>

            <div class="skill-card card">
              <h3 class="skill-category-title">
                <span class="category-icon">🛠️</span>
                工具与系统
              </h3>
              <div class="skill-tags">
                <span class="skill-tag primary">Linux</span>
                <span class="skill-tag primary">GitHub</span>
                <span class="skill-tag primary">Docker</span>
                <span class="skill-tag primary">Mathematica</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Experience -->
        <section class="section">
          <h2 class="section-title">
            <span class="title-icon">🔬</span>
            科研经历
          </h2>
          <div class="timeline">
            <!-- Project 1 -->
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content card">
                <div class="timeline-header">
                  <div class="timeline-left">
                    <h3 class="project-title">冷原子物理高斯势井蒸发冷却模拟</h3>
                    <p class="project-meta">严教授，CUHK</p>
                  </div>
                  <div class="timeline-date">05/2024 - 12/2024</div>
                </div>
                <ul class="project-details">
                  <li><strong>研究背景：</strong>针对冷原子物理中蒸发冷却过程的数值模拟难题，开发高效精确的模拟算法</li>
                  <li><strong>方法开发：</strong>实现基于C语言的分子动力学(MD)模拟程序，采用Velocity Verlet算法确保能量守恒与相空间稳定性；开发直接模拟蒙特卡洛(DSMC)方法，结合octree空间自适应划分算法提升计算效率</li>
                  <li><strong>研究成果：</strong>系统比对MD、DSMC与实验数据，验证DSMC方法在冷原子模拟中的适用性，为该领域提供了一种兼具速度与精度的新型算法框架</li>
                </ul>
              </div>
            </div>

            <!-- Project 2 -->
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content card">
                <div class="timeline-header">
                  <div class="timeline-left">
                    <h3 class="project-title">计算物理模拟与物理知识演讲</h3>
                    <p class="project-meta">严教授，CUHK</p>
                  </div>
                  <div class="timeline-date">09/2023 - 01/2024</div>
                </div>
                <ul class="project-details">
                  <li><strong>计算方法实践：</strong>使用Python实现拉普拉斯方程数值求解、傅立叶变换及亥姆霍兹分解；掌握有限差分法求解常微分方程与偏微分方程</li>
                  <li><strong>量子模拟算法：</strong>实现量子蒙特卡洛(QMC)方法，包括扩散蒙特卡洛(DMC)和变分蒙特卡洛(VMC)，成功求解量子体系基态能量与波函数，计算结果与理论预测高度吻合</li>
                  <li><strong>先进算法应用：</strong>学习并应用神经网络与张量网络算法于物理系统，使用矩阵乘积态(MPS)模拟一维固体物理体系</li>
                  <li><strong>理论研究：</strong>深入研究拓扑绝缘体理论，包括陈数计算、Z₂拓扑绝缘体分类及三维拓扑相分类，并进行学术报告</li>
                </ul>
              </div>
            </div>

            <!-- Project 3 -->
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content card">
                <div class="timeline-header">
                  <div class="timeline-left">
                    <h3 class="project-title">使用差分动态显微镜观察细菌运动</h3>
                    <p class="project-meta">吴教授，CUHK</p>
                  </div>
                  <div class="timeline-date">06/2023 - 08/2023</div>
                </div>
                <ul class="project-details">
                  <li><strong>实验设计：</strong>制备细菌样本并通过暗场显微镜成像，使用NIS Elements Viewer采集高质量视频数据</li>
                  <li><strong>数据分析：</strong>开发基于Python和MATLAB的差分动态显微镜(DDM)分析程序，定量测量细菌运动的扩散系数和动力学参数</li>
                  <li><strong>学术交流：</strong>使用LaTeX制作研究海报并进行学术报告，与教授及同行讨论实验结果与改进方案</li>
                </ul>
              </div>
            </div>

            <!-- Project 4 -->
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content card">
                <div class="timeline-header">
                  <div class="timeline-left">
                    <h3 class="project-title">验证狭义相对论的能量动量方程</h3>
                    <p class="project-meta">吴教授，CUHK</p>
                  </div>
                  <div class="timeline-date">02/2023 - 05/2023</div>
                </div>
                <ul class="project-details">
                  <li><strong>实验测量：</strong>在超低温环境下利用放射性衰变过程，精确测量β粒子的能量-动量关系</li>
                  <li><strong>数据验证：</strong>使用Mathematica进行数据拟合与统计分析，实验结果成功验证了狭义相对论的能量-动量方程</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const resumePdfUrl = ref('/Liu_Haoyang_Web/documents/resume/main.pdf')
</script>

<style scoped>
/* Base Styles */
.resume {
  min-height: 100vh;
  background: var(--bg-light);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Header */
.hero-header {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%);
  color: #1f2937;
  padding: 5rem 2rem 4rem;
  text-align: center;
  margin-top: 70px;
  border-radius: 0 0 32px 32px;
}

.name-title {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 2.5rem;
  opacity: 0.95;
}

/* Contact Bar */
.contact-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.7);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1f2937;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
}

.contact-item .icon {
  font-size: 1.2rem;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn-download {
  background: white;
  color: #4f46e5;
}

.btn-download:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.3);
}

.btn-view {
  background: #4f46e5;
  color: white;
  border: 2px solid #4f46e5;
}

.btn-view:hover {
  background: #3730a3;
  border-color: #3730a3;
  transform: translateY(-3px);
}

.btn-icon {
  font-size: 1.2rem;
}

/* Main Content */
.resume-content {
  padding: 4rem 0;
}

.section {
  margin-bottom: 4rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2rem;
  padding-bottom: 0.75rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: #4f46e5;
  border-radius: 2px;
}

.title-icon {
  font-size: 2.2rem;
}

/* Card */
.card {
  overflow: hidden;
}

/* Summary */
.summary-text {
  line-height: 1.9;
  color: #374151;
  font-size: 1.05rem;
  margin: 0;
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #4f46e5 0%, #7c3aed 100%);
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -2.625rem;
  top: 1.5rem;
  width: 1.25rem;
  height: 1.25rem;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  border-radius: 50%;
  border: 3px solid #f9fafb;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  z-index: 1;
}

.timeline-content {
  margin-left: 1.5rem;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.timeline-left {
  flex: 1;
}

.degree-title,
.project-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.institution,
.project-meta {
  color: #6b7280;
  font-size: 1rem;
}

.timeline-date {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);
}

.course-list,
.project-details {
  list-style: none;
  padding: 0;
  margin: 0;
}

.course-list li,
.project-details li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.7;
  color: #4b5563;
}

.course-list li::before,
.project-details li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #4f46e5;
  font-weight: 700;
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.skill-card {
  padding: 2rem;
}

.skill-category-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.category-icon {
  font-size: 1.5rem;
}

.skill-group {
  margin-bottom: 1.5rem;
}

.skill-group:last-child {
  margin-bottom: 0;
}

.skill-level {
  font-size: 0.9rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.skill-tag {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.skill-tag.primary {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
}

.skill-tag.secondary {
  background: #e0e7ff;
  color: #4f46e5;
  border: 1px solid #c7d2fe;
}

.skill-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(79, 70, 229, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .name-title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .contact-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .contact-item {
    justify-content: center;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .timeline {
    padding-left: 1.5rem;
  }

  .timeline-marker {
    left: -2.375rem;
  }

  .timeline-content {
    margin-left: 1rem;
  }

  .timeline-header {
    flex-direction: column;
  }

  .timeline-date {
    align-self: flex-start;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }
}

/* Dark Mode - Unified Background */
[data-theme='dark'] .resume {
  background: var(--bg-white);
}

[data-theme='dark'] .section-title {
  color: var(--text-medium);
}

[data-theme='dark'] .summary-text,
[data-theme='dark'] .course-list li,
[data-theme='dark'] .project-details li {
  color: var(--text-light);
}

[data-theme='dark'] .degree-title,
[data-theme='dark'] .project-title,
[data-theme='dark'] .skill-category-title {
  color: var(--text-medium);
}

[data-theme='dark'] .institution,
[data-theme='dark'] .project-meta,
[data-theme='dark'] .skill-level {
  color: var(--text-lighter);
}

[data-theme='dark'] .skill-tag.secondary {
  background: var(--bg-white);
  color: var(--secondary-light);
  border-color: var(--border-color);
}

[data-theme='dark'] .timeline-marker {
  border-color: var(--border-color);
}

/* 深色模式 - Hero Header */
[data-theme='dark'] .hero-header {
  background: linear-gradient(135deg, var(--bg-white) 0%, var(--bg-light) 50%, var(--bg-lighter) 100%);
  color: var(--text-dark);
}

[data-theme='dark'] .contact-bar {
  background: rgba(31, 41, 55, 0.5);
  border-color: rgba(75, 85, 99, 0.5);
}

[data-theme='dark'] .contact-item {
  color: var(--text-medium);
}

[data-theme='dark'] .contact-item:hover {
  background: rgba(75, 85, 99, 0.5);
}

[data-theme='dark'] .btn-download {
  background: var(--bg-light);
  color: var(--secondary-light);
}

[data-theme='dark'] .btn-view {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}
</style>
