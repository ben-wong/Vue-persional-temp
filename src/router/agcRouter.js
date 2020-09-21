const agcRouter = [
  // { path: '/', redirect: '/agcAnalysis/inAppPayment' },
  {
    path: '/agcAnalysis/downloadAndInstall', // 下载安装
    name: 'downloadAndInstall',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "downloadAndInstall" */ '../views/agcAnalysis/DownloadAndInstall.vue')
  },
  {
    path: '/agcAnalysis/inAppPayment', // 应用内付费
    name: 'inAppPayment',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "inAppPayment" */ '../views/agcAnalysis/InAppPayment.vue')
  },
  {
    path: '/agcAnalysis/reservation', // 预约
    name: 'reservation',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "reservation" */ '../views/agcAnalysis/Reservation.vue')
  },
  {
    path: '/agcAnalysis/installFail', // 安装失败
    name: 'installFail',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "installFail" */ '../views/agcAnalysis/InstallFail.vue')
  },
  {
    path: '/agcAnalysis/paidDownloadDetails', // 付费下载明细
    name: 'paidDownloadDetails',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "paidDownloadDetails" */ '../views/agcAnalysis/PaidDownloadDetails.vue')
  }
];

export default agcRouter;
