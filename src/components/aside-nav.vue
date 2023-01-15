<template>
  <div>
    <el-menu
        router
        :default-openeds="['1']"
        :default-active="this.$route.path">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-user"></i>资料管理</template>
        <el-menu-item-group>
          <el-menu-item index="/home/user/info">个人资料</el-menu-item>
          <el-menu-item index="/home/user/pass">修改密码</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-custom"></i>租客管理</template>
        <el-menu-item-group>
          <el-menu-item index="/home/tenant/order">我的订单</el-menu-item>
          <el-menu-item index="/home/tenant/">我的合同</el-menu-item>
          <el-menu-item index="/home/tenant/">缴费账单</el-menu-item>
          <el-menu-item index="/home/tenant/">支付记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>房东管理</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">发布房源</el-menu-item>
          <el-menu-item index="3-2">我的房源</el-menu-item>
          <el-menu-item index="3-3">我的订单</el-menu-item>
          <el-menu-item index="3-4">我的租客</el-menu-item>
          <el-menu-item index="3-5">收租记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "aside-nav"
}
</script>

<style scoped>

</style>
