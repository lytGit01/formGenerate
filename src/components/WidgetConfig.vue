<template>
  <div v-if="show">
    <el-form label-position="top" size="small">
      <el-form-item label="字段标识">
        <el-input clearable v-model="data.model" disabled></el-input>
      </el-form-item>
      <el-form-item label="标题" v-if="data.type!='grid'" :required="true">
        <el-input clearable v-model="data.label" :disabled="isContentDomain"></el-input>
      </el-form-item>
<!--      <el-form-item label="按钮名称" v-if="Object.keys(data.options).indexOf('buttonName')>=0">-->
<!--        <el-input clearable v-model="data.options.buttonName"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="链接名称" v-if="Object.keys(data.options).indexOf('linkName')>=0">-->
<!--        <el-input clearable v-model="data.options.linkName"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="表单标签宽度" v-if="Object.keys(data.options).indexOf('labelWidth')>=0">-->
<!--        <el-input clearable v-model="data.options.width"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="高度" v-if="Object.keys(data.options).indexOf('height')>=0">-->
<!--        <el-input clearable v-model="data.options.height"></el-input>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="大小" v-if="Object.keys(data.options).indexOf('size')>=0">-->
<!--        宽度 <el-input clearable style="width: 90px;" type="number" v-model.number="data.options.size.width"></el-input>-->
<!--        高度 <el-input clearable style="width: 90px;" type="number" v-model.number="data.options.size.height"></el-input>-->
<!--      </el-form-item>-->

      <!--标签宽度-->
<!--      <el-form-item label="表单标签宽度" v-if="Object.keys(data.options).indexOf('labelWidth')>=0 ">-->
<!--        <el-checkbox v-model="data.options.isLabelWidth" style="margin-right: 5px;">自定义</el-checkbox>-->
<!--        <el-input-number v-model="data.options.labelWidth" :disabled="!data.options.isLabelWidth" :min="0" :max="99999" :step="10"></el-input-number>-->
<!--      </el-form-item>-->

      <!--hideLabel-->
<!--      <el-form-item label="隐藏标签" v-if="isShowHideLabel">-->
<!--        <el-switch v-model="data.options.hideLabel"></el-switch>-->
<!--      </el-form-item>-->

      <el-form-item label="占位内容" v-if="Object.keys(data).indexOf('placeholder')>=0 && data.type != 'title'">
        <el-input v-model="data.placeholder" clearable></el-input>
      </el-form-item>
      <template v-if="data.dataType === 'textarea'">
        <el-form-item label="最小行数">
          <el-input-number v-model="data.autosize.minRows" :min="1" placeholder="最小行数" />
        </el-form-item>
        <el-form-item label="最大行数">
          <el-input-number v-model="data.autosize.maxRows" :min="1" placeholder="最大行数" />
        </el-form-item>
      </template>
<!--      <el-form-item label="布局方式" v-if="Object.keys(data.options).indexOf('inline')>=0">-->
<!--        <el-radio-group v-model="data.options.inline">-->
<!--          <el-radio-button :label="false">块级</el-radio-button>-->
<!--          <el-radio-button :label="true">行内</el-radio-button>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="文案位置" v-if="Object.keys(data.options).indexOf('contentPosition') >= 0">-->
<!--        <el-radio-group v-model="data.options.contentPosition">-->
<!--          <el-radio-button label="left">左侧</el-radio-button>-->
<!--          <el-radio-button label="center">居中</el-radio-button>-->
<!--          <el-radio-button label="right">右侧</el-radio-button>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="显示输入框" v-if="Object.keys(data.options).indexOf('showInput')>=0">-->
<!--        <el-switch v-model="data.options.showInput" ></el-switch>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="最小值" v-if="Object.keys(data.options).indexOf('min')>=0 && !isContentDomain">-->
<!--        <el-input-number v-model="data.options.min"  :step="1"></el-input-number>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="最大值" v-if="Object.keys(data.options).indexOf('max')>=0 && !isContentDomain">-->
<!--        <el-input-number v-model="data.options.max"  :step="1"></el-input-number>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="步长" v-if="Object.keys(data.options).indexOf('step')>=0 && !isContentDomain">-->
<!--        <el-input-number v-model="data.options.step" :min="-99999" :max="99999" :step="1"></el-input-number>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="precision" v-if="Object.keys(data.options).indexOf('precision')>=0 && !isContentDomain">-->
<!--        <el-input-number v-model="data.options.precision" :min="0" :max="99999" :step="1"></el-input-number>-->
<!--      </el-form-item>-->

