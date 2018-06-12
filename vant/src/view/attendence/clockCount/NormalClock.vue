<template>
  <div>
    <div class="month-box">
      <van-nav-bar
        title="正常考勤(21天)"
        left-arrow
        left-text="返回"
        @click-left="reback"
      />
      <van-cell-group>
        <van-cell v-for="index in 21" :key="index" :title="`2017-09-${index} 星期${index%7}`" />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import router from '../../../router'
export default {
  name:'normalClock',
  data(){
    return {
    }
  },
  methods:{
    reback(){
      router.push('/monthlyRecord');
    }
  }
}
</script>

<style scoped>
</style>
