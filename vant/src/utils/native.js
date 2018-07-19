//拍照
function takePhoto(onSuccess, onFail) {
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
    allowEdit: true,
    correctOrientation: true // Corrects Android orientation quirks
  };
  let successCallback = function(imgUri) {
    onSuccess(imgUri);
    /*
    window.resolveLocalFileSystemURL(
      imgUri,
      function success(fileEntry) {
        console.log("got file: " + fileEntry.fullPath);
        onSuccess(fileEntry, imgUri);
      },
      function() {
        createNewFileEntry(imgUri);
        window.resolveLocalFileSystemURL(
          cordova.file.cacheDirectory,
          function success(dirEntry) {
            dirEntry.getFile(
              "tempFile.jpeg",
              { create: true, exclusive: false },
              function(fileEntry) {
                onSuccess(fileEntry, imgUri);
              },
              function() {
                onFail("获取图片源文件失败");
              }
            );
          },
          function() {
            onFail("解析图片路径出错");
          }
        );
      }
    );
    */
  };
  let errorCallback = function(message) {
    onFail(message);
  };
  navigator.camera.getPicture(successCallback, errorCallback, options);
}

//开始定位
function startLocate(successCallback, errorCallback) {
  let arr = [];
  let endFlag = false;
  cordova.exec(
    data => {
      if (data != "OK" && arr.length < 5) {
        arr.push(data);
      } else {
        cordova.exec(function() {}, function() {}, "Location", "stop", []);
        //endFlag = true;
        console.log(111111);
        console.log(arr);
      }
    },
    err => {
      endFlag = true;
    },
    "Location",
    "start",
    []
  );
}
//结束定位
function stopLocate() {
  cordova.exec(function() {}, function() {}, "Location", "stop", []);
}

export { takePhoto, startLocate, stopLocate };
let arr = [];
startLocate(
  data => {
    console.log(data);
    if (data != "OK" && arr.length < 5) {
      arr.push(data);
    } else {
      stopLocate();
      console.log(arr);
    }
  },
  err => {
    console.log(err);
  }
);
