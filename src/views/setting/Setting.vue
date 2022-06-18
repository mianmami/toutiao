<template>
  <el-card>
    <div slot="header">
      <BreadCrumb name="个人设置"></BreadCrumb>
    </div>
    <el-row>
      <el-col :span="10">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="编号">
            {{ form.id }}
          </el-form-item>

          <el-form-item label="手机">
            {{ form.mobile }}
          </el-form-item>

          <el-form-item label="媒体名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="活动简介">
            <el-input type="textarea" v-model="form.intro"></el-input>
          </el-form-item>

          <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" :offset="7">
        <!-- 

          <input type=file  >可以上传图片，样式不太好看，所以用hidden隐藏起来
          label标签的for属性可以和input标签有个联动效果，点击了一个，相当于点击了另外一个
         -->
        <label for="file">
          <el-avatar shape="square" :size="200" fit="contain" :src="form.photo">
          </el-avatar>
          <p>点击添加图片</p>
        </label>
        <input id="file" type="file" @change="handleInputChange" ref="file" />
        <el-dialog
          title="编辑图片"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
          @opened="handleOpen"
          @closed='handleClose'
        >
          <div>
            <img :src="file" alt="" width="150px" id="image" />
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleResult"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
import { getUserProfile, updateUserPhoto, updateUserProfile } from "@/api/user";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
export default {
  name: "Setting",
  components: { BreadCrumb },
  data() {
    return {
      form: {},
      dialogVisible: false,
      file: "",
      cropper: null,
    };
  },
  methods: {
    onSubmit() {
      updateUserProfile({
        name: this.form.name,
        email: this.form.email,
        intro: this.form.intro
      }).then(res=>{
        this.$bus.$emit("updateName", this.form.name);
      })
    },
    loadUserProfile() {
      getUserProfile().then((res) => {
        this.form = res.data.data;
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleImageChange() {
      this.dialogVisible = true;
    },
    handleInputChange() {
      // 如何把通过<input type='file'>得到的图片预览在dialogue对话框
      // 就是一个标准的操作，没有什么理由，记住就好了
      const file = this.$refs.file;
      const blobData = window.URL.createObjectURL(file.files[0]);
      this.file = blobData;

      // 弹出展示层，预览图片
      this.dialogVisible = true;

      // 配置cropperjs

      

      // 解决选择相同文件不触发 不然如果是相同的文件，就默认不进入更改
      this.$refs.file.value = "";
    },

    /* 通过dialog弹出+关闭的操作，解决cropperjs还是出现原来图片的问题*/
    handleOpen() {
      const image = document.getElementById("image");
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'none',
        aspectRatio: 1,
        cropBoxResizable: false
      });
    },
    handleClose() {
      this.cropper.destroy();
    },
    handleResult() {
      // 获取裁切成功的图片对象
      this.cropper.getCroppedCanvas().toBlob(file=>{
        const fd = new FormData()
        fd.append('photo', file);

        //提交请求
        updateUserPhoto(fd).then(res=>{
          //关闭对话框
          this.dialogVisible = false
          //更新用户图片
          this.form.photo = window.URL.createObjectURL(file)
        })

      })

      // 关闭对话框
      
    }
  },
  mounted() {
    this.loadUserProfile();
  },
};
</script>

<style lang="less" scoped>
/deep/.el-avatar {
  vertical-align: bottom !important;
}
#image {
  display: block;
  width: 100%;
  height: 200px;
}
</style>