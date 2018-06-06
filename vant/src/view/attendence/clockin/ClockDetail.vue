<template>
  <div>
    <van-nav-bar
      title="打卡详情"
      left-arrow
      left-text="返回"
      @click-left="reback"
    />
    <div class="clock-detail-box">
      <van-row>
        <van-col span="6">打卡时间</van-col>
        <van-col span="18" class="red">17:23 pm</van-col>
      </van-row>
      <van-row>
        <van-col span="6">打卡地点</van-col>
        <van-col span="18" class="address-body">
          <p>钦州北路1088号</p>
          <p class="specific-addr">上海市徐汇区钦州北路1066号</p>
          <img src="http://restapi.amap.com/v3/staticmap?location=121.406454,31.179774&amp;zoom=14&amp;size=600*200&amp;markers=large,,:121.406454,31.179774&amp;key=b2a701a4c4e88acd8fac16bbf402484f" alt="">
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
              <a href="javascript:;" @click="takePhoto"></a>
            </van-col>
            <van-col span="6">
              <img @click="photoPreview(testUrl)" :src="testUrl" alt="">
            </van-col>
            <van-col span="6">
              <img src="../../../assets/images/cat1.jpg" alt="">
            </van-col>
            <van-col span="6">
              <img src="../../../assets/images/cat2.jpg" alt="">
            </van-col>
            <van-col span="6">
              <img src="../../../assets/images/cat2.jpg" alt="">
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>
    <van-button class="large-btn" size="large">确认打卡</van-button>

    <van-popup v-model="showPhoto" class="modal-box">
      <van-icon name="delete" @click="deletePhoto"></van-icon>
      <img :src="currentUrl" alt="">
    </van-popup>


  </div>
</template>
<script>
import router from '../../../router'
import {Toast,ImagePreview} from 'vant'
export default {
  name:'attendenceDetail',
  data(){
    return {
      testUrl:'https://avatars1.githubusercontent.com/u/24405319?s=460&v=4',
      tabIndex:0,
      message:'',
      showPhoto:false,
      currentUrl:''
    }
  },
  methods:{
    reback(){
      router.push('/clockHome');
    },
    takePhoto(){
      Toast('打开摄像头');
    },
    photoPreview(url){
      this.currentUrl=url;
      this.showPhoto=true;
    },
    deletePhoto(){
      this.showPhoto=false;
    }
  }
}
</script>

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
    right: 0.5rem;
    top:0.5rem;
  }
  .modal-box img{
    width: 100%;
  }
</style>
