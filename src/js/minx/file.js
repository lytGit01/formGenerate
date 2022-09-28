import * as constant from '@/js/constant';
let minx = {
  data () {
    return {
      uploadComp: [], // 是否完成上传
      needWatchUpload: true
    };
  },
  watch: {
    'uploadComp.length' (n, o) {
      if (this.needWatchUpload) {
        console.log('uploadComp.length', n, o);
        if (n == 0 && o != 0) { // 结束上传
          this.$emit('processing', false);
        } else if (o == 0 && n != 0) { // 开始上传
          this.$emit('processing', true);
        }
      }
    }
  },
  methods: {
    getSuffix (str) { // 获取文件名的后缀
      if (!str) {
        return 'image';
      }
      let ind = str.lastIndexOf('.');
      let suffix = str.substring(ind + 1);
      suffix = suffix.toLowerCase();
      let icon = '';
      // .doc,docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt,.jpg,.jpeg,.bmp,.png.mp4
      switch (suffix) {
      case 'doc':
      case 'docx':
        icon = 'docx';
        break;
      case 'xls':
      case 'xlsx':
        icon = 'xlsx';
        break;
      case 'ppt':
      case 'pptx':
        icon = 'pptx';
        break;
      case 'pdf':
        icon = 'pdf';
        break;
      case 'txt':
        icon = 'image';
        break;
      case 'jpg':
      case 'jpeg':
      case 'bmp':
      case 'png':
        icon = 'image';
        break;
      case 'mp4':
        icon = 'mp4';
        break;
      case 'mp3':
        icon = 'mp3';
        break;
      case 'zip':
      case 'rar':
        icon = 'zip';
        break;
      default:
        icon = 'image';
      }
      return icon;
    },
    sizeTrans (size) { // 大小转化
      let str = '';
      if (size < Math.pow(1024, 1)) { // b
        str = size + 'b';
      } else if (size > Math.pow(1024, 1) && size < Math.pow(1024, 2)) { // kb
        str = (size / Math.pow(1024, 1)).toFixed(2) + 'kb';
      } else if (size > Math.pow(1024, 2) && size < Math.pow(1024, 3)) { // M
        str = (size / Math.pow(1024, 2)).toFixed(2) + 'M';
      } else if (size > Math.pow(1024, 3) && size < Math.pow(1024, 4)) { // G
        str = (size / Math.pow(1024, 3)).toFixed(3) + 'G';
      } else if (size > Math.pow(1024, 4) && size < Math.pow(1024, 5)) { // T
        str = (size / Math.pow(1024, 4)).toFixed(3) + 'T';
      }
      return str;
    },
    fileTypeTrans (fileType) { // 文件类型转化
      if (!fileType) { return '--'; }
      let file = constant.fileType[String(fileType)];
      if (!file) {
        file = fileType;
      }
      return file;
    },
    // 上传进度
    syncFileProcess (data) {
      console.log('syncFileProcess', data);
      if (data.isComplate) {
        this.uploadComp.splice(0, 1);
      } else {
        this.uploadComp.push(true);
      }
    }
  }
};

export default minx;
