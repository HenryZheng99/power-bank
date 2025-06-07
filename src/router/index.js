import Vue from 'vue'
import VueRouter from 'vue-router'
import PowerBankForm from '@/views/Form.vue'
import LEDDisplay from '@/views/LED.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PowerBankForm
  },
  {
    path: '/show',
    name: 'LEDDisplay',
    component: LEDDisplay
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router