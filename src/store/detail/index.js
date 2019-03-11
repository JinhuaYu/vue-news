import {request} from '@/utils/request'
import cache from '@/utils/cache'
export default {
  namespaced: true,
  state: {
    historeArticle: [], // 历史文章
    location: {} // 储存页面滚动位置
  },
  getters: {

  },
  mutations: {
    set_historyArticle (state, val) {
      state.historeArticle = val
      cache.setSission('history_Article', val)
    },
    set_location (state, val) {
      state.location = val
    }
  },
  actions: {
    async get_Article_data ({commit, state}, {id, datafrom}) {
      let params = {
        'id': id,
        'datafrom': datafrom
      }
      let res = await request('post', 'Article', params)
      return res
    }
  }
}
