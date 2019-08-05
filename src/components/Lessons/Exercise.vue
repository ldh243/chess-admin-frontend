<template>
  <div>
    <v-container class="px-6 py-3">
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-layout wrap>
            <v-flex xs6 class="left-chess-info">
              <v-card-text class="pr-5 pt-0 pb-0 pl-0" style="position:relative">
                <v-text-field
                  color="blue-grey darken-1"
                  v-model="lessonViewModel.name"
                  label="Tên bài học"
                ></v-text-field>
                <v-text-field
                  color="blue-grey darken-1"
                  v-model="exercise.question"
                  label="Câu hỏi"
                ></v-text-field>
                <v-tabs vertical color="amber" v-model="answersTabModel">
                  <v-tab
                    :disabled="checkboxChessbot"
                    v-for="(item,i) in 3"
                    :key="i"
                    class="mr-2"
                    :value="i"
                    @click="changeTab(i)"
                  >Đáp án</v-tab>
                  <v-tab-item :disabled="checkboxChessbot" v-for="(item,i) in 3" :key="i">
                    <v-flex xs12>
                      <div class="move-history-content mt-2">
                        <div v-for="(item, index) in moveHistories[i]" :key="index">
                          <div class="index">{{ item.index }}</div>
                          <div
                            :id="`move-${item.whiteMove.moveCount}`"
                            class="move"
                            @click="loadFen(item.whiteMove.fen, item.whiteMove.moveCount, index, 'white')"
                          >{{ item.whiteMove.move }}</div>
                          <div
                            v-if="item.blackMove"
                            :id="`move-${item.blackMove.moveCount}`"
                            class="move"
                            @click="loadFen(item.blackMove.fen, item.blackMove.moveCount, index, 'black')"
                          >{{ item.blackMove.move }}</div>
                        </div>
                      </div>
                      <v-text-field
                        v-model="moveRightRes"
                        color="blue-grey darken-1"
                        label="Thực hiện đúng"
                        class="mt-3 answer-response"
                        hide-details
                        :disabled="checkboxChessbot || currentClickedMoveTurn !== orientation"
                        :append-icon="isSavedRightRes ? 'check_circle' : ''"
                        @keydown="isSavedRightRes = false"
                        @keyup="saveRightRes"
                      >
                      </v-text-field>
                      <v-text-field
                      v-model="moveWrongRes"
                        color="blue-grey darken-1"
                        label="Thực hiện sai"
                        class="mt-3 answer-response"
                        hide-details
                        :disabled="checkboxChessbot || currentClickedMoveTurn !== orientation"
                        :append-icon="isSavedWrongRes ? 'check_circle' : ''"
                        @keydown="isSavedWrongRes = false"
                        @keyup="saveWrongRes"
                      ></v-text-field>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="resetBoard" color="blue-grey" depressed class="white--text">Xóa toàn bộ</v-btn>
                      </v-card-actions>
                    </v-flex>
                  </v-tab-item>
                </v-tabs>
                <v-checkbox color="amber darken-2" v-model="checkboxChessbot" :label="'Sử dụng chế độ đánh tự động'"></v-checkbox>
              </v-card-text>
            </v-flex>
            <v-flex xs5 pr-7 style="margin: auto; position:relative">
              <Chessboard :reset="isReset" :orientation="orientation" :fen="fen" :boardName="'exerciseBoard'" @onMove="showInfo" />
              <v-btn
                style="transform: translate(35px, -50%); top: 50%"
                absolute
                right
                @click="editFenDialog = true"
                icon
                fab
                text
                small
                color="grey"
              >
                <v-icon>fa-pen</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-window-item>
        <v-window-item :value="2">
          <PreviewExercise :orientation="orientation" :exercise="exercise" />
        </v-window-item>
      </v-window>
      <v-layout wrap>
        <v-flex xs11>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="step === 1" @click="removeExercise">Trở về</v-btn>
            <v-btn :disabled="step === 2 || (moveHistories[0].length === 0 && moveHistories[1].length === 0 && moveHistories[2].length === 0 && !checkboxChessbot)" @click="prepareExercise">Xem trước</v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="editFenDialog" persistent max-width="870px">
      <v-card :elevation="8">
        <v-toolbar :elevation="0" color="grey lighten-3">
          <v-toolbar-title class="grey--text text--darken-3">Tạo thế cờ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            @click="editFenDialog = false"
            class="btn-create-puzzle text-xs-center"
            flat
            icon
            color="grey darken-3"
            dark
            depressed
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container class="py-3 px-5">
          <v-flex xs12>
            <create-chess-puzzle @onChangeFen="getFen" :resetBoard="isReset" :boardName="'exerciseCreateBoard'"></create-chess-puzzle>
          </v-flex>
        </v-container>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" top :timeout="3000">
      {{snackbarContent}}
      <v-btn icon fab @click="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import Chessboard from '@/components/plugins/cols-chessboard/index.vue'
