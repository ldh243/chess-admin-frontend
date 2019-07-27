<template>
  <v-card :elevation="8">
    <v-img :src="backgroundImage" height="200px"></v-img>
    <div class="avatar-container justify-center align-center">
      <v-avatar :size="100">
      <img :src="$store.state.user.avatar" alt="avatar">
    </v-avatar>
    </div>
    <v-card-text class="profile-highlight-container">
      <p class="mb-0 headline font-weight-medium grey--text text--darken-2">{{$store.state.user.fullName}}</p>
      <p class="body-1 font-weight-medium grey--text">{{$store.state.user.roleName}}</p>
    </v-card-text>
    <!-- <v-toolbar flat>
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="font-weight-light">Thông tin cá nhân</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text v-if="$store.state.user != null">
        <v-text-field :value="$store.state.user.email" disabled color="success" label="E-mail"></v-text-field>
        <v-text-field :value="$store.state.user.fullName" disabled label="Họ và tên"></v-text-field>
        <v-text-field :value="$store.state.user.roleName" disabled label="Vai trò"></v-text-field>
        <v-text-field :value="$store.state.user.status" disabled label="Trạng thái"></v-text-field>
    </v-card-text>-->
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      randomBg: 1,
      backgroundImage: require(`@/assets/images/chess-user-bg1.jpg`)
    }
  },
  created() {
    this.randomBg = Math.floor(Math.random() * Math.floor(5))
    this.backgroundImage = require(`@/assets/images/chess-user-bg${this.randomBg}.jpg`)
  }
}
</script>

<style scoped>
.avatar-container {
  width: 110px;
  height: 110px;
  position: absolute;
  left: 50%;
  top: 200px;
  transform: translate(-50%, -50%);
  border-radius: 50% !important;
  background-color: #fff;
  display: flex;
}
.v-avatar {
  align-items: center;
}
.profile-highlight-container {
  padding-top: 65px;
}
.profile-highlight-container p {
  text-align: center;
}
>>> input {
  color: #757575 !important;
}
</style>
