import axios from 'axios'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  timeout: '5000',
  transformResponse: [function (data) {
    // 这个AIP专门用来处理服务器返回的原始字符串数据。
    // 如果是json格式字符串，那就用Json-bigint处理，如果是普通字符串就把原来的结果原封不动地返回
    try{
      return JSONbig.parse(data);
    }catch(err){
      return data
    }
  }],
})

request.interceptors.request.use(
  function(config){
    // 所有的请求都会经过这个请求拦截器，所以给每一次的请求(除了登录)都加上token消息，简化了其他请求的代码(都不用加上headers)
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      config.headers.Authorization = "Bearer " + user.token
    }
    // 只有加了下面这句话，请求才会发出去(有点中间件的意思！！！！)
    return config
  },
  function(error){
    return Promise.reject(error)
  }
)

export { request }




















/* 

通过axios.create创建的实例的功能和axios的一样。建议用这种方法。
因为当请求的baseurl不同的时候，可以独立使用。

const req1 = axios.create({
  basrURL: 'http://127.0.0.1:3000'
})

const req2 = axios.create({
  baseURL: 'http://127.0.0.1:4000'
})

req1.get()
rer2.get()

*/