require('@babel/polyfill')
require('./index.css')
import Vue from 'vue'
import router from "./router/routes.js"
import App from './App.vue'
import store from './store/index'
//axios
import axios from "axios";
Vue.prototype.$axios = axios;
console.log(123)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')