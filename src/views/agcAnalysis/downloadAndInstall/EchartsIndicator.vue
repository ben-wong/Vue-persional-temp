<template>
  <div class="echarts" v-loading="echartLoading">
    <div class="echarts01">
      <div class="condition">
        <span>指标：</span>
        <el-select v-model="fact1" placeholder="请选择" @change="fact1Change">
          <el-option
            v-for="item in indicatorOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div ref="myChart" class="myChart" style="height:280px; width:100%;"></div>
    </div>
  </div>
</template>
<script>
import { COUNTRIES_ENUM } from '@/const/agcReport/countrylists';
import { toThousands, toThousandsInt } from '@/utils/agcReportIndex';
import { ECHART_OPTIONS_LOAD_INSTALL } from '@/const/agcReport/index';
import { uniqueHandle, reverseHandle } from '@/const/agcReport/commonFun';
import { REPORT_ECHART_COMMON_OPTION } from '@/const/agcReport/echartsOptions';
export default {
  name: 'EchartsIndicator',
  components: {
  },
  data() {
    return {
      indicatorOption: ECHART_OPTIONS_LOAD_INSTALL, // 指标1下拉框数据
      echartOption: {},
      tooltipFormatter: (params, ticket, callback) => {
        let tooltips = params[0].name + '<br />';
        params.forEach(item => {
          // 图表title名称
          let seriesName = item.seriesName;
          // 值
          let formalValue = item.data;
          // 曝光点击率、详情页转化率、安装成功率
          if (this.fact1 === 'exposureClickRate' || this.fact1 === 'detailPageConversionRate' || this.fact1 === 'installSuccessRate') {
            if (formalValue || formalValue === 0) {
              // formalValue = percentMax(formalValue); // 百分位保留2位小数，千分位处理
              formalValue = toThousands(formalValue) + '%'; // 千分位2位小数
            } else {
              formalValue = '--';
            }
          } else {
            if (formalValue || formalValue === 0) {
              formalValue = toThousandsInt(formalValue);// 千分位处理
            } else {
              formalValue = '--';
            }
          }
          tooltips += item.marker + ' ' + seriesName + ':&nbsp;&nbsp;' + formalValue + '<br />';
        });
        return tooltips;
      },
      fact1: 'exposureCnt',
      fact1Name: '曝光',
      // 存贮不同指标的数据
      indicatorDataMap: {
        exposureCnt: [], // 曝光
        detailsPageCnt: [], // 详情页查看
        downCnt: [], // 总下载成功
        updateDownCnt: [], // 更新下载成功
        nonUpdateDownCnt: [], // 新下载成功
        exposureClickRate: [], // 曝光点击率
        detailPageConversionRate: [], // 详情页转化率
        installSuccessRate: [] // 安装成功率
      },
      // 存贮top5不同指标的数据
      indicatorTop5DataMap: {},
      // 存贮业务不同指标的数据
      indicatorBussinessDataMap: {},
      businessTypeList: [],
      xAxisData: [], // x轴坐标数据
      legendData: [], // 图例数据
      listDatasCopy: [],
    };
  },
  props: {
    groupType: {
      type: String,
      required: true,
      default: '1' // 1:时间分组 2:国家分组
    },
    listDatas: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    top5CodeList: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    echartLoading: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    navMenuChangeFlag() {
      return this.$store.state.navMenuChangeFlag;
    }
  },
  watch: {
    listDatas: {
      handler(val, oldVal) {
        this.listDatasCopy = JSON.parse(JSON.stringify(this.listDatas));
        // 曝光点击率、详情页转化率、安装成功率 原始数据 * 100
        this.listDatasCopy = this.listDatasCopy.map(item => {
          if (item.exposureClickRate) {
            item.exposureClickRate = item.exposureClickRate * 100;
          }
          if (item.detailPageConversionRate) {
            item.detailPageConversionRate = item.detailPageConversionRate * 100;
          }
          if (item.installSuccessRate) {
            item.installSuccessRate = item.installSuccessRate * 100;
          }
          return item;
        });
        // 反转数组
        this.listDatasCopy = reverseHandle(this.listDatasCopy);
        // 具体处理
        this.analysisDatas();
      },
      deep: true,
    },
    // 监听左侧导航变化
    navMenuChangeFlag(val, oldVal) {
      this.chartResize();
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.myChart);
    // 绘制空数据的折线图
    this.analysisDatas();
    window.addEventListener('resize', this.chartResize);
  },
  methods: {
    // 初始化指标数据
    initIndicatorDataMap() {
      this.indicatorDataMap.exposureCnt = [];
      this.indicatorDataMap.detailsPageCnt = [];
      this.indicatorDataMap.downCnt = [];
      this.indicatorDataMap.updateDownCnt = [];
      this.indicatorDataMap.nonUpdateDownCnt = [];
      this.indicatorDataMap.exposureClickRate = [];
      this.indicatorDataMap.detailPageConversionRate = [];
      this.indicatorDataMap.installSuccessRate = [];
    },
    analysisDatas() {
      // 初始化指标数据
      this.initIndicatorDataMap();
      // 初始化top5指标数据
      this.indicatorTop5DataMap = {};
      // 初始化业务类型指标数据
      this.indicatorBussinessDataMap = {};
      this.xAxisData = []; // 初始化x轴数据
      this.businessTypeList = []; // 初始化业务类型
      if (this.groupType === '1') { // 按日期分组
        // 组装指标数据
        this.listDatasCopy.forEach(item => {
          let exposureCnt = { time: item.time, value: item.exposureCnt };
          let detailsPageCnt = { time: item.time, value: item.detailsPageCnt };
          let downCnt = { time: item.time, value: item.downCnt };
          let updateDownCnt = { time: item.time, value: item.updateDownCnt };
          let nonUpdateDownCnt = { time: item.time, value: item.nonUpdateDownCnt };
          let exposureClickRate = { time: item.time, value: item.exposureClickRate };
          let detailPageConversionRate = { time: item.time, value: item.detailPageConversionRate };
          let installSuccessRate = { time: item.time, value: item.installSuccessRate };

          this.indicatorDataMap.exposureCnt.push(exposureCnt);
          this.indicatorDataMap.detailsPageCnt.push(detailsPageCnt);
          this.indicatorDataMap.downCnt.push(downCnt);
          this.indicatorDataMap.updateDownCnt.push(updateDownCnt);
          this.indicatorDataMap.nonUpdateDownCnt.push(nonUpdateDownCnt);
          this.indicatorDataMap.exposureClickRate.push(exposureClickRate);
          this.indicatorDataMap.detailPageConversionRate.push(detailPageConversionRate);
          this.indicatorDataMap.installSuccessRate.push(installSuccessRate);
        });
        // 组装xAxis data数据
        this.xAxisData = this.indicatorDataMap[this.fact1].map(item => {
          return item.time;
        });
        this.seriesDataHandle();
      } else if (this.groupType === '2') { // 按国家分组
        // top5国家名称
        this.legendData = this.top5CodeList.map(item => {
          let filter = COUNTRIES_ENUM.filter(ele => {
            return ele.id === item;
          });
          return filter[0] && filter[0].name ? filter[0].name : '';
        });

        // 组装xAxis-data数据
        let dateArray = this.listDatasCopy.map(item => {
          return item.time;
        });
        // 日期去重处理
        this.xAxisData = uniqueHandle(dateArray);

        // 绑定映射关系
        this.top5CodeList.forEach(countryId => {
          this.indicatorTop5DataMap[countryId] = {};
        });

        let top5CountryIdListMap = {};
        this.top5CodeList.forEach(element => {
          top5CountryIdListMap[element] = [];
          this.listDatasCopy.forEach(item => {
            if (element === item.countryId) {
              top5CountryIdListMap[element].push(item);
            }
          });
        });

        this.top5CodeList.forEach(countryId => {
          // name
          let filter = COUNTRIES_ENUM.filter(ele => {
            return ele.id === countryId;
          });
          let name = filter[0] && filter[0].name ? filter[0].name : '';
          let temp = {
            exposureCnt: [], // 曝光
            detailsPageCnt: [], // 详情页查看
            downCnt: [], // 总下载成功
            updateDownCnt: [], // 更新下载成功
            nonUpdateDownCnt: [], // 新下载成功
            exposureClickRate: [], // 曝光点击率
            detailPageConversionRate: [], // 详情页转化率
            installSuccessRate: [] // 安装成功率
          };
          // data
          this.xAxisData.forEach(date => {
            let findEle = top5CountryIdListMap[countryId].find(dateEle => {
              return dateEle.time === date;
            });
            if (findEle) {
              temp.exposureCnt.push(findEle.exposureCnt);
              temp.detailsPageCnt.push(findEle.detailsPageCnt);
              temp.downCnt.push(findEle.downCnt);
              temp.updateDownCnt.push(findEle.updateDownCnt);
              temp.nonUpdateDownCnt.push(findEle.nonUpdateDownCnt);
              temp.exposureClickRate.push(findEle.exposureClickRate);
              temp.detailPageConversionRate.push(findEle.detailPageConversionRate);
              temp.installSuccessRate.push(findEle.installSuccessRate);
            } else {
              temp.exposureCnt.push(null);
              temp.detailsPageCnt.push(null);
              temp.downCnt.push(null);
              temp.updateDownCnt.push(null);
              temp.nonUpdateDownCnt.push(null);
              temp.exposureClickRate.push(null);
              temp.detailPageConversionRate.push(null);
              temp.installSuccessRate.push(null);
            }
          });
          let tmp = {
            name: name, // 国家名字
            type: 'line',
            data: temp // 国家不同指标数据
          };
          this.indicatorTop5DataMap[countryId] = tmp;
        });
        // 给seriesData赋值
        this.seriesTop5CommonHandle();
      } else if (this.groupType === '4') { // 按应用版本分组
        // top5应用版本号
        this.legendData = this.top5CodeList;

        // 组装xAxis-data数据
        let dateArray = this.listDatasCopy.map(item => {
          return item.time;
        });
        // 日期去重处理
        this.xAxisData = uniqueHandle(dateArray);

        // 绑定映射关系
        this.top5CodeList.forEach(appVersion => {
          this.indicatorTop5DataMap[appVersion] = {};
        });

        let top5AppVersionListMap = {};
        this.top5CodeList.forEach(element => {
          top5AppVersionListMap[element] = [];
          this.listDatasCopy.forEach(item => {
            if (element === item.appVersion) {
              top5AppVersionListMap[element].push(item);
            }
          });
        });

        this.top5CodeList.forEach(appVersion => {
          let name = appVersion;
          let temp = {
            exposureCnt: [], // 曝光
            detailsPageCnt: [], // 详情页查看
            downCnt: [], // 总下载成功
            updateDownCnt: [], // 更新下载成功
            nonUpdateDownCnt: [], // 新下载成功
            exposureClickRate: [], // 曝光点击率
            detailPageConversionRate: [], // 详情页转化率
            installSuccessRate: [] // 安装成功率
          };
          // data
          this.xAxisData.forEach(date => {
            let findEle = top5AppVersionListMap[appVersion].find(dateEle => {
              return dateEle.time === date;
            });
            if (findEle) {
              temp.exposureCnt.push(findEle.exposureCnt);
              temp.detailsPageCnt.push(findEle.detailsPageCnt);
              temp.downCnt.push(findEle.downCnt);
              temp.updateDownCnt.push(findEle.updateDownCnt);
              temp.nonUpdateDownCnt.push(findEle.nonUpdateDownCnt);
              temp.exposureClickRate.push(findEle.exposureClickRate);
              temp.detailPageConversionRate.push(findEle.detailPageConversionRate);
              temp.installSuccessRate.push(findEle.installSuccessRate);
            } else {
              temp.exposureCnt.push(null);
              temp.detailsPageCnt.push(null);
              temp.downCnt.push(null);
              temp.updateDownCnt.push(null);
              temp.nonUpdateDownCnt.push(null);
              temp.exposureClickRate.push(null);
              temp.detailPageConversionRate.push(null);
              temp.installSuccessRate.push(null);
            }
          });
          let tmp = {
            name: name, // 应用版本号
            type: 'line',
            data: temp // 对应不同指标数据
          };
          this.indicatorTop5DataMap[appVersion] = tmp;
        });
        // 给seriesData赋值
        this.seriesTop5CommonHandle();
      } else if (this.groupType === '6') { // 按业务类型分组
        let dateArray = []; // 组装xAxis-data数据
        let businessTypeList = []; // 收集AppGallery、AppTouch数据
        this.listDatasCopy.forEach(item => {
          dateArray.push(item.time);
          businessTypeList.push(item.businessType);
        });
        // 日期去重处理
        this.xAxisData = uniqueHandle(dateArray);
        // 业务类型去重
        this.businessTypeList = uniqueHandle(businessTypeList);
        // 业务类型名称
        this.legendData = this.businessTypeList;
        // 绑定映射关系
        this.businessTypeList.forEach(businessType => {
          this.indicatorBussinessDataMap[businessType] = {};
        });
        let businessTypeListMap = {};
        this.businessTypeList.forEach(element => {
          businessTypeListMap[element] = [];
          this.listDatasCopy.forEach(item => {
            if (element === item.businessType) {
              businessTypeListMap[element].push(item);
            }
          });
        });
        this.businessTypeList.forEach(businessType => {
          // name
          let name = businessType;
          let temp = {
            exposureCnt: [], // 曝光
            detailsPageCnt: [], // 详情页查看
            downCnt: [], // 总下载成功
            updateDownCnt: [], // 更新下载成功
            nonUpdateDownCnt: [], // 新下载成功
            exposureClickRate: [], // 曝光点击率
            detailPageConversionRate: [], // 详情页转化率
            installSuccessRate: [] // 安装成功率
          };
          // data
          this.xAxisData.forEach(date => {
            let findEle = businessTypeListMap[businessType].find(dateEle => {
              return dateEle.time === date;
            });
            if (findEle) {
              temp.exposureCnt.push(findEle.exposureCnt);
              temp.detailsPageCnt.push(findEle.detailsPageCnt);
              temp.downCnt.push(findEle.downCnt);
              temp.updateDownCnt.push(findEle.updateDownCnt);
              temp.nonUpdateDownCnt.push(findEle.nonUpdateDownCnt);
              temp.exposureClickRate.push(findEle.exposureClickRate);
              temp.detailPageConversionRate.push(findEle.detailPageConversionRate);
              temp.installSuccessRate.push(findEle.installSuccessRate);
            } else {
              temp.exposureCnt.push(null);
              temp.detailsPageCnt.push(null);
              temp.downCnt.push(null);
              temp.updateDownCnt.push(null);
              temp.nonUpdateDownCnt.push(null);
              temp.exposureClickRate.push(null);
              temp.detailPageConversionRate.push(null);
              temp.installSuccessRate.push(null);
            }
          });
          let tmp = {
            name: name, // 业务名字
            type: 'line',
            data: temp // 业务不同指标数据
          };
          this.indicatorBussinessDataMap[businessType] = tmp;
        });
        // 给seriesData赋值
        this.seriesTop5CommonHandle();
      }
    },
    seriesDataHandle() {
      // 组装serise data数据
      let seriesData = this.indicatorDataMap[this.fact1].map(item => {
        let value = item.value;
        return value;
      });
      this.echartOption = JSON.parse(JSON.stringify(REPORT_ECHART_COMMON_OPTION));
      this.echartOption.series[0].data = seriesData;
      this.echartOption.series[0].name = this.fact1Name;
      this.echartOption.series[0].type = 'line';
      this.echartOption.legend.data[0] = this.fact1Name;
      this.echartOption.xAxis.data = this.xAxisData;
      // 曝光点击率、详情页转化率、安装成功率
      if (this.fact1 === 'exposureClickRate' || this.fact1 === 'detailPageConversionRate' || this.fact1 === 'installSuccessRate') {
        this.echartOption.yAxis.name = '百分率（%）';
      } else {
        this.echartOption.yAxis.name = '数量';
      }
      // tooltip
      this.echartOption.tooltip.formatter = this.tooltipFormatter;
      this.initChart();
    },
    seriesTop5CommonHandle() {
      let indicatorMap = {};
      if (this.groupType === '2') { // 按国家分组
        indicatorMap = this.indicatorTop5DataMap;
      } else if (this.groupType === '4') { // 按应用版本分组
        indicatorMap = this.indicatorTop5DataMap;
      } else if (this.groupType === '6') { // 按业务类型分组
        indicatorMap = this.indicatorBussinessDataMap;
      }
      this.echartOption = JSON.parse(JSON.stringify(REPORT_ECHART_COMMON_OPTION));
      this.echartOption.xAxis.data = this.xAxisData;
      this.echartOption.legend.data = this.legendData;
      let seriesData = [];
      for (let key in indicatorMap) {
        let series = {
          name: indicatorMap[key].name,
          type: indicatorMap[key].type,
          data: indicatorMap[key].data[this.fact1]
        };
        seriesData.push(series);
      }
      this.echartOption.series = seriesData;
      // 曝光点击率、详情页转化率、安装成功率
      if (this.fact1 === 'exposureClickRate' || this.fact1 === 'detailPageConversionRate' || this.fact1 === 'installSuccessRate') {
        this.echartOption.yAxis.name = '百分率（%）';
      } else {
        this.echartOption.yAxis.name = '数量';
      }
      console.log(this.echartOption);
      // tooltip
      this.echartOption.tooltip.formatter = this.tooltipFormatter;
      this.initChart();
    },
    initChart() {
      this.myChart.setOption(this.echartOption, true);
    },
    chartResize() {
      this.myChart.resize();
      this.initChart();
    },
    fact1Change(val) {
      let filterEle = ECHART_OPTIONS_LOAD_INSTALL.filter(item => {
        return item.value === val;
      });
      this.fact1Name = filterEle[0].label;
      // 更新echarts数据
      if (this.groupType === '1') {
        this.seriesDataHandle();
      } else if (this.groupType === '2' || this.groupType === '4' || this.groupType === '6') {
        this.seriesTop5CommonHandle();
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartResize);
  }
};
</script>
<style lang="scss" scoped>
.echarts ::v-deep{
  margin-top: 30px;
  .myChart {
    margin-top: 35px;
  }
}
</style>>
