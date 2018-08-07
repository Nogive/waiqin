// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "./utils/rem";
import "./assets/js/externalComponents";
import "vant/lib/vant-css/icon-local.css";
import "./assets/fonts/mm-font.css";
import "./assets/css/common.css";
import store from "./store/";

//axios
import axios from "axios";
import qs from "qs";
axios.interceptors.request.use(
  function(config) {
    if (config.url != "http://m.tmall.com") {
      store.dispatch("showLoading"); //通过VUEX管理是否显示loading
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function(response) {
    if (response.config.url != "http://m.tmall.com") {
      store.dispatch("hideLoading");
      response = response.data;
    }
    return response;
  },
  function(error) {
    store.dispatch("hideLoading");
    return Promise.reject(error);
  }
);
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

//filters
import filters from "./utils/filters";
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

//directives
import directives from "./utils/directives";
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});

//request response  cookie session loading
import custom from "./assets/js/custom";
Object.keys(custom).forEach(key => {
  Vue.prototype["$" + key] = custom[key];
});

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

//common api
import { CommonConstants } from "./assets/js/CommonConstants";
Vue.prototype.CommonConstants = CommonConstants;

//照片地址前缀
Vue.prototype.imgPrefix = "http://xfield.oss-cn-hangzhou.aliyuncs.com/";

Vue.config.productionTip = false;
var mmApp = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
