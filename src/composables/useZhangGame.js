import { reactive } from 'vue'

/**
 * 找猫咪小游戏 Composable
 */
export function useZhangGame() {
  const gameState = reactive({
    cells: [],
    catPositions: [],
    found: [],
    attempts: 0,
    isOpen: false
  })

  const initGame = () => {
    // 创建3x3网格
    gameState.cells = Array(9).fill('')
    gameState.found = []
    gameState.attempts = 0

    // 随机放置3只猫咪
    const catPositions = []
    while (catPositions.length < 3) {
      const pos = Math.floor(Math.random() * 9)
      if (!catPositions.includes(pos)) {
        catPositions.push(pos)
      }
    }
    gameState.catPositions = catPositions
  }

  const playGame = () => {
    initGame()
    gameState.isOpen = true
  }

  const flipCell = (index) => {
    if (gameState.found.includes(index)) return

    gameState.attempts++

    if (gameState.catPositions.includes(index)) {
      gameState.cells[index] = '🐱'
      gameState.found.push(index)

      // 检查是否找到所有猫咪
      if (gameState.found.length === gameState.catPositions.length) {
        setTimeout(() => {
          alert(`恭喜你找到了所有猫咪! 🎉\n总共尝试了 ${gameState.attempts} 次!`)
          closeGame()
        }, 500)
      }
    } else {
      gameState.cells[index] = '❌'
      setTimeout(() => {
        gameState.cells[index] = ''
      }, 1000)
    }
  }

  const closeGame = () => {
    gameState.isOpen = false
  }

  const getCellClass = (index) => {
    if (gameState.found.includes(index)) {
      return 'found'
    }
    return ''
  }

  return {
    gameState,
    playGame,
    flipCell,
    closeGame,
    getCellClass
  }
}
