<template>
  <div class="wrapper">
      <div class="fitness-container">
    <!-- Header with corner frame decorations -->
    <div class="header">
      <!-- Top Left Corner -->
      <div class="corner-decoration top-left">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <!-- 横杠 -->
          <rect x="0" y="0" width="34" height="8" fill="#ff1744"/>
          <!-- L形直角 -->
          <rect x="0" y="12" width="8" height="30" fill="#ff1744"/>
          <rect x="0" y="12" width="30" height="8" fill="#ff1744"/>
        </svg>
      </div>
      
      <!-- Top Right Corner -->
      <div class="corner-decoration top-right">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <!-- 横杠 -->
          <rect x="26" y="0" width="34" height="8" fill="#ff1744"/>
         <!-- L形直角 -->
         <rect x="52" y="12" width="8" height="30" fill="#ff1744"/>
          <rect x="30" y="12" width="30" height="8" fill="#ff1744"/>
        </svg>
      </div>
      
      <h1 class="title english-text">POWER BANK</h1>
      
      <!-- Bottom Left Corner -->
      <div class="corner-decoration bottom-left">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <!-- L形直角 -->
          <rect x="0" y="18" width="8" height="30" fill="#ff1744"/>
          <rect x="0" y="40" width="30" height="8" fill="#ff1744"/>
          <!-- 横杠 -->
          <rect x="0" y="52" width="34" height="8" fill="#ff1744"/>
        </svg>
      </div>
      
      <!-- Bottom Right Corner -->
      <div class="corner-decoration bottom-right">
        <svg width="60" height="60" viewBox="0 0 60 60">
           <!-- L形直角 -->
           <rect x="52" y="18" width="8" height="30" fill="#ff1744"/>
          <rect x="30" y="40" width="30" height="8" fill="#ff1744"/>
          
          <!-- 横杠 -->
          <rect x="26" y="52" width="34" height="8" fill="#ff1744"/>
        </svg>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="submitForm" class="form">
      <!-- Name Field -->
      <div class="form-group">
        <label class="label"><span class="chinese-text">名字</span> <span class="english-text fz16">YOUR NAME</span></label>
        <input 
          v-model="formData.name" 
          type="text" 
          class="input-field"
          placeholder=""
        />
      </div>

      <!-- Exercise Field -->
      <div class="form-group">
        <label class="label"><span class="chinese-text">动作</span> <span class="english-text fz16">EXERCISE</span></label>
        <input 
          v-model="formData.exercise" 
          type="text" 
          class="input-field"
          placeholder=""
        />
      </div>

      <!-- Weight Field -->
      <div class="form-group weight-group">
        <label class="label"><span class="chinese-text">重量</span> <span class="english-text fz16">WEIGHT</span></label>
        <div class="weight-input-container">
          <input 
            v-model="formData.weight" 
            type="text" 
            class="input-field weight-input"
            placeholder=""
          />
          <span class="weight-unit">KG</span>
        </div>
      </div>

      <!-- Number Fields -->
      <div class="form-group number-group">
        <label class="label"><span class="chinese-text">数量</span> <span class="english-text fz16">NUMBER</span> </label>
        <div class="number-inputs">
          <div class="number-input-group">
            <input 
              v-model="formData.reps" 
              type="text" 
              class="input-field number-input"
              placeholder=""
            />
            <span class="number-label">REP</span>
          </div>
          <div class="number-input-group">
            <input 
              v-model="formData.sets" 
              type="text" 
              class="input-field number-input"
              placeholder=""
            />
            <span class="number-label">SETS</span>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="button-group">
        <button 
          type="button" 
          @click="clearForm" 
          class="btn btn-delete"
          :class="{ 'pressed': deletePressed }"
          @mousedown="deletePressed = true"
          @mouseup="deletePressed = false"
          @mouseleave="deletePressed = false"
        >
          DELETE
        </button>
        <button 
          type="submit" 
          class="btn btn-enter"
          :class="{ 'pressed': enterPressed }"
          @mousedown="enterPressed = true"
          @mouseup="enterPressed = false"
          @mouseleave="enterPressed = false"
        >
          ENTER
        </button>
      </div>
    </form>

    <!-- Success Message -->
    <div v-if="showSuccess" class="success-message">
      <div class="success-content">
        <div class="success-title">SUCCESS!</div>
        <div class="success-text">DATA SAVED</div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="showError" class="error-message">
      <div class="error-content">
        <div class="error-title">ERROR!</div>
        <div class="error-text">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
    <button 
      v-if="!isFullscreen"
      class="fullscreen-btn english-text"
      @click="toggleFullscreen"
      :class="{ 'pressed': fullscreenPressed }"
      @mousedown="fullscreenPressed = true"
      @mouseup="fullscreenPressed = false"
      @mouseleave="fullscreenPressed = false"
    >
      FULL
    </button>
  </div>
