<template>
  <v-container fluid>
    <v-card-title>
      <h2>Quản lý danh mục</h2>
    </v-card-title>
    <CategoryDataTable/>
  </v-container>
</template>

<script>
import CategoryDataTable from '@/components/Category/CategoryDataTable'
export default {
  components: {
    CategoryDataTable
  }
}
</script>

<style scoped>
.course-item {
  flex-basis: 32.6666666%;
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
}
</style>
