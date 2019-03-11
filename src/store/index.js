import Vue from 'vue'
import Vuex from 'vuex'

import indexModule from './index/index'
import detailModule from './detail/index'

Vue.use(Vuex)

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    index: indexModule,
    detail: detailModule
  }
})
