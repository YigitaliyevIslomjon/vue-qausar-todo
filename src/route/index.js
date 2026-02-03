// core
import { createWebHistory, createRouter } from 'vue-router'
// components
import AboutView from '@/pages/User.vue'

const routes = [
  { 
    name: 'users',
    path: '/', 
    component: AboutView 
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})