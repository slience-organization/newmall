<template>

  <div id="tabbar">

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="tab1" path="/home">
        
        <img slot="icon" src="~assets/img/tabbar/home_active.svg" v-if="this.selected=='tab1'">
        <img slot="icon" src="~assets/img/tabbar/home.svg" v-else>
        首页
      </mt-tab-item>
      <mt-tab-item id="tab2" path="/category">
        <img slot="icon" src="~assets/img/tabbar/category_active.svg" v-if="this.selected=='tab2'">
        <img slot="icon" src="~assets/img/tabbar/category.svg" v-else>
        分类
      </mt-tab-item>
      <mt-tab-item id="tab3" path="/cart">
        <img slot="icon" src="~assets/img/tabbar/shopcart_active.svg" v-if="this.selected=='tab3'">
        <img slot="icon" src="~assets/img/tabbar/shopcart.svg" v-else>
        购物车
      </mt-tab-item>
      <mt-tab-item id="tab4" path="/profile">
        <img slot="icon" src="~assets/img/tabbar/profile_active.svg" v-if="this.selected=='tab4'">
        <img slot="icon" src="~assets/img/tabbar/profile.svg" v-else>
        我的
      </mt-tab-item>
    </mt-tabbar>

  </div>

</template>

<script>
  
  import { Tabbar, TabItem } from "mint-ui";

  export default {
    name: 'MainTabbar',
    components: { Tabbar,TabItem },
    props: {
      path: String
    },
    data () {
      return {
        selected: 'tab1'
      }
    },
    watch: {
      selected (val, oldval) {
        if (val === 'tab1') {
          //console.log('点击了首页')
          this.$router.replace('home')
        }else if (val === 'tab2') {
          //console.log('点击了分类')
          this.$router.replace('category')
        }else if (val === 'tab3') {
          //console.log('点击了购物车')
          this.$router.replace('cart')
        }else if (val === 'tab4') {
          //console.log('点击了我的')
          this.$router.replace('profile')
        }
      }
    },
    computed: {},
    methods: {
      
    },
    created () {
      
    },
    mounted () {},
  };
</script>

<style lang="css" scoped>
  
</style>
