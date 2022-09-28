<template>
  <el-container class="fm2-container fm-form" :class="'fm-'+formKey">
    <el-main class="fm2-main">
      <el-container>
        <el-aside width="250px">
          <div class="components-list">
            <template v-if="basicFields.length">
              <div class="widget-cate">基础字段</div>
              <draggable tag="ul" :list="basicComponents"
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove">
                <li @click="handleField(item)" class="form-edit-widget-label" :class="{'no-put': item.type == 'divider'}" v-for="(item, index) in basicComponents" :key="index">
                  <a>
                    <i class="icon iconfont" :class="`icon-${item.type}`"></i>
                    <span>{{item.elementType}}</span>
                  </a>
                </li>
              </draggable>
            </template>

            <template v-if="advanceFields.length">
              <div class="widget-cate">高级字段</div>
              <draggable tag="ul" :list="advanceComponents"
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove">
                <li @click="handleField(item)" class="form-edit-widget-label" :class="{'no-put': item.type == 'table'}" v-for="(item, index) in advanceComponents" :key="index">
                  <a>
                    <i class="icon iconfont" :class="`icon-${item.type}`"></i>
                    <span>{{item.elementType}}</span>
                  </a>
                </li>
              </draggable>
            </template>

<!--            <template v-if="layoutFields.length">-->
<!--              <div class="widget-cate">布局字段</div>-->
<!--              <draggable tag="ul" :list="layoutComponents"-->
<!--                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"-->
<!--                @end="handleMoveEnd"-->
<!--                @start="handleMoveStart"-->
<!--                :move="handleMove">-->
<!--                <li @click="handleField(item)" v-if="layoutFields.indexOf(item.type) >=0" class="form-edit-widget-label no-put" v-for="(item, index) in layoutComponents" :key="index">-->
<!--                  <a>-->
<!--                    <i class="icon iconfont" :class="item.icon"></i>-->
<!--                    <span>{{item.name}}</span>-->
<!--                  </a>-->
<!--                </li>-->
<!--              </draggable>-->
<!--            </template>-->

<!--            <template v-if="customFields.length">-->
<!--              <div class="widget-cate">自定义字段</div>-->
<!--              <draggable tag="ul" :list="customComponents"-->
<!--                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"-->
<!--                @end="handleMoveEnd"-->
<!--                @start="handleMoveStart"-->
<!--                :move="handleMove">-->
<!--                <li @click="handleField(item)" class="form-edit-widget-label" v-for="(item, index) in customComponents" :key="index">-->
<!--                  <a>-->
<!--                    <i class="icon iconfont" :class="item.icon"></i>-->
<!--                    <span>{{item.name}}</span>-->
<!--                  </a>-->
<!--                </li>-->
<!--              </draggable>-->
<!--            </template>-->
          </div>
        </el-aside>
        <el-container class="center-container" direction="vertical">
          <el-header class="btn-bar" style="height: 45px;">
            <div class="btn-bar-plat">
              <a :class="{'active': platform == 'pc'}" @click="handlePlatform('pc')"><i class="iconfont icon-pc"></i></a>
              <a :class="{'active': platform == 'pad'}" @click="handlePlatform('pad')"><i class="iconfont icon-pad"></i></a>
              <a :class="{'active': platform == 'mobile'}" @click="handlePlatform('mobile')"><i class="iconfont icon-mobile"></i></a>
            </div>
            <div class="btn-diviler"></div>
            <div class="btn-bar-action">
              <el-tooltip content="撤销" placement="bottom">
                <a @click="handleUndo" :class="{'disabled': !undo}"><i class="iconfont icon-chexiao"></i></a>
              </el-tooltip>
              <el-tooltip content="重做" placement="bottom">
                <a @click="handleRedo" :class="{'disabled': !redo}"><i class="iconfont icon-chongzuo"></i></a>
              </el-tooltip>
            </div>
            <slot name="action"></slot>
<!--            <el-button v-if="upload" type="text" size="medium" icon="el-icon-upload2" @click="handleUpload">导入JSON</el-button>-->
            <el-button v-if="clearable" type="text" size="medium" icon="el-icon-delete" @click="handleClear">清空</el-button>
            <el-button v-if="preview" type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
            <el-button v-if="generateJson" type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">生成JSON</el-button>
