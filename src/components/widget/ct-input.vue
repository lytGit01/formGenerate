<template>
  <div class="form-container" :style="{'display':ctShow?'':'none'}">
    <!--    //突破口：form-item - validate() 210行前后逻辑处理？-->
    <el-form-item
        ref="customAreaFormItemRef"
        :label="ctLabel"
        :rules="itemRules"
        :prop="ctName">
      <el-input
          :type="inputType"
          :name="name"
          :maxlength="maxLength"
          v-model.trim="dataValue"
          :autosize="ctAutoSize"
          :show-word-limit="showWordLimit"
          :placeholder="ctPlaceholder"
          clearable
          @blur="changeData"/>
      <div
          v-if="dataType=='decimal'"
          style="background: transparent;color: #606266;border: 0px;margin-bottom: 2.5px;justify-content: flex-start">
<!--        {{ decimalPlaceholder }}-->
      </div>
      <div v-show="remark">
        {{ remark }}
      </div>

    </el-form-item>
  </div>

  <!--    <div class="row com-row" :style="{'display':ctShow?'':'none'}">-->
  <!--      <div class="col-md-2 col-xs-4 com-line">-->
  <!--        <label>-->
  <!--          <span v-show="ctRequired==1" class="red-span">*</span>{{ label }}-->
  <!--        </label>-->
  <!--      </div>-->
  <!--      <div class="col-md-4 col-xs-8 com-line ct-input-main">-->
  <!--        <el-input :type="inputType"-->
  <!--                  :name="name"-->
  <!--                  :maxlength="maxLength"-->
  <!--                  v-model="dataValue"-->
  <!--                  @blur="changeData"-->
  <!--                  :autosize="autoSize"-->
  <!--                  :show-word-limit="showWordLimit"-->
  <!--                  :placeholder="placeholder"/>-->
  <!--        &lt;!&ndash;金额输入框特有的提示&ndash;&gt;-->
  <!--        <div-->
  <!--          v-if="dataType=='decimal'"-->
  <!--          style="background: transparent;color: #606266;border: 0px;margin-bottom: 2.5px;justify-content: flex-start"-->
  <!--          class="alert alert-info tip-line mobile-size">-->
  <!--          {{ decimalPlaceholder }}-->
  <!--        </div>-->
  <!--        <div v-show="!validValue&&decimalStatus&&ctShow" class="alert alert-danger cust-tip tl">-->
  <!--          {{ placeholder }}-->
  <!--        </div>-->
  <!--        <div v-show="!decimalStatus" class="alert  alert-info cust-tip tl">-->
  <!--          {{ decimalTip }}-->
  <!--        </div>-->
  <!--        <div v-show="!maxDecimalStatus" class="alert  alert-info cust-tip tl">-->
  <!--          {{ decimalCustTip }}-->
  <!--        </div>-->
  <!--        <div v-show="remark" class="alert alert-info cust-tip tl">-->
  <!--          {{ remark }}-->
  <!--        </div>-->
  <!--      </div>-->

  <!--    </div>-->
</template>

<script>
import { money_format, re_money_format } from '@/util';
import {rewrite_el_form_validate} from '../tag-utils';

