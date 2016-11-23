import Vue from 'vue'
import Picture from './components/pictures/pictures'
import vueFinger from 'vue-finger'


Vue.use(vueFinger)

// Vue.directive('dbclick', {
//    bind: function (el, binding, vnode) {
//    	console.log("initial value", binding.value)
//    	el.addEventListener("dblclick",binding.value)
//   }

// })

new Vue({
  el: '#app2',
  render: h => h(Picture)
})
