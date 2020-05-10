// 接口基准地址
var urlBase = 'https://www.uinav.com'
export default function (Vue) {

  Vue.prototype.$request = async function (option) {
    // 加载提示
    uni.showLoading({
      title:'数据加载中...'
    })
    const { url } = option
    // 覆盖url
    option.url = urlBase + url
   const res = await uni.request(option)
   uni.hideLoading()
   return res[1].data.message
  }
}
