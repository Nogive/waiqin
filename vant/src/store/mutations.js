import * as types from "./types";
import state from "./state";
const mutations = {
  [types.INCREMENT](state) {
    state.count++;
  },
  [types.DECREMENT](state) {
    state.count--;
  },
  //记录统计参数
  [types.CHANGE_STATISTICS](state, params) {
    state.statistics = params;
  },
  //部门日记录参数
  [types.CHANGE_DEPART_DAY](state, params) {
    state.depart_day = params;
  }
};
export default mutations;
