<!-- eslint-disable -->
<template>
  <div class="listItem">
    <template v-for="(item, index) in itemJson">
      <!-- 视频 -->
      <div v-if="item.playonlineurl" class="item" :key="index">
        <router-link :to="url(item)" class="video">
          <div class="cover">
            <div class="video-info">
              <p>{{item.title}}</p>
            </div>
            <img v-lazy="item.titlepic" alt="">
            <span class="play-time">{{item.playtime}}</span>
            <span class="play-btn"></span>
          </div>
          <news-info :json="item"></news-info>
        </router-link>
      </div>

      <!-- 1张大图 -->
      <div v-else-if="item.ptitlepic" class="item" :key="index">
        <router-link :to="url(item)" class="oneLarge">
          <div class="news-title">
            <h3>{{item.title}}</h3>
          </div>
          <div class="news-img">
            <img v-lazy="item.ptitlepic" alt="">
          </div>
          <news-info :json="item"></news-info>
        </router-link>
      </div>

      <!-- 3张小图 -->
      <div v-else-if="item.titlepic3" class="item" :key="index">
        <router-link :to="url(item)" class="threeSmall">
          <div class="news-title"><h3>{{item.title}}</h3></div>
          <div class="list-img">
            <ul>
              <li><img v-lazy="item.titlepic" alt=""></li>
              <li><img v-lazy="item.titlepic2" alt=""></li>
              <li><img v-lazy="item.titlepic3" alt=""></li>
            </ul>
          </div>
          <news-info :json="item"></news-info>
        </router-link>
      </div>

      <!-- 1张小图 -->
      <div v-else-if="item.titlepic" class="item" :key="index">
        <router-link :to="url(item)" class="oneSmall">
          <div class="news-title">
            <h3>{{item.title}}</h3>
            <news-info :json="item"></news-info>
          </div>
          <div class="news-img">
            <img v-lazy="item.titlepic" alt=""/>
          </div>
        </router-link>
      </div>

      <!-- 文字 -->
      <div v-else-if="item.title" class="item" :key="index">
        <router-link :to="url(item)" class="text">
          <div class="news-title">
            <h3>{{ item.title }}</h3>
          </div>
          <news-info :json="item"></news-info>
        </router-link>
      </div>

      <div v-else-if='item.type' id="lookHere" :key="index">
        <p>上次看到这里，点击刷新 <i class="icon-refresh"></i></p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    itemJson: {
      type: [Array, String]
    }
  },
  methods: {
    url (item) {
      // #/detail?classid=5&id=10118&datafrom=news2
      return `/detail?classid=${item.classid}&id=${item.id}&datafrom=${item.datafrom}`
    }
  }
}
</script>

<style lang='stylus'>
small_height=1.96875rem
larger_height=4.6875rem
// img[lazy=loading]
//   width 40px !important
//   height 40px !important
//   margin auto

.listItem
  padding 0 10px
  .item
    padding 10px 0
    border-bottom 1px solid #e6e6e6
    a
      display block
      .news-title
        h3
          white-space normal
          font-size 16px
          line-height 21px
          color #454545
          font-weight 400
          display -webkit-box
          -webkit-line-clamp 3
          text-overflow ellipsis
          -webkit-box-orient vertical
          overflow hidden
      .news-img
        margin-top 6px
      .news-info
        margin-top 6px

    // 视频
    .video
      height 100%
      .cover
        height larger_height
        overflow hidden
        position relative
        .video-info
          position absolute
          width 100%
          height 80px
          padding 10px
          color #fff
          background linear-gradient(to bottom, rgba(0,0,0,.5), transparent)
          z-index 8
          p
           font-size 16px
        img
          width 100%
          min-height larger_height
        .play-time
          position absolute
          right 10px
          bottom 10px
          background rgba(0, 0, 0, .4)
          color #fff
          font-size 12px
          padding 2px 4px
          border-radius 10px
        .play-btn
          width 50px
          height 50px
          position absolute
          top 50%
          left 50%
          transform translate(-50%, -50%)
          background rgba(0, 0, 0, .4)
          border-radius 50%
          display inline-block
          color #fff
          border 1px solid #fff
          &:after
            display inline-block
            content " "
            border-style solid
            border-width 12px
            border-color transparent transparent transparent #fff
            position absolute
            top 50%
            left 50%
            transform translate(-25%, -50%)

    // 一张大图
    .oneLarge
      .news-img
        width 100%
        height larger_height
        overflow hidden
        img
          width 100%

    // 三张小图
    .threeSmall
      .list-img
        margin-top 6px
        ul
          display flex
          li
            display inline-block
            width 33.3%
            height small_height
            overflow hidden
            flex 1
            img
              width 100%
              min-height small_height
            &:nth-child(2)
              padding 0 2px

    // 一张小图
    .oneSmall
      .news-title
        width 65%
        overflow hidden
      .news-img
        width 33%
        height small_height
        overflow hidden
        img
          width 100%
          height small_height
      & > div
        display inline-block
        vertical-align middle

#lookHere
  background #f4f5f6
  border none !important
  margin 0 !important
  p
    font-size 12px
    line-height 18px
    color #00939c
    text-align center
    user-select none
    margin 0
    padding 10px 0
</style>
