<template>
  <v-form ref="form" lazy-validation>
    <v-card :elevation="8">
      <v-toolbar flat>
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="font-weight-light">Thông tin cá nhân</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text v-if="$store.state.user != null">
        <v-text-field :value="$store.state.user.email" disabled color="success" label="E-mail"></v-text-field>
        <v-text-field :value="$store.state.user.fullName" disabled label="Họ và tên"></v-text-field>
        <v-text-field :value="$store.state.user.roleName" disabled label="Vai trò"></v-text-field>
        <v-text-field :value="$store.state.user.status" disabled label="Trạng thái"></v-text-field>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped>
.v-card {
  border-radius: 10px;
}
>>> input {
  color: #757575 !important;
}
</style>
