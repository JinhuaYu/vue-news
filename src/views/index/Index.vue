<template>
  <div id="index">
    <!-- 头部 -->
    <index-header></index-header>
    <!-- 内容 -->
    <swiper-container></swiper-container>
    <!-- 底部 -->
    <!-- <indexFooter></indexFooter> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import indexHeader from './components/indexHeader'
import indexFooter from './components/indexFooter'
import swiperContainer from './components/swiperContainer'
import { mapActions } from 'vuex'
export default {
  components: {
    indexHeader,
    indexFooter,
    swiperContainer
  },
  methods: {
    ...mapActions('index', [
      'get_indexColumn_data'
    ])
  },
  created () {
    this.get_indexColumn_data()
  }
}
</script>

<style>
#index {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
