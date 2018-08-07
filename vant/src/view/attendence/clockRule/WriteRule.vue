<template>
  <div class="rule-box">
    <van-nav-bar
      :title="title"
      left-arrow
      left-text="返回"
      right-text="保存"
      @click-left="$router.back()"
    />
    <div class="write-rule-body">
      <van-cell-group>
        <van-cell title="规则名称" to="/setRuleName" is-link :value="ruleName" />
        <van-cell title="打卡人员" to="/setClockPerson" is-link :value="staffs" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="打卡日期" is-link to="/setClockDate" :value="clockDate" />
        <van-cell title="打卡时间" is-link to="/setClockTime" :value="clockTime|clockTimeFormat" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="打卡位置" is-link to="/setLocation" :value="clockPosition" />
      </van-cell-group>
      <van-button size="large" class="large-btn" v-if="deleteBtn">删除规则</van-button>
    </div>
  </div>
</template>
<script src="./js/writeRule.js"></script>

<style scoped>
  .van-cell-group{
    margin-top: 0.7rem;
  }
</style>
