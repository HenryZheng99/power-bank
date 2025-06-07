<template>
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
        
        <h1 class="title">POWER BANK</h1>
        
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
          <label class="label">名字 YOUR NAME</label>
          <input 
            v-model="formData.name" 
            type="text" 
            class="input-field"
            placeholder=""
          />
        </div>
  
        <!-- Exercise Field -->
        <div class="form-group">
          <label class="label">动作 EXERCISE</label>
          <input 
            v-model="formData.exercise" 
            type="text" 
            class="input-field"
            placeholder=""
          />
        </div>
  
        <!-- Weight Field -->
        <div class="form-group weight-group">
          <label class="label">重量 WEIGHT</label>
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
          <label class="label">数量 NUMBER</label>
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
          <div class="success-text">WORKOUT DATA SAVED</div>
        </div>
      </div>
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
        deletePressed: false,
        enterPressed: false
      }
    },
    methods: {
      submitForm() {
        // Convert all text inputs to uppercase
        const dataToSave = {
          name: this.formData.name.toUpperCase(),
          exercise: this.formData.exercise.toUpperCase(),
          weight: this.formData.weight.toUpperCase(),
          reps: this.formData.reps.toUpperCase(),
          sets: this.formData.sets.toUpperCase(),
          timestamp: new Date().toISOString()
        }
        
        // Save to localStorage
        const existingData = JSON.parse(localStorage.getItem('fitnessData') || '[]')
        existingData.push(dataToSave)
        localStorage.setItem('fitnessData', JSON.stringify(existingData))
        
        // Show success message
        this.showSuccess = true
        setTimeout(() => {
          this.showSuccess = false
        }, 2000)
        
        // Clear form after submission
        this.clearForm()
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
  .fitness-container {
    min-height: 100vh;
    background-color: #000000;
    color: white;
    font-family: 'Arial Black', Arial, sans-serif;
    font-weight: bold;
    padding: 40px 20px;
    position: relative;
  }
  
  .header {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 60px;
    position: relative;
  }
  
  .title {
    font-size: 4rem;
    color: #ff1744;
    letter-spacing: 8px;
    margin: 0;
    font-weight: 900;
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
    margin-bottom: 30px;
    display: flex;
    align-items: center;
  }
  
  .label {
    color: #ff1744;
    font-size: 1.2rem;
    font-weight: bold;
    width: 200px;
    text-align: left;
    letter-spacing: 2px;
  }
  
  .input-field {
    background-color: #666666;
    border: none;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 15px 20px;
    outline: none;
    font-family: inherit;
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
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 2px;
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
    font-size: 1.2rem;
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
    font-size: 1.5rem;
    font-weight: bold;
    padding: 20px 40px;
    border: none;
    cursor: pointer;
    letter-spacing: 3px;
    font-family: inherit;
    transition: all 0.1s ease;
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
    animation: fadeInOut 2s ease-in-out;
  }
  
  .success-title {
    color: #ff1744;
    font-size: 2.5rem;
    font-weight: bold;
    letter-spacing: 4px;
    margin-bottom: 10px;
  }
  
  .success-text {
    color: white;
    font-size: 1.2rem;
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
  </style>