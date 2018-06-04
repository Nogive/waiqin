// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "./common/commonFunc";
import "./common/rem";
import "./common/vant";
import Vue from "vue";
import App from "./App";
import router from "./router";
import "vant/lib/vant-css/icon-local.css";
import "./assets/fonts/mm-font.css";
import "./common.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
