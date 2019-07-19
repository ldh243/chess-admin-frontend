<template>
  <div>
    <v-card class="mt-3">
      <v-toolbar color="#E6E6E6">
        <v-text-field v-model="lessonViewModel.name" label="Bài Tập 1" single-line></v-text-field>
      </v-toolbar>
      <v-layout>
        <v-flex xs6 px-4>
          <v-card-text>
            <v-flex class="move-history">
              <v-card-title>
                <span class="title font-weight-bold">Nước đi</span>
              </v-card-title>
              <div class="move-history-content">
                <div v-for="(move1, index) in moveHistory" :key="index">
                  <template v-if="move1.depth === 1">
                    <div class="index">{{ move1.index }}</div>
                    <div
                      :id="move1.whiteMove.moveId"
                      class="move"
                      @click="loadFen(move1.whiteMove.fen, move1.whiteMove.moveId, $event)"
                    >{{ move1.whiteMove.move }}</div>
                    <div
                      v-if="move1.blackMove"
                      :id="move1.blackMove.moveId"
                      class="move"
                      @click="loadFen(move1.blackMove.fen, move1.blackMove.moveId, $event)"
                    >{{ move1.blackMove.move }}</div>
                  </template>
                  <template v-if="depth === 2">
                    <div v-for="(move2, index2) in move1.moveHistory" :key="index2">
                      <div class="index">{{move1.index}}</div>
                      <div
                        :id="move2.whiteMove.moveId"
                        class="move"
                        @click="loadFen(move2.whiteMove.fen, move2.whiteMove.moveId, $event)"
                      >{{ move2.whiteMove.move }}</div>
                      <div
                        v-if="move2.blackMove"
                        :id="move2.blackMove.moveId"
                        class="move"
                        @click="loadFen(move2.blackMove.fen, move2.blackMove.moveId, $event)"
                      >{{ move2.blackMove.move }}</div>
                    </div>
                  </template>
                </div>
              </div>
            </v-flex>
            <v-flex mb-2>
              <v-layout row>
                <v-btn flat @click="turnToFirstMove()">
                  <v-icon>fa-fast-backward</v-icon>
                </v-btn>
                <v-btn flat class="main-button" @click="turnToPreviousMove()">
                  <v-icon>fa-backward</v-icon>
                </v-btn>

                <v-btn flat class="main-button" @click="turnToNextMove()">
                  <v-icon>fa-forward</v-icon>
                </v-btn>
                <v-btn flat @click="turnToLastMove()">
                  <v-icon>fa-fast-forward</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
          </v-card-text>
          <v-card-text>
            <v-textarea v-model="moveContent" solo label="Nội dung:  "></v-textarea>
            <v-card-actions class="py-0">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="resetBoard" class="white--text">Xóa toàn bộ</v-btn>
              <v-btn color="blue-grey" @click="addMoveContent" class="white--text">Lưu nội dung</v-btn>
            </v-card-actions>
            <!-- <v-btn color="blue-grey" class="white--text">Xóa</v-btn> -->
          </v-card-text>
        </v-flex>
        <v-flex xs6 py-4 px-1>
          <v-layout row>
            <v-flex xs10>
              <Chessboard @onMove="showInfo" :reset="isResetBoard" :fen="fen" :boardName="'board'" />
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
              <v-btn @click="editBoard = true" flat icon fab color="grey">
                <v-icon>fa-pen</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" depressed>Xong</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="editBoard" persistent max-width="800px">
      <v-card>
        <v-toolbar card>
          <v-card-title>
            <span class="headline">Tạo thế cờ</span>
          </v-card-title>
        </v-toolbar>
        <v-container>
          <create-chess-puzzle @onChangeFen="getFen" :boardName="'createBoard'"></create-chess-puzzle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="editBoard = false"
              class="btn-create-puzzle text-xs-center"
              flat
              color="blue darken-1"
            >Đóng</v-btn>
            <v-btn @click="saveFen" class="btn-create-puzzle" depressed color="info">Lưu</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editMoveDialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">Nước cờ mới</v-card-title>
        <v-card-text>"Thêm nước khác" để thêm nước đi khác vào ván cờ hiện tại. Nếu "Thay đổi" nước đi, các nước sau sẽ bị xóa</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="editMoveDialog = false">Đóng</v-btn>
          <v-btn color="green darken-1" flat @click="addOrtherMove">Thêm nước khác</v-btn>
          <v-btn color="green darken-1" flat @click="editMove">Thay đổi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Chessboard from '@/components/plugins/cols-chessboard'
import CreateChessPuzzle from '@/components/Instructor/CreateChessPuzzle.vue'

