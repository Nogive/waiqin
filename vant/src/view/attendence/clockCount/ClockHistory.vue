<template>
  <div>
    <div class="count-box">
      <van-nav-bar
        :title="title"
        left-arrow
        left-text="返回"
        @click-left="$router.back()"
      />
      <van-cell-group v-for="index in 12" :key="index">
        <van-cell :title="`${index}月1日 星期五`" :to="dayLink"  is-link/>
        <van-cell :title="`${index}月考勤报表 >`" :to="monthLink" class="text-center blue" />
      </van-cell-group>

    </div>
  </div>
</template>
<script>
import * as type from "@/common/js/typeVariable";
import { mapGetters, mapActions } from "vuex";
export default {
  name:'clockHistory',
  data(){
    return {
      title:'',//标题
      source:'',
      dayLink:null,//日记录路由
      monthLink:null,//月记录路由
    }
  },
  computed:{
    ...mapGetters(["statistics"])
  },
  created(){
    this.source=this.statistics;
    this.setTitle();
    this.setRouter();
  },
  methods:{
    setTitle(){
      let key=this.source;
      if(key==type.ALL){
        this.title="部门考勤历史";
      }
      if(key==type.INTERNAL){
        this.title="部门内勤考勤历史";
      }
      if(key==type.OUTER){
        this.title="部门外出考勤历史"
      }
      if(key==type.SELF){
        this.title="我的考勤历史"
      }
    },
    setRouter(){
      let key=this.source;
      if(key==type.SELF){
        this.dayLink={name:'dailyRecord'}
        this.monthLink={name:'monthlyRecord'}
      }else{
        this.dayLink={name:'clockDetailForDepart'}
        this.monthLink={name:'monthClockPerson'}
      }
    }
  }
}
</script>

<style scoped>
.van-cell-group{
  margin-top: 0.7rem;
}
</style>
