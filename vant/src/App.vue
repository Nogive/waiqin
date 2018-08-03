<template>
  <div id="app" v-loading.fullscreen.lock="loading" :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  computed:{
    ...mapGetters(['loading','loadingText'])
  },
  mounted(){
    let bodyH = window.screen.availHeight;
    document.getElementById("app").style.height = bodyH + "px";
  },
  watch:{
    $route(){
      this.$store.dispatch('changeFullPath',this.$route.fullPath);
    }
  }
}
</script>

<style scoped>

</style>
