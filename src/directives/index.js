import Vue from 'vue'
import goTop from './goTop'

// 注册一个全局自定义指令 `v-goTop`
Vue.directive('goTop', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding, vnode) {
    if (binding.value) {
      goTop(el, binding.arg, vnode.context)
    } else {
      return ''
    }
  }
})
