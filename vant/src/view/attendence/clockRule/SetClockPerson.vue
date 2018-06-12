<template>
  <div class="set-person-box">
    <van-nav-bar
      title="设置打卡人员"
      left-arrow
      left-text="返回"
      @click-left="reback"
    >
      <div slot="right">
        <van-icon name="checked" @click="testValue"></van-icon>
        <van-icon name="search"></van-icon>
      </div>
    </van-nav-bar>
    <van-checkbox-group v-model="result">
      <div @click="dropDepart">
        <van-row class="person-box">
          <van-col class="w40">
            <van-checkbox name="name1" />
          </van-col>
          <van-col class="w50">
            <img :src="headImg" alt="">
          </van-col>
          <van-col class="van-cell-text wauto">张三</van-col>
        </van-row>
      </div>

      <div @click="dropDepart">
        <van-row class="person-box">
          <van-col class="w40">
            <van-checkbox name="name2" />
          </van-col>
          <van-col class="w50">
            <img :src="headImg" alt="">
          </van-col>
          <van-col class="van-cell-text wauto">李四</van-col>
        </van-row>
      </div>
      <div @click="dropDepart">
        <van-row class="person-box">
          <van-col class="w40">
            <van-checkbox name="name3" />
          </van-col>
          <van-col class="w50">
            <span class="depart-img"></span>
          </van-col>
          <van-col class="van-cell-text wauto">业务部</van-col>
        </van-row>
      </div>
      

      <p class="text-center">共 {{result.length}} 人</p>
    </van-checkbox-group>
    <van-row class="check-box" v-show="result.length>0">
      <van-col class="van-cell-text wauto">
        <img :src="headImg" alt="">
        <van-button size="small" class="bg-grey">
          业务部 <van-icon name="close"></van-icon>
        </van-button>
        <van-button size="small" class="bg-grey">
          业务部 <van-icon name="close"></van-icon>
        </van-button>
        <van-button size="small" class="bg-grey">
          业务部 <van-icon name="close"></van-icon>
        </van-button>
        <van-button size="small" class="bg-grey">
          业务部 <van-icon name="close"></van-icon>
        </van-button>
        <img :src="headImg" alt="">
      </van-col>
      <van-col class="w80 text-right">
        <van-button size="small" class="bg-blue">确定({{result.length}})</van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import router from '../../../router'
export default {
  name:'attendence',
  data(){
    return {
      result:[],
      headImg:'https://avatars1.githubusercontent.com/u/24405319?s=460&v=4'
    }
  },
  methods:{
    reback(){
      router.push('/writeRule');
    },
    testValue(){
      console.log(this.result);
    },
    dropDepart(e){
      if(e.target.nodeName!="I"){
        router.push('/setClockPerson');
        console.log(1);
      }
    },
  }
}
</script>

<style scoped>
  .set-person-box{
    background: white;
    height: -webkit-fill-available;
  }
  .van-nav-bar .van-icon{
    font-size: 1.2rem;
    margin-left: 1rem;
  }
  .person-box>div{
    height: 50px;
    line-height: 50px;
  }
  .person-box{
    padding: 0.5rem 0.7rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .w40{
    width: 40px;
    text-align: center
  }
  .w50{
    width: 50px;
  }
  .w80{
    width: 80px;
  }
  .wauto{
    width: calc(100% - 90px);
    padding-left: 0.5rem;
  }
  .person-box img{
    width: 100%;
    height: 100%;
    border-radius: 3px;
  }

  .check-box{
    padding: 0.5rem 0.7rem;
    position: absolute;
    width: 100%;
    bottom: 0;
    border-top: 1px solid #e5e5e5;
    border-bottom: none;
  }
  .check-box>div{
    height: 50px;
  }
  .check-box img{
    width: 50px;
    height: 50px;
    border-radius: 3px;
    margin-right: 0.4rem;
    vertical-align: middle;
  }
  .check-box .wauto{
    width: calc(100% - 80px);
    white-space: nowrap;
    overflow-x: auto;
  }
  .check-box .wauto .van-button{
    margin-right: 0.4rem;
  }
  .check-box .wauto .van-icon{
    vertical-align: text-top;
  }
  .check-box .w80{
    line-height: 50px;
  }
  .depart-img{
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url('../../../assets/images/file.png') no-repeat 5px 5px,#f1f0f0;
  }
  
</style>
