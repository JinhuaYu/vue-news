import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

Router.prototype.go = function () {
  this.isBack = true
  window.history.go(-1)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/index',
      component: App,
      children: [
        {
          path: '/index',
          name: 'Index',
          component: () => import('@/views/index/Index')
        },
        {
          path: '/detail',
          name: 'Detail',
          component: () => import('@/views/detail/Detail')
        }
      ]
    }
  ]
})
