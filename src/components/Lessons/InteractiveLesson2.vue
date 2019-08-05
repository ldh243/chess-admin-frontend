<template>
  <div>
    <v-container class="px-6 py-3" id="interactive-lesson">
      <v-window v-model="interactiveLessonStep">
        <v-window-item :value="1">
          <v-layout wrap>
            <v-flex xs6 class="left-chess-info">
              <v-card-text class="pr-5 pt-0 pb-0 pl-0" style="position:relative">
                <v-text-field color="blue-grey darken-1" v-model="lessonName" label="Tên bài học"></v-text-field>
                <div class="move-history-content">
                  <div v-for="(moved1, index) in moveHistory" :key="index">
                    <template v-if="moved1.depth === 1">
                      <div class="index">{{ moved1.index }}</div>
                      <div
                        v-if="moved1.whiteMove"
                        :id="`pv-${moved1.whiteMove.id}`"
                        :preId="moved1.whiteMove.preId"
                        :nextId="moved1.whiteMove.nextId"
                        :preFen="moved1.whiteMove.preFen"
                        :move="moved1.whiteMove.moveDirection"
                        :class="moved1.whiteMove.class"
                        :depth="moved1.depth"
                        @click="loadFen(null, $event, moved1.whiteMove.content)"
                      >{{ moved1.whiteMove.move }}</div>

                      <div
                        v-if="moved1.blackMove"
                        :id="`pv-${moved1.blackMove.id}`"
                        :preId="moved1.blackMove.preId"
                        :nextId="moved1.blackMove.nextId"
                        :class="moved1.blackMove.class"
                        :preFen="moved1.blackMove.preFen"
                        :move="moved1.blackMove.moveDirection"
                        :depth="moved1.depth"
                        @click="loadFen(null, $event, moved1.blackMove.content)"
                      >{{ moved1.blackMove.move }}</div>
                    </template>
                    <div v-if="moved1.depth === 2" class="depth-2">
                      <template v-for="(moved2, index2) in moved1.moveHistory">
                        <div v-if="moved2.depth === 2" :key="index2">
                          <div class="index">{{ moved2.index }}</div>
                          <div
                            v-if="moved2.whiteMove"
                            :id="`pv-${moved2.whiteMove.id}`"
                            :preId="moved2.whiteMove.preId"
                            :nextId="moved2.whiteMove.nextId"
                            :class="moved2.whiteMove.class"
                            :preFen="moved2.whiteMove.preFen"
                            :move="moved2.whiteMove.moveDirection"
                            :depth="moved2.depth"
                            @click="
                              loadFen(null, $event, moved2.whiteMove.content)
                            "
                          >{{ moved2.whiteMove.move }}</div>
                          <div
                            v-if="moved2.blackMove"
                            :id="`pv-${moved2.blackMove.id}`"
                            :preId="moved2.blackMove.preId"
                            :nextId="moved2.blackMove.nextId"
                            :class="moved2.blackMove.class"
                            :preFen="moved2.blackMove.preFen"
                            :move="moved2.blackMove.moveDirection"
                            :depth="moved2.depth"
                            @click="
                              loadFen(null, $event, moved2.blackMove.content)
                            "
                          >{{ moved2.blackMove.move }}</div>
                        </div>
                        <div v-if="moved2.depth === 3" :key="index2" class="depth-3">
                          <template v-for="(moved3, index3) in moved2.moveHistory">
                            <div :key="index3" class="index">{{ moved3.index }}</div>
                            <div
                              v-if="moved3.whiteMove"
                              :id="`pv-${moved3.whiteMove.id}`"
                              :key="index3"
                              :preId="moved3.whiteMove.preId"
                              :nextId="moved3.whiteMove.nextId"
                              :class="moved3.whiteMove.class"
                              :preFen="moved3.whiteMove.preFen"
                              :move="moved3.whiteMove.moveDirection"
                              :depth="moved3.depth"
                              @click="
                                loadFen(null, $event, moved3.whiteMove.content)
                              "
                            >{{ moved3.whiteMove.move }}</div>
                            <div
                              v-if="moved3.blackMove"
                              :id="`pv-${moved3.blackMove.id}`"
                              :key="index3"
                              :preId="moved3.blackMove.preId"
                              :nextId="moved3.blackMove.nextId"
                              :class="moved3.blackMove.class"
                              :preFen="moved3.blackMove.preFen"
                              :move="moved3.blackMove.moveDirection"
                              :depth="moved3.depth"
                              @click="
                                loadFen(null, $event, moved3.blackMove.content)
                              "
                            >{{ moved3.blackMove.move }}</div>
                          </template>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
                <v-textarea
                  color="grey darken-2"
                  v-model="moveContent"
                  class="mt-3"
                  label="Nội dung:  "
                  @keyup="saveContent"
                  @keydown="isSavedContent = false"
                  :disabled="currentMove === 0 || moveHistory.length === 0"
                ></v-textarea>
                <v-card-actions class="py-0" style="align-items:unset">
                  <v-alert v-if="isSavedContent" class="xs6 py-1" dense text type="success">Đã lưu</v-alert>
                  <v-spacer></v-spacer>
                  <!-- <v-btn color="blue-grey" @click="removeMove" class="white--text">Xóa nước đi</v-btn> -->
                  <v-btn
                    color="amber darken-2"
                    depressed
                    @click="resetBoard"
                    class="white--text"
                  >Xóa toàn bộ</v-btn>
                </v-card-actions>
              </v-card-text>
            </v-flex>
            <v-flex xs5 pr-7 style="margin: auto; position:relative">
              <Chessboard
                @onMove="showInfo"
                :orientation="orientation"
                :reset="isResetBoard"
                :fen="fen"
                :boardName="'board'"
              />
              <v-btn
                style="transform: translate(35px, -50%); top: 50%"
                absolute
                right
                @click="editBoard = true"
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
          <PreviewInteractiveLesson
            v-if="interactiveLessonStep === 2"
            :initFen="initFen"
            :steps="lessonContent"
          />
        </v-window-item>
      </v-window>
      <v-flex xs11>
        <v-card-actions class="mt-3">
          <v-spacer></v-spacer>
          <v-btn
            depressed
            class="white--text"
            color="amber darken-2"
            :disabled="interactiveLessonStep === 1"
            @click="back"
          >Trở về</v-btn>
          <v-btn
            depressed
            class="white--text"
            color="amber darken-2"
            :disabled="moveHistory.length === 0"
            @click="interactiveLessonStep === 1 ? preview() : addLesson()"
          >{{interactiveLessonStep === 1 ? 'Xem trước' : 'Lưu'}}</v-btn>
        </v-card-actions>
      </v-flex>
    </v-container>
    <v-dialog v-model="editBoard" persistent max-width="800px">
      <v-card :elevation="8">
        <v-toolbar :elevation="0" color="grey lighten-3">
          <v-toolbar-title class="grey--text text--darken-3">Tạo thế cờ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            @click="editBoard = false"
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
        <v-container>
          <create-chess-puzzle @onChangeFen="getFen" :boardName="'createBoard'"></create-chess-puzzle>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editMoveDialog" persistent max-width="500">
      <v-card>
        <v-card-actions>
          <v-card-title class="headline">Nước cờ mới</v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="grey" small @click="closeEditMoveDialog" fab icon>
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text>"Thêm nước khác" để thêm nước đi khác vào ván cờ hiện tại. Nếu "Thay đổi" nước đi, các nước sau đó sẽ bị xóa</v-card-text>
        <v-card-actions class="pa-3">
          <v-spacer></v-spacer>
          <v-btn
            color="amber darken-2"
            :disabled="depth === 3"
            text
            @click="currentOtherMove !== null && currentOtherMove !== moveData.move ? replaceOtherMove() : addOrtherMove()"
          >{{ currentOtherMove !== null && currentOtherMove !== moveData.move ? 'Thay nước khác' : 'Thêm nước khác'}}</v-btn>
          <v-btn color="amber darken-1" class="white--text" depressed @click="editMove">Thay đổi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Chessboard from '@/components/plugins/cols-chessboard'
