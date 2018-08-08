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
        <router-link :to="{name:'writeRule',params:{id:item.id}}">
          <van-col span="24">{{item.name}}</van-col>
          <van-col span="24" class="show-one-line">日期：{{item.clockDate.name}}</van-col>
          <van-col span="24" class="show-one-line">时间：{{item.clockTime|clockTimeFormat}}</van-col>
          <van-col span="24" class="show-one-line">位置：{{item.clockPosition|clockPositionFormat}}</van-col>
        </router-link>
      </van-row>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name:'attendence',
  data(){
    return {
      rules:[],
      defaultRule:{}
    }
  },
  created(){
    this.getInitData();
  },
  beforeRouteLeave (to, from, next) {
    let id=to.params.id;
    this.$setSession('ruleId',id);
    next();
  },
  methods:{
    ...mapActions(["changeRuleState"]),
    createRule(){
      this.$store.commit("changeRuleState",'create');
      this.$router.push({name:'writeRule',params:{id:'d'}});
    },
    getInitData(){
      let vm=this;
      this.$axios.get('/api/rule').then(res=>{
        if(res.code==vm.CommonConstants.API_CODE.OK){
          vm.rules=res.data.data;
          vm.defaultRule=res.data.default;
          vm.saveToSession(res.data);
        }
        console.log(res);
      },err=>{
        vm.$netError(err.response);
      })
    },
    saveToSession(data){
      this.$setSession('rd',data.default);
      data.data.forEach(e=>{
        let key="r"+e.id;
        this.$setSession(key,e);
      })
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