import CreateChessPuzzle from '@/components/Instructor/CreateChessPuzzle.vue'
import PreviewExercise from '@/components/preview/PreviewExercise.vue'
export default {
  name: 'CreateExercise',
  components: {
    Chessboard,
    CreateChessPuzzle,
    PreviewExercise
  },
  data() {
    return {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      defaultFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      editFenDialog: false,
      initFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      emptyFen: '8/8/8/8/8/8/8/8',
      currentStep: 0,
      lessonViewModel: {
        courseId: this.$route.params.courseId,
        name: '',
        interactiveLesson: {
          initCode: '',
          steps: []
        }
      },
      whiteObj: [],
      blackObj: [],
      snackbar: false,
      snackbarContent: '',
      window: 0,
      checkboxChessbot: false,
      step: 1,
      exercise: {
        question: '',
        fen: '',
        answers: []
      },
      answer: {},
      moveHistories: [[], [], []],
      currentMoveHistory: [],
      answersTabModel: 0,
      answersTab: 0,
      totalMove: 0,
      currentMove: 0,
      currentIndexMoveInArr: -1,
      totalIndexMove: 0,
      isSavedRightRes: false,
      isSavedWrongRes: false,
      moveRightRes: '',
      moveWrongRes: '',
      orientation: 'white',
      nextMoveTurn: 'white',
      currentClickedMoveTurn: '',
      isReset: false
    }
  },
  updated() {
    this.setCurrentMove()
  },
  created() {
    this.answersTab = 0
  },
  methods: {
    getFen(data) {
      if (
        data['fen'] !== undefined &&
        data['fen'].split(' ')[0] !== this.emptyFen
      ) {
        this.removeHighlightForBoard('exerciseBoard')
        this.chessboardData = data
        this.editFenDialog = false
        this.fen = this.chessboardData.fen
        this.initFen = this.chessboardData.fen
        this.orientation = this.chessboardData.orientation
        let posKey = Object.keys(this.chessboardData.object) //position of chess pieces
        this.whiteObj = []
        this.blackObj = []
        posKey.forEach(e => {
          let piece = this.chessboardData.object[e]
          if (piece.charAt(0) === 'w') {
            this.whiteObj.push(piece.charAt(1) + e)
          } else {
            this.blackObj.push(piece.charAt(1) + e)
          }
        })
      } else {
        this.editFenDialog = false
        this.snackbarContent = 'Thế cờ không hợp lệ'
        this.snackbar = true
      }
    },
    loadFen(fen, moveId, indexMove, color) {
      this.fen = fen
      this.currentMove = moveId
      this.currentIndexMoveInArr = indexMove
      this.currentClickedMoveTurn = color
      this.setCurrentMove()
    },
    showInfo(data) {
      if (this.isReset) {
        this.isReset = false
      }
      const black = 'black'
      let moveHistory = this.moveHistories[this.answersTab]
      //Lấy nước đi cuối cùng
      let lastMove
      if (moveHistory.length > 0) {
        lastMove = moveHistory[moveHistory.length - 1]
      }
      const turn = data.turn
      this.nextMoveTurn = data.turn
      this.currentClickedMoveTurn = this.nextMoveTurn === black ? 'white' : 'black'
      this.totalMove++
      this.fen = data.fen
      if (turn === black) {
        //tạo thêm turn mới
        this.totalIndexMove++
        const newTurn = {
          index: this.totalIndexMove,
          whiteMove: {
            fen: data.fen,
            move: data.move,
            moveCount: this.totalMove,
            moveDirection: data.moveDirection
          },
          blackMove: null
        }
        moveHistory.push(newTurn)
        this.currentIndexMoveInArr++
      } else {
        //nước đi tiếp theo của turn cũ
        lastMove.blackMove = {
          fen: data.fen,
          move: data.move,
          moveCount: this.totalMove,
          moveDirection: data.moveDirection
        }
      }
      console.log(data)
      this.currentMove = this.totalMove
    },
    setCurrentMove() {
      //set highlight div dựa trên this.current move hiện tại
      console.log("call current-move")
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
    // resetBoardAndResetHistory() {
    //   this.currentFen = ''
    //   this.moveHistory = []
    //   this.currentMove = 0
    //   this.totalMove = 0
    // },
    prepareExercise() {
      console.log(this.initFen)
      this.exercise.fen = this.initFen
      this.exercise.answers = this.moveHistories
      console.log(this.exercise)
      this.step++
    },
    removeExercise() {
      this.exercise = {
        question: '',
        fen: '',
        answers: []
      }
      this.step--
    },
    saveRightRes() {
      let timeout = window.setTimeout(() => {
        if (this.orientation === 'white') {
          console.log(this.moveHistories[this.answersTab][this.currentIndexMoveInArr])
          console.log(this.currentIndexMoveInArr)
          this.moveHistories[this.answersTab][this.currentIndexMoveInArr].whiteMove['rightRes'] = this.moveRightRes
        } else {
          this.moveHistories[this.answersTab][this.currentIndexMoveInArr].blackMove['rightRes'] = this.moveRightRes
        }
        this.isSavedRightRes = true
      }, 2000)
    },
    saveWrongRes() {
      let timeout = window.setTimeout(() => {
        if (this.orientation === 'white') {
          this.moveHistories[this.answersTab][this.currentIndexMoveInArr].whiteMove['wrongRes'] = this.moveWrongRes
        } else {
          this.moveHistories[this.answersTab][this.currentIndexMoveInArr].blackMove['wrongRes'] = this.moveWrongRes
        }
        this.isSavedWrongRes = true
      }, 2000) 
    },
    resetBoard() {
      this.isReset = false //active clearBoard
      this.isReset = true
      this.fen = this.defaultFen
      this.moveHistories = []
      this.orientation = this.nextMoveTurn = 'white'
      this.totalMove = this.currentMove = 0
      this.currentIndexMoveInArr = -1
      this.totalIndexMove = 0
      this.isSavedRightRes = this.isSavedWrongRes = false
      this.initFen = this.fen = this.defaultFen
      this.answersTabModel = 0
      this.answersTab = 0
      this.moveRightRes = this.moveWrongRes = ''
      this.currentClickedMoveTurn = ''
      this.exercise = {
        question: '',
        fen: '',
        answers: []
      }
    },
    changeTab(index) {
      this.answersTab = index
      console.log(this.moveHistories[this.answersTab].length)
      if (this.moveHistories[this.answersTab].length > 0) {
        let lastMove = this.moveHistories[this.answersTab][this.moveHistories[this.answersTab].length - 1]
        let moveDirection
        if (lastMove.blackMove !== null) {
          this.fen = lastMove.blackMove.fen
          moveDirection = lastMove.blackMove.moveDirection
        } else {
          this.fen = lastMove.whiteMove.fen
          moveDirection = lastMove.whiteMove.moveDirection
        }
        let match = moveDirection.match(/([a-h][1-8])([a-h][1-8])([qrbn])?/)
        this.addHighlightForBoard('exerciseBoard', match[1], match[2])
      } else {
        this.fen = this.initFen
        this.removeHighlightForBoard('exerciseBoard')
      }
    }  
  }
}
</script>

<style scoped>
.puzzle-content,
.move-history-content {
  border-radius: 4px;
  /* border: 1px solid #ccc; */
}
.puzzle-color {
  height: 40px;
}
.move-history-content {
  height: 120px;
}
.move-answer {
  background-color: rgba(255, 179, 25, 0.07);
}
.v-expansion-panel::before {
  /* box-shadow: none; */
}
.v-expansion-panel-content__wrap {
  padding: 0 0px 0px !important;
}

</style>
<style>
.answer-response i {
  color: green !important;
}
</style>
<style src="@/assets/style/chessboard.css"></style>