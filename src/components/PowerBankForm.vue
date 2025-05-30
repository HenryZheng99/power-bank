<template>
  <div class="power-bank-container">
    <div class="form-wrapper">
      <!-- 标题 -->
      <div class="title-section">
        <div class="corner-bracket top-left"></div>
        <div class="corner-bracket top-right"></div>
        <h1 class="title">POWER BANK</h1>
        <div class="corner-bracket bottom-left"></div>
        <div class="corner-bracket bottom-right"></div>
      </div>

      <!-- 表单 -->
      <form @submit.prevent="handleSubmit" class="form">
        <!-- 名字 -->
        <div class="form-group">
          <label class="label">名字</label>
          <input 
            v-model="formData.name"
            type="text" 
            class="input"
            placeholder=""
          />
        </div>

        <!-- 部位 -->
        <div class="form-group">
          <label class="label">部位</label>
          <select v-model="formData.bodyPart" class="select">
            <option value="">请选择部位</option>
            <option value="CHEST">胸部 CHEST</option>
            <option value="BACK">背部 BACK</option>
            <option value="SHOULDERS">肩部 SHOULDERS</option>
            <option value="ARMS">手臂 ARMS</option>
            <option value="ABS">腹部 ABS</option>
            <option value="HIPS">臀部 HIPS</option>
            <option value="LEGS">腿部 LEGS</option>
          </select>
        </div>

        <!-- 重量 -->
        <div class="form-group">
          <label class="label">重量</label>
          <input 
            v-model.number="formData.weight"
            type="number" 
            min="1"
            class="input"
            placeholder=""
          />
        </div>

        <!-- 次数 -->
        <div class="form-group">
          <label class="label">次数</label>
          <input 
            v-model.number="formData.reps"
            type="number" 
            min="1"
            class="input"
            placeholder=""
          />
        </div>

        <!-- 按钮 -->
        <div class="button-group">
          <button type="button" @click="handleDelete" class="btn btn-delete">
            DELETE
          </button>
          <button type="submit" class="btn btn-enter">
            ENTER
          </button>
        </div>
      </form>

      <!-- 语言切换 -->
      <div class="language-toggle">
        <span class="lang-option">EN</span>
        <span class="lang-option active">CN</span>
      </div>

      <!-- 导航链接 -->
      <div class="navigation">
        <router-link to="/show" class="nav-link">查看LED显示</router-link>
      </div>
    </div>

    <!-- 提交结果显示 -->
    <div v-if="submittedData" class="result">
      <h3>提交的数据：</h3>
      <p><strong>名字：</strong> {{ submittedData.name }}</p>
      <p><strong>部位：</strong> {{ submittedData.bodyPart }}</p>
      <p><strong>重量：</strong> {{ submittedData.weight }}kg</p>
      <p><strong>次数：</strong> {{ submittedData.reps }}次</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PowerBankForm',
  data() {
    return {
      formData: {
        name: '',
        bodyPart: '',
        weight: null,
        reps: null
      },
      submittedData: null
    }
  },
  methods: {
    handleSubmit() {
      // 验证表单
      if (!this.formData.name.trim()) {
        alert('请输入名字');
        return;
      }
      if (!this.formData.bodyPart) {
        alert('请选择部位');
        return;
      }
      if (!this.formData.weight || this.formData.weight <= 0) {
        alert('请输入有效的重量（正整数）');
        return;
      }
      if (!this.formData.reps || this.formData.reps <= 0) {
        alert('请输入有效的次数（正整数）');
        return;
      }

      // 提交数据
      this.submittedData = { ...this.formData };
      console.log('提交的数据:', this.submittedData);
      alert('数据提交成功！');
    },
    
    handleDelete() {
      // 清空表单
      this.formData = {
        name: '',
        bodyPart: '',
        weight: null,
        reps: null
      };
      this.submittedData = null;
      console.log('表单已清空');
    }
  }
}
</script>

<style scoped>
.power-bank-container {
  min-height: 100vh;
  background-color: #000;
  color: #ff4444;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.form-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin-top: 50px;
}

/* 标题样式 */
.title-section {
  position: relative;
  text-align: center;
  margin-bottom: 60px;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: 8px;
  margin: 0;
  color: #ff4444;
}

.corner-bracket {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 3px solid #ff4444;
}

.corner-bracket.top-left {
  top: -20px;
  left: 50px;
  border-right: none;
  border-bottom: none;
}

.corner-bracket.top-right {
  top: -20px;
  right: 50px;
  border-left: none;
  border-bottom: none;
}

.corner-bracket.bottom-left {
  bottom: -20px;
  left: 50px;
  border-right: none;
  border-top: none;
}

.corner-bracket.bottom-right {
  bottom: -20px;
  right: 50px;
  border-left: none;
  border-top: none;
}

/* 表单样式 */
.form {
  width: 100%;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  gap: 20px;
}

.label {
  color: #ff4444;
  font-size: 1.1rem;
  font-weight: bold;
  min-width: 60px;
  text-align: right;
}

.input, .select {
  flex: 1;
  height: 45px;
  background-color: #888;
  border: none;
  color: #000;
  font-size: 1rem;
  padding: 0 15px;
  border-radius: 0;
}

.input:focus, .select:focus {
  outline: 2px solid #ff4444;
  background-color: #aaa;
}

.select {
  cursor: pointer;
}

.select option {
  background-color: #888;
  color: #000;
}

/* 按钮样式 */
.button-group {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
}

.btn {
  padding: 12px 30px;
  background-color: transparent;
  border: 2px solid #ff4444;
  color: #ff4444;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  letter-spacing: 2px;
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: #ff4444;
  color: #000;
}

.btn:active {
  transform: scale(0.95);
}

/* 语言切换 */
.language-toggle {
  position: absolute;
  bottom: -100px;
  left: 0;
  display: flex;
  gap: 5px;
}

.lang-option {
  padding: 8px 12px;
  border: 1px solid #ff4444;
  cursor: pointer;
  font-size: 0.9rem;
}

.lang-option.active {
  background-color: #ff4444;
  color: #000;
}

.navigation {
  position: absolute;
  bottom: -150px;
  right: 0;
}

.nav-link {
  display: inline-block;
  padding: 10px 20px;
  border: 1px solid #ff4444;
  color: #ff4444;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #ff4444;
  color: #000;
}

/* 结果显示 */
.result {
  margin-top: 40px;
  padding: 20px;
  border: 1px solid #ff4444;
  background-color: rgba(255, 68, 68, 0.1);
  max-width: 500px;
  width: 100%;
}

.result h3 {
  margin-top: 0;
  color: #ff4444;
}

.result p {
  margin: 8px 0;
  color: #fff;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .title {
    font-size: 2rem;
    letter-spacing: 4px;
  }
  
  .form-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .label {
    min-width: auto;
    text-align: left;
  }
  
  .input, .select {
    width: 100%;
  }
  
  .button-group {
    flex-direction: column;
    gap: 15px;
  }
  
  .btn {
    width: 100%;
  }
}
</style>