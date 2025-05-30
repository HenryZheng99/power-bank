<template>
  <div class="led-container">
    <!-- LED网格背景 -->
    <div class="led-grid"></div>
    
    <!-- 滚动字幕容器 -->
    <div class="marquee-container">
      <div class="marquee-content" ref="marqueeContent">
        <div class="marquee-line" v-for="(line, index) in displayLines" :key="index">
          <span class="marquee-text" :style="getAnimationStyle(index)">
            {{ line }}
          </span>
        </div>
      </div>
    </div>

    <!-- 返回按钮 -->
    <div class="back-button">
      <button @click="goBack" class="btn-back">返回表单</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LEDDisplay',
  data() {
    return {
      baseText: '杠铃深蹲 1300KG 哑铃弓步蹲 960KG 罗马尼亚硬拉 2100KG',
      displayLines: [],
      lineCount: 8,
      animationDuration: 30 // 秒
    }
  },
  mounted() {
    this.generateDisplayLines()
    this.startAnimation()
  },
  methods: {
    generateDisplayLines() {
      // 生成多行滚动文本，每行稍有不同的起始位置
      for (let i = 0; i < this.lineCount; i++) {
        let line = ''
        // 每行重复文本多次以确保连续滚动
        for (let j = 0; j < 10; j++) {
          line += this.baseText + '    '
        }
        this.displayLines.push(line)
      }
    },
    
    getAnimationStyle(lineIndex) {
      // 每行有不同的动画延迟，创造错位效果
      const delay = lineIndex * 2
      return {
        animationDelay: `-${delay}s`,
        animationDuration: `${this.animationDuration}s`
      }
    },
    
    startAnimation() {
      // 动画已通过CSS实现，这里可以添加额外的控制逻辑
      console.log('LED滚动字幕已启动')
    },
    
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.led-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* LED网格背景 */
.led-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 1;
}

/* 添加LED点效果 */
.led-grid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle at center, rgba(0, 255, 0, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 10px 10px;
}

/* 滚动字幕容器 */
.marquee-container {
  position: relative;
  width: 100%;
  height: 60%;
  z-index: 2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.marquee-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.marquee-line {
  width: 100%;
  height: calc(100% / 8);
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
}

.marquee-text {
  display: inline-block;
  white-space: nowrap;
  font-family: 'Courier New', monospace;
  font-size: 2.5rem;
  font-weight: bold;
  color: #00ff00;
  text-shadow: 
    0 0 5px #00ff00,
    0 0 10px #00ff00,
    0 0 15px #00ff00,
    0 0 20px #00ff00;
  animation: scrollLeft linear infinite;
  letter-spacing: 3px;
}

/* 滚动动画 */
@keyframes scrollLeft {
  0% {
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* 返回按钮 */
.back-button {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 3;
}

.btn-back {
  padding: 12px 24px;
  background-color: rgba(0, 255, 0, 0.2);
  border: 2px solid #00ff00;
  color: #00ff00;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 5px #00ff00;
}

.btn-back:hover {
  background-color: rgba(0, 255, 0, 0.4);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
  transform: scale(1.05);
}

.btn-back:active {
  transform: scale(0.95);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .marquee-text {
    font-size: 1.5rem;
    letter-spacing: 2px;
  }
  
  .led-grid {
    background-size: 15px 15px;
  }
  
  .led-grid::before {
    background-size: 15px 15px;
    background-position: 7.5px 7.5px;
  }
  
  .btn-back {
    font-size: 0.9rem;
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  .marquee-text {
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
  
  .led-grid {
    background-size: 12px 12px;
  }
  
  .led-grid::before {
    background-size: 12px 12px;
    background-position: 6px 6px;
  }
}

/* 增强LED效果 */
.marquee-text::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 255, 0, 0.1) 50%,
    transparent 100%
  );
  animation: scanLine 2s linear infinite;
  pointer-events: none;
}

@keyframes scanLine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>