
// 引入AGC报表url
import {
  getiapreportglobal,
  getlapreportglobal2,
  getiapreporttop,
  appoverallanalysislist,
  appoverallanalysistotal,
  appoverallanalysisother,
  installappversion,
  newgamereservationlist,
  getdevice,
  getinstallfailinfolist,
  getinstallfailinfodayslist,
  getinstallfailinfofailtotalcnt,
  orderdetail,
  orderdetailExcel,
  orderdetotal,
  appinfo
} from './url/agcUrl';
const PE = process.env;
const isMock = PE.VUE_APP_USE_MOCK;
const API_BASE_URL = PE.VUE_APP_BASE_URL;
const API_EDGE_URL = PE.VUE_APP_EDGE_URL;
const API_LOGS_URL = PE.VUE_APP_LOGS_URL;

// wo 接口
// export const wiseoperMenu = +isMock ? 'wiseoperMenu' : API_WO_BASE_URL + '/wiseoper/userinfo/diymenu/getAppMenuListByToken'; // 获取菜单

// 登录登出 后台接口白名单
export const wiseoperMenu = +isMock ? 'wiseoperMenu' : API_EDGE_URL + '/v1/auth/wo-menu'; // 获取菜单
export const logout = +isMock ? 'logout' : API_EDGE_URL + '/v1/auth/logout'; // 登出
export const islogin = +isMock ? 'islogin' : API_EDGE_URL + '/v1/auth/islogin'; // 鉴权

// csrf token链接 后台接口白名单
export const csrfTokenUrl = +isMock ? 'csrfToken' : API_EDGE_URL + '/v1/auth/token';
export const csrfTokenUrlError = +isMock ? 'csrfTokenError' : API_EDGE_URL + '/v1/auth/token';

// 概况页
export const kpi = +isMock ? 'kpi' : API_BASE_URL + '/v1/overview/kpi'; // KPI完成率
export const usersTrend = +isMock ? 'users-trend' : API_BASE_URL + '/v1/overview/users-trend'; // 用户趋势
export const usersTranslation = +isMock ? 'users-translation' : API_BASE_URL + '/v1/overview/users-translation'; // 用户转化
export const revenue = +isMock ? 'revenue' : API_BASE_URL + '/v1/overview/revenue'; // 收入&用户付费
export const kcourseTopn = +isMock ? 'course-topn' : API_BASE_URL + '/v1/overview/course-topn'; // 重点课程&应用

// 用户分析
export const visits = +isMock ? 'visits' : API_BASE_URL + '/v1/module/visits'; // 模块访问分布

// 学情分析-学情同步
export const learningSync = +isMock ? 'learning-sync' : API_BASE_URL + '/v1/learning-sync';

// 开发者分析
export const thirdInterface = +isMock ? 'third-interface' : API_BASE_URL + '/v1/third-interface';

