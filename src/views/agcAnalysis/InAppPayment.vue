<template>
  <div class="main">
    <no-auth v-if="!authorized"></no-auth>
    <div class="inAppPayment" v-else>
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
                <el-select v-model="formDatas.groupby" placeholder="请选择" @change="basisShowChange">
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
              <el-form-item label="国家/地区：" prop="countryIdList" class="inputCommonClass">
                <el-cascader
                  class="countryCascader"
                  :options="countryList"
                  :props="props"
                  v-model="formDatas.countryIdList"
                  @change="cascaderHandleChange"
                  collapse-tags
                  clearable>
                </el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="币种：" class="inputCommonClass">
                <el-select v-model="formDatas.currency" placeholder="请选择" @change="currencyChange">
                  <el-option
                    v-for="item in currencyEnum"
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
                <el-input v-model="formDatas.appId" @blur="appIdBlur" ></el-input>
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
      <!-- 应用内付费数据总览 -->
      <overview :params="params"></overview>
      <el-divider></el-divider>
      <!-- 指标1 -->
      <echarts-num
        :echartLoading="echartLoading"
        :echartsDatas="echartsDatas"
        :groupby="formDatas.groupby"
        :currency="formDatas.currency"
        :top5CountryIdList="top5CountryIdList"
        @updateFact1ValEmit="updateFact1ValEmit"
      ></echarts-num>
      <!-- 指标2 -->
      <echarts-money
        :echartLoading="echartLoading"
        :echartsDatas="echartsDatas"
        :groupby="formDatas.groupby"
        :currency="formDatas.currency"
        :top5CountryIdList="top5CountryIdList"
        @updateFact2ValEmit="updateFact2ValEmit"
      ></echarts-money>
      <el-divider class="specialDividerSet"></el-divider>
      <!-- 表格 -->
      <report-table
        :params="params"
        @updateTop5CountryIdListEmit="updateTop5CountryIdListEmit"
      ></report-table>
    </div>
  </div>
