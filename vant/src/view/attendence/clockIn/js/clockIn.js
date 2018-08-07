import { Toast } from "vant";
import * as type from "@/assets/js/typeVariable";

export default {
  name: "clockIn",
  data() {
    return {
      type: type,
      time: 1529892675000,
      tabIndex: 0, //tabIndex
      workRules: [], //当前用户打卡规则
      outerRecords: [], //外出记录

      showOnWork: true, //签到按钮
      showAfterWork: false, //已经签退
      punchTime: "", //上班打卡时间
      punchOutTime: "", //下班打卡时间
      punchOutBtnText: "未开始" //签退按钮文字
    };
  },
  mounted: function() {
    this.fetchInitData();
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
    punchCard(key, item) {
      if (key == type.SIGNINDETAIL) {
        if (item.clockOnWork) {
          this.$router.push({
            name: "clockDetail",
            params: { source: key, id: item.id }
          });
        } else {
          Toast("暂无上班打卡详情");
        }
      } else if (key == type.SIGNOUTDETAIL) {
        if (item.clockAfterWork) {
          this.$router.push({
            name: "clockDetail",
            params: { source: key, id: item.id }
          });
        } else {
          Toast("暂无下班打卡详情");
        }
      } else if (key == type.ADDGOOUT) {
        this.$router.push({
          name: "clockDetail",
          params: { source: key }
        });
      } else {
        this.$router.push({
          name: "clockDetail",
          params: { source: key, id: item.id }
        });
      }
    },
    fetchInitData() {
      let vm = this;
      this.$axios.get("/api/clock").then(
        res => {
          console.log(res);
          vm.workRules = res.data.normal;
          vm.outerRecords = res.data.outer;
        },
        err => {
          vm.$netError(err.response);
        }
      );
    }
  }
};
