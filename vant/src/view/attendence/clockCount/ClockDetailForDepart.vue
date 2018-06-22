<template>
  <div>
    <div class="detail-box">
      <van-nav-bar
        title="考勤详情"
        left-arrow
        left-text="返回"
        right-text="选择部门"
        @click-left="goBack"
        @click-right="chooseDepart"
      />
      <van-row class="company-box">
        <van-col span="24">2018年6月1日 星期五</van-col>
        <van-col span="24">麦芒科技公司</van-col>
      </van-row>
      <van-cell-group>
        <van-cell title="正常" value="1人" :to="{name:'normalClockPerson',params:{source:'normal'}}" is-link/>
        <van-cell title="未签到" value="1人" is-link/>
        <van-cell title="迟到" value="1人" :to="{name:'normalClockPerson',params:{source:'late'}}" is-link/>
        <van-cell title="未签退" value="1人" is-link/>
        <van-cell title="早退" value="1人" :to="{name:'normalClockPerson',params:{source:'leave'}}" is-link/>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="外出" value="1人" :to="{name:'normalClockPerson',params:{source:'out'}}" is-link/>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import router from '@/router'
export default {
  name:'clockDetailForDepart',
  data(){
    return {
      source:''
    }
  },
  mounted(){
    this.source=this.$route.params.source;
  },
  methods:{
    goBack(){
      router.push({name:'clockHistory',params:{source:this.source}});
    },
    chooseDepart(){
      router.push('/setClockPerson');
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
