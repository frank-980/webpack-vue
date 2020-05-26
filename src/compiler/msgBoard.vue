<template>
<div>
   <div class="Bjq">
    <div class="editor_div">
     <div class="editor_toolbar">
      <div>
       <i class="iconfont icon-moon"></i>
       <span>先登录吧！</span> 
       <span @click="login" class="fr">登录</span>
      </div>
     </div>
     <div class="editor_textarea">
      <textarea class="ant-input"></textarea>
     </div>
    </div>
   </div>


  <loginForm></loginForm>

</div>
</template>
<script>
import loginForm from "./loginForm.vue"
export default {
  name: 'msgBoard',
  components:{
    loginForm
  },
  data(){
    return {
    }
  },
  methods:{
    login(){
      this.$store.dispatch("change_form",true).then(res=>{ 
        console.log("had changed")
      })
    },
    
  }
}
</script>