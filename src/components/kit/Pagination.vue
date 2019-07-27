<template>
  <div class="text-xs-center pt-2">
    <v-layout justify-center>
      <v-pagination color="amber accent-3" v-model="pagination.page" :length="pages" circle></v-pagination>
    </v-layout>
  </div>
</template>

<script>
export default {
    props: {
        pages: {
            type: Number,
            default: 0
        }
    },
  data() {
    return {
      pagination: {
        rowsPerPage: 10
      },
    }
  }
}
</script>

<style>
.v-pagination__item {
  outline: 0 !important;
}
</style>
