<template>
  <div class="rule-box">
    <van-nav-bar
      title="编辑规则"
      left-arrow
      left-text="返回"
      right-text="保存"
      @click-left="$router.back()"
    />
    <div class="write-rule-body">
      <van-cell-group>
        <van-cell title="规则名称" to="/setRuleName" is-link :value="ruleName" />
        <van-cell title="打卡人员" to="/setClockPerson" is-link value="张冬，业务部" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="打卡日期" is-link to="/setClockDate" :value="clockDate" />
        <van-cell title="打卡时间" is-link to="/setClockTime" :value="clockTime" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="打卡位置" is-link to="/setLocation" :value="address" />
      </van-cell-group>
      <van-button size="large" class="large-btn">删除规则</van-button>
    </div>
  </div>
</template>
<script src="./js/writeRule.js"></script>

<style scoped>
  .van-cell-group{
    margin-top: 0.7rem;
  }
</style>
