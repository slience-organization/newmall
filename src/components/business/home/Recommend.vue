<template>

  <div class="recommend">
      <div  v-for="item in recommends" :key="item.acm">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </div>
  </div>

</template>

<script>
export default {
  name: 'Recommend',
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  },
}
</script>

<style  scoped>
  .recommend {
    display: flex;
    width: 100%;
    padding: 3% 5%;
    justify-content: space-between;
    border-bottom: 8px solid #eee;
    flex-grow: 0;
  }
  .recommend>div {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
  }
  .recommend img {
    width: 83%;
  }
</style>
