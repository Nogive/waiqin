<template>
  <div class="space">
    <van-cell-group>
      <van-field
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        v-show="!hidden"
        v-model="modelVal"
        type="textarea"
        rows="1"
        autosize
      />
    </van-cell-group>
  </div>
</template>

<style scoped lang="stylus">
.space
  padding 15px 0 10px;
</style>

<script>

import ncformCommon from '@ncform/ncform-common'

export default {
  mixins: [ncformCommon.mixins.vue.controlMixin],

  data () {
    return {
      // defaultConfig: { // your config's default value（Note: use mergeConfig when use config value）
      //   msg: 'mm input'
      // }
    }
  },

  methods: {
    // you can handle the modelVal before $emit it (before this.$emit('input'))
    _processModelVal (modelVal) {
      return modelVal
    }
  }
}

</script>
