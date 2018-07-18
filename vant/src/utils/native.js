import { Toast } from "vant";
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
  let successCallback = function(imageURI) {
    onSuccess(imageURI);
  };
  let errorCallback = function(message) {
    onFail(message);
  };
  navigator.camera.getPicture(successCallback, errorCallback, options);
}

export { takePhoto };
