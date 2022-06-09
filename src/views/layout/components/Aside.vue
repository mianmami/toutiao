<template>
<!-- 
  el-menu里面有个属性router，写了了之后 el-menu-item就可以根据index配置的路径进行跳转(当然也可以自己写点击事件进行跳转)
 -->
  <el-menu
    :default-active="activePath"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
    
  >
    <el-menu-item 
      v-for = "(item, index) in menuInfo"
      :key="index"
      :index="item.path"  
      
    >
      <i :class="item.icon" ></i>
      <span slot="title">{{item.name}}</span>
    </el-menu-item>
    
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  data(){
    return{
      menuInfo:[
        {path:"/", name:'首页', icon: 'el-icon-s-home'},
        {path:'/content', name:'内容管理', icon: 'el-icon-menu'},
        {path: '/material', name:"素材", icon:'el-icon-document'},
        {
          path: '/essay',
          name: '发布文章',
          icon: 'el-icon-s-promotion'
        },
        {
          path: '/comment',
          name: '评论管理',
          icon: 'el-icon-s-comment'
        },
        { path: '/fans', name: '粉丝管理', icon: 'el-icon-coordinate' },
        { path: '/setting', name: '个人设置', icon: 'el-icon-setting' }
      ]
    }
  },
  props:{
    isCollapse:{
      required: true
    }
  },
  computed:{
    // 获取当前路径作为激活路径
    activePath(){
      return this.$route.path
    }
  },
  methods:{
   
  }
};
</script>

<style lang="less" scoped>
.el-menu{
  // 把默认的边框颜色去掉
  border:none;
  height:100%;
}
</style>