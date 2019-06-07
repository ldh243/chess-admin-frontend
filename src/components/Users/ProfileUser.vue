<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-sheet color="grey lighten-3" height="460">
        <v-flex xs12 d-flex>
          <v-avatar class="mx-auto d-block" size="130">
            <img src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg">
          </v-avatar>
        </v-flex>
      </v-sheet>
      <v-flex xs10 md6>
        <v-form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12 md12>
                <h2>Thông tin tài khoản</h2>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  class="purple-input"
                  label="Tên tài khoản"
                  value="ChessOnline"
                  disabled
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Địa chỉ Email"
                  class="purple-input"
                  value="chessonline@gmail.com"
                  disabled
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Họ và tên" class="purple-input" value/>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Số điện thoại" class="purple-input" value/>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Địa chỉ" class="purple-input" value/>
              </v-flex>
              <v-flex xs12 class="s1">
                <h4>Số điểm hiện có của bạn là: {{point}}</h4>
              </v-flex>
              <v-flex xs12>
                <router-link to="/dashboard">Các khóa học hiện có</router-link>
              </v-flex>
              <v-flex xs12 text-xs-right>
                <v-btn class="mx-0 font-weight-light" color="green">Lưu thay đổi</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      point: 100
    }
  }
}
</script>

<style>
.s1 {
  font-size: '50';
  color: chocolate;
}
</style>
