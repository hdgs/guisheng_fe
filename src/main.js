import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './componnents/app'
import list from "./componnents/main/list"
Vue.use(VueRouter)

const News = Vue.extend({
	name:"NewsList",
  mixins: [list]
})
const Article = Vue.extend({
	name:"ArticleList",
  mixins: [list]
})
const Main = Vue.extend({
	name:"MainList",
  mixins: [list]
})

// 声明路由
const routes = [
  { path: '/', component: Main },
  { path: '/news', component: News },
  { path: '/article', component: Article }
]

// 初始化router
const router = new VueRouter({
	mode: 'history',
  routes 
})

new Vue({
	router,
	el: "#app",
	render: (h) => h(App)
})




