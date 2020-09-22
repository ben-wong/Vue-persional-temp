<template>
<el-aside width="210px;height: 100%;">
    <el-header>
      <div class="menu-box">
        <i class="small-icon-default" :class="miniIconClassName"></i>
        <b class="site-title" @mouseover="isBotArrow=false" @mouseleave="isBotArrow=true">{{ siteName }}</b>
        <span v-if="siteId !== 403">
          <i class="bot-arrow-icon" v-if="isBotArrow" @mouseover="isBotArrow=false"></i>
          <i class="top-arrow-icon" v-else @click="isBotArrow=true" @mouseleave="isBotArrow=true"></i>
        </span>
        <ul class="menu-list" v-show="isShowTab" @mouseover="isBotArrow=false" @mouseleave="isBotArrow=true">
          <li :class="{'site-text-active': siteIndex === index }" v-for="(item, index) in siteList" :key="item.id" @click="setSiteTitle(item.id, item.moduleNameCn, index)">{{ item.moduleNameCn }}</li>
        </ul>
      </div>
    </el-header>
    <el-menu ref="menu" :default-active="currentPage" unique-opened router background-color="#3E404D">
      <el-submenu v-show="siteId !== 403"  v-for="item in menuList.filter(item => item.moduleId === siteId)" :key="item.resourceNameCh" :index="String(item.resourceNameCh)">
        <template slot="title">{{item.resourceNameCh}}</template>
        <el-menu-item-group>
          <el-menu-item v-for="subItem in item.subMenu" :index="String(subItem.resourceUrl)" :key="subItem.resourceUrl" @click="clickMenu(subItem.resourceUrl)">
            {{subItem.resourceNameCn}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <div v-show="siteId === 403" class="lock-menu">
        <p class="lock-menu-text">
          暂无内容
        </p>
      </div>
    </el-menu>
  </el-aside>
</template>

<script>
import { menus, modules } from 'api/url';
import Api from 'api/http';
import { saveLogs } from 'api/saveLogs';

export default {
  name: 'NavMenu',
  data() {
    return {
      menuList: [],
      currentPage: '',
      menuIndex: [],
      isToPageAuth: false,
      smallIconClassObj: {
        0: 'small-icon-h5',
        1: 'small-icon-edu',
        2: 'small-icon-promotion',
        3: 'small-icon-game',
        4: 'small-icon-platform',
        8: 'small-icon-agc',
        11: 'small-icon-apptouch',
        12: 'small-icon-dev',
        13: 'small-icon-public',
        403: 'small-icon-lock'
      },
      siteList: [],
      isBotArrow: true,
      siteIndex: 0,
      siteName: '经营分析平台',
      siteId: '',
    };
  },
  props: {
  },
  computed: {
    isShowTab() {
      return !this.isBotArrow;
    },
    miniIconClassName() {
      return this.smallIconClassObj[this.siteId];
    },
  },
  watch: {
    $route: {
      handler(to, from) {
        console.log('______切换菜单________', to.path);
        this.currentPage = to.path;
        if (this.siteId) {
          saveLogs({ moduleId: this.siteId });
          return;
        }
        console.log('首次被加载');
        this.buryingPoint(to.path);
      },
      deep: true,
      immediate: true
    },
  },
  created() {
    // this.init();
    const path = (location.hash.split('?')[0]).replace(/^#/, '');
    this.findModuleAndMenu(path);
  },
  mounted() {
  },
  methods: {
    buryingPoint(path) {
      // Api.get(menus).then(res => {
      const data = this.$store.state.agapOriMenu || [];
      const curList = data.find(item => item.resourceUrl === path) || {};
      const moduleId = curList.moduleId;
      saveLogs({ moduleId });
      // });
    },
    findModuleAndMenu(path) {
      if (path === '/') {
        this.getModules(true);
        return;
      }
      this.getCurModuleFromRouterPath(path).then(moduleId => {
        this.getModules(false, moduleId);
      });
    },
    getCurModuleFromRouterPath(path) {
      return Api.get(menus).then(res => {
        const data = res.data || [];
        const curList = data.find(item => item.resourceUrl === path) || {};
        this.siteName = curList.moduleNameCn;
        this.siteId = curList.moduleId;
        const moduleId = curList.moduleId;
        return moduleId;
      });
    },
    setSiteTitle(id, siteName, index) {
      if (this.siteIndex === index) {
        return;
      }
      this.siteId = id;
      this.siteIndex = index;
      this.siteName = siteName;
      this.isBotArrow = true;
      const path = (this.menuList.find(item => item.moduleId === id) || {}).subMenu[0].resourceUrl;
      this.currentPage = path;
      this.$router.push(path);
    },
    getModules(isNohash = true, moduleId = 0) {
      this.siteList = [];
      return Api.get(modules).then(res => {
        const data = res.data || [];
        console.log('------dddd----', data);
        this.siteList = data;
        if (data.length === 0) {
          this.siteName = '无权限状态';
          this.siteId = 403;
          this.$router.push('/error/NoAuth');
          console.log('------siteName----', this.siteName);
          return;
        }
        if (isNohash) {
          this.siteId = (this.siteList[0])['id'];
          this.siteName = (this.siteList[0])['moduleNameCn'];
          this.siteIndex = 0;
        }
        this.siteIndex = data.findIndex(item => item.id === moduleId);
        return isNohash;
      }).then(isNohash => {
        this.getMenu(isNohash);
      });
    },
    getMenu(isNohash) {
      this.menuList = [];
      return Api.get(menus).then(res => {
        const data = res.data || [];
        this.$store.state.agapOriMenu = data;
        const parentResourceIdList = [...new Set(data.map(item => item.parentResourceId))]; // 菜单ID唯一
        console.log('--resourceNameCnList--', parentResourceIdList);
        parentResourceIdList.forEach(items => {
          const subMenu = data.filter(item => item.parentResourceId === items);
          const resourceNameCh = subMenu[0].parentResourceNameCn;
          const moduleId = subMenu[0].moduleId;
          this.menuList.push({ resourceNameCh, subMenu, moduleId });
        });
        if (isNohash) {
          this.currentPage = this.menuList[0].subMenu[0].resourceUrl;
          this.$router.push(this.currentPage);
        }
      });
    },
    init() {
      this.menuList = this.$store.state.agapMenu.menuList;
      this.menuList.forEach(item => {
        this.menuIndex.push(String(item.orderNum));
      });
      // 判断用户权限，展示第一个有权限的页面，并设置高亮
      if (window.performance.navigation.type === 0 || !sessionStorage.getItem('educenterCurrentPage') || sessionStorage.getItem('educenterCurrentPage') === '' || sessionStorage.getItem('educenterCurrentPage') === '/') { // 刷新页面，获取sessionStorage的值
        if (this.$store.state.agapMenu.overall) {
          this.$router.push('/general');
          this.currentPage = '1';
        } else {
          this.$store.state.agapMenu.menuList[0] && this.$router.push(this.$store.state.agapMenu.menuList[0].subMenu[0].resourceUrl);
          this.currentPage = String(this.$store.state.agapMenu.menuList[0].subMenu[0].orderNum);
        }
      } else {
        this.$router.push(sessionStorage.getItem('educenterCurrentPage'));
        if (sessionStorage.getItem('educenterCurrentPage') === '/general') {
          this.$router.push('/general');
          this.currentPage = '1';
        } else {
          let pageIndex = 0;
          this.$store.state.agapMenu.menuList.filter(item => {
            return item.subMenu.filter(subItem => {
              if (subItem.resourceUrl === sessionStorage.getItem('educenterCurrentPage')) {
                pageIndex = subItem.orderNum;
              }
            });
          });
          if (pageIndex) { // 如果当前页没有权限，则跳转
            this.currentPage = String(pageIndex);
          } else {
            this.$router.push('/error/NoAuth');
          }
        }
      }
    },
    clickMenu(menuNum) {
      // 每次请求接口判断权限是否变更
      if (this.currentPage === menuNum) {
        return;
      }
      this.$requestApi.get(menus).then(res => {
        const data = res.data || [];
        this.$store.state.agapOriMenu = data;
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
  .hideNav {
    width: 0;
  }
  .el-aside {
    margin-top: 6px;
    overflow: auto;
    height: 100%;
    background-color: #fff;
  }
  .pageMenuItem {
    font-size: 16px;
  }
  .el-menu-item {
    background: #fff;
  }
  .el-menu >>> .el-submenu__title {
    background: #fff;
  }
  .el-menu {
    height: calc(100% - 50px);
    text-align: start;
    border: none;
  }
  .el-menu a {
    text-decoration: none;
  }
  .el-menu-item-group >>> .el-menu-item-group__title {
    padding: 0;
  }
  .menu-box {
    max-width: 210px;
    text-align: center;
    // line-height: 50px;
    height: 50px;
    position: relative;
  }
  .menu-list {
    position: absolute;
    top: 50px;
    left: 0;
    width: 210px;
    // height: 100px;
    background: #2C2D34;
    // border: 1px solid #FFFFFF;
    z-index: 10;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    box-shadow:4px 2px 5px #2C2D34;
  }
  .menu-list li{
    user-select:none;
    cursor: pointer;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    color: #fff;
    border-bottom: 1px solid rgba(222,227,240,0.10);
  }
  .menu-list li:hover, .menu-list .site-text-active{
    transition: .3s;
    background: #3B54D6;
    color: #FFF;
  }
  .site-title {
    user-select:none;
    color: #fff;
    line-height: 50px;
    max-width: 160px;
    vertical-align: top;
    display: inline-block;
    font-size: 16px;
    padding-left: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 16px;
    cursor: pointer;
  }
.bot-arrow-icon{
  // padding-left: 16px;
  cursor: pointer;
  display: inline-block;
  width: 15px;
  height: 50px;
  // margin-bottom: 2px;
  background: url('../../assets/images/bot-arrow.png') no-repeat center/100% ;
}
.top-arrow-icon {
  // padding-left: 16px;
  cursor: pointer;
  display: inline-block;
  width: 15px;
  // height: 9px;
  height: 50px;
  // margin-bottom: 2px;
  background: url('../../assets/images/top-arrow.png') no-repeat center/100% ;
}
.bot-arrow-icon:hover {
  background: url('../../assets/images/bot-arrow-active.png') no-repeat center/100%;
}
.top-arrow-icon:hover {
  background: url('../../assets/images/top-arrow-active.png') no-repeat center/100%;
}
.small-icon-default {
  display: inline-block;
  height: 50px;
  width: 25px;
  background: url('../../assets/images/default-mini-icon-2x.png') no-repeat center/100%;
}
.small-icon-platform {
  background: url('../../assets/images/platform-mini-icon-2x.png') no-repeat center/100%;
}
.small-icon-promotion{
  background: url('../../assets/images/promotion-mini-icon-2x.png') no-repeat center/100%;
}
.small-icon-edu{
  background: url('../../assets/images/edu-mini-icon-2x.png') no-repeat center/100%;
}
.small-icon-apptouch{
  background: url('../../assets/images/apptouch-mini-icon-2x.png') no-repeat center/100%;
}
.small-icon-dev {
  background: url('../../assets/images/dev-mini-icon-2x.png') no-repeat center/100%;
}
.small-icon-public {
  background: url('../../assets/images/public-mini-icon-2x.png') no-repeat center/100%;
}
.small-icon-game{
  background: url('../../assets/images/game-mini-icon-2x.png') no-repeat center/100%;
}
.small-icon-h5{
  background: url('../../assets/images/h5-mini-icon-2x.png') no-repeat center/100%;
}
.small-icon-agc{
  background: url('../../assets/images/agc-mini-icon-2x.png') no-repeat center/100%;
}
.small-icon-lock {
  background: url('../../assets/images/lock-mini-icon-2x.png') no-repeat center/100%;
}
.lock-menu {
  font-size: 18px;
  color:#606378;
  text-align:center;
  .lock-menu-text{
    padding-top: 200%;
  }
}
/deep/ .el-submenu .el-submenu__title{
  padding-left: 20px!important;
  height: 42px;
  line-height: 42px;
  box-sizing: border-box;
  font-size: 15px;
  border-top: 1px solid rgba(222,227,240,0.10) ;
  color: #fff;
  // font-weight: 600;
}
/deep/ .el-submenu:last-of-type{
  border-bottom: 1px solid rgba(222,227,240,0.10) ;
}
/deep/ .el-submenu .el-submenu__title:hover{
  transition: .1s;
  padding-left: 16px!important;
  border-left: 4px solid #A3B2FF;
  box-sizing: border-box;
  background: #525463 !important;
}

/deep/ .el-submenu .el-submenu__title .is-active {
  padding-left: 16px !important;
  border-left: 4px solid #A3B2FF;
}
/deep/ .el-submenu .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
/deep/ .el-menu-item-group .el-menu-item {
  padding-left: 30px!important;
  line-height: 26px;
}
/deep/ .el-menu-item-group .el-menu-item:hover {
  background: none !important;
  color: #A3B2FF;
}
/deep/ .el-menu-item-group:hover {
  color: #A3B2FF;
}
/deep/ .el-submenu .el-menu-item-group__title {
  padding: 0;
}
/deep/ .el-submenu .el-menu-item {
  height: auto;
  color: #ffffff;
  font-size: 13px!important;
}
/deep/ .el-submenu .el-menu-item:first-child {
  margin-top: 10px
}
/deep/ .el-submenu .el-menu-item:last-of-type {
  margin-bottom: 14px
}
/deep/ .el-menu-item-group .is-active {
  background: none;
  font-size: 14px;
  color: #A3B2FF;
}
// /deep/ .el-menu-item-group a:first-child li{
//   margin-top: 8px
// }
// /deep/.el-menu-item-group a:last-of-type li {
//   margin-bottom: 13px
// }
/deep/ .el-menu .is-opened .el-submenu__title {
  padding-left: 16px!important;
  border-left: 4px solid #A3B2FF;
  background: #525463 !important;
}
</style>
