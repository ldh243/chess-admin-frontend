<template>
  <div>
    <v-card class="mt-3">
      <v-toolbar color="green">
        <v-toolbar-title id="scrolling-techniques">Bài tập 1</v-toolbar-title>
      </v-toolbar>
      <v-layout row>
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
            <v-textarea
              :value="lessonViewModel.interactiveLesson.initCode"
              solo
              label="Thế cờ"
            ></v-textarea>
            <v-btn
              @click="exampleChess(exampleFen,currentStep)"
              color="blue-grey"
              class="white--text"
            >Bắt Đầu</v-btn>
            <v-divider class="my-2"></v-divider>
          </v-card-text>
          <v-card-text>
            <v-textarea v-model="this.content" box label="Nội dung:  "></v-textarea>
            <v-btn color="blue-grey" class="white--text">Cập nhật</v-btn>
            <!-- <v-btn color="blue-grey" class="white--text">Xóa</v-btn> -->
          </v-card-text>
        </v-flex>
        <v-flex xs5 pa-3 style="margin: auto">
          <chessboard :fen="currentFen" @onMove="showInfo" />
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" depressed>Xong</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    {{this.content}}
    {{this.moveHistory}}
  </div>
</template>

<script>
import Chessboard from '@/components/plugins/cols-chessboard/index.vue'
import { constants } from 'crypto'
export default {
  components: {
    Chessboard
  },
  data() {
    return {
      chessColor: '',
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

<style scoped >
>>> piece,
.blue {
  background-color: transparent !important;
}

.layout_1 {
  width: 100%;
  height: 800px;
}
.layout_2 {
  float: left;
  width: 50%;
}
.layout_chessboard {
  width: 450px;
  float: right;
}
.option_1 {
  text-align: justify;
}
.option_2 {
  color: dimgray;
  font-size: 17px;
}
.move-history-content {
  background-color: #fff;
  border-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 2px;
  height: 150px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  overflow: auto;
}
.move-history-content div {
  flex-wrap: wrap;
  display: flex;
}
.chess-move-history {
  min-width: 50%;
}
.move {
  flex: 0 0 43%;
  font-size: 1.185em;
  padding-left: 10px;
  height: 30px;
  align-content: center;
  font-size: 18px;
}
.move:hover {
  cursor: pointer;
  background-color: #1b83e4;
  color: white;
}
.index {
  flex: 0 0 14%;
  border-right: 1px solid #d9d9d9;
  background: #f7f6f5;
  color: #b3b3b3;
  justify-content: center;
  align-content: center;
  font-size: 15px;
}
</style>
