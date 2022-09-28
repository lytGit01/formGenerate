<template>
  <div class="form-upload-container">
    <el-upload
      class=""
      :action="action"
      :limit='limit'
      :show-file-list='false'
      :multiple='limit != 1'
      :on-success="uploadSuccess"
      :on-error='handleError'
      :on-progress='uploadProgress'
      :before-upload="beforeUpload"
      :http-request='httpRequest'
      :on-exceed='handlExceed'
      :fileList='fileListProp'
      v-show="showUpload == 0">
      <div class="form-upload-wapper">
        上传文件（<span class="form-upload-focus">{{ showNum }}</span> / {{limit}} ）
      </div>
    </el-upload>
    <div class="el-upload" v-show="showUpload != 0">
      <div class="form-upload-wapper"  @click="dialogVisible = true">
        {{loadingCountAll > 0 ? '上传中' : '上传文件' }}
        （<span  class="form-upload-focus"> <i v-if="loadingCountAll > 0" class="loading-div"></i>{{ showNum }}</span> / {{limit}} ）
      </div>
    </div>
    <!-- <p class="form-upload-tip" style="color:red" v-if="errCount > 0">失败个数：{{errCount}}</p> -->
    <p class="form-upload-tip">{{tip}}</p>
    <uploadDialog :dialogVisible.sync='dialogVisible' :fileListProps='fileList'
    :fileType='fileType'
    :maxSize='maxSize'
    :limit='limit'
    :action='action'
    v-bind="$attrs"
    @deleFile='deleFile' @syncFileData='syncFileData'
    @asyncDialogFilePro='asyncDialogFilePro'/>
  </div>
</template>

<script>
import uploadDialog from './upload-dialog';
import fileMinx from '@/js/minx/file';
import uploadMinx from '@/js/minx/upload';
export default {
  name: 'form-upload',
  mixins: [ fileMinx, uploadMinx ],
  components: {uploadDialog},
  props: {
    tip: {
      type: String,
      default: ''
    },
    fileListProps: { // 文件列表
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data () {
    return {
      // 弹框
      dialogVisible: false,

      dialogLen: 0

    };
  },
  created () {
    this.$bus.$on('initFileList', () => {
      this.init();
    });
  },
  computed: {
    showNum () {
      return this.fileList.length + this.dialogLen - this.loadingCount - this.dialogloadingCount;
    },
    showUpload () {
      return this.fileList.length + this.dialogLen;
    },
    fileListProp () {
      return new Array(this.showNum);
    }
  },
  methods: {
    init () {
      // console.log('fileListProps', this.fileListProps)
      this.fileList = [];
      this.fileListProps.forEach(item => {
        this.fileList.push(this.createFileItem(item));
      });
    },
    // 构建显示的数据
    createFileItem (data) {
      let item = {
        name: this.$utils.isEmpty(data.fileName),
        size: this.$utils.isEmpty(data.fileSize),
        fileId: this.$utils.isEmpty(data.fileId),
        scenesId: this.$utils.isEmpty(data.scenesId),
        saveId: this.$utils.isEmpty(data.saveId),
        scenesType: this.$utils.isEmpty(data.scenesType),
        uploadStatus: 2
      };
      return item;
    },

    /** 弹框的回调 */
    deleFile (item) {
      let index = this.fileList.findIndex(file => file === item);
      if (index != -1) {
        this.fileList.splice(index, 1);
      }
      if (item.uploadStatus == 2) {
        this.syncFileData({
          type: 'dele',
          data: item,
          fileType: this.fileType
        });
      }
    },

    asyncDialogFilePro ({len, loadingCount}) {
      this.dialogLen = len;
      this.dialogloadingCount = loadingCount;
    }
  }
};
</script>

<style lang="scss" scoped>

.loading-div {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(1,97,227,0.2);
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 8px;
  position: relative;
  &::after {
    content: "";
    display: inline-block;
    width: 14px;
    height: 14px;
    position: absolute;
    top: -2px;
    left: -2px;
    border: 2px solid transparent;
    border-radius: 50%;
    border-left-color: #0251D9;
    transform-origin: 50% 50%;
    animation:rotateAll 3s linear infinite;
  }
}
.form-upload-wapper {
  border: 1px solid #eee;
  border-radius: 4px;
  text-align: center;
}
@keyframes rotateAll{
  0% {
    transform: rotateZ(0deg)
  }
  100% {
    transform: rotateZ(360deg)
  }
}
</style>
