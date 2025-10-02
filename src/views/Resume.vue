<template>
  <div class="resume">
    <section class="page-header">
      <div class="container">
        <h1>个人简历</h1>
        <p>刘浩洋 - 物理学研究者</p>
      </div>
    </section>

    <div class="resume-container">
      <div class="container">
        <div class="resume-header">
          <h1 class="resume-name">刘浩洋</h1>
        </div>

        <div class="download-section">
          <h3>📄 完整简历PDF版本</h3>
          <p>下载完整的PDF简历文件，包含所有详细信息和联系方式</p>
          <a href="/public/documents/resume/main.pdf" class="btn-download" download>
            <span class="download-icon">📥</span>
            下载完整简历
          </a>
        </div>

        <div class="resume-section">
          <h2 class="section-title">个人简介</h2>
          <p class="summary-text">
            香港中文大学物理系本科应届毕业生，有计算机模拟相关经验，毕业设计为使用C语言对冷原子物理体系进行模拟。
            熟练使用Python、C、Linux，学习过R、Java的相关课程。自学机器学习与强化学习，理解CNN、RNN、随机森林、Q-learning、蒙特卡洛等算法，可以使用PyTorch包。
          </p>
        </div>

        <div class="resume-section">
          <h2 class="section-title">教育经历</h2>
          <div class="education-item">
            <div class="education-header">
              <div>
                <div class="degree">物理学硕士</div>
                <div class="institution">香港中文大学</div>
              </div>
              <div class="date-location">
                <div>香港, 中国</div>
                <div>09/2025 - 目前</div>
              </div>
            </div>
          </div>

          <div class="education-item">
            <div class="education-header">
              <div>
                <div class="degree">物理理学士</div>
                <div class="institution">香港中文大学</div>
              </div>
              <div class="date-location">
                <div>香港, 中国</div>
                <div>09/2021 - 06/2025</div>
              </div>
            </div>
          </div>
        </div>

        <div class="resume-section">
          <h2 class="section-title">专业技能</h2>
          <div class="skills-grid">
            <div class="skill-category">
              <h4>计算机语言</h4>
              <div class="skill-tags">
                <span class="skill-tag">Python</span>
                <span class="skill-tag">C</span>
                <span class="skill-tag">LaTeX</span>
                <span class="skill-tag">R</span>
                <span class="skill-tag">Java</span>
              </div>
            </div>
            <div class="skill-category">
              <h4>系统与软件</h4>
              <div class="skill-tags">
                <span class="skill-tag">Linux</span>
                <span class="skill-tag">GitHub</span>
                <span class="skill-tag">Docker</span>
                <span class="skill-tag">PyTorch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resume {
  padding-top: 70px;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.resume-container {
  padding: 3rem 2rem;
}

.resume-header {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(124, 58, 237, 0.05));
  border-radius: 15px;
  margin-bottom: 3rem;
}

.resume-name {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #4F46E5, #7C3AED);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.download-section {
  text-align: center;
  padding: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  margin: 2rem 0;
  color: white;
}

.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.btn-download:hover {
  transform: translateY(-3px) scale(1.05);
}

.resume-section {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1.6rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4F46E5, #7C3AED);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
}

.education-item {
  margin-bottom: 2rem;
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.degree {
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.institution {
  color: #666;
  margin-top: 0.3rem;
}

.date-location {
  text-align: right;
  color: #888;
  font-size: 0.9rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.skill-category {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #4F46E5;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.8rem;
}

.skill-tag {
  background: #4F46E5;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

[data-theme="dark"] .skill-category {
  background: #374151;
}

[data-theme="dark"] .degree {
  color: #e5e7eb;
}
</style>
