/*
  desc：四舍五入，保留小数位位数
  params：num dotnum = 1
  return： string 返回字符串
  scope：未用
*/
export function keepNumDot(num, dotnum = 1) {
  if (num === null) {
    return '-';
  }
  let str = Number(num).toFixed(dotnum);
  // str+="%";
  return str;
};
/*
  desc：数字千分位处理  传入数字或字符串，千分位2位小数
  params：
  return： string 返回字符串
  scope：全局使用
*/
export function toThousands(num = '') {
  if (num === '0' || num === 0) {
    return '0.00';
  }
  if (!num || num === '-') {
    return '-';
  }
  if (isNaN(+num)) {
    console.error('必须是正确的数字格式！');
    return '-';
  }
  let nums = Math.round(num * 100) / 100; // 保留二位小数且四舍五入
  nums = nums.toFixed(2);
  const n = numThousandFormat(nums);
  if (!n.includes('.')) {
    return n + '.00';
  }
  return n;
};

// 数字千分位处理
export function numThousandFormat(num = 0) {
  let numArr = num.split('.');
  let numSource = numArr[0] || 0;
  let c = numSource.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  if (numArr[1]) {
    return c + '.' + numArr[1];
  } else {
    return c;
  }
};

/*
  desc：千分位整数
  params：
  return： string 返回字符串
  scope：全局使用
*/
export function toThousandsInt(num = '') { // 整数，四舍五入
  if (num === '0' || num === 0) {
    return '0';
  }
  if (!num || num === '-') {
    return '-';
  }
  const nums = Math.round(num);
  return numFormat(nums);
}
// 数字千分位处理  支持小数 传入数字或字符串
export function numFormat(num = '') {
  let c = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  return c;
};
// 数字千分位处理
export function numberFormat(num) {
  if (num === '0' || num === 0) {
    return '0';
  }
  if (!num || num === '-') {
    return '-';
  }
  return num.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

/*
  desc：百分比处理, 保留2位小数，千分位处理
  params：
  return： string 返回字符串
  scope：全局使用
*/
export function percentMax(num = '') {
  if (num === '0' || num === 0) {
    return '0.00%';
  }
  if (!num || num === '-') {
    return '-';
  }
  return toThousands(parseFloat(num) * 100) + '%';
};

/*
  desc：timestamp转换为日期格式
  params：date1
  return： Y + M + D
  scope：全局使用
*/
export function timestampToDate(date1) {
  let date = new Date(date1); // 如果date为13位不需要乘1000
  let Y = date.getFullYear() + '';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '';
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '';
  return Y + M + D;
}

/*
  desc：趋势图日期
  params：
  return：
  scope：未使用
*/
export function barSplitDate(timestamp) {
  let date = timestampToDate(timestamp) || '';
  const regStr = /^(\d{4})(\d{2})(\d{2})$/;
  return date.replace(regStr, '$1-$2-$3');
}

/*
  desc：下载表格接口
  params：
  return：
  scope：未使用
*/
export function getDownloadData(data, downName = 'reports.xlsx') {
  const linkElement = document.createElement('a');
  const blob = new Blob([data], {
    type: 'application/octet-stream'
  });
  const url = window.URL.createObjectURL(blob);
  linkElement.setAttribute('href', url);
  linkElement.setAttribute('download', downName);
  linkElement.setAttribute('target', '_top');
  const clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: false
  });
  linkElement.dispatchEvent(clickEvent);
};

// 未用，超过5位数，K换单位M
export function toMillion(num, type) {
  let arr = [];
  if (parseInt(num) >= parseInt(100000)) {
    let Mstr = (parseInt(num)) / 1000;
    Mstr = Mstr.toFixed(1);
    // 获取最后一位数
    let spstr = String(Mstr);
    let united = String(spstr[spstr.length - 1]); // 获取小数点最后一位
    let strPr = parseInt(Mstr);
    strPr = toThousands(strPr);
    num = strPr + '.' + united;
    arr[0] = num;
    arr[1] = type;
    if (type === 'K') {
      arr[1] = 'M';
    }
    return arr;
  } else {
    num = toThousands(num);
    arr[0] = num;
    arr[1] = type;
    return arr;
  }
};

// 根据对象的某一属性进行排序的js代码
export function compare(propertyName) {
  return function(object1, object2) {
    let value1 = Number(object1[propertyName]);
    let value2 = Number(object2[propertyName]);
    if (value2 < value1) {
      return -1;
    } else if (value2 > value1) {
      return 1;
    } else {
      return 0;
    }
  };
};

// 未用， 四舍五入，n是数字，p是保留位数
export function tofixeds(n, p) {
  return '' + ~~(0.5 + n * ('10e' + (p - 1))) / ('10e' + (p - 1));
};

// 未用，取数组中最小值的90%，并向下取两位小数精度
export function getFloor(arr) {
  if (!arr || arr.length === 0) return 0;
  let realFloor = Math.min.apply(null, arr);
  return Math.floor(realFloor * 0.9);
};

// 未用，取数组中最大值的110%，并向下取两位小数精度
export function getMax(arr) {
  if (!arr || arr.length === 0) return 0;
  let realMax = Math.max.apply(null, arr);
  return Math.Max(realMax * 1);
};
// 不允许输入特殊字符，部分页面使用
export function disableSpecialStr(val) {
  // const pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g;
  // const pattern = /[^a-zA-Z0-9\u4E00-\u9FA5-_]/g;
  const pattern = /[*%]/g;
  return val.replace(pattern, '');
};

/*
  desc：timestamp转换为日期格式
  return： Y + M + D + h + m + s;
  scope：全局使用
*/
export function timestampToTime() {
  const date = new Date();
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
}
