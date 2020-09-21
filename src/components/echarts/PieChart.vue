<template>
<!--
  pattern：饼图
   -->
  <div style="height: 100px">
    <p class="edu-text-start">{{ pieChartData.title || 'xxxxxx' }}</p>
    <div ref="myChart" class="myChart" v-show="!nodata" id='myChartPie'></div>
  </div>
</template>
<script>
import { toThousands } from '@/utils';
import { PIE_CHART } from '@/const/chartData';
export default {
  name: 'PieChart',
  data() {
    return {
      nodata: false,
      myChart: null,
      option: {
        title: {
          show: true,
          text: '50%', // '主标题',
          subtext: '+7.8%', // '副标题',
          x: 'center',
          y: 'center',
          textVerticalAlign: 'top',
          textStyle: {
            fontSize: 24,
            color: '#ffffff',
            lineHeight: 10
          },
          subtextStyle: {
            fontSize: 10,
            color: '#ffffff',
            verticalAlign: 'top'
          }
        },
        color: ['#ffffff', 'rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.06)'],
        series: [
          {
            type: 'pie',
            radius: ['62%', '70%'],
            legendHoverLink: false,
            hoverAnimation: false,
            silent: true,
            label: {
              show: false
            },
            data: []
          }
        ]
      }
    };
  },
  props: {
    pieChartData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pieData: {
      type: Object,
      default: () => {
        return PIE_CHART || {};
      }
    }
  },
  watch: {
    pieData: {
      handler(newVal, oldVal) {
        this.initChart();
      },
      deep: true
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.myChart);
    this.initChart();
    window.addEventListener('resize', this.chartResize);
  },
  methods: {
    initChart() {
      let data = this.pieData;
      this.option.title.text = toThousands(parseFloat(data.actualFinish).toFixed(1)) + '%';
      if (data.actualFinish > 99.9) {
        this.option.title.textStyle.fontSize = 14;
      }
      let diff = data.diffActualAndEstimatedOfConvRate;
      if (diff > 0) {
        this.option.title.subtext = '+' + toThousands(parseFloat(diff).toFixed(1)) + '%';
      } else {
        if (diff === '') {
          this.option.title.subtext = '';
        } else {
          this.option.title.subtext = toThousands(parseFloat(diff).toFixed(1)) + '%';
        }
      }
      let [actualValue, expectedValue, leftOver] = [0, 0, 0];
      actualValue = data.actualFinish; // 实际值
      expectedValue = Math.max((data.expectedCompletion - data.actualFinish), 0);
      leftOver = Math.max(100 - data.actualFinish - expectedValue, 0); // 剩余
      if (actualValue >= 100) {
        expectedValue = 0;
        leftOver = 0;
      }
      this.option.series[0].data = [
        {
          name: 'actualValue', value: actualValue
        }, {
          name: 'expectedValue', value: expectedValue
        }, {
          name: 'leftOver', value: leftOver
        }
      ];
      const option = {
        // grid: {
        //   height: 100,
        //   width: 100
        // },
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b}: {c} ({d}%)'
        // },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '50%'],
            center: ['40%', '20%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: 'kpi' },
              { value: 310, name: 'kpi' }
            ]
          }
        ]
      };
      this.myChart.setOption(option || this.option);
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
// .commonWrap {
//     background: linear-gradient(to bottom, #5CB4F4 0%,#0493FA 100%);
// }
.myChart{
  height: 9rem;
  width: 100%;
}
.edu-text-start {
  text-align: start;
}
</style>
