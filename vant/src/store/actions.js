import * as types from "./types";
const actions = {
  [types.INCREMENT]: ({ commit }) => {
    commit(types.INCREMENT);
  },
  [types.DECREMENT]: ({ commit }) => {
    commit(types.DECREMENT);
  },
  /*------------------------native------------------------------------------------- */
  [types.change_full_path]: ({ commit }, params) => {
    commit(types.change_full_path, params);
  },
  [types.change_app_state]: ({ commit }, params) => {
    commit(types.change_app_state, params);
  },

  /*------------------------rule------------------------------------------------- */
  [types.change_current_ruleId]: ({ commit }, params) => {
    commit(types.change_current_ruleId, params);
  },

  /*------------------------统计------------------------------------------------- */
  //方法带参数
  [types.change_statistics]: ({ commit }, params) => {
    commit(types.change_statistics, params);
  },
  [types.change_depart_day]: ({ commit }, params) => {
    commit(types.change_depart_day, params);
  }
};
export default actions;
