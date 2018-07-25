import { Toast, ImagePreview, Dialog } from "vant";
import * as type from "@/assets/js/typeVariable";
import { takePhoto, startLocate, stopLocate } from "@/utils/native";
import { getUuid, getTimeFromServer } from "@/assets/js/commonFunc";
const photoMap = [
  {
    uuid: 1,
    url: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
  },
  {
    uuid: 2,
    url: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
  },
  {
    uuid: 3,
    url: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
  },
  {
    uuid: 4,
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
      source: null,
      title: "打卡详情",
      deleteBth: true, //是否可编辑
      currentTime: Date.parse(new Date()), //打卡时间
      shotAddress: "", //打卡地点
      address: "", //打卡详细位置
      photos: photoMap, //图片数组
      message: "", //备注
      showPhoto: false, //是否放大图片
      largePhoto: null, //被放大的图片
      currentIndex: 0, //被放大图片的index
      map: null,
      zoom: 15, //地图放大级别
      center: [121.59996, 31.197646], //地图默认中心点
      amapManage,
      events: {
        init(o) {
          vm.map = o;
        }
      },
      location: null, //定位信息
      showMarker: false, //定位所在marker
      showSubBtn: false //确认按钮
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
        this.deleteBth = false;
        break;
      case type.GOOUTDETAIL:
        this.deleteBth = false;
        break;
    }
    console.log(getUuid());
  },
  watch: {
    //自动获取时间+地点
    map: function() {
      if (
        this.map != null &&
        this.source != type.SIGNINDETAIL &&
        this.source != type.GOOUTDETAIL
      ) {
        //this.onLocation();
      }
    }
  },
  methods: {
    //拍照上传
    evokeCamera() {
      takePhoto(
        imgUri => {
          console.log(imgUri);
          this.photos.push({
            uuid: this.currentTime + "@" + getUuid(),
            url: imgUri
          });
          console.log(this.photos);
        },
        err => {
          Toast("拍照失败，失败原因：" + err);
        }
      );
    },
    //预览图片
    photoPreview(index) {
      this.currentIndex = index;
      this.showPhoto = true;
    },
    //删除图片
    deletePhoto() {
      this.photos.splice(this.currentIndex, 1);
      this.showPhoto = false;
    },
    //获取定位信息
    onLocation() {
      let vm = this;
      startLocate(
        data => {
          vm.location = data;
          vm.renderPage();
          vm.getCurrentTime();
        },
        err => {
          vm.autoLocationError(err);
        },
        5000
      );
    },
    //定位失败
    autoLocationError(err) {
      Dialog.confirm({
        title: "提示",
        message:
          "定位失败,请确保设备联网且允许GPS定位。点击确认进行重新定位。失败原因：" +
          err
      })
        .then(() => {
          this.onLocation();
        })
        .catch(() => {
          console.log("取消");
        });
    },
    renderPage() {
      let result = this.location;
      this.shotAddress = result.adr;
      this.address = result.adr;
      this.center = [result.lng, result.lat];
      this.showMarker = true;
    },
    getCurrentTime() {
      this.showSubBtn = true;
      getTimeFromServer().then(res => {
        if (res) {
          this.currentTime = Date.parse(new Date(res));
        }
      });
    },
    //确认打卡
    confirmTheClock() {
      this.$router.back();
      this.$router.replace({
        name: "clockIn",
        params: {
          source: this.source
        }
      });
    }
  }
};
