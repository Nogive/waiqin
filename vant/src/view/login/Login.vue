<template>
  <div class="login-box" id="loginPage">
    <p class="title"><b>外勤专家</b>，欢迎登录~</p>
    <img src="../../assets/images/logo.png" class="logo">
    <div class="login-main">
      <van-cell-group>
        <van-field clearable label="账号" v-model="loginData.account.value" placeholder="请输入账号" :error-message="loginData.account.errMsg" @focus="onFocus('account')" />
        <van-field type="password" clearable label="密码" v-model="loginData.password.value" placeholder="请输入密码" :error-message="loginData.password.errMsg" @focus="onFocus('password')" />
      </van-cell-group>
    </div>
    <div class="btns">
      <van-button class="bg-blue" @click="onLogin()">登录</van-button>
      <van-row class="register-find">
        <van-col :span="12" class="text-left">
          <p>没有账号？<a href="javascript:;" @click="goRegister" class="blue">前往注册</a></p>
        </van-col>
        <van-col :span="12" class="text-right">
          <p>忘记密码？<a href="javascript:;" @click="findPassword" class="blue">找回密码</a></p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
var loginData={
  account:{
    value:'',
    type:'string',
    submit:true,
    valid:true,
    errMsg:'',
  },
  password:{
    value:'',
    type:'string',
    submit:false,
    errMsg:'',
  }
}
import { getClientVersion, getApiVersion } from "@/utils/native";
import { publicKey } from "@/assets/js/common";
import JSEncrypt from "jsencrypt";
import { accountApi,callApi,custom } from "@/assets/js/api";
export default {
  name: "login",
  data() {
    return {
      loginData:loginData,
    }
  },
  created(){
    this.loginData.account.value="";
    this.loginData.password.value="";
    console.log(this.$getSession('user'));
  },
  methods:{
    encryptPassword(){
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey);
      let encrypted = encrypt.encrypt(this.loginData.password.value);
      return encrypted;
    },
    onLogin(){
      let _this=this;
      let params;
      if(this.validateForm()){
        //手动登录
        params={
          account:_this.loginData.account.value,
          password:_this.encryptPassword(),
          deviceType:"ANDROID",
          imei:"123",
          deviceInfo:"android",
          clientVersion:"1.1.0",
          apiVersion:1
        };
        callApi(accountApi,'login',params).then(res=>{
          console.log("login:",res);
          _this.$setSession('user',res)
          _this.$router.replace('/');
        },err=>{
          console.log(err);
        })
        /*cordova 登录
        Promise.all([getClientVersion(), getApiVersion()]).then(function([cv,]){
          params={
            account:_this.loginData.account.value,
            password:_this.encryptPassword(),
            deviceType:_this.getDeviceType(),
            imei:device.uuid,
            deviceInfo:device.manufacturer + "-" + device.model + "-" + device.version,
            clientVersion:cv,
            apiVersion:av
          }
          callApi(accountApi,'login',params).then(res=>{
            console.log("login:",res);
            _this.$setSession('user',data)
            _this.router.replace('/');
          },err=>{
            console.log(err);
          })
        })
        */
      }
    },
    //验证必填
    validateForm(){
      let res=true;
      for(let obj in this.loginData){
        let v=this.loginData[obj];
        if(v.value==""){
          res=false;
          if(obj=="account"){
            v.errMsg="账号不能为空"
          }else{
            v.errMsg="密码不能为空"
          }
        }
      }
      return res;
    },
    onFocus(str){
      this.loginData[str].errMsg="";
    },
    //获取设备类型
    getDeviceType() {
      let type;
      let platform = device.platform;
      if (platform == "Android") {
        type = this.CommonConstants.DEVICE_TYPE.ANDROID;
      } else if (platform == "iOS") {
        type = this.CommonConstants.DEVICE_TYPE.IOS;
      } else {
        type = this.CommonConstants.DEVICE_TYPE.WEB;
      }
      return type;
    },
    goRegister(){
      this.$router.push("/register");
    },
    findPassword(){
      console.log('找回密码');
    }
  }
}
</script>

<!-- <script src="./login.js"></script>-->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo{
  width: 50%;
  margin-top: 1.5rem;
}
h1, h2 {
  font-weight: normal;
}
.login-box{
  text-align: center;
  background: white;
  padding-top: 2rem;
  padding-bottom: 2rem;
  height: 100%;
  overflow-y: auto;
}
.login-main{
  margin-top: 2rem;
}
.title{
  font-size: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #38f;
  padding-bottom: 1rem;
}
.title b{
  color: #38f;
}
.el-form{
  width: 80%;
  margin: 0 auto;
}
.van-col-12 a{
  text-decoration: underline;
}
.van-button--normal{
  padding: 0 2rem;
}
.bg-blue{
  margin-left: 1rem;
}
.btns{
  margin: 2rem 0 1rem;
}
.register-find{
  width: 80%;
  margin: 2rem auto;
}
</style>
