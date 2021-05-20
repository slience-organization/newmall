<template>

  <div id="detail">

    <detail-nav-bar ref="detailNavBar" class="detail-nav" 
      @titleClick="titleClick" :currentIndex="currentIndex"></detail-nav-bar>
    
    <!-- 顶部轮播图 -->
    <detail-swiper ref="detailSwipe" :topImages="topImages"></detail-swiper>
    <!-- 详情标题，价格 -->
    <detail-base-info ref="detailBaseInfo" :goods="goods"></detail-base-info>
    <!-- 店铺信息 -->
    <detail-shop-info ref="detailShopInfo" :shop="shop"></detail-shop-info>
    <!-- 穿着效果 -->
    <detail-goods-info ref="detailGoodsInfo" :detailGoodsInfo="detailGoodsInfo"></detail-goods-info>
    <!-- 商品参数信息 -->
    <detail-param-info ref="detailParamInfo" :paramInfo="paramInfo"></detail-param-info>
    <!-- 商品评论信息 -->
    <detail-comment-info ref="detailCommentInfo" :commentInfo="commentInfo"></detail-comment-info>
    <!-- 商品推荐信息,复用goods-list -->
    <div class="tuijian">--<img src="~assets/img/profile/aixin.svg" alt="">精选推荐--</div>
    <goods-list ref="detailGoodsList" :goods="recommendList"></goods-list>

    <detail-bottom-bar @addToCart="addToCart" @goBuy="goBuy" @leftBar="leftBar"></detail-bottom-bar>

    <back-top @click.native="backClick" v-show="isShowBacktop"></back-top>
    
  </div>

</template>

<script>
  import { Header, Toast } from 'mint-ui'
  import {_getGoodsDetail, Goods, Shop, GoodsParam, _getRecommend} from 'network/api'

  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'
  import GoodsList from 'common/goods/GoodsList.vue'
  import {debounce} from 'common/Utils'
  //import {goodsImgLsnMixin} from 'common/Mixin'
  import BackTop from 'common/backTop/BackTop.vue'
  import { mapActions } from 'vuex'

  export default {
    name: 'GoodsDetail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
      Header,
      Toast
    },
    //mixins: [goodsImgLsnMixin],
    props:{},
    data(){
      return {
        iid: '',
        topImages: [],
        goods: {},
        shop: {},
        detailGoodsInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        isShowBacktop: false,
        //goodsImgLsn: null, //监听图片加载函数
        OffsetTopArr: [], //存储标题对应元素的高度
        //getThemOffsetTop: null, //获取title对应元素高度的函数
        currentIndex: 0, //保存当前点击title的下标

      }
    },
    watch:{},
    computed:{},
    methods:{
      ...mapActions(['_addCart']),
      
      titleClick (index) {
        this.currentIndex = index
        // elmnt.scrollIntoView();
       
        //滚动到点击对应的元素位置
        window.scrollTo(0, this.OffsetTopArr[index])
      },
      getThemOffsetTop () {
        //组件update时调用，获取标题对应元素的位置
        this.OffsetTopArr = []
        this.OffsetTopArr.push(0)//商品顶部
        this.OffsetTopArr.push(this.$refs.detailParamInfo.$el.offsetTop)//参数
        this.OffsetTopArr.push(this.$refs.detailCommentInfo.$el.offsetTop)//评论
        this.OffsetTopArr.push(this.$refs.detailGoodsList.$el.offsetTop)//推荐
        this.OffsetTopArr.push(Number.MAX_VALUE)
      },
      scrollLsn () {
        window.addEventListener('scroll', this.scrolling)
      },
      scrolling () {
        //[0, 16042, 17316, 17550]
        //滚动到某个位置，要选中对应的title
        let position = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop).toFixed(0)
        let length = this.OffsetTopArr.length
        //console.log(position)
        for (let i = 0; i < length-1; i++) {
          let ipos = this.OffsetTopArr[i]
          if(position >= ipos && position < this.OffsetTopArr[i+1]) {
            if(this.currentIndex !== i) {
              this.currentIndex = i
              //console.log(this.currentIndex)
            }
            break
          }
        }
        /*滚动超过1000显示回到顶部按钮*/
        this.isShowBacktop = (position) > 1000 
      },
      addToCart () {
        //console.log('点击了添加')
        //1.收集购物车需要展示的数据
        const product = {}
        product.iid = this.iid
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.detailGoodsInfo.desc
        product.price = this.goods.realPrice
        //2.将商品添加到购物车
        //通过store.dispatch分发Action
        //this.$store.dispatch('addCart', product).then(res => {console.log(res)})
        //通过mapAction辅助函数直接调用映射的方法
        this._addCart(product).then(res => {
          Toast({message:res, duration:800})
        })
      },
      goBuy () {
        Toast({message:'飞到外星去了！', duration:800})
      },
      leftBar () {
        Toast({message:'飞到外星去了！', duration:800})
      },
      backClick () {
        window.scrollTo(0, 0)
      },
      getGoodsDetail () {
        //根据商品ID请求详情数据
        _getGoodsDetail(this.iid).then(res => {
          //console.log(res.status)
          if(res.status === 200){
            //先将返回的数据保存起来 -> 返回的数据太过复杂，下面会抽取出来分开保存
            let data = res.data.result
            //取出顶部轮播图
            this.topImages = data.itemInfo.topImages
            //获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            //获取店铺信息
            this.shop = new Shop(data.shopInfo)
            //获取商品的详情数据detailInfo
            this.detailGoodsInfo = data.detailInfo
            //获取商品参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            //获取评论信息
            this.commentInfo = data.rate.list[0]
          }
        })
      },
      getRecommend () {
        //获取商品推荐信息，因为和首页商品一样，这里接口只返回了固定的24条数据
        _getRecommend().then((res, error) => {
          this.recommendList = res.data.data.list
          //console.log(this.recommendList)
        })
      }
    },
    created(){ 
      //保存路由传递过来的参数
      this.iid = this.$route.query.iid
      this.getGoodsDetail()
      this.getRecommend()
    },
    mounted(){
      window.scrollTo(0, 0)
      
    },
    updated(){
      //父组件updated就去从新计算标题对应元素的位置
      this.scrollLsn()
      this.getThemOffsetTop()
    }
  }
</script>
  
<style lang="css" scoped>
  #detail {
    height: 100vh;
    /* position: relative; */
    z-index: 9;
    background-color: #fff;
  }
  .detail-nav {
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }

  .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }
  
 .tuijian {
    display: flex;
    justify-content: center;
    background-color: #f2f5f8;
  }
  .tuijian  img {
    width: 15px;
    height: 15px;
  }
</style>