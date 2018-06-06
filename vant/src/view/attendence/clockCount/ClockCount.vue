<template>
  <div>
    <div class="attendence-box">
      <van-nav-bar
        title="统计"
        left-arrow
        left-text="返回"
        @click-left="reback"
      />
      <van-row>
        <van-col span="18">
          <p class="out-title">统计记录</p>
        </van-col>
        <van-col span="6" class="text-right">
          <router-link to="/clockDetail">
            <van-button size="small" class="bg-blue">新增打卡</van-button>
          </router-link>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import router from '../../../router'
export default {
  name:'attendence',
  data(){
    return {
      menuIndex:0,
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
  
  
</style>
