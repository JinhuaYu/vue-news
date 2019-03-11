<template>
 <div id="detail">
   <!-- header -->
  <myHeader :title="headerTitle" fixed v-goTop:click='true'>
    <a href="javascript:;" slot="left" class="back" @click="$router.go(-1)"><font-awesome-icon icon="chevron-left"></font-awesome-icon></a>
    <a href="javascript:;" slot="right" class="menu"><font-awesome-icon icon="ellipsis-h"></font-awesome-icon></a>
  </myHeader>

  <!-- content -->
  <div class="content">
    <div class="container">
      <!-- 正文 -->
      <my-article v-if="articleJson" :articleJson="articleJson"></my-article>
    </div>
  </div>

  <!-- 请求提示 -->
  <my-loading :visiable='loading' :reload='init'></my-loading>
 </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import myArticle from './components/article'
import $ from 'jquery'
export default {
  name: 'Detail',
  components: {
    myArticle
  },
  data () {
    return {
      headerTitle: '头条新闻', // header的title
      id: '', // 文章id
      classid: '', // 文章 classid
      datafrom: '', // 文章 datafrom
      articleJson: {}, // 文章数据
      loading: 'loading', // 加载提示
      error: false
    }
  },
  computed: {
    ...mapState('detail', [
      'location'
    ])
  },
  watch: {
    $route (val) {
      if (val.query.id) {
        this.init() // 初始化
      }
    }
  },
  methods: {
    ...mapMutations('detail', [
      'set_location'
    ]),
    ...mapActions('detail', [
      'get_Article_data'
    ]),

    // 页面初始化
    async init () {
      this.id = this.$route.query.id
      this.classid = this.$route.query.classid
      this.datafrom = this.$route.query.datafrom
      $('#detail .container').scrollTop(0) // 初始化返回顶部
      this.get_Article()
    },

    // 获取文章数据
    get_Article () {
      this.loading = 'loading'
      let params = {
        'id': this.id,
        'datafrom': this.datafrom
      }
      this.get_Article_data(params)
        .then(res => {
          if (res) {
            this.articleJson = res.data
            this.handleLocation('get') // 获取记录的位置
          }
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = 'error'
        })
    },

    handleLocation (type) {
      if (type === 'get') {
        this.$nextTick(() => {
          if (this.location && this.location[this.id]) {
            $('#detail .container').scrollTop(this.location[this.id]) // location对象
            console.log('location get', this.location[this.id])
          }
        })
      } else if (type === 'set') {
        this.location[this.id] = $('#detail .container').scrollTop()
        this.set_location(this.location)
        console.log('location set', this.location[this.id])
      }
    }
  },
  mounted () {
    this.init()
  },
  beforeRouteLeave (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    this.handleLocation('set')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.handleLocation('set')
    next()
  }
}
</script>

<style lang="stylus">
#detail
  height 100%
  .myHeader
    background-color #fff
    color #333
</style>
