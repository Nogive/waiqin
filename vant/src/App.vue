<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      close:false
    }
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
