<template>
  <v-container>
    <PageTitle :title="'Quản lý khóa học'"/>
    <v-flex lg12 xl10 justify-center ma-auto>
        <CourseOverview />
    </v-flex>    
  </v-container>
</template>

<script>
import PageTitle from '@/components/kit/PageTitle'
import CourseOverview from '@/components/Instructor/CourseOverview'
export default {
  components: {
    PageTitle,
    CourseOverview
  },
  data() {
    return {
      listCourses: [
        {
          title: 'Khóa học 1',
          author: 'Nguyễn Văn A',
          pointRequire: '300',
          rating: 4.2,
          year: '2011',
          imageURL: require('@/assets/images/chess-course-1.jpg'),
          avatar: require('@/assets/images/avatar-instructor.jpg')
        },
        {
          title: 'Khóa học 2',
          author: 'Nguyễn Văn B',
          pointRequire: '350',
          rating: 2.7,
          imageURL: require('@/assets/images/chess-course-1.jpg'),
          year: '2014',
          avatar: require('@/assets/images/avatar-instructor.jpg')
        },
        {
          title: 'Khóa học 3',
          author: 'Nguyễn Văn C',
          pointRequire: '600',
          rating: 1.9,
          imageURL: require('@/assets/images/chess-course-1.jpg'),
          year: '2015',
          avatar: require('@/assets/images/avatar-instructor.jpg')
        },
        {
          title: 'Khóa học 4',
          author: 'Nguyễn Văn C',
          pointRequire: '150',
          rating: 5,
          imageURL: require('@/assets/images/chess-course-1.jpg'),
          year: '2019',
          avatar: require('@/assets/images/avatar-instructor.jpg')
        },
        {
          title: 'Khóa học 1',
          author: 'Nguyễn Văn A',
          pointRequire: '300',
          rating: 4.2,
          year: '2011',
          imageURL: require('@/assets/images/chess-course-1.jpg'),
          avatar: require('@/assets/images/avatar-instructor.jpg')
        },
        {
          title: 'Khóa học 2',
          author: 'Nguyễn Văn B',
          pointRequire: '350',
          rating: 2.5,
          imageURL: require('@/assets/images/chess-course-1.jpg'),
          year: '2014',
          avatar: require('@/assets/images/avatar-instructor.jpg')
        },
        {
          title: 'Khóa học 3',
          author: 'Nguyễn Văn C',
          pointRequire: '600',
          rating: 1.2,
          imageURL: require('@/assets/images/chess-course-1.jpg'),
          year: '2015',
          avatar: require('@/assets/images/avatar-instructor.jpg')
        },
        {
          title: 'Khóa học 4',
          author: 'Nguyễn Văn C',
          pointRequire: '150',
          rating: 5,
          imageURL: require('@/assets/images/chess-course-1.jpg'),
          year: '2019',
          avatar: require('@/assets/images/avatar-instructor.jpg')
        },
        {
          title: 'Khóa học 1',
          author: 'Nguyễn Văn A',
          pointRequire: '300',
          rating: 4,
          year: '2011',
          imageURL: require('@/assets/images/chess-course-1.jpg'),
          avatar: require('@/assets/images/avatar-instructor.jpg')
        },
        {
          title: 'Khóa học 2',
          author: 'Nguyễn Văn B',
          pointRequire: '350',
          rating: 2,
          imageURL: require('@/assets/images/chess-course-1.jpg'),
          year: '2014',
          avatar: require('@/assets/images/avatar-instructor.jpg')
        },
        {
          title: 'Khóa học 3',
          author: 'Nguyễn Văn C',
          pointRequire: '600',
          rating: 4.3,
          imageURL: require('@/assets/images/chess-course-1.jpg'),
          year: '2015',
          avatar: require('@/assets/images/avatar-instructor.jpg')
        },
        {
          title: 'Khóa học 4',
          author: 'Nguyễn Văn C',
          pointRequire: '150',
          rating: 5,
          imageURL: require('@/assets/images/chess-course-1.jpg'),
          year: '2019',
          avatar: require('@/assets/images/avatar-instructor.jpg')
        }
      ]
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
