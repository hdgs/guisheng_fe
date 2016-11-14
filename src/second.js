import Vue from 'vue'
import Second from './components/second/second'
import vueFinger from 'vue-finger'

Vue.use(vueFinger)

new Vue({
  el: '#app1',
  render: h => h(Second)
})
