/**
 * Created by RoryHe on 2020/2/25.
 */

/**
 * 处理案件项目关闭的数据逻辑
 * @param data  需要处理该逻辑的页面data
 * @param resData
 */
export const funcCaseClose = (resData, callback) => {
  if (resData.caseStatus == 2) {
    if (callback) callback(resData.closeNotice ? resData.closeNotice : '<p style="text-align: center">当前项目已关闭</p>');
  }
};

// 判断是否是IE浏览器
export const isIE = () => {
  var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
  var isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp['$1']);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6;// IE版本<=7
    }
  } else if (isEdge) {
    return 'edge';// edge
  } else if (isIE11) {
    return 11; // IE11
  } else {
    return -1;// 不是ie浏览器
  }
};

// 判断是否微信内部浏览器
export const isWeiXin = () => {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
};

// 返回重复的数据arr,仅针对单一元素数组
export const compareStorgeId = (arr) => {
  let newArr = [];
  for (var i; i < arr.length; i++) {
    let repeat = false;
    for (var j = i; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        repeat = true;
        break;
      }
    }
    if (repeat) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

// 通用格式化
/*
 　　 * 参数说明：
 　　 * number：要格式化的数字
 　　 * decimals：保留几位小数
 　　 * dec_point：小数点符号
 　　 * thousands_sep：千分位符号
 　　 * */
export const number_format = (number, decimals, kdec_point, thousands_sep) => {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k;
      k = n.toFixed(prec);
      return k + '';
      // var k = Math.pow(10, prec);
      // // var k = prec
      // return '' + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2');
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
};

/**
 * 限流处理
 */
export const limitAccess = (err, limitCall) => {
  if (err && err.data && err.data.code && err.data.code == 33999 && limitCall) {
    limitCall(err.data.msg ? err.data.msg : '当前访问网站人数过多，请稍后再试');
  }
};

/**
 * 获取当前时间戳
 */
export const getTime = () => {
  var d = new Date();
  return d.getUTCMilliseconds();
};

export const getDateTime = (formatDate) => {
  return new Date(formatDate);
};

export const getGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * 构造动态字段的业务
 * @param data
 * @defaultData 默认配置
 */
export const createDynamicField = (data, defaultData) => {
  if (!data) {
    data = {};
  }
  if (!defaultData) {
    defaultData = {
      valid: false,
      show: false,
      remark: '',
      label: '',
      placeholder: '',
      maxlength: 256,
      fileType: '',
      codeType: '',
      limit: 1
    };
  }
  Object.keys(defaultData).forEach(key => {
    if (data[key] === undefined || data[key] === '' || data[key] === null) {
      data[key] = defaultData[key];
    }
  });

  let fieldObj = {
    valid: data.valid ? data.valid : false,
    show: data.show ? data.show : false,
    remark: data.remark ? data.remark : '',
    label: data.label ? data.label : '',
    placeholder: data.placeholder ? data.placeholder : '',
    maxlength: data.maxlength ? data.maxlength : 256, // 默认256
    fileType: data.fileType ? data.fileType : '',
    codeType: data.codeType ? data.codeType : '',
    limit: data.limit ? data.limit : 1
  };
  return fieldObj;
};

/**
 * 构建代理人对象
 * @data 数据 必须，如果没有，传空
 * @applyId 申请ID
 * @fileInfos 附件对象
 */

// export function createAgentObj (data, applyId, fileInfos, index) {
//   var agent = {
//     name: data.name,
//     userType: data.userType,
//     certificateType: data.certificateType,
//     certificateId: data.certificateId,
//     agencyPeriod: data.agencyPeriod,
//     phone: data.phone,
//     phoneId: 'phone_' + i,
//     userId: data.userId,
//     formStatus: {
//       certificateType: false,
//       uploadCertificatePositive: false,
//       uploadCertificateReverse: false,
//       uploadCommission: false,
//       uploadPhotocopy: false
//     },
//     uploadCertificatePositive: createUploaderParams(fileInfos.uploadCertificatePositive, 'uploadCertificatePositive' + index), // 证件人像面照片
//     uploadCertificateReverse: createUploaderParams(fileInfos.uploadCertificateReverse, 'uploadCertificateReverse' + index), // 证件非人像面照片
//     uploadCommission: createUploaderParams(fileInfos.uploadCommission, 'uploadCommission' + index), // 授权委托书
//     uploadPhotocopy: createUploaderParams(fileInfos.uploadPhotocopy, 'uploadPhotocopy' + index), // 身份证复印件
//     lawyerLicense: createUploaderParams(fileInfos.lawyerLicense, 'lawyerLicense' + index), // 律师执业证,
//     lawFirmLetter: createUploaderParams(fileInfos.lawFirmLetter, 'lawFirmLetter' + index) // 律师事务所函
//   };
//
//   return agent;
// }

/**
 * uploader 组件构建参数
 */
// export function createUploaderParams (fileInfos, uploadId) {
//   let obj = {
//     uploadUrl: api.BASE_UPLOAD_URL,
//     preUrl: api.FILE_ID_URL + '?applyId=' + applyId,
//     uploadAccept: '',
//     fileNumLimit: 1,
//     uploadData: {
//       classType: api.BUCKET_NAME,
//       fileName: fileInfos.fileName,
//       fileStorageId: fileInfos.fileStorageId,
//       fileId: fileInfos.fileId,
//       saveId: fileInfos.saveId,
//       storageName: fileInfos.storageName
//     },
//     uploadId: uploadId
//   };
//   return obj;
// }

/**
 * 过滤特殊字符修改英文转化为中文
 */
export function filterSymbolENToZH (str) {
  if (!str) {
    return '';
  }
  if (typeof (str) != 'string') {
    return '';
  }
  str = str.replace(/[.]/g, '。');
  str = str.replace(/[\(]/g, '（');
  str = str.replace(/[\)]/g, '）');
  str = str.replace(/[,]/g, '，');
  str = str.replace(/[<]/g, '《');
  str = str.replace(/[>]/g, '》');
  str = str.replace(/[?]/g, '？');
  str = str.replace(/[;]/g, '；');
  str = str.replace(/[:]/g, '：');
  str = str.replace(/[\[]/g, '【');
  str = str.replace(/[\]]/g, '】');
  str = str.replace(/[!]/g, '！');
  str = str.replace(/[-]/g, '－');
  return str;
}

/**
 * 过滤特殊字符修改中文转化为英文
 */
export function filterSymbolZHToEN (str) {
  if (!str) {
    return '';
  }
  if (typeof (str) != 'string') {
    return '';
  }
  str = str.replace(/[。]/g, '.');
  str = str.replace(/[（]/g, '(');
  str = str.replace(/[）]/g, ')');
  str = str.replace(/[，]/g, ',');
  str = str.replace(/[《]/g, '<');
  str = str.replace(/[》]/g, '>');
  str = str.replace(/[？]/g, '?');
  str = str.replace(/[；]/g, ';');
  str = str.replace(/[：]/g, ':');
  str = str.replace(/[【]/g, '[');
  str = str.replace(/[】]/g, ']');
  str = str.replace(/[！]/g, '!');
  str = str.replace(/[－]/g, '-');
  return str;
}

// URl里面取得对应的key值
export function getUrlKey (name, url = window.location.href) {
  return decodeURIComponent((new RegExp(`[?|&]${name}=` + '([^&;]+?)(&|#|;|$)').exec(url) || [, ''])[1].replace(/\+/g, '%20')) || null;
}

// 下载
export function download (blobUrl, filename) {
  const a = document.createElement('a');
  if (a.click) {
    a.href = blobUrl;
    a.target = '_parent';
    if ('download' in a) {
      a.download = filename;
    }
    (document.body || document.documentElement).appendChild(a);
    a.click();
    a.parentNode.removeChild(a);
  } else {
    if (window.top === window && blobUrl.split('#')[0] === window.location.href.split('#')[0]) {
      const padCharacter = blobUrl.indexOf('?') === -1 ? '?' : '&';
      blobUrl = blobUrl.replace(/#|$/, padCharacter + '$&');
    }
    window.open(blobUrl, '_parent');
  }
}

function getRandomForUUID () {
  // eslint-disable-next-line no-magic-numbers
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * 生成32位uuId
 * @function
 * @description  生成32位uuId
 * @returns {Object} 返回值
 */
export function getUUID () {
  return (getRandomForUUID() +
    getRandomForUUID() +
    getRandomForUUID() +
    getRandomForUUID() +
    getRandomForUUID() +
    getRandomForUUID() +
    getRandomForUUID() +
    getRandomForUUID());
}

/**
 * 获取等比例的盒子大小
 * @param {number} width 原始宽度
 * @param {number} height 原始高度
 * @param {number} proportionX x比例
 * @param {number} proportionY y比例
 * @return {Object} 等比例的盒子大小
 */
export function getRectByProportion (width, height, proportionX = 16, proportionY = 9) {
  const result = {
    width: '0',
    height: '0',
    type: ''
  };
  // 先以宽度为准，计算大小
  const heightByWidthRate = width / proportionX * proportionY;
  if (height > heightByWidthRate) {
    result.width = `${width}px`;
    result.height = `${heightByWidthRate}px`;
    result.type = 'width';
  } else {
    result.width = `${height / proportionY * proportionX}px`;
    result.height = `${height}px`;
    result.type = 'height';
  }
  return result;
}

/* istanbul ignore next */
export function hasClass (el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

/* istanbul ignore next */
export function addClass (el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.setAttribute('class', curClass);
  }
};

/* istanbul ignore next */
export function removeClass (el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.setAttribute('class', trim(curClass));
  }
};

export function isEmpty (str) {
  return str || '';
}

// ---------------金额相关的处理---------------------

// 数字格式化
export function formatterNum (val) {
  val = String(val);
  val = val.replace(/[^\d.]/g, ''); // 清除"数字"和"."以外的字符
  val = val.replace(/^\./g, ''); // 验证第一个字符是数字
  val = val.replace(/\.{2,}/g, '.'); // 只保留第一个, 清除多余的
  val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
  val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
  return val;
}

// 金额格式化
export function formatterMoney (val) {
  val = String(val);
  return val.toString().replace(/\d+/, function (n) { // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ',';
    });
  });
}

