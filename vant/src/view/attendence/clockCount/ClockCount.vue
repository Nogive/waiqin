<template>
  <div>
    <div class="attendence-box">
      <van-nav-bar
        title="考勤统计"
        left-arrow
        left-text="返回"
        @click-left="reback"
      />
      <van-cell-group>
        <van-cell title="外出统计" is-link />
      </van-cell-group>
      <van-cell-group class="history-box">
        <van-cell title="我的考勤历史 >" class="text-center blue" />
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
  
</style>
