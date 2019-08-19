import axios from 'axios';
import {Message, MessageBox, Loading} from 'element-ui';
import {getAuth, removeAuth} from '@/utils/auth';

axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.timeout = 20000;
// 允许携带cookie
axios.defaults.withCredentials = true;

const service = axios.create({
  baseURL: '/api',
  timeout: 20000
})

//http request 拦截器
service.interceptors.request.use(
  config => {
    config.loadingInstance = Loading.service({
      fullscreen: false,
      lock: false,
      text: '正在拼命加载中',
      spinner: 'el-icon-loading'
    });
    let token = getAuth();
    let headerObj;
    if (config.method === "post") {
      headerObj = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8'
      };
    } else if (config.method === "get") {
      headerObj = {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
    if (token) {
      Object.assign(headerObj, {
        'Jwt-Authorization': token
      })
    }

    config.headers = headerObj;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加一个响应拦截器
service.interceptors.response.use(function (response) {
  // Do something with response data
  response.config.loadingInstance.close();
  if (response.data.errcode !== 0) {
    // 401:未登录用户; 402:登陆信息已过期;
    if (response.data.errcode === 401 || response.data.errcode === 402) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeAuth()
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
    return Promise.reject(response);
  }
  return response;
}, function (error) {
  // Do something with response error
  error.config.loadingInstance.close();
  if (error.message === 'Network Error' && error.config.url.endsWith('/license')) {
    Message({
      message: '无法连接到本地代理程序，请确认代理程序是否运行正常！',
      type: 'error',
      duration: 5 * 1000
    })
  } else {
    Message({
      message: error.message + ' ' + error.config.url,
      type: 'error',
      duration: 5 * 1000
    })
  }
  return Promise.reject(error);
});

// get请求
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

// post请求
export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
export default service





