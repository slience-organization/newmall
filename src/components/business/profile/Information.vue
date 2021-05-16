<template>

  <div class="information">
    <div class="above">
      <div class="left">
        <img src="~assets/img/profile/above/head_portrait.jpg" alt="">
      </div>
      <div class="center">
        <p>Silencewukkyf</p>
        <img src="~assets/img/profile/above/member.svg" alt="">
        <span>时尚小萌</span>
      </div>
      <!-- <div class="right">
        <img src="~assets/img/profile/above/adduser.svg" alt="">
        <img src="~assets/img/profile/above/settings.svg" alt="">
        <img src="~assets/img/profile/above/message.svg" alt="">
      </div> -->
    </div>
    <div class="below">
      <div><img src="~assets/img/profile/below/zhuye.svg" alt=""><p>个人主页</p></div>
      <div><img src="~assets/img/profile/below/huiyuan.svg" alt=""><p>会员中心</p></div>
      <div><img src="~assets/img/profile/below/shoucang.svg" alt=""><p>收藏</p></div>
      <div><img src="~assets/img/profile/below/guanzhu.svg" alt=""><p>关注</p></div>
      <div><img src="~assets/img/profile/below/zuji.svg" alt=""><p>足迹</p></div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Information',
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
  .information {
    height: 200px;
    width: 100%;
    background-color: rgb(243, 241, 241);
    padding-top: 10%;
  }
  .above {    
    display: flex;
    width: 100%;
    height: 75px;
  }
  .above .left {
    width: 30%;
    display: flex;
    justify-content: center;
  }
  .above .left img {
    width: 75px;
    height: 75px;
    border-radius: 50%;
  }
  .above .center {
    width: 40%;
  }
  .above .center p {
    margin: 8px 0;
  }
  .above .center img {
    width: 20px;
    padding-right: 3px;
  }
  .above .center span {
    font-size: 12px;
  }
  .above .right {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
  }
  .above .right img {
    width: 30px;
    height: 30px;
  }

  .below {
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: space-between;
    margin-top: 6%;
    padding: 0 9%;
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
    margin: 3px 0;
    font-size: 12px;
  }
</style>