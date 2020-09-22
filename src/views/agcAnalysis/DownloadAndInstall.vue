<template>
  <no-auth v-if="!authorized"></no-auth>
  <div class="downloadAndInstall" v-else>
    <!-- 查询条件 -->
    <div class="queryConditions">
      <el-form :rules="rules" ref="ruleForm" label-position="left" label-width="100px" :inline="true" :model="formDatas" class="demo-form-inline">
        <el-row>
          <el-col :span="8">
            <el-form-item class="inputDateClass" prop="startTime">
              <el-date-picker
                style="width: 100%;"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="起始时间"
                v-model="formDatas.startTime"
                :picker-options="startPickerOptions"
                @change="startTimeChange">
              </el-date-picker>
              <span class="line">TO</span>
            </el-form-item>
            <el-form-item class="inputDateClass" prop="endTime">
              <el-date-picker
                style="width: 100%;"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="结束时间"
                v-model="formDatas.endTime"
                :picker-options="endPickerOptions"
                @change="endTimeChange"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="展示依据：" class="inputCommonClass">
              <el-select v-model="formDatas.groupType" placeholder="请选择" @change="basisShowChange">
                <el-option
                  v-for="item in basisShowOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务类型：" prop="businessType" class="inputCommonClass">
              <el-select multiple v-model="formDatas.businessType" placeholder="请选择" @change="businessTypeChange">
                <el-option
                  v-for="item in businessTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="国家/地区：" prop="countryId" class="inputCommonClass">
                <el-cascader
                  class="countryCascader"
                  :options="countryList"
                  :props="props"
                  v-model="formDatas.countryId"
                  @change="cascaderHandleChange"
                  collapse-tags
                  clearable>
                </el-cascader>
              </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="应用名称：" class="inputCommonClass">
              <el-autocomplete
                  v-model="formDatas.appName"
                  :debounce="debounce"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入应用名称"
                  :trigger-on-focus="true"
                  @select="handleSelect"
                ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="应用ID：" prop="appId" class="inputCommonClass">
              <el-input v-model="formDatas.appId" @blur="appIdBlur($event, 1)" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="应用版本：" class="inputCommonClass">
              <el-select multiple collapse-tags v-model="formDatas.appVersion" placeholder="请选择" @change="appVersionChange">
                <el-option
                  v-for="item in appVersionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="text-align:center">
          <el-form-item class="btn">
            <el-col :span="24">
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <!-- 下载数据总览 -->
    <overview :params="params"></overview>
    <el-divider></el-divider>
    <!-- 指标 -->
    <echarts-indicator
      :echartLoading="echartLoading"
      :listDatas="echartsDatas"
      :groupType="formDatas.groupType"
      :top5CodeList="top5CodeList"
    ></echarts-indicator>
    <el-divider class="specialDividerSet"></el-divider>
    <!-- 表格 -->
    <report-table
      :tableLoading="tableLoading"
      :tableOtherLoading="tableOtherLoading"
      :groupType="params.groupType"
      :listDatas="listDatas"
      :otherDatas="otherDatas"
      :otherDatasFlag="otherDatasFlag"
      @updateTop5CodeListEmit="updateTop5CodeListEmit"
    ></report-table>
  </div>
</template>

