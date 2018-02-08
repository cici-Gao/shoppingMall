<template>
  <div class="assortment">
    <div class="header">
      产品分类
    </div>
    <div class="scrollDiv">
      <div class="leftDiv" ref="leftDiv">
        <ul>
          <li v-for="(item,i) in leftData" :key="item" :class="{'active': currentIndex == i}" ref="leftList">
            <img :src="item" @click="selectMenu(i)">
          </li>
        </ul>
      </div>
      <div class="rightDiv" ref="rightDiv">
        <ul >
          <li v-for="(types,index) in product" ref="rightList" :key="index">
            <div>
              <h4>{{types.name}}</h4>
              <ul class="types">
                <li v-for="size in types.size" :key="size">
                  <img :src="size.img">
                  <p>{{size.text}}</p>
                </li>
              </ul>
              <h4 class="hot">热销商品</h4>
              <div>

                <ul v-for="(n,i) in types.prd" :key="i">
                  <li class="clearfix">
                    <p class="rightDownImg">
                      <img :src="n.img">
                    </p>
                    <p v-if="index === product.length -1" style="width:0;height:0">
                        <span v-if="i === types.prd.length - 1" style="width:0;height:0">
                          <img :src="n.img" @load="heightData" style="width:0;height:0">
                        </span>
                      </p>
                    <div class="rightDownText">
                      <p class="name">{{n.name}}</p>
                      <p class="liDown clearfix">
                        <span class="price">￥{{n.price}}</span>
                        <span class="review">评价{{n.review}}</span>
                      </p>
                    </div>
                  </li>
                </ul>

              </div>
            </div>
            <smallSplit></smallSplit>
          </li>
        </ul>
      </div>
    </div>
    <choice></choice>
  </div>

</template>
<script>
import {onLineUrl} from '../../config/index.js'
import BScroll from 'better-scroll'
import smallSplit from './smallSplit.vue'
import choice from './choice.vue'
import $ from 'jquery'

