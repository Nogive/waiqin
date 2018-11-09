// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from "./App";
import router from "./router";
import "./utils/rem";
import "./assets/js/prototype";
import "./assets/fonts/mm-font.css";
import "./assets/css/common.css";
import store from "./store/";

Vue.config.productionTip = false;
var mmApp = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
