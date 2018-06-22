<template>
  <div class="set-place-box">
    <van-nav-bar
      title="设置打卡地点"
      left-arrow
      left-text="返回"
      @click-left="reback"
    >
      <div slot="right">
        <van-icon name="search"></van-icon>
        <van-button size="small" class="bg-blue">确定</van-button>
      </div>
    </van-nav-bar>

    <dragSite @drag="dragMap" :lng="center.lng" :lat="center.lat" :range="range"  class="mapbox"></dragSite>

    <van-cell-group class="pois-box">
      <van-cell v-for="(item,index) in poisArr" :key="index" class="one-place" @click="checkPoint(item)">
        <template slot="title">
          <span class="van-cell-text">{{item.name}}</span>
          <span>{{item.address}}</span>
        </template>
        <van-icon v-show="item.checked" slot="right-icon" name="success" class="van-cell__right-icon blue" />
      </van-cell>
    </van-cell-group>

    <van-cell-group class="range-box"> 
      <van-cell title="打卡范围" :value="`${range}米`" is-link @click="showRange=true"/>
    </van-cell-group>
    <van-popup class="w60" v-model="showRange">
      <van-cell-group>
        <van-cell title="打卡范围" />
        <van-cell title="100米" @click="checkClockRange(100)" />
        <van-cell title="200米" @click="checkClockRange(200)" />
        <van-cell title="300米" @click="checkClockRange(300)" />
      </van-cell-group> 
    </van-popup>
  </div>
</template>

<style scoped>
  .amap-page-container{
    height: 300px;
  }
  .range-box{
    position: fixed;
    bottom: 0px;
    width: 100%;
  }
  .w60{
    width: 60%;
  }
  .van-cell{
    line-height:initial;
  }
  .one-place span{
    display: block;
  }
  .one-place span:last-child{
    color: #a7a4a4;
    font-size: 0.6rem;
  }
  .one-place .van-icon{
    font-size: 1.2rem;
    margin-top: 0.3rem;
  }
  .pois-box{
    max-height: 350px;
    overflow: scroll;
  }
</style>
<script>
import router from '@/router'
import dragSite from '@/components/DragSite.vue'
export default {
  name:'setClockPlace',
  components:{
    dragSite
  },
  data(){
    let vm=this;
    return {
      center:{lng:121.473658,lat:31.230378},//地图默认经纬度
      range:100,//打卡范围
      showRange:false,//打卡范围弹框
      checked:false,//勾选附近点
      poisArr:[]//附近的点
    }
  },
  watch:{
    'map':function(){}
  },
  methods:{
    reback(){
      router.push('/writeRule');
    },
    //初始页面
    initPage(result){
      console.log(result);
    },
    //选择打卡范围
    checkClockRange(range){
      this.range=range;
      this.showRange=false;
    },
    //拖拽地图选点
    dragMap(data) {
      console.log(data);
      let nearPois=data.regeocode.pois;
      let newArr=[];
      nearPois.forEach(e=>{
        e['checked']=false;
        newArr.push(e);
      })
      this.poisArr=newArr;
    },
    //选择某个地点
    checkPoint(item){
      let idx=this.poisArr.indexOf(item);
      this.poisArr.forEach((e,i)=>{
        if(i==idx){
          e.checked=true;
        }else{
          e.checked=false;
        }
      })
    }
  }
}
</script>
