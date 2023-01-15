<template>
  <div>
    <el-card
        class="box-card">
      <div style="float: left;width: 200px;margin-top: 30px;margin-left: 20px">
        <el-upload
            class="avatar-uploader"
            action="/user/avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            accept="image/jpg,image/jpeg,image/png"
            :headers="headers"
        >
          <el-avatar :size="200" :src="user.avatarUrl"/>
        </el-upload>
      </div>
      <div style="margin-left: 270px;margin-top:60px;text-align: left">
        <div class="user-info-text">
          <span class="font-key">用户名:</span>
          <span class="font-value">{{ user.username }}</span>
        </div>
        <div class="user-info-text">
          <span class="font-key">昵称:</span>
          <span class="font-value">{{ user.nickname }}</span>
        </div>
        <div class="user-info-text">
          <span class="font-key">手机号:</span>
          <span class="font-value">{{ user.phone }}</span>
        </div>
        <div class="user-info-text">
          <span class="font-key">邮箱:</span>
          <span class="font-value">{{ user.email }}</span>
        </div>
        <div class="user-info-text" style="display: inline-block">
          <span class="font-key">性别:</span>
          <el-tag style="margin-left: 80px"> {{ user.sex }}</el-tag>
        </div>
        <div class="user-info-text">
          <span class="font-key">意向城市:</span>
          <span class="font-value">{{ user.intendedCity }}</span>
        </div>
        <div class="user-info-text">
          <span class="font-key">真实姓名:</span>
          <span class="font-value">{{ user.identityName }}</span>
        </div>
        <div class="user-info-text">
          <span class="font-key">身份证号:</span>
          <span class="font-value">{{ user.identityNo }}</span>
        </div>
        <div class="user-info-text" style="display: inline-block">
          <span class="font-key">认证状态:</span>
          <el-tag v-if="user.identityStatus==='已认证'" type="primary" style="margin-left: 50px"> {{
              user.identityStatus
            }}
          </el-tag>
          <el-tag v-else type="danger" style="margin-left: 50px"> {{ user.identityStatus }}</el-tag>
        </div>
      </div>
      <div style="text-align: left;margin-top: 10px">
        <span class="font-key">个性签名:</span>
      </div>
      <div style="margin-top: 7px">
        <span class="font-value">{{ user.remark }}</span>
      </div>
      <div style="margin: 20px 60px;float: right">
        <el-button>身份认证</el-button>
        <el-button type="primary" @click="handleUpdate">修改资料</el-button>
      </div>
    </el-card>

    <div>
      <el-dialog
          title="个人资料"
          :visible.sync="userInfoFormVisible"
          width="500px"
          append-to-body
      >
        <el-form
            :model="userInfoForm"
            label-width="80px"
        >
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfoForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户性别">
            <el-select v-model="userInfoForm.sex">
              <el-option label="男性" value="1"></el-option>
              <el-option label="女性" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="意向城市">
            <area-cascader type="text"
                           class="area"
                           v-model="selected"
                           placeholder="城市"
                           :data="pca"
                           @change="handleCityChange"/>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input type="textarea" :rows="6" v-model="userInfoForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import store from "@/store";
import {Message} from "element-ui";
import {updateUser} from "@/api/user";
import {pca} from "area-data";

export default {
  name: "user",
  data() {
    return {
      user: {},
      headers: {
        Authorization: this.$store.state.token
      },
      userInfoForm: {
        nickname: '',
        sex: null,
        intendedCity: '',
        remark: ''
      },
      userInfoFormVisible: false,
      pca: pca,
      selected: [],
      loading: false,
    }
  },
  methods: {
    userInfo() {
      this.loading = true
      this.$store.dispatch('getUserInfo').then(resp => {
        this.loading = false;
        this.user = resp.data;
      })
    },
    handleAvatarSuccess(res, file) {
      this.$router.go(0);
    },
    handleUpdate() {
      this.userInfoForm.nickname = this.user.nickname;
      this.userInfoForm.sex = this.user.sex;
      this.userInfoForm.remark = this.user.remark;
      this.selected[0] = '';
      this.selected[1] = this.user.intendedCity;
      this.userInfoFormVisible = true;
    },
    handleCancel() {
      this.userInfoForm = {}
      this.userInfoFormVisible = false;
    },
    updateSubmit() {
      this.$confirm('修改个人资料需要重新登录,您确定要修改吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateUser(this.userInfoForm).then(resp => {
          Message.success('修改成功');
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
    handleCityChange(val) {
      if (val[0] === '北京市'
          || val[0] === '天津市'
          || val[0] === '重庆市'
          || val[0] === '上海市') {
        this.userInfoForm.intendedCity = val[0];
      } else {
        this.userInfoForm.intendedCity = val[1];
      }
    }
  },
  mounted() {
    this.userInfo();
  }
}
</script>

<style scoped>
.box-card {
  width: 700px;
  display: inline-block;
}

.font-key {
  width: 100px;
  font-size: 14px;
  color: #999999;
}

.font-value {
  margin-left: 20px;
}

.user-info-text {
  padding: 10px;
  display: flex;
}

.area >>> .area-selected-trigger {
  display: inline;
}

</style>
