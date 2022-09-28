// simport * as constant from '@/js/constant';
let minx = {
  props: {
    maxSize: { // 单个上传的大小
      type: Number,
      default: 10 * 1024
    },
    limit: { // 最多上传的数量
      type: Number,
      default: 5
    },
    action: { // 可接受的文件类型
      type: String,
      default: '.doc,docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt,.jpg,.jpeg,.bmp,.png.mp4'
    },
    fileType: {
      type: String | Number,
      default: ''
    }
  },
  data () {
    return {
      uploadJs: null, // 上传的钩子
      fileList: [], // 文件列表
      errCount: 0, // 失败个数
      loadingCount: 0, // 正在上传的个数
      file: null, // 正在上传的文件
      classType: '',

      dialogloadingCount: 0
    };
  },
  watch: {
    loadingCountAll (n, o) {
      console.log('loadingCountAll', n, o);
      if (n == 0 && o != 0) { // 结束上传
        this.$emit('syncFileProcess', {
          fileType: this.fileType,
          isComplate: true
        });
      } else if (o == 0 && n != 0) { // 开始上传
        this.$emit('syncFileProcess', {
          fileType: this.fileType,
          isComplate: false
        });
      }
    }
  },
  computed: {
    loadingCountAll () {
      return this.loadingCount + this.dialogloadingCount;
    }
  },
  created () {
    this.uploadJs = this.$uploadJs;
  },
  methods: {
    // 上传前
    beforeUpload (file) {
      this.fileList.push(file);
      if (this.isClickReload) this.isClickReload = false;
      let idx = this.fileList.length - 1;
      file.idx = idx;
      file.loading = 0;

      if (file.size <= 0) {
        this.errMinSize(idx, this.fileList);
        file.status = 'errSize';
        this.errCount++;
        return false;
      }
      // pdf限制100mb
      // let fileTypeIdx = file.name.lastIndexOf('.');
      // let suffix = file.name.substring(fileTypeIdx, file.name.length);
      if (file.size > this.maxSize * 1024) {
        this.errMaxSize(idx, this.fileList);
        file.status = 'errSize';
        this.errCount++;
        return false;
      }

      file.status = 'start-upload';
      this.loadingCount++;
      return true;
    },
    errMinSize (idx, fileList) {
      this.$set(fileList[idx], 'uploadStatus', 1);
      this.$set(fileList[idx], 'error', '文件大小不能小于0');
      // fileList[idx].uploadStatus == 1
      // fileList[idx].error == '文件大小不能小于0'
    },
    errMaxSize (idx, fileList) {
      this.$set(fileList[idx], 'uploadStatus', 1);
      this.$set(fileList[idx], 'error', '文件大小不能大于' + this.sizeTrans(this.maxSize * 1024));
      // fileList[idx].uploadStatus == 1
      // fileList[idx].error == '文件大小不能大于' + this.sizeTrans(this.maxSize)
    },
    // 自定义上传
    httpRequest () {
      let file = arguments[0].file;
      this.file = file;
      // 新版上传
      // let fid = this.$reportJs.eventLog('3_1')
      // fid = fid + '^1^' + this.$reportJs._cn + '^'
      let uniqueId = this.$utils.getGuid();
      this.uploadJs.upload(
        this.uploadJs.constant_.plat_aliyun,
        this.uploadJs.createUploadParams(this.classType, file, null, {
          index: file.idx, // 当前正在执行上传的文件元素定位
          uniqueId: uniqueId
        }, ''),
        {transData: {fid: '', ft: this.fileType ? this.fileType : ''}},
        this.uploadCallBack,
        this.uploadProgress);
    },
    uploadCallBack (res) {
      if (this.loadingCount > 0) this.loadingCount--;
      if (res.data && (res.code == 200 || res.status == 200)) {
        this.uploadSuccess(res, res.data.file);
      } else {
        this.handleError(res.msg ? res.msg : '文件上传失败', res.data.file, this.fileList, res.data.index);
      }
    },
    uploadProgress (data) {
      if (this.fileList[data.data.index]) {
        let file = this.fileList[data.data.index];
        file.loading = data.rate;
        file.uploadStatus = 3;
        this.fileList.splice(data.data.index, 1, file);
      }
    },

    // 上传成功
    uploadSuccess (response, file, fileList) {
      let fileItem = this.fileList[file.idx];
      fileItem.uploadStatus = 2;
      fileItem.saveId = response.data.fileId;
      this.fileList.splice(file.idx, 1, fileItem);
      this.syncFileData({
        type: 'add',
        data: this.fileList[file.idx],
        fileType: this.fileType
      });
    },
    // 上传失败
    handleError (err, file, fileList, index) {
      if (err && !file) {
        file = {};
        file.idx = index;
      }
      let fileItem = this.fileList[file.idx];
      fileItem.uploadStatus = 1;
      fileItem.error = '文件上传发生错误';
      this.fileList.splice(file.idx, 1, fileItem);
    },
    // 上传中。。。
    uploadProgress (data) {
      if (this.fileList[data.data.index]) {
        let file = this.fileList[data.data.index];
        file.loading = data.rate;
        file.uploadStatus = 3;
        this.fileList.splice(data.data.index, 1, file);
      }
    },
    // 超出文件个数
    handlExceed () {
      this.$message.warning(`最多上传${this.limit}个文件`);
    },

    // 回调给外部组件
    syncFileData (data) {
      this.$emit('syncFileData', data);
    }
  }
};

export default minx;
