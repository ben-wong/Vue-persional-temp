<template>
  <div class="demo-image">
    <div class="error-img">
    </div>
    <p>您暂时还未申请任何权限，没有内容可查看哦！</p>
    <span @click="gotoAuth">快去申请权限吧～</span>
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
    gotoAuth() {
      const urlList = location.href.split('/');
      let path = '/agap'; // 开发，现网
      if (urlList.includes('agap_grey')) { // 灰度
        path = '/agap_grey';
      }
      if (urlList.includes('agapsec')) { // 安全
        path = '/agapsec';
      }
      if (urlList.includes('agap-sit')) { // 测试
        path = '/agap-sit';
      }
      if (urlList.includes('agap-st')) { // 测试
        path = '/agap-st';
      }
      const url = location.origin + path + '/report/#/home';
      location.replace(url);
    }
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
  flex-direction: column;
  width: 100%;
  height: 100%;
  .error-img {
    height: 195px;
    width: 272px;
    background: url('../../assets/images/inaccessible.png') no-repeat center/100%;
  }
}
.demo-image p{
  text-align: center;
  font-size: 18px;
}
.demo-image span {
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  color: #3B54D6;
  cursor: pointer;
}
</style>
