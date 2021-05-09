<template>

  <div class="goods">
    <goods-item v-for="item in goods" :key="item.id" :goodsItem="item"/>
  </div>

</template>

<script>
 import GoodsItem from './GoodsItem'

  export default {
    name: 'GoodsList',
    components: {GoodsItem},
    data () {
      return {
      }
    },
    props: {
      goods: {
        type: Array,
        dafault () {
          return []
        }
      }
    }
  }
</script>

<style  scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }

</style>
