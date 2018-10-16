<template>
  <div id="app">
    <router-view></router-view>
    <van-popup class="loading-wrapper" v-model="loading" :close-on-click-overlay="close">
      <div class="loading-content">
        <div class="loading-img">
          <van-loading type="spinner" color="black" />
        </div>
        <p class="text">{{loadingText}}</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  data(){
    return {
      close:false
    }
  },
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
