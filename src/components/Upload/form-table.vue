<template>
  <div class="form-table-container">
    <!--pc看table-->
    <table class="upload-list-table">
      <thead>
      <tr class="upload-list-thead">
        <th style="">{{ tableTitle }}（{{ fileList.length }}）</th>
        <th>类型</th>
        <th style="width: 140px">大小</th>
        <th class="opration-td" style="width: 80px" v-if="canPreview">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr class="upload-list-tbody" v-for="item in fileList">
        <td>
          <div class="singleLine">{{ item.fileName }}</div>
        </td>
        <td>
          <!-- label 用于 自定义字段的展示  -->
          <div class="singleLine">{{ item.label ? item.label : fileTypeTrans(item.fileType) }}</div>
        </td>
        <td>{{ sizeTrans(item.fileSize) }}</td>
        <td class="opration-td" v-if="canPreview">
          <el-button type="text" @click="view(item)">查看</el-button>
        </td>
      </tr>
      <tr class="upload-list-tbody" v-if="!fileList.length">
        <td>
          <div class="no-data">暂无数据</div>
        </td>
      </tr>
      </tbody>
    </table>
    <!--移动端看简要信息，查看更多弹窗-->
    <div class="list-title">
      <span class="form-label">{{ tableTitle }}：</span>
      <el-button type="text" @click="clickMobileBtn">已上传 {{ fileList.length }}条</el-button>
    </div>
    <upload-dialog :dialogVisible.sync="uploadDialogVisible"
                   :fileListProps="fileList"
                   customClass="upload-dialog mobile-view-file-list"
                   :isFilePreview="true">
      <template v-slot:opera="{item}">
        <el-button type="text" @click="view(item)">查看</el-button>
      </template>
      <div slot="footer"></div>
    </upload-dialog>
  </div>
</template>

<script>
import fileMinx from '@/js/minx/file';
import uploadDialog from './upload-dialog';
// import { getFileDownloadUrl } from '@/js/api';

export default {
  name: 'form-table',
  mixins: [fileMinx],
  components: {uploadDialog},
  props: {
    fileList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableTitle: {
      type: String,
      default: '名称'
    },
    canPreview: { // 是否可预览
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // fileList: [ // status 1 上传成功 2 上传失败 3 上传中
      //   { filename: '银发[2014]277号-中国人民银行关于发布金融机.pdf', size: 10255, status: 1, fileType: 1 },
      //   { filename: '银发[2014]277号-中国人民银行关于发布金融机.pdf', size: 10255, status: 1, fileType: 2 },
      // ]
      uploadDialogVisible: false
    };
  },
  methods: {
    // 查看
    view (item) {
      console.log('view-item', item);
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
    },
    clickMobileBtn () {
      if (this.fileList.length > 0) {
        this.uploadDialogVisible = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/minx.scss';

.upload-list-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  @include border;
  line-height: 14px;
  text-align: left
}

.upload-list-thead th {
  background: #F7FAFE;
  font-weight: normal;
  color: #999999;
  font-size: 14px
}

.upload-list-thead th,
.upload-list-tbody td {
  padding: 11px 16px;
  padding-right: 52px;
  border-bottom: 1px solid #E8E8E8;
  > div {
    height: 18px;
  }

  &:last-child {
    padding-right: 16px
  }
}

.singleLine {
  @include singleLine;
}

.list-title {
  display: none;

  .el-button {
    padding: 0;
  }
}
.no-data {
  text-align: end;
  color: #909399;
  margin-left: 200px;
  transform: translateX(100px);
}
@media screen and (max-width: 768px) {
  .upload-list-thead th,
  .upload-list-tbody td {
    padding-right: 8px
  }
  .upload-list-table {
    display: none;
  }
  .list-title {
    display: block;
  }
}
</style>

<style lang="scss">
.el-dialog__wrapper.el-dialog__wrapper .el-dialog.mobile-view-file-list {
  .el-dialog__footer {
    display: none;
  }
}
</style>
