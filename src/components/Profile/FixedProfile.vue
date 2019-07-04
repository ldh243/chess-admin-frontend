<template>
  <v-form ref="form" lazy-validation>
    <v-card class="hide-overflow">
      <v-toolbar card>
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="font-weight-light">Thông tin cá nhân</v-toolbar-title>
      </v-toolbar>
      <v-card-text v-if="$store.state.user != null">
        <v-text-field :value="$store.state.user.email" disabled color="success" label="E-mail"></v-text-field>
        <v-text-field :value="$store.state.user.fullName" disabled label="Họ và tên"></v-text-field>
        <v-text-field :value="$store.state.user.roleName" disabled label="Vai trò"></v-text-field>
        <v-text-field :value="$store.state.user.status" disabled label="Trạng thái"></v-text-field>
      </v-card-text>

      <v-divider></v-divider>
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
>>> input {
  color: #757575 !important;
}
</style>
