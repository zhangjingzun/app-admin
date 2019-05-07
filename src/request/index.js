import http from './http'

export const apiGetBanner = function () {
  return http.get('/banner/get')
}

/**
 * 上传图片
 */
export const apiUploadFile = function (data) {
  return http.post('/banner/set', data)
}
/**
 * 删除图片
 */
export const apiDelFile = function (url) {
  return http.post('/banner/del', { url: url })
}

/**
 * 添加商品
 */
export const apiAddShop = function (data) {
  return http.post('/shop/add', data)
}
/**
 * 添加商品图片
 */
export const apiAddShopImg = function (data) {
  return http.post('/shop/addImg', data)
}
/**
 * 删除商品图片
 */
export const apiDelShopImg = function (url) {
  return http.post('/shop/delImg', { url: url })
}
/**
 * 获取商品
 */
export const apiGetShopImg = function () {
  return http.get('/shop/get')
}
/**
 * 获取单个商品详情
 */
export const apiGetShopDetail = function (id) {
  return http.post('/shop/getDetail', { id: id })
}
/**
 * 获取分类列表
 */
export const apiGetClassic = function () {
  return http.get('/classic/get')
}
/**
 * 添加分类
 */
export const apiAddClassic = function (name, id = null) {
  return http.post('/classic/add', { class_name: name, id: id })
}
/**
 * 删除分类
 */
export const apiDelClassic = function (id) {
  return http.post('/classic/del', { id: id })
}
/**
 * 公司信息
 */
export const apiUpdateInfo = function (data) {
  return http.post('/info/update', data)
}
/**
 * 获取公司信息
 */
export const apiGetInfo = function () {
  return http.get('/info/get')
}
/**
 * 上传关于我们图片
 */
export const apiUploadAboutBanner = function (data) {
  return http.post('/info/upload', data)
}
/**
 * 登录
 */
export const apiLogin = function (data) {
  return http.post('/user/login', data)
}
/**
 * 验证码
 */
// export const apiGetVerify = function (data) {
//   return http.get('/user/verify', data)
// }
