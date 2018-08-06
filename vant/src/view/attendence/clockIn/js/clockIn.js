import { Toast } from "vant";
import * as type from "@/assets/js/typeVariable";

export default {
  name: "clockIn",
  data() {
    return {
      type: type,
      time: 1529892675000,
      tabIndex: 0, //tabIndex
      showOnWork: true, //签到按钮
      showAfterWork: false, //已经签退
      punchTime: "", //上班打卡时间
      punchOutTime: "", //下班打卡时间
      punchOutBtnText: "未开始", //签退按钮文字
      outerRecords: [] //外出记录
    };
  },
  mounted: function() {
    this.initRender();
    this.fetchInitData();
  },
  computed: {
    showSignOut() {
      let tag = true;
      if (this.showOnWork) {
        tag = false;
      } else if (this.showAfterWork) {
        tag = false;
      }
      return tag;
    }
  },
  beforeRouteEnter: (to, from, next) => {
    let vm = this;
    let source = from.params.source;
    if (source == type.GOOUTDETAIL || source == type.ADDGOOUT) {
      next(vm => {
        vm.tabIndex = 1;
      });
    } else {
      next();
    }
  },
  methods: {
    //enter detail page
    punchCard(key) {
      if (key == type.SIGNINDETAIL) {
        if (this.showOnWork) {
          Toast("暂无上班打卡详情");
        } else {
          this.$router.push({ name: "clockDetail", params: { source: key } });
        }
      } else if (key == type.SIGNOUTDETAIL) {
        if (this.showAfterWork) {
          this.$router.push({ name: "clockDetail", params: { source: key } });
        } else {
          Toast("暂无下班打卡详情");
        }
      } else {
        this.$router.push({ name: "clockDetail", params: { source: key } });
      }
    },
    fetchInitData() {
      let vm = this;
      this.$axios.get("/api/clock").then(
        res => {
          console.log(res);
        },
        err => {
          vm.$netError(err.response);
        }
      );
    },
    initRender() {
      let params = this.$route.params;
      if (JSON.stringify(params) != "{}") {
        if (params.source == type.SIGNIN) {
          this.showOnWork = false;
          this.punchTime = "09:03";
        }
        if (params.source == type.SIGNOUT) {
          this.showOnWork = false;
          this.punchTime = "09:03";
          this.showAfterWork = true;
          this.punchOutTime = "18:08";
        }
        if (params.source == type.UPDATE) {
          this.showOnWork = false;
          this.punchTime = "09:03";
          this.showAfterWork = true;
          this.punchOutTime = "18:18";
        }
        if (params.source == type.ADDGOOUT) {
          this.outerRecords.push(outers);
        }
      }
    }
  }
};
