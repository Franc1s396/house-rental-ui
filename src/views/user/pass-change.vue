<template>
  <div>
    <el-card class="box-card">
      <el-form :model="passChangeForm" label-width="100px" ref="passChangeForm" :rules="rules">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passChangeForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="passChangeForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码" prop="repeatNewPassword">
          <el-input type="password" v-model="passChangeForm.repeatNewPassword"></el-input>
        </el-form-item>
        <el-button type="primary" @click="passChangeSubmit">确认修改</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {updatePassword, updateUser} from "@/api/user";
import {Message} from "element-ui";
import store from "@/store";

export default {
  name: "pass-change",
  data() {
    var validateRepeatPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passChangeForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      passChangeForm: {
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      },
      rules: {
        oldPassword: {required: true, message: '请输入旧密码', trigger: 'blur'},
        newPassword: {required: true, message: '请输入新密码', trigger: 'blur'},
        repeatNewPassword: {required: true, validator: validateRepeatPass, trigger: 'blur'},
      }
    }
  },
  methods: {
    passChangeSubmit() {
      this.$confirm('修改密码需要重新登录,您确定要修改吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updatePassword(this.passChangeForm).then(resp=>{
          Message.success('修改成功!')
          store.dispatch('logout').then(resp => {
            this.$router.push('/login');
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });

    },
    handleReset(){
      this.passChangeForm={};
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 500px;
  display: inline-block
}

.box-card >>> .el-input__inner {
  float: left;
  width: 70%;
  margin-left: 20px;
}
</style>
