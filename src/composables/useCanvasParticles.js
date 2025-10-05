/**
 * Canvas 粒子效果系统
 * 使用单个 Canvas 渲染所有粒子，性能优化版本
 * 替代 DOM 操作的粒子系统
 */

import { ref, onMounted, onUnmounted } from 'vue'

export function useCanvasParticles() {
  const canvas = ref(null)
  const ctx = ref(null)
  const particles = ref([])
  const animationFrame = ref(null)

  // 粒子类
  class Particle {
    constructor(x, y, type, config = {}) {
      this.x = x
      this.y = y
      this.type = type // 'heart', 'sparkle', 'cat', 'rainbow'
      this.life = config.life || 2000
      this.createdAt = Date.now()
      this.vx = config.vx || (Math.random() - 0.5) * 2
      this.vy = config.vy || -Math.random() * 3 - 1
      this.rotation = 0
      this.rotationSpeed = (Math.random() - 0.5) * 0.1
      this.scale = config.scale || 1
      this.opacity = 1
      this.emoji = config.emoji || '✨'
    }

    update(deltaTime) {
      const age = Date.now() - this.createdAt
      const lifeRatio = age / this.life

      // 更新位置
      this.x += this.vx
      this.y += this.vy
      this.rotation += this.rotationSpeed

      // 重力效果（仅对部分类型）
      if (this.type === 'cat') {
        this.vy += 0.1
      }

      // 淡出效果
      if (lifeRatio > 0.7) {
        this.opacity = 1 - (lifeRatio - 0.7) / 0.3
      }

      // 缩放效果
      if (this.type === 'sparkle') {
        this.scale = 1 + Math.sin(age * 0.01) * 0.3
      }

      return age < this.life
    }

    draw(ctx) {
      ctx.save()
      ctx.globalAlpha = this.opacity
      ctx.translate(this.x, this.y)
      ctx.rotate(this.rotation)
      ctx.scale(this.scale, this.scale)
      ctx.font = '24px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(this.emoji, 0, 0)
      ctx.restore()
    }

    isDead() {
      return Date.now() - this.createdAt >= this.life
    }
  }

  // 初始化 Canvas
  function initCanvas(canvasElement) {
    canvas.value = canvasElement
    ctx.value = canvas.value.getContext('2d')

    // 设置 Canvas 大小
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 启动动画循环
    animate()
  }

  function resizeCanvas() {
    if (!canvas.value) return
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
  }

  // 动画循环
  function animate() {
    if (!ctx.value || !canvas.value) return

    // 清空画布
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)

    // 更新和绘制所有粒子
    particles.value = particles.value.filter(particle => {
      const alive = particle.update()
      if (alive) {
        particle.draw(ctx.value)
      }
      return alive
    })

    // 继续动画
    animationFrame.value = requestAnimationFrame(animate)
  }

  // 创建爱心轨迹
  function createHeartTrail(x, y) {
    const hearts = ['💕', '💖', '💗', '💝', '💘']
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const emoji = hearts[Math.floor(Math.random() * hearts.length)]
        particles.value.push(new Particle(
          x + (Math.random() - 0.5) * 40,
          y + (Math.random() - 0.5) * 40,
          'heart',
          {
            emoji,
            life: 2000,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 2 - 1
          }
        ))
      }, i * 100)
    }
  }

  // 创建闪光效果
  function createSparkles(x, y) {
    const sparkles = ['✨', '⭐', '🌟', '💫', '⚡']
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const emoji = sparkles[Math.floor(Math.random() * sparkles.length)]
        particles.value.push(new Particle(
          x + (Math.random() - 0.5) * 60,
          y + (Math.random() - 0.5) * 60,
          'sparkle',
          {
            emoji,
            life: 1500,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3
          }
        ))
      }, i * 80)
    }
  }

  // 猫咪雨效果
  function createCatRain() {
    const catEmojis = ['🐱', '😸', '😺', '😻', '🙀', '😿']
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const emoji = catEmojis[Math.floor(Math.random() * catEmojis.length)]
        const x = Math.random() * (canvas.value?.width || window.innerWidth)
        particles.value.push(new Particle(
          x,
          -50,
          'cat',
          {
            emoji,
            life: 3000,
            vx: 0,
            vy: 2 + Math.random() * 2
          }
        ))
      }, i * 100)
    }
  }

  // 浮动粒子效果
  function createFloatingParticle() {
    if (!canvas.value) return

    const emojis = ['🐱', '😸', '😺', '😻', '🐾', '💕', '🌸', '✨']
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    const x = Math.random() * canvas.value.width

    particles.value.push(new Particle(
      x,
      canvas.value.height + 50,
      'floating',
      {
        emoji,
        life: 12000,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -1 - Math.random() * 0.5,
        scale: 0.8 + Math.random() * 0.4
      }
    ))
  }

  // 彩虹特效（使用渐变背景）
  function createRainbow() {
    // 这个效果仍然使用 DOM 因为需要全屏渐变
    const rainbow = document.createElement('div')
    rainbow.className = 'rainbow-effect'
    rainbow.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg,
        rgba(255,0,0,0.1),
        rgba(255,165,0,0.1),
        rgba(255,255,0,0.1),
        rgba(0,128,0,0.1),
        rgba(0,0,255,0.1),
        rgba(75,0,130,0.1),
        rgba(238,130,238,0.1));
      pointer-events: none;
      z-index: 999;
      animation: rainbowShine 2s ease-out forwards;
    `
    document.body.appendChild(rainbow)
    setTimeout(() => rainbow.remove(), 2000)
  }

  // 清理函数
  function cleanup() {
    if (animationFrame.value) {
      cancelAnimationFrame(animationFrame.value)
    }
    window.removeEventListener('resize', resizeCanvas)
    particles.value = []
  }

  return {
    initCanvas,
    createHeartTrail,
    createSparkles,
    createCatRain,
    createFloatingParticle,
    createRainbow,
    cleanup
  }
}