export default {
  name: 'ct-input',
  props: {
    element: {
      type: Object,
      default: () => {}
    },
    ctName: {
      type: String,
      default: 'ct-input'
    },
    ctLabel: {
      type: String,
      default: ''
    },
    ctMaxLength: {
      type: Number,
      default: 32
    },
    ctDataValue: {
      type: String,
      default: ''
    },
    ctRequired: {
      type: Boolean,
      default: false
    },
    ctValidation: {
      type: String,
      default: ''
    },
    ctPlaceholder: {
      type: String,
      default: ''
    },
    ctRemark: {
      type: String,
      default: ''
    },
    ctDataType: {// 输入的数据类型  text-文本／decimal 金额(和本金是一套规则)／textarea文本区域
      type: String,
      default: 'text'
    },
    ctDecimalTip: {
      type: String,
      default: '请输入正确金额'
    },
    ctMaxDecimal: {// 最大输入金额
      type: String,
      default: '999999999999.99'
    },
    ctMinDecimal: {// 最小输入金额
      type: String,
      default: '0'
    },
    ctMaxDecimalTip: {// 不满足最大输入金额提示
      type: String,
      default: '不满足最大输入限制'
    },
    ctMinDecimalTip: {// 不满足最小输入金额提示
      type: String,
      default: '不满足最小输入限制'
    },
    ctAutoSize: {// dataType==textArea生效
      type: Object,
      default: () => {
        return {};
      }
    },
    ctRelation: {// 组件内部关联关系
      type: Array,
      default: () => {
        return [];
      }
    },
    ctShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      itemRules: [],
      name: 'ct-input',
      label: '',
      inputType: 'text',
      maxLength: 32,
      dataValue: '',
      validation: '',
      validValue: true,
      placeholder: '',
      remark: '',
      defaultDecimal: '0.00',
      decimalPlaceholder: '',
      decimalTip: '',
      decimalStatus: true,
      maxDecimalStatus: true,
      decimalCustTip: '',
      dataType: 'text',
      autoSize: '',
      showWordLimit: false,
      // relationRequired: ''
    };
  },
  created () {
    this.name = this.ctName;
    this.label = this.ctLabel;
    this.maxLength = this.ctMaxLength;
    this.dataValue = this.ctDataValue;
    this.validation = this.ctValidation;
    this.placeholder = this.ctPlaceholder;
    this.remark = this.ctRemark;
    this.decimalTip = this.ctDecimalTip;
    this.dataType = this.ctDataType;
    // this.autoSize = JSON.parse(JSON.stringify(this.ctAutoSize));
    // this.relationRequired = this.ctRequired;
    this.setInputConfig();
  },
  watch: {
    ctRequired () {
      this.setInputConfig();
    }
  },
  methods: {
    setInputConfig () {
      // 需要根据不同的ctDataType设置校验规则
      switch (this.ctDataType) {
        case 'textarea':// 文本域
          this.inputType = 'textarea';
          this.showWordLimit = true;
          let validTextArea = (rule, value, callback) => {
            this.isValidateShow();
            let valid = !this.validValue && this.decimalStatus;
            if (valid) {
              callback(new Error(this.placeholder));
            } else {
              callback();
            }
          };
          this.itemRules = [
            {
              required: this.ctRequired,
              message: this.element.requiredMessage || this.ctPlaceholder,
              trigger: 'blur'
            },
            {validator: validTextArea, trigger: 'blur'}
          ];
          break;
        case 'decimal':// 金额输入
          // this.decimalPlaceholder = this.ctPlaceholder;
          // this.placeholder = '';
          this.inputType = 'text';
          this.showWordLimit = false;
          let validDecimal = (rule, value, callback) => {
            this.isValidateDecimal();
            let valid = !this.decimalStatus || !this.maxDecimalStatus;
            if (valid) {
              // 校验未通过
              if (!this.decimalStatus) {
                callback(new Error(this.decimalTip));
              } else if (!this.maxDecimalStatus) {
                callback(new Error(this.decimalCustTip));
              }
            } else {
              callback();
            }
          };
          this.itemRules = [
            {
              required: this.ctRequired,
              message: this.element.requiredMessage || this.ctPlaceholder,
              trigger: 'blur'
            },
            {validator: validDecimal, trigger: 'blur'}
          ];
          break;
        default:// 普通输入框
          this.inputType = 'text';
          this.showWordLimit = false;
          let validText = (rule, value, callback) => {
            this.isValidateShow();
            let valid = !this.validValue && this.decimalStatus;
            if (valid) {
              callback(new Error(this.placeholder));
            } else {
              callback();
            }
          };
          this.itemRules = [
            {
              required: this.ctRequired,
              message: this.element.requiredMessage || this.ctPlaceholder,
              trigger: 'blur'
            },
            {validator: validText, trigger: 'blur'}
          ];
          console.log(this.itemRules, 666)
          break;
      }
      this.$nextTick(() => {
       // rewrite_el_form_validate(this, 'customAreaFormItemRef', 'dataValue');
      });
      this.$emit('call-init', this.ctName, this.itemRules, this.dataValue);
    },
    // 是否必填的逻辑有改变
    isValidateShow () {
      if (this.ctRequired && this.ctValidation.length > 0) {
        let re = new RegExp(this.validation.substring(1, this.validation.length - 1));
        this.validValue = re.test(this.dataValue);
      } else if (!this.ctRequired && this.ctValidation.length > 0) {
        if (this.dataValue == '') {
          this.validValue = true;
        } else {
          let re = new RegExp(this.validation.substring(1, this.validation.length - 1));
          this.validValue = re.test(this.dataValue);
        }
      } else if (this.ctRequired && this.ctValidation.length <= 0) {
        if (this.dataValue == '') {
          this.validValue = false;
        } else {
          this.validValue = true;
        }
      } else {
        this.validValue = true;
      }
      return !this.validValue;
    },

    isValidateDecimal () {
      // 初始化提示框
      this.maxDecimalStatus = true;
      this.decimalStatus = true;
      if (this.ctRequired && this.dataValue.length <= 0) { // 金额必填逻辑
        this.decimalStatus = false;
        return;
      }

      // 拿到格式化后的金额数字字符串
      let formatValue = re_money_format(this.dataValue);

      // 判断满足最大，最小值
      if (formatValue > Number(this.ctMaxDecimal)) {
        this.maxDecimalStatus = false;
        formatValue = this.ctMaxDecimal;
        this.decimalCustTip = this.ctMaxDecimalTip;
        // this.dataValue = utils.money_format(formatValue)
        return;
      }

      if (formatValue < Number(this.ctMinDecimal)) {
        this.maxDecimalStatus = false;
        formatValue = this.ctMinDecimal;
        this.decimalCustTip = this.ctMinDecimalTip;
        // this.dataValue = utils.money_format(formatValue)
        return;
      }

      if (this.dataValue.length <= 0) {
        this.dataValue = '';
        return;
      }

      // 直接格式化成符合两位小数规则
      this.dataValue = money_format(formatValue);
    },

    changeData () {
      if (this.dataType == 'text' || this.dataType == 'textarea') {
        this.isValidateShow();
      } else if (this.dataType == 'decimal') {
        this.isValidateDecimal();
      }
      this.$emit('on-blur', this.ctName, this.dataValue, this.ctRelation);
    },

    clearData () {
      // this.dataValue = this.$options.data().dataValue
      this.dataValue = '';
    },

    getData () {
      let valid = false;
      if (this.dataType == 'text' || this.dataType == 'textarea') {
        this.isValidateShow();
        valid = this.validValue;
      } else if (this.dataType == 'decimal') {
        this.isValidateDecimal();
        valid = this.decimalStatus && this.maxDecimalStatus;
      }
      return {
        name: this.name,
        data: this.dataValue,
        valid: valid,
        required: this.ctRequired || this.ctValidation.length > 0,
        dataType: this.dataType
      };
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
