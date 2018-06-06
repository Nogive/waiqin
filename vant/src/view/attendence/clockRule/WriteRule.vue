<template>
  <div class="rule-box">
    <van-nav-bar
      title="编辑规则"
      left-arrow
      left-text="返回"
      right-text="保存"
      @click-left="reback"
    />
    <div class="write-rule-body">
      <van-cell-group>
        <van-cell title="规则名称" is-link value="每日2次打卡" />
        <van-cell title="打卡人员" to="/setClockPerson" is-link value="张冬，业务部" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="打卡日期" is-link value="周一至周日" />
        <van-cell title="打卡时间" is-link value="09:00-12:00" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="打卡位置" is-link value="钦汇园" />
      </van-cell-group>
      <van-button size="large" class="large-btn">删除规则</van-button>
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
      router.push('/clockHome/clockRule');
    }
  }
}
</script>

<style scoped>
  .write-rule-body .van-cell-group{
    margin-top: 0.7rem;
  }
  
</style>
