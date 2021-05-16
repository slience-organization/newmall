<template>
  
  <div class="tools">
    <div class="above">
      <h4>我的工具</h4>
    </div>
    <div class="below">
      <div><img src="~assets/img/profile/tool/qiandao.svg" alt=""><p>签到</p></div>
      <div><img src="~assets/img/profile/tool/shangjia.svg" alt=""><p>商家入驻</p></div>
      <div><img src="~assets/img/profile/tool/jiekuan.svg" alt=""><p>美丽借</p></div>
      <div><img src="~assets/img/profile/tool/jiuyi.svg" alt=""><p>旧衣回收</p></div>
      <div><img src="~assets/img/profile/tool/kefu.svg" alt=""><p>客服</p></div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'MyTools',
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
  .tools {
    background-color: #fff;
    margin: 5% 2%;
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