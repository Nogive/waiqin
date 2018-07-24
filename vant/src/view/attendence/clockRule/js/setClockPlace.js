import { startLocate, stopLocate } from "@/utils/native";
import { AMapManager } from "vue-amap";
import { Toast } from "vant";
let amapManager = new AMapManager();
export default {
  name: "setClockPlace",
  data() {
    let vm = this;
    return {
      posH: 400, //附近的点容器最大高度
      locateArr: [],
      locateLength: 0,
      zoom: 15,
      center: [121.473658, 31.230378],
      range: 100, //打卡范围
      showRange: false, //打卡范围弹框
      checked: false, //勾选附近点
      poisArr: [], //附近的点
      showCircle: false, //显示打卡范围
      showSearch: false, //显示搜索框
      updatePois: true, //更新附近的点
      positionPicker: null, //拖拽对象
      searchKey: "",
      poiPicker: null,
      amapManager,
      map: null,
      events: {
        init(o) {
          vm.map = o;
        },
        touchstart() {
          vm.showCircle = false;
          vm.updatePois = true;
        }
      }
    };
  },
  watch: {
    map: function() {
      if (this.map != null) {
        this.startDrag();
      }
    },
    locateLength() {
      if (this.locateLength >= 5) {
        stopLocate();
        this.showLocateData();
      }
    }
  },
  mounted() {
    let h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.posH = h - 390;
  },
  methods: {
    //选择打卡范围
    checkClockRange(range) {
      this.range = range;
      this.showRange = false;
    },
    onLocate() {
      let vm = this;
      vm.locateLength = 0;
      vm.locateArr = [];
      startLocate(
        data => {
          vm.locateLength++;
          vm.locateArr.push(data);
        },
        err => {
          if (vm.locateLength == 0) {
            Toast(
              "定位失败，请确保设备联网且开启GPS定位权限。错误原因：" + err
            );
          } else {
            stopLocate();
            vm.showLocateData();
          }
        }
      );
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
        //drag
        positionPicker.on("success", function(positionResult) {
          vm.center = [
            positionResult.position.lng,
            positionResult.position.lat
          ];
          vm.showCircle = true;
          let results = positionResult.regeocode.pois;
          results.forEach(e => {
            e.checked = false;
          });
          if (vm.updatePois) {
            vm.poisArr = results;
          }
        });
        positionPicker.on("fail", function(failResult) {
          console.log(failResult);
        });
        vm.positionPicker = positionPicker;
        positionPicker.start();
      });
    },
    startSearch() {
      let vm = this;
      let map = this.amapManager.getMap();
      this.showSearch = true;
      AMapUI.loadUI(["misc/PoiPicker"], function(PoiPicker) {
        var poiPicker = new PoiPicker({
          input: "searchPlace", //输入框id
          placeSearchOption: {
            map: map
          },
          suggestContainer: "searchTip",
          searchResultsContainer: "searchTip"
        });
        vm.poiPicker = poiPicker;
        //监听poi选中信息
        poiPicker.on("poiPicked", function(poiResult) {
          let source = poiResult.source;
          let poi = poiResult.item;
          if (source !== "search") {
            poiPicker.searchByKeyword(poi.name);
          } else {
            //用户选中的poi点信息
            vm.center = [
              poiResult.item.location.lng,
              poiResult.item.location.lat
            ];
            poiPicker.clearSearchResults();
            vm.searchKey = "";
            vm.showSearch = false;
          }
        });
      });
    },
    searchByHand() {
      if (this.searchKey != "") {
        this.poiPicker.searchByKeyword(this.searchKey);
      }
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
      this.updatePois = false;
      this.center = [item.location.lng, item.location.lat];
    },
    //显示定位数据
    showLocateData() {
      this.locateArr.sort((a, b) => {
        return b.acr - a.acr;
      });
      this.center = [this.locateArr[0].lng, this.locateArr[0].lat];
      this.updatePois = true;
    },
    onSubmit() {
      console.log(this.center);
      console.log(this.range);
    }
  }
};
