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
