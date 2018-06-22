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

import router from "@/router";
export default {
  name: "DailyRecord",
  data() {
    return {
      source: "", //来源
      recordsArr: records //打卡记录数据
    };
  },
  mounted() {
    this.source = this.$route.params.source;
    console.log(this.$route.params);
  },
  computed: {
    title() {
      let title = "打卡记录";
      if (this.source.search("late") >= 0) {
        title = "迟到记录";
      }
      if (this.source.search("leave") >= 0) {
        title = "早退记录";
      }
      if (this.source.search("out") >= 0) {
        title = "外出记录";
      }
      return title;
    }
  },
  methods: {
    goBack() {
      if (this.source == "self") {
        router.push({ name: "clockHistory", params: { source: this.source } });
      } else if (this.source.search("Depart") >= 0) {
        let idx = this.source.search("Depart");
        router.push({
          name: "normalClockPerson",
          params: { source: this.source.slice(0, idx) }
        });
      } else if (this.source.search("all") >= 0) {
        router.push({ name: "monthlyRecord", params: { source: "all" } });
      } else {
        router.push({ name: "monthlyRecord", params: { source: "self" } });
      }
    }
  }
};
