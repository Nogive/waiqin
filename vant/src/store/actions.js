import * as types from "./types";
const actions = {
  [types.INCREMENT]: ({ commit }) => {
    commit(types.INCREMENT);
  },
  [types.DECREMENT]: ({ commit }) => {
    commit(types.DECREMENT);
  }
};
export default actions;
