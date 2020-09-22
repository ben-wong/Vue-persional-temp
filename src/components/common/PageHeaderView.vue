<template>
  <el-page-header @back="goBack" content="详情页面">
  </el-page-header>
</template>

<script>
export default {
  methods: {
    goBack() {
      console.log('go back');
    }
  }
};
</script>

<style scoped lang="scss">
  .el-page-header {
    background: #fff;
    margin: 6px;
    border-radius: 6%;
  }
  .el-menu {
    text-align: start
  }
</style>
