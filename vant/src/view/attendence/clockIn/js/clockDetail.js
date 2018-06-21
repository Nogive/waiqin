import router from "@/router";
import { Toast, ImagePreview, Dialog } from "vant";
import { showLoading } from "@/common/js/commonFunc";
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
    let vm = this;
    return {
      //init page
      source: "", //记录来源那个操作
      //page data
      currentTime: "", //打卡时间
      shotAddress: "", //打卡地点
      address: "", //打卡详细位置
      photos: photoMap, //图片数组
      message: "", //备注
      showPhoto: false, //是否放大图片
      largePhoto: "", //被放大的图片
      lng: 0,
      lat: 0,
      map: "",
      zoom: 15, //地图放大级别
      center: [121.59996, 31.197646], //地图默认中心点
      plugin: [
        {
          pName: "Geolocation",
          showButton: false,
          extensions: "all",
          events: {
            init(o) {
              vm.map = o;
            }
          }
        }
      ]
    };
  },
  mounted: function() {
    showLoading(this, true);
    //记录来源
    this.source = this.$route.params.source;
  },
  watch: {
    //自动获取时间+地点
    map: function() {
      if (this.map != "") {
        this.getLocationInfo();
      }
    }
  },
  computed: {
    pageTitle() {
      let title = "";
      switch (this.source) {
        case "in":
          title = "上班打卡";
          break;
        case "out":
          title = "下班打卡";
          break;
        case "update":
          title = "更新下班打卡";
          break;
        case "outer":
          title = "外出打卡";
          break;
        default:
          title = "打卡详情";
          break;
      }
      return title;
    },
    isDetail() {
      return !(
        this.$route.params.source == "inDetail" ||
        this.$route.params.source == "outDetail" ||
        this.$route.params.source == "outerDetail"
      );
    }
  },
  methods: {
    goBack() {
      router.push({
        name: "clockIn",
        params: { source: this.source }
      });
    },
    renderPage(result) {
      this.currentTime = getCurrentTime();
      this.shotAddress = result.aois[0].name;
      this.address = result.formattedAddress;
      this.lng = result.position.lng;
      this.lat = result.position.lat;
      this.center = [result.position.lng, result.position.lat];
      this.$nextTick();
    },
    //拍照上传
    takePhoto() {
      Toast("打开摄像头");
    },
    //预览图片
    photoPreview(item) {
      this.largePhoto = item;
      this.showPhoto = true;
    },
    //删除图片
    deletePhoto() {
      let index = this.photos.indexOf(this.largePhoto);
      this.photos.splice(index, 1);
      this.showPhoto = false;
    },
    //定位失败
    autoLocationError() {
      Dialog.confirm({
        title: "提示",
        message: "定位失败,请确保设备联网且允许GPS定位。点击确认进行重新定位"
      })
        .then(() => {
          this.getLocationInfo();
        })
        .catch(() => {
          console.log("取消");
        });
    },
    //确认打卡
    confirmTheClock() {
      router.push({
        name: "clockIn",
        params: { source: this.source }
      });
    },
    //获取定位信息
    getLocationInfo() {
      this.map.getCurrentPosition((status, result) => {
        console.log(result);
        if (result && result.position) {
          showLoading(this, false);
          this.renderPage(result);
        } else {
          this.autoLocationError();
        }
      });
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
