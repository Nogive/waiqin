import Router from "vue-router";
Vue.use(Router);
const routes = [
  {
    path: "/",
    component: () => import("@/view/home/Home.vue"),
    meta: {
      title: "首页"
    },
    children: [
      {
        path: "/",
        name: "workbench",
        component: () => import("@/view/home/workbench.vue"),
        meta: {
          title: "工作台"
        }
      },
      {
        path: "aboutMe",
        name: "aboutMe",
        component: () => import("@/view/home/aboutMe.vue"),
        meta: {
          title: "我的"
        }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/view/login/Login.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/view/login/Register.vue"),
    meta: {
      title: "注册"
    }
  },
  {
    path: "/clockHome", //打卡
    component: () => import("@/view/attendence/clockHome/ClockHome.vue"),
    meta: {
      title: "考勤"
    },
    children: [
      {
        path: "/",
        name: "clockIn",
        component: () => import("@/view/attendence/clockIn/ClockIn.vue"),
        meta: {
          title: "打卡"
        }
      },
      {
        path: "clockCount",
        name: "clockCount",
        component: () => import("@/view/attendence/clockCount/ClockCount.vue"),
        meta: {
          title: "统计"
        }
      },
      {
        path: "clockRule",
        name: "clockRule",
        component: () => import("@/view/attendence/clockRule/ClockRule.vue"),
        meta: {
          title: "规则"
        }
      }
    ]
  },
  {
    path: "/clockDetail",
    name: "clockDetail",
    component: () => import("@/view/attendence/clockIn/ClockDetail.vue"),
    meta: {
      title: "打卡详情"
    }
  },
  {
    path: "/writeRule",
    name: "writeRule",
    component: () => import("@/view/attendence/clockRule/WriteRule.vue"),
    meta: {
      title: "新建规则",
      editTitle: "编辑规则"
    }
  },
  {
    path: "/setRuleName",
    name: "setRuleName",
    component: () => import("@/view/attendence/clockRule/SetRuleName.vue"),
    meta: {
      title: "规则名称"
    }
  },
  {
    path: "/setClockPerson",
    name: "setClockPerson",
    component: () => import("@/view/attendence/clockRule/SetClockPerson.vue"),
    meta: {
      title: "打卡人员"
    }
  },
  {
    path: "/setClockDate",
    name: "setClockDate",
    component: () => import("@/view/attendence/clockRule/SetClockDate.vue"),
    meta: {
      title: "打卡日期"
    }
  },
  {
    path: "/setClockTime",
    name: "setClockTime",
    component: () => import("@/view/attendence/clockRule/SetClockTime.vue"),
    meta: {
      title: "打卡时间"
    }
  },
  {
    path: "/setLocation",
    name: "setLocation",
    component: () => import("@/view/attendence/clockRule/SetLocation.vue"),
    meta: {
      title: "打卡地点"
    }
  },
  {
    path: "/setClockPlace",
    name: "setClockPlace",
    component: () => import("@/view/attendence/clockRule/SetClockPlace.vue"),
    meta: {
      title: "打卡地点"
    }
  },
  {
    path: "/clockHistory",
    name: "clockHistory",
    component: () => import("@/view/attendence/clockCount/ClockHistory.vue"),
    meta: {
      title: "打卡历史记录"
    }
  },
  {
    path: "/dailyRecord",
    name: "dailyRecord",
    component: () => import("@/view/attendence/clockCount/DailyRecord.vue"),
    meta: {
      title: "日记录"
    }
  },
  {
    path: "/monthlyRecord",
    name: "monthlyRecord",
    component: () => import("@/view/attendence/clockCount/MonthlyRecord.vue"),
    meta: {
      title: "月记录"
    }
  },
  {
    path: "/normalClock",
    name: "normalClock",
    component: () => import("@/view/attendence/clockCount/NormalClock.vue"),
    meta: {
      title: "正常打卡记录"
    }
  },
  {
    path: "/clockDetailForDepart",
    name: "clockDetailForDepart",
    component: () =>
      import("@/view/attendence/clockCount/ClockDetailForDepart.vue"),
    meta: {
      title: "部门打卡详情"
    }
  },
  {
    path: "/dayClockPerson",
    name: "dayClockPerson",
    component: () => import("@/view/attendence/clockCount/DayClockPerson.vue")
  },
  {
    path: "/monthClockPerson",
    name: "monthClockPerson",
    component: () => import("@/view/attendence/clockCount/MonthClockPerson.vue")
  },
  {
    path: "/testPerson",
    name: "testPerson",
    component: () => import("@/view/attendence/clockRule/TestPerson.vue")
  },
  {
    path: "/ncform",
    name: "ncform",
    component: () => import("@/components/ncform.vue")
  },
  {
    path: "*",
    //component:()=>import("@/view/default/page404.vue") ,
    component: () => import("@/view/home/Home.vue")
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