<script>
import { LOAD_INSTALL_BASIS_SHOW, BUSINESS_TYPE } from '@/const/agcReport/index';
import { COUNTRYLISTS_ALL_ZH, COUNTRYLIST_OHTER_ALL_ZH, COUNTRYLISTS_ZH, COUNTRYLIST_OHTER_ZH } from '@/const/agcReport/countrylists';
import { formatDate, lrTrim } from '@/const/agcReport/commonFun';
import { appoverallanalysislist, appoverallanalysisother, appinfo, installappversion } from '@/api/url';
import Overview from './downloadAndInstall/Overview';
import EchartsIndicator from './downloadAndInstall/EchartsIndicator';
import ReportTable from './downloadAndInstall/ReportTable';
export default {
  name: 'DownloadAndInstall',
  components: {
    Overview,
    EchartsIndicator,
    ReportTable,
  },
  data() {
    return {
      authorized: false, // 访问权限
      resourceUrl: '', // 当前路由地址
      basisShowOptions: LOAD_INSTALL_BASIS_SHOW, // 展示依据下拉框数据
      businessTypeOptions: BUSINESS_TYPE, // 业务类型下拉框数据
      countryList: [], // 国家/地区下拉框数据
      props: {
        multiple: true,
        expandTrigger: 'hover',
        value: 'id',
        label: 'name',
        children: 'countries'
      },
      appVersionList: [], // 应用版本下拉框数据(APPID或者应用名称定了后，应用版本是带出来)
      formDatas: {
        startTime: '',
        endTime: '',
        groupType: '1', // 分组(1:时间 2:国家、地区 6:业务类型)
        businessType: ['AppGallery', 'AppTouch'], // 业务类型
        countryId: [],
        appName: '',
        appId: '',
        appVersion: [],
      },
      rules: {
        countryId: [
          { required: true, message: '请选择国家/地区', trigger: 'change' },
        ],
        businessType: [
          { required: true, message: '请选择业务类型', trigger: 'change' },
        ],
        startTime: [
          { required: true, message: '请选择起始时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ],
        appId: [
          { required: true, message: '请输入应用ID', trigger: 'change' },
        ],
      },
      startPickerOptions: {
        disabledDate: (time) => {
          let { startTime, endTime } = this.formDatas;
          // 起始时间、结束时间 均为null
          if (!startTime && !endTime) {
            // 今天之后时间不可选
            return time.getTime() > Date.now();
          }
          // 结束时间 为null
          if (!endTime) {
            // 今天之后时间不可选
            return time.getTime() > Date.now();
          }
          // 结束时间转换成Date对象
          let endTimeDate = new Date(endTime);
          // 结束时间转换成时间戳
          let endTimeDateTimestamp = endTimeDate.getTime() - 8 * 60 * 60 * 1000;
          // 1.当前截止时间之后时间不可选；2.当前截止时间之前的180天内可选，超过180不可选
          return (time.getTime() > endTimeDateTimestamp) || ((endTimeDateTimestamp - time.getTime() - 180 * 24 * 60 * 60 * 1000) >= 0);
        },
      },
      endPickerOptions: {
        disabledDate: (time) => {
          let { startTime, endTime } = this.formDatas;
          // 起始时间、结束时间 均为null
          if (!startTime && !endTime) {
            // 今天之后时间不可选
            return time.getTime() > Date.now();
          }
          // 起始时间 为null
          if (!startTime) {
            // 今天之后时间不可选
            return time.getTime() > Date.now();
          }
          // 起始时间转换成Date对象
          let startTimeDate = new Date(startTime);
          // 起始时间转换成时间戳
          let startTimeDateTimestamp = startTimeDate.getTime() - 8 * 60 * 60 * 1000;
          // 1.今天之后时间不可选 2.当前起始时间之前时间不可选；3.当前起始时间之后的180天内可选，超过180不可选；
          return time.getTime() > Date.now() || time.getTime() < startTimeDateTimestamp || ((time.getTime() - startTimeDateTimestamp - 180 * 24 * 60 * 60 * 1000) >= 0);
        },
      },
      params: {}, // 查询条件
      listDatas: [], // 表格数据
      echartsDatas: [], // echarts数据
      otherDatas: [], // 其他国家数据
      otherDatasFlag: false,
      top5CodeList: [], // 表格tops5数据
      echartLoading: false,
      tableLoading: false,
      tableOtherLoading: false,
      debounce: 1000
    };
  },
  watch: {
    'formDatas.appId': function(val, oldVal) {
      this.formDatas.appVersion = [];
      // appId为空的时候，清空版本下拉框
      if (lrTrim(val) === '') {
        this.appVersionList = [];
        this.formDatas.appVersion = [];
      }
    }
  },
  created() {
    // 鉴权
    this.resourceUrl = this.$route.path;
    this.$store.state.agapOriMenu.forEach(item => {
      if (item.resourceUrl === this.resourceUrl) {
        this.authorized = true;
      }
    });
    // 给初始时间
    let endTimestamp = new Date().getTime(); // 今天的时间戳
    this.formDatas.endTime = formatDate(endTimestamp, 1);
    let startTimestamp = new Date().setMonth(new Date().getMonth() - 1); // 一个月前时间点的时间戳
    this.formDatas.startTime = formatDate(startTimestamp, 1);
    // 组装请求参数
    this.assemblyRequestParames();
  },
  mounted() {
    // 获取国家下拉框数据
    let countryList = JSON.parse(JSON.stringify(COUNTRYLISTS_ZH)); // 非other国家/地区
    let others = COUNTRYLIST_OHTER_ZH; // other国家/地区
    this.countryList = countryList.concat(others);
    // 国家/地区 全选
    this.formDatas.countryId = [...COUNTRYLISTS_ALL_ZH, ...COUNTRYLIST_OHTER_ALL_ZH];
  },
  methods: {
    // 应用名称远程搜索,返回下拉框数据
    querySearchAsync(queryString, cb) {
      let results = [];
      // 去除首尾空格后，空字符的不请求接口
      if (!lrTrim(queryString)) {
        this.formDatas.appId = '';
        cb(results);
        return;
      }
      let param = { appname: this.formDatas.appName };
      this.appNameAppId(param).then(res => {
        let data = res.data || [];
        results = data.map(item => {
          let temp = {
            address: item.appId,
            value: item.appName
          };
          return temp;
        });
        // 应用名称下拉框无数据，清空应用ID
        if (results.length === 0) {
          this.formDatas.appId = '';
        }
        cb(results);
      }, () => {
        results = [];
        this.formDatas.appId = '';
        cb(results);
      });
    },
    // 请求应用名称、应用ID接口
    appNameAppId(param) {
      return new Promise((resolve, reject) => {
        this.$requestApi.post(appinfo, param, false).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 请求应用版本号接口
    queryAppversion() {
      let params = { appId: this.formDatas.appId };
      this.$requestApi.post(installappversion, params, false).then(res => {
        let data = res.data || [];
        this.appVersionList = data.map(item => {
          return {
            value: item.appVersion,
            label: item.appVersion
          };
        });
        // 默认全选
        // this.formDatas.appVersion = data.map(item => {
        //   return item.appVersion;
        // });
      }).catch(() => {
        this.appVersionList = [];
      });
    },
    handleSelect(item) {
      // 数据回填到应用ID输入框
      this.formDatas.appId = item.address;
      this.appIdBlur(null, 2);
    },
    appIdBlur(event, type = 1) {
      // 去除首尾空格后，空字符的不请求接口
      if (!lrTrim(this.formDatas.appId)) {
        this.formDatas.appName = '';
        return;
      }
      // 初始化版本号数据
      this.appVersionList = [];
      this.formDatas.appVersion = [];

      let param = { appId: this.formDatas.appId };
      this.appNameAppId(param).then(res => {
        let data = res.data || [];
        this.formDatas.appName = data.length > 0 ? data[0].appName : '';
        // 请求应用版本号
        this.queryAppversion();
      }, () => {
        if (type === 1) {
          this.formDatas.appName = '';
        }
      });
    },
    // 展示依据变动
    basisShowChange(val) { },
    // 业务类型变动
    businessTypeChange(val) { },
    // 国家/地区变动
    cascaderHandleChange(val) { },
    // 应用版本变动
    appVersionChange(val) { },
    // 起始时间变动
    startTimeChange(val) { },
    // 结束时间变动
    endTimeChange(val) { },
    // 组装请求参数
    assemblyRequestParames() {
      let { startTime, endTime, groupType, countryId, appName, appId, appVersion, businessType } = this.formDatas;

      // 组装国家码
      let countryIdListALL = countryId.map(item => {
        return item[1];
      });

      // 业务类型
      let businessTypeTmp = 'ALL';
      if (businessType.length === 2) {
        businessTypeTmp = 'ALL';
      } else {
        businessTypeTmp = businessType.join(',');
      }
      this.params = {
        startTime: startTime.replace(/[-]/g, ''),
        endTime: endTime.replace(/[-]/g, ''),
        groupType: groupType,
        appName,
        appId,
        // appVersion: appVersion,
        countryId: countryIdListALL,
        businessType: businessTypeTmp, // 枚举值为ALL、AppGallery、AppTouch。默认为ALL
      };

      /*
        ** 下拉框未选“其他”时，countryId传对应的国家的集合，otherCountryId不传
        ** 下拉框选“其他”时，countryId传一个元素other，otherCountryId传US,CU,IR,SD,SY组成的数组
        ** 下拉框选“非其他”和“其他”一起选中时，countryId传正常国家的集合+一个特殊元素“other", otherCountryId传US,CU,IR,SD,SY组成的数组
      */
      let otherCountryId = [];
      if (countryIdListALL.indexOf('other') >= 0) {
        otherCountryId = COUNTRYLIST_OHTER_ZH[0].countryIdList;
        this.params.otherCountryId = otherCountryId;
      } else {
        delete this.params.otherCountryId;
      }

      // 应用版本
      if (appVersion.length === 0) {
        delete this.params.appVersion;
      } else {
        this.params.appVersion = appVersion;
      }
    },
    // 查询
    onSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let { appName, appId } = this.formDatas;
          if (appName || appId) {
            this.assemblyRequestParames();
            this.queryDatas();
          } else {
            this.$message({
              message: '温馨提醒：请填写应用名称或应用ID！',
              type: 'warning'
            });
          }
        } else {
          return false;
        }
      });
    },
    /*
      ** 更新top5数据，过滤echarts数据
      ** 1. groupType=2 国家码
      ** 2. groupType=4 应用版本
    */
    updateTop5CodeListEmit(val) {
      this.top5CodeList = val;
      let { groupType } = this.formDatas;

      if (groupType === '2') { // 按国家/地区分组
        // 无top5数据
        if (this.top5CodeList.length === 0) {
          this.echartsDatas = [];
        } else {
          // 国家码top5--echarts图数据
          this.queryListDatas({ groupType: '3', countryId: this.top5CodeList });
        }
      } else if (groupType === '4') { // 按应用版本分组
        console.log('应用版本分组top5==', this.top5CodeList);
        // 无top5数据
        if (this.top5CodeList.length === 0) {
          this.echartsDatas = [];
        } else {
          // 应用版本top5--echarts图数据
          this.queryListDatas({ groupType: '5', appVersion: this.top5CodeList });
        }
      } else {

      }
    },
    // 查询数据
    queryDatas() {
      let { groupType } = this.formDatas;
      if (groupType === '1') { // 时间分组：只需请求一个接口
        this.queryListDatas();
      } else if (groupType === '2') { // 国家/地区分组：请求两个接口
        /*
         ** groupby传“2”--表格数据
         ** groupby传“3”按照时间和国家分组--趋势图数据(依赖表格top5数据)
        */
        this.queryListDatas();
        // 国家选了other
        if (this.params.countryId.indexOf('other') >= 0) {
          this.queryOtherDatas();
        } else {
          this.otherDatas = []; // 清空other国家数据
        }
      } else if (groupType === '4') { // 应用版本分组：请求两个接口
        /*
         ** groupby传“4”--表格数据
         ** groupby传“5”按照时间和应用版本分组--趋势图数据(依赖表格top5数据)
        */
        this.queryListDatas();
      } else if (groupType === '6') { // 业务类型分组：请求两个接口
        // groupby传“6”--表格数据
        this.queryListDatas();
        // groupby传“7”按照时间和业务类型分组--趋势图数据
        this.queryListDatas({ groupType: '7' });
      }
    },
    // 请求表格、趋势图数据
    queryListDatas(groupbyObj = {}) {
      this.echartLoading = true;
      this.tableLoading = true;
      this.otherDatasFlag = false;
      let newParams = {};
      Object.assign(newParams, this.params, groupbyObj);
      // 按国家/地区分组：趋势图数据-剔除其他国家数据（删除otherCountryId入参）
      if (newParams.groupType === '3' && newParams.otherCountryId) {
        delete newParams.otherCountryId;
      }
      this.$requestApi.post(appoverallanalysislist, newParams, false).then(res => {
        this.echartLoading = false;
        this.tableLoading = false;
        // 日期分组：表格、趋势图数据
        if (newParams.groupType === '1') {
          this.listDatas = res.data || [];
          this.echartsDatas = res.data || [];
        } else if (newParams.groupType === '2') { // 国家分组：表格数据
          this.listDatas = res.data || [];
        } else if (newParams.groupType === '3') { // 国家分组：趋势图数据
          this.echartsDatas = res.data || [];
        } else if (newParams.groupType === '4') { // 应用版本分组：表格数据
          this.listDatas = res.data || [];
        } else if (newParams.groupType === '5') { // 应用版本分组：趋势图数据
          this.echartsDatas = res.data || [];
        } else if (newParams.groupType === '6') { // 业务类型分组：表格数据
          this.listDatas = res.data || [];
        } else if (newParams.groupType === '7') { // 业务类型分组：趋势图数据
          this.echartsDatas = res.data || [];
        }
      }).catch(() => {
        // 日期分组：表格、趋势图数据
        if (newParams.groupType === '1') {
          this.listDatas = [];
          this.echartsDatas = [];
          this.echartLoading = false;
          this.tableLoading = false;
        } else if (newParams.groupType === '2') { // 国家分组：表格数据
          this.listDatas = [];
          this.echartsDatas = [];
          this.tableLoading = false;
          this.echartLoading = false;
        } else if (newParams.groupType === '3') { // 国家分组：趋势图数据
          this.echartsDatas = [];
          this.echartLoading = false;
        } else if (newParams.groupType === '4') { // 应用版本分组：表格数据
          this.listDatas = [];
          this.echartsDatas = [];
          this.tableLoading = false;
          this.echartLoading = false;
        } else if (newParams.groupType === '5') { // 应用版本分组：趋势图数据
          this.echartsDatas = [];
          this.tableLoading = false;
          this.echartLoading = false;
        } else if (newParams.groupType === '6') { // 业务类型分组：表格数据
          this.listDatas = [];
          this.tableLoading = false;
        } else if (newParams.groupType === '7') { // 业务类型分组：趋势图数据
          this.echartsDatas = [];
          this.echartLoading = false;
        }
      });
    },
    // 请求other国家数据
    queryOtherDatas() {
      this.tableOtherLoading = true;
      this.$requestApi.post(appoverallanalysisother, this.params, false).then(res => {
        if (res.data && res.data[0]) {
          this.otherDatas = [res.data[0]];
        } else {
          this.otherDatas = [];
        }
        this.tableOtherLoading = false;
        this.otherDatasFlag = true;
      }).catch(() => {
        this.tableOtherLoading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  .downloadAndInstall ::v-deep {
    .queryConditions {
      .el-form {
        .line {
          text-align: center;
          display: inline-block;
          margin-left: 10px;
        }
        .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
          display: none;
        }
        .inputCommonClass div.el-input{
          width: 250px;
        }
        .inputDateClass {
          div.el-input {
            width: 150px!important;
          }
          .el-icon-question {
            margin-left: 5px;
            font-size: 17px;
            color: #ccc;
            position: absolute;
            top: 11px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
