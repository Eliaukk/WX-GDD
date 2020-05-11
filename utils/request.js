
export default function (Vue) {
// 接口基准地址
var urlBase = 'https://www.uinav.com'
  Vue.prototype.$request = async function (option) {
    // 加载提示
    uni.showLoading({
      title:'数据加载中...'
    })
    
   const [err,res] = await uni.request({
     url: urlBase + option.url,
     data: option.data
   })


   uni.hideLoading()
   return res.data.message
  }
}
