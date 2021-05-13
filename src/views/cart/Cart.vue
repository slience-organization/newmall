<template>

  <div id="cart">
    
    <mt-header fixed title="购物街"></mt-header>
    <cart-list></cart-list>
    <cart-bottom></cart-bottom>
    
  </div>

</template>

<script>
  import { Header, Toast } from "mint-ui";
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
    }
  }
</script>
  
<style lang="css" scoped>
  
</style>