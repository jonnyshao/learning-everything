import axios from 'axios'
import store from '../store'
import {getLocal} from "./local";

class Request {
  constructor () {
    this.baseURL = process.env.NODE_ENV === 'porduction'? '/' : 'http://localhost:3000'
    this.timeout = 3000;
    // 当第一次请求 显示loading 其余的时候调用
    // 请求完成后 隐藏Loading
    this.queue = {}
  }
  merge (options) {
    return {...options, baseURL: this.baseURL, timeout: this.timeout}
  }
  setInterceptor (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(req => {
      req.headers.Authorization = getLocal('token');
      if (Object.keys(this.queue).length === 0) {
        store.commit('showLoading');
      }
      this.queue[url] = url;
      return req
    });
    // 响应拦截
    instance.interceptors.response.use(res => {
      delete this.queue[url]; // 每次请求完成后 都删除队列里的路径
      if (Object.keys(this.queue).length === 0) {
        store.commit('hideLoading');
      }
      return res.data
    })
  }
  request (options) {
    const instance = axios.create();
    this.setInterceptor(instance, options.url)
    return instance(this.merge(options))
  }
}

export default new Request
