import Vue from 'vue'
import VueRouter from 'vue-router';
import HelloWorld from '../compiler/helloworld.vue'
Vue.use(VueRouter);
const routes=[
    {
        path:"/",
        name:"HelloWorld",
        component: HelloWorld
    }
]
export default new VueRouter({routes})