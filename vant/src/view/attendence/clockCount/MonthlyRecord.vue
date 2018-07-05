<template>
  <div>
    <div class="month-box">
      <van-nav-bar
        title="考勤月报表(个人)"
        left-arrow
        left-text="返回"
        @click-left="$router.back()"
      />
      <div class="sum-box" @click="goCustom">
        <van-row class="re-header">
          <van-col class="w50">
            <img src="../../../assets/images/cat2.jpg" alt="">
          </van-col>
          <van-col class="wauto">
            <p class="re-name">张冬</p>
            <p>销售一部</p>
          </van-col>
        </van-row>
        <van-row class="sum-detail">
          <van-col span="8">
            <p>2018年</p>
            <p><b>5</b> 月</p>
          </van-col>
          <van-col span="16">
            <p>正常考勤</p>
            <p><b>0</b> 天</p>
          </van-col>
        </van-row>
      </div>
      <van-cell-group>
        <van-cell title="迟到" value="3次" :to="{name:'dailyRecord',params:{source:type.LATE}}"  is-link/>
        <van-cell title="未签到" value="1次" :to="{name:'normalClock',params:{source:type.NOTSIGNIN}}"  is-link/>
        <van-cell title="早退" value="1次" :to="{name:'dailyRecord',params:{source:type.LEAVEEARLY}}"  is-link/>
        <van-cell title="未签退" value="1次" :to="{name:'normalClock',params:{source:type.NOTSIGNOUT}}"  is-link/>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="外出" value="1次" :to="{name:'dailyRecord',params:{source:type.GOOUT}}"  is-link/>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import * as type from '@/common/js/typeVariable'
export default {
  name:'monthlyRecord',
  data(){
    return {
      source:'',
      type:type
    }
  },
  mounted(){
    
  },
  methods:{
    //正常考勤
    goCustom(){
      this.$router.push({name:'normalClock',params:{source:type.NORMAL}});
    }
  }
}
</script>

<style scoped>
.van-cell-group{
  margin-top: 0.7rem;
}
.sum-box{
  padding: 0.7rem 0.7rem;
  background-color: rgb(35,39,54);
}
.re-header .van-col{
  height: 50px;
}
.w50{
  width: 50px;
}
.wauto{
  width: calc(100% - 50px);
  padding-left: 0.5rem;
  color: white;
}
.wauto .re-name{
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0;
}
.wauto .re-name+p{
  font-size: 0.7rem;
  margin-top: 4px;
}
.re-header img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.sum-detail{
  color: white;
  padding: 0.5rem 0;
}
.sum-detail .van-col-8{
  position: relative;
}
.sum-detail .van-col-8:after{
  content: '';
  width:1px;
  height: 70%;
  background: rgba(255,255,255,.5);
  position: absolute;
  top:18%;
  right: 2rem;
}
.sum-detail b{
  font-size: 1.8rem;
}
</style>
