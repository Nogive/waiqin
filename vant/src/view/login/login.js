import { trim } from "@/assets/js/commonFunc";
import JSEncrypt from "jsencrypt";
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
      params = this.$qs.stringify(params);
      let vm = this;
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
