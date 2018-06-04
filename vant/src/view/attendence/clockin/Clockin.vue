<template>
  <div>
    <van-nav-bar
      title="标题"
      left-arrow
      left-text="返回"
      @click-left="reback"
    />
    <div class="attendence-box padd15">
      <van-panel>
        <van-row class="panel-body" gutter="30">
          <van-col span="6">
            <span>0</span>
            <p>出勤人数</p>
          </van-col>
          <van-col span="6">
            <span>0</span>
            <p>带我审批</p>
          </van-col>
          <van-col span="6">
            <span>0</span>
            <p>签到人数</p>
          </van-col>
          <van-col span="6">
            <span>0</span>
            <p>未读日志</p>
          </van-col>
        </van-row>
        <div slot="header">
          <van-row>
            <van-col span="24" class="home-title">
              <van-icon name="sun"></van-icon>下午好，管理员
            </van-col>
          </van-row>
        </div>
      </van-panel>

    </div>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="chat">打卡</van-tabbar-item>
      <van-tabbar-item icon="gongzuotai">统计</van-tabbar-item>
      <van-tabbar-item icon="contact" >规则</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import router from '../../../router'
export default {
  name:'attendence',
  data(){
    return {
      active:0
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
  .van-panel{
    padding: 15px;
    margin-bottom: 0.8rem;
  }
  .van-hairline--top-bottom::after{
    border-width: 0;
  }
  .home-title{
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 0.6rem;
    font-size: 0.8rem;
    color: #a7a4a4;
  }
  .home-title .van-icon{
    color: orange;
    margin-right: 1rem;
    font-size: 1rem;
  }
  .panel-body{
    padding: 1rem 0px;
    text-align: center;
  }
  .panel-body .van-col span{
    display: block;
    background: rgb(244,244,244);
    font-weight: bold;
    height: 60px;
    line-height: 60px;
    border-radius: 8px;
    font-size: 1.5rem;
  }
  .panel-body .van-icon{
    font-size: 2rem;
  }
  .panel-body .van-col p{
    color: initial;
  }
  .panel-body .grey p{
    color: inherit;
  }
</style>
