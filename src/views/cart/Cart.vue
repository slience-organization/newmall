<template>

  <div id="cart">
    
    <mt-header fixed title="购物街">
      <mt-button slot="right" @click="editClick"></mt-button>
    </mt-header>
    <div class="cart-null" v-if="isNull">
      <img src="~assets/img/cart/cart_null.png" alt="">
      <p>购物车为空！</p>
    </div>
    <cart-list v-else></cart-list>
    <cart-bottom></cart-bottom>
    
  </div>

</template>

<script>
  import { Header, Toast } from "mint-ui";

  import {mapGetters} from 'vuex'
  import CartBottom from 'business/cart/CartBottom.vue'
  import CartList from 'business/cart/CartList.vue'
  export default {
    name: 'Cart',
    components:{ 
      CartList, 
      CartBottom,
      Header,
      Toast
    },
    props:{},
    data(){
      return {
        isNull: true
      }
    },
    computed: {
      //mapGetters辅助函数将vueX中getters直接映射到组件compued中
      ...mapGetters(['cartLength'])
    },
    methods: {
      editClick () {
        console.log('dianji')
      }
    },
    created () {
      if (this.cartLength === 0) {
        this.isNull = true
      } else if (this.cartLength > 0){
        this.isNull = false
      }
      //console.log('created---')
    }
  }
</script>
  
<style lang="css" scoped>
  .cart-null {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 40px - 49px)
  }
</style>