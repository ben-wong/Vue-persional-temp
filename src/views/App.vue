<template>
  <div id="app">
    <!-- csrf Token接口判断用户是否登录 -->
    <template v-if="!isTokenLogin">
      <welcome></welcome>
    </template>
    <template v-else>
    <el-container>
      <el-aside width="210px" class="showNav" :class="{'hideNav': isShowNav}">
        <nav-menu height="100%" style="background:#3E404D;"></nav-menu>
      </el-aside>
      <el-container>
        <el-header>
          <header-view @fatherMethod="showHideNav"></header-view>
        </el-header>
        <el-main>
          <router-view height="100%" v-if="isTokenLogin" />
        </el-main>
      </el-container>
    </el-container>
  </template>
  </div>
</template>

<script>
import NavMenu from 'components/common/NavMenuView';
import HeaderView from 'components/common/HeaderView';
import welcome from 'views/error/welcome';
import { islogin, menus } from 'api/url';
// import { saveLogs } from 'api/saveLogs';
export default {
  components: { NavMenu, HeaderView, welcome },
  data() {
    return {
      isTokenLogin: false,
      isShowNav: false,
    };
  },
  watch: {
    // '$store.state.isAuth': {
    //   handler(value) {
    //     this.isAuth = this.$store.state.isAuth;
    //   },
    //   deep: true,
    //   immediate: true
    // },
    // '$store.state.isTokenLogin': {
    //   handler() {
    //     this.isTokenLogin = this.$store.state.isTokenLogin;
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  created() {
    // window.addEventListener('beforeunload', e => this.beforeunloadFn(e));
    // this.$requestApi.get(islogin).then(() => { this.isTokenLogin = true; });
    this.getLogin().then(() => {
      this.getAgapOriMenu();
    });
  },
  mounted() {
    this.$watermark.set(this.$store.state.wo_user);
  },
  destroyed() {
    // window.removeEventListener('beforeunload', e => this.beforeunloadFn(e));
  },
  methods: {
    getAgapOriMenu() {
      this.$requestApi.get(menus).then(res => {
        const data = res.data || [];
        // this.$store.state.agapOriMenu = data;
        this.$store.commit('setMenu', data);
        console.log('appppppppppppp');
        this.isTokenLogin = true;
      });
    },
    getLogin() {
      return this.$requestApi.get(islogin).then(res => {
        this.$store.state.wo_user = res.account;
        this.$watermark.set(res.account);
      });
    },
    showHideNav() {
      this.isShowNav = !this.isShowNav;
      // 收缩展开左侧导航栏，刷新iframe
      document.getElementById('newFrame') && document.getElementById('newFrame').contentWindow.location.reload(true);
      // 窗口大小变化，store存贮, 用于echarts图重绘
      setTimeout(() => {
        this.$store.commit('setNavMenuChangeFlag', this.isShowNav);
      }, 300);
    },
    // getWiseoperMenu,
    beforeunloadFn() { // 本地存储 记录F5刷新前的当前页面
      // sessionStorage.setItem('educenterCurrentPage', this.$route.path);
    }
  }
};
</script>

<style lang="scss">
@import "assets/css/agapCommon";
html, body, #app, .el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
  box-sizing: border-box;
}

body .el-table th.gutter {
  display: table-cell!important;
}

#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #fff;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  width: 20%;
  height: 100%;
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-main {
  box-sizing: border-box;
  background: #FFF;
  padding: 20px;
  border-left: 1px solid #DEE3F0;
}
.bottom {
  color: #878B8F;
  text-align: center;
  line-height: 2%;
}
.el-date-editor.el-input {
  width: 193px;
}
.el-header {
  padding: 0;
  background: #2C2D34!important;
  height: 50px!important;
}
.el-aside {
  margin: 0!important;
}
.showNav {
  opacity: 1;
  transition: .4s;
  width: 210px!important
}
.hideNav {
  opacity: 0;
  transition: .4s;
  width: 0!important
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
  width: 6px;
  height:8px;
}
/*定义滚动条轨道 圆角*/
::-webkit-scrollbar-track
{
  border-radius: 10px;
  background-color:none;
}
/*定义滑块 圆角*/
::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  background-color: rgba(67,74,93,0.6);
  // opacity: 0.1 !important;
}
::-webkit-scrollbar-button {
    display: block;
}
// ::-webkit-scrollbar-button:horizontal:single-button:start {
//     width: 0px;
//     background: url("../img/scroll_btn.png") 0 -52px no-repeat;
//     cursor: pointer;
// }
// ::-webkit-scrollbar-button:horizontal:single-button:end {
//     width: 0px;
//     background: url("../img/scroll_btn.png") 0 -77px no-repeat;
//     cursor: pointer;
// }
// ::-webkit-scrollbar-button:vertical:single-button:start {
//     width: 0px;
//     background: url("../img/scroll_btn.png") -3px 0px no-repeat;
//     cursor: pointer;
// }
// ::-webkit-scrollbar-button:vertical:single-button:end {
//     width: 0px;
//     background: url("../img/scroll_btn.png") -3px -26px no-repeat;
//     cursor: pointer;
// }
</style>
