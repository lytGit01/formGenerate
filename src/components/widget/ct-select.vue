<template>
  <div class="form-container"
       :style="{'display':ctShow?'':'none'}">
    <el-form-item
        ref="customAreaFormItemRef"
        :label="ctLabel"
        :required="String(ctRequired)=='1'"
        :rules="itemRules"
        :prop="ctName">
      <el-select class="form-control"
                 @clear='clearData'
                 :disabled="disabled"
                 :multiple="isMutiple"
                 :collapse-tags="isMutiple"
                 v-model="selectValue"
                 clearable
                 :class="selectCode == '-1'?['grey', 'form-el-select']:['form-el-select']"
                 :placeholder="placeholder"
                 @change="onSelect">
        <!--        <el-option :disabled="isMutiple" v-if="placeholder&&placeholder.length>0" :label="placeholder"-->
        <!--                   :value="'-1'"></el-option>-->
        <el-option v-for="item in codes" :key="item.code" :value="item.code" :label="item.name"></el-option>
      </el-select>

    </el-form-item>
  </div>

  <!--  <div class="row com-row" :style="{'display':ctShow?'':'none'}">-->
  <!--    <div class="col-md-2 col-xs-4 com-line">-->
  <!--      <label>-->
  <!--        <span class="red-span" v-if="ctRequired == 1">*</span>{{ label }}-->
  <!--      </label>-->
  <!--    </div>-->
  <!--    <div class="col-md-4 col-xs-8 com-line ct-select-main">-->
  <!--      <el-select class="form-control"-->
  <!--                 :multiple="isMutiple"-->
  <!--                 :collapse-tags="isMutiple"-->
  <!--                 v-model="selectValue"-->
  <!--                 :class="selectCode == '-1'?['grey', 'form-el-select']:['form-el-select']"-->
  <!--                 :placeholder="placeholder"-->
  <!--                 @change="onSelect">-->
  <!--        <el-option :disabled="isMutiple" v-if="placeholder&&placeholder.length>0" :label="placeholder"-->
  <!--                   :value="'-1'"></el-option>-->
  <!--        <el-option v-for="item in codes" :key="item.code" :value="item.code" :label="item.name"></el-option>-->
  <!--      </el-select>-->
  <!--      <div v-show="validValue&&ctShow" class="alert alert-danger tip-line">-->
  <!--        {{ placeholder }}-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
import Vue from 'vue';
import {rewrite_el_form_validate} from '../tag-utils';

