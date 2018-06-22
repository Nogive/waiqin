<template>
  <div>
    <div class="month-box">
      <van-nav-bar
        :title="`${title}(21天)`"
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
import router from '@/router'
export default {
  name:'normalClock',
  data(){
    return {
      source:'',//来源
    }
  },
  mounted(){
    this.source=this.$route.params.source;
  },
  computed:{
    title(){
      let title="正常考勤";
      if(this.source.search("notIn") >= 0){
        title="上班未签到"
      }
      if(this.source.search("notOut") >= 0){
        title="下班未签退"
      }
      return title;
    }
  },
  methods:{
    reback(){
      if(this.source.search('all')>=0){
        router.push({name:'monthlyRecord',params:{source:'all'}});
      }else{
        router.push({name:'monthlyRecord',params:{source:'self'}});
      }
    }
  }
}
</script>

<style scoped>
</style>
