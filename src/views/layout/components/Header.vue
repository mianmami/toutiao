<template>
  <div class="header-container">
    <div class="title">XXX科技有限公司</div>
    <div class="user-setting">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ this.user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人设置</el-dropdown-item>
          <el-dropdown-item @click.native="onLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
export default {
  name: "Header",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    onLogout() {
      this.$confirm("是否退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.removeItem("user");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
  created() {
    getUserProfile()
      .then((data) => {
        this.user = data.data.data;
        this.$bus.$on("updateName", (val) => {
          this.user.name = val
          console.log(this.user);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border-bottom: 1px solid #eee;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  margin-left: 10px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>