<template>

  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
    }
  }
}
</script>

<style  scoped>
  .nav-bar {
    position: fixed;
    background-color: #fff;
    display: flex;
    height: 40px;
    line-height: 40px;
    width: 100%;
    text-align: center;
    box-shadow: 0 1px 2px rgba(100, 100, 100, .2);
  }
  .left, .right {
    width: 25%;
  }
  .left img {
    margin-top: 12px;
  }
  .center {
    flex: 1;
  }
</style>