<!--     <el-form-item label="是否使用控制按钮" v-if="Object.keys(data.options).indexOf('controls')>=0">-->
<!--        <el-switch v-model="data.options.controls" ></el-switch>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="控制按钮位置" v-if="Object.keys(data.options).indexOf('controlsPosition') >= 0 && data.options.controls">-->
<!--        <el-radio-group v-model="data.options.controlsPosition">-->
<!--          <el-radio-button label="">默认</el-radio-button>-->
<!--          <el-radio-button label="right">右侧</el-radio-button>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->

      <el-form-item label="是否多选" v-if="data.type=='select' || data.type=='imgupload' || data.type == 'fileupload' || data.type == 'cascader'">
        <el-switch v-model="data.options.multiple" @change="handleSelectMuliple"></el-switch>
      </el-form-item>
      <el-form-item label="格式" v-if="data.type=='imgupload' || data.type == 'fileupload'">
        <el-select
            v-model="data.options.fileFormat"
            multiple
            filterable
            disabled
            allow-create
            default-first-option>
          <el-option
              v-for="item in listFormat"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否可搜索" v-if="data.type=='select' || data.type == 'cascader'">
        <el-switch v-model="data.options.filterable"></el-switch>
      </el-form-item>
      <el-form-item label="可选任意节点" v-if="Object.keys(data.options).indexOf('checkStrictly')>=0">
        <el-switch v-model="data.options.checkStrictly"></el-switch>
      </el-form-item>
      <el-form-item label="允许半选" v-if="Object.keys(data.options).indexOf('allowHalf')>=0">
        <el-switch v-model="data.options.allowHalf"></el-switch>
      </el-form-item>
      <el-form-item label="支持透明度选择" v-if="Object.keys(data.options).indexOf('showAlpha')>=0">
        <el-switch v-model="data.options.showAlpha"></el-switch>
      </el-form-item>
      <el-form-item label="选项" v-if="Object.keys(data.options).indexOf('codes')>=0">
        <el-radio-group v-model="data.options.remote" size="mini" style="margin-bottom:10px;">
          <el-radio-button label="false">静态数据</el-radio-button>
<!--          <el-radio-button :label="true">{{$t('fm.config.widget.remoteData')}}</el-radio-button>-->
        </el-radio-group>
        <template v-if="data.options.remote">
          <div>
            <el-radio-group v-model="data.options.remoteType">
              <el-radio label="datasource">数据源</el-radio>
              <el-radio label="option">赋值变量</el-radio>
              <el-radio label="func">方法函数</el-radio>
            </el-radio-group>
            <el-input clearable size="mini" v-if="data.options.remoteType == 'option'" v-model="data.options.remoteOption" style="margin-bottom: 5px;">
            </el-input>
            <el-input clearable size="mini" v-if="data.options.remoteType == 'func'" v-model="data.options.remoteFunc" style="margin-bottom: 5px;">
            </el-input>
            <el-select
              size="mini"
              v-if="data.options.remoteType == 'datasource'"
              style="width: 100%;margin-bottom: 5px;"
              v-model="data.options.remoteDataSource">
              <el-option
                v-for="item in datasources"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input clearable size="mini"  v-model="data.options.props.value">
              <div style="width: 30px;" slot="prepend">值</div>
            </el-input>
            <el-input clearable size="mini" v-model="data.options.props.label">
              <div slot="prepend" style="width: 30px;">标签</div>
            </el-input>
            <el-input clearable size="mini" v-model="data.options.props.children">
              <template slot="prepend">子选项</template>
            </el-input>
          </div>
        </template>
        <template v-else>
