import { wiseoperMenu } from 'api/url';
import axios from 'axios';
// import store from 'store';

// const isMock = process.env.VUE_APP_USE_MOCK;

export const getCookie = (cookieName) => { // 无法获取woAuth cookie，设置了httponly，只能服务器端能读取。js无法读
  let strCookie = document.cookie;
  let arrCookie = strCookie.split('; ');
  for (let i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split('=');
    if (cookieName === arr[0]) {
      return arr[1];
    }
  }
  return '';
};

let service = axios.create({
  timeout: 10000,
  withCredentials: true,
  params: {},
  data: {},
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'appID': process.env.VUE_APP_OAUTH_APP_ID,
    'secrectKey': process.env.VUE_APP_OAUTH_APP_SECRET,
    // 'token': atob(getCookie('woAuth')) // base64 decode
    // 'token': atob('MEFFOTUxRTZDRTJDMTlCMUYxMTc3NERCOUMwOUQ1RDE6QjVCMEYzMUU0NERCRjQzNjQzMjBGNEJFNzU5MjY4OUIxNjYyREQyMzkwNTZBNUFBNzM0MTE2MzUyMzY5ODlDNUQ4RUEwM0I5Qjg5RjM4OTFFNzBGMUU1MEE1RUJBNjU3RDYwMUFEOUIwQjMyMEJBN0QzQTI2NjQwODhBN0FEMDI=')
  },
  transformRequest: [function(data) {
    return JSON.stringify(data);
  }],
  transformResponse: [function(data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      return data;
    }
  }],
  validateStatus: function(status) {
    return status >= 200 && status < 300; // 拦截接口状态码，true: resolve, false: reject
  }
});

let queryParams = {
  appId: process.env.VUE_APP_OAUTH_APP_ID
};

export function getWiseoperMenu() {
  return service.post(wiseoperMenu, queryParams);
}
