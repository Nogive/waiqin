export default {
  name: "attendence",
  data() {
    return {
      ruleId: "",
      currentRule: {},
      allPerson: null, //获取的全部员工数据
      persons: [], //页面显示
      total: 0,
      result: [], //勾选人员结果数组
      headImg: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
    };
  },
  created() {
    this.ruleId = this.$getSession("ruleId");
    this.currentRule = this.$getSession("r" + this.ruleId);
    this.getStaffs();
  },
  watch: {
    $route() {
      if (this.$route.query.id == undefined) {
        this.persons = this.allPerson;
      } else {
        let id = this.$route.query.id;
        this.persons = getCurrentPart(id, this.allPerson);
      }
    }
  },
  methods: {
    getStaffs() {
      let vm = this;
      this.$axios.get("/api/staffs").then(
        res => {
          if (res.code == vm.CommonConstants.API_CODE.OK) {
            vm.allPerson = res.data.data;
            vm.persons = res.data.data;
            vm.total = res.data.total;
          } else {
            vm.$codeError(res, "请求人员数据");
          }
          console.log(res);
        },
        err => {
          vm.$netError(res.response);
        }
      );
    },
    enterPart(item, ev) {
      if (ev.srcElement.nodeName != "I" && item.children != undefined) {
        this.$router.push({
          path: "/setClockPerson",
          query: { id: item.id }
        });
      }
    },
    deleteThisDepart(item) {
      let idx = this.result.indexOf(item);
      this.result.splice(idx, 1);
    },
    onSubmit() {
      let name = "";
      let temArr = [];
      this.result.forEach(e => {
        name += e.name + " ";
        temArr.push(name.id);
      });
      this.currentRule.staffs.name = name;
      this.currentRule.staffs.ids = temArr;
      this.$setSession("r" + this.ruleId, this.currentRule);
      this.$router.replace("/writeRule");
    }
  }
};
function getCurrentPart(id, items) {
  let result;
  for (var i in items) {
    let item = items[i];
    if (item.id == id) {
      result = item.children;
      break;
    } else if (item.children) {
      result = getCurrentPart(id, item.children);
    }
  }
  return result;
}
