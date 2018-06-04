import Vue from "vue";
import Router from "vue-router";
import Home from "../view/home/Home.vue";
import Login from "../view/login/Login.vue";
import { Toast } from "vant";
import attendenceClockin from "../view/attendence/clockin/Clockin.vue";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/clockin",
    name: "clockin",
    component: attendenceClockin
  }
];
const router = new Router({
  mode: "history",
  routes
});
router.beforeEach((to, from, next) => {
  if (to.path == "/404") {
    Toast("敬请期待！");
  } else {
    next();
  }
});
export default router;
