<template>
  <div>
    <!-- <v-layout row pa-3>
      <v-expansion-panel popout>
        <v-expansion-panel-content v-for="(item, index) in lessonView" :key="index" class="mb-1">
          <template v-slot:header>
            <div class="course-title">Bài {{ index + 1 }}: {{ item.name }}</div>
            <v-spacer></v-spacer>
          </template>
          <v-card>
            <v-card-text>{{ item.lessonTypeName }}</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>-->
    <v-hover v-for="(item, index) in lessonView">
      <v-card slot-scope="{ hover }" class="black--text" :class="`elevation-${hover ? 12 : 2}`">
        <v-card-actions>
          <v-layout>
            <v-flex xs8 pa-1>
              <v-flex>
                <div class="course-title">
                  <strong>Bài {{ index + 1 }}: {{ item.name }}</strong>
                </div>
              </v-flex>
              <v-flex>
                <span>{{item.lessonTypeName }}</span>
              </v-flex>
            </v-flex>
            <v-flex xs4>
              <v-btn flat fab dark color="black">
                <v-icon dark>fa-edit</v-icon>
              </v-btn>
              <v-btn fab flat dark color="black">
                <v-icon dark>fa-trash</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-hover>
    <Loader v-if="loader" />
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const lessonRepository = RepositoryFactory.get('lesson')
export default {
  components: {
    Loader
  },
  props: {
    lessonView: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      lessonDetails: null,
      loader: false
    }
  },
  methods: {
    async getLessonById(lessonId) {
      const { data } = await lessonRepository.getById(lessonId)
      this.lessonDetails = data.data
    }
  }
}
</script>

<style>
</style>
