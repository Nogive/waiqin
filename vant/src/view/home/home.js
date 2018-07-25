import { mapGetters, mapActions } from "vuex";
import {
  checkCookie,
  showLoading,
  noData,
  codeError,
  netError,
  getTimeFromServer
} from "@/assets/js/commonFunc";
import { getRequestUrl } from "@/assets/js/api";
import { startLocate, stopLocate, takePhoto } from "@/utils/native";
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
      takePhoto(
        url => {
          console.log("拍照成功");
          console.log(url);
        },
        err => {
          console.log(err);
        }
      );
    },
    testLocate() {
      let vm = this;
      startLocate(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        },
        5000
      );
      stopLocate();
    }
  }
};
