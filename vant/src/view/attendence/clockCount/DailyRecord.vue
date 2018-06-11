<template>
  <div>
    <div class="record-box">
      <van-nav-bar
        title="打卡记录"
        left-arrow
        left-text="返回"
        @click-left="reback"
      />
      <div class="one-record">
        <van-row class="re-header">
          <van-col class="w50">
            <img src="../../../assets/images/cat1.jpg" alt="">
          </van-col>
          <van-col class="wauto">
            <p class="re-name">张冬</p>
            <p>销售</p>
          </van-col>
          <van-col class="w70 text-right">上班签到</van-col>
          <van-col class="w80 text-right">05-30 17:58</van-col>
        </van-row>
        <van-row>
          <van-col span="24" class="re-address blue">
            <van-icon name="kaoqin"></van-icon>
            徐汇区钦州北路1066号靠近钦汇园
          </van-col>
          <van-col span="24">在外</van-col>
        </van-row>
      </div>

      <div class="one-record">
        <van-row class="re-header">
          <van-col class="w50">
            <img src="../../../assets/images/cat1.jpg" alt="">
          </van-col>
          <van-col class="wauto">
            <p class="re-name">张冬</p>
            <p>销售</p>
          </van-col>
          <van-col class="w70 text-right">下班签退</van-col>
          <van-col class="w80 text-right">05-30 22:58</van-col>
        </van-row>
        <van-row>
          <van-col span="24" class="re-address blue">
            <van-icon name="kaoqin"></van-icon>
            徐汇区宾阳路58临靠近漕河泾街道社区卫生服务中心
          </van-col>
          <van-col span="24">在客户处</van-col>
          <van-col span="24" class="re-img">
            <img src="../../../assets/images/cat1.jpg" alt="">
          </van-col>
        </van-row>
      </div>

      <div class="one-record">
        <van-row class="re-header">
          <van-col class="w50">
            <img src="../../../assets/images/cat1.jpg" alt="">
          </van-col>
          <van-col class="wauto">
            <p class="re-name">张冬</p>
            <p>销售</p>
          </van-col>
          <van-col class="w70 text-right">外出</van-col>
          <van-col class="w80 text-right">05-31 22:58</van-col>
        </van-row>
        <van-row>
          <van-col span="24" class="re-address blue">
            <van-icon name="kaoqin"></van-icon>
            徐汇区宾阳路58临靠近漕河泾街道社区卫生服务中心
          </van-col>
          <van-col span="24">外勤哈哈哈</van-col>
          <van-col span="24" class="re-img">
            <img src="../../../assets/images/cat1.jpg" alt="">
          </van-col>
        </van-row>
      </div>

    </div>
  </div>
</template>
<script>
import router from '../../../router'
export default {
  name:'DailyRecord',
  data(){
    return {
    }
  },
  methods:{
    reback(){
      router.push('/clockHistory');
    }
  }
}
</script>

<style scoped>
.record-box{
  background-color: white;
}
.one-record{
  padding: 0.7rem 0.7rem;
  border-bottom: 1px solid #e5e5e5;
}
.one-record:last-child{
  border-bottom: none;
}
.re-header .van-col{
  height: 50px;
}
.w50{
  width: 50px;
}
.w70{
  width: 70px;
  font-size: 0.9rem;
  color:#6c6c6c;
}
.w80{
  width: 80px;
  font-size: 0.85rem;
  color: #a7a4a4;
}
.wauto{
  width: calc(100% - 200px);
  padding-left: 0.5rem;
}
.wauto .re-name{
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0;
}
.wauto .re-name+p{
  font-size: 0.7rem;
  color: #a7a4a4;
  margin-top: 4px;
}
.re-header img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.re-address{
  font-size: 0.7rem;
  margin: 0.5rem 0;
}
.re-address .van-icon{
  color:#a7a4a4;
  font-size: 0.8rem;
}
.re-img{
  margin-top: 0.5rem;
}
.re-img img{
  width: 60px;
  height: 60px;
}
</style>
