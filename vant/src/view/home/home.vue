<template>
  <div class="pb65">
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item to="/" icon="chat" info="5">消息</van-tabbar-item>
      <van-tabbar-item to="/" icon="menu">工作台</van-tabbar-item>
      <van-tabbar-item to="/aboutMe" icon="contact" >我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  name:'home',
  data(){
    return {
      active:1
    }
  }
}
</script>

