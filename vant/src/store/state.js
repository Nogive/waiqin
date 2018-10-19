const state = {
  count: 20,
  //从统计里面查看的状态（全部、内勤、外出、我的历史记录） 默认：全部
  statistics: "t_all",
  //全部、内勤、外出成员考勤详情当前查看的状态（正常、迟到、早退、外出） 默认：正常
  depart_day: "t_1",
  //规则 新建、编辑状态 默认：编辑
  rule_state: "edit",
  //当前路由的fullpath
  fullpath: "/",
  //app pause or resume
  appState: "",
  //当前规则id
  ruleId: "d"
};
export default state;
