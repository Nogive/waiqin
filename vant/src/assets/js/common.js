/**
 * ##公用变量与函数
 *constants
 *function
 */
import axios from "axios";

/*------------------------------------constants-------------------------------------------------*/
// 密码加密公钥
export const publicKey =
  "MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAb6sVJ1LaIIpRR3U20ZbQPDvMkGy7A4ac7rAFz9QWW8pamYzGyfloIDER7OYj5C5S/YkMqXLMBTfc6SeTK9142QIDAQAB";
//照片路径前缀
export const imgUrlPrefix = "http://xfield.oss-cn-hangzhou.aliyuncs.com";

/*------------------------------------function-------------------------------------------------*/
//filter space
export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
//generate uuid
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
    axios.head("http://m.tmall.com").then(
      res => {
        let data = {
          date: Date.parse(new Date(res.headers.date)),
          from: "OL"
        };
        resolve(data);
      },
      err => {
        let data = {
          date: Date.parse(new Date()),
          from: "LT"
        };
        resolve(data);
      }
    );
  });
}

//动态增加script
export function createScript(url, callback) {
  var oScript = document.createElement("script");
  oScript.type = "text/javascript";
  oScript.async = true;
  oScript.src = url;
  /* 
  ** script标签的onload和onreadystatechange事件 
  ** IE6/7/8支持onreadystatechange事件 
  ** IE9/10支持onreadystatechange和onload事件 
  ** Firefox/Chrome/Opera支持onload事件 
  */

  // 判断IE8及以下浏览器
  var isIE = !-[1];
  if (isIE) {
    alert("IE");
    oScript.onreadystatechange = function() {
      if (this.readyState == "loaded" || this.readyState == "complete") {
        callback();
      }
    };
  } else {
    // IE9及以上浏览器，Firefox，Chrome，Opera
    oScript.onload = function() {
      callback();
    };
  }
  document.body.appendChild(oScript);
}
