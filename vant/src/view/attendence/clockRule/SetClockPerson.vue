<template>
  <div class="set-person-box">
    <van-nav-bar
      title="设置打卡人员"
      left-arrow
      left-text="返回"
      @click-left="reback"
    >
      <div slot="right">
        <van-icon name="checked"></van-icon>
        <van-icon name="search"></van-icon>
      </div>
    </van-nav-bar>
    <van-checkbox-group v-model="result">
      <van-cell-group>
        <van-cell title="复选框1 ">
          <van-checkbox />
        </van-cell>
        <van-cell title="复选框 2">
          <van-checkbox />
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
  </div>
</template>
<script>
import router from '../../../router'
export default {
  name:'attendence',
  data(){
    return {
      result:[]
    }
  },
  methods:{
    reback(){
      router.push('/writeRule');
    }
  }
}
</script>

<style scoped>
  .set-person-box{
    border: 1px solid red;
  }
  
</style>
