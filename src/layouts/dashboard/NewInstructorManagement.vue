<template>
  <v-container>
    <PageTitle :title="'Giảng viên mới'" />
    <v-container>
      <v-layout wrap justify-space-between>
        <v-flex class="new-instructor-item" xs6 xl4 mb-5>
          <NewInstructorItem />
        </v-flex>
        <v-flex class="new-instructor-item" xs6 xl4 mb-5>
          <NewInstructorItem />
        </v-flex>
        <v-flex class="new-instructor-item" xs6 xl4 mb-5>
          <NewInstructorItem />
        </v-flex>
      </v-layout>
      <Pagination />
    </v-container>
  </v-container>
</template>

<script>
import PageTitle from '@/components/kit/PageTitle'
import NewInstructorItem from '@/components/Instructor/NewInstructorItem'
import Pagination from '@/components/kit/Pagination'
export default {
  components: {
    PageTitle,
    NewInstructorItem,
    Pagination
  }
}
</script>

<style>
.flex.xs6.new-instructor-item {
  max-width: 49%;
}
@media (min-width: 1904px) {
  .flex.xl4.new-instructor-item {
    max-width: 32.5%;
  }
}
</style>
