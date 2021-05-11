<template>

  <div id="cart">
    <!-- <nav-bar class="car-nav">
      <div slot="center">购物车({{cLength}})</div>
    </nav-bar> -->
    <mt-header fixed title="购物街"></mt-header>
    <cart-list></cart-list>
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
      }
    },
    watch:{},
    computed:{ //mapGetters辅助函数将vueX中getters直接映射到组件compued中
      //...mapGetters(['cartLength'])
      ...mapGetters({
        cLength: 'cartLength'
      })
    },
  }
</script>
  
<style lang="css" scoped>
  .car-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>