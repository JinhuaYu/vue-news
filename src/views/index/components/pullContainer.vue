<template>
  <!--
    mint.ui 无限滚动指令
    infinite-scroll-disabled 若为真，则无限滚动不会被触发
    infinite-scroll-distance 触发加载方法的滚动距离阈值（像素）
    infinite-scroll-immediate-check 若为真，则指令被绑定到元素上后会立即检查是否需要执行加载方法。在初始状态下内容有可能撑不满容器时十分有用。
  -->
  <div class="container" :class="channel" v-infinite-scroll="loadBottomAjax" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
    <!-- 请求提示 -->
    <my-loading :visible="loading" :reload:="init"></my-loading>

    <!-- 顶部提示 -->
    <div class="globalTip">
      <div class="dataCount">已为你推荐{{dataCount}}条数据</div>
      <div class="noNewData">没有最新内容了</div>
      <div class="requestFail">网络请求失败，请检查网络</div>
    </div>

    <!-- 下拉加载 -->
    <mt-loadmore ref="loadmore" :top-method="loadTopAjax" @top-status-change="handleTopChange" :auto-fill='false' :distance="indexSwiper">
      <!-- 下拉提示 -->
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus == 'pull'"><img class="pullLoading" src="~@/assets/img/loading.png" alt=""> 下拉刷新↓</span>
        <span v-show="topStatus == 'drop'"><img class="pullLoading" src="~@/assets/img/loading.png" alt=""> 释放更新↑</span>
        <span v-show="topStatus == 'loading'"><img class="pullLoading" src="~@/assets/img/loading.gif" alt=""> 加载中...</span>
      </div>
      <!-- banner组件 -->
      <!-- <my-banner :json="bannerJson" v-if="bannerJson.length > 0"></my-banner> -->
      <!-- 置顶组件 -->
      <List v-if="stickJson.length > 0" :itemJson="stickJson"></List>
      <!-- listItem -->
      <List v-if="contentJson.length > 0" :itemJson="contentJson"></List>
      <!-- 底部提示 -->
      <div class="bottomLoad" v-if="contentJson.length > 0">
        <div class="loading" v-show="bottomLoading"><mt-spinner type="fading-circle"></mt-spinner> 加载中...</div>
        <div class="noData" v-if="bottomNoData">没有更多内容了</div>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import $ from 'jquery'
