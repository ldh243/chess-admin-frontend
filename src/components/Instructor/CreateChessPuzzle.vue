<template>
  <div>
    <v-layout row>
      <v-flex xs10>
        <chessboard :fen="currentFen" :orientation="chessColor" @onMove="showInfo" />
      </v-flex>
      <v-flex xs1 style="margin: auto">
        <v-btn @click="flipBoard" flat icon small color="grey">
          <v-icon>fa-redo-alt</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-flex xs12>
      <v-card-title class="px-0">
        <span class="subheading font-weight-bold">Chọn cánh nhập thành và nước đi trước đó (nếu có)</span>
      </v-card-title>
      <v-layout row>
        <v-flex xs10>
          <v-btn-toggle class="btn-castling-group" v-model="castling" multiple>
            <v-btn :value="0" class="btn-castling mr-1 white king pick-color"></v-btn>
            <v-btn :value="1" class="btn-castling mr-1 queen white pick-color"></v-btn>
            <v-btn :value="2" class="btn-castling mr-1 king black pick-color"></v-btn>
            <v-btn :value="3" class="btn-castling queen black pick-color"></v-btn>
          </v-btn-toggle>
        </v-flex>
        <v-flex xs2>
          <v-text-field class="ml-2" regular hide-details></v-text-field>
        </v-flex>
      </v-layout>
      <v-text-field class="mt-2" regular hide-details label="Chuỗi FEN"></v-text-field>
    </v-flex>
  </div>
</template>

<script>
import Chessboard from '@/components/plugins/cols-chessboard/index.vue'
export default {
  components: {
    Chessboard
  },
  data() {
    return {
      userColors: ['black', 'white'],
      chessColor: 'white',
      chessColors: '',
      indexColor: 0,
      castling: [0, 1, 2, 3]
    }
  },
  created() {},
  methods: {
    flipBoard() {
      this.chessColor = this.chessColor === 'white' ? 'black' : 'white'
    },
    exampleChess(exampleFen) {
      this.currentFen = exampleFen[this.currentStep]
      this.lessonViewModel.interactiveLesson.initCode =
        exampleFen[this.currentStep++]
      if (this.currentStep >= exampleFen.length) {
        return (this.currentStep = 0)
      }
      console.log(this.currentStep)
    },
    getIdNumberOfMove(divTarget) {
      return parseInt(divTarget.id.replace('move-', ''))
    },
    getMoveByIdNumber() {
      return document.getElementById('move-' + this.currentMove)
    },
    turnToNextMove() {
      if (this.currentMove !== this.totalMove) {
        this.currentMove++
        const divTarget = this.getMoveByIdNumber()
        divTarget.click()
        this.updateMove = false
        this.setCurrentMove()
      }
    },
    turnToLastMove() {
      if (this.currentMove !== this.totalMove) {
        this.currentMove = this.totalMove
        const divTarget = this.getMoveByIdNumber()
        divTarget.click()
        this.updateMove = false
        this.setCurrentMove()
      }
    },
    turnToPreviousMove() {
      if (this.currentMove > 1) {
        this.currentMove--
        const divTarget = this.getMoveByIdNumber()
        divTarget.click()
        this.updateMove = false
        this.setCurrentMove()
      }
    },
    turnToFirstMove() {
      if (this.currentMove > 1) {
        this.currentMove = 1
        const divTarget = this.getMoveByIdNumber()
        divTarget.click()
        this.updateMove = false
        this.setCurrentMove()
      }
    },
    turnToNextLesson() {
      if (this.activeLesson < this.lessons.length - 1) {
        this.activeLesson++
        this.loader = true
        this.resetBoardAndResetHistory()
        this.getLessonById()
        this.checkStatusDirectLesson()
        this.loader = false
      }
    },
    turnToPreviousLesson() {
      if (this.activeLesson >= 1) {
        this.activeLesson--
        this.loader = true
        this.resetBoardAndResetHistory()
        this.getLessonById()
        this.checkStatusDirectLesson()
        this.loader = false
      }
    },
    checkStatusDirectLesson() {
      this.statusNextLesson = this.checkStatusNextLesson()
      this.statusPreviousLesson = this.checkStatusPreviousLesson()
    },
    checkStatusNextLesson() {
      if (this.activeLesson === this.lessons.length - 1) {
        return true
      }
      return false
    },
    checkStatusPreviousLesson() {
      if (this.activeLesson <= 0) {
        return true
      }
      return false
    },
    resetBoardAndResetHistory() {
      this.currentFen = ''
      this.moveHistory = []
      this.currentMove = 0
      this.totalMove = 0
    }
  }
}
</script>

<style scoped src="@/assets/style/chessboard.css" >
>>> piece,
.blue {
  background-color: transparent !important;
}
.option_1 {
  text-align: justify;
}
.option_2 {
  color: dimgray;
  font-size: 17px;
}
.btn {
  font-size: 20px;
}
</style>
