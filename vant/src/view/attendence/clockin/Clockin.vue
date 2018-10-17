<template>
  <div class="attendence-box">
    <van-nav-bar
      title="打卡"
      left-arrow
      left-text="返回"
      @click-left="$router.back()"
    >
      <van-icon name="ellipseVertical" slot="right" />
    </van-nav-bar>
    <van-tabs v-model="tabIndex">
      <van-tab title="上下班">
        <div class="work-box">
          <div class="content" v-for="(item,index) in workRules" :key="index">
            <van-row class="work-body" :class="{'disable-color':item.clockOnWork}" gutter="20">
              <a href="javascript:;" @click="punchCard(type.SIGNINDETAIL,item)">
                <van-col span="4" class="work-icon">
                  <van-icon name="sun"></van-icon>
                </van-col>
                <van-col span="20" class="work-r"> 
                  <van-col span="16">
                    <h4>上班</h4>
                    <p>{{item.rule.onWork}}</p>
                  </van-col>
                  <van-col span="8" class="work-btn">
                    <van-button v-if="!item.clockOnWork" size="small" type="danger" @click.stop="punchCard(type.SIGNIN,item)">签到</van-button>
                    <p class="sign-in" v-else>
                      <van-icon name="itemLine"></van-icon>已签到 {{item.clockOnWork|timeFormat("hh:mm")}}
                    </p>
                  </van-col>
                </van-col>
              </a>
            </van-row>
            <van-row class="work-body" :class="{'disable-color':!item.clockOnWork}" gutter="20">
              <a href="javascript:;" @click="punchCard(type.SIGNOUTDETAIL,item)">
                <van-col span="4" class="work-icon">
                  <van-icon name="moon"></van-icon>
                </van-col>
                <van-col span="20" class="work-r">
                  <van-col span="16">
                    <h4>下班</h4>
                    <p>{{item.rule.afterWork}}</p>
                  </van-col>
                  <van-col span="8" class="work-btn">
                    <van-button 
                      v-show="!item.clockOnWork"
                      size="small" 
                      class="before-start" 
                      disabled>未开始</van-button>
                    <van-button 
                      v-show="item.clockOnWork&&!item.clockAfterWork" 
                      size="small" 
                      type="danger" 
                      class="before-start" 
                      @click.stop="punchCard(type.SIGNOUT,item)">签退</van-button>

                    <p class="sign-in" v-show="item.clockAfterWork">
                      <van-icon name="itemLine"></van-icon>已签退 {{item.clockAfterWork|timeFormat("hh:mm")}}
                    </p>
                    <a v-show="item.clockAfterWork" href="javascript:;" class="blue" @click.stop="punchCard(type.UPDATE,item)">更新</a>
                  </van-col>
                </van-col>
              </a>
            </van-row>
          </div>
        </div>

        <hr>
        <!--
        <div class="work-box">
          <van-row class="work-body" :class="{'disable-color':!showOnWork}" gutter="20">
            <a href="javascript:;" @click="punchCard(type.SIGNINDETAIL)">
              <van-col span="4" class="work-icon">
                <van-icon name="sun"></van-icon>
              </van-col>
              <van-col span="20" class="work-r"> 
                <van-col span="16">
                  <h4>上班</h4>
                  <p>09:00</p>
                </van-col>
                <van-col span="8" class="work-btn">
                  <van-button v-if="showOnWork" size="small" type="danger" @click.stop="punchCard(type.SIGNIN)">签到</van-button>
                  <p class="sign-in" v-else>
                    <van-icon name="itemLine"></van-icon>已签到 {{punchTime}}
                  </p>
                </van-col>
              </van-col>
            </a>
          </van-row>

          <van-row class="work-body" :class="{'disable-color':showOnWork}" gutter="20">
            <a href="javascript:;" @click="punchCard(type.SIGNOUTDETAIL)">
              <van-col span="4" class="work-icon">
                <van-icon name="moon"></van-icon>
              </van-col>
              <van-col span="20" class="work-r">
                <van-col span="16">
                  <h4>下班</h4>
                  <p>23:00</p>
                </van-col>
                <van-col span="8" class="work-btn">
                  <van-button 
                    v-show="showOnWork"
                    size="small" 
                    class="before-start" 
                    disabled>未开始</van-button>
                  <van-button 
                    v-show="showSignOut" 
                    size="small" 
                    type="danger" 
                    class="before-start" 
                    @click.stop="punchCard(type.SIGNOUT)">签退</van-button>

                  <p class="sign-in" v-show="showAfterWork">
                    <van-icon name="itemLine"></van-icon>已签退 {{punchOutTime}}
                  </p>
                  <a v-show="showAfterWork" href="javascript:;" class="blue" @click.stop="punchCard(type.UPDATE)">更新</a>
                </van-col>
              </van-col>
            </a>
          </van-row>
        </div>
        -->
      </van-tab>
      <van-tab title="外出">
        <div class="work-box out-box">
          <van-row>
            <van-col span="18">
              <p class="out-title">外出记录</p>
            </van-col>
            <van-col span="6" class="text-right">
              <van-button size="small" class="bg-blue" @click.stop="punchCard(type.ADDGOOUT)">新增打卡</van-button>
            </van-col>
          </van-row>
          <van-row v-show="outerRecords.length==0" class="no-record grey">
            <van-col offset="4" span="16">
              <van-icon name="noRecord"></van-icon>
              <h2>今日无外出记录</h2>
            </van-col>
          </van-row>
          <div class="record-box">
            <van-row class="one-record" v-for="(item,index) in outerRecords" :key="index">
              <router-link :to="{name:'clockDetail',params:{source:type.GOOUTDETAIL,id:item.id}}">
                <van-col span="18">
                  <p class="fontstyle">第{{index+1}}次打卡</p>
                </van-col>
                <van-col span="6" class="blue text-right padd5">{{item.time}}</van-col>
                <van-col span="24" class="show-one-line fontstyle">地点：{{item.address}}</van-col>
                <van-col span="24" class="show-one-line fontstyle">备注：{{item.note}}</van-col>
              </router-link>
            </van-row>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script src="./js/clockIn.js"></script>

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


  .out-box{
    padding: 0.7rem;
    padding-bottom: 10rem;
  }
  .out-title{
    font-size: 1rem;
  }
  .no-record{
    text-align: center;
    padding:4rem 0 0;
  }
  .no-record .van-icon{
    font-size: 4rem;
  }
  .no-record h2{
    font-weight: normal;
  }
  .one-record{
    border: 1px solid #a7a4a4;
    padding: 0.3rem;
    margin: 0.8rem 0;
  }
  .one-record .van-col--24{
    margin-bottom: 6px;
  }
  .padd5{
    padding-top: 0.5rem;
  }
  .fontstyle{
    font-size: 0.85rem;
  }
  
</style>
