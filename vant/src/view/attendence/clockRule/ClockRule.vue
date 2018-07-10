<template>
  <div class="rule-box">
    <van-nav-bar
      title="规则"
      left-arrow
      left-text="返回"
      @click-left="$router.back()"
    >
      <van-icon name="add-o" slot="right" @click="createRule" />
    </van-nav-bar>
    <div class="rule-body">
      <van-row class="one-rule">
        <router-link to="/writeRule">
          <van-col span="24">每日2次打卡</van-col>
          <van-col span="24" class="show-one-line">日期：周一至周日</van-col>
          <van-col span="24" class="show-one-line">时间：09:00-12:00</van-col>
          <van-col span="24" class="show-one-line">位置：乾坤大厦</van-col>
        </router-link>
      </van-row>
      <van-row class="one-rule" @click="createRule">
        <router-link to="/writeRule">
          <van-col span="24">每日4次考勤</van-col>
          <van-col span="24" class="show-one-line">日期：周一至周五</van-col>
          <van-col span="24" class="show-one-line">时间：09:00-16:00</van-col>
          <van-col span="24" class="show-one-line">位置：钦汇园</van-col>
        </router-link>
      </van-row>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import store from "@/store/";
const temp={
  name:'每日2次打卡',
  date:'周一至周日',
  time:'09:00-12:00',
  location:'钦汇园'
}
export default {
  name:'attendence',
  data(){
    return {
    }
  },
  created(){
  },
  methods:{
    ...mapActions(["changeRuleState"]),
    createRule(){
      store.commit("changeRuleState",'create');
      this.$router.push('/writeRule');
    }
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
  .one-rule .van-col-24:first-child{
    font-weight: bold;
    margin-top: 0;
    font-size: 0.9rem;
  }
  .one-rule .van-col-24{
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }
  
</style>
