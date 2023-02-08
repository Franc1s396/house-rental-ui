<template>
  <div>
    <el-form v-loading="loading"
             element-loading-text="正在注册中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)" :rules="rules" ref="loginForm" :model="passRegisterForm"
             label-width="80px"
             class="loginContainer">
      <h3 class="loginTitle">房屋租赁系统注册</h3>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="passRegisterForm.username" auto-complete="off"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input type="password" v-model="passRegisterForm.password" auto-complete="off"
                  placeholder="请输入用户密码"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input type="phone" v-model="passRegisterForm.phone" auto-complete="off"
                  placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="passRegisterForm.sex">
          <el-option label="男性" :value="1"></el-option>
          <el-option label="女性" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" style="width: 100%;margin-top: 15px" @click="register">注册</el-button>
      <el-button style="width: 100%;margin-top: 15px" @click="goLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import {register} from "@/api/login";

export default {
  name: "register",
  data() {
    return {
      loading: false,
      passRegisterForm: {
        username: '',
        password: '',
        phone: '',
        sex: null
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        phone: [{required: true, message: '请输入手机号码', trigger: 'blur'}],
        sex: [{required: true, message: '请选择性别', trigger: 'blur'}],
      },
      rememberMe: false
    }
  },
  methods: {
    goLogin() {
      this.$router.push('/login');
    },
    register() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          register(this.passRegisterForm).then(resp => {
            this.loading = false;
            this.$message.success('注册成功');
            this.$router.push('/login');
          }).catch(error => {
            this.loading = false;
          })
        }
      })
    }
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
  width: 350px;
  height: 420px;
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

.el-button + .el-button {
  margin-left: 0;
}
</style>
