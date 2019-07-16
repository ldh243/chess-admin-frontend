<template>
    <v-card class="mt-3">
        <v-toolbar card prominent>
            <v-toolbar-title>
                Bài tập
            </v-toolbar-title>
        </v-toolbar>
        <v-layout row>
            <v-flex xs6 class="left-chess-info">
                <v-flex class="move-history">
                    <v-card-title>
                        <span class="title font-weight-bold">Thế cờ</span>
                    </v-card-title>
                    <div class="puzzle-content">
                    </div>
            </v-flex>
                <v-flex class="move-history">
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
            </v-flex>
            <v-flex xs12 my-3>
            <v-text-field
                label="Thực hiện đúng"
                solo
                hide-details
            ></v-text-field>
            </v-flex>
            <v-flex xs12 my-3>
            <v-text-field
                label="Thực hiện sai"
                solo
                hide-details
            ></v-text-field>
            </v-flex>
            <v-card-actions class="justify-center">
                <v-btn
              @click="exampleChess(exampleFen,currentStep)"
              color="indigo"
              class="white--text"
            >Gợi ý nước đi</v-btn>
            <v-btn
              @click=""
              color="teal"
              class="white--text"
            >Sửa nước đi</v-btn>
            <v-btn
              @click=""
              color="blue-grey"
              class="white--text"
            >Xóa nước đi</v-btn>
            </v-card-actions>
        </v-flex>
        <v-flex xs5 pa-3 style="margin: auto">
          <chessboard :fen="currentFen" :orientation="chessColor === 'w' ? 'white' : 'black'" @onMove="showInfo" />
          <div>
            <v-radio-group v-model="chessColor" row>
              <template v-slot:label>
                <strong>Chọn màu quân đi: &ensp;</strong>
              </template>
              <v-radio color="#000000" value="w">
                <template v-slot:label>
                  <div>
                    <strong>Trắng</strong>
                  </div>
                </template>
              </v-radio>
              <v-radio color="#000000" value="b">
                <template v-slot:label>
                  <div>
                    <strong>Đen</strong>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
          </div>
          <div class="option_2">
            <strong>Nhập thành:</strong>
          </div>
          <div>
            <v-layout row wrap>
              <v-checkbox v-model="selectCastling" color="#000000" value="K">
                <template v-slot:label>
                  <div>
                    <strong>Cánh vua trắng</strong>
                  </div>
                </template>
              </v-checkbox>
              <v-checkbox v-model="selectCastling" color="#000000" value="Q">
                <template v-slot:label>
                  <div>
                    <strong>Cánh hậu trắng</strong>
                  </div>
                </template>
              </v-checkbox>
              <v-checkbox v-model="selectCastling" color="#000000" value="k">
                <template v-slot:label>
                  <div>
                    <strong>Cánh vua đen</strong>
                  </div>
                </template>
              </v-checkbox>
              <v-checkbox v-model="selectCastling" color="#000000" value="q">
                <template v-slot:label>
                  <div>
                    <strong>Cánh hậu đen</strong>
                  </div>
                </template>
              </v-checkbox>
            </v-layout>
            <div>
              <v-flex xs9>
                <v-text-field outline label="Nước đi trước đó"></v-text-field>
              </v-flex>
            </div>
          </div>
        </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
import Chessboard from '@/components/plugins/cols-chessboard/index.vue'
export default {
    name: 'CreateExercise',
    components: {
        Chessboard
    },
    data() {
    return {
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
