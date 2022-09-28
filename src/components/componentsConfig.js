export const basicComponents = [
  {
    elementType: "标题控件",
    index: 0,
    label: "标题控件",
    metadataId: 4,
    name: "ccsq001tysqbdtxnr",
    placeholder: "注：1.上传文件格式支持pdf或图片(jpg/jpeg/bmp/png)； 2.如果要上传的材料页数较多，可扫描整理为一个PDF文件",
    scenesType: "1",
    type: "title"
  },
  {
    elementType: "单行文本",
    index: 7,
    label: "单行文本",
    maxLength: 50,
    metadataId: 1,
    name: "sddz",
    placeholder: "如果选择邮寄或电子邮件接收，请录入收件地址或电子邮箱",
    required: false,
    scenesType: "1",
    type: "text",
    validation: '',
  },
  {
    autosize: {maxRows: 5, minRows: 2},
    dataType: "textarea",
    elementType: "多行文本",
    index: 1,
    label: "多行文本",
    maxLength: 500,
    metadataId: 1,
    name: "hfbz",
    placeholder: "请输入多行文本",
    required: false,
    scenesType: "2",
    type: "text",
    validation: '',
  },
  {
    autosize: {maxRows: 5, minRows: 1},
    dataType: "decimal",
    elementType: "金额控件",
    index: 1,
    label: "金额控件",
    maxLength: 500,
    metadataId: 1,
    name: "hfbz",
    placeholder: "请输入金额",
    required: false,
    scenesType: "2",
    type: "text",
    validation: '',
  },
  {
    elementType: "日期控件",
    dataType: 'date',
    placeholder: '年/月/日',
    fileType: "4",
    index: 4,
    label: "日期",
    name: "xwhfrq",
    required: false,
    type: "date_picker"
  },
  {
    codeType: "12014",
    codes: [
      {code: 1, name: '纸质'},
      {code: 2, name: '电子'}
    ],
    elementType: "下拉框控件",
    index: 5,
    label: "载体形式",
    metadataId: 3,
    name: "ztxs",
    required: false,
    scenesType: "1",
    type: "select"
  },
  // {
  //   type: 'input',
  //   icon: 'icon-input',
  //   options: {
  //     width: '',
  //     defaultValue: '',
  //     required: false,
  //     requiredMessage: '',
  //     dataType: '',
  //     dataTypeCheck: false,
  //     dataTypeMessage: '',
  //     pattern: '',
  //     patternCheck: false,
  //     patternMessage: '',
  //     validatorCheck: false,
  //     validator: '',
  //     placeholder: '',
  //     customClass: '',
  //     disabled: false,
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hidden: false,
  //     dataBind: true,
  //     showPassword: false,
  //   },
  //   events: {
  //     onChange: '',
  //     onFocus: '',
  //     onBlur: ''
  //   }
  // },
  // {
  //   type: 'textarea',
  //   icon: 'icon-diy-com-textarea',
  //   options: {
  //     width: '',
  //     defaultValue: '',
  //     required: false,
  //     requiredMessage: '',
  //     disabled: false,
  //     pattern: '',
  //     patternMessage: '',
  //     validatorCheck: false,
  //     validator: '',
  //     placeholder: '',
  //     customClass: '',
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hidden: false,
  //     dataBind: true
  //   },
  //   events: {
  //     onChange: '',
  //     onFocus: '',
  //     onBlur: ''
  //   }
  // },
  // {
  //   type: 'number',
  //   icon: 'icon-number',
  //   options: {
  //     width: '',
  //     required: false,
  //     requiredMessage: '',
  //     validatorCheck: false,
  //     validator: '',
  //     defaultValue: 0,
  //     min: 0,
  //     max: 9,
  //     step: 1,
  //     disabled: false,
  //     controls: true,
  //     controlsPosition: '',
  //     customClass: '',
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hidden: false,
  //     dataBind: true,
  //     precision: 0,
  //   },
  //   events: {
  //     onChange: '',
  //     onFocus: '',
  //     onBlur: ''
  //   }
  // },
  // {
  //   type: 'radio',
  //   icon: 'icon-radio-active',
  //   options: {
  //     inline: false,
  //     defaultValue: '',
  //     showLabel: false,
  //     options: [
  //       {
  //         value: 'Option 1',
  //         label: 'Option 1'
  //       },
  //       {
  //         value: 'Option 2',
  //         label: 'Option 2'
  //       },
  //       {
  //         value: 'Option 3',
  //         label: 'Option 3'
  //       }
  //     ],
  //     required: false,
  //     requiredMessage: '',
  //     validatorCheck: false,
  //     validator: '',
  //     width: '',
  //     remote: false,
  //     remoteType: 'datasource',
  //     remoteOption: '',
  //     remoteOptions: [],
  //     props: {
  //       value: 'value',
  //       label: 'label'
  //     },
  //     remoteFunc: '',
  //     customClass: '',
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hidden: false,
  //     dataBind: true,
  //     disabled: false
  //   },
  //   events: {
  //     onChange: ''
  //   }
  // },
  // {
  //   type: 'checkbox',
  //   icon: 'icon-check-box',
  //   options: {
  //     inline: false,
  //     defaultValue: [],
  //     showLabel: false,
  //     options: [
  //       {
  //         value: 'Option 1'
  //       },
  //       {
  //         value: 'Option 2'
  //       },
  //       {
  //         value: 'Option 3'
  //       }
  //     ],
  //     required: false,
  //     requiredMessage: '',
  //     validatorCheck: false,
  //     validator: '',
  //     width: '',
  //     remote: false,
  //     remoteType: 'datasource',
  //     remoteOption: '',
  //     remoteOptions: [],
  //     props: {
  //       value: 'value',
  //       label: 'label'
  //     },
  //     remoteFunc: '',
  //     customClass: '',
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hidden: false,
  //     dataBind: true,
  //     disabled: false
  //   },
  //   events: {
  //     onChange: ''
  //   }
  // },
  // {
  //   type: 'select',
  //   icon: 'icon-select',
  //   options: {
  //     defaultValue: '',
  //     multiple: false,
  //     disabled: false,
  //     clearable: false,
  //     placeholder: '',
  //     required: false,
  //     requiredMessage: '',
  //     validatorCheck: false,
  //     validator: '',
  //     showLabel: false,
  //     width: '',
  //     options: [
  //       {
  //         value: 'Option 1'
  //       },
  //       {
  //         value: 'Option 2'
  //       },{
  //         value: 'Option 3'
  //       }
  //     ],
  //     remote: false,
  //     remoteType: 'datasource',
  //     remoteOption: '',
  //     filterable: false,
  //     remoteOptions: [],
  //     props: {
  //       value: 'value',
  //       label: 'label'
  //     },
  //     remoteFunc: '',
  //     customClass: '',
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hidden: false,
  //     dataBind: true
  //   },
  //   events: {
  //     onChange: '',
  //     onFocus: '',
  //     onBlur: ''
  //   }
  // },
  // {
  //   type: 'time',
  //   icon: 'icon-time',
  //   options: {
  //     defaultValue: '',
  //     readonly: false,
  //     disabled: false,
  //     editable: true,
  //     clearable: true,
  //     placeholder: '',
  //     startPlaceholder: '',
  //     endPlaceholder: '',
  //     isRange: false,
  //     arrowControl: false,
  //     format: 'HH:mm:ss',
  //     required: false,
  //     requiredMessage: '',
  //     validatorCheck: false,
  //     validator: '',
  //     width: '',
  //     customClass: '',
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hidden: false,
  //     dataBind: true
  //   },
  //   events: {
  //     onChange: '',
  //     onFocus: '',
  //     onBlur: ''
  //   }
  // },
  // {
  //   type: 'date',
  //   icon: 'icon-date',
  //   options: {
  //     defaultValue: '',
  //     readonly: false,
  //     disabled: false,
  //     editable: true,
  //     clearable: true,
  //     placeholder: '',
  //     startPlaceholder: '',
  //     endPlaceholder: '',
  //     type: 'date',
  //     format: 'yyyy年MM月dd日',
  //     timestamp: false,
  //     required: false,
  //     requiredMessage: '',
  //     validatorCheck: false,
  //     validator: '',
  //     width: '',
  //     customClass: '',
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hidden: false,
  //     dataBind: true
  //   },
  //   events: {
  //     onChange: '',
  //     onFocus: '',
  //     onBlur: ''
  //   }
  // },
  // {
  //   type: 'rate',
  //   icon: 'icon-pingfen1',
  //   options: {
  //     defaultValue: null,
  //     max: 5,
  //     disabled: false,
  //     allowHalf: false,
  //     required: false,
  //     requiredMessage: '',
  //     validatorCheck: false,
  //     validator: '',
  //     customClass: '',
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hidden: false,
  //     dataBind: true,
  //     showScore: false
  //   },
  //   events: {
  //     onChange: ''
  //   }
  // },
  // {
  //   type: 'color',
  //   icon: 'icon-color',
  //   options: {
  //     defaultValue: '',
  //     disabled: false,
  //     showAlpha: false,
  //     required: false,
  //     requiredMessage: '',
  //     validatorCheck: false,
  //     validator: '',
  //     customClass: '',
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hidden: false,
  //     dataBind: true
  //   },
  //   events: {
  //     onChange: ''
  //   }
  // },
  // {
  //   type: 'switch',
  //   icon: 'icon-switch',
  //   options: {
  //     defaultValue: false,
  //     required: false,
  //     requiredMessage: '',
  //     validatorCheck: false,
  //     validator: '',
  //     disabled: false,
  //     customClass: '',
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hidden: false,
  //     dataBind: true
  //   },
  //   events: {
  //     onChange: ''
  //   }
  // },
  // {
  //   type: 'slider',
  //   icon: 'icon-slider',
  //   options: {
  //     defaultValue: 0,
  //     disabled: false,
  //     required: false,
  //     requiredMessage: '',
  //     validatorCheck: false,
  //     validator: '',
  //     min: 0,
  //     max: 100,
  //     step: 1,
  //     showInput: false,
  //     range: false,
  //     width: '',
  //     customClass: '',
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hidden: false,
  //     dataBind: true
  //   },
  //   events: {
  //     onChange: ''
  //   }
  // },
  // {
  //   type: 'text',
  //   icon: 'icon-wenzishezhi-',
  //   options: {
  //     defaultValue: 'This is a text',
  //     customClass: '',
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hidden: false,
  //     dataBind: true
  //   },
  //   events: {
  //     onChange: ''
  //   }
  // },
  // {
  //   type: 'html',
  //   icon: 'icon-html',
  //   options: {
  //     defaultValue: '<b style="color: red;">\n\tThis is a HTML5\n</b>',
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hidden: false,
  //     dataBind: true
  //   },
  //   events: {
  //     onChange: ''
  //   }
  // },
  // {
  //   type: 'button',
  //   icon: 'icon-button',
  //   options: {
  //     customClass: '',
  //     disabled: false,
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hideLabel: true,
  //     hidden: false,
  //     dataBind: false,
  //     buttonSize: 'small',
  //     buttonType: '',
  //     buttonPlain: false,
  //     buttonRound: false,
  //     buttonCircle: false,
  //     buttonName: 'Button',
  //     width: ''
  //   },
  //   events: {
  //     onClick: ''
  //   }
  // },
  // {
  //   type: 'link',
  //   icon: 'icon-lianjie',
  //   options: {
  //     customClass: '',
  //     disabled: false,
  //     labelWidth: 100,
  //     isLabelWidth: false,
  //     hideLabel: false,
  //     hidden: false,
  //     dataBind: false,
  //     linkType: 'default',
  //     linkName: 'Link',
  //     underline: true,
  //     blank: true,
  //     href: ''
  //   },
  //   events: {
  //     onClick: ''
  //   }
  // }
]

