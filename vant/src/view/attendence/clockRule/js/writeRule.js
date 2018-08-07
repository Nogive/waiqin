import { mapGetters, mapActions } from "vuex";
export default {
  name: "writeRule",
  data() {
    return {
      source: "", //新建 or 编辑
      id: "", //规则模板id
      title: "编辑规则",
      ruleName: "每日2次打卡", //规则名
      staffs: "麦芒", //打卡人员
      clockDate: "周一至周五", //打卡日期
      clockTime: "09:00-18:00", //打卡时间
      clockPosition: "无限制", //打卡位置
      deleteBtn: true
    };
  },
  computed: {
    ...mapGetters(["rule_state"])
  },
  created() {
    this.source = this.rule_state;
    this.id = this.$route.params.id;
    this.setTitle();
    this.getInitDataFromCache();
  },
  methods: {
    setTitle() {
      if (this.source == "create") {
        this.title = "新增规则";
        this.deleteBtn = false;
      } else {
        this.title = "编辑规则";
      }
    },
    getInitDataFromCache() {
      let v = this.$getSession("r" + this.id);
      console.log(v);
      this.ruleName = v.name;
      this.staffs = v.staffs.name;
      this.clockDate = v.clockDate.name;
      this.clockTime = v.clockTime;
      this.clockPosition = v.clockPosition.address;
    }
  }
};
