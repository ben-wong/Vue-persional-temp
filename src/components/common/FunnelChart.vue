<template>
  <!--
    漏斗图
   -->
<div class="funnel">
    <el-row>
      <div class="funnel-text">
        <p>活跃浏览转化率</p>
        <p class="color-gray"></p>
        <p class="funnel-number">{{ translationRatio.browseRatio | percentMax }}</p>
      </div>
      <div class="funnel-text2">
        <p>浏览学习转化率</p>
        <p class="color-gray"></p>
        <p class="funnel-number">{{ translationRatio.browseLearnRatio | percentMax }}</p>
      </div>
      <div class="edu-funnel" ref="myChartFunnel"></div>
    </el-row>
</div>
</template>
<script>
// import { FUNNEL_CHART } from '@/const/chartData';
import { toThousandsInt } from '@/utils/index';
export default {
  name: 'FunnelChart',
  props: {
    translationRatio: {
      type: Object,
      required: false,
      default: () => {
        return {
          browseRatio: '', // 浏览转化率
          browseLearnRatio: '', // 浏览学习转化率
          browseDevices: '', // 活跃数
          clientDevices: '',
          clientLearnUsers: ''
        };
      }
    },
    type: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      funnelData: {},
      myChartFunnel: null
    };
  },
  watch: {
    reload(newVal, oldVal) {
      this.initChart();
    },
    translationRatio: {
      handler(newVal, oldVal) {
        this.initChart();
      },
      deep: true
    }
  },
  mounted() {
    this.myChartFunnel = this.$echarts.init(this.$refs.myChartFunnel);
    this.initChart();
    window.addEventListener('resize', this.chartResize);
  },
  methods: {
    toThousandsInt,
    initChart() {
      console.log(this.translationRatio);
      this.funnelData = {
        color: ['#1FB2BB', '#1290BF', '#C1371F'],
        calculable: true,
        legend: {
          left: 0,
          bottom: 0,
          itemGap: 4,
          selectedMode: false,
          data: ['活跃数', '浏览数', '学习数']
        },
        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            left: '35%',
            top: 27,
            // x2: 80,
            bottom: 60,
            width: '80%',
            height: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 0,
            label: {
              color: '#000',
              fontSize: '14',
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 50,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 0
            },
            emphasis: {
              label: {
                fontSize: 14
              }
            },
            data: [
              { value: 60, name: this.toThousandsInt(this.translationRatio.clientDevices) },
              { value: 40, name: this.toThousandsInt(this.translationRatio.browseDevices) },
              { value: 20, name: this.toThousandsInt(this.translationRatio.clientLearnUsers) }
            ]
          },
          { type: 'funnel',
            left: '20%',
            top: 30,
            // x2: 80,
            bottom: 60,
            width: '100%',
            height: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 0,
            label: {
              color: '#000',
              fontSize: '14',
              show: false,
              position: 'inside'
            },
            labelLine: {
              length: 50,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 0
            },
            emphasis: {
              label: {
                fontSize: 14
              }
            },
            data: [
              { value: 0, name: '活跃数' },
              { value: 0, name: '浏览数' },
              { value: 0, name: '学习数' }
            ]
          }
        ]
      };
      this.myChartFunnel.setOption(this.funnelData, true);
    },
    chartResize() {
      this.myChartFunnel.resize();
      // this.initChart();
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartResize);
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0
}
.funnel {
  position: relative;
}
.funnel-text{
  top: 59px;
  left: 8px;
  width: 100%;
  position: absolute;
}
.funnel-text2 {
  position: absolute;
  width: 100%;
  top: 112px;
  left: 8px;
}
.color-gray {
  margin: 7px 0;
  height: 1px;
  width: 60%;
  border-bottom: 1px solid #e7e7e7;
}
.funnel-number{
  font-size: 16px;
  color: #00aaee;
}
.edu-funnel {
  height: 200px;
  width: 80%
}
</style>
