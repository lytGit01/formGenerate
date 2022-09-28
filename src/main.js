import Vue from 'vue'
import App from './App.vue'
import router from './router'

/** 样式 */
import './assets/iconfont/iconfont.css'
import './assets/styles/cover.scss'
import './assets/styles/index.scss'
import './assets/styles/editor.scss'

/** element */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import JiuLawUpload from './components/Upload/core/uploadJs';
import * as utils from './js/utils';
Vue.use(ElementUI, {zIndex: 300})

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue(); // bus通讯
Vue.prototype.$uploadJs = new JiuLawUpload();
Vue.prototype.$utils = utils; // 全局工具

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