export default {
  components: {
    Chessboard,
    CreateChessPuzzle
  },
  data() {
    return {
      lessonViewModel: '',
      lessonContent: [],
      moveHistory: [],
      editBoard: false,
      fen: '',
      chessboardData: {},
      whiteObj: [],
      blackObj: [],
      height: {
        moveHistory: 0,
        lessonContent: 0
      },
      turn: '',
      totalMove: 0, //total of move
      currentMove: 0, // move index is clicked,
      currentIndexMove: 0,
      preId: 0,
      moveContent: '',
      isNew: true,
      isResetBoard: false,
      depth: 1,
      editMoveDialog: false,
      newMove: {},
      newTurn: {},
      moveData: {}
    }
  },
  updated() {
    this.setCurrentMove()
  },
  created() {},
  methods: {
    getFen(data) {
      this.chessboardData = data
    },
    saveFen() {
      this.fen = this.chessboardData.fen
      let posKey = Object.keys(this.chessboardData.object)
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
      this.editBoard = false
    },
    showInfo(data) {
      this.moveData = data
      if (this.isResetBoard) {
        this.isResetBoard = !this.isResetBoard
      }
      this.moveContent = ''
      this.totalMove++
      const black = 'black'
      this.turn = data.turn
      this.newMove = {
        id: this.lessonContent.length,
        fen: data.fen,
        move: data.move,
        preId: null,
        content: ''
      }
      let moveHistory = this.moveHistory
      this.newTurn = {
        index: moveHistory.length + 1,
        depth: this.depth,
        whiteMove: {
          move: data.move,
          fen: data.fen,
          moveId: this.lessonContent.length
        },
        blackMove: null
      }
      if (this.isNew) {
        this.newMove.preId =
          this.lessonContent.length === 0 ? null : this.lessonContent.length - 1
        this.lessonContent.push(this.newMove)
        let lastMove = moveHistory[moveHistory.length - 1]
        //newMove is pushed, then lessonContent.length -
        if (this.turn === black) {
          //tạo thêm turn mới
          moveHistory.push(this.newTurn)
        } else {
          //nước đi tiếp theo của turn cũ
          lastMove.blackMove = {
            move: data.move,
            fen: data.fen,
            moveId: this.lessonContent.length - 1
          }
        }
      } else {
        this.editMoveDialog = true
      }
      this.currentMove = this.lessonContent.length - 1
      console.log(this.currentMove)
      console.log(this.totalMove)
    },
    editMove() {
      const black = 'black'
      this.lessonContent = this.lessonContent.filter(move => {
        return move.id <= this.currentMove
      })
      this.newMove.id = this.currentMove + 1
      this.newMove.preId = this.currentMove
      this.lessonContent.push(this.newMove)
      if (this.turn === black) {
        this.moveHistory = this.moveHistory.filter(move => {
          return move.index < (this.currentMove + 1) / 2 + 1
        })
        this.newTurn.index = this.moveHistory.length + 1
        this.newTurn.whiteMove.moveId = this.currentMove + 1
        this.moveHistory.push(this.newTurn)
      } else {
        this.moveHistory = this.moveHistory.filter(move => {
          return move.index <= (this.currentMove + 2) / 2
        })
        let lastEditMove = this.moveHistory[this.moveHistory.length - 1]
        lastEditMove.blackMove = {
          fen: this.moveData.fen,
          move: this.moveData.move,
          moveId: this.currentMove + 1
        }
      }
      this.isNew = true
      this.currentMove = this.lessonContent.length - 1
      this.editMoveDialog = false
    },
    loadFen(fen, currentMove) {
      this.fen = fen
      this.currentMove = currentMove
      this.setCurrentMove()
      this.moveContent = this.lessonContent[this.currentMove].content
      this.isNew = false
    },
    setCurrentMove() {
      let arr = document.getElementsByClassName('move')
      if (arr != undefined && arr != null && arr.length !== 0) {
        Array.prototype.forEach.call(arr, function(move) {
          move.classList.remove('current-move')
        })
        let currentMove = document.getElementById(this.currentMove)
        console.log(currentMove)
        currentMove.classList.add('current-move')
        currentMove.parentNode.parentNode.scrollTop = currentMove.offsetTop
      }
    },
    addMoveContent() {
      let move = this.lessonContent.filter(e => {
        console.log(this.currentMove)
        return e.id === this.currentMove
      })
      move[0].content = this.moveContent
    },
    resetBoard() {
      this.isResetBoard = true
      this.moveHistory = []
      this.lessonContent = []
    },
    addOrtherMove() {
      this.depth = this.depth + 1
      let currenMove = this.moveHistory[this.currentMove]
      currenMove['moveHistory'] = []
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
        console.log('ahihi')
        let fen = this.lessonContent[this.currentMove--].fen
        console.log(fen)
        this.loadFen(fen, this.currentMove--)
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
    }
  }
}
</script>

<style scoped src="@/assets/style/chessboard.css" >
</style>
