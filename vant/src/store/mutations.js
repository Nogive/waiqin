import * as types from "./types";
import state from "./state";
const mutations = {
  [types.INCREMENT](state) {
    state.count++;
  },
  [types.DECREMENT](state) {
    state.count--;
  },
  /*------------------------native------------------------------------------------- */
  [types.change_full_path](state, params) {
    state.fullpath = params;
  },
  [types.change_app_state](state, params) {
    state.appState = params;
  },

  /*------------------------rule------------------------------------------------- */
  [types.change_current_ruleId](state, params) {
    state.currentRuleId = params;
  },

  /*------------------------统计------------------------------------------------- */
  //记录并修改状态
  [types.change_statistics](state, params) {
    state.statistics = params;
  },
  [types.change_depart_day](state, params) {
    state.depart_day = params;
  }
};
export default mutations;
