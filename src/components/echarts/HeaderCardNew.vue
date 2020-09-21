<template>
  <!--
  author：00497295
  time: 2019/11/21
  pattern：大卡,首页第一个卡片
   -->
  <div class="headerCardNew">
    <div class="headerCard1">
      <div class="headerCardleft">
        <div
          ref="myChartPieLeft"
          class="headerCardleftwrap"
          id="myChartPieLeft"
        ></div>
        <p class="headerKpi">{{ incomeAmount | formatNull }}</p>
        <p class="headerTitle">{{ incomeTitle | formatNull }}</p>
      </div>
      <div class="headerCardcenter">
        <div
          ref="myChartPie"
          class="myChartPie"
          id="myChartPie"
        ></div>
        <p class="headerKpi">{{ dailyAmount | formatNull }}</p>
        <p class="headerTitle">{{ dailyTitle | formatNull }}</p>
      </div>
      <div class="headerCardright">
        <div
          ref="myChartPieRight"
          class="headerCardrightwrap"
          id="myChartPieRight"
        ></div>
        <p class="headerKpi">{{ timeAmount | formatNull }}</p>
        <p class="headerTitle">{{ timeTitle | formatNull }}</p>
      </div>
    </div>
    <div class="headerCard2">
      <div class="left">
        <p class="number">{{ wholeMarkets.average | formatNull }}</p>
        <p class="cardtitle">{{ wholeMarkets.averageTitle | formatNull }}</p>
      </div>
      <div class="center"><p class="vertical-line"></p></div>
      <div class="right">
        <p class="number">{{ wholeMarkets.peak | formatNull }}</p>
        <p class="cardtitle">{{ wholeMarkets.peakTitle | formatNull }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { toThousands } from '@/lib/utils';
import WholeMarket from '@/pages/overall/common/WholeMarket';
// import PieChart from '@/components/common/PieChart'
export default {
  name: 'HeaderCardNew',
  components: {
    WholeMarket
    // PieChart
  },
  data() {
    return {
      myChartPie: null,
      myChartPieLeft: null,
      myChartPieRight: null,
      dailyTitle: '收入(美元)',
      dailyAmount: '--',
      incomeTitle: 'KPI完成',
      incomeAmount: '--',
      timeTitle: '时间进度',
      timeAmount: '--'
    };
  },
  props: {
    pieData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    wholeMarkets: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    pieData: {
      handler(newVal, oldVal) {
        this.initChart();
      },
      deep: true
    },
    wholeMarkets: {
      handler(newVal, oldVal) {},
      deep: true
    }
  },
  mounted() {
    this.myChartPie = this.$echarts.init(this.$refs.myChartPie);
    this.myChartPieLeft = this.$echarts.init(this.$refs.myChartPieLeft);
    this.myChartPieRight = this.$echarts.init(this.$refs.myChartPieRight);
    this.initChart();
    window.addEventListener('resize', this.chartResize);
  },
  methods: {
    initChart() {
      let optionPie = {
        title: {
          show: true,
          text: '', // '主标题',
          x: 'center',
          y: 'center',
          textVerticalAlign: 'top',
          textStyle: {
            fontSize: 12,
            color: '#ffffff',
            fontWeight: 400,
            lineHeight: 10
          }
        },
        color: ['#8DFF00', '#00BFC9', 'rgba(0, 0, 0, 0.10)'],
        series: [
          {
            type: 'pie',
            radius: ['62%', '75%'],
            legendHoverLink: false,
            hoverAnimation: false,
            silent: true,
            label: {
              show: false
            },
            data: []
          }
        ]
      };
      let optionLeft = {
        color: ['#8DFF00'],
        series: [
          {
            type: 'pie',
            radius: ['62%', '80%'],
            legendHoverLink: false,
            hoverAnimation: false,
            silent: true,
            label: {
              show: false
            },
            data: [1]
          }
        ]
      };
      let optionRight = {
        color: ['#00BFC9'],
        series: [
          {
            type: 'pie',
            radius: ['62%', '80%'],
            legendHoverLink: false,
            hoverAnimation: false,
            silent: true,
            label: {
              show: false
            },
            data: [1]
          }
        ]
      };

      // console.log(this.pieData);
      // this.dailyTitle = this.pieData.title;
      this.dailyAmount = toThousands(this.pieData.amount);
      // console.log('this.dailyAmount111222', this.dailyAmount, this.pieData.amount);

      this.incomeAmount = this.pieData.actualFinish == 0 ? '--' : this.pieData.actualFinish;
      // console.log('this.incomeAmount11111', this.incomeAmount );
      this.timeAmount = this.pieData.expectedCompletion == 0 ? '--' : this.pieData.expectedCompletion;

      optionPie.title.text = this.$store.state.currentDate;

      let [actualValue, expectedValue, leftOver] = [0, 0, 0];
      actualValue = parseFloat(this.pieData.actualFinish); // 实际值
      expectedValue = Math.max(
        parseFloat(this.pieData.expectedCompletion) -
          parseFloat(this.pieData.actualFinish),
        0
      );
      leftOver = Math.max(100 - actualValue - expectedValue, 0); // 剩余
      if (actualValue >= 100) {
        expectedValue = 0;
        leftOver = 0;
      }
      optionPie.series[0].data = [
        {
          name: 'actualValue',
          value: actualValue
        },
        {
          name: 'expectedValue',
          value: expectedValue
        },
        {
          name: 'leftOver',
          value: leftOver
        }
      ];

      // this.myChartPie.clear()
      // this.myChartPieLeft.clear()
      // this.myChartPieRight.clear()
      this.myChartPie.setOption(optionPie);
      this.myChartPieLeft.setOption(optionLeft);
      this.myChartPieRight.setOption(optionRight);
    },
    chartResize() {
      this.myChartPie.resize();
      this.myChartPieLeft.resize();
      this.myChartPieLeft.resize();
      this.initChart();
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartResize);
  }
};
</script>
<style lang="scss" scoped>
.headerCardNew {
  position: relative;
  margin-top: 24px;
  margin-bottom: 48px;
  justify-content: space-around;
  // width: 100%;
  margin-left:72px;
  margin-right: 72px;
  height: 780px;
  border-radius: 0.3rem;
  // background: linear-gradient(to bottom, #5cb4f4 0%, #0493fa 100%);
  background: #4576E9;
  box-shadow: 0 0.2rem 0.2rem -0.16rem #4576E9;
  .headerTitle {
    font-size: 36px;
    margin-bottom: 0rem;
  }
  .headerKpi {
    font-size: 48px;
    font-weight: 500;
    margin-bottom: 0rem;
    color: #fff;
  }
  .headerCard1 {
    display: flex;
    .headerCardleft {
      width: 20%;
      color: #fff;
      flex-direction: column;
      margin-top: 320px;
      margin-left: 48px;
      text-align: center;

      .headerCardleftwrap {
        margin: auto;
        height: 100px;
        width: 100px;
      }
    }
    .headerCardright {
      width: 20%;
      color: #fff;
      flex-direction: column;
      margin-top: 320px;
      margin-right: 48px;
      text-align: center;
      .headerCardrightwrap {
        margin: auto;
        height: 100px;
        width: 100px;
      }
    }
    .headerCardcenter {
      width: 60%;
      color: #fff;
      flex-direction: column;
      text-align: center;
      .myChartPie {
        margin: auto;
        height: 420px;
        width: 480px;
      }
    }
  }
  .headerCard2 {
    position: absolute;
    display: flex;
    bottom: -3px;
    left: -3px;
    width: 100.5%;
    height: 192px;
    border-bottom-right-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
    background-color: #fff;
    .center {
      display: flex;
      width: 0.3%;
      justify-content:center;
      flex-direction: column;
      .vertical-line {
        height: 72px;
        width: 100%;
        background: rgba(0,0,0,0.2);
	}
    }
    .right, .left {
      display: flex;
      width: 49.3%;
      align-items: center;
      justify-content:center;
      flex-direction: column;
      .number {
        font-size: 48px;
        color: #007DFF;
        font-weight: 500;
      }
      .cardtitle {
        font-size: 36px;
        color: rgba(0,0,0,0.6)
      }
    }
  }
  // .header-card-shadow{
  //   position: absolute;
  //   bottom: -30px;
  //   width: 98%;
  //   height: 24px;
  //   background: url($image-url + 'shadow.png') no-repeat;
  //   box-shadow: 0 5px 3px #ccc;
  // }
}
</style>
