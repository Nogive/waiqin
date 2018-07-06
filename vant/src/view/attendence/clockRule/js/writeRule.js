import router from "@/router";
export default {
  name: "writeRule",
  data() {
    return {
      ruleName: "每日2次打卡", //规则名
      clockDate: "周一", //选中的打卡日期
      timeArr: [
        {
          num: 1,
          onTime: "09:00",
          afterTime: "18:00"
        }
      ], //上下班次数时间设置
      address: "无限制"
    };
  },
  computed: {
    clockTime() {
      let res = "";
      this.timeArr.forEach(e => {
        res += `${e.onTime}-${e.afterTime} `;
      });
      return res;
    }
  },
  methods: {}
};
