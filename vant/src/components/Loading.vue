<template>
  <div class="loading">
    <van-popup v-model="showLoading">
      <van-loading color="white" />
      <p>msg</p>
    </van-popup>
  </div>
</template>
<script>
export default {
  name:'loading',
  data(){
    return{
      msg:'正在加载，请稍候...'
    }
  }
}
</script>
<style scopeed>
.loading{
  text-align: center;
}
</style>


