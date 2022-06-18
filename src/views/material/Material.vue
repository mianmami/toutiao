<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <BreadCrumb name="素材管理"></BreadCrumb>
    </div>

    <div class="upload">
      <el-radio-group v-model="collect" size="mini" @change="handleRadioChange">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>

      <el-button type="primary" @click="dialogVisible = true" size="mini"
        >上传图片</el-button
      >
      <el-dialog
        title="上传图片"
        :visible.sync="dialogVisible"
        width="30%"
        size="mini"
      >
        <!-- 

        注意：这里的上传文件，用的是el-upload这个组件，而不是通过axios,所以需要配置el-upload需要的东西
        1.action:文件提交的地址(默认是Post方法)
        2.配置headers: 权限验证
        3.需要配置参数（body） image=file

       -->
        <el-upload
          class="upload-demo"
          drag
          action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
          :headers="uploadHeaders"
          name="image"
          multiple
          :on-success="onUploadSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-dialog>
    </div>

    <el-row :gutter="20">
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="4"
        :xl="4"
        v-for="pic in images"
        :key="pic.id"
      >
        <el-image style="width: 100%; height: 150px" :src="pic.url" fit="fill">
        </el-image>
        <div class="delete">
          <el-button
            :icon="pic.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            @click="handleCollect(pic)"
            :loading="pic.loading"
            circle
          ></el-button>
          <el-button
            icon="el-icon-delete-solid"
            circle
            @click="handleDelete(pic.id)"
            :loading="pic.loading"
          ></el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <!-- 

    per_page的值要绑定给page-size，否则，分页组件不知道你请求的时候多少为一页
     -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
      :page-size="per_page"
      :current-page.sync="page"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
import { getImage, collectImages, deleteImage } from "@/api/image";
export default {
  name: "Material",
  components: { BreadCrumb },
  data() {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      dialogVisible: false,

      page: 1,
      per_page: 20,
      collect: false,

      images: [],
      total: 0,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`,
      },
      loading: false,
    };
  },
  methods: {
    loadImage(
      page = this.page,
      per_page = this.per_page,
      collect = this.collect
    ) {
      getImage({
        page,
        per_page,
        collect,
      }).then((res) => {
        const results = res.data.data.results;
        results.forEach((img) => {
          img.loading = false;
        });
        this.images = results;
        if (res.data.data.total_count == 0) return; // 不是常规操作，为了解决项目的bug
        this.total = res.data.data.total_count;
      });
    },
    handleCurrentChange(page) {
      this.loadImage(page);
    },
    handleRadioChange(val) {
      this.collect = val;
      this.page = 1; // 切换回来的时候，重新把page修改为1
      this.loadImage();
    },
    onUploadSuccess() {
      this.dialogVisible = false;
      this.loadImage();
      this.$message({
        type: "success",
        message: "上传成功",
      });
    },
    handleCollect(pic) {
      pic.loading = true;
      collectImages(pic.id, !pic.is_collected).then((res) => {
        this.loadImage();
        pic.loading = false;
      });
    },
    handleDelete(imageId){
      deleteImage(imageId).then(res=>{
        this.loadImage();
      })
    }
  },
  mounted() {
    this.loadImage();
  },
};
</script>

<style lang="less" scoped>
.upload {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
}

.el-col {
  position: relative;
}

.delete {
  position: absolute;
  height: 40px;
  background-color: rgba(200, 200, 200, 0.5);
  bottom: 4px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-evenly;
}
/deep/.el-icon-star-on,
/deep/.el-icon-star-off,
/deep/.el-icon-delete-solid {
  font-size: 15px;
  line-height: 14px;
}

/deep/.el-icon-star-on {
  color: red;
}
</style>
