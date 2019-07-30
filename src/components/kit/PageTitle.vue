<template>
    <v-card-title>
      <h5 class="text-uppercase grey--text text--darken-2">{{title}}</h5>
      <v-spacer></v-spacer>
          <v-flex xs3>
            <v-text-field label="Tìm kiếm" v-model="search" append-icon="search" color="grey darken-1"></v-text-field>
          </v-flex>
    </v-card-title>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>

</style>
