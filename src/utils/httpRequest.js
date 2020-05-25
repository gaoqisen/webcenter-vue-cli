import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) { // 401, token失效
    router.push({ name: 'login' })
  }
  return response
}, error => {
  return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  var address = '/' + process.env.contextPath
  if (process.env.NODE_ENV === 'production' || !process.env.OPEN_PROXY) {
    address = window.location.href.split("/").slice("0","3").join("/")
  }
  return  address + actionName
}

/**
 * get请求参数处理
 */
http.adornParams = (params = {}) => {
  return params
}

/**
 * post请求数据处理
 */
http.adornData = (data = {}, contentType = 'json') => {
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http
