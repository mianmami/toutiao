import {request} from './request'


// 获取文章列表
export function getArticleList(params){
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

// 获得文章频道
export function getArticleChannel(){
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
export function deleteArticle(target){
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${target}`
  })
}