</template>

<script>
export default {
  name: 'FitnessForm',
  data() {
    return {
      formData: {
        name: '',
        exercise: '',
        weight: '',
        reps: '',
        sets: ''
      },
      showSuccess: false,
      showError: false,
      errorMessage: '',
      deletePressed: false,
      enterPressed: false,
      // 新增状态
      fullscreenPressed: false,
      isFullscreen: false,
    }
  },
  mounted() {
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('msfullscreenchange', this.handleFullscreenChange);
  },
  beforeDestroy() {
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('msfullscreenchange', this.handleFullscreenChange);
  },
  methods: {
    handleFullscreenChange() {
      this.isFullscreen = !!document.fullscreenElement;
    },
    toggleFullscreen() {
      if (!document.fullscreenElement) {
        // 进入全屏
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen()
        } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
          document.documentElement.webkitRequestFullscreen()
        } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
          document.documentElement.msRequestFullscreen()
        }
      } else {
        // 退出全屏（可选）
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) { /* Safari */
          document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) { /* IE11 */
          document.msExitFullscreen()
        }
      }
    },
    submitForm() {
      // 检查所有字段是否都已填写
      const requiredFields = ['name', 'exercise', 'weight', 'reps', 'sets']
      const emptyFields = requiredFields.filter(field => !this.formData[field].trim())

      if (emptyFields.length > 0) {
        this.errorMessage = 'Missing Info​'
        this.showError = true
        setTimeout(() => {
          this.showError = false
        }, 2000)
        return
      }

      // Convert all text inputs to uppercase
      const newData = {
        name: this.formData.name.toUpperCase(),
        exercise: this.formData.exercise.toUpperCase(),
        weight: this.formData.weight.toUpperCase(),
        reps: this.formData.reps.toUpperCase(),
        sets: this.formData.sets.toUpperCase(),
        timestamp: Date.now() // 使用时间戳格式
      }
      
      // Get current date as key (YYYY-MM-DD format)
      const currentDate = new Date().toISOString().split('T')[0]
      
      // Get existing data from localStorage
      const existingData = JSON.parse(localStorage.getItem('fitnessData') || '{}')
      
      // Initialize current date array if it doesn't exist
      if (!existingData[currentDate]) {
        existingData[currentDate] = []
      }
      
      // Add new data to current date array
      existingData[currentDate].push(newData)
      
      // Clean up data older than 60 days
      this.cleanupOldData(existingData, currentDate)
      
      // Save back to localStorage
      localStorage.setItem('fitnessData', JSON.stringify(existingData))
      
      // Show success message
      this.showSuccess = true
      setTimeout(() => {
        this.showSuccess = false
      }, 2000)
      
      // Clear form after submission
      this.clearForm()
    },
    cleanupOldData(data, currentDate) {
      const currentDateObj = new Date(currentDate)
      const maxDays = 60
      const datesToDelete = []
      
      // Find dates that are older than 60 days
      Object.keys(data).forEach(dateKey => {
        const dateObj = new Date(dateKey)
        const daysDifference = Math.floor((currentDateObj - dateObj) / (1000 * 60 * 60 * 24))
        
        if (daysDifference > maxDays) {
          datesToDelete.push(dateKey)
        }
      })
      
      // Delete old dates (FIFO - First In, First Out)
      datesToDelete.forEach(dateKey => {
        delete data[dateKey]
        console.log(`Deleted old data for date: ${dateKey}`)
      })
      
      return data
    },
    viewStoredData() {
      const data = JSON.parse(localStorage.getItem('fitnessData') || '{}')
      console.log('Stored fitness data:', data)
      return data
    },
    getTotalRecords() {
      const data = JSON.parse(localStorage.getItem('fitnessData') || '{}')
      let total = 0
      Object.values(data).forEach(dayData => {
        total += dayData.length
      })
      return total
    },
    clearForm() {
      this.formData = {
        name: '',
        exercise: '',
        weight: '',
        reps: '',
        sets: ''
      }
    }
  }
}
</script>

<style scoped>

@font-face {
font-family: 'ChineseFont';
src: url('@/static/font/3665.TTF') format('truetype');
font-weight: normal;
font-style: normal;
font-display: swap;
}
@font-face {
font-family: 'EnglishFont';
src: url('@/static/font/MODERNIZ.OTF') format('opentype');
font-weight: normal;
font-style: normal;
font-display: swap;
}

/* 应用中文字体 */
.chinese-text {
font-family: 'ChineseFont', 'Microsoft YaHei', 'SimHei', sans-serif;
}