<!--          <div v-if="Object.keys(data.options).indexOf('showLabel')>=0">-->
<!--            <el-checkbox size="mini" v-model="data.options.showLabel">是否显示标签</el-checkbox>-->
<!--          </div>-->
          <template v-if="data.type=='radio' || (data.type=='select' && data.options.selectType === 'single')">
            <el-radio-group v-model="data.options.defaultValue">
              <draggable tag="ul" :list="data.options.options"
                v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.codes" :key="index" >
                  78978
                  <el-radio
                    :label="item.code"
                    style="margin-right: 5px;"
                  >
                    <el-input clearable :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" v-model="item.name"></el-input>
                    <el-input clearable style="width:90px;" size="mini" v-if="data.options.showLabel" v-model="item.label"></el-input>
                    <!-- <input v-model="item.value"/> -->
                  </el-radio>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars"></i></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>

            </el-radio-group>
          </template>
          <template v-if="data.type=='checkbox' || (data.type=='select' && data.options.selectType === 'multiple')">
            <el-checkbox-group v-model="data.options.defaultValue">
              <draggable tag="ul" :list="data.options.options"
                v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.codes" :key="index" >
                  <el-checkbox
                    :label="item.code"
                    style="margin-right: 5px;">
                    <el-input clearable :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" v-model="item.name"></el-input>
                    <el-input clearable style="width:90px;" size="mini" v-if="data.options.showLabel" v-model="item.code"></el-input>
                  </el-checkbox>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars"></i></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>
            </el-checkbox-group>
          </template>
          <div style="margin-left: 22px;" v-if="data.type != 'cascader'">
            <el-button type="text" @click="handleAddOption">添加选项</el-button>
            <el-button type="text" @click="handleClearSelect">重置选择</el-button>
          </div>
          <template v-if="data.type == 'cascader'">
            <!-- <code-editor :key="data.key" mode="javascript" v-model="data.options.options" height="200px"></code-editor> -->
            <el-button style="width: 100%;" @click="handleSetCascader">设置</el-button>
          </template>
        </template>
      </el-form-item>

      <template v-if="data.type == 'date_picker'">
        <el-form-item label="显示类型">
          <el-select v-model="data.dataType" @change="changeType(data.dataType)">
            <el-option value="year"></el-option>
            <el-option value="month"></el-option>
            <el-option value="date"></el-option>
            <el-option value="dates"></el-option>
            <!-- <el-option value="week"></el-option> -->
            <el-option value="datetime"></el-option>
            <!-- <el-option value="datetimerange"></el-option> -->
            <!-- <el-option value="daterange"></el-option> -->
          </el-select>
        </el-form-item>
<!--        <el-form-item label="是否为范围选择" v-if="data.type == 'time'">-->
<!--          <el-switch-->
<!--            v-model="data.options.isRange"-->
<!--          >-->
<!--          </el-switch>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="占位内容" v-if="(!data.options.isRange && data.type == 'time') || (data.type != 'time' && data.options.type != 'datetimerange' && data.options.type != 'daterange')">-->
<!--          <el-input clearable v-model="data.options.placeholder"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="开始时间占位内容" v-if="(data.options.isRange) || data.options.type=='datetimerange' || data.options.type=='daterange'">-->
<!--          <el-input clearable v-model="data.options.startPlaceholder"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="结束时间占位内容" v-if="data.options.isRange || data.options.type=='datetimerange' || data.options.type=='daterange'">-->
<!--          <el-input clearable v-model="data.options.endPlaceholder"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="格式">
<!--          <el-input clearable v-model="data.options.format" disabled></el-input>-->
          <el-select v-model="data.options.format">
            <el-option
                v-for="item in dateType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="默认值" v-if="data.type=='time' && Object.keys(data.options).indexOf('isRange')>=0">-->
<!--          <el-time-picker-->
<!--            key="1"-->
<!--            style="width: 100%;"-->
<!--            v-if="!data.options.isRange"-->
<!--            v-model="data.options.defaultValue"-->
<!--            :arrowControl="data.options.arrowControl"-->
<!--            :value-format="data.options.format"-->
<!--          >-->
<!--          </el-time-picker>-->
<!--          <el-time-picker-->
<!--            key="2"-->
<!--            v-if="data.options.isRange"-->
<!--            style="width: 100%;"-->
<!--            v-model="data.options.defaultValue"-->
<!--            is-range-->
<!--            :arrowControl="data.options.arrowControl"-->
<!--            :value-format="data.options.format"-->
<!--          >-->
<!--          </el-time-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="默认值" v-if="data.type=='date'">-->
<!--          <el-date-picker-->
<!--            key="1"-->
<!--            v-model="data.options.defaultValue"-->
<!--            :type="data.options.type"-->
<!--            :clearable="true"-->
<!--            :value-format="data.options.timestamp ? 'timestamp' : data.options.format"-->
<!--            :format="data.options.format"-->
<!--            style="width: 100%"-->
<!--            v-if="data.options.type == 'datetimerange' || data.options.type == 'daterange'"-->
<!--          >-->
<!--          </el-date-picker>-->
<!--          <el-date-picker-->
<!--            key="2"-->
<!--            v-model="data.options.defaultValue"-->
<!--            :type="data.options.type"-->
<!--            :clearable="true"-->
<!--            :value-format="data.options.timestamp ? 'timestamp' : data.options.format"-->
<!--            :format="data.options.format"-->
<!--            style="width: 100%"-->
<!--            v-else-->
<!--          >-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
      </template>

      <template v-if="data.type=='imgupload' || data.type=='fileupload'">
        <el-form-item label="最大上传数">
          <el-input clearable type="number" v-model.number="data.options.limit"></el-input>
        </el-form-item>
