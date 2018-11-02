<template>
  <div class="pb65">
    <van-cell-group>
      <van-cell title="用户名" value="xxx" />
      <van-cell title="版本信息" value="1.1.0" label="当前为测试版本。" />
      <van-cell title="是否开启调试模式">
        <template slot="right-icon">
          <van-button v-if="bugOn" type="primary" plain size="small" @click="openVconsole">开启</van-button>
          <van-button v-else type="primary" plain size="small" @click="closeVconsole">关闭</van-button>
        </template>
      </van-cell>
    </van-cell-group>

    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item title="测试按钮" name="testBtns">
        <van-button type="primary" plain size="large" @click="testPhoto">测试拍照</van-button>
        <van-button type="primary" plain size="large" @click="testLocate">测试定位</van-button>
        <van-button type="primary" plain size="large" @click="testNcform">测试ncform</van-button>
        <van-button type="primary" plain size="large" @click="onTest">其他测试</van-button>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
import { startLocate, stopLocate, takePhoto } from "@/utils/native";
import { createScript } from "@/assets/js/common";
import { XFieldApi, accountApi } from "@/assets/js/api";
export default {
  name:'aboutMe',
  data(){
    return {
      activeNames:'testBtns',
      bugOn:true,
      arr: [
        {
          id: 1,
          url: "https://avatars1.githubusercontent.com/u/24405319?s=460&amp;v=4"
        },
        {
          id: 2,
          url: "https://avatars1.githubusercontent.com/u/24405319?s=460&amp;v=4"
        }
      ]
    }
  },
  methods:{
    testPhoto() {
      takePhoto(
        url => {
          console.log("拍照成功");
          this.arr.push({
            id: 3,
            url: url
          });
        },
        err => {
          console.log(err);
        }
      );
    },
    testLocate() {
      let vm = this;
      startLocate(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        },
        5000
      );
      stopLocate();
    },
    testNcform() {
      this.$router.push("/ncform");
    },
    onTest() {
     console.log('other');
    },
    openVconsole() {
      let _this=this;
      let url =
        "http://maimang-public.oss-cn-hangzhou.aliyuncs.com/vconsole.min.js";
      createScript(url, function() {
        var vConsole = new VConsole();
        Vue.prototype.vConsole=vConsole;
        _this.bugOn=false;
        console.log("aaaaa");
      });
    },
    closeVconsole(){
      this.vConsole.destroy();
      this.bugOn=true;
    }
  }
}
</script>


<style scoped>
.van-button{
  margin-bottom: 10px;
}
</style>
