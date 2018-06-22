<template>
  <div>
    <div class="clock-person-box">
      <van-nav-bar
        :title="title"
        left-arrow
        left-text="返回"
        @click-left="goBack"
      />
      <van-row class="company-box">
        <van-col span="24">2018年6月1日 星期五</van-col>
        <van-col span="24">麦芒科技公司</van-col>
      </van-row>
      <van-cell-group>
        <van-cell is-link class="person-box" :to="personLink">
          <template slot="title">
            <img src="../../../assets/images/cat2.jpg" alt="">
            张冬
          </template>
        </van-cell>
        <van-cell is-link class="person-box" :to="personLink">
          <template slot="title">
            <img src="../../../assets/images/cat2.jpg" alt="">
            张冬
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import router from '@/router'
export default {
  name:'normalClockPerson',
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
      let title='';
      if(this.source=='all'){
        title="考勤月报表"
      }
      if(this.source=='normal'){
        title="正常考勤人员"
      }
      if(this.source=='late'){
        title="迟到考勤人员"
      }
      if(this.source=='leave'){
        title="早退考勤人员"
      }
      if(this.source=='out'){
        title="外出考勤人员"
      }
      return title;
    },
    personLink(){
      let path='';
      if(this.source=='all'){
        path={
          name:'monthlyRecord',
          params:{
            source:this.source
          }
        }
      }else{
        path={
          name:'dailyRecord',
          params:{
            source:`${this.source}Depart`
          }
        }
      }
      return path;
    }
  },
  methods:{
    goBack(){
      if(this.source=='all'){
        router.push({name:'clockHistory',params:{source:this.source}});
      }else{
        router.push({name:'clockDetailForDepart',params:{source:'all'}});
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
.person-box{
  padding: 16px 15px 16px 65px;
}
.person-box img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  left: 15px;
}
.person-box .default-img{
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  left: 15px;
  background: green;
  color: white;
  text-align: center;
  line-height: 40px;
  z-index: 99;
}
</style>
