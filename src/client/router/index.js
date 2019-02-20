import Vue from 'vue'
import Router from 'vue-router'

// 导入相应的子组件
import HomePage from '../views/home.page'
import ArticlePage from '../views/article.page'
const AdminPage = r => require.ensure([], () => r(require('../views/admin.page')), 'vehicles')

Vue.use(Router)

var router = new Router({
  routes: [
    { name: 'home', path: '/', component: HomePage },
    { name: 'article', path: '/article/:id', component: ArticlePage },
    { name: 'admin', path: '/admin-by-zmj', component: AdminPage }
  ]
})

export default router
