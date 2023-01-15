<template>
  <div>
    <el-form v-loading="loading"
             element-loading-text="正在登陆中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)" :rules="rules" ref="loginForm" :model="passLoginForm"
             class="loginContainer">
      <h3 class="loginTitle">房屋租赁系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="passLoginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="passLoginForm.password" auto-complete="off" placeholder="请输入用户密码"></el-input>
      </el-form-item>
      <el-checkbox class="loginRemember" v-model="rememberMe">记住我</el-checkbox>
      <el-button type="primary" style="width: 100%;margin-top: 15px" @click="submitLogin">登录</el-button>
      <p style="font-size: 10px;margin-top: 30px">登录即表示您同意 《服务协议》 《隐私权政策》</p>
    </el-form>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {Message} from "element-ui";
export default {
  name: "login",
  data() {
    return {
      loading: false,
      passLoginForm: {
        username: '',
        password: '',
      },
      //TODO 邮箱登录
      emailLoginForm:{
        email:'',
        code:''
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
      },
      rememberMe: false
    }
  },
  methods: {
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 记住我功能
          if (this.passLoginForm.rememberMe) {
            Cookies.set("username", this.passLoginForm.username, {expires: 30});
            //TODO 密码加密
            Cookies.set("password", this.passLoginForm.password, {expires: 30});
            Cookies.set('rememberMe', this.passLoginForm.rememberMe, {expires: 30});
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          // 登录
          this.$store.dispatch('passLogin', this.passLoginForm).then(() => {
            this.$router.push('/index');
          }).catch(() => {
            this.loading = false;
          })
        }
      })
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.passLoginForm = {
        username: username === undefined ? this.passLoginForm.username : username,
        //TODO 密码加密
        password: password === undefined ? this.passLoginForm.password : password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
  },
  mounted() {
    this.getCookie()
  }
}
</script>

<style scoped>
.loginContainer {
  border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 300px;
  height: 320px;
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

.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
</style>
