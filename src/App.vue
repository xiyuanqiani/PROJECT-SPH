<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  components: { Header, Footer },
  mounted() {
    // 组件挂载完毕，只发送一次发送请求（优化）
    this.$store.dispatch("categoryList");
  },
};
</script>

<style></style>
