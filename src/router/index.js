import Vue from 'vue'
import VueRouter from 'vue-router'
//app下的一级组件
import Dashboard from '@/views/Dashboard.vue'

import Home from '@/views/Home.vue'
import Category from '@/views/Category.vue'
import Cart from '@/views/Cart.vue'
import Profile from '@/views/Profile.vue'
import Login from '@/views/Login.vue'


// 解决多次点击重复路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    redirect: '/dashboard/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'category',
        name: 'category',
        component: Category
      },
      {
        path: 'cart',
        name: 'cart',
        component: Cart
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile
      },
    ]
  },
  {
    // 登录
    path: '/login',
    name: 'login',
    component: Login
  },
  //下面这部分是因为最初做tabbaritem的组件的时候点击跳转事件将地址写死为组件中的title 
  //后续在重构时需要加入登录功能，因此多了一层dashboard组件路径，这里用重定向解决
  {
    path: '/home',
    redirect: '/dashboard/home'
  },
  {
    path: '/category',
    redirect: '/dashboard/category'
  },
  {
    path: '/cart',
    redirect: '/dashboard/cart'
  },
  {
    path: '/profile',
    redirect: '/dashboard/profile'
  },

]


const router = new VueRouter({
  routes,
  mode: 'history'
})
//路由守卫，检测是否登录
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (state.userInfo.token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
