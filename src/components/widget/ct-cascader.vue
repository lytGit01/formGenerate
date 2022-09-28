<template>
  <div class="form-container"
       :style="{'display':ctShow?'':'none'}">
    <el-form-item
      ref="customAreaFormItemRef"
      :label="ctLabel"
      :required="String(ctRequired)=='1'"
      :rules="itemRules"
      :prop="ctName">
      <el-cascader
        class="form-el-select form-control"
        style="width: 100%"
        clearable
        v-model="value"
        :options="options"
        :disabled="disabled"
        :placeholder="placeholder"
        @change="handleChange($event,false)"
        @expand-change="expandChange"/>
    </el-form-item>
  </div>

  <!--  <div class="ct-select-cascader row com-row" :style="{'display':ctShow?'':'none'}">-->
  <!--    <div class="col-md-2 col-xs-4 com-line">-->
  <!--      <label>-->
  <!--        <span class="red-span" v-if="ctRequired == 1">*</span>{{label}}-->
  <!--      </label>-->
  <!--    </div>-->
  <!--    <div class="col-md-4 col-xs-8 com-line">-->
  <!--      <el-cascader-->
  <!--        class="form-el-select form-control"-->
  <!--        clearable-->
  <!--        v-model="value"-->
  <!--        :options="options"-->
  <!--        :placeholder="placeholder"-->
  <!--        @change="handleChange($event,false)"-->
  <!--        @expand-change="expandChange"/>-->
  <!--      <div v-show="validValue&&ctShow" class="alert alert-danger tip-line">-->
  <!--        {{placeholder}}-->
  <!--      </div>-->

  <!--    </div>-->

  <!--  </div>-->
</template>
<!--级联选择器,只支持5层以内的子节点选择，数据总量不要超过1000条-->
<script>

import {rewrite_el_form_validate} from '../tag-utils';

export default {
  name: 'ct-cascader',
  components: {},
  props: {
    ctName: {
      type: String,
      default: 'ct-input'
    },
    ctLabel: {
      type: String,
      default: ''
    },
    ctRequired: { // 必填
      type: String,
      default: ''
    },
    ctPlaceholder: {
      type: String,
      default: ''
    },
    ctCodes: {// 默认选项
      type: Array,
      default: () => {
        return [
          //          {
          //            codeType: '',
          //            pid: '',
          //            code: '',
          //            name: '',
          //            order: 0,
          //            leaf: 0,
          //            children: []
          //          }
        ];
      }
    },
    ctSelectCode: {
      type: Array,
      default: () => {
        return [];
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      name: 'ct-select',
      validValue: false,
      placeholder: '',
      value: [],
      options: [],
      selectName: '',
      relationRequired: '', // 内外联动关系的字段必填控制
      itemRules: []
    };
  },
  created () {
    this.name = this.ctName;
    this.label = this.ctLabel;
    this.placeholder = this.ctPlaceholder;
  },
  mounted () {
    this.$nextTick(() => {
      this.initCodes();
      this.value = this.ctSelectCode;
      // 默认触发一下handlerChange方法，保证初始化的时候关系逻辑能正常触发
      this.relationRequired = this.ctRequired;
      this.handleChange(this.value, true);
      this.initCascaderConfig();
    });
  },
  methods: {
    initCascaderConfig () {
      let cascaderValid = (rules, value, callBack) => {
        this.isValidateShow();
        let valid = this.validValue;
        if (valid) {
          callBack(new Error(this.placeholder || '请选择'));
        } else {
          callBack();
        }
      };
      this.itemRules = [{validator: cascaderValid, type: 'array'}];
      this.$nextTick(() => {
        rewrite_el_form_validate(this, 'customAreaFormItemRef', 'value');
      });
    },
    initCodes () {
      if (this.ctCodes.length > 0) {
        this.ctCodes.forEach((item, idx) => {
          // 先出第一层可选项
          //            if (item && item.codeType && (item.code || item.value) && (item.name || item.label)) {
          if (item && item.code && item.name) {
            let op;
            if (item.children && item.children.length > 0) {
              op = {
                codeType: item.codeType,
                pid: item.pid ? item.pid : '',
                value: item.code,
                label: item.name,
                order: item.order ? item.order : 0,
                leaf: item.leaf ? item.leaf : 0,
                children: []
              };
            } else {
              op = {
                codeType: item.codeType,
                pid: item.pid ? item.pid : '',
                value: item.code,
                label: item.name,
                order: item.order ? item.order : 0,
                leaf: item.leaf ? item.leaf : 0
              };
            }
            this.stractOpChildren(item.children, op);
            // 初始化时处理完所有数据还是选择的时候处理数据呢？
            this.options.push(op);
          }
        });
        if (this.options.length > 0) {
          this.options.sort((oa, ob) => {
            return oa - ob < 0;
          });
        }
      }
    },

    stractOpChildren (childrenList, op) {
      if (childrenList && childrenList.length > 0) {
        childrenList.forEach((child, i) => {
          let opChild;
          if (child.children && child.children.length > 0) {
            opChild = {
              codeType: child.codeType,
              pid: child.pid ? child.pid : '',
              value: child.code,
              label: child.name,
              order: child.order ? child.order : 0,
              leaf: child.leaf ? child.leaf : 0,
              children: []
            };
            this.stractOpChildren(child.children, opChild);
          } else {
            opChild = {
              codeType: child.codeType,
              pid: child.pid ? child.pid : '',
              value: child.code,
              label: child.name,
              order: child.order ? child.order : 0,
              leaf: child.leaf ? child.leaf : 0
            };
          }
          op.children.push(opChild);
        });
        if (op.children && op.children.length > 0) {
          op.children.sort((oa, ob) => {
            return oa - ob < 0;
          });
        }
      }
    },

    handleChange (codeValue, isInit) {
      if (!isInit) this.$refs['customAreaFormItemRef'].validate('array');
      this.$emit('on-cascader', this.ctName, this.value, this.ctRelation);
    },
    expandChange (codeValue) {

    },

    getSelectName () {
      this.selectName = '';
      if (this.value.length > 0 && this.$children && this.$children[0] && this.$children[0].presentText) {
        this.selectName = this.$children[0].presentText;
      }
    },

    isValidateShow () {
      if (this.ctRequired == 1 && this.value.length <= 0 && this.relationRequired == 1) {
        this.validValue = true;
      } else { this.validValue = false; }
      if (this.ctCodes.length == 0) this.validValue = true;
      return this.validValue;
    },

    clearData () {
      this.selectName = '';
      this.value = [];
      // this.selectName = this.$options().data.selectName
      // this.value = this.$options().data.value
    },

    getData () {
      this.isValidateShow();
      this.getSelectName();
      return {
        name: this.name,
        data: this.value,
        codeName: this.selectName,
        valid: !this.validValue,
        required: this.ctRequired == 1 && this.relationRequired == 1
      };
    }

  }

};
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
