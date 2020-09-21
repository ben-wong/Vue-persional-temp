import axios from 'axios';
import store from '@/store';
// import qs from 'qs';
import { Message, Loading } from 'element-ui';
import { ResError } from './error';
import { csrfTokenUrl } from 'api/url';
import { checkStatus } from './checkStatus';
let loadingInstance = Loading.service;
const isMock = process.env.VUE_APP_USE_MOCK;

const service = axios.create({
  timeout: 10000,
  withCredentials: true,
  params: {},
  data: {},
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'x-agap-app-name': 'agapReport'
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
    return true;
  }
});

const axiosAllStatus = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'x-agap-app-name': 'agapReport'
  },
  timeout: 10000,
  withCredentials: true,
  validateStatus: function(status) {
    return true;
  }
});

// http response 拦截器
axiosAllStatus.interceptors.response.use(
  response => {
    const result = checkStatus(response);
    if (response.status === 200) {
      return result;
    }
    throw new ResError(result);
  },
  err => {
    console.log('--response-err-axiosAllStatus--', err);
    if (!err.status) { // 网络异常
      throw new Error(err);
    }
    const res = checkStatus(err);
    throw new ResError(res);
  }
);

function getConfig(config) {
  if (!store.state.csrfToken._token || store.state.csrfToken._expiration < new Date().getTime()) {
    store.state.csrfToken._getTokening = true;
    return axiosAllStatus.get(csrfTokenUrl).then(response1 => {
      let response = isMock ? response1.data : response1;
      store.state.csrfToken._token = response.csrfToken;
      store.state.csrfToken._expiration = Date.now() + 60000; // 60秒csrfToken过期
      config.headers['x-agap-csrf-token'] = store.state.csrfToken._token;
      store.state.csrfToken._getTokening = false;
      return config;
    }).catch((error) => {
      store.state.csrfToken._getTokening = false;
      throw new ResError(error);
    });
  } else {
    config.headers['x-agap-csrf-token'] = store.state.csrfToken._token;
    return config;
  }
}

// http request 拦截器
service.interceptors.request.use(
  config => {
    store.state.loading = true;

    if (config.url === csrfTokenUrl) {
      return config;
    }
    // 使用_getTokening 参数，判断0.1秒并发请求只请求1次
    if (store.state.csrfToken._getTokening) {
      return new Promise((resolve, reject) => {
        let waitingToken = setInterval(() => {
          if (!store.state.csrfToken._getTokening) {
            clearInterval(waitingToken);
            resolve(getConfig(config));
          }
        }, 100);
      });
    } else {
      return getConfig(config);
    }
  },
  err => {
    console.log('--request-err--', err);
    return Promise.reject(err);
  }
);

// http response 拦截器
service.interceptors.response.use(
  response => {
    store.state.loading = false;
    const result = checkStatus(response);
    if (response.status === 200 || response.status === 204 || response.status === 202) {
      return result;
    }
    throw new ResError(result);
  },
  err => {
    console.log('--response-err--', err);
    if (!err.status) { // 网络异常
      throw new Error(err);
    }
    const res = checkStatus(err);
    throw new ResError(res);
  }
);

function apiAxios(url = '', { data = {}, method = 'GET', isLoading = false, isAlert = true, isDW = false } = {}) {
  if (!url) {
    throw new Error('请求url不能为空!');
  }
  isLoading && loadingInstance({ fullscreen: true });
  const options = {
    url,
    method,
    data,
    params: method === 'GET' ? data : ''
  };
  if (isDW) {
    options.responseType = 'blob';
  }
  return service(options).then(res1 => {
    isLoading && loadingInstance().close();
    // 使用mock数据，res结构需要带data;使用prod数据，res结构不需要带data
    let res = isMock ? res1.data : res1;
    store.state.isAuth = true;
    return Promise.resolve(res);
  }).catch(err => {
    const status = err.status || 1000;
    isLoading && loadingInstance().close();
    if (err && err.message && isAlert && status !== 404 && status !== 405) {
      Message({
        message: err.message,
        type: 'error',
        customClass: 'zindexClass'
      });
    }
    throw new Error(err);
  });
}

function get(url, data, isLoading, isAlert) {
  return apiAxios(url, { method: 'GET', data, isLoading, isAlert });
};

function post(url, data, isLoading, isAlert) {
  return apiAxios(url, { method: 'POST', data, isLoading, isAlert });
};

function put(url, data, isLoading, isAlert) {
  return apiAxios(url, { method: 'PUT', data, isLoading, isAlert });
};

function del(url, data, isLoading, isAlert) {
  return apiAxios(url, { method: 'DELETE', data, isLoading, isAlert });
};

function download(url, data, isLoading, isAlert, isDW) {
  return apiAxios(url, { method: 'POST', data, isLoading, isAlert, isDW });
};
export default {
  get,
  post,
  put,
  del,
  download
};

// 使用方法：this.$requestApi.post('xxx.url', data, false).then(res => xxx);
