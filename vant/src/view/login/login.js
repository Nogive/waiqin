import { trim } from "@/assets/js/commonFunc";
import { getClientVersion, getApiVersion } from "@/utils/native";
import JSEncrypt from "jsencrypt";
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
      encrypt.setPublicKey(vm.CommonConstants.PUBLIC_KEY);
      let encrypted = encrypt.encrypt(trim(this.loginForm.password));
      let params;
      Promise.all([getClientVersion(), getApiVersion()]).then(function([
        cv,
        av
      ]) {
        params = {
          [vm.CommonConstants.JSON_KEY.ACCOUNT]: vm.loginForm.account,
          [vm.CommonConstants.JSON_KEY.PASSWORD]: encrypted,
          [vm.CommonConstants.JSON_KEY.IMEI]: device.uuid,
          [vm.CommonConstants.JSON_KEY.DEVICE_TYPE]: vm.getDeviceType(),
          [vm.CommonConstants.JSON_KEY.DEVICE_INFO]:
            device.manufacturer + "-" + device.model + "-" + device.version,
          [vm.CommonConstants.JSON_KEY.CLIENT_VERSION]: cv,
          [vm.CommonConstants.JSON_KEY.API_VERSION]: av
        };
        console.log(params);
        vm.$axios
          .post("http://x.waiqin.co/api/login", params)
          .then(res => {
            console.log(res);
            if (res == undefined) {
              noData();
            } else if (res.code == vm.CommonConstants.API_CODE.OK) {
              //vm.$axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
              vm.$setCookie("token", res.data, 10);
              vm.$router.push("/");
            } else if (
              res.code == vm.CommonConstants.API_CODE.AUTH_INVALID_ACCOUNT
            ) {
              vm.$toast("不合法的账户，错误码：" + res.code);
            } else if (
              res.code == vm.CommonConstants.API_CODE.AUTH_INVALID_PASSWORD
            ) {
              vm.$toast("密码错误，错误码：" + res.code);
            } else if (
              res.code == vm.CommonConstants.API_CODE.AUTH_INACTIVE_ACCOUNT
            ) {
              vm.$toast("未激活账户，错误码：" + res.code);
            } else if (res.code == vm.CommonConstants.API_CODE.AUTH_FAILED) {
              vm.$toast("登录失败，错误码：" + res.code);
            } else {
              vm.$codeError(res, "登录");
            }
          })
          .catch(error => {
            vm.$netError(error);
          });
      });
    },
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
    }
  }
};
