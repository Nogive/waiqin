const records = [
  {
    id: 1,
    describe: "上班签到",
    time: "05-30 17:58",
    address: "徐汇区钦州北路1066号靠近钦汇园",
    message: "在外"
  },
  {
    id: 1,
    describe: "下班签退",
    time: "05-30 17:58",
    address: "徐汇区宾阳路58临靠近漕河泾街道社区卫生服务中心",
    message: "在客户处",
    imgSrc: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
  },
  {
    id: 1,
    describe: "外出",
    time: "05-30 17:58",
    address: "徐汇区宾阳路58临靠近漕河泾街道社区卫生服务中心",
    message: "外勤哈哈哈"
  }
];

import * as type from "@/common/js/typeVariable";
export default {
  name: "DailyRecord",
  data() {
    return {
      type: type,
      source: "",
      title: "考勤记录",
      recordsArr: records //打卡记录数据
    };
  },
  created() {
    this.source = this.$route.params.source;
    this.setTitle(this.source);
  },
  methods: {
    setTitle(key) {
      if (key == type.LATE) {
        this.title = "迟到记录";
      }
      if (key == type.LEAVEEARLY) {
        this.title = "早退记录";
      }
      if (key == type.GOOUT) {
        this.title = "外出记录";
      }
      if (key == type.NORMAL) {
        this.title = "正常记录";
      }
    }
  }
};
