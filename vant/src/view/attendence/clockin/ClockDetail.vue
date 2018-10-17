<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      left-text="返回"
      right-text="测试上传"
      @click-left="$router.back()"
      @click-right="uploadPhoto()"
    />
    <div class="clock-detail-box">
      <van-row>
        <van-col span="6">打卡时间</van-col>
        <van-col span="18" class="red">{{clockTime|timeFormat('hh:mm')}}</van-col>
      </van-row>
      <van-row>
        <van-col span="6">打卡地点</van-col>
        <van-col span="18" class="address-body">
          <p>{{shotAddress}}</p>
          <p class="specific-addr">{{address}}</p>
          <div class="amap-page-container" id="mapContent">
            <van-icon v-if="isEdit" name="locate" class="locate-btn" @click="onLocation"></van-icon>
          </div>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6">备注</van-col>
        <van-col span="18">
          <van-field 
            v-model="note"
            type="textarea"
            placeholder="请输入备注"
            rows="1"
            autosize
          />
          <van-row gutter="15" class="photo-box">
            <van-col span="6" v-if="isEdit&&takePhotoBtn">
              <a href="javascript:;" @click="evokeCamera"></a>
            </van-col>
            <van-col span="6" v-for="(item,index) in photos" :key="index">
              <img @click="photoPreview(item,index)" :src="item.url" alt="">
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>
    <van-button 
      v-show="isEdit&&showMarker" 
      class="large-btn" 
      size="large" 
      @click="confirmTheClock">确认打卡</van-button>

    <van-popup v-model="showPhoto" class="modal-box">
      <van-icon 
        v-show="isEdit" 
        name="delete" 
        @click.stop="deletePhoto"></van-icon>
      <img :src="largeImg.url" @click.self="showPhoto = false" />
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
  .amap-page-container{
    width: 100%;
    height: 200px;
    position: relative;
  }
  .locate-btn{
    position: absolute;
    font-size: 1.6rem;
    bottom: 0.5rem;
    right: 0.5rem;
    z-index: 2;
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
    padding-bottom: 1rem;
  }
  .van-popup .van-icon{
    font-size: 1.5rem;
    color: #38f;
    position: absolute;
    right: 1rem;
    top:2rem;
    z-index: 99;
  }
  .modal-box img{
    width: 100%;
  }
</style>
