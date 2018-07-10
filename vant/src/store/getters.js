import state from "./state";
const getters = {
  count: state => {
    return state.count;
  },
  statistics: state => {
    return state.statistics;
  },
  depart_day: state => {
    return state.depart_day;
  },
  rule_state: state => {
    return state.rule_state;
  }
};
export default getters;
