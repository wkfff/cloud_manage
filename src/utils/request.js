/**
 * Created by Daniel on 16/11/18.
 */

/* eslint-disable vue/script-indent*/
import axios from 'axios'
import { Message } from 'element-ui'
// import store from '../store'
import { getToken } from '@/utils/auth'
import { Cache } from '@/utils'
import router from '@/router/index'

const cache = new Cache()
// 创建axios实例
const service = axios.create({
  baseURL: '/api/v3', // api 的 base_url
  timeout: 600000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // 上传类型请求头设置
    const data = config.data
    if (config.method === 'UPLOAD' || config.method === 'upload') {
      config['body'] = data
      config['method'] = 'POST'
      config['headers']['Accept'] = '*/*'
      config['headers']['x-provider'] = 'set'
      delete config['headers']['Content-Type']
      config['headers']['Content-Type'] = 'multipart/form-data'
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非0是抛错 可结合自己业务进行修改
     */
    const res = response.data

    if (res.code !== 0) {
      let errorMessage = ''
      switch (res.code) {
        case 405:
          errorMessage = '请求方法错误'
          break
        default:
          errorMessage = res.msg
          break
      }
      Message({
        message: errorMessage,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res || 'error')
    } else {
      return res
    }
  },
  error => {
    /**
     * 判断HTTP请求状态码
     */
    let errorMessage = ''
    const message = error.response && error.response.data && error.response.data.msg
    switch (error.response.status) {
      case 401:
        // 生产环境 单点登录往招行环境跳转，不会判断从哪登录的
        if (process.env.NODE_ENV === 'production') {
          // 第一种情况跳到SSO
          router.push('/login')
        } else if (cache.get('direction') === 'sso') {
          // 第一种情况跳到SSO
          router.push('/login')
        } else if (cache.get('direction') === 'cloud') {
          // 第二种情况跳到cloud
          router.push('/login?local=1')
        } else {
          // 是否有第三种情况，暂时跳到cloud
          router.push('/login?local=1')
        }
        // 清除本地存储并返回登录页
        cache.flush()
        break
      default:
        errorMessage = message || '网络繁忙，请稍后...'
        Message({
          message: errorMessage,
          type: 'error',
          duration: 5 * 1000
        })
        break
    }
    return Promise.reject(error)
  }
)

export default service
