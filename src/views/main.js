import Vue from 'vue';
import App from './App.vue';
import VueI18n from 'vue-i18n';
import router from './router';
import store from './store';
import 'lib-flexible/flexible';
import 'element-ui/lib/theme-chalk/index.css';
import NoAuth from 'views/error/NoAuth';
import ElementUI from 'element-ui';
// import echarts from 'echarts';
import Api from './api/http';
// 测试水印
import watermark from '@/assets/watermark.js';
import './filters';
import toExcel from '@/excel/json2excel';
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入折线图/柱状图等组件
require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/funnel');
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/dataZoom');

// vue全局注入echarts
Vue.prototype.$echarts = echarts;
Vue.prototype.$watermark = watermark;
Vue.component('no-auth', NoAuth);

Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.prototype.$loading = ElementUI.Loading.service;
Vue.prototype.$msgbox = ElementUI.MessageBox;
Vue.prototype.$alert = ElementUI.MessageBox.alert;
Vue.prototype.$confirm = ElementUI.MessageBox.confirm;
Vue.prototype.$message = ElementUI.Message;

const i18n = new VueI18n({
  locale: 'zh', // 定义默认语言为中文
  messages: {
    'zh': require('@/common/i18n/zh.js'),
    'en': require('@/common/i18n/en.js')
  }
});

Vue.config.productionTip = false;
// vue全局注入echarts
Vue.prototype.$echarts = echarts;
// vue全局注入Api
Vue.prototype.$requestApi = Api;

// vue全局注入导出
Vue.prototype.$toExcel = toExcel;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
