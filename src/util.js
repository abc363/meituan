import axios from 'axios';
import { TimeSelect } from 'element-ui';
// 设置请求超时时间和域名  创建axios实例
const instance = axios.create({
  // baseURL: 'http://backend.windiiot.com/',
  baseURL: 'http://120.55.95.122:8080/',
  timeout: 15000
})

//  http request 拦截器
instance.interceptors.request.use(
  config => {
    config.headers = {
      // 'Content-Type': 'application/x-www-form-urlencoded'
      'Content-Type': 'application/json',
      'xhrFields':{
        'withCredentials':true,
      }
  
    }
    return config
  }, err => {
    return Promise.reject(err)
  }
)

//  响应拦截器即异常处理
instance.interceptors.response.use(response => {
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        this.$error('错误请求')
        console.log('错误请求')
        break
      case 401:
        this.$error('未授权，请重新登录')
        console.log('未授权，请重新登录')
        break
      case 403:
        this.$error('拒绝访问')
        console.log('拒绝访问')
        break
      case 404:
        console.log('请求错误,未找到该资源')
        this.$error('请求错误,未找到该资源')
        break
      case 405:
        this.$error('请求方法未允许')
        console.log('请求方法未允许')
        break
      case 408:
        this.$error('请求超时')
        console.log('请求超时')
        break
      case 500:
        this.$error('服务器端出错')
        console.log('服务器端出错')
        break
      case 501:
        this.$error('网络未实现')
        console.log('网络未实现')
        break
      case 502:
        this.$error('网络错误')
        console.log('网络错误')
        break
      case 503:
        this.$error('服务不可用')
        console.log('服务不可用')
        break
      case 504:
        this.$error('网络超时')
        console.log('网络超时')
        break
      case 505:
        this.$error('http版本不支持该请求')
        console.log('http版本不支持该请求')
        break
      case 518:
        this.$error('因为您长时间没有操作，您的登录信息已过期，请重新登录')
        console.log('因为您长时间没有操作，您的登录信息已过期，请重新登录')
        window.sessionStorage.clear();
        location.href="./index.html";
        break
      default:
        this.$error(`连接错误${err.response.status}`)
        console.log(`连接错误${err.response.status}`)
    }
  } else {
    this.$error('连接到服务器失败')
    console.log('连接到服务器失败')
  }
  return Promise.resolve(err.response)
})

 export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    instance.get(url, {
      params: params
    }).then(response => {
      if(response.data.state === 200){
        resolve(response.data.data)
      }else{
       this.$error(response.data.message);
      }
      }).catch(err => {
        reject(err)
      })
  })

}

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data)
      .then(response => {
          if(response.data.state === 200){
            resolve(response.data)
          }else{
           this.$error(response.data.message);
          }
      }, err => {
        reject(err)
      })
  })
}

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })

}

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

export function del(url,params){
  return new Promise((resolve,reject)=>{
    instance.delete(url,params).then(response=>{  //这里传递的参数不做处理
             resolve(response.data);
       },err=>{
             reject(err);
       }).catch((error)=>{
             reject(error);
       })
  })
}

