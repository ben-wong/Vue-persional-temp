<template>
  <div class="demo-image">
    <div class="welcome_img"> </div>
    <span> &nbsp;&nbsp;欢迎使用我的报表</span>
  </div>
</template>

<script>
export default {
  props: {
  },
  data() {
    return {
      // url: 'assets/images/inaccessible.png'
    };
  },
  methods: {

  },
  mounted: function() {

  }
};
</script>
<style scoped lang="scss">
.demo-image {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  width: 100%;
  height: 600px;
  .welcome_img {
    vertical-align: middle;
    margin-right: 4px;
    width: 36px;
    height: 36px;
    background: url('../../assets/images/agap-logo-active.png') no-repeat 100%;
  }
}
</style>
