<template>

  <div class="cart-container">
    <div class="cart-null" v-show="isNull">
      <img src="~assets/img/cart/cart_null.png" alt="">
      <p>购物车为空！</p>
    </div>
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
        isNull: true
      }
    },
    computed: {
      //mapGetters辅助函数将vueX中getters直接映射到组件compued中
      ...mapGetters(['cartList','cartLength'])
    },
    mounted () {
      if (this.cartLength) {
        this.isNull = false
      } else {this.isNull = true}
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

  .cart-null {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 40px - 49px)
  }
</style>
