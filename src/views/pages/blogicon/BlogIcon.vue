<template>
  <div>
    <h1>Blog界面管理</h1>
    <el-breadcrumb separator="/" style="margin-bottom: 15px">
      <el-breadcrumb-item :to="{ path: '/admin/blog/create' }">Blog编辑</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/blog/list' }">图标列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card" style="box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15)">
      <router-view :key="$route.path"></router-view>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="css">

</style>
