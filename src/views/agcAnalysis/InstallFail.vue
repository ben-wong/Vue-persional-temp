<template>
  <div class="main">
    <no-auth v-if="!authorized"></no-auth>
    <div class="installFail" v-else>
      <!-- 查询条件 -->
      <div class="queryConditions">
        <el-form :rules="rules" ref="ruleForm" label-position="left" label-width="100px" :inline="true" :model="formDatas" class="demo-form-inline">
          <el-row>
            <el-col :span="8">
              <date-control @startTimeEmit="startTimeEmit" @endTimeEmit="endTimeEmit"></date-control>
            </el-col>
            <el-col :span="8">
              <el-form-item label="展示依据：" class="inputCommonClass">
                <el-select v-model="formDatas.groupByType" placeholder="请选择" @change="basisShowChange">
                  <el-option
                    v-for="item in basisShowOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机型：" prop="deviceNameList" class="inputCommonClass">
                <el-select
                  v-model="formDatas.deviceNameList"
                  multiple
                  clearable
                  collapse-tags
                  @change="deviceNameListChange"
                  placeholder="请选择机型">
                  <el-option
                    v-for="item in deviceNameOptions"
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
              <el-form-item label="下载类型：" prop="downloadTypeList" class="inputCommonClass">
                <el-select
                  v-model="formDatas.downloadTypeList"
                  multiple
                  collapse-tags
                  @change="downloadTypeChange"
                  placeholder="请选择下载类型">
                  <el-option
                    v-for="item in downloadTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
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
                <el-input v-model="formDatas.appId" @blur="appIdBlur" placeholder="请输入应用ID"></el-input>
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
      <!-- 安装失败数据总览 -->
      <overview :params="params"></overview>
      <el-divider></el-divider>
      <!-- 指标1 -->
      <echarts-indicator
        :params="params"
      ></echarts-indicator>
      <el-divider class="specialDividerSet"></el-divider>
      <!-- 表格 -->
      <report-table
        :params="params"
      ></report-table>
    </div>
  </div>
</template>
<script>
import DateControl from './common/DateControl ';
import Overview from './installFail/Overview';
import EchartsIndicator from './installFail/EchartsIndicator';
import ReportTable from './installFail/ReportTable';
import { lrTrim } from '@/const/agcReport/commonFun';
import { appinfo, getdevice } from '@/api/url';
import { INSTALL_FAIL_BASIS_SHOW, DOWNLOAD_TYPE_ENUM } from '@/const/agcReport/index';
export default {
  name: 'InstallFail',
  components: {
    DateControl,
    Overview,
    EchartsIndicator,
    ReportTable
  },
  data() {
    return {
      authorized: false, // 访问权限
      resourceUrl: '', // 当前路由地址
      basisShowOptions: INSTALL_FAIL_BASIS_SHOW, // 展示依据下拉框数据
      deviceNameOptions: [], // 机型下拉框展示数据
      downloadTypeOptions: DOWNLOAD_TYPE_ENUM, // 下载类型展示数据
      timeRange: {
        startTime: '',
        endTime: '',
      },
      formDatas: {
        deviceNameList: [],
        downloadTypeList: ['1', '2'],
        groupByType: '0',
        appName: '',
        appId: '',
      },
      rules: {
        downloadTypeList: [
          { required: true, message: '请选择下载类型', trigger: 'change' },
        ],
        appId: [
          { required: true, message: '请输入应用ID', trigger: 'change' },
        ],
      },
      params: {}, // 查询条件
      debounce: 1000
    };
  },
  created() {
    // 鉴权
    this.resourceUrl = this.$route.path;
    this.$store.state.agapOriMenu.forEach(item => {
      if (item.resourceUrl === this.resourceUrl) {
        this.authorized = true;
      }
    });
    // 获取所有机型信息
    this.getDeviceInfo();
  },
  methods: {
    startTimeEmit(time) {
      this.timeRange.startTime = time;
    },
    endTimeEmit(time) {
      this.timeRange.endTime = time;
    },
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
    handleSelect(item) {
      // 数据回填到应用ID输入框
      this.formDatas.appId = item.address;
    },
    appIdBlur() {
      // 去除首尾空格后，空字符的不请求接口
      if (!lrTrim(this.formDatas.appId)) {
        this.formDatas.appName = '';
        return;
      }
      let param = { appId: this.formDatas.appId };
      this.appNameAppId(param).then(res => {
        let data = res.data || [];
        this.formDatas.appName = data.length > 0 ? data[0].appName : '';
      }, () => {
        this.formDatas.appName = '';
      });
    },
    // 展示依据变动
    basisShowChange(val) {},
    // 机型变动
    deviceNameListChange(val) {},
    // 下载类型变动
    downloadTypeChange(val) {},
    // 获取所有机型信息
    getDeviceInfo() {
      this.deviceNameOptions = [];
      this.$requestApi.post(getdevice, {}, false).then(res => {
        let data = res.data || [];
        this.deviceNameOptions = data.map(item => {
          let temp = {
            value: item.deviceName,
            label: item.deviceName
          };
          return temp;
        });
      });
    },
    // 组装入参
    assemblyRequestParames() {
      let { deviceNameList, downloadTypeList, groupByType, appId } = this.formDatas;
      let { startTime, endTime } = this.timeRange;
      this.params = {
        appId,
        startTime: startTime.replace(/[-]/g, ''),
        endTime: endTime.replace(/[-]/g, ''),
        filterByModel: deviceNameList.length === 0 ? '1' : '0', // 0：根据deviceNameList查询 1：查询全部机型(默认)
        downloadType: downloadTypeList.length === 2 ? '0' : downloadTypeList[0], // 0：ALL 1：新下载 2：更新下载
        orderType: '1', // 按照失败次数倒序
        groupByType // 0: 根据时间分组(默认); 1: 根据机型和错误码分组; 2: 根据下载类型和错误码分组
      };
      /*
        ** 机型数组入参：
        ** 选择了机型，deviceNameList入参
        ** 未选中机型，deviceNameList不入参
      */
      if (deviceNameList.length === 0) {
        delete this.params.deviceNameList;
      } else {
        this.params.deviceNameList = deviceNameList;
      }
      /*
        ** filterType入参：
        ** 0: 不按照机型也不按照下载类型筛选
        ** 1: 根据机型筛选
        ** 2: 根据下载类型筛选
        ** 3: 根据机型和下载类型筛选
      */
      if (deviceNameList.length === 0 && downloadTypeList.length === 2) {
        this.params.filterType = '0';
      } else if (deviceNameList.length > 0 && downloadTypeList.length === 2) {
        this.params.filterType = '1';
      } else if (deviceNameList.length === 0 && downloadTypeList.length !== 2) {
        this.params.filterType = '2';
      } else {
        this.params.filterType = '3';
      }
    },
    // 查询
    onSubmit() {
      // 起始时间、结束时间 不能为空
      let { startTime, endTime } = this.timeRange;
      if (!startTime || !endTime) {
        return;
      }
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 组装入参
          this.assemblyRequestParames();
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.installFail ::v-deep {
  .queryConditions {
    .el-form {
      .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
        display: none;
      }
      .inputCommonClass div.el-input{
        width: 268px;
      }
      // .inputDateClass {
      //   div.el-input {
      //     width: 150px!important;
      //   }
      //   .el-icon-question {
      //     margin-left: 5px;
      //     font-size: 17px;
      //     color: #ccc;
      //     position: absolute;
      //     top: 11px;
      //     cursor: pointer;
      //   }
      // }
      // .countryCascader {
      //   cursor: pointer;
      // }
    }
  }
}
</style>
