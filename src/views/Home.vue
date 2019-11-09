<template>
  <el-container>
    <el-aside>
      <AsideBar :routes="routes"></AsideBar>
    </el-aside>
    <el-main>
      <el-header>
        <HeaderBar></HeaderBar>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import  AsideBar from '@/components/AsideBar.vue';
import HeaderBar from '@/components/HeaderBar.vue';

export default {
  name: "home",
  components: {
    AsideBar,
    HeaderBar
  },
  data() {
    return {

    }
  },
  computed: {
    routes() {
      // console.log(this.$store.state)
      return this.$store.state.routes;
    }
  }
};
</script>
