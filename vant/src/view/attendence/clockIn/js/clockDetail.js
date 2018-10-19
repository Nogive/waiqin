import AMap from "AMap";
import AMapUI from "AMapUI";
import * as type from "@/assets/js/typeVariable";
import { mapGetters, mapActions } from "vuex";
import { takePhoto, startLocate, stopLocate, savePhoto } from "@/utils/native";
import { getUuid, getTimeFromServer } from "@/assets/js/common";
const userId = "100001";
var map;
var marker;
export default {
  name: "attendenceDetail",
  data() {
    let vm = this;
    return {
      source: null,
      id: null, //当前规则id
      title: "打卡详情",
      clockTime: Date.parse(new Date()), //打卡时间
      shotAddress: "", //打卡地点
      address: "", //打卡详细位置
      photos: [], //图片数组
      note: "", //备注
      isEdit: true, //编辑页 or 详情页
      showMarker: false,
      takePhotoBtn: true, //拍照按钮
      showPhoto: false, //放大图片弹框
      largeImg: {}, //被放大的图片
      currentIndex: 0, //被放大图片的index
      center: [121.59996, 31.197646], //地图默认中心点
      location: null, //定位信息
      timeFrom: "",
      cameraTime: ""
    };
  },
  mounted: function() {
    this.source = this.$route.params.source;
    this.id = this.$route.params.id;
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
        this.isEdit = false;
        break;
      case type.SIGNOUTDETAIL:
        this.isEdit = false;
        break;
      case type.GOOUTDETAIL:
        this.isEdit = false;
        break;
    }
    let vm = this;
    definedBackbehavior(function() {
      vm.showPhoto = false;
    });
    //restoreBackButton();
    this._initMap();
  },
  watch: {
    //最多允许拍8张
    photos() {
      if (this.photos.length >= 8) {
        this.takePhotoBtn = false;
      } else {
        this.takePhotoBtn = true;
      }
    },
    showPhoto() {
      if (this.showPhoto) {
        stopBehaviorOfBackButton();
      } else {
        restoreBackButton();
      }
    },
    appState() {
      if (this.appState == "resume") {
        this.onLocation();
      } else {
        stopLocate();
      }
    }
  },
  computed: {
    ...mapGetters(["appState"])
  },
  methods: {
    _initMap() {
      map = new AMap.Map("mapContent", {
        zoom: 14,
        center: this.center
      });
      this.createMarker();
    },
    createMarker() {
      let _this = this;
      AMapUI.loadUI(["overlay/SimpleMarker"], function(SimpleMarker) {
        marker = new SimpleMarker({
          showPositionPoint: false,
          position: _this.center,
          iconStyle: {
            src:
              "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
            style: {
              width: "20px",
              height: "30px"
            }
          }
        });
        map.add(marker);
      });
    },
    updateMarker() {
      if (marker) {
        map.remove(marker);
      }
      this.createMarker();
    },
    //通过id 获取详情并展示
    getDetailById() {
      let vm = this;
      this.$axios.get("/api/clockDetail", { id: vm.id }).then(
        res => {
          if (res.code == vm.CommonConstants.API_CODE.OK) {
            vm.renderPage(res.data);
          } else {
            vm.$codeError(res);
          }
        },
        err => {
          vm.$netError(err.response);
        }
      );
    },
    //渲染页面
    renderPage(data) {
      this.clockTime = data.clockTime;
      this.shotAddress = data.address;
      this.address = data.address;
      this.center = [data.lng, data.lat];
      this.showMarker = true;
      this.note = data.note;
      let temp = [];
      data.photos.forEach(e => {
        temp.push({
          id: e,
          url: this.imgPrefix + e
        });
      });
      this.photos = temp;
    },
    //获取定位信息
    onLocation() {
      let vm = this;
      startLocate(
        data => {
          vm.location = data;
          vm.address = data.adr;
          vm.shotAddress = data.sdr;
          vm.center = [data.lng, data.lat];
          vm.showMarker = true;
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
    //每个10s获取时间
    getTimeInterval() {
      let vm = this;
      setInterval(function() {
        getTimeFromServer().then(res => {
          vm.clockTime = res.date;
        });
      }, 10000);
    },
    //拍照
    evokeCamera() {
      getTimeFromServer().then(res => {
        let [waterTime, timestamp] = [];
        if (res.form == "LT") {
          timestamp = "LT" + res.date;
        } else {
          timestamp = res.date;
        }
        waterTime = getWaterTime(timestamp);
        takePhoto(
          imgUri => {
            this.photos.push({
              uuid: userId + "@" + timestamp + "@" + getUuid(),
              url: imgUri
            });
          },
          err => {
            Toast("拍照失败，失败原因：" + err);
          },
          [waterTime]
        );
      });
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
    //确认打卡
    confirmTheClock() {
      let vm = this;
      let params = {
        clockTime: this.clockTime,
        address: this.address,
        photos: this.photos,
        note: this.note,
        location: this.location
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
      this.$showLoading("图片上传中，请稍候");
      let vm = this;
      let promises = [];
      this.photos.forEach(e => {
        promises.push(savePhoto(e));
      });
      Promise.all(promises)
        .then(arr => {
          vm.$hideLoading();
          vm.$router.back();
          vm.$router.replace({
            name: "clockIn",
            params: {
              source: this.source
            }
          });
        })
        .catch(err => {
          vm.$toast("图片上传失败");
          console.log(err);
        });
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
