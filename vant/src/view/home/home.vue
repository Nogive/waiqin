<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="工作台"
      right-text="退出登录"
      @click-right="login"
    />
    <div class="home-box">
      <van-panel class="padd15">
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

      <van-panel>
        <van-row class="panel-body" gutter="30">
          <van-col span="6">
            <router-link to="/clockin" class="red">
              <van-icon name="kaoqin"></van-icon>
              <p>考勤</p>
            </router-link>
          </van-col>
          <van-col span="6">
            <router-link to="/404" class="red">
              <van-icon name="waiqinqiandao"></van-icon>
              <p>外勤拜访</p>
            </router-link>
          </van-col>
          <van-col span="6">
            <router-link to="/404" class="grey">
              <van-icon name="ditu"></van-icon>
              <p>外勤轨迹</p>
            </router-link>
          </van-col>
        </van-row>
        <div slot="header">
          <van-row>
            <van-col span="24">移动考勤</van-col>
          </van-row>
        </div>
      </van-panel>

      <van-panel>
        <van-row class="panel-body" gutter="30">
          <van-col span="6">
            <router-link to="/404" class="yellow">
              <van-icon name="tongzhi"></van-icon>
              <p>通知</p>
            </router-link>
          </van-col>
          <van-col span="6">
            <router-link to="/404" class="orange" >
              <van-icon name="port-lcsp"></van-icon>
              <p>流程审批</p>
            </router-link>
          </van-col>
          <van-col span="6">
            <router-link to="/404" class="green">
              <van-icon name="xiehuibao"></van-icon>
              <p>工作汇报</p>
            </router-link>
          </van-col>
          <van-col span="6">
            <router-link to="/404" class="blue">
              <van-icon name="siyouyun"></van-icon>
              <p>任务</p>
            </router-link>
          </van-col>
        </van-row>
        <div slot="header">
          <van-row>
            <van-col span="24">日常办公</van-col>
          </van-row>
        </div>
      </van-panel>

    </div>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="chat" info="5">消息</van-tabbar-item>
      <van-tabbar-item icon="gongzuotai">工作台</van-tabbar-item>
      <van-tabbar-item icon="contact" >我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script src="./home.js"></script>
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
