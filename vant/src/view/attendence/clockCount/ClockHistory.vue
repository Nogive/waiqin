<template>
  <div>
    <div class="count-box">
      <van-nav-bar
        :title="title"
        left-arrow
        left-text="返回"
        @click-left="$router.go(-1)"
      />
      <van-cell-group v-for="index in 12" :key="index">
        <van-cell :title="`${index}月1日 星期五`" :to="dayLink"  is-link/>
        <van-cell :title="`${index}月考勤报表 >`" :to="monthLink" class="text-center blue" />
      </van-cell-group>

    </div>
  </div>
</template>
<script>
import router from '@/router'
export default {
  name:'clockHistory',
  data(){
    return {
      source:''
    }
  },
  mounted(){
    this.source=this.$route.params.source;
  },
  computed:{
    title(){
      let title='我的考勤历史';
      if(this.source=='all'){
        title="部门考勤历史"
      }
      if(this.source=='internal'){
        title="部门内勤考勤历史"
      }
      if(this.source=='outer'){
        title="部门外出考勤历史"
      }
      if(this.source=='self'){
        title="我的考勤历史"
      }
      return title;
    },
    dayLink(){
      let path='';
      if(this.source=='self'){
        path= {
          name:'dailyRecord',
          params:{source:this.source}
        }
      }else{
        path={
          name:'clockDetailForDepart',
          params:{source:this.source}
        }
      }
      return path;
    },
    monthLink(){
      let path='';
      if(this.source=='self'){
        path= {
          name:'monthlyRecord',
          params:{source:this.source}
        }
      }else{
        path={
          name:'normalClockPerson',
          params:{source:this.source}
        }
      }
      return path;
    }
  },
  methods:{
  }
}
</script>

<style scoped>
.van-cell-group{
  margin-top: 0.7rem;
}
</style>
