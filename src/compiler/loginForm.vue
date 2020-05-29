<template>
<div>
  <div class="mask" v-if="show_form">
    <div class="form">
      <div class="form-header">
        <p>登录</p>
      </div>
      <div class="form-body">
        <span>用户名</span>
        <input type="text" v-model="userName" placeholder="user"/>
        <span>{{hint_userName}}</span><br>
        <span>邮箱</span>
        <input type="text" v-model="email" placeholder="user"/>
        <span>{{hint_email}}</span><br>
      </div>
      <div class="form-footer">
        <button :disabled="buttonDisable" @click="sub">确定</button>
        <button @click="cancel">取消</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'loginForm',
  data(){
    return {
      userName:null,
      email:null,
      hint_email:null,
      hint_userName:null,
    }
  },
  methods:{
    cancel(){
      this.$store.dispatch("change_form",false).then(res=>{
        console.log(this.$store.getters.is_show_form)
      })
    },
    registerFn(){
      let that = this
      this.$axios
      .post('http://127.0.0.1:3000/api/user/register',{
        userName:this.userName,
        password:this.email
      })
      .then(function(response){
        if(response.data.errCode==0){
          alert("注册成功")
          that.loginFn()
        }
      })
    },
    loginFn(){
      const that = this
      this.$axios
      .post('http://127.0.0.1:3000/api/user/login',{
        userName:this.userName,
        password:this.email
      })
      .then(function(response){
        console.log(response)
        const userInfo = response.data.data;
        that.$emit('func',userInfo)
        localStorage.setItem('userInfo',JSON.stringify(userInfo));
      })
    },
    sub(){
      this.cancel()
      this.registerFn()
    },
  },
  computed:{
    show_form(){
      return this.$store.getters.is_show_form
    },
    buttonDisable(){
      if((this.hint_email=="邮箱格式正确")&&(this.hint_userName == "可以使用此用户名")){
        return false
      }
      return true
    }
  },
  watch:{
    userName(){
      this.$axios
      .post('http://127.0.0.1:3000/api/user/isExist',{
        userName:this.userName,
      })
      .then(response => {
        if(response.data.errCode==0){
          this.hint_userName = "可以使用此用户名"
        }else{
          this.hint_userName = "用户名重复";
        }
      })
    },
    email(val){
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if(reg.test(val)){
        this.hint_email="邮箱格式正确";
      }else{
        this.hint_email="邮箱格式不正确";
      }
    },
  },
}
</script>
<style>

</style>