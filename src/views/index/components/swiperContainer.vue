<template>
  <swiper id="swiper-box" :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in indexColumn" :key="index">
      <pull-container :channel="item.classpath"></pull-container>
    </swiper-slide>
  </swiper>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
import pullContainer from './pullContainer'
export default {
  components: {
    pullContainer
  },
  data () {
    return {
      swiperOption: {
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        onSlideChangeStart: this.slideChangeCallBack,
        onSliderMove: this.slideMoveCallback,
        onTouchEnd: this.touchEndCallback
      }
    }
  },
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
    indexActive (val) {
      this.slideTo(300)
    }
  },
  methods: {
    ...mapMutations('index', [
      'set_indexActive',
      'set_indexSwiper'
    ]),

    // 让swiper移动到index栏目的位置
    slideTo (second) {
      console.log(this.activeMeta.index)
      this.$refs.mySwiper.swiper.slideTo(this.activeMeta.index, second, true)
      console.log('swiper', this.$refs.mySwiper.swiper.activeIndex)
    },

    // 滚动完swiper需要修改vuex的indexActive, 这是为了与栏目联动
    slideChangeCallBack (swiper) {
      let index = swiper.activeIndex
      this.set_indexActive(this.indexColumn[index].classpath)
    },

    // 移动的时候设置为true，这是为了移动时，不能下拉
    slideMoveCallback () {
      this.set_indexSwiper(true)
    },

    // 移动结束时设置为false，这是为了移动结束时，可以下拉
    touchEndCallback () {
      this.set_indexSwiper(false)
    }
  },
  mounted () {
    this.slideTo(0)
  }
}
</script>

<style lang='stylus'>
#swiper-box
  width 100%
  height 100%
  padding-top 80px
  background #fff
</style>
