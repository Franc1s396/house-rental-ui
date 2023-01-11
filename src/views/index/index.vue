<template>
  <div>
    <head-nav/>
    <router-view/>
  </div>
</template>

<script>

import HeadNav from "@/components/head-nav";
export default {
  name: "index",
  components: {HeadNav},
  data() {
    return {}
  },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background-color:#F7F7F7');
  }
}
</script>

<style scoped>

</style>