<!--        <el-form-item :label="$t('fm.config.widget.tip')" v-if="Object.keys(data.options).indexOf('tip')>=0">-->
<!--          <el-input clearable v-model="data.options.tip"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item :label="$t('fm.config.widget.isQiniu')">-->
<!--          <el-switch v-model="data.options.isQiniu"></el-switch>-->
<!--        </el-form-item>-->
<!--        <template v-if="data.options.isQiniu">-->
<!--          <el-form-item label="Domain" :required="true">-->
<!--          <el-input clearable v-model="data.options.domain"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item :label="$t('fm.config.widget.tokenFunc')" :required="true">-->
<!--            &lt;!&ndash; <el-input clearable v-model="data.options.tokenFunc"></el-input> &ndash;&gt;-->
<!--            <el-radio-group v-model="data.options.tokenType">-->
<!--              <el-radio label="datasource">{{$t('fm.datasource.name')}}</el-radio>-->
<!--              <el-radio label="func">{{$t('fm.config.widget.remoteFunc')}}</el-radio>-->
<!--            </el-radio-group>-->
<!--            <el-input clearable v-if="data.options.tokenType == 'func'" v-model="data.options.tokenFunc">-->
<!--            </el-input>-->
<!--            <el-select-->
<!--              v-if="data.options.tokenType == 'datasource'"-->
<!--              style="width: 100%;"-->
<!--              v-model="data.options.tokenDataSource">-->
<!--              <el-option-->
<!--                v-for="item in datasources"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </template>-->
<!--        <template v-else>-->
<!--          <el-form-item :label="$t('fm.config.widget.action')" :required="true">-->
<!--            <el-input disabled v-model="data.options.action"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item :label="$t('fm.config.widget.headers')">-->
<!--            <ul>-->
<!--              <li v-for="(item, index) in data.options.headers" :key="index" style="margin-bottom: 5px;">-->
<!--                <el-input type="textarea" clearable :rows="1" placeholder="KEY" size="mini" style="width: 100px;margin-right:5px;" v-model="item.key"></el-input>-->

<!--                <el-input type="textarea" clearable :rows="1" placeholder="VALUE" size="mini" style="width: 130px;" v-model="item.value"></el-input>-->
<!--                -->
<!--                <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>-->
<!--                -->
<!--              </li>-->
<!--            </ul>-->
<!--          <div>-->
<!--            <el-button type="text" @click="handleAddHeader">{{$t('fm.actions.add')}}</el-button>-->
<!--          </div>-->
<!--          </el-form-item>-->

