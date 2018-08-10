<template>
  <div class="set-person-box">
    <van-nav-bar
      title="设置打卡人员"
      left-arrow
      left-text="返回"
      @click-left="goBack"
    >
      <div slot="right">
        <van-icon name="checked" @click="onSubmit"></van-icon>
        <van-icon name="search"></van-icon>
      </div>
    </van-nav-bar>
    <van-checkbox-group v-model="result">
      <div v-for="(item,index) in persons" :key="index" @click="enterPart(item,$event)">
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
            {{item.name}} <van-icon name="close" @click="deleteThisDepart(item)"></van-icon>
          </van-button>
        </a>
      </van-col>

      <van-col class="w80 text-right">
        <van-button size="small" class="bg-blue" @click="onSubmit">确定({{result.length}})</van-button>
      </van-col>
    </van-row>
  </div>
</template>

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
<script>
export default {
  data() {
    return {
      ruleId: "",
      currentRule: {},
      allPerson: null, //获取的全部员工数据
      persons: [], //页面显示
      total: 0,
      result: [], //勾选人员结果数组
      headImg: "https://avatars1.githubusercontent.com/u/24405319?s=460&v=4",
      pId:''
    };
  },
  created() {
    //this.ruleId = this.$getSession("ruleId");
    //this.currentRule = this.$getSession("r" + this.ruleId);
    this.getStaffs();
  },
  watch: {
    persons(){
      console.log('有变化');
      console.log(this.pId);
    }
  },
  methods: {
    getStaffs() {
      let vm = this;
      this.$axios.get("/api/staffs").then(
        res => {
          if (res.code == vm.CommonConstants.API_CODE.OK) {
            vm.allPerson = res.data.data;
            vm.persons = res.data.data;
            vm.total = res.data.total;
          } else {
            vm.$codeError(res, "请求人员数据");
          }
          console.log(res);
        },
        err => {
          vm.$netError(res.response);
        }
      );
    },
    enterPart(item, ev) {
      if (ev.srcElement.nodeName != "I" && item.children) {
        this.pId=item.id;
        let children=getChildrenByPid(item.id,this.allPerson);
        this.persons=children;
      }
    },
    deleteThisDepart(item) {
      let idx = this.result.indexOf(item);
      this.result.splice(idx, 1);
    },
    goBack(){
      console.log(this.pId);
    },
    onSubmit() {
      /*
      let name = "";
      let temArr = [];
      this.result.forEach(e => {
        name += e.name + " ";
        temArr.push(name.id);
      });
      this.currentRule.staffs.name = name;
      this.currentRule.staffs.ids = temArr;
      this.$setSession("r" + this.ruleId, this.currentRule);
      this.$router.replace("/writeRule");
      */
    }
  }
};
function getChildrenByPid(id, items) {
  let result;
  for (var i in items) {
    let item = items[i];
    if (item.id == id) {
      result = item.children;
      break;
    } else if (item.children) {
      result = getCurrentPart(id, item.children);
    }
  }
  return result;
}

function getPidByCurrentId(id,items){
  let result;
  for (var i in items) {
    let item = items[i];
    if (item.id == id) {
      result = item.children;
      break;
    } else if (item.children) {
      result = getCurrentPart(id, item.children);
    }
  }
  return result;
}

</script>
