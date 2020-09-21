export const MENU_INDEX_MAP = { // 菜单项
  'general': '1',
  'moduleDistribute': '6',
  'searchOverall': '7',
  'studyAsyn': '8',
  'courseAnalysisGeneral': '9',
  'courseUseForm': '10',
  'KPIAnalysis': '11',
  'edu_ResExposure': '12',
  'edu_CourseOverview': '13',
  'edu_ClientFeature': '14',
  'edu_CourseDetail': '15',
  'edu_SearchKeyword': '16',
  'edu_PayOverview': '17'

};

export const STUDY_LINE_NAME_MAP = { // 概览-学习
  'learningTimes': { name: '学习次数', type: 'number' },
  'learningUsers': { name: '学习帐号数', type: 'number' },
  'progressSyncTimes': { name: '进度同步次数', type: 'number' },
  'progressSyncUsers': { name: '进度同步帐号数', type: 'number' },
  'resultSyncTimes': { name: '结果同步次数', type: 'number' },
  'resultSyncUsers': { name: '结果同步帐号数', type: 'number' },
  'avgCompleteRatio': { name: '平均完课率', type: 'ratio' }
};

export const KPI_LINE_NAME_MAP = { // 概览-KPI
  'invokeTimes': { name: '调用次数', type: 'number' },
  'invokeSuccessTimes': { name: '返回成功数', type: 'number' },
  'invokeFailTimes': { name: '返回失败数', type: 'number' },
  'abnormTimes': { name: '内部异常数', type: 'number' },
  'invokeSucessRatio': { name: '返回成功率', type: 'ratio' },
  'abnormalRatio': { name: '接口异常率', type: 'ratio' }
};

export const USER_TREND_LINE_NAME_MAP_ACTIVE = { // 概览-用户趋势
  'desktopDevices': { name: '教育中心入口', type: 'number' },
  'apDevices': { name: '应用市场入口', type: 'number' },
  'apiUsers': { name: 'API活跃帐号数', type: 'number' },
  'clientUsers': { name: '客户端活跃帐号数', type: 'number' },
  'clientDevices': { name: '客户端活跃设备数', type: 'number' }
};

export const USER_TREND_LINE_NAME_MAP = { // 概览-用户趋势
  'apiUsers': { name: 'API新增帐号数', type: 'number' },
  'clientUsers': { name: '客户端新增帐号数', type: 'number' },
  'clientDevices': { name: '客户端新增设备数', type: 'number' }
};

export const USERS_TRANS_LINE_NAME_MAP = { // 概览-用户转化
  'clientDevices': { name: '客户端活跃设备数', type: 'number' },
  'detailBrowseDevices': { name: '课程页浏览设备数', type: 'number' },
  'learningUsers': { name: '学习帐号数', type: 'number' },
  'searchDevices': { name: '搜索设备数', type: 'number' },
  'clientUserDuration': { name: '客户端人均使用时长（分钟）', type: 'dot' },
  'detailBrowseDuration': { name: '课程页人均浏览时长（分钟）', type: 'dot' },
  'searchBrowseRatio': { name: '搜索浏览转化率', type: 'ratio' },
};

export const USERS_FLOW_PAY_LINE_NAME_MAP = { // 概览-收入趋势&用户付费
  'flow': {
    'flowAmt': { name: '流水', type: 'number' },
    'clientFlowAmt': { name: '客户端流水', type: 'number' },
  },
  'paid': {
    'paidUsers': { name: '日付费帐号数', type: 'number' },
    'newPaidUsers': { name: '日新增付费帐号数', type: 'number' },
    'repurchaseUsers': { name: '日复购帐号数', type: 'number' },
    'newPaidArppu': { name: '新客ARPPU', type: 'dot' },
    'repurchaseArppu': { name: '复购ARPPU', type: 'dot' },
    'clientPaidUsers': { name: '日付费帐号数', type: 'number' },
    'clientNewPaidUsers': { name: '日新增付费帐号数', type: 'number' },
    'clientRepurchaseUsers': { name: '日复购帐号数', type: 'number' },
    'clientNewPaidArppu': { name: '新客ARPPU', type: 'dot' },
    'clientRepurchaseArppu': { name: '复购ARPPU', type: 'dot' },
  }
};

export const COURSE_USE_APP_LINE_NAME_MAP = { // 课程使用形式-APP入口
  'appInstallTimes': { name: '安装APP成功数', type: 'number' },
  'appCancelTimes': { name: '取消APP安装数', type: 'number' },
  'appPromptTimes': { name: '提示APP安装数', type: 'number' },
  'jumpSuccessTimes': { name: '跳转成功', type: 'number' },
  'jumpCancelTimes': { name: '跳转取消', type: 'number' },
  'appInstallRatio': { name: '安装成功率', type: 'ratio' },
  'jumpCancelRatio': { name: '跳转取消率', type: 'ratio' },
};

export const COURSE_USE_EDU_LINE_NAME_MAP = { // 课程使用形式-教育中心入口
  'playSuccessTimes': { name: '播放成功次数', type: 'number' },
  'playFailTimes': { name: '播放失败次数', type: 'number' },
  'playSuccessRatio': { name: '成功率', type: 'ratio' },
  'playFailRatio': { name: '失败率', type: 'ratio' },
  'playSuccessUsers': { name: '播放成功设备数', type: 'number' },
  'avgPlayTimes': { name: '人均播放次数', type: 'dot' },
  'avgPlayDuration': { name: '人均播放时长', type: 'dot' },
};

export const VISIT_LINE_NAME_MAP = { // 用户分析-模块访问分布
  'clickTimes': { name: '客户端设备数', type: 'number' },
  'listExpTimes': { name: '日课程页浏览设备数', type: 'number' },
  'detailExpTimes': { name: '日学习帐号数', type: 'number' },
};

export const VISIT_CHILD_LINE_NAME_MAP = { // 用户分析-模块访问分布
  'E01000': { name: '推荐', type: 'number' },
  'E02000': { name: '学习', type: 'number' },
  'E03000': { name: '我的', type: 'number' },
  'E04000': { name: '搜索', type: 'number' },
};

export const COMMON_MODULES = [ // 公共-模块名称维度
  { 'moduleId': 'E01000', 'moduleName': '推荐' },
  { 'moduleId': 'E02000', 'moduleName': '学习' },
  { 'moduleId': 'E03000', 'moduleName': '我的' },
  { 'moduleId': 'E04000', 'moduleName': '搜索' },
];

export const KCOURSE_TOPEN_TABLE_MAP = {
  'app1': { name: '日浏览量' },
  'app2': { name: '日浏览时长（分钟）' },
  'app3': { name: '日学习人数' },
  'app4': { name: '日流水' },
  'app5': { name: '支付次数' },
  'app6': { name: '客户端支付次数' },
  'app7': { name: '流水增长金额' },
  'app8': { name: '流水下降金额' },
  'course1': { name: '日浏览量' },
  'course2': { name: '日浏览时长（分钟）' },
  'course3': { name: '日学习人数' },
  'course4': { name: '日流水' },
  'course5': { name: '支付次数' },
  'course6': { name: '客户端支付次数' },
  'course7': { name: '流水增长金额' },
  'course8': { name: '流水下降金额' },
};