export const advanceComponents = [
  {
    elementType: "上传控件",
    fileType: "1",
    index: 1,
    label: "申请书",
    limit: 1,
    maxSize: "50",
    metadataId: 6,
    name: "sqs",
    required: false,
    scenesType: "1",
    type: "upload",
  }
]

export const layoutComponents = [
  // {
  //   type: 'grid',
  //   icon: 'icon-RectangleCopy',
  //   columns: [
  //     {
  //       type: 'col',
  //       options: {
  //         span: 24,
  //         offset: 0,
  //         push: 0,
  //         pull: 0,
  //         xs: 24,
  //         sm: 24,
  //         md: 24,
  //         lg: 24,
  //         xl: 24,
  //         customClass: ''
  //       },
  //       list: []
  //     },
  //   ],
  //   options: {
  //     gutter: 0,
  //     justify: 'start',
  //     align: 'top',
  //     customClass: '',
  //     hidden: false,
  //     flex: true,
  //     responsive: true
  //   }
  // },
  // {
  //   type: 'report',
  //   icon: 'icon-table1',
  //   options: {
  //     customClass: '',
  //     hidden: false,
  //     borderWidth: 1,
  //     borderColor: '#999',
  //     width: '100%'
  //   },
  //   rows: [
  //     {
  //       columns: [
  //         {
  //           type: 'td',
  //           options: {
  //             customClass: '',
  //             colspan: 1,
  //             rowspan: 1,
  //             align: 'left',
  //             valign: 'top',
  //             width: '',
  //             height: ''
  //           },
  //           list: []
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   type: 'tabs',
  //   icon: 'icon-tabs',
  //   tabs: [
  //     {
  //       label: 'Tab 1',
  //       name: 'tab_1',
  //       list: []
  //     }
  //   ],
  //   options: {
  //     type: '',
  //     tabPosition: 'top',
  //     customClass: '',
  //     hidden: false,
  //   }
  // },
  // {
  //   type: 'inline',
  //   icon: 'icon-inlineview',
  //   options: {
  //     customClass: '',
  //     hidden: false
  //   },
  //   list: []
  // },
  // {
  //   type: 'divider',
  //   icon: 'icon-fengexian',
  //   options: {
  //     hidden: false,
  //     contentPosition: 'left'
  //   }
  // }
]
