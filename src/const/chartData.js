export const PIE_CHART = {
  type: 'pie', // pie 环形图|| gauge 计量图
  title: {
    show: true,
    text: '总资产(元)',
    textStyle: {
      fontSize: '20px',
      lineHeight: '30px',
      color: '#9f9f9f'
    },
    subtext: '360',
    subtextStyle: {
      fontSize: '30px',
      lineHeight: '35px',
      color: '#e53344'
    },
    x: '50%', // title 位置
    y: '50%'
  },
  tooltip: {
    show: true,
    fontStyle: 'normal', // 规定字体样式 normal || italic || oblique
    fontVariant: 'normal', // 规定字体变体 normal || small-caps
    fontWeight: 'normal', // 规定字体的粗细 normal || bold || bolder || lighter || 100 || 200 || 300 || 400 || 500 || 600 || 700 || 800 || 900
    fontSize: '20px', // 规定字号，以像素计
    lineHeight: '30px', // 规定行高，以像素计
    fontFamily: 'Arial', // 规定字体系列
    color: 'white', // 字体颜色
    backgroundColor: '#00000099', // tip 背景
    formatter: function(param) { // 类似echarts 富文本编辑
      let str = '{a|' + param.name + '}' + '{c|' + param.percent + '}' + '\n' + '{b|' + param.value +
              '元}';
      return str;
    },
    rich: {
      a: {
        fontStyle: 'normal',
        fontVariant: 'normal',
        fontWeight: 'bold',
        fontSize: '20px',
        lineHeight: '30px',
        fontFamily: 'Arial',
        color: 'white'
      },
      c: {
        fontStyle: 'normal',
        fontVariant: 'normal',
        fontWeight: 'normal',
        fontSize: '20px',
        lineHeight: '30px',
        fontFamily: 'Arial',
        color: 'white'
      },
      b: {
        fontStyle: 'normal',
        fontVariant: 'normal',
        fontWeight: 'bold',
        fontSize: '30px',
        lineHeight: '35px',
        fontFamily: 'Arial',
        color: '#e53344'
      }
    }
  },
  x: '50%', // 图标位置
  y: '50%',
  radius: '30%', // 半径
  lineWidth: '5%', // 圆环宽度
  // {{if type === gauge 计量图}}

  // max: 120, // 映射总值
  // data: [{
  //     name: "已用时长（分钟）",
  //     value: 85, // 映射计量值
  // }],

  // {{else if type === pie 环形图}}

  // data: [{
  //     name: "帐户余额(元)",
  //     value: 110,
  // }, {
  //     name: "散标待回(元)",
  //     value: 120,
  // }, {
  //     name: "在途资金(元)",
  //     value: 130,
  // }],

  // {{/if}}
  label: {
    show: true,
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '30px',
    fontFamily: 'Arial',
    color: '#9f9f9f',
    formatter: function(param) {
      let str = '{a|' + param.name + '}' + '{c|' + param.percent + '}' + '\n' + '{b|' + param.value +
              '元}';
      return str;
    },
    rich: {
      a: {
        fontStyle: 'normal',
        fontVariant: 'normal',
        fontWeight: 'bold',
        fontSize: '20px',
        lineHeight: '30px',
        fontFamily: 'Arial'

      },
      b: {
        fontStyle: 'normal',
        fontVariant: 'normal',
        fontWeight: 'bold',
        fontSize: '30px',
        lineHeight: '35px',
        fontFamily: 'Arial',
        color: '#e53344'
      },
      c: {
        fontStyle: 'normal',
        fontVariant: 'normal',
        fontWeight: 'bold',
        fontSize: '20px',
        lineHeight: '30px',
        fontFamily: 'Arial'

      }
    }
  },
  capType: 'round', // 圆角 || butt 平角
  selectedStyle: { // 选中时的样式
    color: 'white', // 包边颜色
    borderWidth: 10 // 包边宽度
  },
  color: ['#fe7c00', '#e83227', '#32a676'],
  labelCoverTitle: true, // label 是否覆盖标题
  backgroundArc: '#999' // 空圆环的颜色
};

