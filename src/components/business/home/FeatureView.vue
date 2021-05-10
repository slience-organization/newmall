<template>
  <div class="feature">
    <!-- <a href="https://act.mogujie.com/zzlx67"> -->
    
      <img src="~assets/img/home/recommend_bg.jpg" alt="" @load="imgLoad">
    
  </div>
</template>

<script>
export default {
  name: 'FeatureView',
  data () {
    return {
      isLoad: false
    }
  },
  methods: {
    imgLoad () {
      if (!this.isLoad) {
        this.$emit('featureImgLoad')
      }
    }
  },
}
</script>

<style  scoped>
  .feature img {
    width: 100%;
  }
</style>
