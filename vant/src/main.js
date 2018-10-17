// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from "./App";
import router from "./router";
import "./utils/rem";
import "./assets/js/prototype";
import "./assets/fonts/mm-font.css";
import "./assets/css/common.css";
import store from "./store/";
//cordova init
var app = {
  initialize: function() {
    document.addEventListener(
      "deviceready",
      this.onDeviceReady.bind(this),
      true
    );
    document.addEventListener("pause", this.onPause.bind(this), false);
    document.addEventListener("resume", this.onResume.bind(this), false);
  },
  onDeviceReady: function() {
    console.log("deviceready");
    console.log(mmApp.$getCookie("token"));
  },
  onPause: function() {
    console.log("pause");
    store.dispatch("changeAppState", "pause");
  },
  onResume: function() {
    console.log("resume");
    store.dispatch("changeAppState", "resume");
    let hasToken = mmApp.$checkCookie("token");
    if (hasToken) {
      mmApp.$axios.defaults.headers.common["Authorization"] = mmApp.$getCookie(
        "token"
      );
    } else {
      //app.$router.replace("/login");
    }
  }
};
app.initialize();
Vue.config.productionTip = false;
var mmApp = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
