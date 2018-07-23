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
      <van-row class="one-rule" v-for="(item,index) in rules" :key="index">
        <router-link :to="{name:'writeRule',params:{index:index}}">
          <van-col span="24">{{item.name}}</van-col>
          <van-col span="24" class="show-one-line">日期：{{item.date}}</van-col>
          <van-col span="24" class="show-one-line">时间：{{item.time}}</van-col>
          <van-col span="24" class="show-one-line">位置：{{item.location}}</van-col>
        </router-link>
      </van-row>
    </div>
  </div>
</template>
<script>
const rules=[
  {
    id:1,
    name: "每周2次打卡",
    staff: "麦芒",
    date: "周一至周日",
    time: "09:00-18:00",
    location: "乾坤大厦"
  },
  {
    id:2,
    name: "每周4次考勤",
    staff: "麦芒",
    date: "周一至周五",
    time: "09:00-18:00",
    location: "钦汇园"
  }
];
const defaultRule = {
  name: "每周2次打卡",
  staff: "麦芒",
  date: "周一至周五",
  time: "09:00-18:00",
  location: "无限制"
};
import { mapGetters, mapActions } from "vuex";
import { setSession, getSession } from "@/assets/js/commonFunc";
export default {
  name:'attendence',
  data(){
    return {
      rules:rules
    }
  },
  created(){
  },
  beforeRouteLeave(to, from, next){
    let index=to.params.index;
    if(index==undefined){
      setSession('rule',defaultRule);
    }else{
      setSession('rule',this.rules[index]);
    }
    next();
  },
  methods:{
    ...mapActions(["changeRuleState"]),
    createRule(){
      this.$store.commit("changeRuleState",'create');
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
