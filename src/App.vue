<template>
  <div id="app">
    <transition mode="out-in" :name="transitionName">
      <keep-alive exclude="List, Detail">
        <router-view class='child-view'></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: ''
    }
  },
  beforeRouteUpdate (to, from, next) {
    // console.log(to, from)
    // if (this.$route.path !== '/index') {
    //   this.$router.isBack = true
    // }
    let isBack = this.$router.isBack
    if (isBack) {
      this.transitionName = 'slide-right'
    } else {
      this.transitionName = 'slide-left'
    }
    this.$router.isBack = false
    next()
  }
}
</script>

<style lang='stylus'>
#app
  position relative
  width 100%
  height 100%
  background #f8f8f8
  overflow hidden
  .child-view
      transition all .3s ease

.content{
  width: 100%;
  height: 100%;
  padding-top: toRem(50);
  position: relative;
}

.container{
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}
</style>
