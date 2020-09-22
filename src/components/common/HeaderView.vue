<template>
  <el-header>
    <el-row type="flex">
      <el-col class="edu-logo-title">
        <span  @click="ShowhideNav">
          <i class="left-logo" v-if="isLeft"></i>
          <i class="left-logo right-logo" v-else></i>
        </span>
      </el-col>
      <el-col>
        <div class="header-right">
          <div class="avator-box">
            <i class="agap-logo"></i>
              <span class="agap-logo-text" @click="goAgapSite">
                经分管理台
              </span>
            <!-- <el-tooltip class="item" effect="dark" content="功能建设中..." placement="bottom">
              <span class="agap-logo-text" @click="goAgapSite">
                经分管理台
              </span>
            </el-tooltip> -->
            <div class="float-right">
              <el-dropdown trigger="click" placement="bottom-start">
                <span class="avator">
                  <span class="username mr6">
                    <!-- <span class="hex"> -->
                      <span class="hexIn"></span>
                    <!-- </span> -->
                  </span>
                  {{ userId }}
                </span>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item>
                    <div @click="logout">
                      <i class="el-icon-circle"></i>退出
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <!-- <span @click="logout" class="logout">
            <i class="el-icon-switch-button"></i>退出
          </span> -->
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
// import axios from 'axios';
import { logout } from 'api/url';
export default {
  name: 'HeaderView',
  data() {
    return {
      userId: '',
      isLeft: true,
    };
  },
  mounted() {
    this.getUserId();
  },
  methods: {
    goAgapSite() {
    },
    ShowhideNav() {
      this.isLeft = !this.isLeft;
      this.$emit('fatherMethod');
    },
    getUserId() {
      this.userId = this.$store.state.wo_user;
    },
    logout() {
      this.$requestApi.post(logout).then(res => {
        window.sessionStorage.removeItem('wo_user');
        window.sessionStorage.removeItem('wo_token');
        window.sessionStorage.removeItem('wo_userId');
        const urlPre = this.getUniportalUrl();
        const issuer = this.getEnvIssuer();
        const url = urlPre + issuer;
        location.replace(url); // w3退出
      });
    },
    getEnvIssuer() {
      const urlList = location.href.split('/');
      let issuer = 'agap'; // 开发，现网
      if (urlList.includes('agap_grey')) { // 灰度
        issuer = 'agap_grey';
      }
      if (urlList.includes('agapsec')) { // 安全
        issuer = 'agapsec';
      }
      if (urlList.includes('agap-sit')) { // 测试
        issuer = 'agap-sit';
      }
      if (urlList.includes('agap-st')) { // 测试
        issuer = 'agap-st';
      }
      if (urlList.includes('agap')) { // 开发，现网
        issuer = 'agap';
      }
      return issuer;
    },
    getUniportalUrl() {
      let url = 'https://uniportal.huawei.com/saaslogin/logout?issuer='; // 默认生产
      const urlOrigin = location.origin.split('/');
      const isTestEnv = urlOrigin.includes('wo-beta04.cloud.huawei.com');
      if (isTestEnv) {
        url = 'https://uniportal-beta.huawei.com/saaslogin/logout?issuer=';
      }
      return url;
    },
  }
};
</script>

<style scoped lang="scss">
.el-header {
    font-size: 12px;
    line-height: 100%;
    background: #2C2D34;
    height: 50px;
    padding: 0;
    border-left: 1px solid #404351;
  }
  .el-dropdown, .float-right {
    float: right;
  }
  .edu-logo-title {
    line-height: 50px;
    height: 50px;
    font-size: 16px;
  }
  .edu-logo-bg {
    vertical-align: middle;
    display: inline-block;
    width: 36px;
    height: 36px;
    background: url('../../assets/images/logo.png') no-repeat 100%;
  }
  .left-logo {
    cursor: pointer;
    display: inline-block;
    margin-left: 22px;
    width: 19px;
    height: 50px;
    background: url("../../assets/images/left.png") no-repeat center/100%;
  }
  .left-logo:hover {
  background: url("../../assets/images/left-active.png") no-repeat center/100%;
  }
  .right-logo {
  background: url("../../assets/images/right.png") no-repeat center/100%;
  }
  .right-logo:hover {
  background: url("../../assets/images/right-active.png") no-repeat center/100%;
  }
.agap-logo {
  display: inline-block;
  vertical-align: middle;
  width: 17px;
  height: 17px;
  margin-bottom: 5px;
  background: url("../../assets/images/agap-logo-2x.png") no-repeat center/100%;
}
.agap-logo-text {
  // cursor: pointer;
  display: inline-block;
  line-height: 50px;
  font-size: 14px;
  padding-right: 20px;
  padding-left: 6px;
}
// .agap-logo-text:hover {
//   color: #8C9FFF;
// }
.menu-box:hover .edu-logo-menu {
  background: url("../../assets/images/agap-logo-active.png") no-repeat 100%;
}
.menu-box {
  font-size: 14px;
}
.header-right {
  user-select:none;
  float: right;
  box-sizing: border-box;
  height: 50px;
  margin-right: 25px;
}
.avator {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  margin-right: 12px;
  color: #fff;
  cursor: pointer;
}
.hex {
  overflow: hidden;
  display: block;
  width: 22px;
  height: 26px;
  transform: rotate(-60deg) skewY(30deg);
}
.hexIn {
  background-color: #ccc;
  display: block;
  width: 17px;
  height: 17px;
  margin-bottom: 4px;
  line-height: 26px;
  text-align: center;
  // transform: skewY(-30deg) rotate(60deg);
  background: url("../../assets/images/users-2x.png") no-repeat center/100%;
}
.avator-box {
  display: inline-block;
  color: #fff;
  height: 50px;
  line-height: 50px;
}
.username {
  display: inline-block;
  font-size: 14px;
  color: #ffffff;
  vertical-align: middle;
}
.logout {
  display: inline-block;
  color: #ffffff;
  font-size: 14px;
  line-height: 40px;
  cursor: pointer;
}
.logout:hover {
  color: #8c9fff;
}
.mr6 {
  margin-right: 6px;
}
// .el-icon-switch-button {
//   font-size: 14px;
//   margin-right: 4px;
// }
// /deep/ .el-popper{
//   margin-top:0 !important;
// }
/deep/ .el-dropdown-menu__item {
  top:38px !important;
  left: 1210px !important;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  .el-icon-circle{
    width:4px;
    height:4px;
    border-radius:100%;
    margin-bottom: 2px;
    background: #DEE3F0;
  }
  &:hover {
    background: transparent;
    div {
      color: #3b54d6;
      background: none;
      .el-icon-circle {
        background: #3b54d6;
      }
    }
  }
}
</style>
