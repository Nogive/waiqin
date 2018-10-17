/**
 * 实施挂载
 * 将一些项目需要经常用的的方法  全局过滤器 全局指令等进行挂载
 */

import store from "@/store/";
import axios from "axios";
import qs from "qs";
axios.interceptors.request.use(
  function(config) {
    if (config.url != "http://m.tmall.com") {
      store.dispatch("showLoading"); //通过VUEX管理是否显示loading
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function(response) {
    if (response.config.url != "http://m.tmall.com") {
      store.dispatch("hideLoading");
      response = response.data;
    }
    return response;
  },
  function(error) {
    store.dispatch("hideLoading");
    return Promise.reject(error);
  }
);
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

//filters
import filters from "@/utils/filters";
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

//directives
import directives from "@/utils/directives";
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});

//request response  cookie session loading
import custom from "@/assets/js/mount";
Object.keys(custom).forEach(key => {
  Vue.prototype["$" + key] = custom[key];
});

//common api
import { CommonConstants } from "./CommonConstants";
Vue.prototype.CommonConstants = CommonConstants;

//照片地址前缀
Vue.prototype.imgPrefix = "http://xfield.oss-cn-hangzhou.aliyuncs.com/";
