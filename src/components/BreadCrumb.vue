<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "BreadCrumb",
  props:["name"],
  data() {
    return {};
  },
};
</script>

<style>
</style>