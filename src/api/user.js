import {request} from './request.js'


export function login (data) {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}


export function getUserProfile(){
  return request({
    method: 'get',
    url: '/mp/v1_0/user/profile',

    // 获取用户验证信息的时候，需要在请求头中添加token值, 已经在拦截器中统一添加
    // headers:{
    //   Authorization: "Bearer " + JSON.parse(localStorage.getItem('user')).token
    // }
  })
}

// 更新用户头像
export function updateUserPhoto(data) {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}


// 更新用户的基本信息
// 需要 name, intro, email
export function updateUserProfile(data){
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}