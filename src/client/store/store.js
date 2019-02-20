import Vue from 'vue'
import Vuex from 'vuex'

import article from './article'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    /**
     * @type {Boolean}
     */
    loading: true
  },
  mutations: {
    /**
     * 设置loading状态
     * @param {*} state
     * @param {Boolean} flag
     */
    toggleLoading (state, flag) {
      state.loading = flag
    }
  },
  actions: {
    /**
     * 设置loading状态
     * @param {*} {commit}
     * @param {Boolean} flag
     */
    toggleLoading ({commit}, flag) {
      commit('toggleLoading', flag)
    }
  },
  modules: {
    article
  }
})
export default store
