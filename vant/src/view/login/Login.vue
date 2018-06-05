<template>
  <div class="login-box">
    <img src="../../assets/images/logo.jpg" class="logo">
    <p>欢迎登录！</p>
    <van-cell-group>
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        :error="userError"
        @click-icon="username = ''"
        @click="userError=false"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        icon="clear"
        placeholder="请输入密码"
        required
        :error="passwordError"
        @click-icon="password = ''"
        @click="passwordError=false"
      />
    </van-cell-group>
    <van-button class="large-btn" @click='logIn'>登录</van-button>
  </div>
</template>

<script src="./login.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.login-box{
  text-align: center;
  height: -webkit-fill-available;
  background: white;
  padding-top: 6rem;
}
</style>
