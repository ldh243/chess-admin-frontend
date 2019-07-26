<template>
  <v-container fluid>
    <v-card-title>
      <h2>Quản lý danh mục</h2>
    </v-card-title>
    <CategoryDataTable />
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
</style>
