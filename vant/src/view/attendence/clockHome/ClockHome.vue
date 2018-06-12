<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="menuIndex">
      <van-tabbar-item to="/clockHome" icon="position">打卡</van-tabbar-item>
      <van-tabbar-item to="/clockHome/clockCount" icon="count">统计</van-tabbar-item>
      <van-tabbar-item to="/clockHome/clockRule" icon="ruleDash" >规则</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import router from '../../../router'
export default {
  name:'attendence',
  data(){
    return {
      menuIndex:0
    }
  },
  methods:{
    reback(){
      router.push('/');
    }
  }
}
</script>

<style scoped>
  
</style>
