import axios from "axios";
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
    logIn() {
      if (this.username != "" && this.password != "") {
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(pubKey);
        let encrypted = encrypt.encrypt(Trim(this.password));
        let params = {
          account: Trim(this.username),
          password: encrypted
        };
        requestLogin(params);
      } else if (this.username == "") {
        this.userError = true;
      } else {
        this.passwordError = true;
      }
    }
  }
};
const tempUrl = "http://mjp.waiqin.co/api/v1/authentication";
function requestLogin(params) {
  console.log(params);
  axios
    .post(tempUrl, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch(xhr => {
      console.log(xhr);
    });
}
function Trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
