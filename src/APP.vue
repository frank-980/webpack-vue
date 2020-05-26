<template>
    <div class="wrap">
        <headers></headers>
        <router-view></router-view>
    </div>
</template>
<script>
import headers from "./compiler/headers.vue";
export default {
    name:"home",
    components:{
        headers,
    }
}
</script>
<style>
    .wrap{
        font-size: .14rem;
    margin: .5rem auto 0;
    color: #787978;
    font-family: Microsoft Yahei;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width: 800px;
    width: 100%;
    height: auto;
    position: relative;
    }
</style>