import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from './components/header'
import Profile from './components/profile/index'
Vue.use(VueRouter)

new Vue({
  el: '#head',
  router,
  render: h => h(Header)
})

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes:[
    { path:'/profile',component:Profile}
   ]
})
