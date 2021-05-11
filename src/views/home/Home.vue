<template>

  <div id="home">

    <mt-header fixed title="购物街" ref="header"></mt-header>

    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in banners" :key="index">
          <img :src="item.image" alt="">
      </mt-swipe-item>
    </mt-swipe>

    <recommend ref="recommend" :recommends="recommends"></recommend>
    
    <feature-view ref="featureView"></feature-view>
   
    <tab-control ref="cpTabControl" :titles="['流行','新款','精选']"  @tabClick="tabClick" class="tabControlShown" v-show="isTabFixed"></tab-control>
   
    <tab-control id="tabControl" ref="tabControl" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
    
    <mt-loadmore :bottom-method="loadBottom" ref="loadmore">
      <goods-list :goods="goods[currentType].list"></goods-list>
    </mt-loadmore>

  </div>

</template>

<script>
  import { Header, Swipe, SwipeItem, Loadmore, Toast, } from "mint-ui";


  import {getHomeMultiData, getHomeGoods} from 'network/api'
  import Recommend from 'business/home/Recommend.vue';
  import FeatureView from 'business/home/FeatureView.vue';
  import TabControl from 'business/home/TabControl.vue';
  import GoodsList from 'common/goods/GoodsList.vue';

  export default {
    name: "Home",
    components: {
      Header,
      Swipe, 
      SwipeItem,
      Recommend,
      FeatureView,
      TabControl,
      GoodsList,
      Toast,
      Loadmore

    },
    props: {},
    data () {
      return {
        banners: [],//轮播图
        recommends: [],//推荐
        goods: { //商品数据
          'pop': {page: 0, list: []}, //保存流行的商品数据
          'new': {page: 0, list: []}, //保存新款的商品数据
          'sell': {page: 0, list: []} //保存精选的商品数据
        },
        currentType: 'pop', //当前类型
        tabControlOffsetTop: 0, //OffsetTop
        isTabFixed: false, //是否吸顶
        scrollTop: 0,

        
      };
    },
    watch: {},
    computed: {},
    methods: {
       //1、监听3个tab的点击
      tabClick (index) {
        //console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop' //流行
            break
          case 1:
            this.currentType = 'new' //新款
            break
          case 2:
            this.currentType = 'sell' //精选
            break
        }
        this.$refs.tabControl.currentIndex = index
        this.$refs.cpTabControl.currentIndex = index
        this.saveCurrentIndex = index
      },
      getHomeMultiData (){ //获取轮播图和推荐的数据
        getHomeMultiData ().then (res => {
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
          //console.log(res)
        })
      },
      //获取商品数据
      getHomeGoods (type) { //传入类型和页码
        const page = this.goods[type].page + 1
        //console.log(page)
        getHomeGoods (type,page).then (res => {
          //console.log(res)
          this.goods[type].list.push(...res.data.data.list) //(...)ES6展开运算符:依次取出数组的每个元素
          this.goods[type].page += 1
        })
      },
      loadBottom () {
        Toast('加载更多')
        //请求数据传入当前类型
        this.getHomeGoods(this.currentType)
      },
      scrollLsn () { //监听滚动位置
        window.addEventListener('scroll', this.scrolling)
      },
      scrolling () {
        this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop;
        //console.log(this.tabControlOffsetTop)
        this.scrollTop = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop).toFixed(0)
        //console.log(this.scrollTop)
        if (this.tabControlOffsetTop - this.scrollTop <= 40) {
          //console.log('tab 显示')
          this.isTabFixed = true
        } else {
          this.isTabFixed = false
        }
      }
    },
    
    created () {
      //console.log("created")
      this.getHomeMultiData()
      this.getHomeGoods ('pop') //请求流行商品数据
      this.getHomeGoods ('new') //请求新款商品数据
      this.getHomeGoods ('sell') //请求精选商品数据
      //console.log('--home created')
    },
    mounted () {
      this.scrollLsn()
      this.$nextTick(() => {
        
      })
    },
    activated () {
      //console.log('--home activated')
      this.scrollLsn()
      this.scrollTop = sessionStorage.getItem('homeOffsetTop')
      //console.log(this.positionY)
      window.scrollTo(0, this.scrollTop)
    },
    deactivated () {
      //console.log('--home deactivated')
      sessionStorage.setItem('homeOffsetTop', this.scrollTop)
      window.removeEventListener('scroll', this.scrollLsn)
    }
  };
</script>

<style lang="css" scoped>
  .tabControlShown{
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    top: 40px;
    z-index: 1;
  }
</style>
