<template>
  <div class="led-container">
    <!-- 网格背景 -->
    <div class="grid-background"></div>
    
    <!-- 滚动内容 -->
    <div class="scrolling-content">
      <div 
        v-for="(row, rowIndex) in displayRows" 
        :key="`row-${rowIndex}`"
        class="scroll-row"
        :style="{ 
          top: `${rowIndex * rowHeight}px`,
          animationDelay: `${rowIndex * 0.3}s`
        }"
      >
        <div class="scroll-text" :style="{ animationDuration: `${getAnimationDuration(rowIndex)}s` }">
          <span 
            v-for="(item, itemIndex) in row" 
            :key="`${item.timestamp}-${itemIndex}`"
            class="scroll-item"
          >
            {{ item.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LedDisplay',
  data() {
    return {
      allData: [],
      displayRows: [],
      maxRows: 8, // 基于160像素高度，最多8行比较合适
      rowHeight: 20 // 每行20像素高度
    }
  },
  mounted() {
    this.loadDataFromStorage()
    this.setupStorageListener()
    this.organizeDataIntoRows()
  },
  beforeDestroy() {
    window.removeEventListener('storage', this.handleStorageChange)
  },
  methods: {
    loadDataFromStorage() {
      try {
        const fitnessData = JSON.parse(localStorage.getItem('fitnessData') || '{}')
        this.allData = []
        
        Object.keys(fitnessData).forEach(date => {
          fitnessData[date].forEach(item => {
            this.allData.push({
              ...item,
              text: `${item.name} ${item.exercise} ${item.weight}KG ${item.reps}REP ${item.sets}SETS`
            })
          })
        })
        
        this.allData.sort((a, b) => b.timestamp - a.timestamp)
      } catch (error) {
        console.error('Error loading data from storage:', error)
        this.allData = []
      }
    },
    setupStorageListener() {
      window.addEventListener('storage', this.handleStorageChange)
      
      const originalSetItem = localStorage.setItem
      localStorage.setItem = (key, value) => {
        originalSetItem.call(localStorage, key, value)
        if (key === 'fitnessData') {
          this.handleStorageChange({ key, newValue: value })
        }
      }
    },
    handleStorageChange(event) {
      if (event.key === 'fitnessData') {
        this.loadDataFromStorage()
        this.organizeDataIntoRows()
      }
    },
    organizeDataIntoRows() {
      if (this.allData.length === 0) {
        this.displayRows = []
        return
      }
      
      this.displayRows = []
      const itemsPerRow = Math.ceil(this.allData.length / this.maxRows)
      
      for (let i = 0; i < this.maxRows; i++) {
        const rowData = []
        const startIndex = i * itemsPerRow
        
        for (let j = 0; j < itemsPerRow && (startIndex + j) < this.allData.length; j++) {
          const dataIndex = startIndex + j
          if (this.allData[dataIndex]) {
            rowData.push({
              ...this.allData[dataIndex],
              id: `${i}-${dataIndex}-${this.allData[dataIndex].timestamp}`
            })
          }
        }
        
        if (rowData.length > 0) {
          this.displayRows.push(rowData)
        }
      }
    },
    getAnimationDuration(rowIndex) {
      // 基于2880像素宽度调整滚动速度
      const baseDuration = 25
      const variations = [0, 3, -2, 5, -1, 4, -3, 6]
      return baseDuration + (variations[rowIndex % variations.length] || 0)
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'TextFont';
  src: url('@/static/font/REEJI.TTF') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'DigitalFont';
  src: url('@/static/font/DIGITAL.TTF') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.digital-font {
  font-family: 'DigitalFont';
}

.led-container {
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  position: relative;
  overflow: hidden;
  font-family: 'TextFont';
}

.grid-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 2px 2.2px; /* 基于像素密度调整网格大小 */
  z-index: 1;
}

.scrolling-content {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  padding: 0;
}

.scroll-row {
  position: absolute;
  left: 0;
  width: 100%;
  height: 20px; /* 基于160像素高度，每行20像素 */
  white-space: nowrap;
  overflow: hidden;
}

.scroll-text {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  animation: scrollRight linear infinite;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: 2px;
}

.scroll-item {
  display: inline-block;
  margin-right: 30px; /* 减少间距以适应更密集的显示 */
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
}

/* 从左向右滚动动画 */
@keyframes scrollRight {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100vw);
  }
}

/* LED点阵效果 */
.scroll-text {
  text-shadow: 
    0 0 3px #ffffff,
    0 0 6px #ffffff,
    0 0 9px #ffffff,
    0 0 12px #ffffff;
  filter: contrast(1.2) brightness(1.1);
}

/* 模拟LED点阵的像素化效果 */
.scroll-item {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

/* 添加LED闪烁效果 */
@keyframes ledGlow {
  0%, 100% {
    text-shadow: 
      0 0 3px #ffffff,
      0 0 6px #ffffff,
      0 0 9px #ffffff,
      0 0 12px #ffffff;
    opacity: 1;
  }
  50% {
    text-shadow: 
      0 0 2px #ffffff,
      0 0 4px #ffffff,
      0 0 6px #ffffff,
      0 0 8px #ffffff;
    opacity: 0.9;
  }
}

.scroll-text {
  animation: scrollRight linear infinite, ledGlow 4s ease-in-out infinite;
}
</style>