import { Toast } from "vant";
import $ from "jquery";
/****************************************************************************************/
// 高德地图 key
export const mapKey = "e1dedc6bdd765d46693986ff7ff969f4";
/****************************************************************************************/
//filter space
export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
//uuid
export function getUuid(len, radix) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
}
//get time from server
export function getTimeFromServer() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      timeout: 5000, //5s超时
      url: "https://m.tmall.com",
      complete: function(xhr) {
        var time = xhr.getResponseHeader("Date");
        resolve(time);
      }
    });
  });
}
