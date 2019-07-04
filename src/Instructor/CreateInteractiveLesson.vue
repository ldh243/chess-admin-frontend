<template>
  <div>
    <v-card>
      <v-toolbar color="green">
        <v-toolbar-title>Bài tập 1</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-text-field box label="Câu hỏi" value></v-text-field>
      </v-card-text>
      <div class="div3">
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
        <div class="div2">
          <v-layout row wrap>
            <v-flex>
              <chessboard :show-threats="true" :on-promotion="promote"/>
            </v-flex>
          </v-layout>
        </div>
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
      dialog: false,
      promoteTo: 'q',
      items: ['q', 'b', 'r', 'k']
    }
  },
  created() {},
  methods: {
    async handleData() {
      this.dialog = true

      while (this.dialog === true) {
        await this.sleep(2000)
      }
      console.log('Chon: ' + this.promoteTo)
      return this.promoteTo
    },
    promote() {
      if (confirm('Want to promote to rook? Queen by default')) {
        return 'r'
      } else {
        return 'q'
      }
    },

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
}
</script>

<style scoped>
>>> piece,
.blue {
  background-color: transparent !important;
}
.div {
  float: left;
  width: 50%;
}
.div2 {
  width: 450px;
  float: right;
}
.div3 {
  width: 100%;
  height: 500px;
}
.div1 {
  width: 50%;
  height: 30px;
}
</style>
