<template>
  <div>
    <div class="count-box">
      <van-nav-bar
        title="我的考勤历史"
        left-arrow
        left-text="返回"
        @click-left="reback"
      />
      <van-cell-group v-for="index in 12" :key="index">
        <van-cell :title="`${index}月1日 星期五`" to="/dailyRecord"  is-link/>
        <van-cell :title="`${index}月考勤报表 >`" to="/monthlyRecord" class="text-center blue" />
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
      router.push('/clockHome/clockCount');
    }
  }
}
</script>

<style scoped>
.van-cell-group{
  margin-top: 0.7rem;
}
</style>
