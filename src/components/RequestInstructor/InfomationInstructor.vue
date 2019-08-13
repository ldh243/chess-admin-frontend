<template>
  <v-card>
    <v-form ref="form" class="pa-4">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-avatar :size="100" color="grey lighten-4">
          <img :src="detailUser.avatar" alt="avatar" />
        </v-avatar>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-text-field v-model="detailUser.email" label="E-mail" readonly></v-text-field>
      <v-text-field v-model="detailUser.fullName" label="Họ và tên" readonly></v-text-field>
      <v-slide-y-transition>
        <v-textarea v-model="detailUser.achievement" outline name="input-7-4" label="Thành tích"></v-textarea>
      </v-slide-y-transition>
      <v-card-title>
        <v-spacer></v-spacer>
        <h2>Giấy Chứng Nhận</h2>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-slide-y-transition>
        <v-layout>
          <v-flex xs12>
            <v-card>
              <v-container grid-list-sm fluid>
                <v-layout row wrap>
                  <v-flex v-for="(item, index) in certificates" :key="index" xs3 pa-2>
                    <v-hover>
                      <v-card class="black--text">
                        <v-img
                          @click="showConfirmImage(item)"
                          :src="item.certificateLink"
                          height="175px"
                          class="grey lighten-2"
                        ></v-img>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-slide-y-transition>
    </v-form>
  </v-card>
</template>

<script>
import { log } from 'util'
export default {
  props: {
    detailUser: {
      type: Object,
      default: {}
    },
    certificates: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      imageUrl: []
    }
  },
  methods: {
    showConfirmImage(item) {
      this.imageUrl = this.certificates.find(
        certificates => certificates.certificateId === item.certificateId
      )
      this.$swal({
        title: 'Giấy chứng nhận',
        imageUrl: this.imageUrl.certificateLink,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        animation: false
      })
    }
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
