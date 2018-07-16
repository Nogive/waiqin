import { mapGetters, mapActions } from "vuex";
import {
  checkCookie,
  showLoading,
  noData,
  codeError,
  netError
} from "@/assets/js/commonFunc";
import { getRequestUrl } from "@/assets/js/api";
export default {
  name: "home",
  computed: {
    ...mapGetters(["count"])
  },
  data() {
    return {
      active: 1,
      dialog: 8
    };
  },
  mounted() {
    if (!checkCookie("token")) {
      //router.push("/login");
    } else {
      //showLoading(this, true);
      console.log(getRequestUrl("login"));
    }
  },
  methods: {
    ...mapActions(["increment"]),
    logOut() {
      this.$router.push("/login");
    },
    testPhoto() {
      if (!navigator.camera) {
        window.alert("Camera API not supported !");
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
        console.log("拍照成功");
        console.log(imageURI);
      };
      let errorCallback = function(message) {
        window.alert("error:" + message);
      };
      navigator.camera.getPicture(successCallback, errorCallback, options);
    }
  }
};
