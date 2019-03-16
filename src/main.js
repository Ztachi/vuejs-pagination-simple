import Vue from 'vue'
import App from './App.vue'
import pagination from './index';

Vue.use(pagination);
new Vue({
  el: '#app',
  render: h => h(App)
})
