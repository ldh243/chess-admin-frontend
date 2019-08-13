<template>
  <div>
    <v-container>
      <v-card>
        <v-card-text>
          <v-text-field :value="courseDetails.name" readonly outline label="Tên khóa học"></v-text-field>
          <v-divider class="my-2"></v-divider>
        </v-card-text>

        <v-card-text>
          <v-textarea :value="courseDetails.description" readonly outline label="Mô tả: "></v-textarea>
          <v-divider class="my-2"></v-divider>
        </v-card-text>
        <v-layout>
          <v-flex xs6>
            <v-card-text>
              <v-text-field :value="courseDetails.point" outline readonly label="Điểm để học"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text>
              <v-select
                v-model="listcategorys"
                :items="listcategorys"
                readonly
                item-text="name"
                item-value="categoryId"
                multiple
                chips
                label="Danh mục"
              ></v-select>
            </v-card-text>
          </v-flex>
        </v-layout>

        <v-card-text>
          <h2 class="text-xs-center fontWord">Hình Ảnh</h2>
          <v-spacer></v-spacer>
          <v-flex xs3>
            <v-img :src="courseDetails.image" height="175px"></v-img>
          </v-flex>
          <v-spacer></v-spacer>
          <v-divider class="my-2"></v-divider>
        </v-card-text>
        <v-card-text>
          <v-alert
            :value="true"
            color="cyan"
            border="left"
            elevation="2"
            colored-border
            icon="mdi-twitter"
          >
            <strong>Số bài học hiện có: {{courseDetails.totalLesson}}</strong>
          </v-alert>
          <DetailsLesson :lessonView="courseDetails.lessonViewModels" />
        </v-card-text>
      </v-card>
    </v-container>
    <Loader v-if="loader" />
  </div>
</template>

<script>
import DetailsLesson from '@/components/Courses/DetailsLesson'
import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { async } from 'q'
export default {
  components: {
    DetailsLesson,
    Loader
  },
  props: {
    courseDetails: {
      type: Object,
      default: {}
    },
    listcategorys: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      dialog: false,
      loader: false,
      createLesson: '',
      listNameCategory: []
    }
  },
  methods: {}
}
</script>

<style>
.create {
  text-align: center;
}
.fontWord {
  font-family: Comic Sans MS;
}
.fontWordBtn {
  font-family: Tahoma;
}
</style>