/* 应用英文字体 */
.english-text {
font-family: 'EnglishFont', 'Arial Black', Arial, sans-serif;
white-space: nowrap;
}
.wrapper {
  font-family: 'Arial Black', Arial, sans-serif;
  font-weight: normal;
  height: 100vh;
  background-color: #000000;
  font-size: 18px;
  color: white;
  position: relative;
}
.fullscreen-btn {
  position: fixed;
  right: 20px;
  bottom: 10px;
  z-index: 1000;
  background: none;
  border: 1px solid #666;
  color: #666;
  padding: 4px 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  letter-spacing: 1px;
  opacity: 0.5;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-btn:hover {
  opacity: 0.8;
  transform: scale(1.1);
}

.fullscreen-btn.pressed {
  transform: scale(0.9);
  opacity: 0.7;
}

.fitness-container {
  position: absolute; left: 50%; top: 50%;
transform: translate(-50%, -50%); 
}

.header {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 60px;
  position: relative;
}

.title {
  color: #ff1744;
  letter-spacing: 2px;
  margin-bottom: 80px;
  font-weight: 900;
  font-size: 44px;
}

.corner-decoration {
  position: absolute;
}

.top-left {
  top: -40px;
  left: 50%;
  transform: translateX(-300px);
}

.top-right {
  top: -40px;
  right: 50%;
  transform: translateX(300px);
}

.bottom-left {
  bottom: -40px;
  left: 50%;
  transform: translateX(-300px);
}

.bottom-right {
  bottom: -40px;
  right: 50%;
  transform: translateX(300px);
}

.form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
}

.label {
  color: #ff1744;
  width: 240px;
  text-align: left;
  letter-spacing: 2px;
  font-size: 22px;
  .english-text {
      font-size: 18px;
  }
}

.input-field {
  background-color: #666666;
  border: none;
  color: white;
  height: 44px;
  padding: 15px 20px;
  flex:1;
  outline: none;
  font-family: inherit;
  font-size: 20px;
  font-family: 'ChineseFont';
  font-weight: normal;
  letter-spacing: 2px;
}

.input-field::placeholder {
  color: #cccccc;
}

.weight-group .input-field {
  flex: 1;
  margin-right: 0;
}

.weight-input-container {
  display: flex;
  align-items: center;
  flex: 1;
}

.weight-input {
  flex: 1;
  margin-right: 20px;
}

.weight-unit {
  color: #ff1744;
  font-weight: bold;
  letter-spacing: 2px;
  padding-left: 10px;
}

.number-group {
  align-items: flex-start;
}

.number-inputs {
  display: flex;
  gap: 40px;
  flex: 1;
}

.number-input-group {
  display: flex;
  align-items: center;
  gap: 20px;
}

.number-input {
  width: 80px;
  text-align: center;
}

.number-label {
  color: #ff1744;
  font-weight: bold;
  letter-spacing: 2px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 60px;
}

.btn {
  font-family: 'EnglishFont';
  padding: 20px 40px;
  border: none;
  cursor: pointer;
  letter-spacing: 3px;
  font-family: inherit;
  transition: all 0.1s ease;
  font-size: 18px;
  box-shadow: 0 6px 0 rgba(0,0,0,0.3);
}

.btn:active,
.btn.pressed {
  transform: translateY(3px);
  box-shadow: 0 3px 0 rgba(0,0,0,0.3);
}

.btn-delete {
  background-color: #888888;
  color: white;
}

.btn-delete:hover {
  background-color: #999999;
}

.btn-enter {
  background-color: #ff1744;
  color: white;
}

.btn-enter:hover {
  background-color: #ff3366;
}

.success-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.9);
  border: 3px solid #ff1744;
  padding: 40px;
  text-align: center;
  z-index: 1000;
}

.success-title {
  color: #ff1744;
  font-weight: bold;
  letter-spacing: 4px;
  margin-bottom: 10px;
}

.success-text {
  color: white;
  font-weight: bold;
  letter-spacing: 2px;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
    letter-spacing: 4px;
  }
  
  .form-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .label {
    width: 100%;
  }
  
  .input-field {
    width: 100%;
  }
  
  .number-inputs {
    width: 100%;
    justify-content: space-between;
  }
  
  .button-group {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  
  .btn {
    width: 200px;
  }
}

.error-message {
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: rgba(0, 0, 0, 0.9);
border: 3px solid #ff4444;
padding: 40px;
text-align: center;
z-index: 1000;
}

.error-title {
color: #ff4444;
font-weight: bold;
letter-spacing: 4px;
margin-bottom: 10px;
}

.error-text {
color: white;
font-weight: bold;
letter-spacing: 2px;
}
</style>