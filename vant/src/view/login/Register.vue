<template>
  <div id="registerPage" class="reg-wrapper">
    <p class="title"><b>外勤专家</b>，欢迎注册~</p>
    <div class="reg-main">
      <van-cell-group>
        <van-field clearable label="手机号" v-model="formdata.mobile.value" placeholder="请输入手机号" :error-message="formdata.mobile.errMsg" @focus="onFocus('mobile')" />
        <van-field clearable v-model="formdata.ims.value" center label="图片验证码" placeholder="点击图片刷新验证码" class="ims-content" :error-message="formdata.ims.errMsg" @focus="onFocus('ims')">
          <template slot="button">
            <img :src="imgSrc" alt="点击加载" class="ims-img" @click="loadImgCode">
          </template>
        </van-field>
        <van-field clearable v-model="formdata.verificationCode.value" center label="短信验证码" placeholder="请输入短信验证码" :error-message="formdata.verificationCode.errMsg" @focus="onFocus('verificationCode')">
          <van-button slot="button" size="small" type="primary" @click="sendSms">发送验证码</van-button>
        </van-field>
        <van-field clearable label="企业名称" v-model="formdata.name.value" placeholder="请输入企业名称" :error-message="formdata.name.errMsg" @focus="onFocus('name')" style="margin-top:2rem" />
        <van-field clearable label="企业人数" v-model="formdata.employees.value" type="number" placeholder="请输入企业人数" :error-message="formdata.employees.errMsg" @focus="onFocus('employees')" />
        <van-field clearable label="密码" v-model="formdata.password.value" type="password" placeholder="请输入密码" :error-message="formdata.password.errMsg" @focus="onFocus('password')" />
        <van-field clearable label="确认密码" v-model="formdata.rePassword.value" type="password" placeholder="请再次输入密码" :error-message="formdata.rePassword.errMsg" @focus="onFocus('rePassword')" />
      </van-cell-group>
    </div>
    <div class="btns">
      <van-button  class="bg-blue" @click="submitForm()">提交并注册</van-button>
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
import { XFieldApi,accountApi,errorCode } from "@/assets/js/api";
import { code } from "@/assets/js/constants";
var formdata={
  mobile:{
    value:'',
    type:'string',
    submit:true,
    valid:true,
    errMsg:'',
  },
  ims:{
    value:'',
    type:'string',
    submit:false,
    errMsg:'',
  },
  verificationCode:{
    value:'',
    type:'string',
    submit:true,
    valid:true,
    errMsg:'',
  },
  name:{
    value:'',
    type:'string',
    submit:true,
    valid:true,
    errMsg:'',
  },
  employees:{
    value:'',
    type:'number',
    submit:true,
    valid:true,
    errMsg:'',
  },
  password:{
    value:'',
    type:'string',
    submit:true,
    valid:true,
    errMsg:'',
  },
  rePassword:{
    value:'',
    type:'string',
    submit:false,
    valid:true,
    errMsg:'',
  }
}
export default {
  name:'register',
  data() {
    return {
      imgSrc:"",
      currentIms:{},
      formdata:formdata
    };
  },
  created(){
    this.loadImgCode();
  },
  methods: {
    loadImgCode(){
      let _this=this;
      accountApi.getCaptchaImage(function(error,data,res){
        if(res.statusCode==code.OK){
          if(_this.$isEmpty(data)){
            _this.$noData();
          }else{
            _this.currentIms=data;
            _this.imgSrc=imsPre+data.data;
          }
        }else{
          _this.$error(res.statusCode);
        }
      })
    },
    //发送验证码
    sendSms(){
      let _this=this;
      if(this.formdata.mobile.value==""){
        this.$toast('请填写手机号');
      }else if(this.formdata.ims.value==""){
        this.$toast('请填写图片验证码');
      }else{
        let mockbody={
          mobile:this.formdata.mobile.value,
          captchaId:this.currentIms.id,
          captchaAnswer:this.formdata.ims.value,
        }
        let body=new XFieldApi.VerificationCodeRequest.constructFromObject(mockbody);
        accountApi.getVerificationCode(body,(error,data,res)=>{
          if(res.statusCode==code.OK){
            _this.$toast("短信验证码已发送，请注意查收。");
          }else{
            console.log(res);
          }
        })
      }
    },
    //提交注册请求
    submitForm() {
      if(this.validateForm()){
        let mockbody=this.collectedData();
        let body=new XFieldApi.Register.constructFromObject(mockbody);
        accountApi.register(body,(erroe,data,res)=>{
          console.log(res);
          console.log(data);
        })
      }
    },
    //验证必填
    validateForm(){
      let res=true;
      let telReg=/0?(13|14|15|18)[0-9]{9}/;
      let passReg = /\s+/;//一个或多个空格
      for(let obj in this.formdata){
        let v=this.formdata[obj];
        if(v.value==""){
          v.errMsg="必填"
          res=false;
        }else if(obj=="mobile" && !telReg.test(v.value)){
          v.errMsg="电话号码格式不正确"
          res=false;
        }else if(obj=="password"){
          if(passReg.test(v.value)){
            v.errMsg="密码中含有空格"
            res=false;
          }else if(v.value.length<6){
            v.errMsg="密码长度不足6位"
            res=false;
          }
        }else if(obj=="rePassword"&&v.value!=this.formdata.password.value){
          v.errMsg="两次密码不一致"
          res=false;
        }
      }
      return res;
    },
    //取消错误提示
    onFocus(str){
      this.formdata[str].errMsg="";
    },
    //收集数据
    collectedData(){
      let res={};
      for(let obj in this.formdata){
        let v=this.formdata[obj];
        if(v.submit){
          if(v.type=="number"){
            res[obj]=parseInt(v.value);
          }else{
            res[obj]=v.value;
          }
        }
      }
      return res;
    },
    goLogin(){
      this.$router.push('/login');
    }
  }
}
</script>


