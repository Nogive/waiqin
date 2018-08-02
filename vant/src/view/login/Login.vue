<template>
  <div class="login-box" id="loginPage">
    <!-- <img src="../../assets/images/logo.jpg" class="logo"> -->
    <p class="title"><b>外勤专家</b>，欢迎登录~</p>
    <el-form :model="loginForm" status-icon :rules="loginRule" ref="loginForm" class="register-main">
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginForm.account" auto-complete="off" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div class="btns">
      <van-button @click="resetForm('loginForm')">重置</van-button>
      <van-button class="bg-blue" @click="submitForm('loginForm')">登录</van-button>
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
<script src="./login.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo{
  width: 50%;
  border-radius: 50%;
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
