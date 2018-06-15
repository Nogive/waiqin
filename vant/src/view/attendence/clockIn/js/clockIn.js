import router from "@/router";
export default {
  name: "clockIn",
  data() {
    return {
      tabIndex: 0,
      showOnWork: true,
      showAfterWork: true,
      punchTime: "",
      punchOutTime: "",
      disable: true,
      punchOutBtnText: "未开始",
      outRecord: false
    };
  },
  created: function() {
    this.initRender();
  },
  methods: {
    reback() {
      router.push("/");
    },
    goPunch() {
      router.push({ name: "clockDetail", params: { source: "gotowork" } });
    },
    detail(time) {
      console.log(time);
      router.push({
        name: "clockDetail",
        params: { source: "detail", time: time }
      });
    },
    initRender() {
      let params = this.$route.params;
      if (JSON.stringify(params) != "{}") {
        if (params.source == "gotowork") {
          this.showOnWork = false;
          this.punchTime = params.punchInTime;
          this.disable = false;
          this.punchOutBtnText = "签退";
        }
      }
    }
  }
};
