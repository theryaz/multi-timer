import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

import { authGuard } from './guards/authGuard';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    component: LoginLayout,
    children:[
      {
        path: '/',
        component: Login,
        name: 'Login',
      }
    ]
  },
  {
    path: '/',
    component: AppLayout,
    children:[
      {
        path: '',
        name: 'Home',
        component: Home,
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach(authGuard);

export default router
