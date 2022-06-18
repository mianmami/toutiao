import { request } from './request'

/* 
  上传图片接口
  一般来说：文件上传的接口都需要把headers中的content-type设置为“multipart/form-data”
  但是用axios上传文件的话不需要手动设置，只用给data一个formData对象即可

  富文本编辑器如果要上传内容的话，不能每次都把图片编码为base64格式进行上传，这样每次下载的内容都很大
  需要先把图片发送给服务器保存，然后返回给客户端一个url地址。通过url地址发送请求的方式获得图片。
*/
export function uploadImage(data) {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })


}

// 获取图片素材

export function getImage(params) {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}


// 收藏和取消收藏
export function collectImages(imageId, collect) {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imageId}`,
    data: {
      collect
    }
  })
}


// 删除图片
export function deleteImage(imageId) {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imageId}`,
})
}
