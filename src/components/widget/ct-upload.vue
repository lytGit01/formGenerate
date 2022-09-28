<template>
  <div class="form-container"
       :style="{'display':ctShow?'':'none'}">
    <el-form-item
      ref="customAreaFormItemRef"
      :label="ctLabel"
      :required="String(ctRequired)=='1'"
      :rules="itemRules"
      :prop="ctName">
      <formUpload :tip="ctTip"
                  :fileType='ctFileType'
                  :action="ctAccept"
                  :maxSize="maxSize"
                  :limit='ctLimit'
                  :fileListProps.sync='fileListProps'
                  v-bind="$attrs"
                  @syncFileData='syncFileData'
                  @syncFileProcess='syncFileProcess'/>
    </el-form-item>
  </div>
  <!--    <div >-->
  <!--      <div class="row com-row">-->
  <!--        <div class="col-md-4 col-xs-8 upload-row">-->
  <!--          <mutipleUpload-->
  <!--            :applyId='applyId'-->
  <!--            :ref="baseData.uploadId"-->
  <!--            :url="baseData.url"-->
  <!--            :accept="fileAccpet"-->
  <!--            :fileNumLimit="baseData.fileNumLimit"-->
  <!--            :maxFileSize="baseData.maxFileSize"-->
  <!--            :formData="baseData.formData"-->
  <!--            :preLoadBranchUrl="baseData.preBranchUrl"-->
  <!--            :preLoadUrl="baseData.preUrl"-->
  <!--            :preViewUrl="baseData.preViewUrl"-->
  <!--            :delUrl="baseData.delUrl"-->
  <!--            :uploadId="baseData.uploadId"-->
  <!--            :fileType="ctFileType"-->
  <!--            v-on:mutipleUploadMsg="mutipleUploadMsg"-->
  <!--            v-on:mutipleUploadDel="mutipleUploadDel"-->
  <!--            @updateSelectFiles='updateSelectFiles'/>-->
  <!--          <div v-show="widgetStatus&&ctShow" class="alert alert-danger tip-line">-->
  <!--            {{ ctErrTip }}-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
</template>

<script>
// import Vue from 'vue';
// import * as api from '@/js/api';
import fileMinx from '@/js/minx/file';
import formUpload from '@/components/Upload/form-upload.vue';
// import * as createFormData from '../../../pages/apply-step/components/createFormData';
import {rewrite_el_form_array_validate} from '../tag-utils'; // rewrite_el_form_validate

export default {
  name: 'ct-upload',
  components: {formUpload},
  mixins: [fileMinx],
  props: {
    ctLabel: {type: String, default: ''},
    ctTip: {type: String, default: ''},
    ctRequired: {type: String, default: ''},
    ctErrTip: {type: String, default: '请上传文件'},
    applyIdProp: {type: String, default: ''}, // 必须要的参数,申报id
    ctLimit: {type: Number, default: 1},
    ctSize: {type: Number, default: 10}, // MB
    ctName: {type: String, default: 'ctUpload'},
    ctFileType: {type: String | Number, default: -1},
    ctScenesType: {type: Number, default: 0},
    ctFileList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    ctAccept: {type: String, default: ''},
    ctShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // 其他类证据
      widgetStatus: false,
      fileAccpet: '', // 支持上传的文件类型
      relationRequired: '',
      maxSize: 0,
      // v4.0参数
      fileListProps: [], // 文件上传数据
      itemRules: []
    };
  },
  created () {
    if (this.ctFileList && this.ctFileList.length > 0) {
      this.ctFileList.forEach((item, idx) => {
        if (!item.name && item.fileName) {
          item.name = item.fileName;
        }
        if (item.saveId && item.saveId != '') {
          this.fileListProps.push(item);
        }
      });
    }
    this.fileAccpet = this.ctAccept;
    this.relationRequired = this.ctRequired;
    this.maxSize = this.ctSize * 1024;
    this.initUploadConfig();
  },
  methods: {
    initUploadConfig () {
      let fileValid = (rule, value, callBack) => {
        this.isValidateShow();
        console.log('initUploadConfig', this.widgetStatus);
        let valid = this.widgetStatus;
        if (valid) {
          callBack(new Error(this.ctErrTip));
        } else {
          callBack();
        }
      };
      this.itemRules = [{validator: fileValid, type: 'array'}];
      this.$nextTick(() => {
        this.$bus.$emit('initFileList');
        rewrite_el_form_array_validate(this, 'customAreaFormItemRef', this.fileListProps);
      });
      this.$emit('call-init', this.ctName, this.itemRules, this.fileListProps);
    },
    structureFileParams (data, fileType, applyId) {
      let params = {
        applyId: this.applyId ? this.applyId : applyId || '',
        // fileId: data.fileId,
        fileName: data.name,
        fileSize: data.size,
        fileType: fileType,
        saveId: data.saveId
      };
      return params;
    },

    syncFileData (data) {
      switch (data.type) {
      case 'add':
        this.fileListProps.push(this.structureFileParams(data.data, data.fileType, this.applyIdProp));
        break;
      case 'dele':
        let index = -1;
        if (data.fileType == this.ctFileType) {
          index = this.fileListProps.findIndex(item => item.saveId == data.data.fileId);
          this.fileListProps.splice(index, 1);
        }
        break;
      }
      this.$refs['customAreaFormItemRef'].validate('change');
      console.log('syncFileData', data, this.fileListProps);
    },

    isValidateShow () {
      if (String(this.ctRequired) == '1') {
        this.widgetStatus = this.fileListProps.length <= 0;
      } else {
        this.widgetStatus = false;
      }
    },

    clearData () {
      this.fileListProps = [];
    },

    /**
     * 外部调用
     */
    getData () {
      return {
        name: this.ctName,
        data: this.fileListProps,
        valid: !this.widgetStatus,
        required: this.ctRequired == 1 && this.relationRequired == 1
      };
    }
  }

};
</script>

<style lang="scss" rel="stylesheet/scss">
.ct-tip {
  text-align: left;
  margin-top: 15px;
  font-size: 10px;
  line-height: 14px;
}
</style>
