<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {cordovaInitialize} from "@/utils/native"
export default {
  name: 'App',
  data(){
    return {
      close:false
    }
  },
  created(){
    this._initCordave();
  },
  mounted(){
    let bodyH = window.screen.availHeight;
    document.getElementById("app").style.height = bodyH + "px";
  },
  watch:{
    $route(){
      this.$store.dispatch('changeFullPath',this.$route.fullPath);
    }
  },
  methods:{
    _initCordave(){
      cordovaInitialize(this);
    }
  }
}
</script>

<style scoped>

</style>
