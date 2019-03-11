<template>
  <!--  -->
  <header class="myHeader" :class="{'fixed': fixed}">
    <div class="top-bar">
      <div class="abs-l">
        <slot name="left"></slot>
      </div>
      <div class="abs-m">
        {{ title }}
      </div>
      <div class="abs-r">
        <slot name="right"></slot>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: String,
    fixed: Boolean
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="stylus">
.myHeader
  position relative
  background-color _themeColor
  font-size toRem(16)
  color #fff
  overflow hidden
  display block
  &.fixed
    position fixed
    top 0
    left 0
    right 0
    z-index 101
  .top-bar
    position relative
    height toRem(50)
    user-select none
    display flex
    align-items center

    .abs-l, .abs-r
      width toRem(50)
      height toRem(50)
      font-size inherit
      text-align center

    .abs-m
      flex 1
      font-weight 700
      text-align center

    .back, .menu
      display table-cell
      width toRem(50)
      height toRem(50)
      vertical-align middle
      color inherit

</style>
