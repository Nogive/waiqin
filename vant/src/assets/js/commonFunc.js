import { Toast } from "vant";
/****************************************************************************************/
// 高德地图 key
export const mapKey = "e1dedc6bdd765d46693986ff7ff969f4";
/****************************************************************************************/
/*
 * expires:天
 * path:生效路径
 */
export function setCookie(key, value, expires, path, domain, secure) {
  var cookieText = "";
  expires = expires * 1000 * 60 * 60 * 24;
  var expires_date = new Date(new Date().getTime() + expires);
  cookieText += encodeURIComponent(key) + "=" + encodeURIComponent(value);
  if (expires) {
    cookieText += "; expires=" + expires_date.toGMTString();
  }
  if (path) {
    cookieText += "; path=" + path;
  }
  if (domain) {
    cookieText += "; domain=" + domain;
  }
  if (secure) {
    cookieText += "; secure";
  }
  document.cookie = cookieText;
}
//get cookie
export function getCookie(key) {
  var cookieName = encodeURIComponent(key) + "=";
  var cookieStart = document.cookie.indexOf(cookieName);
  var cookieValue = "";
  if (cookieStart > -1) {
    var cookieEnd = document.cookie.indexOf(";", cookieStart);
    if (cookieEnd == -1) {
      cookieEnd = document.cookie.length;
    }
    cookieValue = decodeURIComponent(
      document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
    );
  }
  return cookieValue;
}
//clear some cookie
export function clearCookie(key) {
  setCookie(key, "", -1);
}
//check cookie exist
export function checkCookie(key) {
  var value = getCookie(key);
  if (value == "" || value == null) {
    return false;
  } else {
    return true;
  }
}
//set local && set session
export function setLocal(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
export function setSession(key, value) {
  window.sessionStorage.setItem(key, JSON.stringify(value));
}
//get local && get session
export function getLocal(key) {
  let value = window.localStorage.getItem(key);
  return JSON.parse(value);
}
export function getSession(key) {
  let value = window.sessionStorage.getItem(key);
  return JSON.parse(value);
}
//clear one local && clear on session
export function clearLocal(key) {
  window.localStorage.removeItem(key);
}
export function clearSession(key) {
  window.sessionStorage.removeItem(key);
}
//clear all local && clear all session
export function clearAllLocal() {
  window.localStorage.clear();
}
export function clearAllSession() {
  window.sessionStorage.clear();
}
/****************************************************************************************/
//no data
export function noData() {
  Toast("无法从服务器获取数据，请联系管理员");
}
//code！=0
export function codeError(data, text) {
  var msg = text + "发生错误，错误码为：" + data.code;
  Toast(msg);
}
//quest error
export function netError(xhr) {
  if (xhr.status) {
    Toast("发生网络错误，错误码为：" + xhr.status);
  } else {
    Toast("未知网络错误, 请确保设备处在联网状态");
  }
}
/****************************************************************************************/
//filter space
export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
