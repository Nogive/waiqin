import state from "./state";
const getters = {
  count: state => {
    return state.count;
  },
  loading: state => {
    return state.loading;
  },
  loadingText: state => {
    return state.loadingText;
  },
  statistics: state => {
    return state.statistics;
  },
  depart_day: state => {
    return state.depart_day;
  },
  rule_state: state => {
    return state.rule_state;
  },
  fullpath: state => {
    return state.fullpath;
  }
};
export default getters;
