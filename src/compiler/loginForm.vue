<template>
<div>
  <div class="mask" v-if="show_form" @click="cancel">
    <div class="form">
      <div class="form-header">
        <p>登录</p>
      </div>
      <div class="form-body">
        <span>用户名</span><input type="text" placeholder="user"/>
        <span>邮箱</span><input type="text" placeholder="user"/>
      </div>
      <div class="form-footer">
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
      
    }
  },
  methods:{
    cancel(){
      this.$store.dispatch("change_form",false).then(res=>{
        console.log(this.$store.getters.is_show_form)
      })
    },
    sub(){
      this.cancel()
      this.$axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        console.log(response)
      })
    },
    
  },
  computed:{
    show_form(){
      return this.$store.getters.is_show_form
    }
  }
}
</script>