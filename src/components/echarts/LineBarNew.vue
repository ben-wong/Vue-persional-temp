<template>
  <!--
  author：00497295
  time: 2019/11/22
  pattern：应用市场经分系统-趋势柱状图
   -->
  <div class="lineChartNew">
    <div ref="myChartLine" class="myChartLine" :style="styleObject"></div>
  </div>
</template>
<script>
import { toThousandsInt, toThousands, percentMax } from 'utils/index';

export default {
  name: 'LineBarNew',
  props: {
    barLineData: {
      type: Object,
      required: false,
    },
    styleObject: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    options: {
      type: Object,
      required: false,
      default: () => {
        return {
          grid: { top: 60, right: 60, bottom: 60, left: 60, containLabel: true },
          toolbox: { feature: { magicType: { type: ['line', 'bar'] }, restore: {} } },
          legend: {},
        };
      }
    }
  },
  data() {
    return {
      myChartLine: null,
      isReset: false,
      type: 'number'
    };
  },
  watch: {
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
      // console.log('趨勢圖', this.barLineData);
      // 趋势图只有一个的时候，记得重置dataType
      if (Object.keys(this.barLineData).length === 1) {
        this.dataType = Object.keys(this.barLineData)[0];
      }
      if (this.barLineData[this.dataType].xData && this.barLineData[this.dataType].xData.length === 0) {
        // this.$message({
        //   message: '数据为空，请注意',
        //   type: 'error',
        //   showClose: true
        // });
        // return; 不能return，为了数据异常时也要显示坐标轴
      }
      let vm = this;
      this.type = this.barLineData[this.dataType].type;
      let itemStyle = {
        normal: {
        },
        emphasis: {
          barBorderWidth: 1,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'rgba(0,0,0,0.5)'
        }
      };

      let option = {
        backgroundColor: '#fff',
        color: ['#00C0C9', '#FF0000', '#BE00C9', '#FFB637', '#47CC47', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570'],
        legend: {
          data: [],
          align: 'left',
          right: 120,
          top: 20,
        },
        toolbox: {
          top: 15,
          feature: {
            magicType: {
              type: ['line', 'bar']
            },
            restore: {}
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            let list = [];
            let listItem = '';
            let value = '';
            params.forEach(item => {
              if (vm.type === 'number') {
                value = toThousandsInt(item.value);
              } else if (vm.type === 'ratio') {
                value = percentMax(item.value);
              } else if (vm.type === 'dot') {
                value = toThousands(item.value);
              };
              list.push(
                '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                  item.color + ';margin-right: 5px;border-radius: 50%;}"></i>' +
                  '<span style="width:80px; margin-right:5px; display:table-ceil;">' +
                  item.seriesName + ':</span>' +
                  '<span style="margin-left:2px; display:table-ceil;">' + value + '</span>'
              );
            });
            listItem = list.join('<br>');
            return '<span style="margin-left:16px; display:table-ceil;">' + params[0].name + '</span>' + '<div>' + listItem + '</div>';
          }
        },
        xAxis: {
          data: this.barLineData[this.dataType].xData,
          name: '',
          silent: false,
          type: 'category',
          axisLine: { lineStyle: { color: '#e4e4e4' }, symbol: ['none', 'arrow'] }, // 坐标线
          axisLabel: {
            textStyle: {
              color: 'black' // 坐标字体
            }
          },
          show: true,
          boundaryGap: false,
          axisTick: { show: true },
          splitLine: { show: false },
          showMaxLabel: false, // 显示最后一个
          showMinLabel: false, // 显示第一个
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#e4e4e4' }, symbol: ['none', 'arrow'] }, // 坐标线
          axisLabel: {
            textStyle: {
              color: 'black' // 坐标字体
            }
          },
          show: true,
          axisTick: { show: true },
          splitLine: { show: true },
        },
        grid: { top: 60, left: 40, right: 40, bottom: 60 },
        series: []
      };
      // if (this.type === 'ratio') { // 如果是百分比，最大值为999.9%
      //   let yAxisRatio = {
      //     type: 'value',
      //     axisLine: { lineStyle: { color: '#e4e4e4' }, symbol: ['none', 'arrow'] }, // 坐标线
      //     axisLabel: {
      //       textStyle: {
      //         color: 'black' // 坐标字体
      //       }
      //     },
      //     max: 9.99,
      //     show: true,
      //     axisTick: { show: true }
      //   };
      //   option.yAxis = yAxisRatio;
      // };
      this.barLineData[this.dataType].yData.forEach((element, index) => {
        const yData = element['data'].map(item => {
          if (item < 0) { return ''; }
          return item;
        });
        option.legend.data.push({ name: element['name'], icon: 'circle' });
        option.series[index] = {
          type: 'line',
          smooth: true,
          itemStyle: itemStyle,
          name: element['name'],
          data: yData
        };
      });
      if (this.options.grid) {
        option.grid = this.options.grid;
      }
      if (this.options.legend.itemWidth) {
        option.legend.itemWidth = this.options.legend.itemWidth;
      }
      if (this.options.legend.width) {
        option.legend.width = this.options.legend.width;
      }
      if (this.options.legend.show) {
        option.legend.show = false;
      }
      if (this.options.yAxis) {
        option.yAxis.axisTick = this.options.yAxis.axisTick || option.yAxis.axisTick;
        option.yAxis.axisLine = this.options.yAxis.axisLine || option.yAxis.axisLine;
        option.yAxis.splitLine = this.options.yAxis.splitLine || option.yAxis.splitLine;
      }
      if (this.options.xAxis) {
        option.xAxis.axisTick = this.options.xAxis.axisTick || option.xAxis.axisTick;
        option.xAxis.axisLine = this.options.xAxis.axisLine || option.xAxis.axisLine;
        option.xAxis.splitLine = this.options.xAxis.splitLine || option.xAxis.splitLine;
      }
      if (this.options.xAxis && this.options.xAxis.name) {
        option.xAxis.name = this.options.xAxis.name;
      }
      if (this.options.legend.top) {
        option.legend.top = this.options.legend.top || option.legend.top;
      }
      if (this.options.legend.right) {
        option.legend.right = this.options.legend.right || option.legend.right;
      }
      if (this.options.toolbox.feature) {
        option.toolbox.feature = this.options.toolbox.feature;
      }
      if (this.options.color) {
        option.color = this.options.color;
      }
      this.myChartLine.setOption(option, true);
      const yMaxLabel = this.myChartLine.getModel().getComponent('yAxis', 0).axis.scale.getExtent()[1];
      const yMaxLabelLength = (yMaxLabel + '').length;
      // console.log('yMaxLabel', yMaxLabel, yMaxLabelLength);
      if (yMaxLabelLength < 3) {
        this.isReset = true;
        option.yAxis.axisLabel.formatter = (val, index) => {
          return val + '    ';
        };
      }
      if (this.type === 'ratio') {
        this.isReset = true;
        let max = Math.ceil(yMaxLabel);
        if (max >= 9.99) {
          max = 9.99;
        }
        option.yAxis.max = max;
      }
      if (this.isReset) {
        this.myChartLine.setOption(option, true);
      }
    },
    chartResize() {
      this.myChartLine.resize();
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartResize);
  }
};
</script>

<style lang="scss" scoped>
.lineChartNew {
  position: relative;
  .myChartLine {
    width: 100%;
    height: 680px;
  }
}
</style>
