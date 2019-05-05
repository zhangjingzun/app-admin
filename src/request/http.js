import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.timeout = 8000
let baseApiUrl = '/api'
axios.defaults.baseURL = baseApiUrl

// 设置默认请求头
// axios.defaults.headers = {
//   'Authorization': 'ohmca0mXwTRK7wk3P7YjJHI1df-g'
// }

let cancel = {}
let promiseArr = {}
const CancelToken = axios.CancelToken

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
      // promiseArr[config.url]('操作取消')
      promiseArr[config.url] = cancel
    } else {
      promiseArr[config.url] = cancel
    }
    // token
    // const token = store.state.user.token
    // if (token) {
    //   config.headers.Authorization = token
    // }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
/* axios.interceptors.response.use(
  response => {
    response = response.data
    if (response.code === 403) {
      // 只有在当前路由不是登录页面才跳转
      console.log('登录拦截')
    } else {
      return response
    }
  },
  error => {
    // alert(JSON.stringify(error.response.status))
    if (error.response) {
      switch (error.response.status) {
        case 403:
          // 403 清除token信息并跳转到登录页面
          // 只有在当前路由不是登录页面才跳转
          console.log('登录拦截')
          break
        default:
      }
    }
    // return Promise.reject(error)
  }
) */

export default {
  // get请求
  get (url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        if (res.status === 200) {
          resolve(res.data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // post请求
  post (url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        }),
        validateStatus: function (status) {
          return status
        }
      }).then(res => {
        if (res.status === 200) {
          resolve(res.data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}
