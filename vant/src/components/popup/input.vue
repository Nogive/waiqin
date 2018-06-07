<template>
  <div class="box">
    <van-popup v-model="show" position="right" :overlay="false">
      <van-nav-bar
      title="编辑名称"
      left-arrow
      left-text="返回"
      right-text="确定"
      @click-left="show=false"
      @click-right="closePopup"
    />
      <van-cell-group>
        <van-field 
        v-model="name" 
        value="每日两次打卡" 
        placeholder="请输入规则名" 
        :error="showError"
        icon="clear"
        @click-icon="name = ''"
        @keyup="showError=false" />
      </van-cell-group>
    </van-popup>
  </div>
</template>
<script>
export default {
    el:'.box',
    data(){
        return {
            show:false,
            name:''
        }
    },
    methods:{
        closePopup(){
            if(this.name==""){
                this.showError=true;
            }else{
                this.name=this.name.replace(/(^\s*)|(\s*$)/g, "");
                this.show=false;
            }
        }
    }
}
</script>

<style scoped>
.van-popup{
    width: 100%;
    height:100%;
    background: rgb(240,239,244); 
}
.van-popup .van-cell-group{
    margin-top: 0.7rem;
}
</style>
