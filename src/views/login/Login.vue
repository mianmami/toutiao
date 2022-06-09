<template>
  <el-container>
    <el-form ref="form" :model="user" label-width="65px" :rules="rules">
      <div class="login-title">仿今日头条后台管理系统</div>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="user.code"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="isAgree" label-width="0px">
        <el-checkbox v-model="user.isAgree" >记住我</el-checkbox>
      </el-form-item> -->
      <el-form-item prop="isAgree" label-width="0px">
        <el-checkbox v-model="user.isAgree" >我意阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onHandleLogin('form')"
          :loading="isLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
import {login} from '@/api/user'
export default {
  name: "Login",
  data() {
    // 自定义复选框的校验规则(判读有无勾选必须要自定义了)
    var checkAgree = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("您必须同意该选项才可以进行后续操作"));
      }else{
        callback();
      }
    };
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
        isAgree: true,
      },
      isLogin: false,
      rules: {
        // pattern表示验证正则表达式规则
        mobile: [
          { required: true, message: "电话号码不能为空", trigger: "change" },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "电话号码格式不正确",
            trigger: "change",
          },
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "change" },
          {
            pattern: /\d{6}/,
            message: "验证码必须为6位数字",
            trigger: "change",
          },
        ],
        isAgree: [{ validator: checkAgree, trigger: "change" }],
      },
    };
  },
  methods: {
    // 点击登录按钮的时候也需要进行验证(需要把数据提交到服务器验证)， 如果为空则报错，如果有值则提交到服务器验证
    onHandleLogin(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) {
          console.log("error submit");
          return false;
        } else {
          this.userLogin();
        }
      });
    },
    userLogin() {
      this.isLogin = true; // 开启登录验证，按钮设置为禁用模式(防止多次点击按钮，发送多次登录请求)
      login(this.user).then(data=>{
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data.data.data));
        this.$message({message: '登录成功',type: 'success'})
        this.isLogin = false;
        this.$router.push("/");
      }).catch(err=>{
        this.$message.error("登录失败，手机号或者验证码有问题！")
        this.isLogin = false;
      })
      
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  background-image: url("@/assets/images/login/login.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    width: 400px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    overflow: hidden;
    padding: 80px;
    .login-title {
      text-align: center;
      position: relative;
      top: -40px;
      font-size: 20px;
      letter-spacing: 5px;
    }
    .el-button {
      width: 100%;
    }
   
  }
}
</style>