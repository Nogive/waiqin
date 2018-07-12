<template>
  <div id="app" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中"
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
    ...mapGetters(['loading'])
  }
}
</script>

<style scoped>

</style>
