<template>
  <ul class="circleBottor borbtm" v-show="circleBottor">
    <li> 
      <router-link to="/index" class="pag">
        <span class="imgSpan"><img src="/static/images/h_home.png"></span>
        <span>首页</span>
      </router-link>
    </li>
    <li> 
      <router-link to="/assortment" class="assortment pag">
        <span class="imgSpan"><img src="/static/images/h_category.png"></span>
        <span>分类</span>
      </router-link>
    </li>
    <li> 
      <router-link to="/index" class="search pag">
        <span class="imgSpan"><img src="/static/images/h_search.png"></span>
        <span>搜索</span>
      </router-link>
    </li>
    <li> 
      <router-link to="/shoppingCart" class="cart pag">
        <span class="imgSpan"><img src="/static/images/h_cart.png"></span>
        <span>购物车</span>
      </router-link>
    </li>
    <li> 
      <router-link to="/personal" class="user pag">
        <span class="imgSpan"><img src="/static/images/h_user.png"></span>
        <span>我的百诚</span>
      </router-link>
    </li>
  </ul>
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
