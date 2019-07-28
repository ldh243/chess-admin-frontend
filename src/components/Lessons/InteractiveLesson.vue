<template>
  <div>
    <v-container class="pa-6">
      <v-layout>
        <v-flex xs5>
          <v-text-field  color="blue-grey darken-1" v-model="lessonViewModel.name" label="Tên bài học"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs6>
          <v-card-text class="pa-0">
            <v-flex class="move-history">
              <v-card-title>
                <span class="title font-weight-bold">Nước đi</span>
              </v-card-title>
              <div class="move-history-content">
                <div v-for="(move1, index) in moveHistory" :key="index">
                  <template v-if="move1.depth === 1">
                    <div class="index">{{ move1.index }}</div>
                    <div
                      v-if="move1.whiteMove !== null"
                      :id="move1.whiteMove.moveId"
                      class="move"
                      @click="loadFen(move1, 'white', index, $event)"
                    >{{ move1.whiteMove.move }}</div>
                    <div v-if="move1.whiteMove === null" class="move">...</div>
                    <div
                      v-if="move1.blackMove"
                      :id="move1.blackMove.moveId"
                      class="move"
                      @click="loadFen(move1, 'black', index, $event)"
                    >{{ move1.blackMove.move }}</div>
                  </template>
                  <div v-if="move1.depth === 2" class="depth-2">
                    <template v-for="(move2, index2) in move1.moveHistory">
                      <div :key="index2" v-if="move2.depth === 2">
                        <div class="index">{{move2.index}}</div>
                        <div
                          v-if="move2.whiteMove !== null"
                          :id="move2.whiteMove.moveId"
                          class="move"
                          @click="loadFen(move2, 'white', index, index2, $event)"
                        >{{ move2.whiteMove.move }}</div>
                        <div v-if="move2.whiteMove === null" class="move">...</div>
                        <div
                          v-if="move2.blackMove"
                          :id="move2.blackMove.moveId"
                          class="move"
                          @click="loadFen(move2, 'black', index, index2, $event)"
                        >{{ move2.blackMove.move }}</div>
                      </div>
                      <div :key="index2" v-if="move2.depth === 3" class="depth-3">
                        <template v-for="(move3, index3) in move2.moveHistory">
                          <div :key="index3" v-if="move3.depth === 3">
                            <div class="index">{{move3.index}}</div>
                            <div
                              v-if="move3.whiteMove !== null"
                              :id="move3.whiteMove.moveId"
                              class="move"
                              @click="loadFen(move3, 'white', index, index2, index3, $event)"
                            >{{ move3.whiteMove.move }}</div>
                            <div v-if="move3.whiteMove === null" class="move">...</div>
                            <div
                              v-if="move3.blackMove"
                              :id="move3.blackMove.moveId"
                              class="move"
                              @click="loadFen(move3, 'black', index, index2, index3, $event)"
                            >{{ move3.blackMove.move }}</div>
                          </div>
                        </template>
                      </div>
                    </template>
                  </div>
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
              <!-- <v-btn color="blue-grey" @click="removeMove" class="white--text">Xóa nước đi</v-btn> -->
              <v-btn color="primary" @click="resetBoard" class="white--text">Xóa toàn bộ</v-btn>
              <v-btn color="blue-grey" @click="addMoveContent" class="white--text">Lưu nội dung</v-btn>
            </v-card-actions>
            <!-- <v-btn color="blue-grey" class="white--text">Xóa</v-btn> -->
          </v-card-text>
        </v-flex>
        <v-flex xs6 py-4 px-1>
          <v-layout row>
            <v-flex xs10>
              <Chessboard
                @onMove="showInfo"
                :orientation="orientation"
                :reset="isResetBoard"
                :fen="fen"
                :boardName="'board'"
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
              <v-btn @click="editBoard = true" flat icon fab color="grey">
                <v-icon>fa-pen</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-divider></v-divider>
      <v-card-actions class="pa-6">
        <v-spacer></v-spacer>
        <v-btn color="indigo" class="white--text" @click="addLesson">Xong</v-btn>
      </v-card-actions>
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
          <v-btn
            color="green darken-1"
            flat
            :disabled="depth === 3"
            @click="addOrtherMove"
          >Thêm nước khác</v-btn>
          <v-btn color="green darken-1" flat @click="editMove">Thay đổi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Chessboard from '@/components/plugins/cols-chessboard'
