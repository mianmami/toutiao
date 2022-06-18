  <template>
  <el-card>
    <div slot="header">
      <BreadCrumb name="评论管理"></BreadCrumb>
    </div>
    <el-table strip :data="tableData">
      <el-table-column prop="title" label="标题" width="400px">
      </el-table-column>

      <el-table-column prop="total_comment_count" label="总评论数">
      </el-table-column>

      <el-table-column prop="fans_comment_count" label="粉丝评论数">
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.comment_status ? "正常" : "关闭" }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-switch
            :disabled="scope.row.disabled"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleChange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :total="total_count"
    >
    </el-pagination>
  </el-card>
</template>

  <script>
import BreadCrumb from "@/components/BreadCrumb";
import { getArticleList, updateArticleComments } from "@/api/article";
export default {
  name: "Comment",
  components: { BreadCrumb },
  data() {
    return {
      tableData: [],
      page: 1,
      per_page: 10,
      total_count: 0,
    };
  },
  methods: {
    handleSizeChange(per_page) {
      this.per_page = per_page;
      this.page = 1;
      this.loadComments();
    },
    handleCurrentChange() {
      this.loadComments();
    },
    loadComments() {
      getArticleList({
        response_type: "comment",
        page: this.page,
        per_page: this.per_page,
      }).then((res) => {
        const results = res.data.data.results;
        this.total_count = res.data.data.total_count;
        results.forEach((val) => {
          val.disabled = false;
        });
        this.tableData = results;
      });
    },
    handleChange(article) {
      article.disabled = true;
      updateArticleComments(article.id.toString(), article.comment_status).then(
        (res) => {
          this.loadComments();
          this.$message({
            type: "success",
            message: article.comment_status ? "开启成功" : "关闭成功",
          });
          article.disabled = false;
        }
      );
    },
  },
  mounted() {
    this.loadComments();
  },
};
</script>

  <style lang="less" scoped>
.el-pagination {
  margin-top: 30px;
}
</style>