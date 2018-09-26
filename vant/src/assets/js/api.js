//API SDK
export var XFieldApi = require("x_field_api");

//账户API
export var accountApi = new XFieldApi.AccountApi();

//错误码
export var errorCode = XFieldApi.Error.CodeEnum;

//设置auth
export function setAuth(key) {
  var defaultClient = XFieldApi.ApiClient.instance;
  var auth = defaultClient.authentications["apiKey"];
  auth.apiKey = key;
}
