/* Generated from Java with JSweet 2.0.1 - http://www.jsweet.org */
var CommonConstants = (function () {
    function CommonConstants() {
    }
    return CommonConstants;
}());
export { CommonConstants };
CommonConstants["__class"] = "com.maimang.xfield.utils.CommonConstants";
(function (CommonConstants) {
    var API_CODE = (function () {
        function API_CODE() {
        }
        return API_CODE;
    }());
    API_CODE.OK = 0;
    API_CODE.INVALID_PARAMETERS = 1;
    API_CODE.GENERAL_ERR = 2;
    API_CODE.INTERNAL_ERR = 3;
    API_CODE.TOKEN_EXPIRED = 4;
    API_CODE.AUTH_INVALID_ACCOUNT = 1001;
    API_CODE.AUTH_INVALID_PASSWORD = 1002;
    API_CODE.AUTH_FAILED = 1003;
    API_CODE.AUTH_FORBIDDEN = 1004;
    API_CODE.AUTH_INACTIVE_ACCOUNT = 1005;
    API_CODE.REG_INVALID_COMANY = 2001;
    API_CODE.REG_INVALID_MOBILE = 2002;
    API_CODE.REG_INVALID_PASSWORD = 2003;
    API_CODE.REG_INVALID_STAFF_NUMBER = 2004;
    API_CODE.REG_INVALID_NAME = 2005;
    API_CODE.REG_ALREADY_REGISTERED = 2006;
    CommonConstants.API_CODE = API_CODE;
    API_CODE["__class"] = "com.maimang.xfield.utils.CommonConstants.API_CODE";
    var JSON_KEY = (function () {
        function JSON_KEY() {
        }
        return JSON_KEY;
    }());
    JSON_KEY.CODE = "code";
    JSON_KEY.MESSAGE = "msg";
    JSON_KEY.DATA = "data";
    JSON_KEY.COMPANY_NAME = "cname";
    JSON_KEY.NAME = "name";
    JSON_KEY.MOBILE = "mobile";
    JSON_KEY.PASSWORD = "passwd";
    JSON_KEY.STAFFS = "staffs";
    CommonConstants.JSON_KEY = JSON_KEY;
    JSON_KEY["__class"] = "com.maimang.xfield.utils.CommonConstants.JSON_KEY";
})(CommonConstants || (CommonConstants = {}));
