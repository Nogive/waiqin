import router from "@/router";
import { Toast } from "vant";
import * as type from "@/common/js/typeVariable";
const outers = {
  time: "13:00",
  address: "上海市新华路128号",
  message: "拜访客户"
};

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
    console.log(source);
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
          router.push({ name: "clockDetail", params: { source: key } });
        }
      } else if (key == type.SIGNOUTDETAIL) {
        if (this.showAfterWork) {
          router.push({ name: "clockDetail", params: { source: key } });
        } else {
          Toast("暂无下班打卡详情");
        }
      } else {
        router.push({ name: "clockDetail", params: { source: key } });
      }
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
