import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state:{
      is_login:false,
      is_show_form:false,
    },
    mutations: {
      change_form(state,payload){
        state.is_show_form=payload
      }
    },
    actions: {
        change_form({commit},value){
            return new Promise((res,rej)=>{
                commit('change_form',value);
                res();
            })   
        }
    },
    getters:{
        is_login:state=>state.is_login,
        is_show_form:state=>state.is_show_form,
    },
  })