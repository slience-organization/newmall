<template>
  <div>
    <div class="left">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">option A</mt-tab-item>
        <mt-tab-item id="2">option B</mt-tab-item>
        <mt-tab-item id="3">option C</mt-tab-item>
      </mt-navbar>
      <!-- <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-cell  title="content1" />
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-cell  title="content2" />
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <mt-cell  title="content3" />
        </mt-tab-container-item>
      </mt-tab-container> -->
    </div>
    <div class="right">
      <div class="infoitem" v-for="(item,index) in rightinfolist" :key='index'>
        <a :href="item.link" >
          <img v-lazy='item.image' alt="">
          <p>{{item.title}}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import { Navbar, TabItem , Button, Cell  } from 'mint-ui';
  export default {
    name: 'categoryContent',
    components: {
      Navbar,
      TabItem,
      Button,
      Cell 
    },
    data () {
      return {
        selected: '1',
        currentIndex:0
      }
    },
    props: {
      categoryList: {
        type: Array,
        default: ()=> {
          return []
        }
      },
      rightinfolist: {
        type: Array,
        default: ()=> {
          return []
        }
      }
    },
    methods: {
      trClick () {
        console.log('click')
      }
    },
  }
</script>

<style  scoped>
  .left {
    margin-top: 40px;
    width: 20%;
  }
  .mint-navbar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .right {
    
  }
  .right img{
      width:80px;
      height:80px;
  }
  
</style>
