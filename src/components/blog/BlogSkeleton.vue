<template>
  <div class="blog-skeleton">
    <!-- 骨架屏卡片 -->
    <div v-for="n in count" :key="n" class="skeleton-card">
      <div class="skeleton-badge"></div>
      <div class="skeleton-header">
        <div class="skeleton-title"></div>
        <div class="skeleton-meta">
          <div class="skeleton-meta-item"></div>
          <div class="skeleton-meta-item"></div>
        </div>
      </div>
      <div class="skeleton-excerpt">
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
      <div class="skeleton-footer">
        <div class="skeleton-tags">
          <div class="skeleton-tag"></div>
          <div class="skeleton-tag"></div>
          <div class="skeleton-tag"></div>
        </div>
        <div class="skeleton-read-more"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    default: 3
  }
})
</script>

<style scoped>
.blog-skeleton {
  display: grid;
  gap: 2rem;
}

.skeleton-card {
  background: var(--bg-white);
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow);
  position: relative;
  border: 2px solid transparent;
}

.skeleton-badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 100px;
  height: 28px;
  border-radius: 20px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-header {
  margin-bottom: 1rem;
  padding-right: 120px;
}

.skeleton-title {
  height: 32px;
  width: 70%;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.skeleton-meta {
  display: flex;
  gap: 1.5rem;
}

.skeleton-meta-item {
  height: 20px;
  width: 100px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-excerpt {
  margin-bottom: 1.5rem;
}

.skeleton-line {
  height: 16px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.skeleton-line.short {
  width: 60%;
}

.skeleton-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skeleton-tags {
  display: flex;
  gap: 0.5rem;
}

.skeleton-tag {
  height: 24px;
  width: 60px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 15px;
}

.skeleton-read-more {
  height: 20px;
  width: 80px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* 深色模式 */
[data-theme="dark"] .skeleton-card {
  background: var(--bg-white);
}

[data-theme="dark"] .skeleton-badge,
[data-theme="dark"] .skeleton-title,
[data-theme="dark"] .skeleton-meta-item,
[data-theme="dark"] .skeleton-line,
[data-theme="dark"] .skeleton-tag,
[data-theme="dark"] .skeleton-read-more {
  background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
  background-size: 200% 100%;
}
</style>
