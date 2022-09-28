<template>
  <div class="form-container"
       :style="{'display':ctShow?'':'none'}">
    <el-form-item
      ref="customAreaFormItemRef"
      :label="ctLabel"
      :required="String(ctRequired)=='1'"
      :rules="itemRules"
      :prop="ctName">
      <el-date-picker
        :name="ctName"
        :placeholder="ctPlaceholder"
        style="width: 100%"
        v-model="dataValue"
        :type="ctDataType"
        :value-format='valueFormat'>
      </el-date-picker>
    </el-form-item>
  </div>
  <!--  <div class="row com-row" :style="{'display':ctShow?'':'none'}">-->
  <!--    <div class="col-md-2 col-xs-4 com-line">-->
  <!--      <label>-->
  <!--        <span class="red-span" v-if="ctRequired == 1">*</span>{{ ctLabel }}-->
  <!--      </label>-->
  <!--    </div>-->
  <!--    <div class="col-md-4 col-xs-8 com-line mobile-size">-->
  <!--      <div class="info-edit-datePicker">-->
  <!--        <input class="form-control"-->
  <!--               v-for="(item,idx) in pickerDataList"-->
  <!--               :name="item.ctName"-->
  <!--               :placeholder="item.ctPlaceholder"-->
  <!--               :type="item.dataType"-->
  <!--               v-model="item.value"-->
  <!--               @input="onPickSelect(item,idx)">-->
  <!--        <span v-for="(item,idx) in pickerDataList" v-if="idx!=0&&idx!=pickDataList.length-1"> - </span>-->
  <!--      </div>-->
  <!--      <div v-show="!validValue&&ctShow" class="alert alert-danger tip-line">-->
  <!--        {{ ctErrTip }}-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>

import {rewrite_el_form_pickers_validate} from '../tag-utils';

export default {
  name: 'ct-date-picker',
  components: {},
  props: {
    ctName: {
      type: String,
      default: ''
    },
    ctPlaceholder: {
      type: String,
      default: ''
    },
    ctLabel: {
      type: String,
      default: ''
    },
    ctRequired: {
      type: String,
      default: '-1'
    },
    ctDataType: {
      type: String,
      default: 'date'
    },
    ctErrTip: {
      type: String,
      default: '请选择日期'
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    ctFieldList: {
      type: Array,
      default: () => {
        return [
          {
            name: '',
            placeholder: '',
            dataType: '',
            value: ''
          }
        ];
      }
    },
    ctFieldValue: {
      default: () => {
        return [
          {
            name: '',
            value: ''
          }
        ];
      }
    },
    ctShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      pickerDataList: [],
      validValue: true,
      relationRequired: '',
      itemRules: [],
      dataValue: ''
    };
  },
  created () {
    if (this.ctFieldList && this.ctFieldList.length > 0) {
      this.ctFieldList.forEach(item => {
        // 在这里已经构造了提交字段和值
        let obj = {
          name: item.name,
          ctName: item.name,
          ctPlaceholder: item.placeholder,
          dataType: item.dataType,
          value: item.value ? item.value : ''
        };
        this.pickerDataList.push(obj);
      });
      if (this.ctFieldValue && this.ctFieldValue.length > 0) {
        this.ctFieldValue.forEach(item => {
          this.ctFieldList.forEach((field, idx) => {
            if (item.name == field.name) {
              this.ctFieldList[idx].value = item.value ? item.value : '';
              this.pickerDataList[idx].value = this.ctFieldList[idx].value;
            }
          });
        });
      }
    }
    this.relationRequired = this.ctRequired;
    this.initDatePickerConfig();
  },
  methods: {
    initDatePickerConfig () {
      let pickerValid = (rules, value, callBack) => {
        this.isValidateShow();
        let valid = !this.validValue;
        if (valid) {
          callBack(new Error(this.ctErrTip || '请选择日期'));
        } else {
          callBack();
        }
      };

      this.itemRules = [{validator: pickerValid, trigger: 'change'}];

      this.$nextTick(() => {
        // 这里逻辑需要完全根据picker的组件特性来实现
        rewrite_el_form_pickers_validate(this, 'customAreaFormItemRef', this.pickerDataList);
      });
    },
    isValidateShow () {
      if (this.ctRequired == 1 && this.relationRequired == 1 && this.ctShow) {
        for (let i = 0; i < this.pickerDataList.length; i++) {
          let item = this.pickerDataList[i];
          if (!item.value) {
            this.validValue = false;
            break;
          } else {
            this.validValue = true;
          }
        }
      } else {
        this.validValue = true;
      }
      return !this.validValue;
    },
    onPickSelect (item, idx) {
      // Nothing
    },

    clearData () {
      // 清理已选中的数据
      // this.pickerDataList = []
      this.pickerDataList.forEach(item => {
        item.value = '';
      });
    },

    getData () {
      this.isValidateShow();
      return {
        name: this.ctName,
        data: this.pickerDataList,
        valid: this.validValue,
        required: this.ctRequired == 1 && this.relationRequired == 1
      };
    }
  }

};
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
