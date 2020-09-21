const PE = process.env;
const isMock = PE.VUE_APP_USE_MOCK;
const API_BASE_AGC_URL = PE.VUE_APP_BASE_AGC_URL;
// 报表接口
// 应用内付费Touch明细（全球）-表格数据
const getiapreportglobal = +isMock ? 'getiapreportglobal' : API_BASE_AGC_URL + '/dataapi/apptouch/getiapreportglobal1';
// 应用内付费Touch明细（全球）-概览
const getlapreportglobal2 = +isMock ? 'getlapreportglobal2' : API_BASE_AGC_URL + '/dataapi/apptouch/getiapreportglobal2';
// 应用内付费Touch top5（全球）
const getiapreporttop = +isMock ? 'getiapreporttop' : API_BASE_AGC_URL + '/dataapi/apptouch/getiapreporttop';

// 下载安装表格、echarts图数据
const appoverallanalysislist = +isMock ? 'appoverallanalysislist' : API_BASE_AGC_URL + '/dataapi/applicationmarket/appoverallanalysislist';
// 下载安装概览
const appoverallanalysistotal = +isMock ? 'appoverallanalysistotal' : API_BASE_AGC_URL + '/dataapi/applicationmarket/appoverallanalysistotal';
// 下载安装其他国家数据
const appoverallanalysisother = +isMock ? 'getiapreporttop' : API_BASE_AGC_URL + '/dataapi/applicationmarket/appoverallanalysisother';
// 下载安装应用版本号
const installappversion = +isMock ? 'installappversion' : API_BASE_AGC_URL + '/dataapi/applicationmarket/installappversion';

// 新游预约报表-列表
const newgamereservationlist = +isMock ? 'newgamereservationlist' : API_BASE_AGC_URL + '/dataapi/applicationmarket/game/newgamereservationlist';

// 安装失败报表-获取所有机型信息
const getdevice = +isMock ? 'getdevice' : API_BASE_AGC_URL + '/dataapi/applicationmarket/installfail/getdevice';
// 安装失败报表-安装失败信息结果集
const getinstallfailinfolist = +isMock ? 'getinstallfailinfolist' : API_BASE_AGC_URL + '/dataapi/applicationmarket/installfail/getinstallfailinfo/list';
// 安装失败报表-用来查top5
const getinstallfailinfodayslist = +isMock ? 'getinstallfailinfodayslist' : API_BASE_AGC_URL + '/dataapi/applicationmarket/installfail/getinstallfailinfo/dayslist';
// 安装失败报表-按天分组的总失败设备数和总失败次数
const getinstallfailinfofailtotalcnt = +isMock ? 'getinstallfailinfofailtotalcnt' : API_BASE_AGC_URL + '/dataapi/applicationmarket/installfail/getinstallfailinfo/failtotalcnt';

// 付费下载明细报表-列表
const orderdetail = +isMock ? 'orderdetail' : API_BASE_AGC_URL + '/dataapi/applicationmarket/agc/paid/download/orderdetail?curPage={curPage}&pageSize={pageSize}';
const orderdetailExcel = +isMock ? 'orderdetail' : API_BASE_AGC_URL + '/dataapi/applicationmarket/agc/paid/download/orderdetail';
// 付费下载明细报表-概览
const orderdetotal = +isMock ? 'orderdetotal' : API_BASE_AGC_URL + '/dataapi/applicationmarket/agc/paid/download/orderdetotal';

// AGC公共接口
// AGC获取应用ID和名称
const appinfo = +isMock ? 'appinfo' : API_BASE_AGC_URL + '/dataapi/appinfo';

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
