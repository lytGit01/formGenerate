<template>
  <div class="form-container custom-area-title">
    <a v-if="isAudit" class="anchor-a" href="" :id='targetId'></a>
    <div class="card-item-header" v-if="ctLabel&&ctShow&&!isDetail">
      <div class="card-item-header-inner">{{ ctLabel }}</div>
      <div style="margin-top: 8px">{{ ctRemark }}</div>
    </div>
    <div class="" v-if="ctLabel&&ctShow&&isDetail">
      <div class="">{{ ctLabel }}</div>
      <div style="margin-top: 8px">{{ ctRemark }}</div>
    </div>
  </div>

</template>

<script>

import { generateUUID } from '@/util';

export default {
  name: 'ct-title',
  components: {},
  props: {
    ctLabel: {
      type: String,
      default: ''
    },
    ctRemark: {
      type: String,
      default: ''
    },
    ctStyle: {
      type: String,
      default: '0'
    },
    ctShow: {
      type: Boolean,
      default: true
    },
    isAudit: {
      type: Boolean,
      default: false
    },
    isDetail: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {targetId: ''};
  },
  created () {
    this.targetId = generateUUID();
  },
  mounted () {
  },
  methods: {
    getTitleInfo () {
      return {
        name: this.ctLabel,
        targetId: this.targetId,
        checked: false,
        show: this.ctShow
      };
    },
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

.custom-area-title {
  width: 100%;
}

@media screen and (max-width: 768px) {
  .custom-area-title {
    width: calc(100vw - 32px);
    padding-left: 0px;
    padding-right: 0px;
  }
}

</style>
