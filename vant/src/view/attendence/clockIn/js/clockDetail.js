import { Toast, Dialog } from "vant";
import * as type from "@/assets/js/typeVariable";
import { takePhoto, startLocate, stopLocate, savePhoto } from "@/utils/native";
import { getUuid, getTimeFromServer } from "@/assets/js/commonFunc";
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
      photos: [], //图片数组
      message: "", //备注
      showPhoto: false, //是否放大图片
      largeImg: {}, //被放大的图片
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
      showSubBtn: false, //确认按钮
      showCamera: true
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
    let vm = this;
    definedBackbehavior(function() {
      vm.showPhoto = false;
    });
    //restoreBackButton();
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
    },
    photos() {
      if (this.photos.length >= 8) {
        this.showCamera = false;
      } else {
        this.showCamera = true;
      }
    },
    showPhoto() {
      if (this.showPhoto) {
        stopBehaviorOfBackButton();
      } else {
        restoreBackButton();
      }
    }
  },
  methods: {
    //拍照上传
    evokeCamera() {
      let now = getWaterTime(this.getCurrentTime());
      takePhoto(
        imgUri => {
          this.photos.push({
            uuid: this.currentTime + "@" + getUuid(),
            url: imgUri
          });
        },
        err => {
          Toast("拍照失败，失败原因：" + err);
        },
        [now]
      );
    },
    //预览图片
    photoPreview(item, index) {
      this.currentIndex = index;
      this.largeImg = item;
      this.showPhoto = true;
      definedBackbehavior(function() {
        this.showPhoto = false;
      });
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
          vm.showSubBtn = true;
          vm.currentTime = Date.parse(vm.getCurrentTime());
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
      let now = new Date();
      getTimeFromServer().then(res => {
        if (res) {
          now = new Date(res);
        }
      });
      return now;
    },
    //确认打卡
    confirmTheClock() {
      let vm = this;
      let params = {
        clockTime: this.currentTime,
        address: this.address,
        photos: this.photos,
        message: this.message
      };
      this.$axios.post("url", params).then(
        res => {
          let data = res.data;
          if (data.code == vm.CommonConstants.API_CODE.OK) {
            vm.uploadPhoto();
          } else {
            vm.$codeError(data, "确认打卡");
          }
        },
        err => {
          vm.$netError(err);
        }
      );
    },
    uploadPhoto() {
      console.log("上传");
      let vm = this;
      let options = [this.photos[0].url, this.photos[0].uuid];
      savePhoto(options).then(
        res => {
          console.log(res);
          vm.$router.back();
          vm.$router.replace({
            name: "clockIn",
            params: {
              source: this.source
            }
          });
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
function getWaterTime(date) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let result = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
  return result;
}

function stopBehaviorOfBackButton() {
  cordova.exec(null, null, "CoreAndroid", "overrideBackbutton", [true]);
}
function restoreBackButton() {
  cordova.exec(null, null, "CoreAndroid", "overrideBackbutton", [false]);
}
function definedBackbehavior(fn) {
  document.addEventListener("backbutton", fn);
}