</template>
<script>
import { BASIS_SHOW, CURRENCY_ENUM } from '@/const/agcReport/index';
import { getiapreporttop, appinfo } from '@/api/url';
import { formatDate, lrTrim } from '@/const/agcReport/commonFun';
import { COUNTRYLISTS_ALL_ZH, COUNTRYLISTS_ZH } from '@/const/agcReport/countrylists';
import Overview from './inAppPayment/Overview';
import EchartsNum from './inAppPayment/EchartsNum';
import EchartsMoney from './inAppPayment/EchartsMoney';
import ReportTable from './inAppPayment/ReportTable';
export default {
  name: 'InAppPayment',
  components: {
    Overview,
    EchartsNum,
    EchartsMoney,
    ReportTable,
  },
  data() {
    return {
      authorized: false, // 访问权限
      resourceUrl: '', // 当前路由地址
      basisShowOptions: BASIS_SHOW, // 展示依据下拉框数据
      currencyEnum: CURRENCY_ENUM, // 币种下拉框数据
      props: {
        multiple: true,
        expandTrigger: 'hover',
        value: 'id',
        label: 'name',
        children: 'countries'
      },
      countryList: COUNTRYLISTS_ZH,
      formDatas: {
        startTime: '',
        endTime: '',
        groupby: '1', // 1:时间分组 2:国家分组
        countryIdList: COUNTRYLISTS_ALL_ZH,
        currency: 'CNY', // 国家/地区选择包含中国，币种默认人民币 (CNY：人民币 USD：美元 EUR：欧元)
        appName: '',
        appId: '',
      },
      rules: {
        countryIdList: [
          { required: true, message: '请选择国家/地区', trigger: 'change' },
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
      echartsDatas: [], // echarts图形数据
      fact1: '1', // echarts1 选中项
      fact2: '1', // echarts2 选中项
      top5CountryIdList: [], // tops5 countryIdList入参
      echartLoading: false,
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
    // 给初始时间
    let endTimestamp = new Date().getTime(); // 今天的时间戳
    this.formDatas.endTime = formatDate(endTimestamp, 1);
    let startTimestamp = new Date().setMonth(new Date().getMonth() - 1); // 一个月前时间点的时间戳
    this.formDatas.startTime = formatDate(startTimestamp, 1);
    // 组装请求参数
    this.assemblyRequestParames();
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
    basisShowChange(val) { },
    // 国家/地区变动
    countryListChange(val) {
      // 下拉框联动：国家/地区选择包含中国，币种默认人民币；不包含则默认欧元
      if (val.indexOf('China') >= 0) {
        this.formDatas.currency = 'CNY';
      } else {
        this.formDatas.currency = 'EUR';
      }
    },
    // 级联选择器选中值发生变化时触发
    cascaderHandleChange(val) { },
    // 币种变动
    currencyChange(val) { },
    // 起始时间变动
    startTimeChange(val) { },
    // 结束时间变动
    endTimeChange(val) { },
    // 组装请求参数
    assemblyRequestParames() {
      let { startTime, endTime, groupby, countryIdList, currency, appName, appId } = this.formDatas;

      // 组装countryIdList国家字段值
      let countryIdListALL = countryIdList.map(item => {
        return item[1];
      });
      // 1包括国内0不包括国内
      let includeCn = countryIdListALL.indexOf('CN') > -1 ? '1' : '0';
      this.params = {
        startTime: startTime.replace(/[-]/g, ''),
        endTime: endTime.replace(/[-]/g, ''),
        groupby: groupby,
        currency,
        appName,
        appId,
        includeCn: includeCn,
        countryIdList: countryIdListALL,
        businessType: 'ALL', // 枚举值为ALL、AppGallery、AppTouch。默认为ALL
        filterByCountry: '1' // 0不根据国家过滤 ，1根据国家过滤
      };
    },
    // 更新echarts1 选中项
    updateFact1ValEmit(val) {
      this.fact1 = val;
      let { groupby } = this.formDatas;
      this.queryEchartsDatas(groupby);
    },
    // 更新echarts2 选中项
    updateFact2ValEmit(val) {
      this.fact2 = val;
      let { groupby } = this.formDatas;
      this.queryEchartsDatas(groupby);
    },
    // 更新tops5 countryIdList入参，并请求echarts数据
    updateTop5CountryIdListEmit(val) {
      this.top5CountryIdList = val;
      let { groupby } = this.formDatas;
      // 按国家分组触发
      if (groupby === '2') {
        // 无top5国家，不请求接口
        if (this.top5CountryIdList.length === 0) {
          this.echartsDatas = [];
        } else {
          this.queryEchartsDatas('2'); // 请求echarts表数据
        }
      }
    },
    // 查询echarts图数据
    queryEchartsDatas(groupby) {
      let top5Params = JSON.parse(JSON.stringify(this.params));
      if (groupby === '2') {
        // 更新国家数组入参值
        top5Params.countryIdList = this.top5CountryIdList;
      }
      top5Params.fact1 = this.fact1;
      top5Params.fact2 = this.fact2;
      this.echartLoading = true;
      this.$requestApi.post(getiapreporttop, top5Params, false).then(res => {
        this.echartsDatas = res.data || [];
        this.echartLoading = false;
      }).catch(() => {
        this.echartLoading = false;
      });
    },
    onSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let { groupby } = this.formDatas;
          this.assemblyRequestParames();
          // 请求echarts表数据; 如果是按国家分组，先不请求，等待表格数据返回后获取到国家top5 id后再请求
          if (groupby === '1') {
            this.queryEchartsDatas('1'); // 请求echarts表数据
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  .inAppPayment ::v-deep {
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
        .countryCascader {
          cursor: pointer;
        }
      }
    }
  }
</style>
