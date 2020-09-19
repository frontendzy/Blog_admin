import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api',
  // baseURL:'http://blog.zyfullstack/admin/api'
})

// 请求头
http.interceptors.request.use(function (config) {
  if(localStorage.token){
  config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
http.interceptors.response.use(res => {
  return res
}, err => {
  if(err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    if(err.response.status === 401){;
      router.push('/login')
    }
  }
  return Promise.reject(err)
})

export default http
