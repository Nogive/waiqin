//拍照
function takePhoto(onSuccess, onFail, option) {
  if (!navigator.camera) {
    Toast("Camera API not supported !");
    return;
  }
  let options = {
    quality: 50,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    encodingType: navigator.camera.EncodingType.JPEG,
    mediaType: navigator.camera.MediaType.PICTURE,
    allowEdit: false, //不允许编辑
    saveToPhotoAlbum: false, //不允许保存到相册
    correctOrientation: true // Corrects Android orientation quirks
  };
  if (option) {
    options.waterMarker = option;
  }
  console.log(options);
  let successCallback = function(imgUri) {
    onSuccess(imgUri);
  };
  let errorCallback = function(message) {
    onFail(message);
  };
  navigator.camera.getPicture(successCallback, errorCallback, options);
}

//开始定位
function startLocate(successCallback, errorCallback, option) {
  if (option) {
    cordova.exec(successCallback, errorCallback, "Location", "start", [option]);
  } else {
    cordova.exec(successCallback, errorCallback, "Location", "start", []);
  }
}
//结束定位
function stopLocate() {
  cordova.exec(function() {}, function() {}, "Location", "stop", []);
}
//阻止设备自带返回行为
function stopBehaviorOfBackButton() {
  cordova.exec(null, null, "CoreAndroid", "overrideBackbutton", [true]);
}
//恢复返回按钮的行为
function restoreBackButton() {
  cordova.exec(null, null, "CoreAndroid", "overrideBackbutton", [false]);
}
//自定义返回按钮的行为
function definedBackbehavior(fn) {
  document.addEventListener("backbutton", fn);
}

//client version
function getClientVersion() {
  return new Promise(function(resolve, reject) {
    cordova.exec(
      function(data) {
        resolve(data);
      },
      function(err) {
        reject(err);
      },
      "Version",
      "client",
      []
    );
  });
}
//api version
function getApiVersion() {
  return new Promise(function(resolve, reject) {
    cordova.exec(
      function(data) {
        resolve(data);
      },
      function(err) {
        reject(err);
      },
      "Version",
      "api",
      []
    );
  });
}

//save photo
function savePhoto(options) {
  return new Promise(function(resolve, reject) {
    cordova.exec(
      function(data) {
        let res = {
          msg: "success",
          data: data
        };
        resolve(data);
      },
      function(err) {
        let rej = {
          msg: "fail",
          data: err
        };
        reject(data);
      },
      "Photo",
      "upload",
      options
    );
  });
  /*
  cordova.exec(cussessCallback, errorCallback, "Photo", "upload", [
    "file url from camera",
    "uuid generated yourself.jpg"
  ]);
  */
}

export {
  takePhoto,
  startLocate,
  stopLocate,
  stopBehaviorOfBackButton,
  restoreBackButton,
  definedBackbehavior,
  getClientVersion,
  getApiVersion,
  savePhoto
};
