<template>
  <v-container fluid>
    <v-card-title>
      <h2>Quản lý tài khoản</h2>
    </v-card-title>
    <UserDataTable/>
  </v-container>
</template>

<script>
import UserDataTable from '@/components/Users/UserDataTable'
export default {
  components: {
    UserDataTable
  }
}
</script>

<style></style>
