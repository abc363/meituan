<template>
  <div id="app">
    <!-- 路由占位符 (通过路由匹配的组件都会渲染router-view中去-->
    <router-view></router-view>
  </div>
</template>

<script>
export default{
  name:"app"
}
</script>

<style lang="less" >
*{
  margin:0;
  padding: 0;
}
ul,li{
  list-style: none;
}
</style>
