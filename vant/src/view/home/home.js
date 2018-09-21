import { mapGetters, mapActions } from "vuex";
import { getTimeFromServer } from "@/assets/js/commonFunc";
import { startLocate, stopLocate, takePhoto } from "@/utils/native";
import { XFieldApi, accountApi } from "@/assets/js/api";
import { Dialog } from "vant";
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
    if (!this.$checkCookie("token")) {
      //this.$router.push("/login");
    } else {
      console.log("mounted");
    }
  },
  methods: {
    ...mapActions(["increment"]),
    logOut() {
      this.$router.replace("/login");
    },
    testPhoto() {
      takePhoto(
        url => {
          console.log("拍照成功");
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
    },
    onTest() {
      let body = new XFieldApi.Register();
      console.log(body);
      accountApi.register(body, function(error, data, response) {
        if (error) {
          console.error(error);
        } else {
          console.log(response);
          console.log("seccess!");
        }
      });
    }
  }
};