// common interface
export const commonCourseCatalogs = +isMock ? 'commonCourseCatalogs' : API_BASE_URL + '/v1/common/course-categories';
export const commonModules = +isMock ? 'commonModules' : API_BASE_URL + '/v1/common/modules';
// 用户搜索接口
export const userSearchPaged = +isMock ? 'userSearchPaged' : API_BASE_URL + '/v1/searchs/overview';
export const userSearchNotPaged = +isMock ? 'userSearchNotPaged' : API_BASE_URL + '/v1/searchs/overview';
// 课程分发接口
export const courseFenFaTrend = +isMock ? 'courseFenFaTrend' : API_BASE_URL + '/v1/course/exposure-aggregation';
export const courseFenFaTable = +isMock ? 'courseFenFaTable' : API_BASE_URL + '/v1/course/exposure-aggregation';
export const courseFenFaZiYuanTrend = +isMock ? 'courseFenFaZiYuanTrend' : API_BASE_URL + '/v1/course/exposure/resources-aggregation';
export const courseFenFaZiYuanTable = +isMock ? 'courseFenFaZiYuanTable' : API_BASE_URL + '/v1/course/exposure/resources-aggregation';
export const courseFenFaTrendDetail = +isMock ? 'courseFenFaTrendDetail' : API_BASE_URL + '/v1/course/exposure';
export const courseFenFaTableDetail = +isMock ? 'courseFenFaTableDetail' : API_BASE_URL + '/v1/course/exposure';
export const courseFenFaZiYuanTrendDetail = +isMock ? 'courseFenFaZiYuanTrendDetail' : API_BASE_URL + '/v1/course/exposure/resources';
export const courseFenFaZiYuanTableDetail = +isMock ? 'courseFenFaZiYuanTableDetail' : API_BASE_URL + '/v1/course/exposure/resources';
// 课程学习接口
export const courseXueXiTrend = +isMock ? 'courseXueXiTrend' : API_BASE_URL + '/v1/course/learning-aggregation';
export const courseXueXiTable = +isMock ? 'courseXueXiTable' : API_BASE_URL + '/v1/course/learning-aggregation';
export const courseXueXiZiYuanTrend = +isMock ? 'courseXueXiZiYuanTrend' : API_BASE_URL + '/v1/course/learning/resources-aggregation';
export const courseXueXiZiYuanTable = +isMock ? 'courseXueXiZiYuanTable' : API_BASE_URL + '/v1/course/learning/resources-aggregation';
export const courseXueXiTrendDetail = +isMock ? 'courseXueXiTrendDetail' : API_BASE_URL + '/v1/course/learning';
export const courseXueXiTableDetail = +isMock ? 'courseXueXiTableDetail' : API_BASE_URL + '/v1/course/learning';
export const courseXueXiZiYuanTrendDetail = +isMock ? 'courseXueXiZiYuanTrendDetail' : API_BASE_URL + '/v1/course/learning/resources';
export const courseXueXiZiYuanTableDetail = +isMock ? 'courseXueXiZiYuanTableDetail' : API_BASE_URL + '/v1/course/learning/resources';
// 课程支付接口 课程支付app接口
export const courseZhiFuTrend = +isMock ? 'courseZhiFuTrend' : API_BASE_URL + '/v1/course/payments-aggregation';
export const courseZhiFuTable = +isMock ? 'coursezhiFuTable' : API_BASE_URL + '/v1/course/payments-aggregation';
export const courseZhiFuTrendDetail = +isMock ? 'courseZhiFuTrendDetail' : API_BASE_URL + '/v1/course/payments';
export const courseZhiFuTableDetail = +isMock ? 'coursezhiFuTableDetail' : API_BASE_URL + '/v1/course/payments';
// 课程支付app接口
// export const courseZhiFuTrend = +isMock ? 'courseZhiFuTrend' : API_BASE_URL + '/v1/course/payments-aggregation';
// export const courseZhiFuTable = +isMock ? 'coursezhiFuTable' : API_BASE_URL + '/v1/course/payments-aggregation';

// 课程使用形式
export const entrance = +isMock ? 'entrance' : API_BASE_URL + '/v1/course/entrance';

export const downloads = +isMock ? 'export' : API_BASE_URL + '/v1/downloads';

// 保存用户访问日志
export const logs = +isMock ? 'logs' : API_LOGS_URL + '/v1/user/visit/logs';

// 查询用户有权限的报表菜单
export const menus = +isMock ? 'menus' : API_EDGE_URL + '/v1/menus';

export const modules = +isMock ? 'modules' : API_EDGE_URL + '/v1/modules';
// 导出AGC报表url
export {
  getiapreportglobal,
  getlapreportglobal2,
  getiapreporttop,
  appoverallanalysislist,
  appoverallanalysistotal,
  appoverallanalysisother,
  installappversion,
  newgamereservationlist,
  getdevice,
  getinstallfailinfolist,
  getinstallfailinfodayslist,
  getinstallfailinfofailtotalcnt,
  orderdetail,
  orderdetailExcel,
  orderdetotal,
  appinfo
};
