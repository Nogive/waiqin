<template>
  <div>
    <van-nav-bar
      title="设置打卡时间"
      left-arrow
      left-text="返回"
      right-text="确定"
      @click-left="$router.back()"
      @click-right="submit"
    />
    <van-cell-group>
      <van-cell title="一天内上下班次数" is-link :value="`${workNum}次`" @click="workTimesPopup=true" />
    </van-cell-group> 
    <van-cell-group v-for="(item,index) in timeArr" :key="index">
      <van-cell title="上班" is-link :value="item.onTime" @click="checkOnWorkTime(item,'on')" />
      <van-cell title="下班" is-link :value="item.afterTime" @click="checkOnWorkTime(item,'after')"  />
    </van-cell-group>

    <!-- 上下班次数 -->
    <van-popup class="w60" v-model="workTimesPopup">
      <van-cell-group>
        <van-cell title="一天内上下班次数" />
        <van-cell title="1次" @click="checkWorkTime(1)" />
        <van-cell title="2次" @click="checkWorkTime(2)" />
        <van-cell title="3次" @click="checkWorkTime(3)" />
      </van-cell-group> 
    </van-popup>
    <!-- 选择时间 -->
    <van-datetime-picker
      v-show="showTimePanel"
      v-model="currentTime"
      type="time"
      @confirm="showTimePanel=false;currentTime='12:00'"
      @cancel="showTimePanel=false"
      @change='pickerTime'
    />
    {{timeArr}}
  </div>
</template>
<script>
export default {
  name:'attendence',
  data(){
    return {
      workNum: 1, //一天内上下班次数
      workTimesPopup: false, //选择一天上下班次数弹框
      timeArr: [
        {
          num: 1,
          onTime: "09:00",
          afterTime: "18:00"
        }
      ], //上下班次数时间设置
      showTimePanel: false, //选择时间面板
      currentTime: "12:00", //时间面板上显示的默认时间
      current: "", //当前设置的那一次的上下班时间
      currentTag: "", //当前设置的是上班还是下班
    }
  },
  created(){
  },
  methods:{
   //选择上下班次数
    checkWorkTime(n) {
      this.workNum = n;
      if (n == 2) {
        this.timeArr = [
          {
            num: 1,
            onTime: "09:00",
            afterTime: "12:00"
          },
          {
            num: 2,
            onTime: "13:00",
            afterTime: "18:00"
          }
        ];
      }
      if (n == 3) {
        this.timeArr = [
          {
            num: 1,
            onTime: "09:00",
            afterTime: "12:00"
          },
          {
            num: 2,
            onTime: "13:00",
            afterTime: "15:00"
          },
          {
            num: 3,
            onTime: "16:00",
            afterTime: "18:00"
          }
        ];
      }
      this.workTimesPopup = false;
    },
    //设置上下班打卡时间
    checkOnWorkTime(item, tag) {
      this.currentTag = tag;
      this.current = item;
      this.showTimePanel = true;
    },
    pickerTime() {
      let idx = this.timeArr.indexOf(this.current);
      if (this.currentTag == "on") {
        this.timeArr[idx].onTime = this.currentTime;
      } else {
        this.timeArr[idx].afterTime = this.currentTime;
      }
    },
    submit(){
      console.log(this.timeArr);
    }
  }
}
</script>

<style scoped>
  .van-cell-group{
    margin-top: 0.7rem;
  }
  .w60{
    width: 60%;
  }

  .van-picker{
    z-index: 3000;
    position: absolute;
    width: 100%;
    bottom: 0;
  }
</style>