<!--&lt;!&ndash;          <el-form-item :label="$t('fm.config.widget.withCredentials')">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-switch v-model="data.options.withCredentials"></el-switch>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--        </template>-->
      </template>

      <template v-if="data.type == 'grid'">
        <el-form-item label="栅格间隔">
          <el-input clearable type="number" v-model.number="data.options.gutter"></el-input>
        </el-form-item>
        <el-form-item label="Flex布局">
          <el-switch v-model="data.options.flex"></el-switch>
        </el-form-item>
        <!-- responsive -->
        <!-- <el-form-item :label="$t('fm.config.widget.responsive')">
          <el-switch v-model="data.options.responsive"></el-switch>
        </el-form-item> -->
        <el-form-item label="水平排列方式" v-if="data.options.flex">
          <el-select v-model="data.options.justify">
            <el-option value="start" label="左对齐"></el-option>
            <el-option value="end" label="右对齐"></el-option>
            <el-option value="center" label="居中"></el-option>
            <el-option value="space-around" label="两侧间隔相等"></el-option>
            <el-option value="space-between" label="两端对齐"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="垂直排列方式" v-if="data.options.flex">
          <el-select v-model="data.options.align">
            <el-option value="top" label="顶部对齐"></el-option>
            <el-option value="middle" label="居中"></el-option>
            <el-option value="bottom" label="底部对齐"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="data.type == 'col'">
        <el-form-item label="栅格占据的列数">
          <el-input-number v-model="data.options.md"  :step="1" :min="1" :max="24" v-if="platform == 'pc'"></el-input-number>
          <el-input-number v-model="data.options.sm"  :step="1" :min="1" :max="24" v-if="platform == 'pad'"></el-input-number>
          <el-input-number v-model="data.options.xs"  :step="1" :min="1" :max="24" v-if="platform == 'mobile'"></el-input-number>
        </el-form-item>
        <!-- <el-form-item :label="$t('fm.config.widget.responsiveSpan')">
          <div>
            <span style="width: 25px; display: inline-block;">xs: </span>
            <el-input-number v-model="data.options.xs"  :step="1" :min="1" :max="24" size="mini"></el-input-number>
            <pre style="width: 55px; display: inline; color: #999; margin-left: 5px;" v-html="'<768px'"></pre>
          </div>
          <div>
            <span style="width: 25px; display: inline-block;">sm: </span>
            <el-input-number v-model="data.options.sm"  :step="1" :min="1" :max="24" size="mini"></el-input-number>
            <pre style="width: 55px; display: inline; color: #999; margin-left: 5px;" v-html="'≥768px'"></pre>
          </div>
          <div>
            <span style="width: 25px; display: inline-block;">md: </span>
            <el-input-number v-model="data.options.md"  :step="1" :min="1" :max="24" size="mini"></el-input-number>
            <pre style="width: 55px; display: inline; color: #999; margin-left: 5px;" v-html="'≥992px'"></pre>
          </div>
          <div>
            <span style="width: 25px; display: inline-block;">lg: </span>
            <el-input-number v-model="data.options.lg"  :step="1" :min="1" :max="24" size="mini"></el-input-number>
            <pre style="width: 55px; display: inline; color: #999; margin-left: 5px;" v-html="'≥1200px'"></pre>
          </div>
          <div>
            <span style="width: 25px; display: inline-block;">xl: </span>
            <el-input-number v-model="data.options.xl"  :step="1" :min="1" :max="24" size="mini"></el-input-number>
            <pre style="width: 55px; display: inline; color: #999; margin-left: 5px;" v-html="'≥1920px'"></pre>
          </div>
        </el-form-item> -->
        <el-form-item label="栅格左侧的间隔格数">
          <el-input-number v-model="data.options.offset"  :step="1" :min="0" :max="24"></el-input-number>
        </el-form-item>
        <el-form-item label="栅格向右移动格数">
          <el-input-number v-model="data.options.push"  :step="1" :min="0" :max="24"></el-input-number>
        </el-form-item>
        <el-form-item label="栅格向左移动格数">
          <el-input-number v-model="data.options.pull"  :step="1" :min="0" :max="24"></el-input-number>
        </el-form-item>
      </template>

      <!--校验-->
      <template v-if="data.type != 'grid' && data.type != 'divider' && data.type != 'title'">

        <el-form-item label="校验">
          <div class="validate-block" v-if="Object.keys(data).indexOf('required')>=0">
            <el-checkbox v-model="data.required">必填</el-checkbox>
            <el-input size="mini" class="message-input" clearable  v-model="data.requiredMessage" v-if="data.required"  placeholder="自定义错误提示"></el-input>
          </div>
<!--          <div class="validate-block" v-if="Object.keys(data).indexOf('dataType')>=0">-->
<!--            <el-checkbox v-model="data.options.dataTypeCheck" style="margin-right: 10px;"></el-checkbox>-->
<!--            <el-select :disabled="!data.options.dataTypeCheck" v-if="Object.keys(data.options).indexOf('dataType')>=0" v-model="data.options.dataType" size="mini" >-->
<!--&lt;!&ndash;              <el-option value="string" label="字符串"></el-option>&ndash;&gt;-->
<!--              <el-option value="url" label="URL地址"></el-option>-->
<!--              <el-option value="email" label="邮箱地址"></el-option>-->
<!--&lt;!&ndash;              <el-option value="hex" label="十六进制"></el-option>&ndash;&gt;-->
<!--            </el-select>-->

<!--            <el-input size="mini" class="message-input" clearable  v-model="data.dataTypeMessage" v-if="data.dataTypeCheck"  placeholder="'自定义错误提示"></el-input>-->
<!--          </div>-->

          <div class="validate-block" v-if="Object.keys(data).indexOf('validation')>=0">
            <el-checkbox v-model="data.patternCheck" style="margin-right: 10px;"></el-checkbox>
            <el-input clearable :disabled="!data.patternCheck" size="mini" v-model.lazy="data.validation"  style=" width: 239px;" placeholder="填写正则表达式"></el-input>
<!--            <el-input size="mini" class="message-input" clearable  v-model="data.patternMessage" v-if="data.patternCheck"  placeholder="自定义错误提示"></el-input>-->
          </div>

