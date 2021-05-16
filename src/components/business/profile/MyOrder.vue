<template>

  <div class="order">
    <div class="above">
      <h4>我的订单</h4>
      <span>全部 ></span>
    </div>
    <div class="below">
      <div><img src="~assets/img/profile/order/daifukuan.svg" alt=""><p>待付款</p></div>
      <div><img src="~assets/img/profile/order/daifahuo.svg" alt=""><p>代发货</p></div>
      <div><img src="~assets/img/profile/order/daishouhuo.svg" alt=""><p>待收货</p></div>
      <div><img src="~assets/img/profile/order/pingjia.svg" alt=""><p>评价</p></div>
      <div><img src="~assets/img/profile/order/shouhou.svg" alt=""><p>售后</p></div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'MyOrder',
  components:{},
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
  
<style lang="css" scoped>
  .order {
    background-color: #fff;
    margin: 0 2%;
    padding: 0 2% 4% 2%;
    border-radius: 3%;
  }
  .above {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .below {
    display: flex;
    width: 100%;
    height: 50px;
    padding: 0 6%;
    justify-content: space-between;
  }
  .below>div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .below img {
    width: 30px;
    height: 30px;
  }
  .below p {
    margin: 5px 0;
    font-size: 12px;
  }
</style>