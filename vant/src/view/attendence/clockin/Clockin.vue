<template>
  <div>
    <van-nav-bar
      title="打卡"
      left-arrow
      left-text="返回"
      @click-left="reback"
    />
    <div class="attendence-box">
      <van-tabs v-model="tabIndex">
        <van-tab title="上下班">
          <div class="work-box">
            <van-row class="work-body" gutter="20">
              <van-col span="4" class="work-icon">
                <van-icon name="gotowork"></van-icon>
              </van-col>
              <van-col span="20" class="work-r">
                <van-col span="16">
                  <h4>上班</h4>
                  <p>09:00</p>
                </van-col>
                <van-col span="8" class="work-btn">
                  <p class="sign-in" v-show="show">
                    <van-icon name="sun"></van-icon>已签到 22:27
                  </p>
                  <van-button v-show="show1" size="small" type="danger" @click="goSign">签到</van-button>
                </van-col>
              </van-col>
            </van-row>

            <van-row class="work-body disable-color" gutter="20">
              <van-col span="4" class="work-icon">
                <van-icon name="afterwork"></van-icon>
              </van-col>
              <van-col span="20" class="work-r">
                <van-col span="16">
                  <h4>下班</h4>
                  <p>23:00</p>
                </van-col>
                <van-col span="8" class="work-btn">
                  <p class="sign-in" v-show="show">
                    <van-icon name="sun"></van-icon>已签到 22:27
                  </p>
                  <a  v-show="show" href="javascript:;" class="blue">更新</a>
                  <van-button v-show="show1" size="small" class="before-start" disabled>未开始</van-button>
                </van-col>
              </van-col>
            </van-row>
          </div>
        </van-tab>
        <van-tab title="外出">
          <van-panel title="标题" desc="描述信息" status="状态">
            <div>内容</div>
          </van-panel>
        </van-tab>
      </van-tabs>
    </div>

    <van-tabbar v-model="menuIndex">
      <van-tabbar-item icon="marker">打卡</van-tabbar-item>
      <van-tabbar-item icon="tongji">统计</van-tabbar-item>
      <van-tabbar-item icon="guize" >规则</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import router from '../../../router'
export default {
  name:'attendence',
  data(){
    return {
      menuIndex:0,
      tabIndex:0,
      show:false,
      show1:true
    }
  },
  methods:{
    reback(){
      router.push('/');
    },
    goSign(){
      router.push('/clockDetail');
    }
  }
}
</script>

<style scoped>
  .work-box{
    background: white;
    margin: 0.8rem;
    padding-bottom: 10rem;
  }
  .work-body{
    margin: 0 !important;
    padding: 0.7rem;
    position: relative;
  }
  .work-body>div{
    height: 55px;
  }
  .work-icon{
    background-color: rgb(76,76,171);
    border-radius: 8px;
    text-align: center;
  }
  .work-icon .van-icon{
    font-size: 2rem;
    line-height: 55px;
    color: white;
  }
  .work-body .work-r{
    padding: 0 !important;
    position: relative;
    height: 65px;
  }
  .work-r:after{
    content: "";
    width: 100%;
    height: 1px;
    background: #e5e5e5;
    position: absolute;
    top: 100%;
    right: -10px;
  }
  .work-btn{
    padding: 0 !important;
  }
  .work-btn .van-button{
    margin-top: 12.5px;
    width: 100%;
  }
  .work-btn p{
    margin-top: 12.5px;
  }
  .sign-in{
    color: #a7a4a4;
  }
  .sign-in .van-icon{
    color:rgb(251,128,68);
    margin-right: 5px;
  }
  .work-btn a{
    font-size: 0.85rem;
    float: right;
  }

  .disable-color .work-icon{
    background: #e5e5e5;
  }
  
</style>
