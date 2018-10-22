import state from "./state";
const getters = {
  count: state => {
    return state.count;
  },
  /*-----------------------native-------------------------------------------------- */
  fullpath: state => {
    return state.fullpath;
  },
  appState: state => {
    return state.appState;
  },
  /*-----------------------rule-------------------------------------------------- */
  currentRuleId: state => {
    return state.currentRuleId;
  },
  /*-----------------------统计-------------------------------------------------- */
  statistics: state => {
    return state.statistics;
  },
  depart_day: state => {
    return state.depart_day;
  }
};
export default getters;