<!--            <el-button v-if="generateCode" type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">生成代码</el-button>-->
          </el-header>
          <el-main :class="{'widget-empty': widgetForm.list.length == 0}">
            <widget-form v-if="!resetJson"  ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect" :platform="platform" :form-key="formKey"></widget-form>
          </el-main>
        </el-container>

        <el-aside class="widget-config-container">
          <el-container>
            <el-header height="45px">
              <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">字段属性</div>
              <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">表单属性</div>
            </el-header>
            <el-main class="config-content">
              <widget-config v-show="configTab=='widget'" ref="widgetConfig"
                :platform="platform"
                :sheets="styleSheetsArray"
                :datasources="dataSourceArray"
                :eventscripts="eventScriptArray"
                :data="widgetFormSelect"
                :backfillData="backfillData"
                :staticFileUrl="staticFileUrl"
                :key="widgetFormSelect ? widgetFormSelect.key : 0"
                @on-event-add="handleEventAdd"
                @on-event-edit="handleEventEdit"
              ></widget-config>
              <form-config v-show="configTab=='form'" ref="formConfig"
                :sheets="styleSheetsArray"
                :data="widgetForm.config"
                @on-style-update="onStyleUpdate"
                @on-datasource-update="onDataSourceUpdate"
                @on-eventscript-update="onEventScriptUpdate"
                @on-eventscript-confirm="onEventScriptConfirm"
              ></form-config>
            </el-main>
          </el-container>

        </el-aside>

        <preview-dialog ref="previewDialog" @get-data-success="preivewGetData"></preview-dialog>

        <json-drawer
            size="60%"
            :visible.sync="jsonVisible"
            :json-str="JSON.stringify(jsonTemplate)"
            @refresh="refreshJson"/>
      </el-container>
    </el-main>
  </el-container>

</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import WidgetForm from './WidgetForm'
import JsonDrawer from './JsonDrawer'
import Clipboard from 'clipboard'
import {basicComponents, layoutComponents, advanceComponents} from './componentsConfig.js'
import {updateStyleSheets, splitStyleSheets, splitSheetName} from '../util/index.js'
import { EventBus } from '../util/event-bus.js'
import historyManager from '../util/history-manager.js'
import { UpgradeData } from '../util/version-upgrade'


// import _ from 'lodash'
// import Vue from 'vue'
// import customComponent from '../demo/CustomComponent'
import PreviewDialog from './PreviewDialog.vue'

