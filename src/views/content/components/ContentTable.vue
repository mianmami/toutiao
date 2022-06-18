<template>
  <div class="content-table-container">
    <!-- 表格主体 -->
    <el-table :data="articles" style="width: 100%" size="mini" v-loading="loading">
      <el-table-column prop="date" label="封面">
        <template slot-scope="scope">
          <!-- 
            1.图片这里应该有三种不同的呈现方式 有地址且可以请求到/有地址但404/没有地址
           -->
          <el-image
            style="width: 60px; height: 50px"
            :src="scope.row.cover.images[0]"
            fit="cover"
          >
          <!-- 加载图片的时候会显示加载中 -->
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>

          <!-- <img
            :src="scope.row.cover.images[0]"
            class="article-cover"
            v-if="scope.row.cover.images[0]"
          />
          <img
            src="@/assets/images/content/图片加载失败.png"
            v-else
            class="article-cover"
          /> -->
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      
      <el-table-column prop="status" label="状态">
        <!-- 

          如果使用了template就不用prop传递数据了。
          而是在template上有个slot-scope="scope" 通过scope就可以拿到对象
          可以参考一下 https://element.eleme.cn/#/zh-CN/component/table#table-column-scoped-slot  自定义列模板
         -->
        <template slot-scope="scope">
          <el-tag>{{ tag[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            circle
            @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            circle
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <!-- 

      也得告诉分页器每一个页面展示了多少条数据，否则，它就是按照10条每页划分的
      current-page一定要加.sync否则不能进行页码地同步
     -->
    <el-pagination
      layout="prev, pager, next"
      :total="totalCount"
      class="pagination"
      :page-size="pageSize"
      :disabled="loading"
      @current-change="onPageChange"
      :current-page.sync = "page"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getArticleList, deleteArticle } from "@/api/article";
export default {
  name: "ContentTable",
  data() {
    return {
      articles: [],
      tag: ["草稿", "待审核", "审核通过", "审核失败", "已删除"],
      totalCount: 0,
      pageSize: 10,
      status: null,
      channel_id: null,
      loading: false,
      page: 1
    };
  },
  created() {
    // 刚开始的时候，展示第一页的数据

    this.loadArticles(1);

    this.$bus.$on("filterData", (data) => {
      const { state, region } = data;
      console.log(data);
      this.status = state;
      this.channel_id = region;
      this.loadArticles(1);
    });
  },
  updated() {},
  methods: {
    loadArticles(page = 1, per_page = this.pageSize) {
      this.loading = true
      getArticleList({
        page, // 加载第几页
        per_page, // 每页需要展示多少数据
        status: this.status, // 展示哪一种类型的数据 不传->全部  0->草稿 1->待审核 2->审核通过 3->审核失败 4->已删除
        channel_id: this.channel_id,
      }).then((res) => {
        console.log(res);
        this.articles = res.data.data.results;
        this.totalCount = res.data.data.total_count;
        this.loading = false
      });
      
    },

    //告诉分页器我当前是哪个页面，重新发起请求即可
    onPageChange(page) {
      this.loadArticles(page);
    },
    handleDelete(target){
      this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           deleteArticle(target).then(res=>{
             // 删除了内容之后重新加载内容
            this.loadArticles(this.page);
            }) 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    handleEdit(id){
      this.$router.push({
        name: 'essay',
        params: {
          tag: 1,
          id
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 30px;
  text-align: right;
}
.article-cover {
  width: 100px;
  height: 100px;
}
</style>