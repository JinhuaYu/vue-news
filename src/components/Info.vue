<template>
  <div class="news-info">
    <span class="news-label blue" v-if="json.playonlineurl">视频</span>
    <span class="news-label red" v-else-if="json.istop && json.istop >= 9">置顶</span>
    <span class="news-label blue" v-else-if="json.isgood >= 6">荐</span>
    <span class="news-label red" v-else-if="json.firsttitle >= 6">热</span>
    <span class="news-from" v-if="json.befrom">{{json.befrom}}</span>
    <span class='news-click' v-if='json.onclick'>{{json.onclick }} 阅读</span>
    <span class='news-plnum' v-if='json.plnum'>{{json.plnum}}评论</span>
    <span class='news-time' v-if='json.time'>{{json.time}}</span>
    <span class='news-tag' v-if='json.nlist'>{{json.nlist}}</span>
  </div>
</template>

<script>
export default {
  props: ['json']
}
</script>

<style lang="stylus">
.news-info
  position relative
  left -12.5%
  width 125%
  white-space normal
  color #999
  margin-top 6px
  overflow hidden
  font-size x-small
  -webkit-transform scale(0.8)
  transform scale(0.8)
  span
    display inline-block
    vertical-align middle

  .news-label
    border-radius 2px
    padding 0px 2px 1px

  .blue
    color #fff
    background #00939c

  .red
    color #fff
    background #f85959
</style>
