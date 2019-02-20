import axios from 'axios'
export default{
  namespaced: true,
  state: {
    articles: [],
    item: {}
  },
  mutations: {
    setArticles (state, list) {
      state.articles = list
    }
  },
  actions: {
    getArticles ({commit}) {
      return axios.get('/article/list').then(({data}) => {
        commit('setArticles', data.data)
        return data.data
      })
    },
    setArticle ({dispatch}, data) {
      return axios.post('/article/add', data)
    },
    getArticle ({state, commit, dispatch}, id) {
      return axios.get('/article/get', {
        params: {id}
      })
    }
  }
}
