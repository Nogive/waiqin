<template>
  <div class="set-place-box">
    <van-nav-bar
      title="设置打卡地点"
      left-arrow
      left-text="返回"
      @click-left="$router.back()"
    >
      <div slot="right">
        <van-icon name="search" @click="startSearch"></van-icon>
        <van-button size="small" class="bg-blue">确定</van-button>
      </div>
    </van-nav-bar>

    <div class="amap-page-container">
      <div class="search-box" v-if="showSearch">
        <input type="search" id="searchPlace" v-model="searchKey">
        <button @click="searchByHand">搜索</button>
        <div class="out-box" id="searchTip"></div>
      </div>
      <el-amap 
        vid="amap" 
        :zoom="zoom" 
        class="amap-demo" 
        :center="center"
        :amapManager="amapManager"
        :events="events"
        >
        <el-amap-circle 
          vid="circle"
          :center="circleCenter" 
          :radius="range*2" 
          fill-opacity="0.2"
          strokeColor="#38f"
          strokeOpacity="0.8"
          strokeWeight="1"
          fillColor="#38f"
          v-if="showCircle"
          >
        </el-amap-circle>
      </el-amap>
    </div>

    <van-cell-group class="pois-box">
      <van-cell v-for="(item,index) in poisArr" :key="index" class="one-place" @click="checkPoint(item)">
        <template slot="title">
          <span class="van-cell-text">{{item.name}}</span>
          <span>{{item.address}}</span>
        </template>
        <van-icon v-if="item.checked" slot="right-icon" name="success" class="van-cell__right-icon blue" />
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
    position: relative;
  }
  .search-box{
    position: absolute;
    width: 90%;
    height: 30px;
    top:10px;
    left:5%;
    z-index: 99;
  }
  .search-box input{
    float: left;
    width: 80%;
    height: 100%;
    border: 1px solid rgba(51,136,255,.4);
    border-radius: 5px 0 0 5px;
    padding: 0 5px;
    font-size: 0.8rem;
  }
  .search-box button{
    float: left;
    width: 20%;
    height: 100%;
    border: 1px solid #38f;
    background-color: #38f;
    font-size: 0.8rem;
    color: #fff;
    border-radius: 0 5px 5px 0;
  }
  .out-box{
    width: 100%;
    max-height: 260px;
    position: absolute;
    top:30px;
    overflow-y: auto;
    background-color: #fff;
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
<script src="./js/setClockPlace.js"></script>
