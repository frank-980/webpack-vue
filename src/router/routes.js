import Vue from 'vue'
import VueRouter from 'vue-router';
import CV from '../compiler/CV.vue'
import msgBoard from '../compiler/msgBoard.vue'
Vue.use(VueRouter);
const routes=[
    {
        path:"/",
        name:"CV",
        component: CV
    },
    {
        path:"/cv",
        name:"CV",
        component: CV
    },
    {
        path:"/msgBoard",
        name:"msgBoard",
        component: msgBoard
    }
]
export default new VueRouter({routes})