<template>
  <div class="all">
    <div class="topTitle clearfix">
      <span class="imgP" style="float:left;">
        <a style="display:inline-block;width:60px;margin-left:10px">
          <img src="/static/images/mine.png">
        </a>
      </span>
      <span>
        <a style="display: inline-block;max-width:200px;height:50px">
          <img src="/static/images/logo.png">
        </a>
      </span>
      <span class="imgP"  style="float:right;text-align:right">
        <a style="display: inline-block;margin-right:10px;width:60px">
          <img src="/static/images/sea.png">
        </a>
      </span>
    </div>
    <!-- 轮播 -->
    <!-- <div class="banner" id="banner">
      <div class="bd">
        <ul id="banners" ref="banners" >
          <li v-for="banner in mobileBanner" ref="bannerLi" :key="banner">
            <a href="www.baidu.com">
              <img :src="banner">
            </a>
          </li>
        </ul>
      </div>
      <div class="hd">
        <ol id="buttons"></ol>
      </div>
    </div> -->
    <slider :pages="pages" :sliderinit="sliderinit" style="height:176px"></slider>
    <!-- 类型 -->
    <div>
      <ul class="type">
        <li>
          <p>
            <img src="/static/images/nav_01.png">
            电视
          </p>
        </li>
        <li>
          <p>
            <img src="/static/images/nav_02.png">
            冰箱
          </p>
        </li>
        <li>
          <p>
            <img src="/static/images/nav_03.png">
            洗衣机
          </p>
        </li>
        <li>
          <p>
            <img src="/static/images/nav_04.png">
            空调
          </p>
        </li>
      </ul>
      <ul class="type">
        <li>
          <p>
            <img src="/static/images/nav_05.png">
            热水器
          </p>
        </li>
        <li>
          <p>
            <img src="/static/images/nav_17.png">
            洗衣机
          </p>
        </li>
        <li>
          <p>
            <img src="/static/images/nav_07.png">
            豆浆机
          </p>
        </li>
        <li>
          <p style="width:60%">
            <img src="/static/images/nav_15.png" style="width:84%">
            发票系统
          </p>
        </li>
      </ul>
    </div>
    <gap></gap>
    <!-- 特价热销 -->
    <div>
      <split :title="saleTitle"></split>
      <div  class="saleDiv" ref="saleDiv">
        <ul class="picList" ref="picList">
          <li class="picItem" v-for="img in saleImg" :key="img['price']">
            <img :src="img['brand']" style="width: 77px;position: absolute;top: 0;left: 0">
            <img :src="img['img']" class="mainImg">
            <span v-for="tt in img.title" style="display: block" :key="tt">{{tt}}</span>
            <span>{{img.price}}</span>
          </li>
        </ul>
      </div>
    </div>
    <gap></gap>
    <!-- 热门好货 -->
    <div class="hotProduct">
      <split :title="hotTitle"></split>
      <div v-for="prd in hotProduct" class="product" :key="prd['price']">
        <img :src="prd['img']">
        <p>
          {{prd['name']}} <br>
          <span>￥ {{prd['price']}}</span>
        </p>
        <gap></gap>
      </div>
    </div>
    <!-- 明星单品 -->
    <div class="starProduct">
      <split :title="starTitle"></split>
      <div v-for="prd in starProduct" class="prd" :key="prd['name']">
        <div>
          <img :src="prd['img']">
          <p class="nameP">
            {{prd['name']}} <br>
          </p>
          <p>
            <span>￥ {{prd['price']}}</span>
          </p>
        </div>
      </div>
    </div>
    <gap></gap>
    <choice></choice>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
