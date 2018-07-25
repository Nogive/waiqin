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
      locateArr: [],
      locateLength: 0
    };
  },
  watch: {
    locateLength() {
      console.log(this.locateArr);
      console.log(this.locateLength);
      if (this.locateLength >= 5) {
        stopLocate();
        console.log("定位信息：");
        console.log(this.locateArr);
        this.locateArr.sort((a, b) => {
          return b.acr - a.acr;
        });
        console.log("排序后：");
        console.log(this.locateArr);
        console.log("经纬度：");
        console.log(this.locateArr[0].lng, this.locateArr[0].lat);
      }
    }
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
          if (data != "OK") {
            vm.locateLength++;
            vm.locateArr.push(data);
          } else {
            console.log(vm.locateArr);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    getTime() {
      getTimeFromServer().then(res => {
        let currentTime = new Date();
        if (res) {
          currentTime = new Date(res);
        }
        console.log(currentTime);
        console.log(Date.parse(currentTime));
      });
    }
  }
};
