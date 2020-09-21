export function checkStatus(response) {
  const status = response.status;
  console.log('----response-response-------', response);
  if (status === 200) {
    // 如果http状态码正常，则直接返回数据
    return response;
  } else {
    const data = response.data;
    const code = data.code || '';
    const name = `${status} Error`;
    let msg = data.msg || data.message || '';
    let errorInfo = `${code} ${msg}`;
    switch (status) { // 特殊处理204,401,404,405，XHR不会有response返回；(HTTP协议限制)
      case 401:
        const url = process.env.VUE_APP_WO_BASE_URL + '/?redirect=' + encodeURIComponent(location.href);
        location.replace(url);
        break;
      case 403:
        if (code === '0x541f0200') { // 拒绝访问
          msg = '拒绝访问';
        }
        if (code === '0x541f0201') {
          location.reload(); // csrf错误导致此报错
        }
        break;
      case 490:
        break;
      default:
        break;
    }
    errorInfo = `${code} ${msg}`;
    return {
      data,
      code,
      name,
      status,
      msg: errorInfo,
    };
  }
};
