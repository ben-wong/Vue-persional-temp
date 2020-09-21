
<template>
<!--
  author：00497295
  time: 2019/11/26
  pattern：中卡,首页第五个卡片，下载量
   -->
  <div class="fifthCardNew">
    <div class="headerCard1">
      <div class="headerCardone">
        <span>新下载量</span>
        <span class="headerKpi">{{itemData.amount | formatNull}} </span>
        <span class="right">{{$store.state.currentDate | formatNull}}</span>
      </div>
      <div ref="myProgressBar" class="headerCardtwo">

      </div>
      <div class="headerCardthree">
        <span>完成率</span>
        <span class="right">{{itemData.ratio | formatNull}} </span>
      </div>
    </div>
    <div class="headerCard2">
      <div class="left">
        <p class="number">{{itemData.peak | formatNull}}
          <!-- <span class="cardtitle">万</span>  -->
        </p>
        <p class="cardtitle">本月峰值(万次) </p>
      </div>
      <div class="center">
        <p class="number">{{itemData.kpi | formatNull}}
          <!-- <span class="cardtitle">万</span>  -->
        </p>
        <p class="cardtitle">目标值(万次) </p>
      </div>
      <div class="right">
        <p class="number">{{itemData.average | formatNull}}
          <!-- <span class="cardtitle">万</span>  -->
        </p>
        <p class="cardtitle">本月均值(万次) </p>
      </div>
    </div>
  </div>
</template>

<script>
import { toThousands } from '@/lib/utils';
// import AgapBarChart from '@/pages/overall/common/AgapBarChart'
// import WholeMarket from '@/pages/overall/common/WholeMarket'
// import PieChart from '@/components/common/PieChart'
export default {

  name: 'HeaderCardNew',
  components: {
    // AgapBarChart
    // WholeMarket,
    // PieChart
  },
  data() {
    return {
      myProgressBar: null,
      itemData: {
        amount: '--',
        average: '--',
        peak: '--',
        kpi: '--',
        ratio: '--'
      }
    };
  },
  props: {
    middleCardData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    middleCardData: {
      handler(newVal, oldVal) {
        this.initChart();
      },
      deep: true
    },
    barData: {
      handler(newVal, oldVal) {
        this.initChart();
      },
      deep: true
    }
  },
  mounted() {
    this.myProgressBar = this.$echarts.init(this.$refs.myProgressBar);
    this.initChart();
    window.addEventListener('resize', this.chartResize);
  },
  methods: {
    initChart() {
      if (this.middleCardData.downloads == '--') {
        this.itemData.amount = '--';
        this.itemData.average = '--';
        this.itemData.peak = '--';
        this.itemData.kpi = '--';
        this.itemData.ratio = '--';

        this.barData = 0;
        this.barDataMax = 100;
      } else {
        this.itemData.amount = toThousands(this.middleCardData.downloads);
        this.itemData.average = toThousands(this.percentFormat(this.middleCardData.averageMonthly));
        this.itemData.peak = toThousands(this.percentFormat(this.middleCardData.peakMonthly));
        this.itemData.kpi = toThousands(this.percentFormat(this.middleCardData.goalMonthly));
        this.itemData.ratio = this.middleCardData.goalCompletionRatio;
        this.barData = this.itemData.ratio.substring(0, this.itemData.ratio.indexOf('.')) * 1;
        if (this.barData > 100) {
          this.barData = 100;
        }
        this.barDataMax = 100;
      }
      // console.log(this.barData)

      let option = {
        grid: { left: '0%', right: '0%' },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          data: ['周一'],
          show: false
        },
        color: ['#4576E9', 'rgba(0,0,0,0.1)', '#B0DAF9' ], // 第三个颜色暂时没用
        series: [
          {
            name: '实际完成率',
            type: 'bar',
            legendHoverLink: false,
            label: {
              normal: {
                show: false,
                position: 'insideRight'
              }
            },
            itemStyle: {
              barBorderRadius: 6
            },
            emphasis: {
              itemStyle: {
                color: '#3DA8F5'
              }
            },
            silent: true,
            barWidth: 6,
            animation: false,
            barMinHeight: 6,
            barGap: '-100%',
            z: 3,
            data: []
          },
          {
            name: '期望完成率',
            type: 'bar',
            label: {
              normal: {
                show: false,
                position: 'insideRight'
              }
            },
            silent: true,
            itemStyle: {
              barBorderRadius: 6
            },
            emphasis: {
              itemStyle: {
                color: '#B0DAF9'
              }
            },
            barWidth: 6,
            animation: false,
            barMinHeight: 6,
            barGap: '-100%',
            z: 2,
            data: []
          }
        ]
      };
      // let [actualValue, expectedValue] = [0, 0] // 初始化都是0
      // actualValue = data.actualFinish // 实际
      // expectedValue = data.expectedCompletion
      // expectedValue = Math.min(data.expectedCompletion, 100)// 期望值
      // if (actualValue >= 100) {
      //   actualValue = 200
      // }
      option.series[0].data = [this.barData];
      option.series[1].data = [this.barDataMax];
      this.myProgressBar.setOption(option, true);
    },

    percentFormat(num) {
      if (num === null) {
        return '';
      }
      let str = Number(num / 10000).toFixed(0);
      // str+="%";
      return str;
    },
    chartResize() {
      this.myChart.resize();
      this.initChart();
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartResize);
  }

};
</script>
<style lang='scss' scoped>
.fifthCardNew {
  // position: relative;
  margin: 48px 0 48px 0;
  padding: 48px 72px 0 72px;
  box-sizing: border-box;
  // justify-content: space-around;
  // width: 100%;
  margin-left:72px;
  margin-right: 72px;
  height: 588px;
  border-radius: 0.5rem;
  background: #F2F2F2;
  .headerCard1 {
    height:288px;
    width: 100%;
    margin: auto;
    .right {
      float: right;
    }
    .headerKpi {
      margin-left: 20px;
      color: #007DFF;
      font-size: 48px;
      font-weight: 500;
    }
    .headerCardone {
      height: 35%;
    }
    .headerCardtwo {
      height: 30%;
      width: 100%;
    }
    .headerCardthree {
      height: 35%;
      border-bottom: 3px solid rgba(0,0,0,0.2);
    }
  }
  .headerCard2 {
    display: flex;
    justify-content: space-between;
    margin-top: 48px;
    p {
      margin:0;
    }
    .number {
      color: #007DFF;
      font-size: 48px;
      font-weight: 500;
    }
    .cardtitle {
      font-size: 36px;
      margin-bottom:0rem;
      color: #000000;
    }
    .left {
      width: 33%;
      flex-direction: column;
      text-align: center;
    }
    .right {
      width: 33%;
      flex-direction: column;
      text-align: center;
    }
    .center {
      width: 34%;
      flex-direction: column;
      text-align: center;
    }
  }
}
</style>
