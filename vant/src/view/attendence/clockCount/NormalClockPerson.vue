<template>
  <div>
    <div class="clock-person-box">
      <van-nav-bar
        title="正常考勤人员"
        left-arrow
        left-text="返回"
        @click-left="reback"
      />
      <van-row class="company-box">
        <van-col span="24">2018年6月1日 星期五</van-col>
        <van-col span="24">麦芒科技公司</van-col>
      </van-row>
      <van-cell-group>
        <van-cell is-link class="person-box" to="/dailyRecord">
          <template slot="title">
            <img src="../../../assets/images/cat2.jpg" alt="">
            张冬
          </template>
        </van-cell>
        <van-cell is-link class="person-box" to="/dailyRecord">
          <template slot="title">
            <span class="default-img">小</span>
            小麦哥
          </template>
        </van-cell>
        <van-cell is-link class="person-box" to="/monthlyRecord">
          <template slot="title">
            <img src="../../../assets/images/cat.jpg" alt="">
            王五
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import router from '../../../router'
export default {
  name:'normalClockPerson',
  data(){
    return {
    }
  },
  methods:{
    reback(){
      router.push('/clockDetailForDepart');
    }
  }
}
</script>

<style scoped>
.company-box{
  background: rgb(35,39,54);
  color: white;
  padding: 1rem 0.7rem;
  text-align: center
}
.company-box .van-col:first-child{
  margin-bottom: 0.7rem;
  font-size: 0.8rem;
}
.van-cell-group{
  margin-top: 0.7rem;
}
.person-box{
  padding: 16px 15px 16px 65px;
}
.person-box img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  left: 15px;
}
.person-box .default-img{
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  left: 15px;
  background: green;
  color: white;
  text-align: center;
  line-height: 40px;
  z-index: 99;
}
</style>