import CreateChessPuzzle from '@/components/Instructor/CreateChessPuzzle.vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import PreviewInteractiveLesson from '@/components/preview/PreviewInteractiveLesson'
const lessonRepository = RepositoryFactory.get('lesson')
import MoveHistory from '@/library/ChessHistory.js'
export default {
  components: {
    Chessboard,
    CreateChessPuzzle,
    PreviewInteractiveLesson
  },
  data() {
    return {
      lessonViewModel: '',
      lessonContent: [],
      moveHistory: [],
      currentHistory: [],
      editBoard: false, //editBoard dialog
      initFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
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
      currentNextToMoveObj: {},
      currentNextToMove: '',
      currentOtherMove: '',
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
      newHalfMove: {},
      interactiveLessonStep: 1,
      isSavedContent: false,
      showingLesson: [],
      lessonName: ''
    }
  },
  updated() {
    this.setCurrentMove()
  },
  created() {
    this.currentHistory = this.moveHistory
    this.lessonDetails = {
      interactiveLesson: {
        initCode: this.initFen,
        steps: this.lessonContent
      }
    }
    this.moveHistoryObj = new MoveHistory(this.lessonDetails)
    this.loadMoveHistory()
  },
  methods: {
    saveContent() {
      let timeOut = window.setTimeout(() => {
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
        this.isSavedContent = true
      }, 2000)
    },
    getFen(data) {
      this.chessboardData = data
      this.initFen = data.fen
      this.fen = data.fen
      this.editBoard = false
      this.resetValue()
    },
    resetValue() {
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
    resetBoard() {
      this.isResetBoard = true
      this.resetValue()
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
    showInfo(data) {
      this.moveData = data
      this.fen = data.fen
      const black = 'black'
      let newHalfMove = {
        id: null,
        fen: data.fen,
        move: data.move,
        moveDirection: data.moveDirection,
        preId: this.preId,
        content: ''
      }
      this.totalMove++
      newHalfMove.id = this.totalMove
      this.preId = this.totalMove
      this.moveContent = '' //set moveContent to '' for newMove
      this.lessonContent.push(newHalfMove)
      console.log(this.lessonContent)
      this.lessonDetails = {
        interactiveLesson: {
          initCode: this.initFen,
          steps: this.lessonContent
        }
      }
      this.loadMoveHistory()
    },
    loadMoveHistory() {
      this.moveHistoryObj.formatMoveHistory()
      this.moveHistory = this.moveHistoryObj.getMoveHistory
    },
    editMove() {
      const black = 'black'
      this.totalMove++
      let newHalfMove = {
        id: this.totalMove,
        move: this.moveData.move,
        moveDirection: this.moveData.moveDirection,
        content: '',
        preId: this.preId,
        fen: this.moveData.fen
      }
      if (this.currentColorMove === black) {
        let otherMoveGroup = []
        if (this.depth < 3) {
          otherMoveGroup = this.getMoveArrByIndexAndDepth(
            this.currentMoveIndex + 1,
            this.depth + 1
          )
        }
        this.currentHistory = this.filterMoveArrWithLowerIndex(
          this.currentMoveIndex
        )
        this.newMove.index = this.currentMoveIndex + 1
        this.currentMoveIndex++
        this.newMove.whiteMove = {
          moveId: this.totalMove,
          move: this.moveData.move,
          fen: this.moveData.fen,
          content: '',
          preId: this.preId
        }
        this.currentHistory.push(this.newMove)
        this.currentMoveObj = this.newMove
        if (this.depth < 3 && otherMoveGroup !== undefined) {
          this.currentHistory.push(otherMoveGroup)
        }
      } else {
        this.currentHistory = this.filterMoveArrWithLowerIndex(
          this.currentMoveIndex
        )
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
      console.log(this.currentHistory)
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
      //edit in lessonContent
      this.lessonContent = this.lessonContent.filter(halfMove => {
        return halfMove.preId < this.preId
      })
      this.lessonContent.push(newHalfMove)
    },
    replaceOtherMove() {
      const black = 'black'
      this.currentHistory.splice(this.currentMoveIndexInArr + 2, 1)
      console.log(this.currentHistory)
      this.addOrtherMove()
    },
    loadFen(fen, event, content) {
      if (event != undefined) {
        const divTarget = event.srcElement
        if (divTarget.id) {
          this.stepContent = content
          this.currentId = divTarget.id.replace('il-', '')
          console.log(this.currentId)
          this.currentFen = divTarget.getAttribute('preFen')
          this.move = divTarget.getAttribute('move')
          this.setCurrentMove()
        }
      } else {
        this.currentFen = fen
      }
    },
    closeEditMoveDialog() {
      this.editMoveDialog = false
      this.loadFen(this.currentMoveObj, this.currentColorMove)
    },
    setCurrentMove() {
      let arr = document.getElementsByClassName('il-move')
      if (arr != undefined && arr != null && arr.length !== 0) {
        Array.prototype.forEach.call(arr, function(move) {
          move.classList.remove('il-current-move')
        })
        let currentMove = document.getElementById(`il-${this.currentMove}`)
        currentMove.classList.add('il-current-move')
        // currentMove.parentNode.parentNode.scrollTop = currentMove.offsetTop
      }
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
      if (this.currentColorMove === black) {
        this.currentColorMove = 'white'
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
          this.moveDepth2HisIndex = this.currentMoveIndexInArr + 2
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
          this.moveDepth2HisIndex = this.currentMoveIndexInArr + 1
        }
      }
      this.currentMoveObj = this.newMove
      this.currentMoveIndexInArr = 0
      this.fen = this.moveData.fen
      newOtherMove.moveHistory.push(this.newMove)
      this.lessonContent.push(newHalfOtherMove)
      this.preId = this.totalMove
      this.currentMove = this.totalMove
      this.currentHistory = newOtherMove.moveHistory
      this.editMoveDialog = false
    },
    getPreviousMoveWithLowerDepth(moveHistory, depth) {
      this.previousMove = moveHistory.find(move => {
        return move.depth === depth && move.index === this.currentMoveIndex
      })
    },
    addLesson() {
      const lesson = {
        steps: this.lessonContent,
        name: this.lessonName,
        initCode: this.initFen
      }
      this.$emit('onAddUninteractiveLesson')
    },
    preview() {
      this.showingLesson = this.lessonContent
      console.log(this.lessonContent)
      this.interactiveLessonStep++
    },
    back() {
      this.interactiveLessonStep--
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
        return move.index == parseInt(index) && move.depth == parseInt(depth)
      })
    },
    getMoveArrByIndexAndDepth(index, depth) {
      return this.currentHistory.find(move => {
        return move.index === index && move.depth === depth
      })
    },
    filterMoveArrWithLowerIndex(index) {
      return this.currentHistory.filter(move => {
        return move.index <= index
      })
    }
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
.move-history-content {
  height: 200px;
}
</style>