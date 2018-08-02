<template>
  <div id="registerPage" class="main">
    <p class="title"><b>外勤专家</b>，欢迎注册~</p>

    <el-form :model="registerForm" status-icon :rules="registerRule" ref="registerForm" class="register-main">
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="registerForm.companyName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input v-model.number="registerForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="公司人数(人)" prop="staffNumber">
        <el-select v-model="registerForm.staffNumber" placeholder="请选择公司人数">
          <el-option label="1-50" value="1"></el-option>
          <el-option label="50-100" value="2"></el-option>
          <el-option label="100+" value="3"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model.number="registerForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="registerForm.checkPassword" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div class="btns">
      <van-button  @click="resetForm('registerForm')">重置</van-button>
      <van-button  class="bg-blue" @click="submitForm('registerForm')">提交</van-button>
      <p class="rb">已有账号？<a href="javascript:;" @click="goLogin" class="blue">直接登录</a></p>
    </div>
  </div>
</template>
<style scoped>
h1, h2 {
  font-weight: normal;
}
.main{
  background: white;
  padding: 2rem 1rem 1rem;
}
.title{
  font-size: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #38f;
  margin-bottom: 1rem;
}
.title b{
  color: #38f;
}
.register-main{
  width: 80%;
  margin: 0 auto;
}
.el-select{
  width: 100%;
}
.rb{
  text-align: right;
  margin-top: 1rem;
}
.rb a{
  text-decoration: underline;
}
.van-button--normal{
  padding: 0 2rem;
}
.bg-blue{
  margin-left: 1rem;
}
.btns{
  width: 80%;
  margin: 0 auto;
}
</style>
<script>
export default {
  name:'register',
  data() {
    return {
      registerForm: {
        companyName: '',
        username:'',
        mobile:'',
        password: '',
        checkPassword: '',
      },
      registerRule: {
        companyName:[
          {required: true, message: '请输入公司名称', trigger: 'blur'}
        ],
        username:[
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        mobile:[
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        password: [
          {required: true, validator: this.validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          {required: true, validator: this.checkPass, trigger: 'blur' }
        ]
      }
    };
  },
  mounted(){
    console.log(this.CommonConstants.JSON_KEY.NAME);
  },
  methods: {
    submitForm(formName) {
      let vm=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param={
            [this.CommonConstants.JSON_KEY.NAME]: this.registerForm.username,
            [this.CommonConstants.JSON_KEY.PASSWORD]: this.registerForm.password,
            [this.CommonConstants.JSON_KEY.COMPANY_NAME]: this.registerForm.companyName,
            [this.CommonConstants.JSON_KEY.MOBILE]: this.registerForm.mobile
          }
          this.$axios.post("http://x.waiqin.co/api/register",param).then(res=>{
            if(res.data.code==vm.CommonConstants.API_CODE.OK){
              Dialog.confirm({
                title: "注册成功",
                message: "恭喜您，账号已成功注册，是否前往登录？"
              }).then(() => {
                vm.$router.replace('/login');
              })
              .catch(() => {
                vm.resetForm('registerForm');
              });
            }else if(res.data.code==vm.CommonConstants.API_CODE.REG_INVALID_MOBILE){
              vm.$toast("不合法的手机号，错误码："+res.data.code);
            }else if(res.data.code==vm.CommonConstants.API_CODE.REG_ALREADY_REGISTERED){
              vm.$toast("该手机号已经被注册，错误码："+res.data.code);
            }else{
              vm.$codeError(res.data,'注册');
            }
          },err=>{
            console.log(err);
            vm.$netError(err.response);
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    validatePass(rule, value, callback){
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.checkPassword !== '') {
          this.$refs.registerForm.validateField('checkPassword');
        }
        callback();
      }
    },
    checkPass(rule, value, callback){
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    },
    goLogin(){
      this.$router.push('/login');
    }
  }
}
</script>


