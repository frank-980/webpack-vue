<template>
<div>
  <div class="mask" v-if="show_form">
    <div class="form">
      <div class="form-header">
        <p>登录</p>
      </div>
      <div class="form-body">
        <div v-for="(item,index) in hint" :key="index">
          <span>{{item.span}}</span>
          <input type="text" v-model="item.name" :placeholder="item.placeholder"/>
          <span>{{item.text}}</span><br>
        </div>
        
      </div>
      <div class="form-footer">
        <!--<button :disabled="buttonDisable" @click="sub">确定</button>-->
        <button @click="sub">确定</button>
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
      hint:[
        {
          span:'用户名',
          name:'',
          value:null,
          placeholder:"点击输入用户名",
          text:null,
          pass:false
        },
        {
          span:'邮箱',
          name:'',
          value:null,
          placeholder:"点击输入邮箱",
          text:null,
          pass:false
        },
      ],
    }
  },
  methods:{
    cancel(){
      this.$store.dispatch("change_form",false).then(res=>{
      })
    },
    initForm(){
      this.hint[0].name='';
      this.hint[0].text=null;
      this.hint[0].pass=false;
      this.hint[1].name='';
      this.hint[1].text=null;
      this.hint[1].pass=false;
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
          console.log("注册成功")
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
        if(response.data.errCode==0){
          that.initForm()
          that.cancel()
          console.log("登录成功")
          const userInfo = response.data.data;
          that.$emit('func',userInfo)
          localStorage.setItem('userInfo',JSON.stringify(userInfo));
        }else{
          alert("邮箱验证失败")
        }
      })
    },
    
    sub(){
      if(this.hint[0].pass && this.hint[1].pass){
        this.registerFn()
        return;
      }
      if(!this.hint[0].pass && this.hint[1].pass){
        this.loginFn()
        return;
      }
    },
  },
  computed:{
    show_form(){
      return this.$store.getters.is_show_form
    },
    userName() {
　　　　return this.hint[0].name
　　},
    email() {
　　　　return this.hint[1].name
　　}
  },
  watch:{
    userName(newValue,oldValue) {
      this.$axios
      .post('http://127.0.0.1:3000/api/user/isExist',{
        userName:newValue,
      })
      .then(response => {
        if(response.data.errCode==0){
          this.hint[0].text = "可以使用此用户名";
          this.hint[0].pass = true
        }else{
          this.hint[0].text = "有此用户名，请输入验证邮箱";
          this.hint[0].pass = false
        }
      })
　　},
    email(newValue,oldValue) {
　　　　 var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if(reg.test(newValue)){
        this.hint[1].text="邮箱格式正确";
        this.hint[1].pass = true
      }else{
        this.hint[1].text="邮箱格式不正确";
        this.hint[1].pass = false
      }
　　},
  },
}
</script>
<style>

</style>