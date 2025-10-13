<template>
  <div class="zhang-haoyan-page" :data-zhang-theme="localTheme">
    <!-- 返回主页按钮 -->
    <router-link to="/" class="back-to-home">
      <span>🏠</span>
      <span>返回主页</span>
    </router-link>

    <!-- 主题切换按钮 -->
    <button class="theme-toggle" @click="toggleLocalTheme">
      <div class="theme-toggle-slider">
        <span class="theme-toggle-icon">{{ localTheme === 'dark' ? '☀️' : '🌙' }}</span>
      </div>
    </button>

    <!-- Canvas 粒子效果容器 -->
    <canvas ref="particleCanvas" class="particle-canvas"></canvas>

    <div class="container">
      <div class="header">
        <h1>
          <span class="cat-emoji" @click="handleHeartTrail">🐱</span>
          张昊岩
          <span class="cat-emoji" @click="handleHeartTrail">😸</span>
        </h1>
        <p class="subtitle">欢迎来到我的可爱小世界 ✨</p>
      </div>

      <div class="main-content">
        <!-- 个人资料区 -->
        <div class="profile-section">
          <div class="profile-image" @click="handleSparkles">
            <img
              src="https://via.placeholder.com/200x200/FFB6C1/FFFFFF?text=ZHY"
              alt="张昊岩"
              loading="lazy"
              @error="onImageError"
            />
          </div>
          <div class="description">
            你好呀！我是张昊岩 🌸<br />
            一个热爱生活、喜欢小猫咪的女孩子 💕<br />
            这里是我的个人小窝，充满了温暖和可爱 🏡<br />
            希望你在这里能感受到快乐和治愈 ✨
          </div>
        </div>

        <!-- 猫咪画廊 -->
        <div class="cat-gallery">
          <div
            v-for="(cat, index) in catEmojis"
            :key="index"
            class="cat-item"
            @click="handleCatClick($event, cat.sound)"
          >
            {{ cat.emoji }}
          </div>
        </div>

        <!-- 互动功能区 -->
        <div class="fun-section">
          <h3>🎮 有趣互动区</h3>

          <div class="interactive-buttons">
            <button class="fun-btn" @click="startCatRain">🌧️ 猫咪雨</button>
            <button class="fun-btn" @click="toggleMusic">🎵 背景音乐</button>
            <button class="fun-btn" @click="changeTheme">🎨 换个主题</button>
            <button class="fun-btn" @click="showMessage">💌 惊喜消息</button>
            <button class="fun-btn" @click="createRainbow">🌈 彩虹特效</button>
            <button
              class="fun-btn"
              @click="openGame"
            >
              🎯 小游戏
            </button>
          </div>

          <!-- 心情指数 -->
          <div class="mood-meter">
            <h4>😊 张昊岩的心情指数</h4>
            <div class="mood-bar">
              <div class="mood-fill" :style="{ width: moodWidth }">
                <span class="mood-text">超级开心! 💕</span>
              </div>
            </div>
          </div>

          <!-- 访客计数器 -->
          <div class="visitor-counter">
            <h4>👥 今日访问者</h4>
            <div class="counter-display">{{ visitorCount }}</div>
            <p>
              你是第 <span>{{ visitorCount }}</span> 位小可爱!
            </p>
          </div>

          <!-- 每日一句 -->
          <div class="quote-section">
            <h4>📝 每日一句</h4>
            <div class="daily-quote">{{ currentQuote }}</div>
            <button class="mini-btn" @click="changeQuote">🔄 换一句</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 游戏模态框 -->
    <div v-if="gameState.isOpen" class="game-modal" @click.self="closeGame">
      <div class="game-content">
        <h3>🎯 找到所有的猫咪!</h3>
        <div class="game-grid">
          <button
            v-for="(cell, index) in gameState.cells"
            :key="index"
            class="game-cell"
            :class="getCellClass(index)"
            @click="flipCell(index)"
          >
            {{ cell }}
          </button>
        </div>
        <button class="fun-btn" @click="closeGame">关闭游戏</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCanvasParticles } from '../composables/useCanvasParticles'
import { useZhangGame } from '../composables/useZhangGame'

// Composables
const {
  initCanvas,
  createHeartTrail,
  createSparkles,
  createCatRain,
  createFloatingParticle,
  createRainbow,
  cleanup: cleanupParticles
} = useCanvasParticles()

const { gameState, playGame, flipCell, closeGame, getCellClass } = useZhangGame()

// Refs
const particleCanvas = ref(null)
const localTheme = ref(localStorage.getItem('zhang-haoyan-theme') || 'light')
const currentThemeIndex = ref(0)
const visitorCount = ref(Math.floor(Math.random() * 100) + 1)
const isPlaying = ref(false)
const quoteIndex = ref(0)
const moodWidth = ref('0%')

// 数据
const themes = ['default', 'theme-dark', 'theme-ocean', 'theme-sunset']
const themeNames = ['粉色梦幻', '深夜模式', '海洋清新', '日落温暖']

const quotes = [
  '生活就像猫咪一样，需要用心去感受每一个温暖的瞬间 🐱💕',
  '每个人心中都有一只小猫咪，等待着被温柔对待 🌸',
  '世界再大，也要保持一颗纯真可爱的心 ✨',
  '开心的时候像猫咪一样打滚，难过的时候像猫咪一样晒太阳 ☀️',
  '愿你永远都是那个会为小美好而感动的人 💖',
  '生活需要一些粉色的浪漫和猫咪般的慵懒 🌈'
]