import CreateChessPuzzle from '@/components/Instructor/CreateChessPuzzle.vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const lessonRepository = RepositoryFactory.get('lesson')
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
      currentHistory: [],
      editBoard: false, //editBoard dialog
      initFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      fen: '',
      currentFen: '',
      orientation: '',
      chessboardData: {},
      whiteObj: [],
      blackObj: [],
      turn: '',
      totalMove: 0, //total of move
      currentMove: 0, // move index is clicked,
      currentMoveObj: {},
      currentMoveIndex: 0,
      currentMoveIndexInArr: -1,
      totalMoveIndex: 0,
      preId: null,
      moveContent: '',
      isNew: true, //check the move is newMove or editedMove
      isResetBoard: false,
      depth: 1, //depth of current Move
      editMoveDialog: false,
      newMove: {},
      moveData: {},
      currentColorMove: '',
      moveHisIndex: 0,
      moveDepth2HisIndex: 0,
      previousMove: {},
      newHalfMove: {}
    }
  },
  updated() {
    this.setCurrentMove()
  },
  created() {
    this.currentHistory = this.moveHistory
  },
  methods: {
    getFen(data) {
      this.chessboardData = data
    },
    resetBoard() {
      this.isResetBoard = true
      this.moveHistory = []
      this.currentMove = 0
      this.currentHistory = this.moveHistory
      this.currentMoveIndex = 0
      this.currentMoveIndexInArr = -1
      this.depth = 1
      this.newMove = {}
      this.moveData = {}
      this.currentColorMove = ''
      this.lessonContent = []
      this.preId = null
    },
    saveFen() {
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
      this.editBoard = false
    },
    getSameDepthMoveArr() {
      return this.currentHistory.filter(move => {
        return move.depth === this.depth
      })
    },
    getMoveByIndex(index) {
      return this.currentHistory.find(move => {
        return move.index == parseInt(index)
      })
    },
    getOtherMoveObj() {
      return this.currentHistory.find(move => {
        return (
          move.index == parseInt(this.currentMoveIndex + 1) &&
          move.depth == parseInt(this.depth + 1)
        )
      })
    },
    getMoveByIndexAndDepth(index, depth) {
      return this.currentHistory.find(move => {
        return (
          move.index == parseInt(index) &&
          move.depth == parseInt(depth)
        )
      })
    },
    getMoveArrByIndexAndDepth(index, depth) {
      return this.currentHistory.find(move => {
          return (
            move.index === index &&
            move.depth === depth
          )
        })
    },
    filterMoveArrWithLowerIndex(index) {
      return this.currentHistory.filter(move => {
          return move.index <= index
        })
    },
    showInfo(data) {
      this.moveData = data
      const black = 'black'
      this.turn = data.turn
      if (this.isResetBoard) {
        this.isResetBoard = !this.isResetBoard
      }
      //init move data
      this.newHalfMove = {
        id: null,
        fen: data.fen,
        move: data.move,
        moveDirection: data.moveDirection,
        preId: this.preId,
        content: ''
      }
      this.newMove = {
        index: null,
        depth: this.depth,
        whiteMove: null,
        blackMove: null
      }
      let lastMoveId, lastMove
      let sameDepthMoveArr = this.getSameDepthMoveArr()
      if (this.currentHistory.length > 0) {
        lastMove = sameDepthMoveArr[sameDepthMoveArr.length - 1]
        lastMoveId =
          lastMove.blackMove !== null
            ? lastMove.blackMove.moveId
            : lastMove.whiteMove.moveId
      }
      if (this.currentHistory.length === 0 || lastMoveId === this.currentMove) {
        this.totalMove++
        this.newHalfMove.id = this.totalMove
        this.preId = this.totalMove
        this.currentFen = data.fen
        this.moveContent = '' //set moveContent to '' for newMove
        //for first move is black move
        if (this.currentHistory.length === 0 && this.turn !== black) {
          this.currentMoveIndex++
          this.newMove.index = this.currentMoveIndex
          this.newMove.blackMove = {
            moveId: this.totalMove,
            move: data.move,
            fen: data.fen,
            content: '',
            preId: this.preId
          }
          this.currentHistory.push(this.newMove)
        } else {
          if (this.turn === black) {
            //tạo thêm turn mới
            this.currentMoveIndex++
            this.newMove.index = this.currentMoveIndex
            this.newMove.whiteMove = {
              moveId: this.totalMove,
              move: data.move,
              fen: data.fen,
              content: '',
              preId: this.preId
            }
            this.currentHistory.push(this.newMove)
            this.currentMoveObj = this.newMove
          } else {
            //nước đi tiếp theo của turn cũ
            lastMove.blackMove = {
              move: data.move,
              fen: data.fen,
              moveId: this.totalMove,
              content: '',
              preId: this.preId
            }
            this.currentMoveObj = lastMove
          }
        }
        this.fen = data.fen
        this.currentMove = this.totalMove
        this.currentMoveIndexInArr++
      } else {
        let nextToMoveObj, nextToMove, otherMove
        let otherMoveObj = this.getMoveByIndexAndDepth(this.currentMoveIndex + 1, this.depth + 1)
        if (this.currentColorMove === 'black') {
          nextToMoveObj = this.getMoveByIndex(this.currentMoveIndex + 1)
          nextToMove = nextToMoveObj.whiteMove.move
          otherMove =
            otherMoveObj !== undefined ? otherMoveObj.moveHistory[0].whiteMove.move : null
        } else {
          //get current move contain this black move
          nextToMoveObj = this.getMoveByIndex(this.currentMoveIndex)
          nextToMove = nextToMoveObj.blackMove.move
          otherMove =
            otherMoveObj !== undefined ? otherMoveObj.moveHistory[0].blackMove.move : null
        }
        if (data.move === nextToMove) {
          this.currentColorMove =
            this.currentColorMove === 'black' ? 'white' : 'black'
          this.loadFen(nextToMoveObj, this.currentColorMove)
        } else if (otherMove !== null && data.move === otherMove) {
          this.currentColorMove =
            this.currentColorMove === 'black' ? 'white' : 'black'
          this.depth = this.depth + 1
          if (this.depth === 2) {
            let moveHisIndex = this.currentHistory.indexOf(otherMoveObj)
            this.loadFen(
              otherMoveObj.moveHistory[0],
              this.currentColorMove,
              moveHisIndex
            )
          } else {
            //this.depth === 3
            let currentMoveObj = this.moveHistory.find(move => {
              return (
                move.index === this.currentMoveIndex &&
                move.depth === this.depth - 1
              )
            })
            let moveHisIndex = this.moveHistory.indexOf(currentMoveObj)
            let moveDepth2HisIndex = this.currentHistory.indexOf(otherMoveObj)
            this.loadFen(
              otherMoveObj.moveHistory[0],
              this.currentColorMove,
              moveHisIndex,
              moveDepth2HisIndex
            )
          }
        } else {
          this.editMoveDialog = true
        }
      }
      this.lessonContent.push(this.newHalfMove)
    },
    editMove() {
      const black = 'black'
      this.totalMove++
      let newHalfMove = {
        id: this.totalMove++,
        move: this.moveData.move,
        moveDirection: this.moveData.moveDirection,
        content: '',
        preId: this.preId,
        fen: this.moveData.fen
      }
      if (this.currentColorMove === black) {
        let otherMoveGroup = this.getMoveArrByIndexAndDepth(this.currentMoveIndex + 1, this.depth + 1)
        this.currentHistory = this.filterMoveArrWithLowerIndex(this.currentMoveIndex)
        this.newMove.index = this.currentMoveIndex + 1
        this.currentMoveIndex++
        this.newMove.whiteMove.moveId = this.totalMove
        this.currentHistory.push(this.newMove)
        this.currentMoveObj = this.newMove
        this.currentHistory.push(otherMoveGroup)
      } else {
        this.currentHistory = this.filterMoveArrWithLowerIndex(this.currentMoveIndex)
        let sameDepthMoveArr = this.getSameDepthMoveArr()
        let lastMove = sameDepthMoveArr[sameDepthMoveArr.length - 1]
        this.currentMoveObj = lastMove
        lastMove.blackMove = {
          move: this.moveData.move,
          fen: this.moveData.fen,
          moveId: this.totalMove,
          content: ''
        }
      }
      this.fen = this.moveData.fen
      this.currentMove = this.totalMove
      this.editMoveDialog = false
      if (this.depth === 1) {
        this.moveHistory = this.currentHistory
      } else if (this.depth === 2) {
        this.moveHistory[this.moveHisIndex].moveHistory = this.currentHistory
      } else {
        this.moveHistory[this.moveHisIndex].moveHistory[
          this.moveDepth2HisIndex
        ].moveHistory = this.currentHistory
      }
      this.lessonContent.push(newHalfMove)
    },
    loadFen(
      currentMoveObj,
      color,
      moveHisIndex,
      moveDepth2HisIndex,
      moveDepth3HisIndex
    ) {
      this.currentMoveObj = currentMoveObj
      const black = 'black'
      let currentMoveInfo =
        color === black ? currentMoveObj.blackMove : currentMoveObj.whiteMove
      this.fen = currentMoveInfo.fen
      this.preId = currentMoveInfo.preId
      this.currentMove = currentMoveInfo.moveId
      this.currentMoveIndex = currentMoveObj.index
      this.currentColorMove = color
      this.depth = currentMoveObj.depth
      this.setCurrentMove()
      this.moveHisIndex = moveHisIndex
      this.moveDepth2HisIndex = moveDepth2HisIndex
      this.moveDepth3HisIndex = moveDepth3HisIndex
      if (this.depth === 1) {
        this.currentHistory = this.moveHistory
        //after click move
        this.currentMoveIndexInArr = this.moveHisIndex
      } else if (this.depth === 2) {
        this.moveHisIndex = moveHisIndex
        this.currentHistory = this.moveHistory[moveHisIndex].moveHistory
        this.currentMoveIndexInArr = this.moveDepth2HisIndex
      } else {
        this.moveHisIndex = moveHisIndex
        this.moveDepth2HisIndex = moveDepth2HisIndex
        this.currentHistory = this.moveHistory[moveHisIndex].moveHistory[
          moveDepth2HisIndex
        ].moveHistory
        this.currentMoveIndexInArr = this.moveDepth3HisIndex
      }
      // let isIncludeOtherMove =
      //   this.currentHistory.filter(move => {
      //     return move.index === currentMoveObj.index
      //   }).length === 2
      // if (isIncludeOtherMove) {
      //   this.currentMoveIndexInArr++
      // }
      this.moveContent =
        this.currentColorMove === black
          ? this.currentMoveObj.blackMove.content
          : this.currentMoveObj.whiteMove.content
    },
    setCurrentMove() {
      let arr = document.getElementsByClassName('move')
      if (arr != undefined && arr != null && arr.length !== 0) {
        Array.prototype.forEach.call(arr, function(move) {
          move.classList.remove('current-move')
        })
        let currentMove = document.getElementById(this.currentMove)
        currentMove.classList.add('current-move')
        currentMove.parentNode.parentNode.scrollTop = currentMove.offsetTop
      }
    },
    addMoveContent() {
      const black = 'black'
      if (this.currentColorMove === black) {
        this.currentMoveObj.blackMove.content = this.moveContent
      } else {
        this.currentMoveObj.whiteMove.content = this.moveContent
      }
      let currentHalfMove = this.lessonContent.find(halfMove => {
        return halfMove.id === this.currentMove
      })
      currentHalfMove.content = this.moveContent
    },
    addOrtherMove() {
      this.totalMove++
      const black = 'black'
      this.depth = this.depth + 1 //increase depth
      let newOtherMove = {
        depth: this.depth,
        index: 0,
        moveHistory: []
      }
      let newHalfOtherMove = {
        id: this.totalMove,
        move: this.moveData.move,
        moveDirection: this.moveData.moveDirection,
        fen: this.moveData.fen,
        content: '',
        preId: this.preId
      }
      this.newMove.depth = this.depth
      // let numOfOtherMove = this.currentHistory.filter(move => {
      //   return (
      //     move.index === this.currentMoveIndex + 1 && move.depth === this.depth
      //   )
      // }).length
      if (this.currentColorMove === black) {
        this.currentColorMove = 'white'
        console.log("log ne")
        newOtherMove.index = this.currentMoveIndex + 1
        this.newMove.index = this.currentMoveIndex + 1
        this.currentMoveIndex++
        this.newMove.whiteMove = {
          moveId: this.totalMove,
          move: this.moveData.move,
          fen: this.moveData.fen,
          preId: this.preId,
          content: ''
        }
        this.currentHistory.splice(
          this.currentMoveIndexInArr + 2,
          0,
          newOtherMove
        )
        if (this.depth === 2) {
          this.moveHisIndex = this.currentMoveIndexInArr + 2
        } else {
          this.moveDepth2HisIndex =
            this.currentMoveIndexInArr + 2
        }
      } else {
        this.currentColorMove = 'black'
        newOtherMove.index = this.currentMoveIndex
        this.newMove.index = this.currentMoveIndex
        this.newMove.whiteMove = null
        this.newMove.blackMove = {
          moveId: this.totalMove,
          move: this.moveData.move,
          fen: this.moveData.fen,
          content: '',
          preId: this.preId
        }
        this.currentHistory.splice(
          this.currentMoveIndexInArr + 1,
          0,
          newOtherMove
        )
        if (this.depth === 2) {
          this.moveHisIndex = this.currentMoveIndexInArr + 1
        } else {
          this.moveDepth2HisIndex =
            this.currentMoveIndexInArr + 1
        }
      }
      this.currentMoveObj = this.newMove
      this.currentMoveIndexInArr = 0
      this.fen = this.moveData.fen
      newOtherMove.moveHistory.push(this.newMove)
      this.lessonContent.push(newHalfOtherMove)
      this.preId = this.totalMove
      this.currentHistory = newOtherMove.moveHistory
      this.currentMove = this.totalMove
      this.editMoveDialog = false
    },
    getPreviousMoveWithLowerDepth(moveHistory, depth) {
      this.previousMove = moveHistory.find(move => {
        return move.depth === depth && move.index === this.currentMoveIndex
      })
    },
    removeMove() {
      const black = 'black'
      if (this.currentMoveIndexInArr !== this.currentHistory.length - 1) {
        if (
          confirm('Tất cả các nước đi sau đó đều bị xóa? Nhấn OK để tiếp tục!')
        ) {
          // check for first move
          if (
            (this.currentMoveIndexInArr === 0 &&
              this.currentColorMove !== black) ||
            (this.currentMoveIndexInArr === 0 &&
              this.currentHistory[0].whiteMove === null &&
              this.currentColorMove === black)
          ) {
            if (this.depth === 1) {
              this.resetBoard()
            } else {
              this.depth--
              let previousMoveColor =
                previousMove.blackMove !== null ? 'black' : 'white'
              if (this.depth === 1) {
                // let previousMove = this.moveHistory.find(move => {
                //   return move.depth === 1 && move.index === this.currentMoveIndex
                // })
                this.getPreviousMoveWithLowerDepth(this.moveHistory, 1)
                this.moveHistory.splice(this.moveHisIndex, 1)
                this.loadFen(this.previousMove, previousMoveColor)
              } else {
                // let previousMove = this.moveHistory[
                //   this.moveHisIndex
                // ].moveHistory.find(move => {
                //   return move.depth === 2 && move.index === this.currentMoveIndex
                // })
                this.getPreviousMoveWithLowerDepth(
                  this.moveHistory[this.moveHisIndex].moveHistory,
                  2
                )
                this.removeWhiteMove()
                this.moveHistory[this.moveHisIndex].moveHistory.splice(
                  this.moveDepth2HisIndex,
                  1
                )
                this.loadFen(
                  this.previousMove,
                  previousMoveColor,
                  this.moveHisIndex
                )
              }
            }
          } else {
            if (this.currentColorMove !== black) {
              if (this.depth === 1) {
                this.moveHistory = this.currentHistory.filter(move => {
                  return (
                    move.index < this.currentMoveIndex &&
                    move.depth === this.depth
                  )
                })
                this.currentHistory = this.moveHistory
                this.moveHisIndex = this.currentHistory.length - 1
              } else if (this.depth === 2) {
                this.moveHistory[
                  this.moveHisIndex
                ].moveHistory = this.currentHistory.filter(move => {
                  return (
                    move.index < this.currentMoveIndex &&
                    move.depth === this.depth
                  )
                })
                this.currentHistory = this.moveHistory[
                  this.moveHisIndex
                ].moveHistory
                this.moveDepth2HisIndex = this.currentHistory.length - 1
              } else {
                this.moveHistory[this.moveHisIndex].moveHistory[
                  this.moveDepth2HisIndex
                ].moveHistory = this.currentHistory.filter(move => {
                  return (
                    move.index < this.currentMoveIndex &&
                    move.depth === this.depth
                  )
                })
                this.currentHistory = this.moveHistory[
                  this.moveHisIndex
                ].moveHistory[this.moveDepth2HisIndex].moveHistory
                this.moveDepth3HisIndex = this.currentHistory.length - 1
              }
              this.currentMoveIndex--
              let previousMove = this.currentHistory.find(move => {
                return (
                  move.index === this.currentMoveIndex &&
                  this.depth === move.depth
                )
              })
              this.currentMove = previousMove.blackMove.moveId
              this.currentColorMove = 'black'
              this.loadFen(previousMove, this.currentColorMove)
            } else {
              if (this.depth === 1) {
                this.moveHistory = this.currentHistory.filter(move => {
                  return (
                    move.index < this.currentMoveIndex + 1 &&
                    move.depth === this.depth
                  )
                })
                this.currentHistory = this.moveHistory
                this.moveHisIndex = this.currentHistory.length - 1
              } else if (this.depth === 2) {
                this.moveHistory[
                  this.moveHisIndex
                ].moveHistory = this.currentHistory.filter(move => {
                  return (
                    move.index < this.currentMoveIndex + 1 &&
                    move.depth === this.depth
                  )
                })
                this.currentHistory = this.moveHistory[
                  this.moveHisIndex
                ].moveHistory
                this.moveDepth2HisIndex = this.currentHistory.length - 1
              } else {
                this.moveHistory[this.moveHisIndex].moveHistory[
                  this.moveDepth2HisIndex
                ].moveHistory = this.currentHistory.filter(move => {
                  return (
                    move.index < this.currentMoveIndex + 1 &&
                    move.depth === this.depth
                  )
                })
                this.currentHistory = this.moveHistory[
                  this.moveHisIndex
                ].moveHistory[this.moveDepth2HisIndex].moveHistory
                this.moveDepth3HisIndex = this.currentHistory.length - 1
              }
              let previousMove = this.currentHistory.find(move => {
                return (
                  move.index === this.currentMoveIndex &&
                  this.depth === move.depth
                )
              })
              previousMove.blackMove = null
              this.currentMove = previousMove.whiteMove.moveId
              this.currentColorMove = 'white'
              this.loadFen(previousMove, this.currentColorMove)
            }
          }
        }
      }
    },
    addLesson() {
      console.log(this.lessonContent)
    }
    // turnToNextMove() {
    //   if (this.currentMove !== this.totalMove) {
    //     this.currentMove++
    //     const divTarget = this.getMoveByIdNumber()
    //     divTarget.click()
    //     this.updateMove = false
    //     this.setCurrentMove()
    //   }
    // },
    // turnToLastMove() {
    //   if (this.currentMove !== this.totalMove) {
    //     this.currentMove = this.totalMove
    //     const divTarget = this.getMoveByIdNumber()
    //     divTarget.click()
    //     this.updateMove = false
    //     this.setCurrentMove()
    //   }
    // },
    // turnToPreviousMove() {
    //   if (this.currentMove > 1) {
    //     let fen = this.lessonContent[this.currentMove--].fen
    //     this.loadFen(fen, this.currentMove--)
    //   }
    // },
    // turnToFirstMove() {
    //   if (this.currentMove > 1) {
    //     this.currentMove = 1
    //     const divTarget = this.getMoveByIdNumber()
    //     divTarget.click()
    //     this.updateMove = false
    //     this.setCurrentMove()
    //   }
    // }
    // }
  }
}
</script>

<style scoped src="@/assets/style/chessboard.css" >
</style>
<style scoped>
.depth-2 {
  background-color: hsla(0, 59%, 85%, 0.85);
  margin: 5pt 0 5pt 5pt;
  flex: 0 0 100%;
}
.depth-2 > div {
  flex: 0 0 100%;
}
.depth-2 > div > div {
  color: #c00;
}
.depth-3 {
  background-color: rgba(196, 240, 196, 0.85) !important;
  color: #080;
  margin: 5pt 0 5pt 5pt;
  flex: 0 0 100%;
}
.depth-3 > div {
  width: 100%;
}
</style>