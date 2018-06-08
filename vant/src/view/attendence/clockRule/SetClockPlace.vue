<template>
  <div class="set-place-box">
    <van-nav-bar
      title="设置打卡地点"
      left-arrow
      left-text="返回"
      @click-left="reback"
    >
      <div slot="right">
        <van-icon name="search"></van-icon>
        <van-button size="small" class="bg-blue">确定</van-button>
      </div>
    </van-nav-bar>
    <div class="container"></div>

    <van-cell-group>
      <van-cell class="one-place" @click="checked=!checked">
        <template slot="title">
          <span class="van-cell-text">宾阳路60号临</span>
          <span>上海市上海市徐汇区宾阳路60号临</span>
        </template>
        <van-icon v-show="checked" slot="right-icon" name="success" class="van-cell__right-icon blue" />
      </van-cell>
      <van-cell class="one-place" @click="checked=!checked">
        <template slot="title">
          <span class="van-cell-text">西雅图</span>
          <span>上海市上海市徐汇区三江路88弄1-21号</span>
        </template>
        <van-icon v-show="checked" slot="right-icon" name="success" class="van-cell__right-icon blue" />
      </van-cell>
      <van-cell class="one-place" @click="checked=!checked">
        <template slot="title">
          <span class="van-cell-text">漕河泾</span>
          <span>上海市上海市徐汇区漕河泾</span>
        </template>
        <van-icon v-show="checked" slot="right-icon" name="success" class="van-cell__right-icon blue" />
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
<script>
import router from '../../../router'
export default {
  name:'setClockPlace',
  data(){
    return {
      range:300,
      showRange:false,
      checked:false,
      headImg:'https://avatars1.githubusercontent.com/u/24405319?s=460&v=4'
    }
  },
  methods:{
    reback(){
      router.push('/writeRule');
    },
    checkClockRange(range){
      this.range=range;
      this.showRange=false;
    }
  }
}
</script>

<style scoped>
  .container{
    border: 1px solid blue;
    height: 300px;
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
</style>
