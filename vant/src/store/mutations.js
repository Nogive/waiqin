import * as types from "./types";
import state from "./state";
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
  [types.SHOWLOADING](state) {
    state.loading = true;
  },
  [types.HIDELOADING](state) {
    state.loading = false;
  }
};
export default mutations;
