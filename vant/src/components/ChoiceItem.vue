<template>
  <div class="set-person-box">
    <van-nav-bar
      title="设置打卡人员"
      left-arrow
      left-text="返回"
      @click-left="closeChoice"
    >
      <div slot="right">
        <van-icon name="checked" @click="makeSure"></van-icon>
        <van-icon name="search"></van-icon>
      </div>
    </van-nav-bar>
    <van-checkbox-group v-model="result">
      <div v-for="(item,index) in persons" :key="index" @click="enter(item,$event)">
        <van-row class="person-box">
          <van-col class="w40">
            <van-checkbox :name="item" />
          </van-col>
          <van-col class="w50">
            <img v-if="item.headImg" :src="item.headImg" alt="">
            <span v-else class="depart-img"></span>
          </van-col>
          <van-col class="van-cell-text wauto">{{item.name}}</van-col>
        </van-row>
      </div>
      <p class="text-center">共 {{total}} 人</p>
    </van-checkbox-group>

    <van-row class="check-box" v-show="result.length>0">
      <van-col class="van-cell-text wauto">
        <a href="javascript:;" v-for="(item,index) in result" :key="index">
          <img v-if="item.headImg" :src="item.headImg" alt="">
          <van-button v-else size="small" class="bg-grey">
            业务部 <van-icon name="close" @click="deleteItem(item)"></van-icon>
          </van-button>
        </a>
      </van-col>

      <van-col class="w80 text-right">
        <van-button size="small" class="bg-blue">确定({{result.length}})</van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script>
const personArr = [
  {
    id: "001",
    name: "张山",
    headImg: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
  },
  {
    id: "003",
    name: "SKY",
    headImg: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
  },
  {
    id: "002",
    name: "业务部",
    children: [
      {
        id: "004",
        name: "Tom",
        headImg: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
      },
      {
        id: "005",
        name: "Jerry",
        headImg: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
      },
      {
        id: "006",
        name: "设计部",
        children: [
          {
            id: "007",
            name: "小明",
            headImg:
              "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
          },
          {
            id: "008",
            name: "小话",
            headImg:
              "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
          },
          {
            id: "009",
            name: "小王",
            headImg:
              "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
          }
        ]
      }
    ]
  }
];
export default {
  name:'choiceItem',
  data(){
    return {
      persons:personArr,
      total: 5,
      result: [], //勾选人员结果数组
      headImg: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4"
    }
  },
  created(){
    console.log('取数据');
  },
  methods:{
    closeChoice(){
      let data=false;
      this.$emit('close',data);
    },
    enter(item, ev) {
      if (ev.srcElement.nodeName != "I" && item.children != undefined) {
        this.persons = item.children;
      }
    },
    deleteItem(item) {
      let idx = this.result.indexOf(item);
      this.result.splice(idx, 1);
    },
    makeSure(){
      this.$emit('getItem',this.result);
    }
  },
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
  background: url('../assets/images/file.png') no-repeat 5px 5px,#f1f0f0;
}
</style>

