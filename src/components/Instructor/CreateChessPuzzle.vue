<template>
  <v-layout row>
    <v-flex xs6>
      <v-layout row>
        <v-btn style="margin-top:auto;margin-bottom:auto" @click="flipBoard" flat icon color="grey">
          <v-icon>fa-redo-alt</v-icon>
        </v-btn>
        <chessboard :sparePieces="true" @onChangePiece="changePos" :fen="fen" :orientation="chessColor" :boardName="boardName"></chessboard>
    </v-layout>
    <v-card-actions class="justify-center py-0">
      <v-btn style="margin-top:auto;margin-bottom:auto" @click="startBoard" flat icon color="grey">
          <v-icon>fa-play-circle</v-icon>
        </v-btn>
          <v-btn style="margin-top:auto;margin-bottom:auto" @click="clearBoard" flat icon color="grey">
          <v-icon>fa-eraser</v-icon>
        </v-btn>
        </v-card-actions>
    </v-flex>
    <v-flex xs6 pa-3>
      <v-card-title class="px-0">
        <span class="subheading font-weight-bold">Chọn cánh nhập thành</span>
      </v-card-title>
        <v-flex xs12>
          <v-btn-toggle class="btn-castling-group" v-model="castling" multiple>
            <v-btn :value="'K'" class="btn-castling mr-1 white king pick-color"></v-btn>
            <v-btn :value="'Q'" class="btn-castling mr-1 queen white pick-color"></v-btn>
            <v-btn :value="'k'" class="btn-castling mr-1 king black pick-color"></v-btn>
            <v-btn :value="'q'" class="btn-castling queen black pick-color"></v-btn>
          </v-btn-toggle>
        </v-flex>
        <v-flex xs12>
          <v-text-field class="mt-3" v-model="previousMove" @keyup="bindFen" regular hide-details label="Nước đi trước đó"></v-text-field>
          <v-text-field class="mt-3" v-model="fen" regular readonly hide-details label="Chuỗi FEN"></v-text-field>
        </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import Chessboard from '@/components/plugins/cols-chessboard/index.vue'
export default {
  components: {
    Chessboard
  },
  props: {
    boardName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      userColors: ['black', 'white'],
      chessColor: 'white',
      chessColors: '',
      indexColor: 0,
      castling: [],
      fen: '8/8/8/8/8/8/8/8 w - - 0 1',
      previousMove: '-',
      position: {}
    }
  },
  watch: {  
    castling: function(newVal) {
      let castlingVal = ''
      this.castling = newVal
      console.log(this.castling)
      if (this.castling.includes('K')) {
        castlingVal += 'K'
      }
      if (this.castling.includes('Q')) {
        castlingVal += 'Q'
      }
      if (this.castling.includes('k')) {
        castlingVal += 'k'
      }
      if (this.castling.includes('q')) {
        castlingVal += 'q'
      }
      if (this.castling.length === 0) {
        castlingVal = '-'
      }
      let fenArr = this.fen.split(' ')
      this.fen = `${fenArr[0]} ${fenArr[1]} ${castlingVal} ${fenArr[3]} ${fenArr[4]} ${fenArr[5]}`
    },
    fen: function(newFen) {
      this.fen = newFen
      let data = {}
      data['fen'] = this.fen
      data['object'] = this.position
      this.$emit('onChangeFen', data)
    }
  },
  created() {},
  methods: {
    changePos(data) {
      this.position = data.object
      let fenArr = this.fen.split(' ')
      this.fen = `${data.fen} ${fenArr[1]} ${fenArr[2]} ${fenArr[3]} ${fenArr[4]} ${fenArr[5]}`
    },
    bindFen() {
      let fenArr = this.fen.split(' ')
      let match
      if (fenArr[1] === 'w') {
        match = this.previousMove.match(/([a-h][5])?/)
      } else {
        match = this.previousMove.match(/([a-h][4])?/)
      }
      if (match[0].length !== 0) {
        this.fen = `${fenArr[0]} ${fenArr[1]} ${fenArr[2]} ${match[0]} ${fenArr[4]} ${fenArr[5]}`
      }
    },
    startBoard() {
      this.fen = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR ${this.orientation === 'white' ? 'w' : 'b'} KQkq - 0 1`
      this.castling = ['K', 'Q', 'k', 'q']
    },
    clearBoard() {  
      this.fen = `8/8/8/8/8/8/8/8 ${this.orientation === 'white' ? 'w' : 'b'} - - 0 1`
      this.castling = []
    },
    flipBoard() {
      this.chessColor = this.chessColor === 'white' ? 'black' : 'white'
      let fenArr = this.fen.split(' ')
      this.previousMove = '-'
      this.fen = `${fenArr[0]} ${this.chessColor === 'white' ? 'w' : 'b'} ${fenArr[2]} ${this.previousMove} ${fenArr[4]} ${fenArr[5]}`
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