export default {
  name: 'fm-making-form',
  components: {
    Draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    // CodeEditor,
    JsonDrawer,
    PreviewDialog
  },
  props: {
    preview: {
      type: Boolean,
      default: true
    },
    generateCode: {
      type: Boolean,
      default: false
    },
    generateJson: {
      type: Boolean,
      default: true
    },
    upload: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    basicFields: {
      type: Array,
      default: () => ['']
    },
    advanceFields: {
      type: Array,
      default: () => ['']
    },
    layoutFields: {
      type: Array,
      default: () => []
    },
    customFields: {
      type: Array,
      default: () => []
    },
    fieldConfig: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      basicComponents,
      layoutComponents,
      advanceComponents,
      customComponents: [],
      resetJson: false,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          formName: '',
          labelPosition: 'right',
          size: 'small',
          customClass: '',
          ui: 'element',
          layout: 'horizontal',
          labelCol: 3,
          width: '100%',
          hideLabel: false,
          hideErrorMessage: false
        },
      },
      jsons1: {
        "config":{
          "customClass":"",
          "hideErrorMessage":false,
          "hideLabel":false,
          "labelCol":3,
          "labelPosition":"right",
          "labelWidth":100,
          "layout":"horizontal",
          "size":"small",
          "ui":"element",
          "width":"100%"
        },
        "list":[
          {
            "fromDocContent":1, // {0: 自定义, 1: 内容域 }
            "key":"nameCode", // 编码
            "name":"姓名修改", // 名称
            "options":{
              "dataSource":"doc-table",
              "description":"姓名描述", // 描述
              "formatRule":"不为空", //
              "formatType":"txt", //
              "required":1, // 必填
              "sourceField":"name"
            },
            "type":"input" // 格式
          },
          {
            "fromDocContent":1,
            "key":"sfzhCode",
            "name":"身份证号修改",
            "options":{
              "dataSource":"doc-user",
              "description":"身份证号描述",
              "formatRule":"首位数字",
              "formatType":"txt",
              "required":1,
              "sourceField":"sfzh"
            },
            "type":"input"
          }
          ]
      },
      configTab: 'form',
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      uploadVisible: false,
      blank: '',
      htmlTemplate: '',
      jsonTemplate: '',
      vueTemplate: '',
      uploadEditor: null,
      jsonCopyValue: '',
      jsonClipboard: null,
      jsonEg: `{
        "list": [],
        "config": {
          "labelWidth": 100,
          "labelPosition": "right",
          "size": "small",
          "customClass": "",
          "ui": "element",
          "layout": "horizontal",
          "labelCol": 3,
          "width": "100%",
          "hideLabel": false,
          "hideErrorMessage": false
        }
      }`,
      codeCopyValue: '',
      codeClipboard: null,
      codeActiveName: 'vue',
      undo: false,
      redo: false,
      formKey: Math.random().toString(36).slice(-8),
      styleSheetsArray: [],
      dataSourceArray: [],
      eventScriptArray: [],
      platform: 'pc',
    }
  },
  created () {
    this._loadComponents()
  },
  mounted () {
    const _this = this

    historyManager.clear().then(() => {
      // 添加表单默认事件
      this.widgetForm.config.eventScript = [
        {key: 'mounted', name: 'mounted', func: ''}
      ]

      // // 加载全局配置项
      // this.widgetForm.config = {
      //   ...this.widgetForm.config,
      //   ...this.globalConfig
      // }

      this.platform = this.widgetForm.config.platform || 'pc'

      this.initConfig()

      this.$emit('ready')

      EventBus.$on('on-history-add-' + this.formKey, () => {
        historyManager.add(this.widgetForm, (this.widgetFormSelect && this.widgetFormSelect.key) ? this.widgetFormSelect.key : '').then(() => {
          _this.undo = true
          _this.redo = false
        })
      })

      // 处理鼠标右键事件
      this.$refs.widgetForm.$el.addEventListener('contextmenu', (e) => {
        e.preventDefault()
      })
    })
  },
  beforeDestroy () {
    EventBus.$off('on-history-add-' + this.formKey)
  },
  methods: {
    initConfig () {
      this.platform = this.widgetForm.config.platform || 'pc'

      if (this.widgetForm.config.styleSheets) {
        this.onStyleUpdate(splitStyleSheets(this.widgetForm.config.styleSheets))
      }

      if (this.widgetForm.config.dataSource) {
        this.onDataSourceUpdate(this.widgetForm.config.dataSource)
      }

      if (this.widgetForm.config.eventScript) {
        this.onEventScriptUpdate(this.widgetForm.config.eventScript)
      }
    },
    handleGoGithub () {
      window.location.href = 'https://github.com/GavinZhuLei/vue-form-making'
    },
    handleConfigSelect (value) {
      this.configTab = value
    },
    handleMoveEnd (evt) {
      console.log('end', evt)
    },
    handleMoveStart ({oldIndex}) {
      console.log('start', oldIndex, this.basicComponents)
    },
    handleMove () {
      return true
    },
    handlePreview () {
      console.log(this.widgetForm)

      this.$refs.previewDialog.preview(_.cloneDeep(this.widgetForm), this.platform)
    },
    preivewGetData (data) {
      this.jsonVisible = true
      this.jsonTemplate = data
      this.$nextTick(() => {

        if (!this.jsonClipboard) {
          this.jsonClipboard = new Clipboard('.json-btn')
          this.jsonClipboard.on('success', (e) => {
            this.$message.success('复制成功')
          })
        }
        this.jsonCopyValue = JSON.stringify(data)
      })
    },
    handleGenerateJson () {
      this.jsonVisible = true
      this.jsonTemplate = this.widgetForm
      this.$nextTick(() => {

        if (!this.jsonClipboard) {
          this.jsonClipboard = new Clipboard('.json-btn')
          this.jsonClipboard.on('success', (e) => {
            this.$message.success('复制成功')
          })
        }
        this.jsonCopyValue = JSON.stringify(this.widgetForm)
      })
    },
    handleGenerateCode () {
      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm), 'html', this.widgetForm.config.ui)
      this.vueTemplate = generateCode(JSON.stringify(this.widgetForm), 'vue', this.widgetForm.config.ui)
      this.$nextTick(() => {

        if (!this.codeClipboard) {
          this.codeClipboard = new Clipboard('.code-btn')
          this.codeClipboard.on('success', (e) => {
            this.$message.success('复制成功')
          })
        }
        this.codeCopyValue = this.codeActiveName == 'vue' ? this.vueTemplate : this.htmlTemplate
      })
    },
    handleUpload () {
      this.uploadVisible = true
    },
    handleUploadJson () {
      try {
        this.setJSON(this.jsonEg)
        this.uploadVisible = false
      } catch (e) {
        this.$message.error(e.message)
        this.$refs.uploadJson.end()
      }
    },
    handleClear () {
      // console.log(this.widgetForm)
      // this.widgetForm = {
      //   ...this.widgetForm,
      //   list: [],
      // }
      //
      const len = this.widgetForm.list.length - 1
      for (let i = len; i >= 0; i--) {
        const isCont = this.widgetForm.list[i].fromDocContent !== 1
        isCont && this.widgetForm.list.splice(i, 1)
      }
      this.widgetFormSelect = {}

      this.$nextTick(() => {
        EventBus.$emit('on-history-add-' + this.formKey)
      })
    },
    clear () {
      this.handleClear()
    },
    getJSON () {
      return this.widgetForm
    },
    getHtml () {
      return generateCode(JSON.stringify(this.widgetForm))
    },
    setJSON (json) {
      if (typeof json === 'string') {
        json = JSON.parse(json)
      }
      this.widgetForm = {
        ...json,
        list: json.list.map(item => UpgradeData(item))
      }
      if (json.list.length> 0) {
        this.widgetFormSelect = json.list[0]
      } else {
        this.widgetFormSelect = {}
      }

      // this.initConfig()
      //
      // this.$nextTick(() => {         EventBus.$emit('on-history-add-' + this.formKey)       })
    },
    handleInput (val) {
      console.log(val)
      this.blank = val
    },
    handleField (item) {
      console.log(item)
      EventBus.$emit('on-field-add-' + this.formKey, item)
    },
    handleUndo () {
      if (this.undo) {
        historyManager.updateLatest(this.widgetForm, (this.widgetFormSelect && this.widgetFormSelect.key) ? this.widgetFormSelect.key : '').then(() => {
          historyManager.undo().then((data) => {
            this.widgetForm = {...data.data}
            this.widgetFormSelect = this._findWidgetItem(this.widgetForm.list, data.key)
            this.undo = data.undo
            this.redo = data.redo
          })
        })
      }
    },
    handleRedo () {
      if (this.redo) {
        historyManager.redo().then((data) => {
          this.widgetForm = {...data.data}
          this.widgetFormSelect = this._findWidgetItem(this.widgetForm.list, data.key)

          this.undo = data.undo
          this.redo = data.redo
        })
      }
    },
    _findWidgetItem (list, key, type = 'key') {
      const index = list.findIndex(item => item[type] == key)

      if (index >= 0) {
        return list[index]
      } else {
        for (let m = 0; m < list.length; m++) {
          const item = list[m]

          if (item.type === 'grid') {

            for (let i = 0; i < item.columns.length; i++) {
              return this._findWidgetItem(item.columns[i].list, key, type)
            }
          }
          if (item.type === 'table') {
            return this._findWidgetItem(item.tableColumns, key, type)
          }
          if (item.type === 'tabs') {

            for (let i = 0; i < item.tabs.length; i++) {
              return this._findWidgetItem(item.tabs[i].list, key, type)
            }
          }
          if (item.type === 'report') {
            for (let r = 0; r < item.rows.length; r++) {
              for (let c = 0; c < item.rows[r].columns.length; c++) {
                return this._findWidgetItem(item.rows[r].columns[c].list, key, type)
              }
            }
          }
          if (item.type === 'inline') {
            return this._findWidgetItem(item.list, key, type)
          }

        }

        return {}
      }
    },
    _loadComponents () {
      this.basicComponents = this.basicComponents.map(item => {
        return {
          ...item,
          name: item.type,
          options: (() => {
            let newField = this.fieldConfig.find(o => o.type == item.type)

            if (newField) {
              return {...item.options, ...newField.options}
            } else {
              return {...item.options}
            }
          })()
        }
      })
      this.advanceComponents = this.advanceComponents.map(item => {
        return {
          ...item,
          name: item.type,
          options: (() => {
            let newField = this.fieldConfig.find(o => o.type == item.type)

            if (newField) {
              return {...item.options, ...newField.options}
            } else {
              return {...item.options}
            }
          })()
        }
      })
      // this.layoutComponents = this.layoutComponents.map(item => {
      //   return {
      //     ...item,
      //     name: item.type,
      //     options: (() => {
      //       let newField = this.fieldConfig.find(o => o.type == item.type)
      //
      //       if (newField) {
      //         return {...item.options, ...newField.options}
      //       } else {
      //         return {...item.options}
      //       }
      //     })()
      //   }
      // })
      // this.customComponents = this.customFields.map(item => {
      //   return {
      //     ...item,
      //     type: 'custom',
      //     icon: 'icon-extend',
      //     options: (() => {
      //       let newField = this.fieldConfig.find(o => o.type == item.type)
      //
      //       if (newField) {
      //         return {...item.options, ...newField.options}
      //       } else {
      //         return {...item.options}
      //       }
      //     })()
      //   }
      // })
    },
    onStyleUpdate (sheets) {
      let head = '.fm-' + this.formKey + ' '

      updateStyleSheets(sheets, head)

      this.styleSheetsArray = splitSheetName(sheets)
    },
    onDataSourceUpdate (dataSource) {
      this.dataSourceArray = dataSource.map(item => ({
        value: item.key,
        label: item.name
      }))
    },
    onEventScriptUpdate (eventScript) {
      this.eventScriptArray = eventScript.map(item => ({
        value: item.key,
        label: item.name
      }))
    },
    onEventScriptConfirm (eventObj) {
      this.$refs.widgetConfig.setEvent(eventObj)
    },
    handlePlatform (platform) {
      this.widgetForm.config.platform = this.platform = platform
    },
    handleExport () {

      const fileName = (new Date().getTime()) + '.' + this.codeActiveName

      const fileData = this.codeActiveName == 'vue' ? this.vueTemplate : this.htmlTemplate

      this._exportFile(fileData, fileName)
    },
    handleExportJSON () {
      this._exportFile(JSON.stringify(this.jsonTemplate), (new Date().getTime()) + '.json')
    },
    handleEventAdd (name) {
      this.$refs.formConfig.editScript(name)
    },
    handleEventEdit ({eventName, functionKey}) {
      this.$refs.formConfig.editScript(eventName, functionKey)
    },
    _exportFile (data, fileName) {
      let blob = new Blob([data], {
        type: 'application/octet-stream'
      })

      if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, fileName);
      }else{
        // Create download link element
        let downloadLink = document.createElement("a");
        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(blob);
        // Setting the file name
        downloadLink.download = fileName;

        downloadLink.style.display = 'none'

        document.body.appendChild(downloadLink);

        //triggering the function
        downloadLink.click();

        document.body.removeChild(downloadLink);
      }
    },
    refreshJson () {}
  },
  watch: {
    codeActiveName () {
      this.codeCopyValue = this.codeActiveName == 'vue' ? this.vueTemplate : this.htmlTemplate
    }
  }
}
</script>

<style lang="scss">
.widget-empty{
  background-position: 50%;
}

.custom1 .el-col{
  border: 1px solid #ccc;
  overflow: hidden;
  padding: 5px;
  // margin-right:-1px;
  // margin-bottom:-1px;
  margin-right: -1px;
  margin-bottom: -1px;
}
.custom .el-col{
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
</style>
