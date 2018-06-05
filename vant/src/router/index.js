import Vue from "vue";
import Router from "vue-router";
import Home from "../view/home/Home.vue";
import Login from "../view/login/Login.vue";
import { Toast } from "vant";
import attendenceClockin from "../view/attendence/clockin/Clockin.vue";
import attendenceClockDetail from "../view/attendence/clockin/ClockDetail.vue";

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
    path: "/clockin", //打卡
    name: "clockin",
    component: attendenceClockin
  },
  {
    path: "/clockDetail", //打卡详情
    name: "clockDetail",
    component: attendenceClockDetail
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