<!--          <div class="validate-block" v-if="Object.keys(data).indexOf('validator')>=0">-->
<!--            <el-checkbox v-model="data.validatorCheck" style="margin-right: 10px;">自定义校验规则</el-checkbox>-->

<!--            <div v-if="data.validatorCheck">-->
<!--              <div style="font-size: 14px;color: blue;font-weight: 500;">(rule, value, callback) => {</div>-->
<!--              <code-editor mode="javascript" :key="data.key" :staticFileUrl="staticFileUrl" v-model="data.validator" height="150px"></code-editor>-->
<!--              <div style="font-size: 14px;color: blue;font-weight: 500;">}</div>-->
<!--            </div>-->

<!--          </div>-->
        </el-form-item>
      </template>

      <!--动作设置-->
<!--      <template v-if="data.events ">-->
<!--        <el-form-item :label="$t('fm.eventscript.config.title')">-->
<!--          <event-config :events="data.events" :eventscripts="eventscripts" @on-add="handleEventAdd" @on-edit="handleEventEdit"></event-config>-->
<!--        </el-form-item>-->
<!--      </template>-->
    </el-form>

    <code-dialog ref="codeDialog" mode="html" title="自定义模板" help="https://www.yuque.com/ln7ccx/ntgo8q/zr53m4" @on-confirm="handleTemplateConfirm"></code-dialog>

    <code-dialog ref="cascaderDialog" width="800px" code-height="400px" mode="javascript" title="选项"  @on-confirm="handleCascaderConfirm"></code-dialog>
  </div>
  <div v-else class="empty">
<!--    请添加字段-->
    程序猿正在开发中....
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import CodeDialog from './CodeDialog'

