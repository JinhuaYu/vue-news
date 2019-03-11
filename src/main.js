// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// css
import '@/assets/css/reset.css'
import '@/assets/css/transition.css' // 过度动画
import '@/assets/css/global.css'
import animate from 'animate.css'

// 第三方库
import MintUI from 'mint-ui' // 饿了么移动端UI组件
import 'mint-ui/lib/style.css' // mint-ui css
import VueAwesomeSwiper from 'vue-awesome-swiper' // 轮播
import 'swiper/dist/css/swiper.css'

// FortAwesomeIcon
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEllipsisH, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 自定义组件
import myHeader from '@/components/Header' // 自定义header
import List from '@/components/List' // 文章列表
import Info from '@/components/Info' // 文章信息
import myLoading from '@/components/Loading' // loading组件

import '@/directives' // 自定义指令

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(VueAwesomeSwiper)
Vue.use(animate)

// 注册全局组件
Vue.component('myHeader', myHeader)
Vue.component('List', List)
Vue.component('newsInfo', Info)
Vue.component('myLoading', myLoading)

// FortAwesomeIcon
library.add(faEllipsisH, faChevronLeft, faPlayCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
