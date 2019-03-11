import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://data.toutiaojk.com/extend/list/' // `baseURL`将被添加到`url`前面，除非`url`是绝对的。

const ajaxURL = {
  // 首页
  classID: 'appclassid.php', // 栏目
  Class: 'appclass.php', // 栏目的文章列表
  Stick: 'appistop.php', // 栏目置顶
  // 详情页
  Article: 'apparticle.php', // 文章详情
  Recommend: 'apptuijian.php', // 文章推荐
  // 搜索页
  Search: 'search.php' // 搜索
}

export var request = async (type = 'POST', url = '', data = {}) => {
  let result
  type = type.toUpperCase() // 传入的type转换为大写
  url = ajaxURL[url] // 在ajaxURL对象中找到对应的url
  if (type === 'GET') {
    await axios.get(url, {params: data}) // axios get
      .then(res => {
        result = res.data
      })
  } else if (type === 'POST') {
    await axios.post(url, qs.stringify(data)) // axios post qs.stringify 将对象转为url参数形式
      .then(res => {
        result = res.data
      })
  }
  return result
}
