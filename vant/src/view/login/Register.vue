<template>
  <div id="registerPage" class="reg-wrapper">
    <p class="title"><b>外勤专家</b>，欢迎注册~</p>
    <div class="reg-main">
      <van-cell-group>
        <van-field @blur="formdata.telphone.blur()" clearable label="手机号" v-model="formdata.telphone.value" placeholder="请输入手机号" :error-message="formdata.telphone.errMsg" />
        <van-field clearable v-model="ims" center label="图片验证码" placeholder="点击图片刷新验证码" class="ims-content">
          <template slot="button">
            <img :src="imsSrc" alt="" class="ims-img">
          </template>
        </van-field>
        <van-field clearable v-model="sms" center label="短信验证码" placeholder="请输入短信验证码">
          <van-button slot="button" size="small" type="primary" @click="sendSms">发送验证码</van-button>
        </van-field>
        <van-field clearable label="企业名称" v-model="company" placeholder="请输入企业名称" style="margin-top:2rem" />
        <van-field clearable label="企业人数" v-model="personNumber" type="number" placeholder="请输入企业人数" />
        <van-field clearable label="密码" v-model="password" type="password" placeholder="请输入密码" />
        <van-field clearable label="确认密码" v-model="rePassword" type="password" placeholder="请再次输入密码" />
      </van-cell-group>
    </div>
    <div class="btns">
      <van-button>重置</van-button>
      <van-button  class="bg-blue" @click="submitForm()">提交</van-button>
      <p class="a-text">已有账号？<a href="javascript:;" @click="goLogin" class="blue">直接登录</a></p>
    </div>
  </div>
</template>
<style scoped lang="stylus">
@import "../../assets/stylus/mixin.styl";
.reg-wrapper
  height 100%
  background white
  padding 2rem 0
  .title
    font-size 1rem
    padding-bottom 1.5rem
    padding-left 1rem
    border-bottom 1px solid #38f
    margin-bottom 0
    b
      font-color(#38f)
  .reg-main
    .ims-content
      .van-field__button
        .ims-img
          width 90px
  .btns
    margin 2rem auto 0
    text-align center
    .van-button
      padding 0 2rem
      margin-left 10px
    .a-text
      margin-top 1rem 
</style>
<script>
const imsPre='data:image/jpg;base64,';
const base64="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";
var formdata={
  telphone:{
    value:'',
    type:'string',
    submit:true,
    errMsg:'',
  },
  ims:{
    value:'',
    type:'string',
    submit:false,
    errMsg:'',
  },
  sms:{
    value:'',
    type:'string',
    submit:true,
    errMsg:'',
  },
  company:{
    value:'',
    type:'string',
    submit:true,
    errMsg:'',
  },
  personNumber:{
    value:'',
    type:'number',
    submit:true,
    errMsg:'',
  },
  password:{
    value:'',
    type:'string',
    submit:true,
    errMsg:'',
  }
}
export default {
  name:'register',
  data() {
    return {
      telphone:"",
      sms:'',
      ims:'',
      company:'',
      personNumber:'',
      password:'',
      rePassword:'',
      imsSrc:imsPre+base64,
      formdata:formdata
    };
  },
  created(){
  },
  methods: {
    sendSms(){
      if(this.ims==""){
        this.$toast.loading({
          mask: true,
          message: '加载中...'
        });
      }else{
        console.log("send sms");
      }
    },
    submitForm() {
      
    },
    validateForm(){

    },
    onBlur(){
      console.log('blur')
    },
    goLogin(){
      this.$router.push('/login');
    }
  }
}
</script>


