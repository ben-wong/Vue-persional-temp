<template>
  <!--
    折线图
   -->
    <div style="height: 300px; width: 100%" ref="myChartLine"></div>
</template>
<script>
import { toThousands } from 'utils/index';
import { LINE_CHART } from '@/const/chartData';

export default {
  name: 'LineBarNew',
  props: {
    barLineData: {
      type: Object,
      required: false
    },
    type: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      myChartLine: null
    };
  },
  watch: {
    reload(newVal, oldVal) {
      this.initChart();
    },
    barLineData: {
      handler(newVal, oldVal) {
        this.initChart();
      },
      deep: true
    }
  },
  mounted() {
    this.myChartLine = this.$echarts.init(this.$refs.myChartLine);
    this.initChart();
    window.addEventListener('resize', this.chartResize);
  },
  methods: {
    initChart() {
      this.myChartLine.setOption(this.barLineData || LINE_CHART, true);
    },
    chartResize() {
      this.myChartLine.resize();
      // this.initChart();
    },
    getNumLength(num) {
      let i = 0;
      let j = 0;
      if (num > 100000) {
        i = toThousands(Number(num / 10000).toFixed(0)).length;
        j = 1;
      } else {
        i = toThousands(num).length;
        j = 0;
      }
      return [i, j];
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartResize);
  }
};
</script>

<style lang="scss" scoped>
.lineChartNew {
  // margin-top: 40px;
  // width: 100%;
  // margin-left:72px;
  // margin-right: 72px;
  .titleText {
      font-family: "HWtext 65ST" !important;
      font-weight: 500;
      padding: 39px 0 24px 0;
      font-size: 54px;
      // height: 144px;
      line-height: 80px;
      color: rgba(0,0,0, 0.9);
      .date {
        font-family: "HWtext 55ST";
        font-size: 42px;
        font-weight: normal;
        float: right;
        color: rgba(0,0,0, 0.6);
        position:  relative;
        bottom: -7px;
      }
    }
  .subTitleText {
    display: flex;
    // width: 99%;
    margin: auto;
    flex-wrap: wrap;
    justify-content: space-between;
    .subTitle {
      border-radius: 36px;
      font-size: 36px;
      padding: 12px 24px 12px 24px;
      margin: 42px 0;
      background-color: #ececec;
      cursor: pointer;
    }
    .subTitleThree {
      border-radius: 36px;
      font-size: 36px;
      padding: 12px 24px 12px 24px;
      // margin-right: 0.2rem;
      background-color: #ececec;
      cursor: pointer;
      min-width: 42%;
      margin: 12px 0;
      text-align: center;
    }
    .isSubActive {
      background-color: rgba(0, 123, 255, 0.2) !important;
      // opacity: 0.2;
    }
  }
  .subTitleText1 {
    margin: 36px 0;
  }
  .myChartLine {
    width: 100%;
    height: 320px;
  }
  .rightContent {
    display: table;
  }
  .topAndBottom {
    display: table-cell;
  }
}
</style>
