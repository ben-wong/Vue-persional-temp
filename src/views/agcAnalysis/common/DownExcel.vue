<template>
  <div class="downExcel">
    <el-button size="mini" type="primary" icon="el-icon-download" @click="downExcel" v-loading="loading">导出</el-button>
  </div>
</template>
<script>
import {
  RESERVATION_THEAD,
  RESERVATION_PROP,
  INAPP_PAYMENT_THEAD,
  INAPP_PAYMENT_PROP,
  DOWNLOAD_AND_INSTALL_THEAD,
  DOWNLOAD_AND_INSTALL_PROP,
  INSTALL_FAIL_THEAD,
  INSTALL_FAIL_PROP,
  PAID_DOWNLOAD_DETAILS_THEAD,
  PAID_DOWNLOAD_DETAILS_PROP
} from '@/const/agcReport/excelThead';
import { CURRENCY_ENUM } from '@/const/agcReport/index';
import { ID_MAP_NAME } from '@/const/agcReport/countrylists';
import { saveLogs } from '@/api/saveLogs';
import { orderdetailExcel } from '@/api/url';
import { toThousands } from '@/utils/agcReportIndex';

export default {
  name: 'DownExcel',
  props: {
    // 第一列
    groupTypeConfig: {
      type: Object,
      required: true,
      default() {
        return {
          firstColumnName: '日期',
          firstColumnValue: 'date',
          groupType: 'date',
          currency: 'CNY'
        };
      }
    },
    // 报表
    reportFlag: {
      type: String,
      required: true,
    },
    // 数据
    tableDatas: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    // 请求参数
    params: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      loading: false,
      paidDownloadDetailsTableDatas: [], // 付费下载明细
      excelCofig: {
        th: [],
        data: [],
        fileName: null,
        fileType: 'xlsx',
        sheetName: null,
        sheetStyle: {
          colsWidth: [], // excel列宽，根据不同报表自定义最合适的宽度
          rowHeight: [{ hpx: 20 }] // excel行高
        }
      },
      mergeArrays: [] // 合并
    };
  },
  watch: {
    tableDatas: {
      handler(val, oldVal) {
        // 组装数据
        this.excelDataAssemble();
      },
      deep: true
    },
  },
  mounted() {
    this.excelDataAssemble();
  },
  methods: {
    // 组装excel数据
    excelDataAssemble() {
      if (this.reportFlag === 'reservationReport') { // 预约报表
        this.reservationReport();
      } else if (this.reportFlag === 'inAppPaymentReport') { // 应用内付费报表
        this.inAppPaymentReport();
      } else if (this.reportFlag === 'downloadAndInstallReport') { // 下载安装报表
        this.downloadAndInstallReport();
      } else if (this.reportFlag === 'installFailReport') { // 安装失败报表
        this.installFailReport();
      }
    },
    // 请求导出数据
    queryDatas() {
      this.loading = true;
      this.paidDownloadDetailsTableDatas = [];
      this.$requestApi.post(orderdetailExcel, this.params, false).then(res => {
        this.loading = false;
        let data = res.data || [];
        // 处理数据
        this.paidDownloadDetailsTableDatas = data.map((item, index) => {
          // 新增序号
          item.index = index + 1;
          // 新增币种名称
          let currencyDesc = '';
          let findCurrencyEle = CURRENCY_ENUM.find(ele => {
            return ele.value === item.currency;
          });
          if (findCurrencyEle) {
            currencyDesc = findCurrencyEle.label;
          }
          item.currencyDesc = currencyDesc;
          // 新增国家名称
          let countryDesc = '';
          let findCountryEle = ID_MAP_NAME.find(ele => {
            return ele.id === item.country;
          });
          if (findCountryEle) {
            countryDesc = findCountryEle.name;
          }
          item.countryDesc = countryDesc;
          // 保留2位小数，千分位
          item.amount = toThousands(item.amount);
          return item;
        });
        this.paidDownloadDetailsReport();
      }).catch(() => {
        this.loading = false;
      });
    },
    paidDownloadDetailsReport() {
      let thead = JSON.parse(JSON.stringify(PAID_DOWNLOAD_DETAILS_THEAD));
      let prop = JSON.parse(JSON.stringify(PAID_DOWNLOAD_DETAILS_PROP));
      let colsWidth = [
        { wpx: 80 },
        { wpx: 150 },
        { wpx: 150 },
        { wpx: 150 },
        { wpx: 100 },
        { wpx: 150 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 }
      ];
      this.excelCofig.fileName = '付费下载明细';
      this.excelCofig.sheetName = '付费下载明细';
      this.excelCofig.th = thead;
      this.excelCofig.sheetStyle.colsWidth = colsWidth;
      this.getExcelDatas(prop);
      this.commonDownExcel();
    },
    reservationReport() {
      let thead = JSON.parse(JSON.stringify(RESERVATION_THEAD));
      let prop = JSON.parse(JSON.stringify(RESERVATION_PROP));
      // 替换元素
      thead.splice(0, 1, this.groupTypeConfig.firstColumnName);
      prop.splice(0, 1, this.groupTypeConfig.firstColumnValue);
      let colsWidth = [
        { wpx: 80 },
        { wpx: 80 },
        { wpx: 120 },
        { wpx: 80 },
        { wpx: 120 },
        { wpx: 120 },
        { wpx: 120 },
        { wpx: 110 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 }
      ];
      this.excelCofig.fileName = '预约报表';
      this.excelCofig.sheetName = '预约报表';
      this.excelCofig.th = thead;
      this.excelCofig.sheetStyle.colsWidth = colsWidth;
      this.getExcelDatas(prop);
    },
    inAppPaymentReport() {
      let thead = JSON.parse(JSON.stringify(INAPP_PAYMENT_THEAD));
      let prop = JSON.parse(JSON.stringify(INAPP_PAYMENT_PROP));
      let { firstColumnName, firstColumnValue, currency } = this.groupTypeConfig;
      // 币种
      let currencyName = this.analysisCurrency(currency);
      // 替换元素
      thead.splice(0, 1, firstColumnName);
      thead.splice(2, 1, `付费金额(${currencyName})`);
      thead.splice(6, 1, `ARPPU(${currencyName})`);
      prop.splice(0, 1, firstColumnValue);
      let colsWidth = [
        { wpx: 80 },
        { wpx: 90 },
        { wpx: 90 },
        { wpx: 90 },
        { wpx: 120 },
        { wpx: 90 },
        { wpx: 90 }
      ];
      this.excelCofig.fileName = '应用内付费报表';
      this.excelCofig.sheetName = '应用内付费报表';
      this.excelCofig.th = thead;
      this.excelCofig.sheetStyle.colsWidth = colsWidth;
      this.getExcelDatas(prop);
    },
    downloadAndInstallReport() {
      let thead = JSON.parse(JSON.stringify(DOWNLOAD_AND_INSTALL_THEAD));
      let prop = JSON.parse(JSON.stringify(DOWNLOAD_AND_INSTALL_PROP));
      let { firstColumnName, firstColumnValue } = this.groupTypeConfig;
      // 替换元素
      thead.splice(0, 1, firstColumnName);
      prop.splice(0, 1, firstColumnValue);
      let colsWidth = [
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 }
      ];
      this.excelCofig.fileName = '下载安装报表';
      this.excelCofig.sheetName = '下载安装报表';
      this.excelCofig.th = thead;
      this.excelCofig.sheetStyle.colsWidth = colsWidth;
      this.getExcelDatas(prop);
    },
    installFailReport() {
      let thead = JSON.parse(JSON.stringify(INSTALL_FAIL_THEAD));
      let prop = JSON.parse(JSON.stringify(INSTALL_FAIL_PROP));
      let { firstColumnName, firstColumnValue } = this.groupTypeConfig;
      // 替换元素
      thead.splice(0, 1, firstColumnName);
      prop.splice(0, 1, firstColumnValue);
      let colsWidth = [
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 200 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 }
      ];
      this.excelCofig.fileName = '安装失败报表';
      this.excelCofig.sheetName = '安装失败报表';
      this.excelCofig.th = thead;
      this.excelCofig.sheetStyle.colsWidth = colsWidth;
      // 单元格合并
      this.getMergeArrays();
      this.getExcelDatas(prop);
    },
    // 获取合并数组数据
    getMergeArrays() {
      // 初始化数据
      this.mergeArrays = [];
      this.posIndex = 0;

      for (let index = 0; index < this.tableDatas.length; index++) {
        if (index === 0) {
          this.mergeArrays.push(1);
          this.posIndex = 0;
        } else {
          let flag = null;
          // 判断当前元素与上一个元素是否相同
          if (this.groupTypeConfig.groupType === 'date') { // 时间
            flag = 'date';
          } else if (this.groupTypeConfig.groupType === 'deviceName') { // 机型
            flag = 'deviceName';
          } else if (this.groupTypeConfig.groupType === 'downloadType') { // 下载类型
            flag = 'downloadType';
          }
          if (this.tableDatas[index][flag] === this.tableDatas[index - 1][flag]) {
            this.mergeArrays[this.posIndex] += 1;
            this.mergeArrays.push(0);
          } else {
            this.mergeArrays.push(1);
            this.posIndex = index;
          }
        }
      }
      // 组装xlsx能识别的合并配置
      this.xlsxMerges();
    },
    // 组装xlsx能识别的合并配置
    xlsxMerges() {
      this.excelCofig.sheetStyle.merges = [];
      this.mergeArrays.forEach((item, index) => {
        /*
            ** s: start 开始 e: end 结束
            ** c: cols 列
            ** r: rows 行
          */
        if (item > 1) {
          let merge = {
            s: { r: index + 1, c: 0 },
            e: { r: index + item, c: 0 }
          };
          this.excelCofig.sheetStyle.merges.push(merge);
        }
      });
    },
    // 获取当前币种
    analysisCurrency(currency) {
      let filter = CURRENCY_ENUM.filter(item => {
        return currency === item.value;
      });
      return filter[0] && filter[0].desc;
    },
    // 表格数据
    getExcelDatas(prop) {
      let data = [];
      // 付费下载明细报表
      if (this.reportFlag === 'paidDownloadDetails') {
        data = this.paidDownloadDetailsTableDatas.map(item => {
          return prop.map(k => {
            return item[k];
          });
        });
      } else { // 预约报表、应用内付费报表、下载安装报表、安装失败报表
        data = this.tableDatas.map(item => {
          return prop.map(k => {
            return item[k];
          });
        });
      }
      this.excelCofig.data = data;
    },
    commonDownExcel() {
      /*
        * th => 表头
        * data => 数据
        * fileName => 文件名
        * fileType => 文件类型
        * sheetName => sheet页名
        * sheetStyle => 表格样式
      */
      let { th, data, fileName, fileType, sheetName, sheetStyle } = JSON.parse(JSON.stringify(this.excelCofig));
      this.$toExcel({ th, data, fileName, fileType, sheetName, sheetStyle });
      saveLogs({ operType: 2 });
    },
    paidDlDetailsDownExcel() {
      if (JSON.stringify(this.params) === '{}') {
        this.paidDownloadDetailsReport();
      } else {
        this.queryDatas();
      }
    },
    // 导出excel
    downExcel() {
      // 付费下载明细报表
      if (this.reportFlag === 'paidDownloadDetails') {
        this.paidDlDetailsDownExcel();
      } else {
        this.commonDownExcel();
      }
    },
  }
};
</script>
<style lang="scss" scoped>
  .downExcel ::v-deep {
    float: right;
    margin: 20px 0 8px 0;
  }
</style>
