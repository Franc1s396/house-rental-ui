<template>
  <div class="homeContainer">
    <div
        style="
        display: flex;
        height: 60px;
        line-height: 60px;
        align-items: center;">
      <div
          style="
          display: flex;
          align-items: center;
          margin-left: 200px;
          cursor: pointer;">
        <img
            src="http://manland.liuyanzhao.com/static/front/img/logo.svg"
            style="width: 150px; height: 150px; margin-right: 10px;"
        />
      </div>
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          style="margin-right: 10px"
          @select="handleSelect"
          text-color="#000000">
        <el-menu-item @click="indexRoute">首页</el-menu-item>
      </el-menu>
      <div v-if="!isLogin" class="header_right">
        <el-button style="color: black;font-size: 14px" @click="goLogin">
          登录/注册
        </el-button>
      </div>
      <div v-else class="header_right">
        <el-avatar
            shape="square"
            :size="45"
            :src="userInfo.avatarUrl"
            style="margin: 0 15px"
        ></el-avatar>
        <el-dropdown class="userInfo" @command="handleCommand">
          <span class="el-dropdown-link">{{ userInfo.nickname }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">资料管理</el-dropdown-item>
            <el-dropdown-item command="message">
              消息通知
              <el-badge v-if="messageCount>0" class="mark" :value="messageCount"/>
            </el-dropdown-item>
            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import {Message} from "element-ui";
import {messageCount} from "@/api/support";

export default {
  name: "head-nav",
  data() {
    return {
      userInfo: {
        nickname: '',
        avatarUrl: '',
      },
      isLogin: false,
      messageCount: 0,
    }
  },
  methods: {
    indexRoute() {
      this.$router.push('/index');
    },
    handleSelect(key, keyPath) {
    },
    getUserInfo() {
      if (store.getters.token !== undefined) {
        store.dispatch('getUserInfo').then(resp => {
          this.userInfo.nickname = store.state.name
          this.userInfo.avatarUrl = store.state.avatar
        })
        this.isLogin = true
        this.getMessageCount();
      }
    },
    goLogin() {
      return this.$router.push('/login')
    },
    handleCommand(command) {
      if (command === 'userInfo') {
        this.$router.push('/home/user/info');
      } else if (command === 'message') {
        this.$router.push('/home/message');
      } else if (command === 'logout') {
        this.$confirm('您确定要注销登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('logout').then(resp => {
            Message.success('退出成功')
            this.$router.push('/index');
            this.$router.go(0);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    getMessageCount() {
      messageCount().then(resp => {
        this.messageCount = resp.data;
      })
    },
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.homeContainer {
  background-color: #ffffff;
  border-bottom: solid 1px #e6e6e6;

  .header_right {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 200px;

    li {
      list-style-type: none;
      padding: 0 10px;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.205);
      }
    }
  }
}

.el-dropdown-link {
  cursor: pointer;
}

</style>
