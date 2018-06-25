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
/*
all => yyyy-mm-dd hh:mm
ymd => yyyy-mm-dd
hm => hh:mm
*/
Vue.filter("timeFormatting", function(input, params) {
  let date = new Date(input);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let value = input;
  if (params == "all") {
    value = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    } ${hour < 10 ? "0" + hour : hour}:${min < 10 ? "0" + min : min}`;
  }
  if (params == "ymd") {
    value = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  }
  if (params == "hm") {
    value = `${hour < 10 ? "0" + hour : hour}:${min < 10 ? "0" + min : min}`;
  }
  return value;
});
