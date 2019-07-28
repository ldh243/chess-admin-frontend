<template>
  <div>
    <v-container class="pa-6">
      <v-layout>
        <v-flex xs10>
          <v-text-field
            color="blue-grey darken-1"
            v-model="lessonViewModel.name"
            label="Tên bài học"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6 class="left-chess-info">
          <v-card-text>
            <v-card-title>
              <span class="title font-weight-bold">Nước đi</span>
            </v-card-title>
            <div class="move-history-content">
              <div v-for="(item, index) in moveHistory" :key="index">
                <div class="index">{{ item.id }}</div>
                <div :id="item.id" class="move" @click="loadFen(item.fen, $event)">{{ item.move }}</div>
                <div
                  v-if="item.blackMove"
                  :id="item.id"
                  class="move"
                  @click="loadFen(item.fen, $event)"
                >{{ item.move }}</div>
              </div>
            </div>
            <v-text-field label="Thực hiện đúng" class="mt-3" solo hide-details></v-text-field>
            <v-text-field label="Thực hiện sai" class="mt-1" solo hide-details></v-text-field>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              @click="exampleChess(exampleFen,currentStep)"
              color="indigo"
              class="white--text"
            >Gợi ý nước đi</v-btn>
            <v-btn @click color="teal" class="white--text">Sửa nước đi</v-btn>
            <v-btn @click color="blue-grey" class="white--text">Xóa nước đi</v-btn>
          </v-card-actions>
        </v-flex>
        <v-flex xs6 py-4 px-1 style="margin: auto">
          <v-layout row>
            <v-flex xs10>
              <Chessboard
                @onMove="showInfo"
                :reset="isResetBoard"
                :fen="fen"
                :boardName="'exerciseBoard'"
              />
              <v-card-title>
                <span class="title font-weight-bold">Thế cờ</span>
              </v-card-title>
              <div class="puzzle-content pa-3">
                <div>
                  <span class="heading font-weight-bold">Trắng:</span>
                  <div class="piece-content mr-1" v-for="piece in whiteObj" :key="piece">{{piece}}</div>
                </div>
                <div>
                  <span class="heading font-weight-bold">Đen:</span>
                  <div class="piece-content mr-1" v-for="piece in blackObj" :key="piece">{{piece}}</div>
                </div>
              </div>
            </v-flex>
            <v-flex xs2 style="margin: auto">
              <v-btn @click="editExerciseBoard = true" flat icon fab color="grey">
                <v-icon>fa-pen</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="editExerciseBoard" persistent max-width="800px">
      <v-card>
        <v-toolbar card>
          <v-card-title>
            <span class="headline">Tạo thế cờ</span>
          </v-card-title>
        </v-toolbar>
        <v-container>
          <create-chess-puzzle @onChangeFen="getFen" :boardName="'exerciseCreateBoard'"></create-chess-puzzle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="editExerciseBoard = false"
              class="btn-create-puzzle text-xs-center"
              flat
              color="blue darken-1"
            >Đóng</v-btn>
            <v-btn @click="saveFen" class="btn-create-puzzle" depressed color="info">Lưu</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Chessboard from '@/components/plugins/cols-chessboard/index.vue'
import CreateChessPuzzle from '@/components/Instructor/CreateChessPuzzle.vue'
export default {
  name: 'CreateExercise',
  components: {
    Chessboard
  },
  data() {
    return {
      editExerciseBoard: false,
      chessColor: 'w',
      selectCastling: [],
      select: '',
      dialog: false,
      currentFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      defaultFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      currentStep: 0,
      exampleFen: [
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        'rnbq1b1r/ppp2kpp/8/3p4/3Pn3/8/PPP2PPP/RNBQKB1R w KQ - 0 6',
        '3B1B1B/p7/7B/8/7B/8/k1K5/8 w - - 0 1'
      ],
      moveHistory: [],
      content: '',
      updateMove: true,
      currentMove: 0,
      totalMove: 0,
      moveDirection: '',
      turn: '',
      interval: null,
      isPlayerWin: false,
      move: '',
      moves: '',
      isStart: false,
      chessboardData: {},
      gameStatus: '',
      newestFen: '',
      activeLesson: 0,
      lessonViewModel: {
        courseId: this.$route.params.courseId,
        name: '',
        interactiveLesson: {
          initCode: '',
          steps: []
        }
      }
    }
  },
  watch: {
    chessColor: function(newColor) {
      this.chessColor = newColor
      console.log(this.chessColor)
    }
  },
  created() {
    this.currentFen = this.defaultFen
  },
  methods: {
    getFen() {
      this.chessboardData = data
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
    test() {},
    loadFen(fen, event) {
      this.updateMove = false
      this.currentFen = fen
      if (event != undefined) {
        const divTarget = event.srcElement
        //Lấy id của nó parse sang int
        this.currentMove = this.getIdNumberOfMove(divTarget)
        this.setCurrentMove()
      }
      console.log(event)
    },
    showInfo(data) {
      const black = 'black'
      let moveHistory = this.moveHistory
      let content = this.content
      //Lấy nước đi mới
      let newMove = data.history[data.history.length - 1]
      let id = this.idChessBoard
      //Lấy nước đi cuối cùng
      let lastMove = moveHistory[moveHistory.length - 1]
      let moveDirection = data.hisMoves.split(' ')
      for (let index = 0; index < moveDirection.length; index++) {
        this.moveDirection = moveDirection[index]
      }

      // let content = this.lessonViewModel.interactiveLesson.steps.content
      if (newMove === undefined || !this.currentFen) return
      //   newMove = this.changeChessKey(newMove)
      //Lấy turn hiện tại
      const turn = data.turn
      this.totalMove++
      if (turn === black) {
        //tạo thêm turn mới
        const newTurn = {
          id: this.totalMove,
          fen: data.fen,
          move: newMove,
          content: content,

          moveDirection: this.moveDirection
        }
        moveHistory.push(newTurn)
      } else {
        //nước đi tiếp theo của turn cũ
        lastMove = {
          id: this.totalMove,
          fen: data.fen,
          move: newMove,
          content: content,
          moveDirection: this.moveDirection
        }
        moveHistory.push(lastMove)
      }
      console.log(data)
      this.currentMove = this.totalMove
    },
    setCurrentMove() {
      //set highlight div dựa trên this.current move hiện tại
      let arr = document.getElementsByClassName('move')
      if (arr != undefined && arr != null && arr.length !== 0) {
        Array.prototype.forEach.call(arr, function(move) {
          move.classList.remove('current-move')
        })
        let currentMove = document.getElementById('move-' + this.currentMove)
        currentMove.classList.add('current-move')
        currentMove.parentNode.parentNode.scrollTop = currentMove.offsetTop
      }
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

<style src="@/assets/style/chessboard.css">
</style>
