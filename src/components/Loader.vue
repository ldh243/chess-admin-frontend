<template>
  <v-dialog v-model="dialog" persistent>
    <div class="text-xs-center">
      <v-progress-circular indeterminate color="primary" :size="60" :width="5"></v-progress-circular>
    </div>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: true
    }
  }
}
</script>

<style scoped>
>>> .v-dialog {
  box-shadow: none !important;
  background-color: transparent;
  height: 120px;
}
</style>
