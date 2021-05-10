<template>

  <div id="home">
    <mt-header fixed title="购物街"></mt-header>
    <mt-swipe :auto="4000" ref="swipe" id="swipe">
      <mt-swipe-item v-for="(item,index) in banners" :key="index">
          <img :src="item.image" alt="" @load="swipeLsn">
      </mt-swipe-item>
    </mt-swipe>
    <recommend ref="recommend" id="recommend" :recommends="recommends" @recommendImgLoad="recommendImgLsn"></recommend>
    <feature-view ref="featureView" id="featureView" @featureImgLoad="featureImgLsn"></feature-view>
    <tab-control ref="cpTabControl" :titles="['流行','新款','精选']" 
        @tabClick="tabClick" class="tabControlShown" v-show="isTabFixed"></tab-control>
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
        positionY: 0,
        swipeImgLoad: false,
        recommendImgLoad: false,
        featureImgLoad: false

        
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
      swipeLsn () {
        if (!this.swipeImgLoad) {
          this.swipeImgLoad = true
          //console.log('轮播图加载了')
        }
      },
      recommendImgLsn () {
        if (!this.recommendImgLoad) {
          this.recommendImgLoad = true
          //console.log('推荐图加载了')
        }
      },
      featureImgLsn () {
        if (!this.featureImgLoad) {
          this.featureImgLoad = true
          //console.log('本周流行图加载了')
        }
      },
      scrollMonitor () { //监听滚动位置
        window.addEventListener('scroll', () => {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          this.positionY = scrollTop.toFixed(2)
          
          //console.log(this.positionY)
          if (this.positionY >= this.tabControlOffsetTop) {
            //console.log(this.positionY)
            //this.isTabFixed = true
            console.log('tab 显示')
          }
        })
      },
      offsetTop (elem) { //获取元素offsetTop
          var top = elem.offsetTop; 
          var parent = elem.offsetParent; 
          while(parent){ 
              top += parent.offsetTop; 
              parent = parent.offsetParent; 
          }
          return top; 
      }
    },
    created () {
      this.getHomeMultiData()
      this.getHomeGoods ('pop') //请求流行商品数据
      this.getHomeGoods ('new') //请求新款商品数据
      this.getHomeGoods ('sell') //请求精选商品数据
      //console.log('--home created')
      
    },
    mounted () {

      this.$nextTick(() => {

        
        let sp = window.getComputedStyle(swipe).height
        let rp = window.getComputedStyle(recommend).height
        let fp = window.getComputedStyle(featureView).height
        
        //console.log(window.getComputedStyle(featureView).height)
        console.log(this.$refs.swipe.$el.offsetHeight)

      })
      
      if (!this.swipeImgLoad && !this.recommendImgLoad && !this.featureImgLoad) {
        
          //this.tabControlOffsetTop = this.offsetTop(tabControl)
          
          //console.log(this.tabControlOffsetTop)
      }

      this.scrollMonitor()
      
    },
    activated () {
      //console.log('--home activated')
      this.positionY = sessionStorage.getItem('homeOffsetTop')
      //console.log(this.positionY)
      window.scrollTo(0, this.positionY)
    },
    deactivated () {
      //console.log('--home deactivated')
      //console.log('离开时'+this.positionY)
      sessionStorage.setItem('homeOffsetTop', this.positionY)
    }
  };
</script>

<style lang="css" scoped>
  .mint-swipe {
    height: 200px;
  }
  .mint-swipe-item img {
    width: 100%;
  }
</style>
