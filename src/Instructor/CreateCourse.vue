<template>
  <div>
    <v-card>
      <v-card-text>
        <v-text-field box label="Tên khóa học" value></v-text-field>
      </v-card-text>
      <div>
        <div>
          <v-card-text>
            <v-textarea box label="Mô tả: " value></v-textarea>
            <v-divider class="my-2"></v-divider>
          </v-card-text>
        </div>
        <div>
          <v-btn color="blue-grey" class="white--text">Thêm câu hỏi</v-btn>
          <v-btn color="blue-grey" class="white--text">Thêm bài tập</v-btn>
        </div>

        <!-- <v-card-text>
          <v-textarea box label="Đáp án:  " value></v-textarea>
          <v-btn color="blue-grey" class="white--text">Cập nhật</v-btn>
          <v-btn color="blue-grey" class="white--text">Xóa</v-btn>
        </v-card-text>-->
      </div>
    </v-card>

    <v-card-text>
      <CreateInteractiveLesson/>
    </v-card-text>
  </div>
</template>

<script>
import CreateInteractiveLesson from '@/Instructor/CreateInteractiveLesson'
export default {
  components: {
    CreateInteractiveLesson
  },
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
  text-align: center;
}
.div2 {
  padding-top: 50px;
}
</style>
