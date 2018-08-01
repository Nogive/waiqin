import { trim } from "@/assets/js/commonFunc";
import JSEncrypt from "jsencrypt";
const pubKey =
  "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIGetsuNPeHHbKWutJYmpz2aB6F/3uqq/5HhzuI8Sicz32g9ZkpgelcWJeFNBocfEYzpLgp0fHDz+/PStp23ClUCAwEAAQ==";

export default {
  name: "login",
  data() {
    return {
      loginForm: {
        account: "",
        password: ""
      },
      loginRule: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.encryptAndLogin();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goRegister() {
      this.$router.push("/register");
    },
    findPassword() {
      console.log("找回密码");
    },
    encryptAndLogin() {
      var vm = this;
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(pubKey);
      let encrypted = encrypt.encrypt(trim(this.loginForm.password));
      let params = this.$qs.stringify({
        account: this.loginForm.account,
        password: encrypted
      });
      this.$axios
        .post("/api/authentication", params)
        .then(res => {
          console.log(res);
          if (res.data == undefined) {
            noData();
          } else if (res.data.code == 0) {
            //vm.$axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
            vm.$setCookie("token", res.data.data.token, 10);
            vm.$router.push("/");
          } else {
            vm.$codeError(res.data, "登录");
          }
        })
        .catch(error => {
          vm.$netError(error);
        });
    }
  }
};
