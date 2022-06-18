<template>
  <el-card>
    <div slot="header">
      <BreadCrumb
        :name="$route.params.tag ? '修改文章' : '发布文章'"
      ></BreadCrumb>
    </div>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="60px"
      class="demo-ruleForm"
      size="mini"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <el-form-item label="内容" prop="content">
        <el-tiptap
          v-model="ruleForm.content"
          :extensions="extensions"
          height="400px"
          placeholder="请输入文章内容"
        />
      </el-form-item>

      <el-form-item label="封面" prop="cover">
        <el-radio-group v-model="ruleForm.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item class="cover">
        <template v-if="ruleForm.cover.type > 0">
          <!-- 这里会出现单图和三图因为key相同而导致的重用问题 -->
          <!-- <UploadPhoto
            v-for="(item, index) in ruleForm.cover.type"
            :key="item"
            @coverImage='onUpdateCover(index, $event)'
            :cover='ruleForm.cover.images[index]'
          ></UploadPhoto> -->

          <!-- 
            当给子组件提供的数据，既要使用，又要修改的时候，我们可以在组件上使用v-model简化数据绑定
            这句话等同于下面两句代码
            1.给子组件绑定了Input事件  @input=    通过自定义事件实现子往父传数据
            2.通过props给子组件传递了数据         通过Props事件实现父往子传数据

            注意：子组件的操作和原来一样，但是父组件不需要给自定义事件Input添加内容了，已经通过v-model自己绑定了

            参考资料：https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model
            注意：value和input是可以进行修改的，通过model属性进行修改！！！！！！
           -->
          <UploadPhoto
            v-for="(item, index) in ruleForm.cover.type"
            :key="item"
            v-model='ruleForm.cover.images[index]'
          ></UploadPhoto>
          
        </template>
      </el-form-item>

      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="ruleForm.channel_id" placeholder="请选择">
          <el-option
            v-for="item in channels"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button round type="primary" @click="onPublish(false, 'ruleForm')">{{
          $route.params.tag ? "修改" : "发布"
        }}</el-button>
        <el-button round @click="onPublish(true)">存为草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
} from "element-tiptap";
import {
  getArticleChannel,
  addArticle,
  getArticle,
  updateArticle,
} from "@/api/article";

import { uploadImage } from "@/api/image";
import UploadPhoto from "./components/UploadPhoto.vue";
export default {
  name: "Essay",
  components: {
    BreadCrumb,
    UploadPhoto,
    "el-tiptap": ElementTiptap,
  },
  
  data() {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Image({
          /* 
          
            如果请求接口要求content-type是mutipart/form-data
            则请求体必须使用formData
          */
          uploadRequest(file) {
            const fd = new FormData();
            fd.append("image", file);

            return uploadImage(fd).then((res) => {
              return res.data.data.url;
            });
          },
        }),
      ],
      ruleForm: {
        title: "",
        content: "",
        cover: {
          type: null, // -1自动 0无图  1-1张 3-3张
          images: [],
        },
        channel_id: null,
      },
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 5,
            max: 50,
            message: "文章标题长度需在5到50个字符",
            trigger: "blur",
          },
        ],
        content: [
          {
            validator: (rule, value, callback) => {
              if (value === "<p></p>" || value == "") {
                callback(new Error("请输入内容"));
              } else {
                callback();
              }
            },
            trigger: "change",
          },
        ],
        channel_id: [
          { required: true, message: "请选择文章频道", trigger: "change" },
        ],
      },
      channels: [],
    };
  },
  
  methods: {
    onPublish(draft, formName) {
      const id = this.$route.params.id;
      if (id) {
        // 修改操作
        updateArticle(id, this.ruleForm).then((res) => {
          this.$message({
            type: "success",
            message: "修改成功",
          });
        });
        this.$router.push("/content");
      } else {
        // 发布操作

        this.$refs[formName].validate((valid) => {
          if (valid) {
            addArticle(this.ruleForm).then((res) => {
              this.$message({
                message: "发布成功",
                type: "success",
              });
            });
            this.$router.push("/content");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
  },
  mounted() {
    getArticleChannel().then((res) => {
      this.channels = res.data.data.channels;
    });

    if (this.$route.params.tag) {
      getArticle(this.$route.params.id).then((res) => {
        const data = res.data.data
        this.ruleForm.title = data.title;
        this.ruleForm.content = data.content;
        this.ruleForm.channel_id = data.channel_id;
        this.ruleForm.cover = data.cover
      });
    }

    
  },
};
</script>

<style lang="less" scoped>
.tiptap {
  margin-bottom: 20px;
  margin-left: 60px;
  width: calc(100% - 60px);
}
/deep/.cover > .el-form-item__content {
  display: flex;
  .upload-photo-containter {
    margin-right: 20px;
  }
}
</style>