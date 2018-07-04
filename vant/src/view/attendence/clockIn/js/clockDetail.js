import router from "@/router";
import { Toast, ImagePreview, Dialog } from "vant";
import { showLoading } from "@/common/js/commonFunc";
import * as type from "@/common/js/typeVariable";
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
import { AMapManager } from "vue-amap";
let amapManage = new AMapManager();
export default {
  name: "attendenceDetail",
  data() {
    let vm = this;
    return {
      //page data
      source: null,
      title: "打卡详情",
      edit: true, //是否可编辑
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
      amapManage,
      events: {
        init(o) {
          vm.map = o;
        }
      }
    };
  },
  created: function() {
    this.source = this.$route.params.source;
    switch (this.source) {
      case type.SIGNIN:
        this.title = "签到";
        break;
      case type.SIGNOUT:
        this.title = "签退";
        break;
      case type.UPDATE:
        this.title = "更新打卡";
        break;
      case type.ADDGOOUT:
        this.title = "外出打卡";
        break;
      case type.SIGNINDETAIL:
        this.edit = false;
        break;
      case type.GOOUTDETAIL:
        this.edit = false;
        break;
    }
  },
  watch: {
    //自动获取时间+地点
    map: function() {
      if (this.map != "") {
        this.getLocationInfo();
      }
    }
  },
  methods: {
    renderPage(result) {
      this.currentTime = getCurrentTime();
      this.shotAddress = result.aois[0].name;
      this.address = result.formattedAddress;
      this.lng = result.position.lng;
      this.lat = result.position.lat;
      this.center = [result.position.lng, result.position.lat];
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
      //this.edit = false;
      this.$router.back();
      this.$router.replace({
        name: "clockIn",
        params: {
          source: this.source
        }
      });
    },
    //获取定位信息
    getLocationInfo() {
      let vm = this;
      let map = this.amapManage.getMap();
      let geolocation;
      map.plugin("AMap.Geolocation", function() {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          showButton: true, //显示定位按钮，默认：true
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          extensions: "all"
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", function(data) {
          console.log(data);
          vm.renderPage(data);
        }); //返回定位信息
        AMap.event.addListener(geolocation, "error", function(data) {
          console.log(data);
          vm.autoLocationError();
        }); //返回定位出错信息
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
