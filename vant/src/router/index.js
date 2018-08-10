import Vue from "vue";
import Router from "vue-router";
import { Toast } from "vant";
Vue.use(Router);

//home
import home from "@/view/home/Home.vue";

//login-login
import login from "@/view/login/Login.vue";
//login-register
import register from "@/view/login/Register.vue";

//404
import page404 from "@/view/default/page404.vue";

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
//日——考勤人员
import dayClockPerson from "@/view/attendence/clockCount/DayClockPerson.vue";
//月——考勤人员
import monthClockPerson from "@/view/attendence/clockCount/MonthClockPerson.vue";

//考勤-规则
import clockRule from "@/view/attendence/clockRule/ClockRule.vue";
//新增、编辑规则
import writeRule from "@/view/attendence/clockRule/WriteRule.vue";
//设置规则名称
import setRuleName from "@/view/attendence/clockRule/SetRuleName.vue";
//设置打卡人员
import setClockPerson from "@/view/attendence/clockRule/SetClockPerson.vue";
//设置打卡日期
import setClockDate from "@/view/attendence/clockRule/SetClockDate.vue";
//设置打卡时间
import setClockTime from "@/view/attendence/clockRule/SetClockTime.vue";
//设置打卡位置
import setLocation from "@/view/attendence/clockRule/SetLocation.vue";
//设置打卡地点
import setClockPlace from "@/view/attendence/clockRule/SetClockPlace.vue";

//测试打卡人员
import testPerson from "@/view/attendence/clockRule/TestPerson.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: home
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/register",
    name: "register",
    component: register
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
    path: "/setRuleName",
    name: "setRuleName",
    component: setRuleName
  },
  {
    path: "/setClockPerson",
    name: "setClockPerson",
    component: setClockPerson
  },
  {
    path: "/setClockDate",
    name: "setClockDate",
    component: setClockDate
  },
  {
    path: "/setClockTime",
    name: "setClockTime",
    component: setClockTime
  },
  {
    path: "/setLocation",
    name: "setLocation",
    component: setLocation
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
    path: "/dayClockPerson",
    name: "dayClockPerson",
    component: dayClockPerson
  },
  {
    path: "/monthClockPerson",
    name: "monthClockPerson",
    component: monthClockPerson
  },
  {
    path: "/testPerson",
    name: "testPerson",
    component: testPerson
  },
  {
    path: "*",
    //component: page404,
    component: home
  }
];
const router = new Router({
  scrollBehavior: () => ({
    y: 0
  }),
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
