import Vue from 'vue'
import VueRouter from 'vue-router'
import { Home, Login } from './assembly'

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode:'history',
  routes
})
//  全局路由守卫
router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem('user') && to.fullPath !== '/login') {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router
