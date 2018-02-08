<template>
  <div class="shoppongCart">
    <div class="header" :class="{ 'borbtm' : borbtm}">
      <p class="title">购物车</p>
      <circleDiv @selectShow="selectShow"></circleDiv>
    </div>
    <div class="empty" v-if="empty">
      <div class="emptyTop">
        <img src="/static/images/cars.png">
        <router-link to="/index" class="toIndex">去首页看看</router-link>
      </div>
      <div class="emptyBottom">
        <div class="line">
          <span class="border"></span>
          <span>为您推荐</span>
        </div>
        <ul>
          <li v-for="item in guess" class="guess" :key="item.name">
            <img :src="item.img">
            <p class="guessTitle">{{item.name}}</p>
            <p>{{item.price}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="full" v-if="!empty"></div>
  </div>
</template>
<script>
import circleDiv from './circleDiv.vue'
import {onLineUrl} from '../../config/index.js'
export default{
  name: 'shoppingCart',
  components: {
    circleDiv
  },
  data () {
    return {
      borbtm: false,
      empty: true,
      guess: []
    }
  },
  methods: {
    selectShow (i) {
      if (i) {
        this.borbtm = true
      } else {
        this.borbtm = false
      }
    }
  },
  created () {
    this.$http.get('api/catalog/home/item/guess').then((rep) => {
      let data = rep.body.data
      data.forEach((element) => {
        let price = element['product_price']
        let name = element['product_name']
        let img = element['img']
        let obj = {
          'img': onLineUrl + '/' + img[0].pic,
          'price': price,
          'name': name
        }
        this.guess.push(obj)
      })
    })
  }
}
</script>
<style lang='stylus'>
@import '../assets/stylus/base.styl'
.shoppongCart
  .header
    height 50px
    line-height 50px
    color #333
    position relative
    &.borbtm
      border-bottom 0
    .title
      display flex
      justify-content center
      font-size 20px
  .empty
    .emptyTop
      margin-bottom 80px
      .toIndex
        display block
        margin 50px auto 0
        width 50%
        border 1px solid #e1e1e1
        background #fbfbfb
        height 35px
        line-height 35px
        text-align center
        border-radius 8px
    .emptyBottom
      padding 0 3px
      background #eee
      .line
        height 35px
        line-height 35px
        .guessTitle
          display inline-block
      ul
        .guess
          width 48%
          display inline-block
          margin 3px
          background #fff
          font-size 13px
          &:nth-child(even)
            margin-left 4px
          .guessTitle
            height 49px
            line-height 21px
            padding 5px
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical
</style>
