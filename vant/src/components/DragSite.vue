<template>
  <div class="map-box">
    <div class="search" v-show="placeSearch">
      <input type="text" placeholder="请输入关键字" v-model="searchKey">
      <button type="button" @click.stop="handleSearch">搜索</button>
      <div id="searchResult" v-show="searchKey" class="result"></div>
    </div>
    <div id="mapContainer" class="map"></div>
  </div>
</template>
<style scoped>
.map-box{ width: 100%; height: 300px; position: relative; }
.map-box .map{ width: 100%; height: 100%; }
.map-box .search{ position: absolute; top: 10px; left: 10px; width:calc(100% - 20px) ; z-index: 1; }
.map-box .search input{float: left; height: 32px; width: 80%; border: 1px solid #ccc; line-height: 20px; padding-left: 5px; outline: none; font-size: 0.8rem; }
.map-box .search button{height: 32px; line-height: 32px; background: #fff; border: 1px solid #ccc; width: 20%; text-align: center; font-size: 0.8rem; }
.map-box .result{ max-height: 240px; overflow: auto; margin-top: 10px; }
</style>
<script>
import remoteLoad from '@/common/js/remoteLoad'
import {mapKey,mapCityName} from '@/common/js/commonFunc'
export default {
  name:'dragSite',
  props:['lng','lat'],
  data(){
    return{
      searchKey:'',
      placeSearch:null,
      dragStatus:false,
      AMapUI:null,
      AMap:null
    }
  },
  watch:{
    searchKey(){
      if(this.searchKey===''){
        this.placeSearch.clear();
      }
    }
  },
  methods:{
    handleSearch(){
      if(this.searchKey){
        this.placeSearch.search(this.searchKey)
      }
    },
    initMap(){
      let AMapUI=this.AMapUI=window.AMapUI;
      let AMap=this.AMap=window.AMap;
      AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
        let mapConfig = {
          zoom: 15
        }
        if (this.lat && this.lng) {
          mapConfig.center = [this.lng, this.lat]
        }
        let map = new AMap.Map('mapContainer', mapConfig)
        // 加载地图搜索插件
        AMap.service('AMap.PlaceSearch', () => {
          this.placeSearch = new AMap.PlaceSearch({
            pageSize: 5,
            pageIndex: 1,
            citylimit: true,
            city: mapCityName,
            map: map,
            panel: 'searchResult'
          })
        })
        // 创建地图拖拽
        let positionPicker = new PositionPicker({
          mode: 'dragMap', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: map // 依赖地图对象
        })
        // 拖拽完成发送自定义 drag 事件
        positionPicker.on('success', positionResult => {
          // 过滤掉初始化地图后的第一次默认拖放
          this.$emit('drag', positionResult)
        })
        // 启动拖放
        positionPicker.start()
      })
    }
  },
  async created () {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initMap()
    // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${mapKey}`)
      await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
      this.initMap()
    }
  }
}
</script>

