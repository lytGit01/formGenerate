<template>
<div class="widget">
  <div class="widget-view"
    :class="{
      'active': selectWidget.key == element.key,
      'is_req': element.options.required
    }"
    @click.stop="handleSelectWidget(index)">
    <widget-element-item :element="element" :is-table="false" :key="element.key"></widget-element-item>

    <div class="widget-view-action" v-if="selectWidget.key == element.key && isShowBut">
      <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)" title="复制"></i>
      <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)" title="删除"></i>
    </div>

    <div class="widget-view-drag" v-if="selectWidget.key == element.key">
      <i class="iconfont icon-drag drag-widget"></i>
    </div>
  </div>
</div>
</template>

<script>
import WidgetElementItem from './WidgetElementItem'
import _ from 'lodash'
import { EventBus } from '../util/event-bus.js'

export default {
  props: ['element', 'select', 'index', 'data', 'formKey', 'hoosFunctionMap'],
  components: {
    WidgetElementItem
  },
  data () {
    return {
      selectWidget: this.select || {}
    }
  },
  mounted () {
  },
  computed: {
    isShowBut() { // 是否显示复制、删除按钮
      return this.element.fromDocContent !== 1
    }
  },
  methods: {
    handleSelectWidget (index) {
      this.selectWidget = this.data.list[index]
    },
    handleWidgetDelete (index) {
      if (this.data.list.length == 1) {
        this.$emit('select-change', -1)
      } else {
        if (this.data.list.length - 1 == index) {
          this.$emit('select-change', index - 1)
        } else {
          this.$emit('select-change', index)
        }
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1)

        setTimeout(() => {

          EventBus.$emit('on-history-add-' + this.formKey)
          // this.hoosFunctionMap && this.hoosFunctionMap.setBackfillData()
        }, 20)
      })
    },
    handleWidgetClone (index) {
      const key = Math.random().toString(36).slice(-8)
      let cloneData = {
        ..._.cloneDeep(this.data.list[index]),
        key,
        model: this.data.list[index].type + '_' + key,
      }

      this.data.list.splice(index + 1, 0, cloneData)

      this.$nextTick(() => {
        this.selectWidget = this.data.list[index + 1]

        this.$nextTick(() => {         EventBus.$emit('on-history-add-' + this.formKey)       })
      })
    }
  },
  watch: {
    select (val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler (val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  }
}
</script>
