import router from "@/router";
export default {
  name: "writeRule",
  data() {
    return {
      rulePopup: false, //规则名称弹框
      ruleName: "每日2次打卡", //规则名
      showError: false, //规则必填
      datePopup: false, //日期弹框
      checkedDate: ["1"], //选中的打卡日期
      holiday: true, //法定节假日不用打卡
      nonWorkday: true, //非工作日允许打卡
      timePopup: false, //时间弹框
      workNum: 1, //一天内上下班次数
      workTimesPopup: false, //选择一天上下班次数弹框
      timeArr: [
        {
          num: 1,
          onTime: "09:00",
          afterTime: "18:00"
        }
      ], //上下班次数时间设置
      showTimePanel: false, //选择时间面板
      currentTime: "12:00", //时间面板上显示的默认时间
      current: "", //当前设置的那一次的上下班时间
      currentTag: "", //当前设置的是上班还是下班
      address: "无限制",
      locationPopup: false
    };
  },
  computed: {
    clockDate() {
      let arr = this.checkedDate;
      arr.sort();
      let str = "";
      if (arr.length == 7) {
        str = "周一至周日";
      } else {
        arr.forEach(e => {
          str += getDateText(e) + ",";
        });
        str = str.substring(0, str.length - 1);
      }
      return str;
    },
    clockTime() {
      let res = "";
      this.timeArr.forEach(e => {
        res += `${e.onTime}-${e.afterTime} `;
      });
      return res;
    }
  },
  methods: {
    //规则名称
    setName() {
      if (this.ruleName == "") {
        this.showError = true;
      } else {
        this.rulePopup = false;
      }
    },
    //选择上下班次数
    checkWorkTime(n) {
      this.workNum = n;
      if (n == 2) {
        this.timeArr = [
          {
            num: 1,
            onTime: "09:00",
            afterTime: "12:00"
          },
          {
            num: 2,
            onTime: "13:00",
            afterTime: "18:00"
          }
        ];
      }
      if (n == 3) {
        this.timeArr = [
          {
            num: 1,
            onTime: "09:00",
            afterTime: "12:00"
          },
          {
            num: 2,
            onTime: "13:00",
            afterTime: "15:00"
          },
          {
            num: 3,
            onTime: "16:00",
            afterTime: "18:00"
          }
        ];
      }
      this.workTimesPopup = false;
    },
    //设置上下班打卡时间
    checkOnWorkTime(item, tag) {
      this.currentTag = tag;
      this.current = item;
      this.showTimePanel = true;
    },
    pickerTime() {
      let idx = this.timeArr.indexOf(this.current);
      if (this.currentTag == "on") {
        this.timeArr[idx].onTime = this.currentTime;
      } else {
        this.timeArr[idx].afterTime = this.currentTime;
      }
    }
  }
};

function getDateText(i) {
  i = parseInt(i);
  let str = "";
  switch (i) {
    case 0:
      str = "周日";
      break;
    case 1:
      str = "周一";
      break;
    case 2:
      str = "周二";
      break;
    case 3:
      str = "周三";
      break;
    case 4:
      str = "周四";
      break;
    case 5:
      str = "周五";
      break;
    case 6:
      str = "周六";
      break;
  }
  return str;
}
