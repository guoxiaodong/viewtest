<style scoped>
    @import '../static/css/common.css';
    body { background-color: #fff; }
</style>
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei', Helvetica, PingFang SC, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
