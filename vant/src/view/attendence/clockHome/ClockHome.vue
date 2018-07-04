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
export default {
  name:'attendence',
  data(){
    return {
      menuIndex:0
    }
  },
  beforeRouteEnter:((to,from,next)=>{
    let vm=this;
    if(from.name=="clockHistory"){
      next(vm=>{
        vm.menuIndex=1;
      });
    }else if(from.name=="writeRule"){
      next(vm=>{
        vm.menuIndex=2;
      });
    }else{
      next();
    }
  }),
  created(){
    //console.log(this.$route);
  },
  methods:{
  }
}
</script>

<style scoped>
  
</style>
