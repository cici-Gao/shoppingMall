<template>
  <div class="personal">
    <div class="header">我的百诚</div>
    <div class="conterTop">
      <div>
        <p class="logo">
          <img src="/static/images/userone.png">
        </p>
      </div>
      <p class="phone">18627715254</p>
      <p class="user">账户信息管理 > </p>
    </div>
    <div class="order">
      我的订单
      <span class="allOrder">查看所有订单 > </span>
    </div>
    <ul class="state">
      <li>
        <p class="imgP">
          <img src="/static/images/daizhifu.png">
        </p>
        <p class="textP">待支付</p>
      </li>
      <li>
        <p class="imgP">
          <img src="/static/images/daifahuo_two.png">
        </p>
        <p  class="textP">待发货</p>
      </li>
      <li>
        <p class="imgP">
          <img src="/static/images/daipingjia.png">
        </p>
        <p class="textP">待评价</p>
      </li>
      <li>
        <p class="imgP">
          <img src="/static/images/tuihuanhuo.png">
        </p>
        <p class="textP">退换货</p>
      </li>
    </ul>
    <gap :val="10"></gap>
    <ul class="state">
      <li>
        <p class="imgP">
          <img src="/static/images/shoucang.png">
        </p>
        <p class="textP">我的收藏</p>
      </li>
      <li>
        <p class="imgP">
          <img src="/static/images/baichengbi.png">
        </p>
        <p  class="textP">百诚币</p>
      </li>
      <li>
        <p class="imgP">
          <img src="/static/images/youhuiquan.png">
        </p>
        <p class="textP">优惠券</p>
      </li>
      <li>
        <p class="imgP">
          <img src="/static/images/gouwuzhinan.png">
        </p>
        <p class="textP">购物指南</p>
      </li>
    </ul>
    <gap :val="10"></gap>
    <choice></choice>
    <ul class="guess">
      <li v-for="item in guess" :key="item.price">
        <p class="imgP"><img :src="item.img"></p>
        <p class="textP">{{item.name}}</p>
        <p>{{item.price}}</p>
      </li>
    </ul>
    <div class="personalBottom">
      <p>退出当前账户</p>
    </div>
  </div>
</template>
<script>
import choice from './choice.vue'
import gap from './gap.vue'
import {onLineUrl} from '../../config/index.js'
export default{
  name: 'personal',
  data () {
    return {
      guess: []
    }
  },
  components: {
    choice,
    gap
  },
  created () {
    this.$http.get('api/catalog/home/item/guess').then((rep) => {
      let data = rep.body.data
      data.forEach((product) => {
        let obj = {
          'img': onLineUrl + '/' + product.img[0].pic,
          'price': product.product_price,
          'name': product.product_name
        }
        this.guess.push(obj)
      })
    })
  }
}
</script>
<style lang='stylus'>
@import '../assets/stylus/base.styl'
.personal
  .header
    border-bottom: 1px solid #e1e1e1;
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #2b5bbd
  .conterTop
    background url('/static/images/personalbanner.png') no-repeat
    background-size cover
    font-size 14px
    div
      padding-top 20px
      padding-bottom 5px
      .logo
        width 56px
        margin 0 auto
    .phone
      text-align center
      color #ffffff
    .user
      text-align right
      padding 5px 10px 15px
      color #ffffff
  .order
    height 50px
    line-height 50px
    padding 0 10px 0 24px
    font-size 16px
    border-bottom 1px solid #d6d6d6
    color #656565
    .allOrder
      font-size 13px
      color #9d9d9d
      float right
  .state
    display flex
    li
      flex 1
      margin 20px 0
      .textP
        text-align center
        font-size 14px
      .imgP
        width 39%
        margin 0 auto
        margin-bottom 5px
  .guess
    box-sizing: border-box
    li
      box-sizing: border-box
      width 29.7%
      display inline-block
      margin 10px
      font-size 13px
      color #7d7d7d
      for row in 2 5 7
        &:nth-child({row})
          margin 10px 0
      .textP
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      .imgP
        border 1px solid #f2f2f2
  .personalBottom
    padding 20px 40px 70px
    background #eeeeee
    p
      text-align center
      border 1px solid #cccccc
      height 45px
      line-height 45px
      border-radius 8px
      color #333
      font-size 15px
</style>
