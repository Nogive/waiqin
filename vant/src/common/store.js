import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//去掉前后空格
const mutations = {
  Trim: function(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }
};
export default new Vuex.Store({
  mutations
});
