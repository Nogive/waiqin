import Vue from "vue";

/**
 * 自定义指令
 */

//focus
Vue.directive("focus", {
  update: function(el, binding) {
    if (binding.value) {
      el.focus();
    }
  }
});

/**
 * 过滤器
 */

//timestamp => some format
Vue.filter("timestampFormat", function(value, format) {
  let date = new Date(value);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let min = date.getMinutes();
  let s = date.getSeconds();
  let result = "";
  if (format == undefined) {
    result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d} ${
      h < 10 ? "0" + h : h
    }:${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
  }
  if (format == "yyyy-mm-dd") {
    result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
  }
  if (format == "yyyy-mm") {
    result = `${y}-${m < 10 ? "0" + m : m}`;
  }
  if (format == "mm-dd") {
    result = ` ${mm < 10 ? "0" + mm : mm}:${ddmin < 10 ? "0" + dd : dd}`;
  }
  if (format == "hh:mm") {
    result = ` ${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}`;
  }
  return result;
});
