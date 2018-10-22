/**
 * 实施挂载
 * 将一些项目需要经常用的的方法  全局过滤器 全局指令等进行挂载
 */

import axios from "axios";
import qs from "qs";
var vm = new Vue();
axios.interceptors.request.use(
  function(config) {
    if (config.url != "http://m.tmall.com") {
      vm.$showLoading();
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
      vm.$hideLoading();
      response = response.data;
    }
    return response;
  },
  function(error) {
    vm.$hideLoading();
    return Promise.reject(error);
  }
);
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

//filters directives
import directives from "@/utils/filterAndDirectives";
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});

//全局方法
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
