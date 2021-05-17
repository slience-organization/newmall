<template>

  <div id="cart">
    
    <mt-header fixed title="购物街">
      <mt-button slot="right" @click="titleClick">{{editOrComplete}}</mt-button>
    </mt-header>
    <div class="cart-null" v-if="isNull">
      <img src="~assets/img/cart/cart_null.png" alt="">
      <p>购物车为空！</p>
    </div>
    <cart-list v-else></cart-list>
    <cart-bottom ref="cartBottom"></cart-bottom>
    
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
        isNull: true,
        isShowE: true,
        editOrComplete: '编辑'
      }
    },
    computed: {
      //mapGetters辅助函数将vueX中getters直接映射到组件compued中
      ...mapGetters(['cartLength'])
    },
    methods: {
      titleClick () {
        if(this.editOrComplete == '编辑'){
          this.editClick()
        }else{
          this.completeClick()
        }
      },
      editClick () {
        console.log('点击编辑')
        this.editOrComplete = '完成'
        this.isShowE = false
        this.$refs.cartBottom.isDelete = true
        this.$refs.cartBottom.isTotal = false
      },
      completeClick () {
        console.log('点击完成')
        this.editOrComplete = '编辑'
        this.$refs.cartBottom.isDelete = false
        this.$refs.cartBottom.isTotal = true
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