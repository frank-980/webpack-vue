<style>
  .msgItem{
    border-bottom:1px solid #ccc;
  }
  .msgIndex{
    margin: 30px 0 0 0;
    font-size:14px
  }
  .msgRow{
    display: flex;
    align-items:center;
    padding:30px 0
  }
  .msgAvatar{
    
    width:50px;
    height:50px
  }
  .msgInfo{
    padding-left:12px;
  }
  .msgInfo p{
    margin:5px 0 5px 0px
  }
  .msgAuthor{
    font-size:12px;
    color: rgba(0,0,0,.45);
    display: inline;
  }
  .msgCreated{
    font-size: 12px;
    color:#ccc;
    margin-left:10px;
  }
  .msgDel{
    display: inline-block;
    color:red;
    padding-left:62px;
    margin:0 0 25px 0;
    cursor: pointer;
  }
  .loadMore{
    display: inline-block;
    border:1px solid #d9d9d9;
    margin-top:30px;
    text-align: center;
    padding:0 15px;
    font-size:14px;
    height:32px;
    line-height:32px;
    color:black;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
  }
  .loadMore:hover{
    border-color:#40a9ff;
    color:#40a9ff;
  }

</style>
<template>
<div>
   <div class="Bjq">
    <div class="editor_div">
     <div class="editor_toolbar">
      <div>
       <i class="iconfont icon-moon"></i>
       <span v-if="userInfo==null">先登录吧！</span> 
       <span v-if="userInfo!=null">请留言吧！{{userInfo.userName}}</span> 

       <span v-if="userInfo==null" @click="login" class="fr">登录</span>
       <span v-if="userInfo!=null" @click="logout" class="fr">退出</span>
      </div>
     </div>
     <div class="editor_textarea">
      <textarea v-model="content" class="ant-input"></textarea>
     </div>
    </div>
    <button v-if="userInfo!=null" @click="createMsg">确 认</button>
   </div>


  <loginForm @func="setUserInfo"></loginForm>
  <div class="msgItem" v-for="(item,index) in msgList" :key="index">
    <p class="msgIndex">{{msgLength-(index)}}楼</p>
    <div class="msgRow">
      <img class="msgAvatar" :src="item.picture" />
      <div class="msgInfo">
        <p class="msgAuthor">{{item.userName}}</p>
        <span class="msgCreated">{{item.createdAt}}</span>
        <p class="msgContent">{{item.content}}</p>
      </div>
    </div>
    <p class="msgDel" v-if="userInfo==null?false:item.userName==userInfo.userName" @click="deleteMsg(item.id)">删除</p>
  </div>
  <div style="text-align:center">
    <a class="loadMore" @click="loadMore" v-if="((currentIndex+1)*displayLength)<msgLength">加载更多</a>
  </div>
</div>
</template>

<script>
import loginForm from "./loginForm.vue"
export default {
  name: 'msgBoard',
  components:{
    loginForm,
  },
  data(){
    return {
      content:null,
      displayLength:5,//一页展示5条记录
      currentIndex:0,//当前页数
      msgLength:0,//总条数
      msgList:[],
      userInfo:null,
    }
  },
  created:function(){
    var data1 = JSON.parse(localStorage.getItem('userInfo'));
    if(data1){
      this.userInfo = data1
    }
    this.$axios
      .post('http://127.0.0.1:3000/api/blog/getList',{
        pageIndex:this.currentIndex
      })
      .then(response => {
        console.log(response.data)
        this.msgLength=response.data.data.count
        this.msgList = response.data.data.blogList
      })
  },
  methods:{
    setUserInfo(data){
      this.userInfo=data
    },
    login(){
      this.$store.dispatch("change_form",true).then(res=>{ 
        console.log("had changed")
      })
    },
    logout(){
      this.$axios
      .post('http://127.0.0.1:3000/api/user/logout',{
      })
      .then(response => {
        localStorage.removeItem("userInfo");
        this.userInfo=null
      })
    },
    getListFn(){
          this.$axios
            .post('http://127.0.0.1:3000/api/blog/getList',{
              pageIndex:this.currentIndex
            })
            .then(response => {
              console.log(response.data)
              this.msgLength=response.data.data.count
              this.msgList = response.data.data.blogList
            })
    },
    createMsgFn(){
      this.$axios
      .post('http://127.0.0.1:3000/api/blog/createBlog',{
        content:this.content
      })
      .then(response => {
        if(response.data.errCode==0){
          this.getListFn()
        }
      })
    },
    createMsg(){
      //正则过滤字符
      if(this.content==null){
        return false;
      }
      this.createMsgFn();
      this.content=null
    },
    deleteMsg(id){
      this.$axios
      .post('http://127.0.0.1:3000/api/blog/delete',{
        id:id
      })
      .then(response => {
        console.log(response)
        this.getListFn()
      })
    },
    loadMore(){
      this.currentIndex=this.currentIndex+1;
      this.$axios
      .post('http://127.0.0.1:3000/api/blog/getList',{
        pageIndex:this.currentIndex
      })
      .then(response => {
        this.msgList=this.msgList.concat(response.data.data.blogList) 
        console.log(this.msgList)
      })
    }
  }
}
</script>