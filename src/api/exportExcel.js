import http from './http';
import { Message } from 'element-ui';

export function exportExcel({ url, fileName = 'excel', data = {} } = {}) {
  return http.download(url, data, false, false, true).then(res => {
    const data = res; // responseType:'blob', service不会拦截，都会进到resolve
    const type = data.type;
    console.log('-----data data-----', data.type, data);
    if (type.includes('application/json')) { // 接口返回不是二进制
      return blobToText(data);
    }
    const blob = new Blob([data], { type: 'application/vnd.ms-excel;charset=UTF-8' });
    if (window.navigator.msSaveOrOpenBlob) { // IE
      navigator.msSaveBlob(blob, `${fileName}.xlsx`);
      return;
    }
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `${fileName}.xlsx`; // 下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  }).catch(err => {
    console.log(err);
    Message.error('下载失败!');
  });
}

function blobToText(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsText(blob);
    fileReader.onload = function(event) {
      try {
        const result = JSON.parse(event.target.result);
        console.log('-------result----------', result);
        reject(result);
      } catch (err) {
        reject(err);
      }
    };
  });
}
