<template>
  <div id="indexHeader">
    <header>
      <div class="top-bar">
        <div class="abs-l"></div>
        <div class="abs-m">
          <a @click.stop="goTop" class="title">健康头条</a>
        </div>
        <div class="abs-r">
          <router-link to="/" class="btn-search"></router-link>
        </div>
      </div>
    </header>
    <nav>
      <div class="nav-ul">
        <a
          href="javascript:;"
          v-for="(item, index) in indexColumn"
          :key="index"
          :class="{active: item.classpath === indexActive}"
          @click="channelActive(item.classpath)"
        >
          {{ item.classname }}
        </a>
      </div>
      <div class="nav-more">
        <span class="line"></span>
        <a href="/" class="btn-more"></a>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import $ from 'jquery'
export default {
  computed: {

    ...mapState('index', [
      'indexActive',
      'indexColumn'
    ]),

    ...mapGetters('index', [
      'activeMeta'
    ])

  },
  watch: {
    indexActive () {
      this.slideTo(this.activeMeta.index)
    }
  },
  methods: {

    ...mapMutations('index', [
      'set_indexActive'
    ]),

    // 点击栏目需要改变vuex内的 currentChannel值，这是为了与swiper联动
    channelActive (val) {
      this.set_indexActive(val)
    },

    // 点击nav_ul栏目滚动，实现点击当前栏目位于导航中心
    slideTo (index) {
      this.$nextTick(() => {
        let container = $('.nav-ul') // 滚动容器
        let colum = $('.nav-ul a').eq(index) // active的元素
        if (colum) {
          let move // 移动的距离
          let containerWidth = container.width()
          let containerLeft = container.scrollLeft() // nav水平滚动条位置
          let columWidth = colum.width() // active元素的width
          let columLeft = colum.position().left // 距离左边的值
          let midWidth = (containerWidth - columWidth) / 2 // 中间点
          // 容器滚动为0，并且active栏目位于中间线左边？滚动值为0 ：当前容器滚动值 + （active栏目相对于中间线的值，有正负）
          if (containerWidth === 0 && columLeft <= midWidth) {
            move = 0
          } else {
            move = ~~(containerLeft + (columLeft - midWidth))
          }
          container.animate({'scrollLeft': move}, 300) // animate 动画
          sessionStorage.setItem('navScrollLeft', move) // 设置 sessionStorage move
        }
      })
    },

    // 恢复滚动
    scrollRecover () {
      let move = sessionStorage.getItem('navScrollLeft')
      if (move) {
        this.$nextTick(() => {
          $('.nav-ul').scrollLeft(move)
        })
      }
    },
    // 返回顶部
    goTop () {
      $(`#index .${this.indexActive}`).animate({scrollTop: 0})
    }
  },

  // keep-alive 组件激活时调用
  activated () {
    this.scrollRecover()
  }
}
</script>

<style lang="stylus">
#indexHeader
  position fixed
  top 0
  left 0
  right 0
  z-index 999
  overflow hidden
  header
    display block
    position relative
    background-color _themeColor
    color #fff
    .top-bar
      position relative
      height 44px
      line-height 44px
      .abs-l,.abs-m,.abs-r
        position absolute
        top 0
        width 44px
        height 100%
      .abs-l
        left 0
        z-index 1000
      .abs-m
        left 0
        width 100%
        z-index 999
      .abs-r
        right 0
        z-index 1000
      a
        display block
        width 100%
        height 100%
        color inherit
        font-size inherit
  nav
    position relative
    height 36px
    line-height 36px
    background-color #f4f5f6
    border-bottom 1px solid #ddd
    padding-right 40px
    .nav-ul
      white-space nowrap
      overflow-x auto
      font-size 0
      -webkit-overflow-scrolling touch
      &::-webkit-scrollbar
        width 0
        heihgt 0
      a
        display inline-block
        white-space nowrap
        font-size 16px
        height 36px
        line-height 36px
        padding 0 10px
        margin-left 5px
        color #505050
        -webkit-tap-highlight-color rgba(0, 0, 0, .3)
        &.active
          color _themeColor
          border-bottom 2px solid _themeColor
    .nav-more
      position absolute
      right 0
      top 0
      .btn-more
        display inline-block
        width 40px
        height 35px
      .line
        position absolute
        left -10px
        top 0
        display inline-block
        width 10px
        height 100%
</style>
<style>
#indexHeader .title{
  /* background: url(~@/assets/img/logo.png) no-repeat center center;
  background-size: 145px; */
  text-align: center;
  font-size: 24px;
}
.btn-search{
  background: url(~@/assets/img/search.png) no-repeat center center;
  background-size: 24px;
}
.btn-more{
  background: url(~@/assets/img/plus.png) no-repeat center center;
  background-size: 16px;
}
.line{
  background: url(~@/assets/img/shadow.png) no-repeat center center;
  background-size: 10px 35px;
}
</style>
