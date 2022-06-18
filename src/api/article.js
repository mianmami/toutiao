import {request} from './request'


// 获取文章列表
/*
有个response_type 
  如果什么也不传入，获取内容管理的数据
  如果传入comment， 返回用于评论管理的字段
  如果传入statistic，返回用于图文数据的字段




  status: 文章状态
  channel_id: 频道
  page: 页数
  per_page: 每页条数
  response_type: 
  begin_pubdate
  end_pubdate
*/
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

/* 
发布文章
- query
  -- draft: true/false    true为草稿
- body
  -- title： 标题
  -- content  ： 内容
  -- cover  ： 封面
    --- type: 0无图 1-1图 3-3图 -1自动
    --- images: []
  channel_id: 发布文章的频道
*/
export function addArticle (data, draft = false) {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    data,
    params: {
      draft
    }
  })
}


// 获得文章内容
export function getArticle(target){
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${target}`,
  })
}

// 修改文章内容
export function updateArticle (target, data, draft = false) {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${target}`,
    data,
    params: {
      draft
    }
  })
}

// 修改文章评论状态
/* 
  query参数为文章的ID
  body参数为是否允许评论(true/false)
*/
export function updateArticleComments(articleId, status){
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params:{
      article_id: articleId,
    },
    data: {
      allow_comment: status
    }
  })
}