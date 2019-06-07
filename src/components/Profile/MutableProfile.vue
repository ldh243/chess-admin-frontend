<template>
  <v-form ref="form" lazy-validation>
    <v-card class="hide-overflow">
      <v-toolbar card>
        <v-icon>perm_contact_calendar</v-icon>
        <v-toolbar-title class="font-weight-light"
          >Thông tin liên lạc</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn color="darken-3" fab small @click="isEditing = !isEditing">
          <v-icon v-if="isEditing">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          v-model="phoneNumber"
          prefix="+84"
          :disabled="!isEditing"
          :rules="phoneRules"
          label="Số điện thoại"
          required
        ></v-text-field>
        <v-text-field
          v-model="website"
          :disabled="!isEditing"
          :rules="websiteRules"
          label="Website"
          required
        ></v-text-field>
        <v-select
          v-model="province"
          :items="listCity"
          :disabled="!isEditing"
          :rules="provinceRules"
          label="Tỉnh (Thành phố)"
        ></v-select>
        <v-select
          v-model="district"
          :items="listCity"
          :rules="districtRules"
          :disabled="!isEditing"
          label="Quận (Huyện)"
        ></v-select>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!isEditing" color="success" @click="save">Lưu</v-btn>
      </v-card-actions>
      <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left
        >Thông tin đã được cập nhật</v-snackbar
      >
    </v-card>
  </v-form>
</template>

<script>
import listCity from '@/data/city.json'
export default {
  data() {
    return {
      phoneNumber: '',
      website: '',
      province: '',
      district: '',
      websiteRules: [
        v => !!v || 'Vui lòng điền website',
        v =>
          /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi.test(
            v
          ) || 'Website không hợp lệ'
      ],
      provinceRules: [v => !!v || 'Vui lòng chọn Tỉnh (Thành phố)'],
      districtRules: [v => !!v || 'Vui lòng chọn Quận (Huyện)'],
      phoneRules: [
        v => !!v || 'Vui lòng điền số điện thoại',
        v => /^[0-9]{9}$/.test(v) || 'Số điện thoại không hợp lệ'
      ],
      hasSaved: false,
      isEditing: null,
      listCity
    }
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        this.isEditing = !this.isEditing
        this.hasSaved = true
      }
    }
  }
}
</script>

<style></style>
