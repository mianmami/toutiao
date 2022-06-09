<template>
  <div class="content-container">
    <el-card>
      <div slot="header" class="clearfix">
        <BreadCrumb name="内容管理"></BreadCrumb>
      </div>
      <ContentSearch></ContentSearch>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>共找到{{  }}条记录</span>
      </div>
      <ContentTable></ContentTable>
    </el-card>

  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";
import ContentSearch from "./components/ContentSearch.vue";
import ContentTable from './components/ContentTable.vue'

export default {
  name: "Content",  
  components: { BreadCrumb, ContentSearch, ContentTable},
  data() {
    return {
      testData: '',
    };
  },
  methods: {
   
  },
 
};
</script>

<style lang="less" scoped>
</style>