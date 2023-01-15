<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <aside-nav/>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AsideNav from "@/components/aside-nav";
export default {
  name: "home",
  components: {AsideNav},
}
</script>

<style scoped>

</style>
