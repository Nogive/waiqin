// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "./common/js/rem";
import "./common/js/externalComponents";
import "vant/lib/vant-css/icon-local.css";
import "./assets/fonts/mm-font.css";
import "./common/css/common.css";
import store from "./store/";
import VueResource from "vue-resource";
Vue.use(VueResource);
import VueAMap from "vue-amap";
Vue.use(VueAMap);

Vue.config.productionTip = false;

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

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
