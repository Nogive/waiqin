<template>
  <div>
    <div class="count-box">
      <van-nav-bar
        title="考勤统计"
        left-arrow
        left-text="返回"
        @click-left="reback"
      />
      <van-cell-group>
        <van-cell title="全部成员" to="/clockDetailForDepart"  is-link/>
        <van-row class="count-panel">
          <van-col span="24">每天</van-col>
          <van-col span="24">
            <van-col span="12">上午上班：09:00</van-col>
            <van-col span="12">上午下班：12:00</van-col>
          </van-col>
          <van-col span="24">
            <van-col span="12">下午上班：13:30</van-col>
            <van-col span="12">下午下班：18:00</van-col>
          </van-col>
        </van-row>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="内勤考勤"  is-link/>
        <van-row class="count-panel">
          <van-col span="24">每天</van-col>
          <van-col span="24">
            <van-col span="12">上午上班：09:00</van-col>
            <van-col span="12">上午下班：12:00</van-col>
          </van-col>
          <van-col span="24">
            <van-col span="12">下午上班：13:30</van-col>
            <van-col span="12">下午下班：18:00</van-col>
          </van-col>
        </van-row>
      </van-cell-group>


      <van-cell-group>
        <van-cell title="外出统计" is-link />
      </van-cell-group>
      <van-cell-group class="history-box">
        <van-cell to="/clockHistory" title="我的考勤历史 >" class="text-center blue" />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import router from '../../../router'
export default {
  name:'attendence',
  data(){
    return {
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
.van-cell-group{
  margin-top: 0.7rem;
}
.history-box{
  position: fixed;
  bottom: 50px;
  width: 100%;
}
.count-panel{
  padding: 0.5rem 0.7rem;
}
.count-panel .van-col{
  font-size: 0.8rem;
}
.count-panel .van-col-24{
  color: #6d6c6c
}
.count-panel .van-col-12{
  color: #a7a4a4;
  margin-top: 0.2rem;
}
  
</style>
