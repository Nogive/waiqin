<template>
  <div>
    <div class="month-box">
      <van-nav-bar
        :title="`${title}(21天)`"
        left-arrow
        left-text="返回"
        @click-left="$router.back()"
      />
      <van-cell-group>
        <van-cell v-for="index in 21" :key="index" :title="`2017-09-${index} 星期${index%7}`" />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import * as type from '@/common/js/typeVariable'
export default {
  name:'normalClock',
  data(){
    return {
      source:'',//来源
      title:'正常考勤'
    }
  },
  created(){
    this.source=this.$route.params.source;
    this.setTitle(this.source);
  },
  computed:{
  },
  methods:{
    setTitle(key){
      if(key==type.NOTSIGNIN){
        this.title="上班未签到";
      }else if(key==type.NOTSIGNOUT){
        this.title="下班未签退"
      }
    }
  }
}
</script>

<style scoped>
</style>
