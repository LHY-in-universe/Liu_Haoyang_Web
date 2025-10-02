/**
 * 粒子特效 Composable
 * 用于张昊岩页面的各种特效动画
 */

export function useParticleEffects() {
  // 创建爱心轨迹
  const createHeartTrail = (event) => {
    const hearts = ['💕', '💖', '💗', '💝', '💘']
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const heart = document.createElement('div')
        heart.className = 'heart-trail'
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
        heart.style.left = (event.clientX + Math.random() * 40 - 20) + 'px'
        heart.style.top = (event.clientY + Math.random() * 40 - 20) + 'px'
        document.body.appendChild(heart)

        setTimeout(() => {
          heart.remove()
        }, 2000)
      }, i * 100)
    }
  }

  // 创建闪光效果
  const createSparkles = (event) => {
    const sparkles = ['✨', '⭐', '🌟', '💫', '⚡']
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div')
        sparkle.className = 'sparkle'
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)]
        sparkle.style.left = (event.clientX + Math.random() * 60 - 30) + 'px'
        sparkle.style.top = (event.clientY + Math.random() * 60 - 30) + 'px'
        document.body.appendChild(sparkle)

        setTimeout(() => {
          sparkle.remove()
        }, 1500)
      }, i * 80)
    }
  }

  // 猫咪雨效果
  const createCatRain = () => {
    const catEmojis = ['🐱', '😸', '😺', '😻', '🙀', '😿']
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const cat = document.createElement('div')
        cat.className = 'cat-rain'
        cat.textContent = catEmojis[Math.floor(Math.random() * catEmojis.length)]
        cat.style.left = Math.random() * 100 + 'vw'
        cat.style.animationDelay = Math.random() * 2 + 's'
        document.body.appendChild(cat)

        setTimeout(() => cat.remove(), 3000)
      }, i * 100)
    }
  }

  // 彩虹特效
  const createRainbow = () => {
    const rainbow = document.createElement('div')
    rainbow.className = 'rainbow-effect'
    document.body.appendChild(rainbow)

    setTimeout(() => rainbow.remove(), 2000)
  }

  // 创建浮动猫咪
  const createFloatingCats = (container) => {
    const catEmojis = ['🐱', '😸', '😺', '😻', '🐾', '💕', '🌸', '✨']

    const interval = setInterval(() => {
      const cat = document.createElement('div')
      cat.className = 'floating-cat'
      cat.textContent = catEmojis[Math.floor(Math.random() * catEmojis.length)]
      cat.style.left = Math.random() * 100 + 'vw'
      cat.style.animationDuration = (Math.random() * 10 + 8) + 's'
      cat.style.animationDelay = Math.random() * 2 + 's'
      container.appendChild(cat)

      setTimeout(() => {
        cat.remove()
      }, 12000)
    }, 3000)

    return interval
  }

  // 随机闪光效果
  const createRandomSparkles = () => {
    const interval = setInterval(() => {
      createSparkles({
        clientX: Math.random() * window.innerWidth,
        clientY: Math.random() * window.innerHeight
      })
    }, 5000)

    return interval
  }

  return {
    createHeartTrail,
    createSparkles,
    createCatRain,
    createRainbow,
    createFloatingCats,
    createRandomSparkles
  }
}
