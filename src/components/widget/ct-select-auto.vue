<template>
  <div class="form-container"
       :style="{'display':ctShow?'':'none'}">
    <el-form-item
      ref="customAreaFormItemRef"
      :rules="itemRules"
      :label="ctLabel"
      :required="String(ctRequired)=='1'"
      :prop="ctName">
      <el-select
        class="form-el-select"
        v-model="value"
        filterable
        remote
        :disabled="disabled"
        reserve-keyword
        :allow-create="ctAutoCreate"
        default-first-option
        clearable
        size="medium"
        auto-complete="new-password"
        :remote-method="autoSelectSearch"
        :loading="autoSelectLoading"
        :popper-append-to-body="true"
        @change="autoSelectChange"
        @clear="autoSelectClear"
        :placeholder="ctPlaceholder">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
  </div>
  <!--  <div class="ct-select-auto row com-row" :style="{'display':ctShow?'':'none'}">-->
  <!--    <div class="col-md-2 col-xs-4 com-line">-->
  <!--      <label><span class="red-span" v-if="ctRequired == 1">*</span>{{ ctLabel }}</label>-->
  <!--    </div>-->
  <!--    <div class="col-md-4 col-xs-8 com-line mobile-size">-->
  <!--      <el-select-->
  <!--        class="form-el-select"-->
  <!--        v-model="value"-->
  <!--        filterable-->
  <!--        remote-->
  <!--        reserve-keyword-->
  <!--        :allow-create="ctAutoCreate"-->
  <!--        default-first-option-->
  <!--        clearable-->
  <!--        size="medium"-->
  <!--        auto-complete="new-password"-->
  <!--        :remote-method="autoSelectSearch"-->
  <!--        :loading="autoSelectLoading"-->
  <!--        :popper-append-to-body="true"-->
  <!--        @change="autoSelectChange"-->
  <!--        @clear="autoSelectClear"-->
  <!--        :placeholder="ctPlaceholder">-->
  <!--        <el-option-->
  <!--          v-for="item in options"-->
  <!--          :key="item.value"-->
  <!--          :label="item.label"-->
  <!--          :value="item">-->
  <!--        </el-option>-->
  <!--      </el-select>-->
  <!--      <div v-show="!validStatus&&ctShow" class="alert alert-danger tip-line">-->
  <!--        {{ ctPlaceholder }}-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>
<!--可以自定义输入标签的select-->
<script>
// import * as api from '@/js/api';
import {rewrite_el_form_validate} from '../tag-utils';

