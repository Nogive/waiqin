import {
  trim,
  setCookie,
  noData,
  codeError,
  netError,
  showLoading
} from "@/common/js/commonFunc";
import { getRequestUrl } from "@/common/js/api";
import JSEncrypt from "jsencrypt";
import router from "@/router";
const pubKey =
  "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIGetsuNPeHHbKWutJYmpz2aB6F/3uqq/5HhzuI8Sicz32g9ZkpgelcWJeFNBocfEYzpLgp0fHDz+/PStp23ClUCAwEAAQ==";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      userError: false,
      passwordError: false
    };
  },
  methods: {
    preLogin() {
      var vm = this;
      if (this.username != "" && this.password != "") {
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(pubKey);
        let encrypted = encrypt.encrypt(trim(this.password));
        let params = {
          account: trim(this.username),
          password: encrypted
        };
        this.requestLogin(params);
      } else if (this.username == "") {
        this.userError = true;
      } else {
        this.passwordError = true;
      }
    },
    requestLogin(params) {
      showLoading(this, true);
      this.$http
        .post(getRequestUrl("login"), params, {
          emulateJSON: true
        })
        .then(res => {
          if (res.data == undefined) {
            noData();
          } else if (res.data.code == 0) {
            console.log(res.data.data);
            setCookie("token", res.data.data.token);
            router.push("/");
          } else {
            codeError(res.data, "登录");
          }
          showLoading(this, false);
        })
        .catch(xhr => {
          showLoading(this, false);
          netError(xhr.response);
        });
    }
  }
};
