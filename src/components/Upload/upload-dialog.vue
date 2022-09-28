<template>
  <div>
    <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
    <el-dialog
      title="文件上传"
      :visible.sync="dialogVisible"
      :custom-class="customClass"
      :close-on-click-modal="false"
      width="590px"
      append-to-body
      :before-close="handleClose">
      <div class="file-list-wapper">
        <div class="file-list-item" v-for="(item,index) in fileListAll">
          <div v-if="!isFilePreview" class="file-list-left" @click="preview(item)">
            <svg-icon :icon-class='getSuffix(item.name)' class="file-list-img"/>
            <div class="file-list-main">
              <p class="file-list-name">{{item.name}}</p>
              <p v-if="item.uploadStatus == 2" class="file-list-size">{{sizeTrans(item.size)}}</p>
              <p v-if="item.uploadStatus == 1" class="file-list-err">{{item.error}}</p>
              <el-progress v-if="item.uploadStatus == 3" :stroke-width='4'
              :show-text='false' :percentage="item.loading"></el-progress>
            </div>
          </div>
          <div v-else class="file-list-left" @click="preview(item)">
            <svg-icon :icon-class='getSuffix(item.fileName)' class="file-list-img"/>
            <div class="file-list-main">
              <p class="file-list-name">{{item.fileName}}</p>
              <p class="file-list-size">{{sizeTrans(item.fileSize)}}</p>
            </div>
          </div>
          <div class="file-list-right" v-if="isDel">
            <slot name="opera" v-bind:item="item">
              <img src='@/assets/images/dele_icon.png' class="file-list-opration"
                   @click="deleFile(item)" v-if="item.uploadStatus != 3"/>
            </slot>

          </div>
        </div>

        <div class="file-list-item-empty" v-if="fileListAll.length == 0">
          暂无数据
        </div>

      </div>

      <div slot="footer" style="width:100%">
        <slot name="footer">
          <el-upload
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
            :file-list='fileListAll'
            multiple>
            <div class="form-upload-wapper">
              上传文件（<span class="form-upload-focus">{{fileListAll.length - loadingCount}}</span> / {{limit}} ）
            </div>
          </el-upload>
        </slot>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import fileMinx from '@/js/minx/file';
import uploadMinx from '@/js/minx/upload';
// import {getFileDownloadUrl} from '@/js/api';
export default {
  name: 'upload-dialog',
  mixins: [ fileMinx, uploadMinx ],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    fileListProps: {
      type: Array,
      default: () => {
        return [];
      }
    },
    customClass: {
      type: String,
      default: 'upload-dialog'
    },
    isFilePreview: {
      type: Boolean,
      default: false
    },
    disabledForm: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {needWatchUpload: false};
  },
  computed: {
    fileListAll () {
      this.$emit('asyncDialogFilePro', {
        len: this.fileList.length,
        loadingCount: this.loadingCount
      });
      return this.fileListProps.concat(this.fileList);
    },
    isDel () {
      return !this.disabledForm;
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:dialogVisible', false);
    },
    deleFile (item) {
      let index = this.fileList.findIndex(file => file === item);
      if (index != -1) {
        this.fileList.splice(index, 1);
      }
      this.$emit('deleFile', item);
    },
    preview (item) {
      if (item.uploadStatus == 2 && !this.$utils.isWeiXin()) {
        let data = {
          fileId: item.saveId
          // applyId: this.$route.query.applyId
        };
        getFileDownloadUrl(data).then(res => {
          if (res.code == 200) {
            window.open(res.data);
          } else {
            this.$message.error(res.msg ? res.msg : '获取文件地址失败，请重试');
          }
        }).catch(e => {
          this.$message.error('获取文件地址失败，请重试');
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/minx.scss';
.file-list-wapper {
  padding: 14px 16px 22px
}
.file-list-item {
  padding: 10px 24px;
  border-radius: 4PX;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  &:hover {
    background: #F1F6FD;
  }

  .file-list-img {
    flex-shrink: 0;
    width: 37px;
    height: 44px;
    margin-right: 12px
  }
}
.file-list-item-empty {
  text-align: center;
  // padding: 8px
}
.file-list-left {
  display: flex;
  flex-grow: 1;
  max-width: calc( 100% - 94px );
}

.file-list-main {
  flex-grow: 1;
  max-width: calc( 100% - 50px );
}
.file-list-name {
  @include singleLine;
  line-height: 1;
  height: 16px;
  margin-bottom: 8px;
}
.file-list-size {

  @include lightColorAndSize;
}

//.file-list-err {
//  font-size: $--base-font-size-small;
//  color: $--base-color-danger
//}

/deep/ {
  .form-upload-wapper {
    border: 1px solid #eee;
    border-radius: 4px;
    text-align: center;
    height: 42px;
    line-height: 42px;
  }
  .el-dialog__footer{
    .el-upload {
      width: 100%;
    }
  }
}

@media screen and (max-width: 768px){
  .file-list-wapper {
    padding: 12px 8px 0
  }
  .file-list-item {
    padding: 8px 12px;
  }
}
</style>
