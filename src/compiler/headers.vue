<template>
<div class="Header">
        <div class="header-box fadein">
            <img :src="imageSrc"/>
        </div>
        <div>
          <p class="my-id">RedSpite</p>
        </div>
        <div class="my-sort">
            <a>
                <router-link :to="{name:'CV'}">简历</router-link>
            </a>
            <a>
                <router-link :to="{name:'msgBoard'}">留言板</router-link>
            </a>         
        </div>
</div>

</template>
<script>
const avatar = require("../assets/avatar.jpg");
console.log(avatar)
export default {
  name: 'headers',
  data(){
    return {
      imageSrc:avatar.default
    }
  },
  props: {
    msg: String
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

