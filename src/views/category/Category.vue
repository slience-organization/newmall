<template>

  <div>
    <mt-header fixed title="分类" ref="header"></mt-header>

    <category-content :categoryList="categoryList" :rightinfolist="rightinfolist"></category-content>
  </div>

</template>

<script>
  
  import { getCategory, getSubcategory } from 'network/api'
  import CategoryContent from 'business/category/categoryContent.vue'
  export default {
    
    components: {CategoryContent},
    props: {},
    data () {
      return {
        categoryList: [],
        rightinfolist: []
      }
    },
    watch: {},
    computed: {},
    methods: {
      getCategory () {
        getCategory ().then((res) => {
          //console.log(res)
          this.categoryList = res.data.data.category.list
          //console.log(this.categoryList)
        })
      },
      getSubcategory (maitKey) {
        getSubcategory ().then((res) => {
          console.log(res)

        })
      }
    },
    created () { 
      this.getCategory()
    },
    mounted () { }
  }
</script>
  
<style lang="scss" scoped>
</style>