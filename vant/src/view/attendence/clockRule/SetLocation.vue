<template>
  <div>
    <van-nav-bar
      title="设置打卡位置"
      left-arrow
      left-text="返回"
      @click-left="$router.back()"
    />
    <div class="rule-body">
      <div class="one-rule">
        <router-link to="/setClockPlace">
          <van-row>
            <van-col span="3">地点</van-col>
            <van-col span="21">宾阳路60号临</van-col>
          </van-row>
          <van-row>
            <van-col span="3">地址</van-col>
            <van-col span="21">上海市上海市徐汇区宾阳路60号临徐汇区宾阳路60号临</van-col>
          </van-row>
          <van-row>
            <van-col span="3">范围</van-col>
            <van-col span="21">300米</van-col>
          </van-row>
        </router-link>
      </div>
    </div>
    <van-cell-group> 
      <van-cell title="添加位置" icon="add" class="blue" to="/setClockPlace" />
    </van-cell-group>
  </div>
</template>
<script>
export default {
  name:'attendence',
  data(){
    return {
    }
  },
  created(){
  },
  methods:{
  }
}
</script>

<style scoped>
  .rule-body{
    margin: 0.7rem 0;
    background-color: white;
    border-top:1px solid #e5e5e5;
    border-bottom:1px solid #e5e5e5;
  }
  .one-rule{
    padding: 0.7rem 1rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .one-rule:last-child{
    border-bottom: none;
  }
  .one-rule .van-row{
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }
  .one-rule .van-row:first-child{
    margin-top: 0;
  }
  .one-rule .van-row .van-col-3{
    color: #777575;
  }
</style>
