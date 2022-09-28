<template>
<!--    :isAudit="params.isAudit"-->
    <ct-title v-if="element.type=='title'"
              ref="title"
              :ctLabel="element.label"
              :ctStyle="element.style"
              :ctRemark="element.remark"
              :ctShow="element.show"
              :options="element.options"/>
    <ct-div v-else-if="element.type=='div'"
            :ctHtml="element.html"
            :ctShow="element.show"
            :options="element.options"/>
    <ct-input v-else-if="element.type=='text'"
              :element="element"
              :ref="element.name"
              :ctName="element.name"
              :ctLabel="element.label"
              :disabled="element.disabled"
              :ctMaxLength="element.maxLength"
              :ctDataValue="element.value"
              :ctRequired='element.required'
              :ctValidation="element.validation"
              :ctPlaceholder="element.placeholder"
              :ctDataType="element.dataType"
              :ctDecimalTip="element.decimalTip"
              :ctMaxDecimal="element.maxDecimal"
              :ctMinDecimal="element.minDecimal"
              :ctMaxDecimalTip="element.maxDecimalTip"
              :ctMinDecimalTip="element.minDecimalTip"
              :ctAutoSize="element.autosize"
              :ctRemark="element.remark"
              :ctRelation="element.relation?item.relation:[]"
              :ctShow="element.show"
              :options="element.options"
              @on-blur="onBlurChange"/>
    <ct-select v-else-if="element.type=='select'"
               :ref="element.name"
               :ctName="element.name"
               :ctLabel="element.label"
               :disabled="element.disabled"
               :ctDefaultVal="element.defaultVal"
               :ctSelectType="element.selectType"
               :ctRequired='String(Number(element.required))'
               :ctPlaceholder="element.placeholder"
               :ctCodes="element.codes?element.codes:[]"
               :ctSelectCode="String(element.value)"
               :ctShow="element.show"
               :options="element.options"
               :ctRelation="element.relation?item.relation:[]"
               @on-select="onSelectChange"/>
    <ct-auto-select v-else-if="element.type=='auto_select'"
                    :ref="element.name"
                    :ctName="element.name"
                    :ctLabel="element.label"
                    :disabled="element.disabled"
                    :ctPlaceholder="element.placeholder"
                    :ctCodes="element.codes?element.codes:[]"
                    :ctSelectCode="element.value?element.value:{}"
                    :ctEnumCode="element.enumCode"
                    :ctCodeType="element.codeType"
                    :ctRequired='String(Number(element.required))'
                    :ctShow="element.show"
                    :ctRelation="element.relation?element.relation:[]"
                    @on-select="onSelectChange"/>
    <ct-upload v-else-if="element.type=='upload'"
               :ref="element.name"
               :ctName="element.name"
               :ctLabel="element.label"
               :ctTip="element.tip"
               :ctErrTip="element.errTip"
               :applyIdProp="applyId"
               :ctLimit="element.limit"
               :ctSize="Number(element.maxSize)"
               :ctFileType="element.fileType"
               :ctAccept="element.accept"
               :ctRequired='String(Number(element.required))'
               :ctScenesType="Number(element.scenesType)"
               :ctFileList="element.value?element.value:[]"
               :ctShow="element.show"/>
    <ct-date-picker v-else-if="element.type=='date_picker'"
                    :ref="element.name"
                    :ctName="element.name"
                    :ctPlaceholder="element.placeholder"
                    :ctLabel="element.label"
                    :disabled="element.disabled"
                    :ctRequired="String(Number(element.required))"
                    :ctErrTip="element.errTip"
                    :ctFieldList="element.fieldList"
                    :ctFieldValue="element.value?element.value:[]"
                    :ctShow="element.show"/>
    <ct-cascader v-else-if="element.type=='cascader'"
                 :ref="element.name"
                 :ctName="element.name"
                 :ctLabel="element.label"
                 :ctPlaceholder="element.placeholder"
                 :ctCodes="element.codes?element.codes:[]"
                 :ctSelectCode="element.value&&element.value!=''?element.value:[]"
                 :ctRequired='String(Number(element.required))'
                 :ctRelation="element.relation?element.relation:[]"
                 :ctShow="element.show"
                 @on-cascader="onCascaderChange"/>
</template>

<script>
import Vue from 'vue'
import ctInput from './widget/ct-input.vue';
import ctSelect from './widget/ct-select.vue';
import ctTitle from './widget/ct-title.vue';
import ctDiv from './widget/ct-div.vue';
import ctUpload from './widget/ct-upload.vue';
import ctAutoSelect from './widget/ct-select-auto.vue';
import ctCascader from './widget/ct-cascader.vue';
import ctDatePick from './widget/ct-date-picker.vue';

export default {
  components: {
    'ct-input': ctInput, // input输入框->type=text
    'ct-select': ctSelect, // type= select
    'ct-title': ctTitle, // type= title
    'ct-div': ctDiv, // type=div
    'ct-upload': ctUpload, // type=upload
    'ct-auto-select': ctAutoSelect, // type=auto_select
    'ct-date-picker': ctDatePick, // type=date_picker
    'ct-cascader': ctCascader// type=cascader
  },
  props: ['element', 'isTable'],
  data () {
    return {
      key: Math.random().toString(36).slice(-8),
      elementKey: Math.random().toString(36).slice(-8),
      applyId: ''
    }
  },
  created () {
    // console.log('---***11111111111', this.element)
    // if (this.element.type == 'component') {
    //   Vue.component(`component-${this.element.key}`, {
    //     template: `<span>${this.element.options.template}</span>`,
    //     props: ['dataModel']
    //   })
    // }
  },
  watch: {
    // 'element.options.template': function (val) {
    //   Vue.component(`component-${this.element.key}`, {
    //     template: `<span>${val}</span>`,
    //     props: ['dataModel']
    //   })
    //
    //   this.key = Math.random().toString(36).slice(-8)
    // },
    'element.options.defaultValue': function (val) {
      this.elementKey = Math.random().toString(36).slice(-8)
    }
  },
  methods: {
    onBlurChange () {},
    onSelectChange () {},
    onCascaderChange () {},
  }
}
</script>
