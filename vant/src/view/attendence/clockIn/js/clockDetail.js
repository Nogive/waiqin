import { Toast, ImagePreview, Dialog } from "vant";
import * as type from "@/assets/js/typeVariable";
import { takePhoto, startLocate, stopLocate } from "@/utils/native";
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
      currentTime: 1532403276700, //打卡时间
      shotAddress: "", //打卡地点
      address: "", //打卡详细位置
      photos: photoMap, //图片数组
      message: "", //备注
      showPhoto: false, //是否放大图片
      largePhoto: "", //被放大的图片
      map: null,
      zoom: 15, //地图放大级别
      center: [121.59996, 31.197646], //地图默认中心点
      amapManage,
      events: {
        init(o) {
          vm.map = o;
        }
      },
      locateLength: 0,
      locateArr: [],
      showMarker: false
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
      if (this.map != null) {
        //this.onLocation();
      }
    },
    locateLength() {
      if (this.locateLength >= 5) {
        stopLocate();
        this.renderPage();
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
            id: Date.parse(new Date()),
            url: imgUri
          });
        },
        err => {
          Toast("拍照失败，失败原因：" + err);
        }
      );
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
    onLocation() {
      let vm = this;
      startLocate(
        data => {
          console.log(data);
          vm.locateLength++;
          vm.locateArr.push(data);
        },
        err => {
          vm.autoLocationError(err);
        }
      );
    },
    renderPage() {
      let results = this.locateArr;
      results.sort((a, b) => {
        return b.acr - a.acr;
      });
      let result = results[0];
      console.log(result);
      this.currentTime = result.tme;
      this.shotAddress = result.adr;
      this.address = result.adr;
      this.center = [result.lng, result.lat];
      this.showMarker = true;
    },
    createMarker() {
      this.showMarker = true;
    }
  }
};
