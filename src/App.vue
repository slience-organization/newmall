<template>

  <div id="app">

    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <main-tabbar></main-tabbar>

  </div>

</template>

<script>
  import MainTabbar from 'business/mainTabbar/MainTabbar.vue';
  export default {
    components: { MainTabbar },
    props: {},
    data() {
      return {};
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {},
  };
</script>

<style lang="scss" scoped>
</style>
