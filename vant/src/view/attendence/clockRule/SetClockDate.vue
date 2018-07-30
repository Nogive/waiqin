<template>
  <div>
    <van-nav-bar
      title="设置打卡日期"
      left-arrow
      left-text="返回"
      right-text="确定"
      @click-left="$router.back()"
      @click-right="submit"
    />
    <van-checkbox-group v-model="checkedDate">
      <van-cell-group>
        <van-cell title="每周一">
          <van-checkbox name="1" />
        </van-cell>
        <van-cell title="每周二">
          <van-checkbox name="2" />
        </van-cell>
        <van-cell title="每周三">
          <van-checkbox name="3" />
        </van-cell>
        <van-cell title="每周四">
          <van-checkbox name="4" />
        </van-cell>
        <van-cell title="每周五">
          <van-checkbox name="5" />
        </van-cell>
        <van-cell title="每周六">
          <van-checkbox name="6" />
        </van-cell>
        <van-cell title="每周日">
          <van-checkbox name="7" />
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
    <van-cell-group>
      <van-switch-cell v-model="holiday" title="法定节假日不用打卡" />
      <van-switch-cell v-model="nonWorkday" title="非工作日允许打卡" />
    </van-cell-group>
    <p>{{clockDate}}</p>
  </div>
</template>
<script>
export default {
  name:'attendence',
  data(){
    return {
      checkedDate: ["1"], //选中的打卡日期
      holiday: true, //法定节假日不用打卡
      nonWorkday: true, //非工作日允许打卡
    }
  },
  computed:{
    clockDate() {
      let arr = this.checkedDate;
      arr.sort();
      return getDateRange(arr);
    },
  },
  created(){
  },
  methods:{
   submit(){
      console.log(this.checkedDate);
      console.log(this.holiday);
      console.log(this.nonWorkday);
   }
  }
}
function getDateRange(arr){
  console.log(arr);
  let reg_6_1=/1,2,3,4,5,6/;//周一至周六
  let reg_6_2=/2,3,4,5,6,7/;//周二至周六
  let reg_5_1=/1,2,3,4,5/;//周一至周五
  let reg_5_2=/2,3,4,5,6/;//周二至周六
  let reg_5_3=/3,4,5,6,7/;//周三至周日
  let result="";
  let str=arr.join();
  let len=arr.length;
  if(len==7){
    result='周一至周日'
  }else if(len==6){
    if(reg_6_1.test(str)){
      result="周一至周六"
    }else if(reg_6_2.test(str)){
      result="周二至周日"
    }else{
      result=getText(arr);
    }
  }else if(len==5){
    if(reg_5_1.test(str)){
      result="周一至周五"
    }else if(reg_5_2.test(str)){
      result="周二至周六"
    }else if(reg_5_3.test(str)){
      result="周三至周日"
    }else{
      result=getText(arr);
    }
  }else{
    result=getText(arr);
  }
  return result;
}
function getText(arr){
  let str="";
  arr.forEach(e => {
    str += getDateText(e) + ",";
  });
  return str.substring(0, str.length - 1);
}
function getDateText(i) {
  i = parseInt(i);
  let str = "";
  switch (i) {
    case 7:
      str = "周日";
      break;
    case 1:
      str = "周一";
      break;
    case 2:
      str = "周二";
      break;
    case 3:
      str = "周三";
      break;
    case 4:
      str = "周四";
      break;
    case 5:
      str = "周五";
      break;
    case 6:
      str = "周六";
      break;
  }
  return str;
}
</script>

<style scoped>
  .van-cell-group{
    margin-top: 0.7rem;
  }
  .van-switch-cell{
    border-bottom: 1px solid #e5e5e5;
  }
  .van-switch-cell:last-child{
    border-bottom: none;
  }
</style>
