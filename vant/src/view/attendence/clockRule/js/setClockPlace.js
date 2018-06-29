import router from "@/router";
import { AMapManager } from "vue-amap";
let amapManager = new AMapManager();
export default {
  name: "setClockPlace",
  data() {
    let vm = this;
    return {
      zoom: 15,
      center: [121.473658, 31.230378],
      circleCenter: [121.473658, 31.230378],
      range: 100, //打卡范围
      showRange: false, //打卡范围弹框
      checked: false, //勾选附近点
      poisArr: [], //附近的点
      amapManager,
      map: null,
      events: {
        init(o) {
          vm.map = o;
        }
      }
    };
  },
  watch: {
    map: function() {
      if (this.map != null) {
        this.startDrag();
      }
    }
  },
  methods: {
    reback() {
      router.push("/writeRule");
    },
    //选择打卡范围
    checkClockRange(range) {
      this.range = range;
      this.showRange = false;
    },
    //拖拽地图选点
    startDrag() {
      let vm = this;
      let map = this.amapManager.getMap();
      AMapUI.loadUI(["misc/PositionPicker"], function(PositionPicker) {
        var positionPicker = new PositionPicker({
          mode: "dragMap",
          map: map
        });
        //定位
        let geolocation;
        map.plugin("AMap.Geolocation", function() {
          geolocation = new AMap.Geolocation({
            showButton: true, //显示定位按钮，默认：true
            showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
            extensions: "all"
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, "complete", function(data) {
            positionPicker.start();
          });
          AMap.event.addListener(geolocation, "error", function(data) {
            positionPicker.start();
          });
        });
        positionPicker.on("success", function(positionResult) {
          vm.circleCenter = [
            positionResult.position.lng,
            positionResult.position.lat
          ];
          let results = positionResult.regeocode.pois;
          results.forEach(e => {
            e.checked = false;
          });
          vm.poisArr = results;
        });
        positionPicker.on("fail", function(failResult) {
          console.log(failResult);
        });
      });
    },
    dragMap() {
      console.log("drag");
    },
    //选择某个地点
    checkPoint(item) {
      let idx = this.poisArr.indexOf(item);
      this.poisArr.forEach((e, i) => {
        if (i == idx) {
          e.checked = true;
        } else {
          e.checked = false;
        }
      });
      //this.circleCenter = [item.location.lng, item.location.lat];
    }
  }
};