// 分变元
export const amount_format_yuan = (number, isFormateYuan = true) => {
  if (number === '') {
    return '';
  }
  let num = Number(number);
  if (num === num) {
    if (isFormateYuan) {
      num = num / 100;
    }
    return amount_format_show(num);
  } else {
    return '';
  }
};

// 金额格式化展示
export const amount_format_show = (str) => {
  str = String(str);
  if (!str || str == '') str = '0.00';
  if (str.indexOf('.') != -1) {
    var spStr = str.split('.');
    if (spStr.length == 2 && spStr[1].length > 2) {
      str = spStr[0] + '.' + spStr[1].substring(0, 2);
    }
  }
  return money_format(str);
};

// 取消下方对应金额格式化
export const re_money_format = (number) => {
  number = String(number);
  return parseFloat(number.replace(/[^\d\.-]/g, '')).toFixed(2);
};

// 小数变分数（元-》分）
// 小数变分数（元-》分）
export const value_to_points = (number) => {
  var m = re_money_format(number);
  m = String(m);
  if (m.indexOf('.') != -1) {
    // 如有小数位没有两位，需要补全
    if (m.split('.')[1].length < 2) {
      for (let i = 0; i < 2 - m.split('.')[1].length; i++) {
        m.split('.')[1] += '0';
      }
    }
    var r = m.split('.')[0] + m.split('.')[1];
    return Number(r);
  } else {
    return Number(String(m) + '00');
  }
};

// 金额格式化
export const money_format = (number) => {
  return number_format(number, 2, '.', ',');
};

// ---------------金额相关的处理---------------------

// 登录
export function loginFn (loginUrlPrefix, $reportJs) {
  // 登录逻辑
  // let caseId = ''
  // let hrefs = location.href.split('/')
  // if (location.href.indexOf('/index/') != -1) {
  //   let index  = hrefs.findIndex(item => item == 'index')
  //   caseId = hrefs[index+1]
  // } else {
  //   caseId = getUrlKey('caseId')
  // }
  // var url = '/index/' + caseId
  var url = location.href;
  // 增加登陆埋点透传参数cn／co
  let reportParams = '';
  if ($reportJs) {
    let isFirstParams = window.location.href.indexOf('?') == -1;
    reportParams += isFirstParams ? '?' : '&';
    reportParams += $reportJs._cn ? 'cn=' + $reportJs._cn : 'cn=';
    reportParams += $reportJs._co ? '&co=' + $reportJs._co : '&co=';
  }
  url = loginUrlPrefix + window.encodeURIComponent(url + reportParams) + '&loginParam=zqsb';
  window.location.href = url;
}

export function domAction () {
  document.body.click();
}
