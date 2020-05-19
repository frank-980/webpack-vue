
require('@babel/polyfill')
require('./index.css')
import Vue from 'vue'
import router from "./router/routes.js"
import App from './App.vue'
console.log(123)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')