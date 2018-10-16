<template>
  <div class="map-box">
    <van-nav-bar
      title="设置打卡地点"
      left-arrow
      left-text="返回"
      @click-left="$router.back()"
    >
      <div slot="right">
        <van-icon name="search" @click="onSearch"></van-icon>
        <van-button size="small" class="bg-blue" @click="onSubmit">确定</van-button>
      </div>
    </van-nav-bar>

    <div class="map-content" id="container">
      <van-icon name="location" class="icon" @click.stop.prevent="onLocation"></van-icon>
      <div class="search-bar" v-show="startSearch">
        <input class="search-input" id="searchInput" placeholder="输入关键字搜素"/>
        <van-icon name="search" class="search"></van-icon>
      </div>
      <div v-show="startSearch" class="result-wrapper" id="searchResults"></div>
    </div>
    <van-cell-group class="near-points" id="pointsWrapper" :style="{maxHeight:posH+'px'}">
      <van-cell v-for="(item,index) in nearlyPoints" :key="index" class="point-item" @click="checkPoint(item,index)">
        <template slot="title">
          <span class="name">{{item.name}}</span>
          <span class="address">{{item.address}}</span>
        </template>
        <van-icon v-if="index===selectedIndex" slot="right-icon" name="success" class="icon" />
      </van-cell>
    </van-cell-group>

    <van-cell-group id="rangeWrapper" class="range-column"> 
      <van-cell title="打卡范围" :value="`${range}米`" is-link @click="showRange=true"/>
    </van-cell-group>
    <van-popup class="range-content" v-model="showRange">
      <van-cell-group>
        <van-cell title="打卡范围" />
        <van-cell title="100米" @click="checkClockRange(100)">
          <van-icon v-show="range==100" slot="right-icon" name="success" class="icon" />
        </van-cell>
        <van-cell title="200米" @click="checkClockRange(200)">
          <van-icon v-show="range==200" slot="right-icon" name="success" class="icon" />
        </van-cell>
        <van-cell title="300米" @click="checkClockRange(300)">
          <van-icon v-show="range==300" slot="right-icon" name="success" class="icon" />
        </van-cell>
      </van-cell-group> 
    </van-popup>
  </div>
</template>

<style lang="stylus">
.map-box
  .map-content
    width 100%
    height 300px
    position relative
    .icon
      position absolute
      z-index 2
      font-size 20px
      color rgb(0,160,220)
      right 8px
      bottom 8px
    .search-bar
      position absolute
      z-index 2
      width 100%
      height 35px
      background-color #ffffff
      .amap-ui-poi-picker-sugg
        min-height 265px
        overflow-y scroll
      .search-input
        width 90%
        height 100%
        padding 0 8px
        border none
      .search
        font-size 20px
        position absolute
        right 8px
        top 5px
    .result-wrapper
      position absolute
      width 100%
      max-height 265px
      overflow-y scroll
      top 35px
      left 0
      z-index 2        
  .near-points
    max-height 280px
    overflow-y scroll
    .point-item
      padding 5px 25px 8px 15px
      .name
        display block
      .address
        display block
        font-size 12px
        color rgb(147,153,159)
        line-height 14px
      .icon
        position absolute
        font-size 16px
        color rgb(0,160,220)
        right 8px
        top 25px
  .range-column
    width 100%
    position fixed
    left 0
    bottom 0
  .range-content
    width 80%
  .loading-wrapper
    max-width 80%
    .loading-content
      text-align center
      padding 10px
      .loading-img
        .van-loading
          margin 0 auto
      .text
        font-size 12px
        margin-bottom 0
</style>
<script src="./js/setClockPlace.js"></script>
