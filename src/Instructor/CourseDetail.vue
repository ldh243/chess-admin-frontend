<template>
  <div>
    <v-hover>
      <v-card class="black--text" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
        <v-layout row wrap>
          <v-flex xs12>
            <v-img :src="content.courseImage" height="175px"></v-img>
          </v-flex>
          <v-flex xs12>
            <v-card-title primary-title class="pt-2">
              <v-flex xs12>
                <span class="course-title">{{ content.courseName }}</span>
              </v-flex>
              <v-flex 2>
                <v-avatar :size="50">
                  <img :src="content.authorAvatar">
                </v-avatar>
              </v-flex>
              <v-flex xs9 ml-3>
                <span class="ml-1 course-author">{{ content.authorName }}</span>
                <v-layout row fill-height>
                  <v-flex>
                    <v-rating
                      v-model="content.rating"
                      readonly
                      small
                      empty-icon="$vuetify.icons.ratingFull"
                      half-increments
                    ></v-rating>
                  </v-flex>
                  <v-flex fill-height>
                    <span class="course-score">{{ content.rating }}</span>
                    <span class="ml-2 course-total-rate">(1724)</span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12></v-flex>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-actions class="px-3">
          <span class="course-point">{{ content.point }} điểm</span>
          <v-spacer></v-spacer>
          <v-btn color="info">Chi tiết</v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    content: Object
  }
}
</script>

<style scoped>
.course-author {
  font-size: 14px;
  color: #686f7a;
}
.course-title {
  font-size: 17px;
  font-weight: 600;
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
}
.course-point {
  float: left;
  font-size: 18px;
  color: #29303b;
  font-weight: 600;
}
</style>
