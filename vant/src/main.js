// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "./utils/rem";
import "./assets/js/externalComponents";
import "./assets/js/prototype";
import "vant/lib/vant-css/icon-local.css";
import "./assets/fonts/mm-font.css";
import "./assets/css/common.css";
import store from "./store/";

//map
import VueAMap from "vue-amap";
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: "e1dedc6bdd765d46693986ff7ff969f4",
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
    "AMap.Geolocation"
  ],
  uiVersion: "1.0"
});
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
