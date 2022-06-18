<template>
  <el-container>
    <el-aside width="200px" :class="{'collapse-side-menu': isCollapse}">
      <div class="collapse">
        <i
          :class="{
            'el-icon-s-fold': !isCollapse,
            'el-icon-s-unfold': isCollapse,
          }"
          @click="onCollapseSideMenu"
        ></i>
      </div>
      <Aside :isCollapse="isCollapse"></Aside>
    </el-aside>
    <el-container>
      <el-header height="60px">
        <Header />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import Aside from "./components/Aside.vue";
import Header from "./components/Header.vue";
export default {
  name: "Layout",
  components: { Aside, Header },
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    onCollapseSideMenu(){
      this.isCollapse = !this.isCollapse;
    }
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .collapse{
    text-align: center;
    background-color: #545c64;
    line-height: 40px;
    color: #fff;
  }
  .el-aside {
    overflow: hidden;
    // transition: width 0.8s;
  }
  .el-header {
    background-color: #fff;
  }
  
  .collapse-side-menu {
    width: 45px !important;
    // transition: width 0.8s;
  }
}
</style>