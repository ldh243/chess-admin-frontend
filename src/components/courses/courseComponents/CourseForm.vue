<template>
    <v-card elevation="8">
      <CourseBackground :backgroundImage="backgroundImage" :title="'Tạo khóa học mới'" />
      <v-card-actions class="px-5 py-3" v-if="editedCourse !== null">
        <v-chip label dark :color="courseStatusColor[course.statusId - 1]">{{courseStatusName}}</v-chip>
        <v-chip label class="ml-1" v-for="(item, index) in course.listCategorys" :key="index">{{item.name}}</v-chip>
        <v-spacer></v-spacer>
        <v-btn color="darken-3" fab small @click="isEditingCourse = !isEditingCourse">
          <v-icon v-if="isEditingCourse">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </v-card-actions>
      <v-form ref="form" lazy-validation>
        <v-container class="pa-5" grid-list-xs>
          <v-layout wrap>
            <v-flex xs8>
              <v-text-field
              :disabled="editedCourse !== null && !isEditingCourse"
                color="amber darken-1"
                v-model="course.name"
                label="Tên khóa học"
                :rules="nameRules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-text-field
              :disabled="editedCourse !== null && !isEditingCourse"
                v-model="course.requiredPoint"
                label="Điểm để học"
                required
                color="amber darken-1"
                :rules="pointRules"
              ></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-text-field
              :disabled="editedCourse !== null && !isEditingCourse"
                v-model="course.point"
                label="Điểm nhận được"
                required
                color="amber darken-1"
                :rules="pointRules"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
              :disabled="editedCourse !== null && !isEditingCourse"
                v-model="course.description"
                label="Mô tả: "
                value
                required
                color="amber darken-1"
                :rules="descriptionRules"
              ></v-textarea>
            </v-flex>
            <v-flex xs12 v-if="editedCourse === null">
              <v-select
                v-model="course.listCategoryIds"
                :items="listCategories"
                item-text="name"
                item-value="categoryId"
                multiple
                chips
                label="Danh mục"
                color="amber darken-1"
                item-color="amber darken-1"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-divider class="my-2" v-if="editedCourse === null"></v-divider>
      <v-card-actions class="px-5" v-if="editedCourse === null">
        <v-spacer></v-spacer>
        <v-btn depressed  dark @click="resetForm" color="amber darken-2">Xóa toàn bộ</v-btn>
        <v-btn @click="createCourse" depressed dark color="amber darken-4">Hoàn tất</v-btn>
      </v-card-actions>
    </v-card>    
</template>
<script>
import CourseBackground from './CourseBackground'
import { mapState } from 'vuex'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const categoryRepository = RepositoryFactory.get('category')
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    CourseBackground
  },
  props: {
    courseImage: {
      type: File,
      default: null
    },
    editedCourse: {
      type: Object,
      default: null
    }
  },
  watch: {
    courseImage: function() {
      this.backgroundImage = window.URL.createObjectURL(this.courseImage)
    },
    editedCourse: function() {
      console.log(this.editedCourse)
      if (this.editedCourse !== null) {
        this.course = this.editedCourse
        this.backgroundImage = this.course.image
        this.courseStatusName = this.getCourseRoleName(this.course.statusId)
      }
    }
  },
  data() {
    return {
      image: [],
      valueName: '',
      email: this.$store.state.user.email,
      loader: false,
      course: {
        name: '',
        requiredPoint: 0,
        point: 0,
        description: '',
        listCategoryIds: [],
        image: ''
      },
      
      listCategories: [],
      nameRules: [v => !!v || 'Tên khóa học không được để trống'],
      pointRules: [v => /^\d+$/.test(v) || 'Điểm phải là giá trị số'],
      descriptionRules: [v => !!v || 'Mô tả khóa học không được để trống'],
      backgroundImage: '',
      courseStatusColor: ['yellow darken-4', 'green', 'red', 'orange darken-4', 'red darken-3'],
      courseStatusName: '',
      isEditingCourse: false
    }
  },
  mounted() {
    this.loader = true
    this.getCategories()
    if (this.editedCourse !== null) {
      this.course = this.editedCourse
      this.backgroundImage = this.course.image
      this.listCategories = this.course.listCategorys
      this.courseStatusName = this.getCourseRoleName(this.course.statusId)
    }
    this.loader = false
  },
  computed: {},
  methods: {
    resetForm() {
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
    async getCategories() {
      const { data } = await categoryRepository.getCategories()
      this.listCategories = data.data
    },
    async createCourse() {
      if (this.$refs.form.validate()) {
        let match = this.$store.state.user.email.match(/^([^@]*)/)
        let courseSlug = this.course.name.toLowerCase().split(" ").join('-')
        this.course.image = await this.uploadImageByFile(this.courseImage, courseSlug, `courses/${match[0]}`)
        const {data} = await courseRepository.createCourse(this.course)
      }
    },
    getCourseImage(file) {
      this.image = file
    }
  }
}
</script>
<style scoped>

</style>