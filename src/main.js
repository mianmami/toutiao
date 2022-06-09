// 项目入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

// 加载全局样式文件
import "./assets/css/global.less"

Vue.config.productionTip = false

// 全局注册ElementUI组件
Vue.use(ElementUI);



new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')

/*

components里面可以叫做公共组件，views里面可以叫做视图组件
代码格式规范： import 命令写在最前面，后面才是vue.use()这些
默认的登录账号+密码：13911111111  +  246810
elementUI中禁用按钮，可以给button添加 loading属性
el-form可以设置label-width el-form-item也可以设置label-width
子组件中如果path设置为空 即 path: "" 那么这个子组件默认会被展示出来(那么父路由就不需要设置name属性)
有一些属性可以通过设置 !import来覆盖原来自定义的属性值
学会如何往标签中添加class样式的对象写法，true代表应用, false代表不应用
表格默认只能填入纯文本，如果想要放入一些其他样式，可以通过<template></template>(自定义组件)进行控制
这个项目有一个注意点：
  后端返回给我们的数据都是JSON格式的字符串，我们并不能通过.的方式直接访问。
  所以axios帮我们处理了一下，直接转成了JS对象。但是，删除文章的时候需要发送文章的ID号，
  但是这个ID号一开始返回给我们的时候超过了JS能处理的最大整数范围，所以此时我们得到的ID号，并不是最原始的ID号。
  const str = '{"id": 1253585764669959168}'
  JSON.parse(str) // 这个结果和原来的结果不同
  所以需要第三方的包来进行处理  json-bigit包可以处理
      import JSONbig from 'json-bigint'
      const str = '{"id": 1253585764669959168}'
      console.log(JSONbig.parse(str).id.toString());

*/