export default {
  name: 'ct-select-auto',
  components: {},
  props: {
    ctCodes: {// 默认可选项
      type: Array,
      default: []
    },
    ctName: {
      type: String,
      default: 'ct-input'
    },
    ctLabel: {
      type: String,
      default: ''
    },
    ctPlaceholder: {
      type: String,
      default: ''
    },
    ctRequired: { // 必填
      type: String,
      default: ''
    },
    ctAutoCreate: {// 是否可以自己创建下拉项目
      type: Boolean,
      default: false
    },
    ctSelectCode: {
      type: Object,
      default: () => {
        return {
          //                        label: '',
          //                        value: '',
        };
      }
    },
    ctEnumCode: {// 其他类型的选项，用户可以自己自定义填写选项
      type: String,
      default: ''
    },
    ctCodeType: {
      type: String,
      default: ''
    },
    ctIsLoadCodes: {// 通过ctIsLoadCodes来判断是否走网络搜索
      type: Boolean,
      default: false// true走本地
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
  data () {
    return {
      autoSelectLoading: false,
      options: [],
      searchOptions: [],
      value: '',
      label: '', // 选择的值
      code: '', // 选择的code
      validStatus: true,
      lastSearchTime: -1,
      relationRequired: '',
      itemRules: {}
    };
  },
  created () {
    this.initCode();
    if (this.ctEnumCode && this.ctEnumCode != '' && this.ctSelectCode && this.ctSelectCode.value == this.ctEnumCode) { // 判断是否是自定义填写
      this.value = this.ctSelectCode.label;
      this.label = this.ctSelectCode.label;
      this.code = this.ctEnumCode;
    } else { // 下拉选项
      this.value = this.ctSelectCode;

      if (Object.prototype.toString(this.ctSelectCode) == '[object Object]' && this.ctSelectCode.value && this.options.length >= 0) {
        this.label = this.ctSelectCode.label;
        this.code = this.ctSelectCode.value;
        let canPush = true;
        for (var i = 0; i < this.options.length; i++) {
          if (this.options[i].value == this.code) {
            canPush = false;
            break;
          }
        }
        if (canPush) {
          this.options.unshift(this.ctSelectCode);
        }
      }
    }
    this.lastSearchTime = -1;
    this.relationRequired = this.ctRequired;
    // 默认触发一下onSelect方法，保证初始化的时候关系逻辑能正常触发
    this.autoSelectChange(true);
    this.initAutoSelectConfig();
  },
  methods: {
    initAutoSelectConfig () {
      let validAutoSelect = (rule, value, callBack) => {
        this.valid();
        let valid = !this.validStatus;
        if (valid) {
          callBack(new Error(this.ctPlaceholder));
        } else {
          callBack();
        }
      };
      this.itemRules = [{validator: validAutoSelect, trigger: 'change'}];
      this.$nextTick(() => {
        rewrite_el_form_validate(this, 'customAreaFormItemRef', 'code');
      });
    },
    initCode () {
      if (this.ctCodes && this.ctCodes.length > 0) {
        this.options = this.ctCodes.map(item => ({
          label: item.name,
          value: item.code
        }));
      }
    },
    autoSelectChange (isInit) {
      // 这段提交校验前再处理
      //                console.log('principalDebtorChange-start', this.value, this.value.toString(), this.code, this.label, this.options)
      if (this.value.toString() != '[object Object]') {
        // 自定义值
        let v = this.value.toString();
        this.label = v;
        this.code = this.ctEnumCode;
      } else {
        // 下拉选项
        this.label = this.value.label;
        this.code = this.value.value;
        this.options = [
          {
            label: this.label,
            value: this.code
          }
        ];
      }
      this.initCode();
      this.$emit('on-select', this.ctName, this.selectCode, this.ctRelation);
      //                console.log('principalDebtorChange', this.value, this.value.toString(), this.options)
    },
    autoSelectClear () {
      //                console.log('principalDebtorClear', this.value)
      this.value = '';
      this.label = '';
      this.code = '';
      this.options = [];
      this.initCode();
      // 默认触发一下onSelect方法，保证初始化的时候关系逻辑能正常触发
      this.autoSelectChange(true);
    },
    autoSelectSearch (query) {
      //                console.log('autoSelectSearch', query)
      if (!query) {
        this.options = [];
        return;
      }

      this.value = query;
      this.autoSelectLoading = true;
      if (this.ctIsLoadCodes) {
        setTimeout(() => {
          this.options = this.ctCodes.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 500);
      } else {
        let time = new Date().getTime();
        if (time - this.lastSearchTime < 500) { // 搜索间隔0.5s
          return;
        } else {
          this.lastSearchTime = time;
        }
        // api.searchCode({
        //   codeType: this.ctCodeType,
        //   cond: query
        // }, false).then(res => {
        //   this.autoSelectLoading = false;
        //   if (res && res.code == 200 && res.data && res.data.length > 0) {
        //     this.options = [];
        //     res.data.forEach(item => {
        //       let op = {
        //         label: item.codeName,
        //         value: item.code
        //       };
        //       this.options.push(op);
        //     });
        //   } else {
        //     this.options = [];
        //   }
        // }, err => {
        //   this.autoSelectLoading = false;
        //   this.options = [];
        // });
      }
    },

    valid () {
      if (this.ctRequired == 1 && this.relationRequired == 1) {
        this.validStatus = this.code && this.label ? this.code != '' && this.label != '' : false;
      } else {
        this.validStatus = true;
      }
    },

    clearData () {
      this.autoSelectClear();
    },

    getData () {
      this.valid();
      return {
        name: this.ctName,
        codeName: this.label,
        data: {
          label: this.label,
          value: this.code
        },
        valid: this.validStatus,
        required: this.ctRequired == 1 && this.relationRequired == 1
      };
    }

  }

};
</script>

<style lang="scss" rel="stylesheet/scss">
.ct-select-auto {
  .form-el-select {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 34px;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;

    .el-input {
      display: flex;
      align-items: center;

      .el-input__inner::-webkit-input-placeholder {
        color: #999 !important;
        opacity: 1 !important;
      }

      .el-input__inner::-moz-placeholder {
        color: #999 !important;
        opacity: 1 !important;
      }

      .el-input__inner:-ms-input-placeholder {
        color: #999 !important;
        opacity: 1 !important;
      }

      .el-input__inner {
        padding: 0px !important;
        height: auto !important;
        line-height: 1.42857143 !important;
        border: none !important;
        height: auto !important;
      }

      .el-input__suffix {
        display: flex !important;
        align-items: center !important;
      }

      .el-select-dropdown el-popper {
        left: 0 !important;
      }
    }
  }

}

</style>
