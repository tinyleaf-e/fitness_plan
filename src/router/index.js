import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/list'
    },
    {
      path: '/list',
      name: '运动列表',
      component: () => import('../components/list.vue')
    },
    {
      path: '/detail',
      name: '开始运动',
      component: () => import('../components/detail.vue')
    }
  ]
})


export default router
