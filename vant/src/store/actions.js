import * as types from "./types";
const actions = {
  [types.INCREMENT]: ({ commit }) => {
    commit(types.INCREMENT);
  },
  [types.DECREMENT]: ({ commit }) => {
    commit(types.DECREMENT);
  },
  //方法带参数
  [types.CHANGE_STATISTICS]: ({ commit }, params) => {
    commit(types.CHANGE_STATISTICS, params);
  },
  [types.CHANGE_DEPART_DAY]: ({ commit }, params) => {
    commit(types.CHANGE_DEPART_DAY, params);
  }
};
export default actions;
