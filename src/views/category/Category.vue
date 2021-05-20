<template>

  <div id="category">
    <mt-header fixed title="分类" ref="header"></mt-header>

    <div class="left">
      <div v-for="(item,index) in categoryList" :key="index" 
        :class="{isbgc:currentIndex==index}" @click="cateClick(index)">
        {{item.title}}
      </div>
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
  import { Cell  } from 'mint-ui';
  import { _getCategory, _getSubcategory } from 'network/api'
  
  export default {
    components: {
      Cell
    },
    props: {},
    data () {
      return {
        categoryList: [],
        rightinfolist: [],
        currentIndex: 0,
        maitKey: 3627
      }
    },
    watch: {},
    computed: {},
    methods: {
      getCategory () {
        _getCategory ().then((res) => {
          //console.log(res)
          this.categoryList = res.data.data.category.list
          //console.log(this.categoryList)
        })
      },
      getSubcategory (maitKey) {
        _getSubcategory (this.maitKey).then((res) => {
          this.rightinfolist = res.data.data.list
          //console.log(this.rightinfolist)
        })
      },
      cateClick (index) {
        this.currentIndex = index
        this.maitKey = this.categoryList[index].maitKey
        this.getSubcategory(this.maitKey)
        //this.maitKey = k
        //console.log('点击了' + index)
      }
    },
    created () { 
      this.$nextTick(()=> {
        this.getCategory()
        this.getSubcategory(this.currentIndex)
      })
    },
    mounted () { }
  }
</script>
  
<style lang="css" scoped>
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
    bottom: 55px;
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