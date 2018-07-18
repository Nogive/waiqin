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
axios.interceptors.request.use(
  function(config) {
    store.dispatch("showLoading"); //通过VUEX管理是否显示loading
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function(response) {
    store.dispatch("hideLoading");
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);
Vue.prototype.$http = axios;

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

//map
import VueAMap from "vue-amap";
import { Toast } from "vant";
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

Vue.config.productionTip = false;

var app = {
  initialize: function() {
    document.addEventListener(
      "deviceready",
      this.onDeviceReady.bind(this),
      false
    );
    document.addEventListener("pause", this.onPause.bind(this), false);
    document.addEventListener("resume", this.onResume.bind(this), false);
  },
  onDeviceReady: function() {
    console.log("deviceready");
    cordova.exec(
      function(data) {
        console.log(data);
      },
      function(err) {
        console.log(err);
      },
      "Location",
      "start",
      []
    );
  },
  onPause: function() {
    console.log("pause");
    let currentPath = store.state.fullpath;
    console.log(currentPath);
  },
  onResume: function() {
    console.log("resume");
    let currentPath = store.state.fullpath;
    console.log(currentPath);
  }
};
app.initialize();

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
