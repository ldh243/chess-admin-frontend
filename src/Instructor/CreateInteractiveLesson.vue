<template>
  <div>
    <v-card>
      <v-toolbar color="green">
        <v-toolbar-title>Bài tập 1</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-text-field :value="lessonViewModel.name" box label="Nội dung" value></v-text-field>
      </v-card-text>
      <div class="layout_1">
        <div class="layout_2">
          <v-card-text>
            <v-textarea
              :value="lessonViewModel.interactiveLesson.initCode"
              box
              label="Tự động tạo thế cờ: "
            ></v-textarea>
            <v-btn
              @click="exampleChess(exampleFen,currentStep)"
              color="blue-grey"
              class="white--text"
            >Bắt Đầu</v-btn>
            <v-divider class="my-2"></v-divider>
          </v-card-text>

          <v-card-text>
            <v-textarea
              :value="lessonViewModel.interactiveLesson.steps.content"
              box
              label="Nội dung:  "
              value
            ></v-textarea>
            <v-btn color="blue-grey" class="white--text">Cập nhật</v-btn>
            <v-btn color="blue-grey" class="white--text">Xóa</v-btn>
          </v-card-text>
        </div>
        <div class="layout_chessboard">
          <v-layout row wrap>
            <v-flex>
              <chessboard :fen="currentFen" @onMove="showInfo" />
            </v-flex>
          </v-layout>
        </div>
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" depressed>Xong</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>

    <v-flex class="move-history">
      <v-card-title>
        <span class="title font-weight-bold">Nước đi</span>
      </v-card-title>
      <div class="move-history-content">
        <div v-for="(item, index) in moveHistory" :key="index">
          <div class="index">{{ item.index }}</div>
          <div
            :id="item.whiteMove.moveCount"
            class="move"
            @click="loadFen(item.whiteMove.fen, $event)"
          >{{ item.whiteMove.move }}</div>
          <div
            v-if="item.blackMove"
            :id="item.blackMove.moveCount"
            class="move"
            @click="loadFen(item.blackMove.fen, $event)"
          >{{ item.blackMove.move }}</div>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<script>
import Chessboard from '@/components/plugins/vue-chessboard'
export default {
  components: {
    Chessboard
  },
  data() {
    return {
      dialog: false,
      currentFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      defaultFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      currentStep: 0,
      exampleFen: [
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        'rnbq1b1r/ppp2kpp/8/3p4/3Pn3/8/PPP2PPP/RNBQKB1R w KQ - 0 6'
      ],
      moveHistory: [],
      updateMove: true,
      currentMove: 0,
      totalMove: 0,
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
          steps: [
            {
              content: '',
              rightResponse: '',
              stepCode: '',
              wrongResponse: ''
            }
          ]
        }
      }
    }
  },
  computed: {
    statusNextMove() {
      if (this.currentMove === this.totalMove) {
        return true
      }
      return false
    },
    statusPreviousMove() {
      if (this.currentMove <= 1) {
        return true
      }
      return false
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
    loadFen(fen, event) {
      this.updateMove = false
      this.currentFen = fen
      if (event != undefined) {
        const divTarget = event.srcElement
        //Lấy id của nó parse sang int
        this.currentMove = this.getIdNumberOfMove(divTarget)
        this.setCurrentMove()
      }
    },
    showInfo(data) {
      const black = 'black'
      let moveHistory = this.moveHistory
      //Lấy nước đi mới
      let newMove = data.history[data.history.length - 1]
      //Lấy nước đi cuối cùng
      let lastMove = moveHistory[moveHistory.length - 1]
      if (newMove === undefined || !this.currentFen) return
      //   newMove = this.changeChessKey(newMove)
      //Lấy turn hiện tại
      const turn = data.turn
      this.totalMove++
      if (turn === black) {
        //tạo thêm turn mới
        const newTurn = {
          index: moveHistory.length + 1,
          whiteMove: {
            move: newMove,
            fen: data.fen,
            moveCount: 'move-' + this.totalMove
          },
          blackMove: null
        }
        moveHistory.push(newTurn)
      } else {
        //nước đi tiếp theo của turn cũ
        lastMove.blackMove = {
          move: newMove,
          fen: data.fen,
          moveCount: 'move-' + this.totalMove
        }
      }
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
    setHeightForIframe() {
      const ratio = 16 / 9
      let iframe = document.getElementsByClassName('iframe-video')[0]
      const width = iframe.offsetWidth
      const height = width / ratio

      iframe.style.height = height + 'px'
    }
  }
}
</script>

<style scoped>
>>> piece,
.blue {
  background-color: transparent !important;
}

.layout_1 {
  width: 100%;
  height: 700px;
}
.layout_2 {
  float: left;
  width: 50%;
}
.layout_chessboard {
  width: 450px;
  float: right;
}
</style>
