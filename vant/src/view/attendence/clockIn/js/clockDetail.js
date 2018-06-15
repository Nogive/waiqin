import router from "@/router";
import { Toast, ImagePreview } from "vant";
const photoMap = [
  {
    id: 1,
    url: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
  },
  {
    id: 2,
    url: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
  },
  {
    id: 3,
    url: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
  },
  {
    id: 4,
    url: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
  }
];
export default {
  name: "attendenceDetail",
  data() {
    return {
      //init page
      showLoading: false,
      source: "",
      tabIndex: 0,
      //page data
      currentTime: "",
      shotAddress: "钦州北路1088号",
      address: "上海市徐汇区钦州北路1066号",
      addressUrl:
        "http://restapi.amap.com/v3/staticmap?location=121.406452,31.17977&zoom=14&size=600*200&markers=large,,:121.406452,31.17977&key=b2a701a4c4e88acd8fac16bbf402484f",
      photos: photoMap,
      message: "",
      showPhoto: false,
      largePhoto: ""
    };
  },
  created: function() {
    console.log(this.$route);
    //记录来源
    this.source = this.$route.params.source;
    this.getInfoAuto();
  },
  computed: {
    pageTitle() {
      let title = "";
      switch (this.source) {
        case "gotowork":
          title = "上班打卡";
          break;
        case "afterwork":
          title = "下班打卡";
          break;
        case "update":
          title = "更新打卡";
          break;
        default:
          title = "打卡详情";
          break;
      }
      return title;
    }
  },
  methods: {
    reback() {
      router.push("/clockHome");
    },
    getInfoAuto() {
      this.currentTime = getCurrentTime();
    },
    punchIn() {
      router.push({
        name: "clockIn",
        params: { source: this.source, punchInTime: this.currentTime }
      });
    },
    photoPreview(item) {
      this.largePhoto = item;
      this.showPhoto = true;
    },
    deletePhoto() {
      let index = this.photos.indexOf(this.largePhoto);
      this.photos.splice(index, 1);
      this.showPhoto = false;
    },
    takePhoto() {
      Toast("打开摄像头");
    }
  }
};
function getCurrentTime() {
  let d = new Date();
  return (
    (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) +
    ":" +
    (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes())
  );
}
