<template>
  <div class="splitDiv">
    <span class="split"></span>
    {{title}}
    <span class="split"></span>
  </div>
</template>
<script>
export default {
  name: 'split',
  props: {
    title: {
      type: String
    }
  }
}
</script>
<style lang='stylus'>
.splitDiv
  display flex
  justify-content center
  color #565353
  margin 16px 0
  .split
    width 50px
    height 2px
    border-top 1px solid #000
    display inline-block
    position relative
    top 10px
    margin 0 10px
</style>