export default {
  components: {
    Draggable,
    CodeDialog,
  },
  props: ['data', 'sheets', 'platform', 'datasources', 'eventscripts', 'staticFileUrl'],
  data () {
    return {
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null,
        validator: null
      },
      editorVisible: false,
      tableVisible: false,
      customClassArray: this.data && this.data.options && this.data.options.customClass ? this.data.options.customClass.split(' ').filter(item => item) : [],
      listFormat: [{
        value: 'png',
        label: 'png'
      }, {
        value: 'jpg',
        label: 'jpg'
      }, {
        value: 'jpeg',
        label: 'jpeg'
      }, {
        value: 'pdf',
        label: 'pdf'
      }],
      dateType: [
        {
          value: 'yyyy年MM月dd日',
          label: 'yyyy年MM月dd日'
        },
        {
          value: 'yyyy-MM-dd',
          label: 'yyyy-MM-dd'
        },
        {
          value: 'yyyy/MM/dd',
          label: 'yyyy/MM/dd'
        }
      ]
    }
  },
  computed: {
    show () {
      if (this.data && Object.keys(this.data).length > 0 && this.data.key && this.data.options) {
        return true
      }
      return false
    },
    isContentDomain() { // 是否为文本域
      return  this.data.fromDocContent === 1
    },
    isShowAttribute() {
      const defType = ['imgupload', 'fileupload', 'time', 'date']
      return defType.includes(this.data.type) && !this.isContentDomain
    },
    isShowDataBackfill() {
      const defType = ['input', 'textarea']
      return defType.includes(this.data.type) && !this.isContentDomain
    },
    isShowHideLabel() {
      // const defType = ['time', 'date']
      const data = this.data
      return data.type !='grid' && data.type != 'tabs' && data.type != 'report' && data.type != 'inline' && data.type != 'divider' && data.type != 'td' && data.type != 'col'
    }
  },
  created () {
    this.validateRequired(this.data ? this.data.required : false)
    // this.validateDataType(this.data ? this.data.dataType : '')
    // this.valiatePattern(this.data ? this.data.pattern : '')
    // this.validateCustom(this.data ? this.data.validator: '')
  },
  mounted() {
    // if (this.data && this.data.type == 'time') {
    //   this.dateType = [
    //     {
    //       value: 'HH:mm:ss',
    //       label: 'HH:mm:ss'
    //     }
    //   ]
    //   this.data.options.format = 'HH:mm:ss'
    // }
    // if (this.data && this.data.type == 'date' && this.data.options.dateType) {
    //   this.dateType = this.data.options.dateType
    // }
  },
  watch: {
    // 'data.options.isRange': function(val) {
    //   if (typeof val !== 'undefined') {
    //     if (val) {
    //       this.data.options.defaultValue = null
    //     } else {
    //       if (Object.keys(this.data.options).indexOf('defaultValue')>=0)
    //         this.data.options.defaultValue = ''
    //     }
    //   }
    // },
    // 'data.options.type': function(val) {
    //   if (this.data.type == 'date') {
    //     if (val == 'daterange' || val == 'datetimerange' || val == 'dates') {
    //       this.data.options.defaultValue = []
    //     } else {
    //       this.data.options.defaultValue = ''
    //     }
    //   }
    // },
    // 'data.options.requiredMessage':function (val) {
    //   this.validateRequired(this.data && this.data.options ? this.data.options.required : false)
    // },
    // 'data.options.dataType': function (val) {
    //   this.validateDataType(val)
    // },
    // 'data.options.dataTypeCheck': function (val) {
    //   this.validateDataType(this.data && this.data.options ? this.data.options.dataType : '')
    // },
    // 'data.options.dataTypeMessage': function (val) {
    //   this.validateDataType(this.data && this.data.options ? this.data.options.dataType : '')
    // },
    // 'data.options.validator': function (val) {
    //   this.validateCustom(val)
    // },
    // 'data.options.validatorCheck': function (val) {
    //   this.validateCustom(this.data && this.data.options ? this.data.options.validator : '')
    // },
    // 'data.options.options': {
    //   deep: true,
    //   handler (val) {
    //     if (this.data.options && typeof this.data.options.defaultValue == 'object' && Array.isArray(this.data.options.defaultValue)) {
    //       this.data.options.defaultValue = this.data.options.defaultValue.filter(item => val.map(item => item.value).includes(item))
    //     }
    //     if (this.data.options && typeof this.data.options.defaultValue == 'string') {
    //
    //       if (typeof val == 'object' && !val.map(item => item.value).includes(this.data.options.defaultValue)) {
    //         this.data.options.defaultValue = ''
    //       }
    //     }
    //   }
    // },
    // 'data.options.customClass': function(val) {
    //   this.customClassArray = this.data && this.data.options && this.data.options.customClass ? this.data.options.customClass.split(' ').filter(item => item) : []
    // },
    // 'data.pattern': function (val) {
    //   this.valiatePattern(val)
    // },
    // 'data.patternCheck': function (val) {
    //   this.valiatePattern(this.data && this.data.options ? this.data.options.pattern : '')
    // },
    // 'data.patternMessage': function (val) {
    //   this.valiatePattern(this.data && this.data.options ? this.data.options.pattern : '')
    // },
    // 'data.required': function(val) {
    //   this.validateRequired(val)
    // },
    // customClassArray (val) {
    //   this.data.options.customClass = val.join(' ')
    // }
  },
  methods: {
    changeType(type) {
      let format
      if (type === 'year') {
        format = 'yyyy年'
        this.dateType = [
          {
            value: 'yyyy年',
            label: 'yyyy年'
          },
          {
            value: 'yyyy',
            label: 'yyyy'
          }
        ]
      } else if (type === 'month') {
        format = 'yyyy年MM月'
        this.dateType = [
          {
            value: 'yyyy年MM月',
            label: 'yyyy年MM月'
          },
          {
            value: 'yyyy-MM',
            label: 'yyyy-MM'
          },
          {
            value: 'yyyy/MM',
            label: 'yyyy/MM'
          }
        ]
      } else if (type === 'datetime' || type === 'datetimerange') {
        format = 'yyyy年MM月dd日 HH:mm:ss'
        this.dateType = [
          {
            value: 'yyyy年MM月dd日 HH:mm:ss',
            label: 'yyyy年MM月dd日 HH:mm:ss'
          },
          {
            value: 'yyyy-MM-dd HH:mm:ss',
            label: 'yyyy-MM-dd HH:mm:ss'
          },
          {
            value: 'yyyy/MM/dd HH:mm:ss',
            label: 'yyyy/MM/dd HH:mm:ss'
          }
        ]
      } else {
        format = 'yyyy年MM月dd日'
        this.dateType = [
          {
            value: 'yyyy年MM月dd日',
            label: 'yyyy年MM月dd日'
          },
          {
            value: 'yyyy-MM-dd',
            label: 'yyyy-MM-dd'
          },
          {
            value: 'yyyy/MM/dd',
            label: 'yyyy/MM/dd'
          }
        ]
      }
      this.data.options.format = format
      this.data.options.dateType = this.dateType
    },
    handleOptionsRemove (index) {
      if (this.data.type === 'grid') {
        this.data.columns.splice(index, 1)
      } else if (this.data.type === 'tabs') {
        this.data.tabs.splice(index, 1)
      } else if (this.data.type === 'imgupload' || this.data.type === 'fileupload') {
        this.data.options.headers.splice(index, 1)
      } else {
        if (!this.data.options.remote && this.data.options.options[index].value) {
          this.data.options.defaultValue = typeof this.data.options.defaultValue === 'string' ? '' : []
        }

        this.data.options.options.splice(index, 1)
      }

    },
    handleClearSelect () {
      if (this.data.type=='checkbox' || (this.data.type=='select' && this.data.options.multiple)) {
        this.data.options.defaultValue = []
      } else {
        this.data.options.defaultValue = ''
      }
    },
    handleAddOption () {
      if (this.data.options.showLabel) {
        this.data.options.options.push({
          value: '新选项',
          label: '新选项'
        })
      } else {
        this.data.options.options.push({
          value: '新选项'
        })
      }

    },
    handleAddColumn () {
      this.data.columns.push({
        span: '',
        list: []
      })
    },
    handleAddTab () {
      let length = this.data.tabs.length

      this.data.tabs.push({
        label: '标签页' + (length + 1),
        name: 'tab_' + Math.random().toString(36).slice(-8),
        list: []
      })
    },
    handleAddHeader () {
      if ('headers' in this.data.options) {
        this.data.options.headers.push({
          key: '',
          value: ''
        })
      } else {

        this.$set(this.data.options, 'headers', [{key: '', value: ''}])
      }

    },
    generateRule () {
      if (this.data) {
        this.data.rules = []
        Object.keys(this.validator).forEach(key => {
          if (this.validator[key]) {
            this.data.rules.push(this.validator[key])
          }
        })
      }
    },
    handleSelectMuliple (value) {
      if (this.data.type == 'select') {
        if (value) {
          if (this.data.options.defaultValue) {
            this.data.options.defaultValue = [this.data.options.defaultValue]
          } else {
            this.data.options.defaultValue = []
          }

        } else {
          if (this.data.options.defaultValue.length>0){
            this.data.options.defaultValue = this.data.options.defaultValue[0]
          } else {
            this.data.options.defaultValue = ''
          }
        }
      }
    },
    handleSetTemplate () {
      this.$refs.codeDialog.open(this.data.options.template)
    },
    handleTemplateConfirm (value) {

      this.data.options.template = value

      this.$refs.codeDialog.close()
    },
    handleSetCascader () {
      this.$refs.cascaderDialog.open(this.data.options.options)
    },
    handleCascaderConfirm (value) {
      if (typeof value == 'string') {
        this.data.options.options =  Function('"use strict";return (' + value + ')')()
      } else {
        this.data.options.options =  value
      }

      this.$refs.cascaderDialog.close()
    },
    validateRequired (val) {
      if (val) {
        this.validator.required = {required: true, message: this.data.requiredMessage ? this.data.requiredMessage : '必须填写'}
      } else {
        this.validator.required = null
      }

      this.$nextTick(() => {
        this.generateRule()
      })
    },
    validateDataType (val) {
      if (!this.show) {
        return false
      }

      if (val && (this.data.options.dataTypeCheck || !Object.keys(this.data.options).includes('dataTypeCheck'))) {
        this.validator.type = {type: val, message: this.data.dataTypeMessage ? this.data.dataTypeMessage : '格式不正确'}
      } else {
        this.validator.type = null
      }

      this.generateRule()
    },
    valiatePattern (val) {
      if (!this.show) {
        return false
      }

      if (val && (this.data.options.patternCheck || !Object.keys(this.data.options).includes('patternCheck'))) {
        this.validator.pattern = {pattern: val, message: this.data.patternMessage ? this.data.patternMessage : '格式不匹配'}
      } else {
        this.validator.pattern = null
      }

      this.generateRule()
    },
    validateCustom (val) {
      if (!this.show) {
        return false
      }

      if (val && this.data.validatorCheck) {
        this.validator.validator = {func: val}
      } else {
        this.validator.validator = null
      }

      this.generateRule()
    },
    handleEventAdd (name) {
      this.$emit('on-event-add', name)
    },
    handleEventEdit ({eventName, functionKey}) {
      this.$emit('on-event-edit', {eventName, functionKey})
    },
    setEvent (eventObj) {
      this.$set(this.data.events, eventObj.type, eventObj.key)
    }
  },

}
</script>

<style scoped>
.rowLabel {
  display: block;
}
</style>
