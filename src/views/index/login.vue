<template>
  <div>
    <el-form v-loading="loading"
             element-loading-text="正在登陆中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)" :rules="rules" ref="loginForm" :model="passLoginForm"
             class="loginContainer">
      <h3 class="loginTitle">房屋租赁系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="passLoginForm.username" auto-complete="off"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="passLoginForm.password" auto-complete="off"
                  placeholder="请输入用户密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row>
          <el-col :span="12">
            <el-input type="text" v-model="passLoginForm.code" auto-complete="off"
                      placeholder="点击图片更换验证码"
                      @keydown.enter.native="submitLogin"></el-input>
          </el-col>
          <el-col :span="12">
            <div class="login-code">
              <img class="login-code-img" :src="verifyCode" @click="getVerifyCode" alt="">
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-button type="primary" style="width: 100%;margin-top: 15px" @click="submitLogin">登录</el-button>
      <el-button style="width: 100%;margin-top: 15px" @click="goRegister">注册</el-button>
      <p style="font-size: 10px;margin-top: 30px">登录即表示您同意 《服务协议》 《隐私权政策》</p>
    </el-form>
  </div>
</template>

<script>
import {verifyCode} from "@/api/login";
import Cookies from "js-cookie";

export default {
  name: "login",
  data() {
    return {
      loading: false,
      verifyCode: '',
      passLoginForm: {
        username: '',
        password: '',
        code: '',
        uuid: ''
      },
      //TODO 邮箱登录
      emailLoginForm: {
        email: '',
        code: ''
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}],
      },
      rememberMe: false
    }
  },
  methods: {
    goRegister() {
      this.$router.push('/register');
    },
    getVerifyCode() {
      verifyCode().then(resp => {
        console.log(resp);
        this.verifyCode = "data:image/gif;base64," + resp.data.encodedCode;
        this.passLoginForm.uuid = resp.data.uuid;
      })
    },
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 登录
          this.$store.dispatch('passLogin', this.passLoginForm).then(() => {
            this.$router.push('/index');
          }).catch(() => {
            this.loading = false;
          })
        }
      })
    },
  },
  mounted() {
    this.getVerifyCode();
  }
}
</script>

<style lang="scss" scoped>
.loginContainer {
  border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  height: 400px;
  padding: 25px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 15px auto 20px auto;
  text-align: center;
  color: #505458;
}

.el-button + .el-button {
  margin-left: 0;
}

.login-code {
  height: 40px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.login-code-img {
  border: #000000 1px solid
}
</style>
