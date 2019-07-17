<template>
  <div>
    <v-card class="mt-3">
      <v-toolbar color="#E6E6E6">
        <v-text-field v-model="lessonViewModel.name" label="Bài Tập 1" single-line></v-text-field>
      </v-toolbar>
      <v-layout>
        <v-flex xs6>
          <v-card-text>
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
          </v-card-text>
          <v-card-text>
            <v-textarea v-model="this.content" box label="Nội dung:  "></v-textarea>
            <v-btn color="blue-grey" class="white--text">Cập nhật</v-btn>
            <!-- <v-btn color="blue-grey" class="white--text">Xóa</v-btn> -->
          </v-card-text>
          <v-card-text>
            <v-textarea :value="lessonViewModel.interactiveLesson.initCode" solo label="Thế cờ"></v-textarea>
            <v-btn
              @click="exampleChess(exampleFen,currentStep)"
              color="blue-grey"
              class="white--text"
            >Bắt Đầu</v-btn>
            <v-divider class="my-2"></v-divider>
          </v-card-text>
        </v-flex>
        <v-flex xs5 pa-1 style="margin: auto">
          <CreateChessPuzzle />
        </v-flex>
      </v-layout>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" depressed @click="createInteractiveLesson()">Xong</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import CreateChessPuzzle from '@/components/Instructor/CreateChessPuzzle'
import sampleSteps from '@/data/lesson.json'
import { constants } from 'crypto'
import { Transform } from 'stream'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const lessonRepository = RepositoryFactory.get('lesson')
export default {
  components: {
    CreateChessPuzzle
  },
  data() {
    return {
      sampleSteps,
      repeat: require('@/assets/images/repe.png'),
      userColors: ['black', 'white'],
      chessColor: 'white',
      chessColors: '',
      indexColor: 0,
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
        name: 'Abc',
        interactiveLesson: {
          initCode: '3B1B1B/p7/7B/8/7B/8/k1K5/8 w - - 0 1',
          steps: sampleSteps
        }
      }
    }
  },
  created() {
    this.currentFen = this.defaultFen
  },
  methods: {
    userColor(userColors) {
      this.resetBoard()
      this.chessColor = userColors[this.indexColor++]
      if (this.indexColor > userColors.length) {
        return (this.indexColor = 0)
      }
      if (this.chessColor == 'white') {
        this.chessColors = 'w'
      } else {
        this.chessColors = 'b'
      }
      console.log(this.chessColor)
      console.log(this.chessColors)
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
    resetBoard() {
      this.moveHistory = []
      this.moves = ''
      this.updateMove = true
      this.currentFen = this.defaultFen
      this.currentMove = 0
      this.totalMove = 0
    },
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
    },
    async createInteractiveLesson() {
      const { data } = await lessonRepository.createInteractiveLesson(
        this.lessonViewModel
      )
      console.log(data)
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
