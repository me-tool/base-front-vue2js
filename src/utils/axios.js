import axios from 'axios';
import { useDebounceFn } from '@vueuse/core';
import { Message, Loading } from 'element-ui';

//
const instance = axios.create({
  timeout: 15000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});
/**
 * 这里是限制后端返回结构必须为
 * {
 *   [msg,desc,message]: string,
 *   code: number,
 *   data: any
 * }
 */
const CODE_MSGS = {
  400: '错误请求',
  401: '权限错误',
  404: '资源未找到',
  500: '系统错误',
};

instance.interceptors.response.use(
  (res) => {
    const { data } = res;
    if (res.status === 200) {
      return data;
    }

    // error 这里默认不会被触发，主要是用于返回 200 但是业务逻辑出现错误
    const error = new Error(data.msg || '获取数据出错');
    error.errorCode = res.status;
    Message.error(error.message);
    return Promise.reject(error);
  },
  (error) => {
    // loadingInstance.close();

    const is401 = error.response && error.response.status === 401;
    if (!is401) {
      const message = error.response && error.response.data && error.response.data.msg;
      Message({
        message: message || '接口返回错误，请稍后再试！',
        type: 'error',
        duration: 1500,
      });
    }

    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          // window.location.href = '/401';
          console.log(data);
          location.href = data.url;
          break;
        case 403:
          if (!isMicro && process.env.NODE_ENV !== 'development') {
            window.location.href = `${publicPath}_baseAPI/account/login`;
          } else {
            window.eventCenter && window.eventCenter.emit('SYSTEM_USER_INVALID');
          }
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  },
);

class AxiosInstanceClass {
  constructor(options = { baseURL: `/${process.env.VUE_APP_NAME}/_baseAPI/` }) {
    this.instanceOptions = options;
  }

  /**
   * 实际请求
   */
  request(config) {
    let { url, options } = config;
    if (!url) {
      const error = new Error('请传入 url');
      return Promise.reject(error);
    }
    Object.entries(options.pathParams || {}).forEach(([k, v]) => {
      url = url.replace(`:${k}`, encodeURIComponent(v));
      // url = url.replace(`:${k}`, k);
    });
    return instance({ url, ...this.instanceOptions, ...options });
  }

  // restful，主要是为了简化请求参数拼接，且帮助确认是 data 或者是 prams
  get(url, params, options = {}) {
    return this.request({ url, options: { params, method: 'get', ...options } });
  }
  post(url, data, options = {}) {
    return this.request({ url, options: { data, method: 'post', ...options } });
  }
  put(url, data, options = {}) {
    return this.request({ url, options: { data, method: 'put', ...options } });
  }
  delete(url, data, options = {}) {
    return this.request({ url, options: { data, method: 'delete', ...options } });
  }
}
export default AxiosInstanceClass;
