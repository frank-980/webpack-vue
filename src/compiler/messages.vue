<template>
<div>
  <div v-for="(item,index) in msgList" :key="index">
    {{item.userName}} , {{item.content}}
  </div>
  <a @click="loadMore" v-if="((currentIndex+1)*displayLength)<msgLength">加载更多</a>
</div>
</template>
<script>
export default {
  name: 'messages',
  data(){
    return {
      displayLength:5,//一页展示5条记录
      currentIndex:0,//当前页数
      msgLength:0,//总条数
      msgList:[]
    }
  },
  created:function(){
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
  },
}
</script>