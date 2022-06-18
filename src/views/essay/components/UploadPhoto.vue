<template>
  <div class="upload-photo-containter">
    <div class="cover-container" @click="handleCover">
      <img class="cover-image" ref='cover-image' :src='value'/>
    </div>

    <el-dialog title="请选择图片" :visible.sync="dialogVisible" width="30%">
      <el-tabs v-model="activeName">
        <el-tab-pane label="素材库" name="first">用户管理</el-tab-pane>

        <el-tab-pane label="收藏" name="second">
          <input type="file" @change="onFileChange" ref="file" />
          <img src="" alt="" ref="tagImage" class="tagImage" />
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from "@/api/image";
export default {
  name: "UploadPhoto",
  data() {
    return {
      dialogVisible: false,
      activeName: "",
      tagImage: "",
    };
  },
  props:['value'],
  methods: {
    handleCover() {
      this.dialogVisible = true;
    },
    onFileChange() {
      this.tagImage = window.URL.createObjectURL(this.$refs.file.files[0]);
      this.$refs.tagImage.src = this.tagImage;
    },
    handleSure() {
      if ((this.activeName = "second")) {
        if (!this.tagImage) {
          this.$message({
            type: "error",
            message: "您并没有选择任何文件",
          });
          return;
        }
        // 没有选择文件，直接退出， 有文件则执行上传操作

        const file = this.$refs.file.files[0];
        const fd = new FormData();
        fd.append("image", file);

        uploadImage(fd).then((res) => {
          const data = res.data.data.url
          this.$refs['cover-image'].src = data 
         this.$emit('input', data)
        });
      } else {
      }
      this.tagImage = "";
      this.dialogVisible = false;
    },
  },
  
};
</script>

<style lang="less" scoped>
.upload-photo-containter {
  display: flex;
}
.cover-container {
  width: 150px;
  height: 150px;
  border: 1px solid #000;
  .cover-image {
    width: 100%;
    height: 100%;
  }
}
.tagImage {
  width: 100%;
}
</style>