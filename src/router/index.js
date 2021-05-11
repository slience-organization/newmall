import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      tabbarShow: true
    }
  },
  {
    path: '/category',
    name: 'Category',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "category" */ 'views/category/Category.vue'),
    meta: {
      tabbarShow: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */ 'views/cart/Cart.vue'),
    meta: {
      tabbarShow: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ 'views/profile/Profile.vue'),
    meta: {
      tabbarShow: true
    }
  },
  {
    path: '/goodsdetail',
    name: 'GoodsDetail',
    component: () => import(/* webpackChunkName: "goodsdetail" */ 'business/goods/GoodsDetail.vue'),
    meta: {
      tabbarShow: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