export default {
  name: 'assortment',
  components: {
    smallSplit,
    choice
  },
  data () {
    return {
      pag: {
        '电视': [{
          'img': '/static/images/tv40.png',
          'text': '40吋'
        }, {
          'img': '/static/images/tv43.png',
          'text': '43吋'
        }, {
          'img': '/static/images/tv50.png',
          'text': '50吋'
        }, {
          'img': '/static/images/tv55.png',
          'text': '55吋'
        }, {
          'img': '/static/images/tv65.png',
          'text': '65吋'
        }, {
          'img': '/static/images/tv70.png',
          'text': '70吋'
        }],
        '冰箱': [{
          'img': '/static/images/fridge1.png',
          'text': '三门式冰箱'
        }, {
          'img': '/static/images/fridge2.png',
          'text': '多门式冰箱'
        }, {
          'img': '/static/images/fridge3.png',
          'text': '对开门冰箱'
        }],
        '洗衣机': [{
          'img': '/static/images/washer1.png',
          'text': '滚筒洗衣机'
        }, {
          'img': '/static/images/washer2.png',
          'text': '倾斜滚筒式'
        }, {
          'img': '/static/images/washer3.png',
          'text': '波轮洗衣机'
        }]
      },
      leftData: ['/static/images/tv_blue.png',
        '/static/images/freezer_gray.png',
        '/static/images/washer_gray.png',
        '/static/images/air_gray.png',
        '/static/images/calorifier_gray.png',
        '/static/images/dishwasher_gray.png',
        '/static/images/machine_gray.png',
        '/static/images/others_gray.png'
      ],
      product: [0, 0, 0, 0, 0, 0, 0],
      liHeight: [],
      scrollY: 0
    }
  },
  created () {
    this.$http.get('api/catalog/home/item/search?catalog=42').then((req) => {
      this.publicData(0, req)
    })
    this.$http.get('api/catalog/home/item/search?catalog=43').then((req) => {
      this.publicData(1, req)
    })
    this.$http.get('api/catalog/home/item/search?catalog=44').then((req) => {
      this.publicData(2, req)
    })
    this.$http.get('api/catalog/home/item/search?catalog=170').then((req) => {
      this.publicData(3, req)
    })
    this.$http.get('api/catalog/home/item/search?catalog=171').then((req) => {
      this.publicData(4, req)
    })
    this.$http.get('api/catalog/home/item/search?catalog=208').then((req) => {
      this.publicData(5, req)
    })
    this.$http.get('api/catalog/home/item/search?catalog=172').then((req) => {
      this.publicData(6, req)
    })
    this.$http.get('api/catalog/home/item/search?catalog=155').then((req) => {
      this.publicData(7, req)
    })
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll () {
      this.leftDivScroll = new BScroll(this.$refs.leftDiv, {
        click: true
      })
      this.rightDivScroll = new BScroll(this.$refs.rightDiv, {
        click: true,
        probeType: 3
      })
      this.rightDivScroll.on('scroll', (pos) => {
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y))
        }
      })
    },
    publicData (i, req) {
      let {body: {data: {currentCategory: {name}, items}}} = req
      let arr = []
      if (items.length) {
        for (let i = 0; i < items.length; i++) {
          let name = items[i]['product_name']
          let price = items[i]['product_price']
          let img = items[i]['img']
          let count = items[i]['review_count']
          let obj = {
            'img': onLineUrl + '/' + img[1]['pic'],
            'name': name,
            'price': price,
            'review': count
          }
          arr.push(obj)
        }
      }
      if (!this.pag[name]) {
        this.pag[name] = ''
      }
      let obj2 = {
        'name': name,
        'size': this.pag[name],
        'prd': arr
      }
      this.$set(this.product, i, obj2)
    },
    heightData () {
      if (this.product.length === 8) {
        let rightList = this.$refs.rightList
        this.liHeight.push(0)
        let height = 0
        for (let i = 0; i < rightList.length; i++) {
          height += rightList[i].clientHeight
          this.liHeight.push(height)
        }
      }
    },
    followScroll (i) {
      let leftList = this.$refs.leftList
      leftList.forEach((el) => {
        let url = $(el).find('img').attr('src')
        url = url.split('_')[0] + '_gray.png'
        $(el).find('img').attr('src', url)
      })
      let el = leftList[i]
      let url = $(el).find('img').attr('src')
      url = url.split('_')[0] + '_blue.png'
      $(el).find('img').attr('src', url)
      this.leftDivScroll.scrollToElement(el, 300, 0, -100)
    },
    selectMenu (i) {
      let rightList = this.$refs.rightList
      let el = rightList[i]
      this.rightDivScroll.scrollToElement(el, 300)
    }
  },
  computed: {
    currentIndex () {
      let y = this.scrollY
      for (let i = 0; i < this.liHeight.length; i++) {
        let height1 = this.liHeight[i]
        let height2 = this.liHeight[i + 1]
        if (y >= height1 && y < height2) {
          this.followScroll(i)
          return i
        }
      }
    }
  }
}
</script>
<style lang="stylus">
@import '../assets/stylus/base.styl'
.assortment
  .header
    border-bottom 1px solid #e1e1e1
    font-size 20px
    height 50px
    line-height 50px
    text-align center
    color #2b5bbd
  .scrollDiv
    display flex
    position absolute
    top 50px
    bottom 50px
    width 100%
    overflow hidden
    .leftDiv
      flex 0 0 81px
      background #f4f4f4
      border-right 1px solid #e3e3e3
      li
        border-bottom 1px solid #e3e3e3
        &.active
          background #fff
        img
          width 100%
          vertical-align: bottom;
    .rightDiv
      flex 1
      padding 5px
      h4
        margin 4px
        margin-left 0
        color #98999a
        font-weight normal
        font-size 14px
      .types
        width 100%
        li
          width 32.5%
          margin-top 5px
          display inline-block
          border 1px solid #e3e3e3
          text-align center
          border-left 0
          for row in 1 4 7
            &:nth-child({row})
              border-left 1px solid #e3e3e3
            img
              width 80%
            p
              font-size 12px
              height 30px
              line-height 10px
      .hot
        margin 10px
      div
        ul
          li
            border 1px solid #eee
            .rightDownImg
              width 38%
              float left
            .rightDownText
              margin-top 16px
              width 60%
              float right
              font-size 14px
              .name
                line-height 22px
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              .liDown
                font-size 13px
                width 100%
                line-height 30px
                margin-top 8px
                .price
                  color #ed0b0b
                  font-weight: bold
                  float left
                .review
                  color #9a9a9a
                  margin-right 10px
                  float right
</style>
