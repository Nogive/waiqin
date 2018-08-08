<template>
  <div class="rule-box">
    <van-nav-bar
      title="规则名称"
      left-arrow
      left-text="返回"
      right-text="确定"
      @click-left="$router.back()"
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name:'attendence',
  data(){
    return {
      ruleName:'',
      showError:false,
      ruleId:'',
      currentRule:{},//当前规则
    }
  },
  computed:{
    ...mapGetters(['rule_state'])
  },
  created(){
    this.ruleId=this.$getSession('ruleId');
    this.currentRule=this.$getSession('r'+this.ruleId);
    this.ruleName=this.currentRule.name;
  },
  methods:{
    setName() {
      if (this.ruleName == "") {
        this.showError = true;
      } else {
        this.currentRule.name=this.ruleName;
        this.$setSession('r'+this.ruleId,this.currentRule);
        this.$router.back();
      }
    }
  }
}
</script>

<style scoped>
  .van-cell-group{
    margin-top: 0.7rem;
  }
</style>
