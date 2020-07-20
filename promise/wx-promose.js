// 在小程序中使用promise 封装

export const wxPromise = function (method, options = {}) {
  return new Promise((resolve, reject) => {
    options['success'] = function (...args) {
      resolve(...args)
    }
    options['fail'] = function (...args) {
      reject(...args)
    }
    wx[method] && wx[method](options)
  })
}