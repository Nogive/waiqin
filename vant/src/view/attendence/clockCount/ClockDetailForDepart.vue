<template>
  <div>
    <div class="detail-box">
      <van-nav-bar
        :title="title"
        left-arrow
        left-text="返回"
        right-text="选择部门"
        @click-left="$router.back()"
        @click-right="chooseDepart"
      />
      <van-row class="company-box">
        <van-col span="24">2018年6月1日 星期五</van-col>
        <van-col span="24">麦芒科技公司</van-col>
      </van-row>
      <van-cell-group>
        <van-cell title="正常" value="1人" :to="{name:'dayClockPerson',params:{source:type.NORMAL}}" is-link/>
        <van-cell title="未签到" value="1人" is-link/>
        <van-cell title="迟到" value="1人" :to="{name:'dayClockPerson',params:{source:type.LATE}}" is-link/>
        <van-cell title="未签退" value="1人" is-link/>
        <van-cell title="早退" value="1人" :to="{name:'dayClockPerson',params:{source:type.LEAVEEARLY}}" is-link/>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="外出" value="1人" :to="{name:'dayClockPerson',params:{source:type.GOOUT}}" is-link/>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import * as type from "@/common/js/typeVariable"
import { mapGetters,mapActions } from "vuex";
import store from "@/store"
export default {
  name:'clockDetailForDepart',
  data(){
    return {
      source:'',
      type:type,
      title:''
    }
  },
  computed:{
    ...mapGetters(["depart_day","statistics"])
  },
  beforeRouteLeave:((to,from,next)=>{
    if(to.name=='dayClockPerson'){
      store.commit('changeDepartDay',to.params.source);
    }
    next();
  }),
  created(){
    this.source=this.statistics;
    this.setTitle(this.source);
  },
  methods:{
    ...mapActions(['changeDepartDay']),
    chooseDepart(){
      this.$router.push('/setClockPerson');
    },
    setTitle(key){
      if(key==type.ALL){
        this.title="全部成员考勤详情"
      }
      if(key==type.INTERNAL){
        this.title="内勤成员考勤详情"
      }
      if(key==type.OUTER){
        this.title="外出成员考勤详情"
      }
    }
  }
}
</script>

<style scoped>
.company-box{
  background: rgb(35,39,54);
  color: white;
  padding: 1rem 0.7rem;
  text-align: center
}
.company-box .van-col:first-child{
  margin-bottom: 0.7rem;
  font-size: 0.8rem;
}
.van-cell-group{
  margin-top: 0.7rem;
}
</style>
