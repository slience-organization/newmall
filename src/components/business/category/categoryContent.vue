<template>

  <div class="container">
    <div class="left">
      <!-- <table class="categoryleft">
          <tr v-for="(item,index) in categoryList"
            :key='index' @click="trClick(index)"
            id="tritem" :class="{isbgc:currentIndex===index}">
              <td>{{item.title}}</td>
          </tr>
      </table> -->
      
        <!-- <div v-for="(item,index) in categoryList" :key="index" @click="cateClick">{{item.title}}</div> -->
        <div v-for="(item,index) in categoryList" :key="index" >
          <mt-cell title="item.title" @click.native="cateClick"></mt-cell>
        </div>
      
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
        currentIndex: 0
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
      cateClick (index) {
          this.currentIndex = index
          // console.log(index);
          this.$emit('cateClick', this.currentIndex)
      }
    },
  }
</script>

<style  scoped>
  
  .left {
    position: fixed;
    top: 40px;
    width: 24%;
    height: 100vh;
    overflow: scroll;
    background-color:#f6f6f6;;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: center;
  }
  .right {
    position: fixed;
    top: 40px;
    right: 0;
    width: 75%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    overflow: scroll;
  }
  .left>div {
    width: 100%;
    text-align: center;
    padding: 10px 0;
  }
  .right img{
    width:80px;
    height:80px;
  }
  .isbgc{
      background-color: white;
      color: #ff3324;
      border-left: 2px solid #ff3324;
  }
</style>
