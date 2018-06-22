<template>
  <div class="rule-box">
    <van-nav-bar
      title="编辑规则"
      left-arrow
      left-text="返回"
      right-text="保存"
      @click-left="goBack"
    />
    <div class="write-rule-body">
      <van-cell-group>
        <van-cell title="规则名称" is-link :value="ruleName" @click="rulePopup=true" />
        <van-cell title="打卡人员" to="/setClockPerson" is-link value="张冬，业务部" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="打卡日期" is-link :value="clockDate" @click="datePopup=true" />
        <van-cell title="打卡时间" is-link :value="clockTime" @click="timePopup=true" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="打卡位置" is-link :value="address" @click="locationPopup=true" />
      </van-cell-group>
      <van-button size="large" class="large-btn">删除规则</van-button>
    </div>

    <!-- 规则名 -->
    <van-popup class="page-all" v-model="rulePopup" position="right" :overlay="false">
      <van-nav-bar
        title="编辑名称"
        left-arrow
        left-text="返回"
        right-text="确定"
        @click-left="rulePopup=false"
        @click-right="setName"
      />
      <van-cell-group>
        <van-field 
        v-model="ruleName" 
        value="每日两次打卡" 
        placeholder="请输入规则名" 
        :error="showError"
        icon="clear"
        @click-icon="ruleName = ''"
        @keyup="showError=false" />
      </van-cell-group>
    </van-popup>

    <!-- 打卡日期 -->
    <van-popup class="page-all" v-model="datePopup" position="right" :overlay="false">
      <van-nav-bar
        title="设置打卡日期"
        left-arrow
        left-text="返回"
        right-text="确定"
        @click-left="datePopup=false"
        @click-right="datePopup=false"
      />
      <van-checkbox-group v-model="checkedDate">
        <van-cell-group>
          <van-cell title="每周一">
            <van-checkbox name="1" />
          </van-cell>
          <van-cell title="每周二">
            <van-checkbox name="2" />
          </van-cell>
          <van-cell title="每周三">
            <van-checkbox name="3" />
          </van-cell>
          <van-cell title="每周四">
            <van-checkbox name="4" />
          </van-cell>
          <van-cell title="每周五">
            <van-checkbox name="5" />
          </van-cell>
          <van-cell title="每周六">
            <van-checkbox name="6" />
          </van-cell>
          <van-cell title="每周日">
            <van-checkbox name="0" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <van-cell-group>
        <van-switch-cell v-model="holiday" title="法定节假日不用打卡" />
        <van-switch-cell v-model="nonWorkday" title="非工作日允许打卡" />
      </van-cell-group> 
    </van-popup>

    <!-- 打卡时间 -->
    <van-popup class="page-all" v-model="timePopup" position="right" :overlay="false">
      <van-nav-bar
        title="设置打卡时间"
        left-arrow
        left-text="返回"
        right-text="确定"
        @click-left="timePopup=false"
        @click-right="timePopup=false"
      />
      <van-cell-group>
        <van-cell title="一天内上下班次数" is-link :value="`${workNum}次`" @click="workTimesPopup=true" />
      </van-cell-group> 
      <van-cell-group v-for="(item,index) in timeArr" :key="index">
        <van-cell title="上班" is-link :value="item.onTime" @click="checkOnWorkTime(item,'on')" />
        <van-cell title="下班" is-link :value="item.afterTime" @click="checkOnWorkTime(item,'after')"  />
      </van-cell-group> 
    </van-popup>
    <!-- 上下班次数 -->
    <van-popup class="w60" v-model="workTimesPopup">
      <van-cell-group>
        <van-cell title="一天内上下班次数" />
        <van-cell title="1次" @click="checkWorkTime(1)" />
        <van-cell title="2次" @click="checkWorkTime(2)" />
        <van-cell title="3次" @click="checkWorkTime(3)" />
      </van-cell-group> 
    </van-popup>
    <!-- 选择时间 -->
    <van-datetime-picker
      v-show="showTimePanel"
      v-model="currentTime"
      type="time"
      @confirm="showTimePanel=false;currentTime='12:00'"
      @cancel="showTimePanel=false"
      @change='pickerTime'
    />
    <!-- 打卡位置——非无限制 -->
    <van-popup class="page-all" v-model="locationPopup" position="right" :overlay="false">
      <van-nav-bar
        title="设置打卡位置"
        left-arrow
        left-text="返回"
        @click-left="locationPopup=false"
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
    </van-popup>

  </div>
</template>
<script src="./js/writeRule.js"></script>

<style scoped>
  .write-rule-body .van-cell-group{
    margin-top: 0.7rem;
  }

  .page-all{
    width: 100%;
    height:100%;
    background: rgb(240,239,244); 
  }
  .page-all .van-cell-group{
    margin-top: 0.7rem;
  }

  .van-switch-cell{
    border-bottom: 1px solid #e5e5e5;
  }
  .van-switch-cell:last-child{
    border-bottom: none;
  }

  .w60{
    width: 60%;
  }

  .van-picker{
    z-index: 3000;
  }

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
  }
  .one-rule .van-row:first-child{
    margin-top: 0;
  }
  .one-rule .van-row .van-col-3{
    color: #777575;
  }
</style>
