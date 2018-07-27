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
      dialog: 8,
      showPhoto: false,
      arr: [
        {
          id: 1,
          url: "https://avatars1.githubusercontent.com/u/24405319?s=460&amp;v=4"
        },
        {
          id: 2,
          url: "https://avatars1.githubusercontent.com/u/24405319?s=460&amp;v=4"
        }
      ]
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
          this.arr.push({
            id: 3,
            url: url
          });
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
