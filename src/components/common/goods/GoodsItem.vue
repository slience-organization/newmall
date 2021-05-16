<template>

  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>

</template>

<script>
export default {
  name: 'GoodsItem',
  data () {
    return {
    }
  },
  computed: {
    //首页商品图片和详情页推荐的商品图片取值不同
      showImage () {
        return this.goodsItem.image || this.goodsItem.show.img
      }
  },
  props: {
    goodsItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    /**跳转详情 */
    itemClick () {
      //console.log(this.$route.name)
      //this.$router.push('/goodsdetail/' + this.goodsItem.iid)
      //通过路由跳转详情页，通过query传递参数
      //只有首页可以跳转详情，详情页和我的组件中复用的GoodsList不用跳转详情
      if (this.$route.name === 'Home') {
        this.$router.push({
          path: '/goodsdetail',
          query: {
            iid: this.goodsItem.iid
          }
        })
      }
      //console.log(this.goodsItem.iid)
    }
  }
}
</script>

<style  scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-white-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