export const LINE_CHART = {
  toolbox: {
    show: true,
    feature: {
      magicType: ['line', 'bar']
    }
  },
  legend: {
    textStyle: {
      color: '#9E9E9E',
      fontSize: '12px'
    },
    itemWidth: 6,
    data: [{
      name: '客户端设备',
      icon: 'circle'
    },
    {
      name: '客户端帐号',
      icon: 'circle'
    },
    {
      name: 'API帐号',
      icon: 'circle'
    },
    {
      name: '教育中心入口',
      icon: 'circle'
    },
    {
      name: '应用市场入口',
      icon: 'circle'
    }],
    // x: 'right',
    right: '9.2%'
  },
  tooltip: {
    trigger: 'axis',
    showContent: true
  },
  dataset: {
    source: [
      ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
      ['客户端设备', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
      ['客户端帐号', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
      ['API帐号', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
      ['教育中心入口', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1],
      ['应用市场入口', 51.2, 47.1, 59.2, 75.4, 77.9, 88.1]
    ]
  },
  xAxis: {
    name: '时间',
    nameLocation: 'start',
    nameTextStyle: {
      padding: [28, -10, 0, 0]
    },
    type: 'category',
    axisLine: { show: false },
    axisTick: { show: false }
  },
  yAxis: {
    offset: 20,
    axisLabel: {
      textStyle: {
        align: 'left',
        baseline: 'middle'
      }
    },
    scale: true,
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false }
  },
  grid: { top: '20%', left: '5%', height: 200, containLabel: false },
  series: [
    { type: 'line', smooth: true, seriesLayoutBy: 'row', symbol: 'none', color: '#00C0C9' },
    { type: 'line', smooth: true, seriesLayoutBy: 'row', symbol: 'none', color: '#FFF000' },
    { type: 'line', smooth: true, seriesLayoutBy: 'row', symbol: 'none', color: '#BE00C9' },
    { type: 'line', smooth: true, seriesLayoutBy: 'row', symbol: 'none', color: '#FFB637' },
    { type: 'line', smooth: true, seriesLayoutBy: 'row', symbol: 'none', color: '#47CC47' }
  ]
};

export const LINE_CHART_TEST = {
  legend: {
    data: [{
      name: '流水',
      icon: 'circle'
    },
    {
      name: '客户端流水',
      icon: 'circle'
    }],
    // x: 'right',
    right: '9.2%'
  },
  tooltip: {
    trigger: 'axis'
    // showContent: true
  },
  dataset: {
    source: [
      [ 'product', '20120101', '20120102', '20120103', '20120104', '20120105', '20120106', '20120107', '20120108', '20120109', '20120110',
        '20120111', '201201012', '20120113', '20120114', '20120115', '20120116', '20120117', '20120118', '20120119', '20120120',
        '20120121', '201201022', '20120123', '20120124', '20120125', '20120126', '20120127', '20120128', '20120129', '20120130', '20120130'
      ],
      ['流水', 1000.1, 30.4, 6500.1, 53.3, 83.8, 98.7, 41.1, 30.4, 65.1, 53.3, 83.8, 98.7, 41.1, 30.4, 65.1, 53.3, 83.8, 98.7, 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
      ['客户端流水', 44.1, 8000.4, 67.1, 58.3, 86.8, 98.7, 110000.1, 38.4, 65.1, 573.3, 43.8, 98.7, 41.1, 30.4, 65.1, 53.3, 83.8, 98.7, 41.1, 30.4, 65.1, 53.3, 83.8, 98.7]
    ]
  },
  xAxis: { // x轴
    type: 'category',
    axisLine: { lineStyle: { color: '#e4e4e4' }, symbol: ['none', 'arrow'] }, // 坐标线
    axisLabel: {
      textStyle: {
        color: 'black' // 坐标字体
      },
      showMaxLabel: true // 显示最后一个坐标
    },
    show: true,
    axisTick: { show: false },
    splitLine: { show: false }
  },
  yAxis: { // Y轴
    offset: 0,
    type: 'value',
    axisLine: { lineStyle: { color: '#e4e4e4' }, symbol: ['none', 'arrow'] }, // 坐标线
    axisLabel: {
      textStyle: {
        margin: 95,
        align: 'right',
        baseline: 'middle',
        color: 'black' // 坐标字体
      }
    },
    show: true,
    axisTick: { show: false },
    splitLine: { show: false }
  },
  grid: { top: '20%', left: '0%', height: 200, containLabel: true },
  series: [
    { type: 'line', smooth: true, seriesLayoutBy: 'row', symbol: 'none', color: '#00C0C9' },
    { type: 'line', smooth: true, seriesLayoutBy: 'row', symbol: 'none', color: '#47CC47' }
  ]
};

export const USER_LINE_CHART = {
  tooltip: {
    trigger: 'axis'
    // showContent: true
  },
  dataset: {
    source: [
      ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
      ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7]
    ]
  },
  xAxis: { // x轴
    type: 'category',
    axisLine: { lineStyle: { color: '#e4e4e4' }, symbol: ['none', 'arrow'] }, // 坐标线
    axisLabel: {
      textStyle: {
        color: 'black' // 坐标字体
      }
    },
    show: true,
    axisTick: { show: false },
    splitLine: { show: false }
  },
  yAxis: { // Y轴
    type: 'value',
    axisLine: { lineStyle: { color: '#e4e4e4' }, symbol: ['none', 'arrow'] }, // 坐标线
    axisLabel: {
      textStyle: {
        color: 'black' // 坐标字体
      }
    },
    show: true,
    axisTick: { show: false },
    splitLine: { show: false }
  },
  grid: { top: '20%', left: '2%', height: 200 },
  series: [
    { type: 'line', smooth: true, seriesLayoutBy: 'row', symbol: 'none', color: '#47CC47' }
  ]
};

export const TEST_DATA = {
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter: '{a} <br/>{b}'
  },
  xAxis: {
    type: 'category',
    axisLine: { show: false, lineStyle: { color: '#9E9E9E' } },
    axisTick: { show: false, lineStyle: { color: '#e4e4e4' } },
    data: ['25', '26', '27', '28', '29', '30', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  },
  yAxis: {
    interval: 400, // 需要获取数据后，动态设置 num/5
    type: 'value',
    axisLine: { show: false, lineStyle: { color: '#9E9E9E' } },
    axisTick: { show: false, lineStyle: { color: '#e4e4e4' } }
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320, 1234, 888, 444, 545, 1111, 1432, 454, 1111],
    type: 'line',
    smooth: true,
    symbol: 'none'
  }],
  grid: { height: 100, width: 250, top: 20 }
};

export const FUNNEL_CHART = {
  color: ['#8DFF00', '#22A7D7', '#5783EB'],
  calculable: true,
  series: [
    {
      name: '漏斗图',
      type: 'funnel',
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
        { value: 60, name: '活跃' },
        { value: 40, name: '浏览' },
        { value: 20, name: '学习' }
      ]
    }
  ]
};

export const STUDY_LINE = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['蒸发量', '降水量', 'xxx', 'yyy']
  },
  toolbox: {
    show: true,
    feature: {
      // dataView : {show: true, readOnly: false},
      magicType: { show: true, type: ['line', 'bar'] }
      // restore : {show: true},
      // saveAsImage : {show: true}
    }
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '蒸发量',
      type: 'bar',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
    },
    {
      name: '降水量',
      type: 'bar',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
    },
    {
      name: 'xxx',
      type: 'bar',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
    },
    {
      name: 'yyy',
      type: 'bar',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
    }
  ]
};
