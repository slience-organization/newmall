<template>
  <!-- <swiper class="detail-swiper">
    <swiper-item v-for="(item,index) in topImages" :key="index" class="swiper-item">
      <img :src="item" alt="">
    </swiper-item>
  </swiper> -->

  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
    </mt-swipe-item>
  </mt-swipe>

</template>

<script>
  //import {Swiper,SwiperItem} from 'components/common/swiper'
  import { Swipe, SwipeItem,  } from "mint-ui";

  export default {
    name: 'DetailSwiper',
    props: {
      topImages: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: { Swipe, SwipeItem },
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
  .mint-swipe {
    height: 200px;
  }
  .mint-swipe-item img {
    width: 100%;
  }
</style>
