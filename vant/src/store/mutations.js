import * as types from "./types";
import state from "./state";
import { ECONNABORTED } from "constants";
const mutations = {
  [types.INCREMENT](state) {
    state.count++;
  },
  [types.DECREMENT](state) {
    state.count--;
  },
  //记录并修改状态
  [types.CHANGE_STATISTICS](state, params) {
    state.statistics = params;
  },
  [types.CHANGE_DEPART_DAY](state, params) {
    state.depart_day = params;
  },
  [types.CHANGE_RULE_STATE](state, params) {
    state.rule_state = params;
  },
  [types.SHOWLOADING](state, params) {
    console.log("show");
    if (params) {
      state.loadingText = params;
    }
    state.loading = true;
  },
  [types.HIDELOADING](state) {
    console.log("hide");
    state.loading = false;
    state.loadingText = "拼命加载中";
  },
  [types.CHANGEFULLPATH](state, params) {
    state.fullpath = params;
  },
  [types.CHANGEAPPSTATE](state, params) {
    state.appState = params;
  },
  [types.RECORDRULEID](state, params) {
    state.ruleId = params;
  }
};
export default mutations;
