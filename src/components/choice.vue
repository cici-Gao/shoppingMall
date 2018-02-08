<template>
  <div class="choice">
    <div class="item">
      <router-link to="index">首页</router-link>
    </div>
    <div class="item">
      <router-link to="assortment">分类</router-link>
    </div>
    <div class="item">
      <router-link to="shoppingCart">购物车</router-link>
    </div>
    <div class="item">
      <router-link to="personal">我的</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'choice'
}
</script>
<style lang="stylus">
.choice
  display: flex
  position fixed
  bottom 0
  width 100%
  left 0
  height 50px
  line-height 50px
  border-top 1px solid #dfdfdf
  background #ffffff
  .item
    flex: 1
    text-align: center
    a
      text-decoration none
      color #000
</style>
