import { request } from '@/utils/request'
import cache from '@/utils/cache'

export default {
  namespaced: true,
  state: {
    indexActive: 'news_recommend', // 当前active的栏目
    indexPage: { news_recommend: 1 }, // 各个栏目page的对象
    indexLocation: { news_recommend: 0 }, // 各个栏目location的对象
    // 栏目数据
    indexColumn: [{
      classid: 0,
      classname: '推荐',
      classpath: 'news_recommend'
    }],
    currentContent: '', // 当前栏目的缓存数据,为了刷新时不用再次请求
    indexSwiper: false // 当前swiper状态
  },
  getters: {
    // activeMeta: 当前栏目的 classid， index
    activeMeta: state => {
      let index = state.indexColumn.findIndex(obj => obj.classpath === state.indexActive) // 返回当前index， 否则 -1
      let classid = state.indexColumn[index].classid
      let page = state.indexPage[state.indexActive]
      let location = state.indexLocation[state.indexActive]
      return { index, classid, page, location }
    }
  },
  mutations: {
    // 设置栏目数据
    set_indexColumn (state, data) {
      state.indexColumn = data
      cache.setSession('index_Column', data)
    },
    // 设置activeIndex
    set_indexActive (state, val) {
      state.indexActive = val
      cache.setSession('index_Active', val)
    },
    // 设置indexPage
    set_indexPage (state, obj) {
      state.indexPage = obj
      cache.setSession('index_Page', obj)
    },
    // 设置indexLocation
    set_indexLocation (state, obj) {
      state.indexLocation = obj
      cache.setSession('index_Location', obj)
    },
    // 设置栏目缓存数据
    set_currentContent (state, val) {
      state.currentContent = val
      cache.setSession(`${state.indexActive}_json`, val)
    },
    // swiper状态
    set_indexSwiper (state, val) {
      state.indexSwiper = val
    }
  },
  actions: {
    // 获取active栏目缓存
    get_indexActive_cache ({commit}) {
      const data = cache.getSession('index_Active')
      if (data) {
        commit('set_indexActive', data)
      } else {
        commit('set_indexActive', 'news_recommend')
      }
    },

    // 获取page缓存
    get_indexPage_cache ({commit}, indexColumn) {
      const data = JSON.parse(cache.getSession('index_Page'))
      if (data) {
        commit('set_indexPage', data)
      } else {
        if (indexColumn) {
          let pageObj = {}
          indexColumn.forEach(item => {
            pageObj[item.classpath] = 1
          })
          commit('set_indexPage', pageObj)
        }
      }
    },

    // 获取location缓存
    get_indexLocation_cache ({commit}, indexColumn) {
      const data = JSON.parse(cache.getSession('index_location'))
      if (data) {
        commit('set_indexLocation', data)
      } else {
        if (indexColumn) {
          let locationObj = {}
          indexColumn.forEach(item => {
            locationObj[item.classpath] = 0
          })
          commit('set_indexLocation', locationObj)
        }
      }
    },

    // 获取栏目的文章列表缓存数据
    get_ilistItem_cache ({state}) {
      let data = JSON.parse(cache.getSession(`${state.indexActive}_json`))
      return data
    },

    // 获取栏目数据
    async get_indexColumn_data ({state, commit, dispatch}) {
      let res
      const data = JSON.parse(cache.getSession('index_column'))
      if (data) {
        res = data
      } else {
        let json = await request('post', 'classID')
        res = [...state.indexColumn, ...json]
      }
      commit('set_indexColumn', res) // 调用设置栏目数据
      // 栏目数据是动态获取的，生成对应的page，location对象
      dispatch('get_indexPage_cache', res)
      dispatch('get_indexLocation_cache', res)
      dispatch('get_indexActive_cache') // 获取当前栏目
      return res
    },

    // 获取栏目的文章列表数据
    async get_listItem_data ({getters}, page) {
      let params = {
        'classid': getters.activeMeta.classid,
        'page': page
      }
      let res = await request('post', 'Class', params)
      return res
    },

    // 获取置顶数据
    async get_stick_data ({getters}) {
      let params = {
        'classid': getters.activeMeta.classid,
        'type': 'stick'
      }
      let res = await request('post', 'Stick', params)
      return res
    },

    // 获取置顶数据
    async get_banner_data ({getters}) {
      let params = {
        'classid': getters.activeMeta.classid,
        'type': 'banner'
      }
      let res = await request('post', 'Stick', params)
      return res
    }
  }
}
