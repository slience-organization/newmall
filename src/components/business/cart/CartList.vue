<template>

  <div class="cart-container">
     
       <cart-list-item v-for="item in cartList" :key="item.iid" :product="item"></cart-list-item>
     
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import CartListItem from './CartListItem.vue'

  export default {
  neme: 'CartList',
  components: { CartListItem },
    data () {
      return {
      }
    },
    computed: {
      //mapGetters辅助函数将vueX中getters直接映射到组件compued中
      ...mapGetters(['cartList'])
    },
    activated () {
      //console.log('---')
      //this.$refs.scroll.refresh()
      //console.log(this.cartList)
    }
  }
</script>

<style  scoped>
  .cart-container {
    margin-top: 40px;
    height: calc(100vh - 40px - 49px)
  }
  .cart-list {
    height: 100%;
    overflow: hidden;
  }
</style>