export default {
  name: 'ct-select',
  props: {
    ctCodes: {// 组件可选值
      type: Array,
      default: () => {
        return [];
      }
    },
    ctName: {
      type: String,
      default: 'ct-input'
    },
    ctLabel: {
      type: String,
      default: ''
    },
    ctDefaultVal: {
      type: String,
      default: ''
    },
    ctPlaceholder: {
      type: String,
      default: ''
    },
    ctSelectCode: {
      type: String,
      default: '-1'
    },
    ctSelectType: {// single/multiple 单选／多选
      type: String,
      default: 'single'
    },
    ctRequired: { // 必填
      type: String,
      default: ''
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data () {
    return {
      name: 'ct-select',
      codes: [], // [  {"code": "1","name": "身份证"},]
      selectValue: '', // select选中值 可能是string或者array
      selectCode: '-1', // 选择格式化的值
      selectName: '',
      label: '',
      validValue: false,
      placeholder: '',
      isMutiple: false,
      relationRequired: '', // 内外联动关系的字段必填控制
      itemRules: {}
    };
  },
  created () {
    this.name = this.ctName;
    this.label = this.ctLabel;
    this.placeholder = this.ctPlaceholder || `请选择${this.ctLabel}`;
    this.codes = this.ctCodes;
    this.selectCode = this.ctSelectCode;
    if (this.selectCode == '-1' || this.selectCode == '') {
      this.selectCode = this.ctDefaultVal;
      this.selectValue = this.ctDefaultVal;
    }
    if (this.ctSelectType == 'multiple') { // 多选逻辑
      if (this.selectCode == '-1') this.selectCode = '';
      this.selectValue = [];
      this.isMutiple = true;
      let selectList = this.selectCode.split(',');
      console.log('this.selectName', this.selectCode.split(','), this.ctSelectType, this.selectValue, this.selectCode, this.selectName, this.codes);

      if (selectList.length == 1 && !selectList[0]) selectList = [];
      if (selectList && selectList.length > 0) {
        this.selectName = '';
        this.selectCode = '';
        this.selectValue = selectList;
        for (let idx in selectList) {
          for (let code of this.codes) {
            if (String(code.code) == String(this.selectValue[idx])) {
              this.selectName += ',' + code.name;
              this.selectCode += ',' + code.code;
            }
          }
        }
        this.selectCode = this.selectCode.startsWith(',') ? this.selectCode.substring(1, this.selectCode.length) : this.selectCode;
        this.selectName = this.selectName.startsWith(',') ? this.selectName.substring(1, this.selectName.length) : this.selectName;
      }
    } else { // 单选逻辑
      this.isMutiple = false;
      for (let code of this.codes) {
        if (String(code.code) == String(this.selectCode)) {
          this.selectName = code.name;
          this.selectValue = code.code;
          break;
        }
      }
    }
    this.relationRequired = this.ctRequired;
    // 默认触发一下onSelect方法，保证初始化的时候关系逻辑能正常触发
    this.onSelect(true);
    this.initSelectConfig();
  },
  methods: {
    initSelectConfig () {
      let validSelect = (rule, value, callBack) => {
        this.isValidateShow();
        let valid = this.validValue;
        if (valid) {
          callBack(new Error(this.placeholder));
        } else {
          callBack();
        }
      };
      this.itemRules = [
        {
          required: String(this.ctRequired) == '1',
          message: this.placeholder,
          trigger: 'change'
        },
        {validator: validSelect, trigger: 'change'}
      ];
      this.$nextTick(() => {
        rewrite_el_form_validate(this, 'customAreaFormItemRef', 'selectCode');
      });
    },
    isValidateShow () {
      if (this.ctRequired == 1 && this.selectCode == '-1' && this.relationRequired == 1) { this.validValue = true; } else { this.validValue = false; }
      if (this.codes.length == 0) this.validValue = true;
      return this.validValue;
    },
    onSelect (isInit) {
      if (this.isMutiple) {
        this.selectName = '';
        this.selectCode = '';
        for (let idx in this.selectValue) {
          for (let code of this.codes) {
            if (String(code.code) == String(this.selectValue[idx])) {
              console.log('onselect', code.name);
              this.selectName += ',' + code.name;
              this.selectCode += ',' + code.code;
            }
          }
        }
        // 格式化
        this.selectCode = this.selectCode.startsWith(',') ? this.selectCode.substring(1, this.selectCode.length) : this.selectCode;
        this.selectName = this.selectName.startsWith(',') ? this.selectName.substring(1, this.selectName.length) : this.selectName;
      } else {
        this.selectCode = this.selectValue || '-1';
        for (var item in this.codes) {
          if (String(this.codes[item].code) == String(this.selectCode)) {
            this.selectName = this.codes[item].name;
            break;
          }
        }
      }
      if (!isInit) this.isValidateShow();
      this.$emit('on-select', this.ctName, this.selectCode, this.ctRelation);
      console.log('this.selectName', this.selectValue, this.selectCode, this.selectName, this.codes, this.selectCode);
    },

    clearData () {
      // this.selectCode = this.$options().data.selectCode
      this.selectCode = '-1';
      this.selectName = '';
      // this.selectName = this.$options().data.selectName
    },

    getData () {
      this.isValidateShow();
      // 注意如果没去选择要情况所有展示的值
      if (String(this.selectCode) == '-1') this.selectName = '';
      console.log('getData', {
        name: this.name,
        codeName: this.selectName,
        data: this.selectCode,
        valid: !this.validValue,
        required: this.ctRequired == 1 && this.relationRequired == 1
      });
      return {
        name: this.name,
        codeName: this.selectName,
        data: this.selectCode,
        valid: !this.validValue,
        required: this.ctRequired == 1 && this.relationRequired == 1
      };
    }
  }

};
</script>

<style lang="scss" rel="stylesheet/scss">
.tip-line {
  min-height: 30px;
  line-height: 18px;
  padding: 5px 0
}

.grey {
  color: #999;
}
</style>
