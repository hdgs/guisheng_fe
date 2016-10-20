import Vue from 'vue'
import App from './componnents/app';
import essay from './componnents/essay';

new Vue({
  el: '#app1',
  render: h => h(essay)
})
new Vue({
  el: '#app2',
  render: h => h(App)
})
