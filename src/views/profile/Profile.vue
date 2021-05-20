<template>

  <div id="profile">

    <information></information>
    <my-order></my-order>
    <my-tools></my-tools>
    <div class="tuijian">
      --<img src="~assets/img/profile/aixin.svg" alt="">
      精选推荐--
    </div>
    <!-- 商品推荐信息,复用goods-list -->
    <goods-list :goods="recommendList"></goods-list>  

  </div>

</template>

<script>
  import {_getRecommend} from 'network/api'

  import Information from 'business/profile/Information.vue'
  import MyOrder from 'business/profile/MyOrder.vue'
  import MyTools from 'business/profile/MyTools.vue'
  import GoodsList from 'common/goods/GoodsList.vue'
  export default {
    components: {
      Information,
      MyOrder,
      MyTools,
      GoodsList
    },
    props: {},
    data () {
      return {
        recommendList: []
      }
    },
    watch: {},
    computed: {},
    methods: {},
    created () {
      //获取商品推荐信息，因为和首页商品一样，这里接口只返回了固定的24条数据
      _getRecommend().then((res, error) => {
        //if (error) return
        this.recommendList = res.data.data.list
        //console.log(res)
      })
    },
    mounted () { }
  }
</script>
  
<style lang="css" scoped>
  #profile {
    background-color: rgb(243, 241, 241);
  }

  .tuijian {
    display: flex;
    justify-content: center;
    margin-bottom: 5%;
  }
  .tuijian  img {
    width: 15px;
    height: 15px;
  }
</style>