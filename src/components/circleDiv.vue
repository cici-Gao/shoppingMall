<template>
  <div class="circleDiv">
    <div class="imgDiv">
      <div class="circleTop clearfix" @click="selectShow">
        <img src="/static/images/cartshow.png" class="cartshow">
      </div>
    </div>
    <ul class="circleBottor">
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
  </div>
</template>
<script>
import $ from 'jquery'
export default{
  name: 'circleDiv',
  methods: {
    selectShow () {
      $('.cartshow').css({'height': 0})
      $('.carthide').css({'height': 0})
      this.circleBottor = !this.circleBottor
      if (this.circleBottor) {
        $('.circleBottor').css({'height': '50px', 'border-bottom': '1px solid #e0e0e0'})
        $('.pag').css({'height': '50px'})
        setTimeout(() => {
          $('.cartshow').attr('src', '/static/images/carthide.png').removeClass().addClass('carthide').css({'height': '14px'})
        }, 1000)
      } else {
        $('.circleBottor').css({'height': 0, 'border-bottom': '0'})
        $('.pag').css({'height': 0})
        setTimeout(() => {
          $('.carthide').attr('src', '/static/images/cartshow.png').removeClass().addClass('cartshow').css({'height': '9px'})
        }, 1000)
      }
    }
  },
  data () {
    return {
      circleBottor: false
    }
  }
}
</script>
<style>
@import '../assets/css/animate.css'
</style>

<style lang='stylus'>
.circleDiv
  .imgDiv
    border-top 1px solid #e0e0e0
    .circleTop
      width 50px
      height 50px
      line-height 50px
      position absolute
      top 0
      right 0
      text-align center
      img
        width 28px
        &.cartshow
          height 9px
          transition:height .5s
          -moz-transition:height .5s
          -webkit-transition:height .5s
          -o-transition:height .5s
        &.carthide
          width 14px
          height 14px
          transition:height .5s
          -moz-transition:height .5s
          -webkit-transition:height .5s
          -o-transition:height .5s
  .circleBottor
    height 0
    transition:height 1s
    -moz-transition:height 1s
    -webkit-transition:height 1s
    -o-transition:height 1s
    display flex
    background #eee
    li
      flex:1
      .pag
        height 0
        overflow hidden
        transition:height 1s
        -moz-transition:height 1s
        -webkit-transition:height 1s
        -o-transition:height 1s
        display block
        width 100%
        text-align center
        padding-top 6px
      span
        display block
        width 100%
        line-height normal
        text-align center
        font-size 12px
        &.imgSpan
          width 24px
          margin 0 auto
</style>
