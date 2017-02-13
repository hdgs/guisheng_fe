import Vue from 'vue'
import Picture from './components/pictures/pictures'
import vueFinger from 'vue-finger'


Vue.use(vueFinger)

new Vue({
    el: '#app2',
    render: h => h(Picture)
})
