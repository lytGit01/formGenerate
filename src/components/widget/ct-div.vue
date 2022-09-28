<template>
  <div class="row com-row" :style="{'display':ctShow?'':'none'}">
    <div class="col-md-2 col-xs-6 com-line com-title-h4"></div>
    <div class="col-md-4 col-xs-8" v-html="ctHtml"></div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'ct-div',
  components: {},
  props: {
    ctHtml: {
      type: String,
      default: ''
    },
    ctShow: {
      type: Boolean,
      default: true
    },
    isAudit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {};
  },
  methods: {
    getData () {
      return {
        name: '',
        codeName: '',
        data: '',
        valid: false
      };
    }
  }

};
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
