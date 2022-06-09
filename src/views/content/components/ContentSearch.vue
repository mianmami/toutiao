<template>
  <div class="content-search-container">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      size="small"
    >
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="ruleForm.state">
          <el-radio :label="null">全部</el-radio>
          <el-radio label="0">草稿</el-radio>
          <el-radio label="1">待审核</el-radio>
          <el-radio label="2">审核通过</el-radio>
          <el-radio label="3">审核失败</el-radio>
          <el-radio label="4">已删除</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="频道" prop="region">
        <el-select v-model="ruleForm.region">
          <!-- 传入空或者Null都可以 -->
          <el-option 
            label="全部"
            :value="null" 
          ></el-option>
          <el-option 
            v-for="(value) in chanels"
            :key = "value.id"
            :label="value.name"
            :value="value.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 日期这个地方控制台有个警告！！！！ -->
      <!-- <el-form-item label="日期" required>
        <el-date-picker
          v-model="ruleForm.date1"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
                  >
        </el-date-picker>
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="filterArticle">筛选</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getArticleChannel} from '@/api/article'
export default {
  name: "ContentSearch",
  data() {
    return {
      ruleForm: {
        state: "null", // 默认为null
        region: "",
      },
      chanels: [],
    };
  },
  methods: {
    filterArticle() {
      
      this.$bus.$emit("filterData", this.ruleForm);
    },
  },
  mounted() {
    getArticleChannel().then(res=>{
      this.chanels = res.data.data.channels
    })
  },
};
</script>

<style lang="less" scoped>
</style>