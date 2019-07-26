<template>
      <div class="black--text xs12 mx-auto course-item">
        <v-layout>
          <v-flex course-item__image--wrapper xs3 shrink>
            <v-img :src="content.courseImage" height="180"></v-img>
          </v-flex>
          <v-flex xs8 >
            <v-card-title primary-title class="pt-2">
              <v-flex xs12>
                <p class="mb-0 course-title">{{ content.courseName }}</p>
                <p class="mb-0 course-author">{{ content.author.fullName }}</p>
                <v-card-actions class="px-0">
                  <v-rating
                    dense
                    v-model="content.rating"
                    readonly
                    small
                    empty-icon="$vuetify.icons.ratingFull"
                    half-increments
                  ></v-rating>
                  <span class="course-score">{{ content.rating }}</span>
                  <span class="ml-2 course-total-rate">(1724)</span>
                </v-card-actions>
              </v-flex>
              <v-flex xs12></v-flex>
            </v-card-title>
          </v-flex>
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out white darken-4 v-card--reveal display-3 white--text"
              style="height: 100%;"
            >
              <v-flex class="align-center justify-center">
                <v-btn @click="goToCourseDetail()" class="ma-0" flat fab dark color="grey">
                  <v-icon dark>fa-edit</v-icon>
                </v-btn>
                <v-btn v-if="content.statusId == 3" fab flat dark color="grey">
                  <v-icon dark>fa-trash</v-icon>
                </v-btn>
                <v-btn v-else @click="dialog = !dialog" fab flat dark color="grey">
                  <v-icon dark>fa-trash</v-icon>
                </v-btn>
              </v-flex>
            </div>
          </v-expand-transition>
        </v-layout>
        <!-- <v-divider light></v-divider>
        <v-card-actions class="px-3">
          <span class="course-point">{{ content.point }} điểm</span>
          <v-spacer></v-spacer>
          <span class="course-status">Trạng thái: {{ content.statusName }}</span>
        </v-card-actions> -->
      </div>
    <!-- Dialog Remove Course-->
    <!-- <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">XÓA KHÓA HỌC</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-flex>
              <v-card-text>Bạn có chắc chắn muốn xóa khóa học {{content.courseName}}</v-card-text>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" color="blue darken-1" flat>Hủy</v-btn>
          <v-btn
            @click="removeCourse(content.courseId), dialog = false,  refreshPage()"
            color="blue darken-1"
            flat
          >Đồng Ý</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <!-- <Loader v-if="loader" /> -->
</template>

<script>
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import Loader from '@/components/Loader'
const courseRepository = RepositoryFactory.get('course')
export default {
  props: {
    content: Object
  },
  components: {
    Loader
  },
  data() {
    return {
      loader: false,
      dialog: false,
      listCourse: [],
      courseId: ''
    }
  },
  methods: {
    // refreshPage() {
    //   window.location.reload()
    // },
    // async removeCourse() {
    //   const { data } = await courseRepository.removeCourse(
    //     this.content.courseId
    //   )
    //   console.log(data)
    // },
    // goToCourseDetail() {
    //   this.$router.push(`/dashboard/instructorCourse/${this.content.courseId}`)
    // }
  }
}
</script>

<style scoped>
.course-item__image--wrapper, .course-item__image--wrapper .v-image {
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
/* .course-author {
  font-size: 14px;
  color: #686f7a;
}
.course-title {
  font-size: 17px;
  font-weight: 700;
  line-height: 32px !important;
  letter-spacing: normal !important;
  font-family: 'Open Sans', sans-serif !important;
}
.v-rating .v-icon {
  padding: 3px;
}

.course-score {
  font-weight: 600px;
  color: #505763;
  font-size: 20px;
}

.course-total-rate {
  font-size: 12px;
  font-weight: 400;
  color: #686f7a;
} */
/* .course-point {
  float: left;
  font-size: 18px;
  color: #29303b;
  font-weight: 600;
}
.course-status {
  float: left;
  font-size: 13px;
  color: red;
  font-weight: 600;
} */
/* .v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
.v-card--reveal .flex {
  position: absolute;
  opacity: 1;
}
.v-card--reveal .flex .v-btn {
  opacity: 1;
} */
</style>
