import Vue from "vue";
import Router from "vue-router";
import Home from "@/view/home/Home.vue";
import Login from "@/view/login/Login.vue";
import { Toast } from "vant";
Vue.use(Router);

//考勤
import clockHome from "@/view/attendence/clockHome/ClockHome.vue";

//考勤-打卡
import clockIn from "@/view/attendence/clockIn/ClockIn.vue";
//打卡详情
import clockDetail from "@/view/attendence/clockIn/ClockDetail.vue";

//考勤-统计
import clockCount from "@/view/attendence/clockCount/ClockCount.vue";
//我的考勤历史
import clockHistory from "@/view/attendence/clockCount/ClockHistory.vue";
//打卡记录(日)
import dailyRecord from "@/view/attendence/clockCount/DailyRecord.vue";
//考勤月报表
import monthlyRecord from "@/view/attendence/clockCount/MonthlyRecord.vue";
//正常考勤
import normalClock from "@/view/attendence/clockCount/NormalClock.vue";
//考勤详情(部门)
import clockDetailForDepart from "@/view/attendence/clockCount/ClockDetailForDepart.vue";
//正常考勤人员
import normalClockPerson from "@/view/attendence/clockCount/NormalClockPerson.vue";

//考勤-规则
import clockRule from "@/view/attendence/clockRule/ClockRule.vue";
//新增、编辑规则
import writeRule from "@/view/attendence/clockRule/WriteRule.vue";
//设置打卡人员
import setClockPerson from "@/view/attendence/clockRule/SetClockPerson.vue";
//设置打卡地点
import setClockPlace from "@/view/attendence/clockRule/SetClockPlace.vue";

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
    path: "/clockHome", //打卡
    component: clockHome,
    children: [
      {
        path: "/",
        name: "clockIn",
        component: clockIn
      },
      {
        path: "clockCount",
        name: "clockCount",
        component: clockCount
      },
      {
        path: "clockRule",
        name: "clockRule",
        component: clockRule
      }
    ]
  },
  {
    path: "/clockDetail",
    name: "clockDetail",
    component: clockDetail
  },
  {
    path: "/writeRule",
    name: "writeRule",
    component: writeRule
  },
  {
    path: "/setClockPerson",
    name: "setClockPerson",
    component: setClockPerson
  },
  {
    path: "/setClockPlace",
    name: "setClockPlace",
    component: setClockPlace
  },
  {
    path: "/clockHistory",
    name: "clockHistory",
    component: clockHistory
  },
  {
    path: "/dailyRecord",
    name: "dailyRecord",
    component: dailyRecord
  },
  {
    path: "/monthlyRecord",
    name: "monthlyRecord",
    component: monthlyRecord
  },
  {
    path: "/normalClock",
    name: "normalClock",
    component: normalClock
  },
  {
    path: "/clockDetailForDepart",
    name: "clockDetailForDepart",
    component: clockDetailForDepart
  },
  {
    path: "/normalClockPerson",
    name: "normalClockPerson",
    component: normalClockPerson
  }
];
const router = new Router({
  //mode: "history",
  routes
});
router.beforeEach((to, from, next) => {
  if (to.path == "/comingSoon") {
    Toast("敬请期待！");
  } else {
    next();
  }
});
export default router;
