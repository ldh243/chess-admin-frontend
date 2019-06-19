<template>
  <div>
    <v-card>
      <v-toolbar color="blue" dark>
        <v-toolbar-title>Bài tập 1</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-text-field box label="Câu hỏi" value></v-text-field>
      </v-card-text>
      <div class="div">
        <v-card-text>
          <v-textarea box label="Tự động tạo thế cờ: " value></v-textarea>
          <v-btn color="blue-grey" class="white--text">Bắt Đầu</v-btn>
          <v-divider class="my-2"></v-divider>
        </v-card-text>

        <v-card-text>
          <v-textarea box label="Đáp án:  " value></v-textarea>
          <v-btn color="blue-grey" class="white--text">Cập nhật</v-btn>
          <v-btn color="blue-grey" class="white--text">Xóa</v-btn>
        </v-card-text>
      </div>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" depressed>Xong</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  }
}
</script>

<style>
.div {
  width: 50%;
}
.div1 {
  width: 50%;
  height: 30px;
}
</style>
