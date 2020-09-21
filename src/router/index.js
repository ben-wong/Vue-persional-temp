import Vue from 'vue';
import VueRouter from 'vue-router';
import agcRouter from './agcRouter'; // 引入AGC报表路由
console.log('BASE_URL', process.env.BASE_URL);
Vue.use(VueRouter);

let routes = [
  {
    path: '/error/NoAuth',
    name: 'NoAuth',
    meta: {
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "NoAuth" */ '../views/error/NoAuth.vue')
  },
  {
    path: '/courseAnalysis/courseAnalysisGeneral',
    name: 'courseAnalysisGeneral',
    meta: {
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "CourseAnalysisGeneral" */ '../views/courseAnalysis/CourseAnalysisGeneral.vue')
  },
  {
    path: '/courseAnalysis/courseAnalysisDetail',
    name: 'courseAnalysisDetail',
    meta: {
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "CourseAnalysisDetail" */ '../views/courseAnalysis/CourseAnalysisDetail.vue')
  },
  {
    path: '/courseAnalysis/courseUseForm',
    name: 'courseUseForm',
    meta: {
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "courseUseForm" */ '../views/courseAnalysis/CourseUseFormView.vue')
  },
  // {
  //   path: '/courseAnalysis/edu_CourseOverview',
  //   name: 'edu_CourseOverview',
  //   meta: {
  //     requireAuth: true
  //   },
  //   component: () => import(/* webpackChunkName: "courseOverview" */ '../views/courseAnalysis/CourseOverview.vue')
  // },
  // {
  //   path: '/courseAnalysis/edu_CourseDetail',
  //   name: 'edu_CourseDetail',
  //   meta: {
  //     requireAuth: true
  //   },
  //   component: () => import(/* webpackChunkName: "courseDetail" */ '../views/courseAnalysis/CourseDetail.vue')
  // },
  {
    path: '/developerAnalysis/KPIAnalysis',
    name: 'KPIAnalysis',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "KitApiAnalysis" */ '../views/developerAnalysis/KitApiAnalysisView.vue')
  },
  {
    path: '/general',
    name: 'general',
    component: () => import(/* webpackChunkName: "general" */ '../views/general/GeneralView.vue')
  },
  {
    path: '/studyAnalysis/studyAsyn',
    name: 'studyAsyn',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "studyAnalysis" */ '../views/studyAnalysis/StudyAnalysisView.vue')
  },
  {
    path: '/userAnalysis/moduleDistribute',
    name: 'moduleDistribute',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "userAnalysis" */ '../views/userAnalysis/ModuleDistributeView/Index.vue')
  },
  {
    path: '/userAnalysis/searchOverall',
    name: 'searchOverall',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "searchOverall" */ '../views/userAnalysis/SearchOverallView.vue')
  },
  // {
  //   path: '/userAnalysis/edu_ResExposure',
  //   name: 'edu_ResExposure',
  //   meta: { requireAuth: true },
  //   component: () => import(/* webpackChunkName: "resExposure" */ '../views/userAnalysis/ResExposure.vue')
  // },
  // {
  //   path: '/userAnalysis/edu_SearchKeyword',
  //   name: 'edu_SearchKeyword',
  //   meta: { requireAuth: true },
  //   component: () => import(/* webpackChunkName: "searchKeyword" */ '../views/userAnalysis/SearchKeyword.vue')
  // },
  // {
  //   path: '/clientAnalysis/edu_ClientFeature',
  //   name: 'edu_ClientFeature',
  //   meta: { requireAuth: true },
  //   component: () => import(/* webpackChunkName: "clientFeature" */ '../views/clientAnalysis/ClientFeature.vue')
  // },
  // {
  //   path: '/paymentAnalysis/edu_PayOverview',
  //   name: 'edu_PayOverview',
  //   meta: { requireAuth: true },
  //   component: () => import(/* webpackChunkName: "payOverview" */ '../views/paymentAnalysis/PayOverview.vue')
  // }
  {
    path: '/*/educenter_*', // 帆软-教育中心
    // name: 'HifolderResOper',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "educenter" */ '../views/FineReport/FineReport.vue')
  },
  {
    path: '/*/platform_*', // 帆软-平台
    // name: 'HifolderResOper',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "platform" */ '../views/FineReport/FineReport.vue')
  },
  {
    path: '/*/promot_*', // 帆软-商业推广
    // name: 'HifolderResOper',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "promot" */ '../views/FineReport/FineReport.vue')
  },
  {
    path: '/*/apptouch_*', // 帆软-2B2C
    // name: 'HifolderResOper',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "apptouch" */ '../views/FineReport/FineReport.vue')
  },
  {
    path: '/*/gamecenter_*', // 帆软-游戏中心
    // name: 'HifolderResOper',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "gamecenter" */ '../views/FineReport/FineReport.vue')
  },
  {
    path: '/*/finereport_*',
    // name: 'HifolderResOper',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "finereport" */ '../views/FineReport/FineReport.vue')
  },
  // {
  //   path: '/*/educentergrey_*', // 帆软
  //   // name: 'HifolderResOper',
  //   meta: { requireAuth: true },
  //   component: () => import(/* webpackChunkName: "fineReport" */ '../views/FineReport/FineReport.vue')
  // },
  // {
  //   path: '/*/educentertest_*', // 帆软
  //   // name: 'HifolderResOper',
  //   meta: { requireAuth: true },
  //   component: () => import(/* webpackChunkName: "fineReport" */ '../views/FineReport/FineReport.vue')
  // }
];
// 合并AGC报表路由
routes = routes.concat(agcRouter);

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
//     if (store.state.token) { // 通过vuex state获取当前的token是否存在
//       next();
//     } else {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       });
//     }
//   } else {
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   if (store.state.csrfToken._token && store.state.csrfToken._expiration - Date.now() > 0) { // 通过vuex state获取当前的token是否存在
//     next();
//   } else {
//     axios.get(csrfTokenUrl).then(res => {
//       let csrfToken = {};
//       csrfToken._token = res.data.csrfToken || res.data.data.csrfToken;
//       csrfToken._expiration = Date.now() + 10000;
//       store.commit('setcsrfToken', csrfToken);
//       console.log('store.state.csrfToken', store.state.csrfToken);
//       next();
//     }).catch(err => {
//       Message.error(err + '后台服务出错！');
//     });
//   }
// });

export default router;
