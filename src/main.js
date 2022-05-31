// 项目入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 加载全局样式文件
import './styles/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

/*

components里面可以叫做公共组件，views里面可以叫做视图组件

*/
