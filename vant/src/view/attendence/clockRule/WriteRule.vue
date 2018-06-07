<template>
  <div class="rule-box">
    <van-nav-bar
      title="编辑规则"
      left-arrow
      left-text="返回"
      right-text="保存"
      @click-left="reback"
    />
    <div class="write-rule-body">
      <van-cell-group>
        <van-cell title="规则名称" is-link :value="ruleName" @click="rulePopup=true" />
        <van-cell title="打卡人员" to="/setClockPerson" is-link value="张冬，业务部" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="打卡日期" is-link :value="checkedDate.toString()" @click="datePopup=true" />
        <van-cell title="打卡时间" is-link value="09:00-12:00" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="打卡位置" is-link value="钦汇园" />
      </van-cell-group>
      <van-button size="large" class="large-btn">删除规则</van-button>
    </div>

    <!-- 规则名 -->
    <van-popup v-model="rulePopup" position="right" :overlay="false">
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
    <van-popup v-model="datePopup" position="right" :overlay="false">
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
          <van-checkbox name="周一" />
        </van-cell>
        <van-cell title="每周二">
          <van-checkbox name="周二" />
        </van-cell>
        <van-cell title="每周三">
          <van-checkbox name="周三" />
        </van-cell>
        <van-cell title="每周四">
          <van-checkbox name="周四" />
        </van-cell>
        <van-cell title="每周五">
          <van-checkbox name="周五" />
        </van-cell>
        <van-cell title="每周六">
          <van-checkbox name="周六" />
        </van-cell>
        <van-cell title="每周日">
          <van-checkbox name="周日" />
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
    <van-cell-group>
      <van-switch-cell v-model="checked" title="法定节假日不用打卡" />
      <van-switch-cell v-model="checked" title="非工作日允许打卡" />
    </van-cell-group> 
    </van-popup>
  </div>
</template>
<script>
import router from '@/router'
export default {
  name:'writeRule',
  data(){
    return {
      rulePopup:false,
      ruleName:'每日2次打卡',
      showError:false,
      datePopup:false,
      checkedDate:['周一','周五'],
      checked:true
    }
  },
  methods:{
    reback(){
      router.push('/clockHome/clockRule');
    },
    setName(){
      if(this.ruleName==""){
        this.showError=true;
      }else{
        this.rulePopup=false;
      }
    }
  }
}
</script>

<style scoped>
  .write-rule-body .van-cell-group{
    margin-top: 0.7rem;
  }

  .van-popup{
    width: 100%;
    height:100%;
    background: rgb(240,239,244); 
  }
  .van-popup .van-cell-group{
    margin-top: 0.7rem;
  }
  .van-switch-cell{
    border-bottom: 1px solid #e5e5e5;
  }
  .van-switch-cell:last-child{
    border-bottom: none;
  }
</style>
