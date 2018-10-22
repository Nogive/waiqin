/**
 * 需要挂载到VUE原型上的指令和过滤器
 */

/*----------------------------------filter start------------------------------------------*/
//时间格式化
/* 
 /(y+)/ : 匹配以‘y’开头的多个y组成的字符串
 RegExp.$1 :匹配到的第一个对象
 date.getFullYear() + "" : 转换为字符串
*/
function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substring(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}
//前面补‘0’
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

//补零
const fillZero = num => {
  return num < 10 ? "0" + num : num;
};

//货币形式（unit:单位;decimal:保留小数位数）
const currency = (value, unit, decimal) => {
  let reg = /^[0-9]+.?[0-9]*$/;
  if (!reg.test(value)) return "";
  value = decimal == undefined ? value : value.toFixed(decimal);
  return `${unit}${value}`;
};
//首字母大写
const capitalize = value => {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};
/*----------------------------------filter end------------------------------------------*/

/*----------------------------------directives start------------------------------------------*/
//focus
const focus = {
  inserted: function(el, binding) {
    el.focus();
    if (binding.value) {
      //el.focus();
    }
  }
};
/*----------------------------------directives end------------------------------------------*/

/*----------------------------------export start------------------------------------------*/
export default {
  fillZero,
  currency,
  capitalize,
  formatDate,
  focus
};
/*----------------------------------export end------------------------------------------*/
