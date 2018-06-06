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

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
