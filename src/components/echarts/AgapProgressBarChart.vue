<template>
  <div class="wrap">
    <div ref="myChart" class="myChart"></div>
  </div>
</template>
<script>
export default {
  name: 'AgapBarChart',
  data() {
    return {
      myChart: null
    };
  },
  props: {
    barData: {
      type: Number
    },
    barDataMax: {
      type: Number
    },
    colorType: {
      type: Number
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.myChart);
    this.initChart();
    window.addEventListener('resize', this.chartResize);
  },
  watch: {
    barData: {
      handler(newVal, oldVal) {
        this.initChart();
      },
      deep: true
    }
  },
  computed: {
    colorList() {
      if (this.colorType == 1) {
        return ['#00BFC9', 'rgba(0,0,0,0)'];
      } else if (this.colorType == 2) {
        return ['#FB2B2D', 'rgba(0,0,0,0)'];
      } else if (this.colorType == 3) {
        return ['#47CC47', 'rgba(0,0,0,0)'];
      }
    }
  },
  methods: {
    initChart() {
      // console.log(this.barData)

      let option = {
        grid: { left: '3%', right: '3%' },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          data: ['周一'],
          show: false
        },
        color: this.colorList,
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
            barMinHeight: 3,
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
            barMinHeight: 3,
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
      this.myChart.setOption(option, true);
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
<style lang="scss" scoped>
.wrap {
  width: 186px;
  margin-bottom: 20px;
}
.myChart {
  height: 0.4rem;
  width: 100%;
}
</style>
