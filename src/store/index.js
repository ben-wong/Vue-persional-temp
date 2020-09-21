import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wo_user: '',
    wolang: '',
    loading: false,
    queryDetailParams: {},
    isAuth: false, // islogin接口返回值
    isTokenLogin: true, // csrf token接口返回的值，返回4002，跳转到无权限
    agapOriMenu: [],
    agapMenu: {
      overall: false,
      menuList: []
    },
    csrfToken: {
      _token: '',
      _expiration: Date.now(),
      _getTokening: false
    },
    navMenuChangeFlag: false // true: 已变化， false：未变化
  },
  mutations: {
    setQueryDetailParams(state, obj) {
      state.queryDetailParams = obj;
    },
    setMenu(state, obj) {
      state.agapOriMenu = obj;
    },
    setNavMenuChangeFlag(state, val) {
      state.navMenuChangeFlag = val;
    }
  },
  actions: {
  },
  modules: {
  }
});
