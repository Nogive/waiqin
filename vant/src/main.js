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

//resource
// import VueResource from "vue-resource";
// Vue.use(VueResource);

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

//axios
import axios from "axios";
import { Store } from "vuex";
axios.interceptors.request.use(
  config => {
    store.dispatch("showLoading");
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    store.dispatch("hideLoading");
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
//配置post请求的头部信息
//axios.defaults.headers.post["Content-Type"] ="application/x-www-form-urlencoded";
Vue.prototype.$http = axios;

Vue.config.productionTip = false;
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
