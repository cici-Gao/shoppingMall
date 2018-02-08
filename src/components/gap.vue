<template>
  <div class="gap">
  </div>
</template>
<script>
import $ from 'jquery'
export default{
  name: 'gap',
  props: {
    val: {
      type: Number
    }
  },
  mounted () {
    $('.gap').css('height', this.val + 'px')
  }
}
</script>
<style lang="stylus">
.gap
    width 100%
    height 12px
    margin 0
    padding 0
    background #eee
</style>
