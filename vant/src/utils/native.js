import { Toast } from "vant";
//拍照
function takePhoto() {
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
    Toast("拍照成功");
    Toast(imageURI);
  };
  let errorCallback = function(message) {
    Toast("error:" + message);
  };
  navigator.camera.getPicture(successCallback, errorCallback, options);
}

export { takePhoto };
