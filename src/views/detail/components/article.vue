<template>
  <article id="article">

    <div class="article-info">
      <h4 class="title">{{articleJson.title}}</h4>
      <span class="datafrom">{{articleJson.befrom}}</span>
      <span class="datafrom">{{articleJson.newstime}}</span>
    </div>

    <!-- 有视频的 -->
    <template v-if="articleJson.playonlineurl">
      <div class="article-video">
        <video :src="articleJson.playonlineurl" autoplay></video>
      </div>
    </template>

    <!-- 其它文字图片 -->
    <template v-else>
      <div class="article-content">
        <div class="content-html" :class="{'content-close': contentClose}" v-html="articleJson.newstext"></div>
        <div v-if="contentClose" @click="showMore()" class="showMore">展开全文 ...</div>
      </div>
    </template>

  </article>
</template>

<script>
export default {
  props: ['articleJson'],
  data () {
    return {
      contentClose: true
    }
  },
  methods: {
    showMore () {
      this.contentClose = !this.contentClose
    }
  }
}
</script>

<style lang="stylus">
#article
  width 100%
  position relative
  .article-info
    background #fff
    border-bottom 1px solid #eee
    padding 10px
    font-size 12px
    .title
      font-size 18px
      padding-bottom 10px

  // 视频
  .article-video
    video
      width 100%

  // 文字图片
  .article-content
    padding 10px
    font-size 16px
    .content-html
      overflow hidden
      img
        width 100% !important
        height auto !important
      p
        margin-bottom 10px
      &.content-close
        height 1000px

    .showMore
      width 100%
      height 40px
      line-height 40px
      text-align center
      color _themeColor
      margin-top 20px

</style>