const catEmojis = [
  { emoji: '🐱', sound: 'meow1' },
  { emoji: '😸', sound: 'meow2' },
  { emoji: '😺', sound: 'purr' },
  { emoji: '😻', sound: 'meow3' },
  { emoji: '🙀', sound: 'hiss' },
  { emoji: '😿', sound: 'cry' }
]

const sounds = {
  meow1: '喵~',
  meow2: '喵喵~',
  purr: '呼噜呼噜~',
  meow3: '喵呜~',
  hiss: '嘶~',
  cry: '呜呜~'
}

// Computed
const currentQuote = computed(() => quotes[quoteIndex.value])

// Methods
const handleHeartTrail = (event) => {
  createHeartTrail(event.clientX, event.clientY)
}

const handleSparkles = (event) => {
  createSparkles(event.clientX, event.clientY)
}

const toggleLocalTheme = () => {
  localTheme.value = localTheme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('zhang-haoyan-theme', localTheme.value)
}

const onImageError = (e) => {
  e.target.style.display = 'none'
  e.target.parentElement.innerHTML = '😺'
}

const handleCatClick = (event, soundType) => {
  const element = event.currentTarget
  element.classList.add('click-animation')

  const rect = element.getBoundingClientRect()
  createHeartTrail(rect.left + rect.width / 2, rect.top + rect.height / 2)

  playSound(soundType)

  setTimeout(() => {
    element.classList.remove('click-animation')
  }, 500)
}

const playSound = (soundType) => {
  const soundFeedback = document.createElement('div')
  soundFeedback.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 105, 180, 0.9);
    color: white;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 1.2rem;
    z-index: 10000;
    animation: soundPop 1s ease-out forwards;
  `
  soundFeedback.textContent = sounds[soundType] || '喵~'
  document.body.appendChild(soundFeedback)

  setTimeout(() => soundFeedback.remove(), 1000)
}

const startCatRain = () => {
  createCatRain()
}

const openGame = () => {
  gameState.isOpen = true
  playGame()
}

const toggleMusic = () => {
  isPlaying.value = !isPlaying.value
  showFeedback(isPlaying.value ? '🎵 音乐已开启!' : '🔇 音乐已关闭!', 'right')
}

const changeTheme = () => {
  currentThemeIndex.value = (currentThemeIndex.value + 1) % themes.length
  document.body.className = 'entrance-animation ' + themes[currentThemeIndex.value]
  showFeedback(`🎨 切换到: ${themeNames[currentThemeIndex.value]}`, 'left')
}

const showMessage = () => {
  const messages = [
    '你真是太可爱啦! 🥰',
    '张昊岩今天超级开心! 💕',
    '感谢你来到我的小窝! 🏡',
    '你是最棒的访客! ✨',
    '希望你也像猫咪一样快乐! 😸',
    '世界因为有你而更美好! 🌸'
  ]

  const message = messages[Math.floor(Math.random() * messages.length)]
  const modal = document.createElement('div')
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20000;
    animation: fadeIn 0.3s ease-out;
  `

  const content = document.createElement('div')
  content.style.cssText = `
    background: linear-gradient(135deg, #FFB6C1, #FF69B4);
    padding: 40px;
    border-radius: 30px;
    text-align: center;
    color: white;
    font-size: 1.5rem;
    max-width: 400px;
    animation: bounceIn 0.5s ease-out;
  `
  content.innerHTML = `
    <div style="font-size: 3rem; margin-bottom: 20px;">💌</div>
    <div>${message}</div>
    <button onclick="this.parentElement.parentElement.remove()"
            style="margin-top: 20px; background: white; color: #FF69B4;
                   border: none; padding: 10px 20px; border-radius: 20px;
                   cursor: pointer; font-size: 1rem;">知道啦! 💕</button>
  `

  modal.appendChild(content)
  document.body.appendChild(modal)
}

const showFeedback = (text, position = 'right') => {
  const feedback = document.createElement('div')
  const posStyle = position === 'right' ? 'right: 20px;' : 'left: 20px;'
  feedback.style.cssText = `
    position: fixed;
    top: 20px;
    ${posStyle}
    background: linear-gradient(45deg, #FF69B4, #FFB6C1);
    color: white;
    padding: 15px 25px;
    border-radius: 25px;
    font-size: 1rem;
    z-index: 10000;
    animation: slideIn${position === 'right' ? 'Right' : 'Left'} 0.5s ease-out;
  `
  feedback.innerHTML = text
  document.body.appendChild(feedback)

  setTimeout(() => feedback.remove(), 2000)
}

const changeQuote = () => {
  quoteIndex.value = Math.floor(Math.random() * quotes.length)
}

// 定时器
let floatingInterval = null

// 生命周期
onMounted(() => {
  // 初始化 Canvas 粒子系统
  if (particleCanvas.value) {
    initCanvas(particleCanvas.value)
  }

  // 启动浮动粒子
  floatingInterval = setInterval(() => {
    createFloatingParticle()
  }, 3000)

  // 心情指数动画
  setTimeout(() => {
    moodWidth.value = '95%'
  }, 1000)

  // 页面进入动画
  setTimeout(() => {
    document.body.style.animation = 'none'
  }, 2000)
})

onUnmounted(() => {
  // 清理定时器和 Canvas
  if (floatingInterval) clearInterval(floatingInterval)
  cleanupParticles()
})
</script>

<style scoped>
@import '../styles/zhang-haoyan.css';
@import '../styles/particle-canvas.css';
</style>
