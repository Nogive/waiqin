import { mapGetters, mapActions } from "vuex";
export default {
  name: "writeRule",
  data() {
    return {
      source: "", //当前状态
      title: "编辑规则",
      ruleName: "每日2次打卡", //规则名
      clockPerson: "麦芒",
      clockDate: "周一至周五", //打卡日期
      clockTime: "09:00-18:00",
      location: "无限制",
      showDelete: true
    };
  },
  computed: {
    ...mapGetters(["rule_state"])
  },
  created() {
    this.source = this.rule_state;
    this.setTitle();
    this.fetchCache();
  },
  methods: {
    setTitle() {
      if (this.source == "create") {
        this.title = "新增规则";
        this.showDelete = false;
      } else {
        this.title = "编辑规则";
      }
    },
    fetchCache() {
      let rule = this.$getSession("rule");
      this.ruleName = rule.name;
      this.clockPerson = rule.staff;
      this.clockDate = rule.date;
      this.clockTime = rule.time;
      this.location = rule.location;
    }
  }
};
