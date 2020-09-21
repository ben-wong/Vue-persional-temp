<template>
  <!--
  author：00497295
  time: 2019/11/23
  pattern：联运，漏斗图
   -->
  <div class="myFunnelChart">
    <div class="titleText">
      {{ funnelData.title }} <span class="date">{{ funnelData.datetime }}</span>
    </div>
    <div ref="myChartFunnel" class="myChartFunnel"></div>
  </div>
</template>
<script>
import { toThousands } from '@/lib/utils';
export default {
  name: 'AgapFunnelChart',
  components: {},
  data() {
    return {
      myChartFunnel: null,
      option: {
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae'],
        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            width: '80%',
            height: '85%',
            left: '5%',
            top: '15%',
            bottom: '5%',
            funnelAlign: 'left',
            gap: 30,
            silent: true,
            label: {
              // normal: {
              position: 'insideLeft',
              formatter: '{b}实际: {c}',
              textStyle: {
                color: '#000'
                // }
              }
            },
            minSize: '20%',
            data: [
              { value: 60, name: '产品C' },
              { value: 30, name: '产品D' },
              { value: 10, name: '产品E' },
              { value: 80, name: '产品B' },
              { value: 100, name: '产品A' }
            ]
          },
          {
            name: '金字塔',
            type: 'funnel',
            width: '80%',
            height: '85%',
            left: '5%',
            top: '5%',
            bottom: '5%',
            gap: 30,
            silent: true,
            label: {
              // normal: {
              position: 'insideLeft',
              formatter: '{b}',
              textStyle: {
                color: '#000'
              }
              // }
            },
            itemStyle: {
              opacity: 0
            },
            sort: 'none',
            funnelAlign: 'left',
            data: [
              { value: 5, name: '端到端支付转化率' },
              { value: 4, name: '' },
              { value: 3, name: '确认支付转化率' },
              { value: 2, name: '订单生成率（不含券）' },
              { value: 1, name: '支付成功率' }
            ]
          }
        ]
      }
    };
  },
  props: {
    funnelData: {
      type: Object,
      default: () => {
        return {};
      },
      require: true
    }
  },
  watch: {},
  mounted() {
    this.myChartFunnel = this.$echarts.init(this.$refs.myChartFunnel);
    this.initChart();
    window.addEventListener('resize', this.chartResize);
  },
  methods: {
    initChart() {
      this.myChartFunnel.setOption(this.option, true);
    },
    chartResize() {
      this.myChartFunnel.resize();
      this.initChart();
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartResize);
  }
};
</script>
<style lang="scss" scoped>
.myFunnelChart {
  margin-top: 1.5rem;
  width: 100%;
  .titleText {
    font-family: "HWtext 55ST";
    font-size: 1rem;
    color: #000000;
    position: relative;
    .date {
      float: right;
    }
  }
  // .funnelCard2 {
  //   height: 2.5rem;
  //   width: 90%;
  //   background-color: aquamarine;
  // }
  .myChartFunnel {
    width: 100%;
    height: 25rem;
  }
}
</style>
