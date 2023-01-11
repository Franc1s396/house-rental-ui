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
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          style="margin-right: 10px"
          @select="handleSelect"
          text-color="#000000">

        <el-menu-item index="1">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">城市</template>
          <el-menu-item index="2-1">北京</el-menu-item>
          <el-menu-item index="2-2">上海</el-menu-item>
          <el-menu-item index="2-3">广州</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">租房</el-menu-item>
      </el-menu>
      <div v-if="!isLogin" class="header_right">
        <span style="color: black;font-size: 14px" @click="goLogin">
          登录/注册</span>
      </div>
      <div v-else class="header_right">
        <el-avatar
            :size="50"
            :src="userInfo.avatarUrl"
            style="margin: 0 15px"
        ></el-avatar>
        <el-dropdown class="userInfo">
          <span class="el-dropdown-link">{{ userInfo.nickname }}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">资料管理</el-dropdown-item>
            <el-dropdown-item command="setting">房源发布</el-dropdown-item>
            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "head-nav",
  data() {
    return {
      userInfo: {
        nickname: '',
        avatarUrl: '',
      },
      isLogin: false,
      activeIndex: '1',
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getUserInfo() {
      if (store.getters.token !== undefined) {
        store.dispatch('getUserInfo').then(resp => {
          this.userInfo.nickname = store.state.name
          this.userInfo.avatarUrl = store.state.avatar
        })
        this.isLogin = true
      }
    },
    goLogin() {
      return this.$router.replace('login')
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
</style>
