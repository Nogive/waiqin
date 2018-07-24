<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      left-text="返回"
      right-text="测试"
      @click-left="$router.back()"
      @click-right="getCurrentTime()"
    />
    <div class="clock-detail-box">
      <van-row>
        <van-col span="6">打卡时间</van-col>
        <van-col span="18" class="red">{{currentTime|timeFormat('hh:mm')}}</van-col>
      </van-row>
      <van-row>
        <van-col span="6">打卡地点</van-col>
        <van-col span="18" class="address-body">
          <p>{{shotAddress}}</p>
          <p class="specific-addr">{{address}}</p>
          <div class="amap-page-container">
            <el-amap 
              vid="clockMap" 
              :zoom="zoom" 
              :amap-manager="amapManage"
              :events="events" 
              class="amap-img" 
              :center="center">
              <el-amap-marker :position="center" v-if="showMarker"></el-amap-marker>
            </el-amap>
            <van-icon name="locate" class="locate-btn" @click="onLocation"></van-icon>
          </div>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6">备注</van-col>
        <van-col span="18">
          <van-field 
            v-model="message"
            type="textarea"
            placeholder="请输入备注"
            rows="1"
            autosize
          />
          <van-row gutter="15" class="photo-box">
            <van-col span="6">
              <a href="javascript:;" @click="evokeCamera"></a>
            </van-col>
            <van-col span="6" v-for="item in photos" :key="item.uuid">
              <img @click="photoPreview(item)" :src="item.url" alt="">
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>
    <van-button 
      v-show="showSubBtn" 
      class="large-btn" 
      size="large" 
      @click="confirmTheClock">确认打卡</van-button>

    <van-popup v-model="showPhoto" class="modal-box">
      <!-- <van-icon 
        v-show="deleteBth" 
        name="delete" 
        @click.stop="deletePhoto"></van-icon>
      <img :src="largePhoto.url" alt="" @click.self="showPhoto=false"> -->
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(img, index) in photos" :key="index">
          <img v-lazy="img.url" />
        </van-swipe-item>
      </van-swipe>
    </van-popup>

  </div>
</template>
<script src="./js/clockDetail.js"></script>

<style scoped>
  .clock-detail-box{
    margin-top: 0.7rem;
    background-color: white;
    padding: 0rem 0.7rem 0.7rem;
  }
  .van-row{
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .van-row:last-child{
    border-bottom: none;
  }
  .address-body img{
    width: 100%;
  }
  .amap-page-container{
    width: 100%;
    position: relative;
  }
  .locate-btn{
    position: absolute;
    font-size: 1.6rem;
    bottom: 0.5rem;
    right: 0.5rem;
  }
  .amap-img{
    height: 10rem;
  }
  .specific-addr{
    font-size: 0.75rem;
    color:#a7a4a4;
  }
  .van-field{
    padding: 0;
  }
  .van-cell:not(:last-child)::after{
    width: 0;
  }
  .photo-box a{
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url('../../../assets/images/photo.png') no-repeat center center, #e5e5e5;
    border-radius: 2px;
  }
  .photo-box img{
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
  .photo-box>div{
    height: 55px;
    margin-bottom: 1rem;
  }
  .van-popup{
    width: 100%;
    background: transparent;
  }
  .van-popup .van-icon{
    font-size: 1.5rem;
    color: #38f;
    position: absolute;
    right: 1rem;
    top:2rem;
  }
  .modal-box img{
    width: 100%;
  }
</style>