// import {TouchSlide} from '../assets/js/TouchSlide.1.1.js'
import gap from './gap.vue'
import split from './split.vue'
import choice from './choice.vue'
import {onLineUrl} from '../../config/index.js'
import slider from 'vue-concise-slider'
export default {
  data () {
    return {
      saleTitle: '特价商品',
      hotTitle: '热门好货',
      starTitle: '明星单品',
      pages: [],
      saleImg: [],
      hotProduct: [],
      starProduct: [],
      sliderinit: {
        currentPage: 0, //  当前页码
        thresholdDistance: 500, //  滑动判定距离
        thresholdTime: 20000, //  滑动判定时间
        autoplay: 10000, //  自动滚动[ms]
        loop: true, //  循环滚动
        direction: 'horizontal', //  方向设置，垂直滚动
        infinite: 1, //  无限滚动前后遍历数
        slidesToScroll: 1 //  每次滑动项数
      }
    }
  },
  components: {
    gap,
    split,
    choice,
    slider
  },
  created () {
    this.$http.get('api/content/home/advertisement/get-super-item?position=mobile-banner&code=mobile-banner').then((rep) => {
      let imgs = rep.body[0]['adImg']
      imgs.forEach((img, i) => {
        let url = img.pic
        let obj = {
          title: '',
          style: {
            background: 'url(' + url + ')',
            backgroundSize: 'cover'
          }
        }
        this.$set(this.pages, i, obj)
      })
    })
    this.$http.get('api/content/home/advertisement/get-super-item?position=mobile-topic&code=super-good').then((rep) => {
      let {body: {0: {adImg}}} = rep
      adImg.forEach((img) => {
        let pic = img['pic']
        let name = img['item']['product_listname']
        let price = img['item']['product_price']
        let brand = img['item']['brand']
        brand = '/static/images/' + this.brands(brand)
        if (name.length > 2) {
          name = name.slice(0, 2)
        }
        let arr = {
          'img': pic,
          'title': name,
          'price': price,
          'brand': brand
        }
        this.saleImg.push(arr)
      })
    })

    this.$http.get('api/content/home/advertisement/get-super-item?position=mobile-topic&code=hot-good').then((rep) => {
      let {body: {0: {adImg}}} = rep
      adImg.forEach((product) => {
        let name = product['item']['product_name']
        let price = product['item']['product_reference_price']
        let pic = product['pic']
        this.hotProduct.push({
          'name': name,
          'price': price,
          'img': pic
        })
      })
    })

    this.$http.get('api/catalog/home/item/search').then((rep) => {
      let { body: {data: {items}} } = rep
      items.forEach((prd) => {
        let name = prd['product_name']
        let price = prd['product_price']
        let pic = prd['img'][0]['pic']
        this.starProduct.push({
          'name': name,
          'price': price,
          'img': onLineUrl + '/' + pic
        })
      })
    })
  },
  mounted () {
    this.$nextTick(() => {
      this._initPics()
    })
  },
  watch: {
    'saleImg' () {
      this.$nextTick(() => {
        this._initPics()
      })
    }
  },
  methods: {
    _initPics () {
      if (this.saleImg.length) {
        let picWidth = 140
        let margin = 15
        let width = (picWidth + margin) * this.saleImg.length - margin
        this.$refs.picList.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.saleDiv, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    },
    brands (strArr) {
      let picimg = ''
      switch (strArr) {
        case '乐视':
          picimg = 'letv.png'
          break
        case '西门子':
          picimg = 'siemens.png'
          break
        case '夏普':
          picimg = 'sharp.png'
          break
        case '索尼':
          picimg = 'sony.png'
          break
        case '博世':
          picimg = 'bosch.png'
          break
        case '荣事达':
          picimg = 'royalstar.png'
          break
        case '三洋':
          picimg = 'sanyo.png'
          break
        case '帝度':
          picimg = 'diqua.png'
          break
      }
      return picimg
    }
  }
}
</script>
<style lang='stylus'>
@import '../assets/stylus/base.styl'
.all
  margin-bottom 60px
  .topTitle
    width 100%
    background #2b5bbd
    span
      display inline-block
      height 50px
      line-height 50px
      width 33%
      &.imgP
        width 33%
        img
          width 38%
      img
        width 97%
        vertical-align: middle;
  #banner
    position relative
    display flex
    justify-content center
    .bd
      width 100%
      #banners
        width 100%
        margin 0
        padding 0
        li
          text-decoration none
          list-style: none
          img
            width 100%
            padding 0
            margin 0
    .hd
      position absolute
      bottom 15px
      #buttons
        margin 0
        padding 0
        height 3px
        overflow hidden
        li
          float: left;
          margin-right: 3px;
          display: inline;
          width: 20px;
          height: 2px;
          background: rgba(0,0,0,0.4);
          color: #fff;
          text-align: center;
          &.on
            background: #fff
  div
    .type
      display flex
      margin 12px 0
      padding 0
      li
        flex 1
        list-style: none
        display flex
        justify-content: center
        p
          width 50%
          font-size 12px
          text-align center
          img
            width 100%
        div
          width 100%
          display flex
          justify-content: center
          p
            width 50%
            font-size 12px
            text-align center
            img
              width 100%
  .saleDiv
    overflow hidden
    width 100%
    white-space nowrap
    .picList
      margin 0
      padding 0
      .picItem
        display inline-block
        margin-right 15px
        height 230px
        font-size 12px
        text-overflow: ellipsis
        white-space: nowrap
        overflow: hidden
        vertical-align: middle
        color #707070
        width 140px
        text-align center
        background #fbfbfb
        position relative
        &:last-child
          margin 0
        .mainImg
            width 91%
            margin-left 3%
            margin-top 30px
        span
          line-height 21px
  .hotProduct
    .product
      p
        line-height 25px
        margin 12px
        font-size 13px
        color #565353
        span
          color #ed0b0b
      img
        width 100%
  .starProduct
    .prd
      width 50%
      display inline-block
      div
        border-top 1px solid #e1e1e1
        border-right 1px solid #e1e1e1
        padding 10px
        font-size 12px
        heigth 100%
        &:nth-child(even)
          border-right 0px
        img
          width 100%
        .nameP
          line-height 20px
          height 40px
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        p
          span
            color #ed0b0b
</style>
