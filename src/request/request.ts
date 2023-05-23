import axios from 'axios';
import { message as $message } from 'antd';
import { REQUEST_BASE_URL } from '@/config';
import { getJSONStorage } from '@/store/store';
export interface IResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
}
export const request = axios.create({
  baseURL: REQUEST_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
request.interceptors.request.use(
  function (config) {
    // TODO
    const { token } = getJSONStorage().state;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);
request.interceptors.response.use(
  // 只有http状态码为200
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 400) {
      const message = error.response.data.message;
      $message.open({ type: 'error', content: message });
    }
    // 401 认证失败
    if (error.response && error.response.status === 401) {
      // TODO
      window.location.href = '/login';
    }
    // ?这里抛出错误，就不会进入业务代码了
    return Promise.reject(error);
  },
);
