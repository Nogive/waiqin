import AMap from "AMap";
import AMapUI from "AMapUI";
import { startLocate, stopLocate } from "@/utils/native";
var map;
var circle;
export default {
  data() {
    let _this = this;
    return {
      posH: 200, //附近的点的容器的最大高度
      showRange: false, //打卡范围弹窗
      range: 100, //打卡范围
      drag: true, //地图是否可拖拽
      address: "", //当前地址
      center: [121.47519, 31.228833], //地图中心点
      changeNearlyPoints: true, //是否更新附近的点
      nearlyPoints: [], //附近的点数据
      selectedIndex: 0, //选中附近的点的索引
      startSearch: false, //开启搜索框
      locateArr: [], //定位数据
      locateLength: 0, //几组定位数据
      ruleId: "",
      currentRule: {},
      id: "",
      currentPosition: {} //当前打卡位置
    };
  },
  mounted() {
    this._initMap();
    this.initPointsHeight();
    this.initRuleData();
  },
  watch: {
    locateLength() {
      if (this.locateLength >= 5) {
        stopLocate();
        this.showLocateData();
      }
    }
  },
  methods: {
    initPointsHeight() {
      let aH = window.screen.availHeight;
      let t = document.getElementById("pointsWrapper").offsetTop;
      let fH = document.getElementById("rangeWrapper").offsetHeight;
      this.posH = aH - t - fH;
    },
    _initMap() {
      let _this = this;
      map = new AMap.Map("container", {
        zoom: 16,
        center: this.center,
        dragEnable: _this.drag
      });
      this.createCircle();
      map.on("dragstart", function(e) {
        _this.changeNearlyPoints = true;
        _this.selectedIndex = 0;
      });
      //拖拽插件
      AMapUI.loadUI(["misc/PositionPicker"], function(PositionPicker) {
        var positionPicker = new PositionPicker({
          mode: "dragMap", //拖拽地图模式
          map: map
        });
        positionPicker.on("success", function(positionResult) {
          _this.address = positionResult.address;
          _this.center = [
            positionResult.position.lng,
            positionResult.position.lat
          ];
          if (_this.changeNearlyPoints) {
            _this.nearlyPoints = positionResult.regeocode.pois;
          }
          _this.updateCircle();
        });
        positionPicker.on("fail", function(positionResult) {
          Toast("地图加载出现问题，请保证网络环境，稍后重试~");
        });
        positionPicker.start();
        _this.positionPicker = positionPicker;
      });
    },
    initRuleData() {
      this.ruleId = this.$getSession("ruleId");
      this.currentRule = this.$getSession("r" + this.ruleId);
      this.id = this.$route.params.id;
      this.currentRule.clockPosition.forEach(e => {
        if (e.id == this.id) {
          this.currentPosition = e;
        }
      });
    },
    onLocation() {
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
    showLocateData() {
      this.locateArr.sort((a, b) => {
        return b.acr - a.acr;
      });
      this.updateMap(this.locateArr[0], true);
    },
    updateMap(location, updatepios) {
      if (updatepios) {
        this.selectedIndex = 0;
      }
      this.center = [location.lng, location.lat];
      this.changeNearlyPoints = updatepios;
      this.positionPicker.start(this.center);
    },
    createCircle() {
      let _this = this;
      circle = new AMap.Circle({
        center: _this.center,
        radius: _this.range, //半径
        strokeColor: "rgb(0,160,220)", //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 1, //线粗细度
        fillColor: "rgb(0,160,220)", //填充颜色
        fillOpacity: 0.35 //填充透明度
      });
      map.add(circle);
    },
    updateCircle() {
      if (circle) {
        map.remove(circle);
      }
      this.createCircle();
    },
    checkPoint(item, index) {
      console.log(item.name);
      this.selectedIndex = index;
      this.updateMap(item.location, false);
    },
    checkClockRange(range) {
      this.showRange = false;
      this.range = range;
      this.updateCircle();
    },
    onSearch() {
      let _this = this;
      this.startSearch = true;
      AMap.plugin("AMap.Autocomplete", function() {
        var auto = new AMap.Autocomplete({
          input: "searchInput",
          output: "searchResults"
        });
        auto.on("select", function(data) {
          AMap.service(["AMap.PlaceSearch"], function() {
            //构造地点查询类
            var placeSearch = new AMap.PlaceSearch({
              panel: "searchResults" // 结果列表将在此容器中进行展示。
            });
            //关键字查询
            placeSearch.search(data.poi.name);
            placeSearch.on("listElementClick", function(selected) {
              _this.startSearch = false;
              _this.updateMap(selected.data.location, true);
            });
          });
        });
      });
    },
    onSubmit() {
      let result = {
        id: this.id,
        address: this.address,
        lat: this.center[1],
        lng: this.center[0],
        range: this.range
      };
      if (this.id) {
        let idx = this.currentRule.clockPosition.indexOf(this.currentPosition);
        this.currentRule.clockPosition[idx] = result;
      } else {
        this.currentRule.clockPosition.push(result);
      }
      this.$setSession("r" + this.ruleId, this.currentRule);
      this.$router.back();
    }
  }
};
