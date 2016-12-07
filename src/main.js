import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/main/main'
import List from './components/main/list'

Vue.use(VueRouter)
const Index = Vue.extend({
	name:"Index",
  	mixins: [List]
})
const Pics = Vue.extend({
	name:"Pics",
  	mixins: [List]
})
const News = Vue.extend({
	name:"News",
  	mixins: [List]
})
const Article = Vue.extend({
	name:"Article",
  	mixins: [List]
})
const Interaction = Vue.extend({
	name:"Interaction",
  	mixins: [List]
})
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Index },
    { path: '/pics', component: Pics },
    { path:'/news',component: News},
    { path:'/article',component: Article},
    { path:'/interaction',component:Interaction}
  ]
})

App.el = "#app"
App.router = router
const app = new Vue(App)

router.beforeEach((to, from, next) => {
  if(to.path === '/'){
  	app.onShow = true
  }else{
  	app.onShow = false
  }
  next()
})
