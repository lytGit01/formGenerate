/**
 * Created by RoryHe on 2020/7/2.
 * 常量
 */

/**
 * 文件类型
 * CARD_PHOTOCOPY(1, "身份证件复印件", ScenesTypeEnum.USER),
 CARD_PHOTO(2, "身份证件照片", ScenesTypeEnum.USER),
 ORGAN_PHOTO(3, "机构证照", ScenesTypeEnum.USER),
 IDENTIFICATION(4, "身份证明", ScenesTypeEnum.USER),
 EVIDENCE(5, "授权委托书", ScenesTypeEnum.USER),
 BANK_ACCOUNT(6, "受偿银行账户确认书", ScenesTypeEnum.BANK_ACCOUNT),
 GUARANTEE_CONTRACT(8, "担保合同", ScenesTypeEnum.GUARANTEE),
 COLLATERAL(9, "担保物登记凭证", ScenesTypeEnum.GUARANTEE),
 DECLARATION(10, "债权申报表及目录", ScenesTypeEnum.CLAIM),
 ADDRESS_CONFIRM(11, "送达地址确认书", ScenesTypeEnum.DELIVERY),
 CONTRACT(12, "证据材料-合同类", ScenesTypeEnum.CLAIM),
 INVOICE(13, "证据材料-发票类", ScenesTypeEnum.CLAIM),
 LITIGATION(14, "证据材料-诉讼文书", ScenesTypeEnum.CLAIM),
 OTHER(15, "证据材料-其他", ScenesTypeEnum.CLAIM),
 */

export const fileType = {
  '1': '身份证件复印件',
  '2': '身份证件照片',
  '3': '机构证照',
  '4': '身份证明',
  '5': '授权委托书',
  '6': '受偿银行账户确认书',
  '8': '担保合同',
  '9': '担保物登记凭证',
  '10': '债权申报表，债权申报书及目录',
  '11': '送达地址确认书',
  // 证据材料-
  '12': '合同类',
  '13': '发票类',
  '14': '诉讼文书',
  '15': '其他',
  '16': '申报材料',
  '17': '工作人员身份证明',
  '90': '债权申报回执单',
  '91': '债权确认回执单',
  '92': '电子签名申请单',
  '93': '电子签名单',
  '94': '终审确认单',
  '95': '文件打包参数数据',
  '96': '文件打包数据'
};