export default {
  props: ['channel'],
  data () {
    return {
      classPage: 1, // 当前栏目的翻页页数
      stickJson: [], // 置顶数据
      bannerJson: [], // banner数据
      contentJson: [], // 整个列表数据
      dataCount: 0, // 推荐文章数量
      topStatus: '', // 下拉状态
      bottomLock: false, // 上划开关
      bottomLoading: true, // 底部loading
      bottomNoData: false, // 底部nothing
      loading: false
    }
  },
  computed: {
    ...mapState('index', [
      'indexActive',
      'indexPage',
      'indexLocation',
      'indexSwiper'
    ]),
    ...mapGetters('index', [
      'activeMeta'
    ])
  },
  watch: {
    // indexActive栏目数据变化时
    indexActive (val) {
      this.init()
    },
    // 当前页发生变化，设置classpage
    classPage (val) {
      this.indexPage[this.indexActive] = val
      this.set_indexPage(this.indexPage)
    },
    // contentJson发生变化，则设置当前栏目缓存数据
    contentJson (val) {
      this.set_currentContent(val)
    }
  },
  methods: {
    ...mapMutations('index', [
      'set_currentContent',
      'set_indexPage',
      'set_indexLocation'
    ]),

    ...mapActions('index', [
      'get_ilistItem_cache',
      'get_listItem_data',
      'get_stick_data',
      'get_banner_data'
    ]),

    // 页面初始化
    init () {
      // active栏目第一次请求数据
      if (this.indexActive === this.channel && this.contentJson.length === 0) {
        this.loading = 'loading'
        this.classPage = this.activeMeta.page
        // 获取置顶数据
        this.get_stick_data().then(res => {
          if (res) {
            this.stickJson = res
          }
        })
        // 获取banner数据
        this.get_banner_data().then(res => {
          if (res) {
            this.bannerJson = res
          }
        })
        // 栏目缓存 ? 缓存 : 发送请求
        this.get_ilistItem_cache(this.indexActive)
          .then(res => {
            if (res) {
              this.contentJson = res
              this.handleLocation('get')
              this.loading = false
            } else {
              this.loadTopAjax()
            }
          })
      }
    },

    // 顶部下拉请求， 刷新
    loadTopAjax () {
      this.get_listItem_data(this.classPage)
        .then(res => {
          this.loading = false
          if (res) {
            this.contentJson.unshift(...res) // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
            this.dataCount = res.length
            this.classPage++
            // 文章数量提示
            $(`.container.${this.channel} .dataCount`).slideDown(200).delay(1000).slideUp(200)
            // 加载历史记录方法
            this.newLookHere()
          } else {
            // 没有文章数据提示
            $(`.container.${this.channel} .noNewCount`).slideDown(200).delay(1000).slideUp(200)
          }
          this.$refs.loadmore.onTopLoaded() // mint-ui 下拉组件的方法
          this.loading = false
          $(`.container.${this.channel} .requestFail`).hide()
        })
        .catch(err => {
          console.log('loadTop发生错误', err)
          if (this.contentJson.length > 0) {
            $(`.container.${this.channel} .requestFail`).show()
            this.loading = false
          } else {
            this.loading = 'error'
          }
        })
    },

    // 底部上划请求, 加载更多
    loadBottomAjax () {
      this.bottomLock = true // 上划开关：开
      this.get_listItem_data(this.classPage)
        .then(res => {
          if (res) {
            this.contentJson.push(...res) // push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
            this.classPage++
          } else {
            this.bottomLoading = false
            this.bottomNoData = true
          }
          this.bottomLock = false // 上划开关：关
        })
    },

    // 创建historyLook元素
    newLookHere () {
      if (this.dataCount >= 10) {
        let lookIndex = this.contentJson.findIndex((n) => n.type === 'lookHere')
        this.contentJson.splice(lookIndex, 1) // 删除数据里面的look数据
        this.contentJson.splice(10, 0, {type: 'lookHere'}) // 始终在第11个位置里添加look数据
      }
      // this.$nextTick(() => {
      //   $(`.${this.indexActive} #lookHere`).pre.css('border', 'none')
      // })
    },

    // 点击look元素，发送请求
    lookHereClick () {
      $(`.container.${this.channel}`).on('click', '#lookHere', () => {
        $(`.container.${this.indexActive}`).animate({scrollTop: 0}, () => {
          this.loadTopAjax()
        })
      })
    },

    // mint-ui 下拉组件的状态
    handleTopChange (status) {
      // console.log(status)
      this.topStatus = status
    },

    // 处理滚动条位置的方法
    handleLocation (type) {
      if (this.indexActive === this.channel) {
        if (type === 'get') {
          this.$nextTick(() => {
            $(`.container.${this.channel}`).scrollTop(this.activeMeta.location)
          })
        } else if (type === 'set') {
          let scrollTop = $(`.container.${this.channel}`).scrollTop()
          if (scrollTop >= 0) {
            this.indexLocation[this.indexActive] = scrollTop
            this.set_indexLocation(this.indexLocation)
          }
        }
      }
    },

    // saveScroll
    saveScroll () {
      this.handleLocation('set')
    }
  },
  mounted () {
    this.init()
    this.lookHereClick()
  },
  activated () {
    this.handleLocation('get')
    window.addEventListener('beforeunload', this.saveScroll)
  },
  deactivated () {
    this.handleLocation('set')
    window.removeEventListener('beforeunload', this.saveScroll)
  }
}
</script>

<style lang="stylus">
.container
  // height 100%
  // overflow auto
  // -webkit-overflow-scrolling touch
  // position relative
  .globalTip
    position absolute
    top 0
    left 0
    right 0
    z-index 10
    div
      height 32px
      line-height 34px
      font-size 14px
      color #2a90d7
      background rgba(213, 233, 247, .9)
      text-align center
      display none
      &.requestFail
        color #f56767
        background #fbe9ef

  .mint-loadmore-top
    height 50px
    line-height 50px
    font-size 14px

  .pullLoading
    width 24px
    height 24px
    vertical-align middle
    margin-top -4px
    margin-right 3px

  .bottomLoad
    .loading
      height 40px
      line-height 40px
      text-align center
      font-size 14px
      color #999
      span
        vertical-align middle
        display inline-block
        margin-right 10px
</style>
